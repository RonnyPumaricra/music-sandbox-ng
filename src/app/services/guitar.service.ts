import { computed, inject, Injectable, signal } from '@angular/core';
import { ScalesService } from './scales.service';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  scalesService = inject(ScalesService);

  guitarTunings = [
    {
      name: "Standard",
      distribution: [0, 5, 10, 3, 7, 0],
    },
    {
      name: "Drop",
      distribution: [0, 7, 0, 5, 9, 2],
    }
  ];

  tuningIndex = signal(0);
  guitarRoot = signal(4);
  tuning = computed(() => this.guitarTunings[this.tuningIndex()]);

  tuningNotes = computed(() => this.tuning().distribution.map(el => (el + this.guitarRoot()) % 12));

  highlightedNotes = computed(() => {
    let modeRootNote = this.scalesService.currentDistribution()[this.scalesService.chosenModeIndex()];
    let moddedDistribution = this.scalesService.currentDistribution().map(note => {
      return (note - modeRootNote + 12) % 12;
      // return noteInRange + this.rootNoteIndex();
    });
    moddedDistribution.push(12);
    return moddedDistribution.map(el => (this.scalesService.rootNoteIndex() + el) % 12);
  });
  
  isNoteHighlighted(noteIndex: number) {
    return this.highlightedNotes().some(i => i == noteIndex);
  }


  highlighted3PerString = signal<null | (number[] | null)[]>(null);

  set3PerString(stringIndex: number, pitch: number) {

    let startingString = this.tuningNotes().length - stringIndex - 1;
    // console.table({startingString})
    // for (let note of this.tuningNotes()) {

    // }
    let threePerString: null | (number[] | null)[] = [];
    let currentStringPitch: number = pitch;
    this.tuningNotes().forEach((note, index) => {
      // console.log(note);
      // console.log(note);
      
      if (index < startingString) threePerString.push(null);
      else {
        
        let threeNotes = [];

        // let i = 0;
        let currentPitch = currentStringPitch;
        while (threeNotes.length < 3) {
          if (this.isNoteHighlighted(currentPitch % 12)) threeNotes.push(currentPitch);
          currentPitch++;
        }
        currentStringPitch = currentPitch;
        // console.log(threeNotes);
        threePerString.push(threeNotes);
      }
    })


    console.table(threePerString);

    
  }

}
