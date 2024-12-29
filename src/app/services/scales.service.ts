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
  rootNote = computed(() => this.chromaticNotes[this.rootNoteIndex()]);
  

  updateScale(variation: number) {
    this.chosenScaleIndex.update(i => {
      const length = this.scales.length;
      return (i + variation + length) % length;
    });
  }

  updateMode(variation: number) {
    this.chosenModeIndex.update(i => {
      const length = this.chosenScale().modes.length;
      return (i + variation + length) % length;
    });
  }

  


}
