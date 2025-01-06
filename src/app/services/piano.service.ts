import { computed, inject, Injectable } from '@angular/core';
import { MusicService } from './music.service';
import { ScalesService } from './scales.service';
import { ChordsService } from './chords.service';

@Injectable({
  providedIn: 'root'
})
export class PianoService {

  musicService = inject(MusicService);
  scalesService = inject(ScalesService);
  chordsService = inject(ChordsService);
  
   /* Turn [0, 2, 6] to [10, 0, 4] first */
  highlightedScaleNotes = computed(() => {
    let modeRootNote = this.scalesService.currentDistribution()[this.scalesService.chosenModeIndex()];
    // console.log(this.scalesService.chosenModeIndex());
    // console.log(modeRootNote);
    let moddedDistribution = this.scalesService.currentDistribution().map(note => {
      return (note - modeRootNote + 12) % 12;
      // return noteInRange + this.rootNoteIndex();
    });
    // moddedDistribution.push(12);
    console.log(moddedDistribution);
    
    const highlighted = moddedDistribution.map(el => (this.scalesService.rootNoteIndex() + el));
    console.log(highlighted);
    
    return highlighted;
  });
  
  highlightedChordNotes = computed(() => {
    return this.chordsService.chosenChord().distribution.map(note => note + this.chordsService.rootNoteIndex())
  })


  isNoteHighlighted(noteIndex: number) {
    return this.highlightedNotes().some(i => i == noteIndex);
  }
  

  highlightedNotes = computed(() => this.musicService.activePicker() == 0 ? this.highlightedScaleNotes() : this.highlightedChordNotes());

}
