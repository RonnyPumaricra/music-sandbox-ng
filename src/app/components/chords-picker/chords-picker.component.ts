import { Component, computed, effect, inject, output, signal, untracked } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { MusicService } from '../../services/music.service';
import { CrossComponent } from "../../svg/cross/cross.component";
import { StoredChord } from '../../interfaces/stored-chord';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from "../../svg/picker/picker.component";
import { DownArrowHeadComponent } from "../../svg/down-arrow-head/down-arrow-head.component";

@Component({
  selector: 'app-chords-picker',
  standalone: true,
  imports: [
    CrossComponent,
    FormsModule,
    PickerComponent,
    DownArrowHeadComponent
],
  templateUrl: './chords-picker.component.html',
  styleUrl: './chords-picker.component.css'
})
export class ChordsPickerComponent {
  storeService = inject(StoreService);
  musicService = inject(MusicService);

  changeHighlightedNotes = output<number[]>();

  /* Would use an event for this */
  // pickedChordRoot = computed(() => this.storeService.pickedNote());
  waitingForRoot = signal(false);

  activeChordIdx = signal(-1);
  /* Handles invalid index (-1) */
  activeChord = computed(() => this.storeService.storedChords()[this.activeChordIdx()] as StoredChord | undefined)

  getChordNameArray(root: number, chordIndex: number) {
    const chord = this.musicService.chords[chordIndex];
    return chord.abbr(this.musicService.getNoteName(root))
  }

  getChordAbbreviation(root: number, chordIndex: number) {
    return this.getChordNameArray(root, chordIndex).map(el => el.str).join("");
  }


  waitForRootNote() {
    this.waitingForRoot.set(true);
  }

  deleteStoredChord(removeIndex: number) {
    this.storeService.deleteChord(removeIndex);
    this.activeChordIdx.set(-1);
  }

  chosenTriadIndex = 0;
  chosenSeventhIndex = -1;

  triadOptions = this.musicService.chords
  .map((chord, index) => ({index, chord}))
  .filter(({chord}) => chord.distribution.length == 3);
  getSeventhOptions() {
    const activeTriad = this.triadOptions[this.chosenTriadIndex].chord;
    return this.musicService.chords
    .map((chord, index) => ({index, chord}))
    .filter(({chord}) => {
      return chord.distribution[0] == activeTriad.distribution[0] &&
            chord.distribution[1] == activeTriad.distribution[1] &&
            chord.distribution[2] == activeTriad.distribution[2] &&
            chord.distribution.length == 4;
    });
  };

  updateChordIndex() {
    let newChordIndex = this.chosenSeventhIndex == -1 ? this.chosenTriadIndex : this.chosenSeventhIndex;
    this.storeService.updateChordType(newChordIndex, this.activeChordIdx());
  }

  constructor() {
    effect(() => {
      let activeChord = this.activeChord();
      if (activeChord == undefined) {
        this.changeHighlightedNotes.emit([]);
        return;
      }
      this.changeHighlightedNotes.emit(
        this.musicService.computeNotesFromRoot(
          this.musicService.chords[activeChord.chordIndex].distribution,
          activeChord.distanceFromRoot,
        )
      );
    });

    /* Listening note clicks */
    effect(() => {
      let pickedRoot = this.storeService.pickedNote();
      if (untracked(this.waitingForRoot) == false) return;
      // console.log("Picked root: %d", pickedRoot);
      this.storeService.updateChordRoot(pickedRoot, untracked(this.activeChordIdx));
      this.waitingForRoot.set(false);
    },
    {
      allowSignalWrites: true,
    });
  }

}
