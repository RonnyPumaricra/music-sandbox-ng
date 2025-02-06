import { Component, computed, inject, signal } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { MusicService } from '../../services/music.service';
import { CrossComponent } from "../../svg/cross/cross.component";
import { StoredChord } from '../../interfaces/stored-chord';

@Component({
  selector: 'app-chords-picker',
  standalone: true,
  imports: [
    CrossComponent,
],
  templateUrl: './chords-picker.component.html',
  styleUrl: './chords-picker.component.css'
})
export class ChordsPickerComponent {
  storeService = inject(StoreService);
  musicService = inject(MusicService);

  activeChordIndex = signal(-1);
  /* Handles invalid index (-1) */
  activeChord = computed(() => this.storeService.storedChords()[this.activeChordIndex()] as StoredChord | undefined)

  getChordNameArray(root: number, chordIndex: number) {
    const chord = this.musicService.chords[chordIndex];
    return chord.abbr(this.musicService.getNoteName(root))
  }

  getChordAbbreviation(root: number, chordIndex: number) {
    return this.getChordNameArray(root, chordIndex).map(el => el.str).join("");
  }

  addStoredChord() {
    this.storeService.storedChords.update(storedChords => [
      ...storedChords,
      {chordIndex: 1, distanceFromRoot: 0}
    ]);
  }

  deleteStoredChord(removeIndex: number) {
    this.storeService.storedChords.update(storedChords => {
      storedChords.splice(removeIndex, 1);
      return storedChords;
    });
    this.activeChordIndex.set(-1);
  }

}
