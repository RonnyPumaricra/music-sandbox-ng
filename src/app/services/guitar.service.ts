import { computed, inject, Injectable, signal } from '@angular/core';
import { ScalesService } from './scales.service';
import { ChordsService } from './chords.service';
import { MusicService } from './music.service';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  musicService = inject(MusicService);
  scalesService = inject(ScalesService);
  chordsService = inject(ChordsService);

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

  highlightedChordNotes = computed(() => {
    return this.chordsService.chosenChord().distribution.map(note => note + this.chordsService.rootNoteIndex())
  })

  highlightedScaleNotes = computed(() => {
    let modeRootNote = this.scalesService.currentDistribution()[this.scalesService.chosenModeIndex()];
    let moddedDistribution = this.scalesService.currentDistribution().map(note => {
      return (note - modeRootNote + 12) % 12;
    });
    moddedDistribution.push(12);
    return moddedDistribution.map(el => (this.scalesService.rootNoteIndex() + el) % 12);
  });
  
  highlightedNotes = computed(() => this.musicService.activePicker() == 0 ? this.highlightedScaleNotes() : this.highlightedChordNotes());

  isNoteFromScale(guitarNote: number) {
    return this.highlightedNotes().some(i => i == guitarNote % 12);
  }

  isNoteHighlighted(guitarNote: number, stringIndex: number) {
    let highlighted3PerString = this.highlighted3PerString();
    if (highlighted3PerString == null) return this.isNoteFromScale(guitarNote);

    let stringNotes = highlighted3PerString.at(6 - stringIndex - 1);
    if (stringNotes == null) return false;
    else return stringNotes.some(highlightedNote => highlightedNote == guitarNote);
  }

  start3PerString = signal<{string: number, guitarNote: number} | null>(null);

  highlighted3PerString = computed<Array<number[] | null> | null>(() => {
    let start3PerString = this.start3PerString();
    if (start3PerString == null) return null;
    
    let startingString = start3PerString.string;
    let currentStringPitch = start3PerString.guitarNote;
    let threePerString: Array<number[] | null> = [];

    this.tuningNotes().forEach((note, index) => {
      
      if (index < startingString) threePerString.push(null);
      else {
        
        let threeNotes = [];

        // let i = 0;
        let currentPitch = currentStringPitch;
        while (threeNotes.length < 3) {
          if (this.isNoteFromScale(currentPitch)) threeNotes.push(currentPitch);
          currentPitch++;
        }
        currentStringPitch = currentPitch;
        threePerString.push(threeNotes);
      }
    })

    console.table(threePerString);
    return threePerString;
  });

  set3PerString(stringIndex: number, guitarNote: number) {
    let start3PerString = this.start3PerString();

    stringIndex = 6 - stringIndex - 1;

    if (start3PerString == null || start3PerString.guitarNote != guitarNote || start3PerString.string != stringIndex) {
      this.start3PerString.set({
        string: stringIndex,
        guitarNote: guitarNote,
      })
    }
    else {
      this.start3PerString.set(null);
    }
  }

}
