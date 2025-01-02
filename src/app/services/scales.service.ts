import { computed, inject, Injectable, signal } from '@angular/core';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class ScalesService {
  musicService = inject(MusicService);

  scales = this.musicService.scales;
  chromaticNotes = this.musicService.chromaticNotes;

  chosenScaleIndex = signal(0);
  chosenModeIndex = signal(0);
  rootNoteIndex = signal(0);



  chosenScale = computed(() => this.scales[this.chosenScaleIndex()]);
  chosenModeName = computed(() => this.chosenScale().modes[this.chosenModeIndex()]);
  rootNoteName = computed(() => this.chromaticNotes[this.rootNoteIndex()]);
  currentDistribution = computed(() => this.chosenScale().distribution);
  // /* Turn [0, 2, 6] to [10, 0, 4] first */
  // highlightedNotes = computed(() => {
  //   let modeRootNote = this.currentDistribution()[this.chosenModeIndex()];
  //   let moddedDistribution = this.currentDistribution().map(note => {
  //     return (note - modeRootNote + 12) % 12;
  //     // return noteInRange + this.rootNoteIndex();
  //   });
  //   moddedDistribution.push(12);
  //   return moddedDistribution.map(el => (this.rootNoteIndex() + el));
  // });

  updateScale(variation: number) {
    this.chosenScaleIndex.update(i => {
      const length = this.scales.length;
      return (i + variation + length) % length;
    });
  }

  updateMode(variation: number) {
    // console.log("Updating mode...");
    this.chosenModeIndex.update(i => {
      const length = this.chosenScale().modes.length;
      // console.log("Updating mode...");
      console.log(length);
      
      return (i + variation + length) % length;
    });
  }

  setRootNote(noteIndex: number) {
    this.rootNoteIndex.set(noteIndex % 12);
  }


}
