import { inject, Injectable, signal } from '@angular/core';
import { ArrayService } from './array.service';
import { Chord } from '../interfaces/chord';
import { Scale } from '../interfaces/scale';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  arrayService = inject(ArrayService);
  // scales = [
  //   {
  //     leadingKey: "Diatonic Scale",
  //     distribution: [0, 2, 4, 5, 7, 9, 11],
  //     modes: [
  //       "Ionian (Major)",
  //       "Dorian",
  //       "Phrygian", 
  //       "Lydian",
  //       "Mixolydian",
  //       "Aeolian (Minor)",
  //       "Locrian"
  //     ]
  //   },
  //   {
  
  //     distribution: [0, 2, 3, 5, 7, 8, 11],
  //     modes: [
  //       "Harmonic Minor",
  //       null,
  //       "Augmented Major",
  //       null,
  //       "Phrygian Dominant",
  //       null,
  //       null
  //     ]
  //   },
  //   {
  //     distribution: [0, 2, 4, 7, 9],
  //     modes: [
  //       "Major Pentatonic",
  //       null,
  //       null,
  //       null,
  //       "Minor Pentatonic",
  //     ]
  //   },
  //   {
  //     // leadingKey: "Blues Minor",
  //     distribution: [0, 3, 5, 6, 7, 10],
  //     modes: [
  //       "Blues Minor",
  //       "Blues Major"
  //     ]
  //   },
  // ];

  scales: Scale[] = [
    // Diatonic Scale modes
    { name: "Ionian (Major)", notesInKey: [0, 2, 4, 5, 7, 9, 11] },
    { name: "Dorian", notesInKey: [0, 2, 3, 5, 7, 9, 10] },
    { name: "Phrygian", notesInKey: [0, 1, 3, 5, 7, 8, 10] },
    { name: "Lydian", notesInKey: [0, 2, 4, 6, 7, 9, 11] },
    { name: "Mixolydian", notesInKey: [0, 2, 4, 5, 7, 9, 10] },
    { name: "Aeolian (Minor)", notesInKey: [0, 2, 3, 5, 7, 8, 10] },
    { name: "Locrian", notesInKey: [0, 1, 3, 5, 6, 8, 10] },

    // Harmonic Minor modes
    { name: "Harmonic Minor", notesInKey: [0, 2, 3, 5, 7, 8, 11] },
    { name: "Augmented Major", notesInKey: [0, 1, 3, 5, 7, 9, 11] },
    { name: "Phrygian Dominant", notesInKey: [0, 1, 4, 5, 7, 8, 10] },

    // Pentatonic modes
    { name: "Major Pentatonic", notesInKey: [0, 2, 4, 7, 9] },
    { name: "Minor Pentatonic", notesInKey: [0, 3, 5, 7, 10] },

    // Blues scales
    { name: "Blues Minor", notesInKey: [0, 3, 5, 6, 7, 10] },
    { name: "Blues Major", notesInKey: [0, 2, 3, 4, 7, 9] },
  ];
  
  chromaticNotes = [
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
    "A",
    "A#/Bb",
    "B"
  ];

  chords: Chord[] = [
    {
      name: "Major",
      distribution: [0, 4, 7],
      abbr: (root) => this.renderableChordAbbr`${root}`,
    },
    {
      name: "Minor",
      distribution: [0, 3, 7],
      abbr: (root) => this.renderableChordAbbr`${root}m`
    },
    {
      name: "Diminished",
      distribution: [0, 3, 6],
      abbr: (root) => this.renderableChordAbbr`${root}dim`
    },
    {
      name: "Augmented",
      distribution: [0, 4, 8],
      abbr: (root) => this.renderableChordAbbr`${root}+`
    },
    {
      name: "Major 7th",
      distribution: [0, 4, 7, 11],
      abbr: (root) => this.renderableChordAbbr`${root}maj7`
    },
    // dominant 7th
    {
      name: "Dominant 7th",
      distribution: [0, 4, 7, 10],
      abbr: (root) => this.renderableChordAbbr`${root}7`
    },
    {
      name: "Minor 7th",
      distribution: [0, 3, 7, 10],
      abbr: (root) => this.renderableChordAbbr`${root}m7`
    },
    {
      name: "Minor Major 7th",
      distribution: [0, 3, 7, 11],
      abbr: (root) => this.renderableChordAbbr`${root}m(maj7)`
    },
    {
      name: "Diminished 7th",
      distribution: [0, 3, 6, 9],
      abbr: (root) => this.renderableChordAbbr`${root}dim7`
    },
    {
      name: "Half Diminished 7th",
      distribution: [0, 3, 6, 10],
      abbr: (root) => this.renderableChordAbbr`${root}m7b5`
    },
    {
      name: "Augmented 7th",
      distribution: [0, 4, 8, 10],
      abbr: (root) => this.renderableChordAbbr`${root}+7`
    },
  ]

  /** Converts the chord to a list of strings, for rendering purposes */
  renderableChordAbbr(strings: TemplateStringsArray, ...values: string[]): {str: string, isRoot: boolean}[] {
    let output: {str: string, isRoot: boolean}[] = [];
    for (let i = 0; i < values.length; i++) {
      output.push({
        str: strings[i],
        isRoot: false,
      });
      output.push({
        str: values[i],
        isRoot: true,
      });
    }
    output.push({
      str: strings[strings.length - 1],
      isRoot: false,
    });

    return output;
  }

  getNoteName(noteIndex: number) {
    return this.arrayService.valueInRange(noteIndex, this.chromaticNotes);
  }

  getScaleName(scaleIndex: number) {
    return this.scales[scaleIndex].name;
  }


  computeNotesFromRoot(rootlessNotes: number[], rootIndex: number) {
    const inKeyNotes: number[] = new Array(rootlessNotes.length);

    for (let i = 0; i < rootlessNotes.length; i++) {
      inKeyNotes[i] = (rootlessNotes[i] + rootIndex) % 12;
    }

    return inKeyNotes;
  }

  // computeHighlightedScaleNotes(rootNoteIndex: number, scaleIndex: number, modeIndex: number): number[] {
  //   const chosenScale = this.scales[scaleIndex].distribution;

  //   const modeStartingNote = chosenScale[modeIndex];
  //   let chosenKey = chosenScale.map(pitchless => (pitchless - modeStartingNote + 12) % 12);

  //   /* Let 0 be the starting note */
  //   let aux = chosenKey.splice(0, modeIndex);
  //   chosenKey.push(...aux);

  //   return chosenKey.map((pitchless) => (pitchless + rootNoteIndex) % 12);
  // }

  // computeHighlightedChordNotes(rootNoteIndex: number, chordIndex: number) {
  //   const chosenChordDist = this.chords[chordIndex].distribution;

  //   return chosenChordDist.map(pitchless => (pitchless + rootNoteIndex) % 12);
  // }

}