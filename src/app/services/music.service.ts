import { inject, Injectable, signal } from '@angular/core';
import { ArrayService } from './array.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  arrayService = inject(ArrayService);
  scales = [
    {
      leadingKey: "Diatonic Scale",
      distribution: [0, 2, 4, 5, 7, 9, 11],
      modes: [
        "Ionian (Major)",
        "Dorian",
        "Phrygian", 
        "Lydian",
        "Mixolydian",
        "Aeolian (Minor)",
        "Locrian"
      ]
    },
    {
  
      distribution: [0, 2, 3, 5, 7, 8, 11],
      modes: [
        "Harmonic Minor",
        null,
        "Augmented Major",
        null,
        "Phrygian Dominant",
        null,
        null
      ]
    },
    {
      distribution: [0, 2, 4, 7, 9],
      modes: [
        "Major Pentatonic",
        null,
        null,
        null,
        "Minor Pentatonic",
      ]
    },
    {
      // leadingKey: "Blues Minor",
      distribution: [0, 3, 5, 6, 7, 10],
      modes: [
        "Blues Minor",
        "Blues Major"
      ]
    },
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

  activePicker = signal(0);

  chords: Chord[] = [
    {
      name: "Major",
      distribution: [0, 4, 7],
      abbr: root => root,
    },
    {
      name: "Minor",
      distribution: [0, 3, 7],
      abbr: root => root + "m",
    },
    {
      name: "Diminished",
      distribution: [0, 3, 6],
      abbr: root => root +  "dim",
    },
    {
      name: "Augmented",
      distribution: [0, 4, 8],
      abbr: root => root +  "+",
    },
  ]


  getNoteName(noteIndex: number) {
    return this.arrayService.valueInRange(noteIndex, this.chromaticNotes);
  }

  getModeName(scaleIndex: number, modeIndex: number) {
    return this.scales[scaleIndex].modes[modeIndex];
  }


  computeHighlightedNotes(rootNoteIndex: number, scaleIndex: number, modeIndex: number): number[] {
    const chosenScale = this.scales[scaleIndex].distribution;

    const modeStartingNote = chosenScale[modeIndex];
    let chosenKey = chosenScale.map(pitchless => (pitchless - modeStartingNote + 12) % 12);

    /* Let 0 be the starting note */
    let aux = chosenKey.splice(0, modeIndex);
    chosenKey.push(...aux);

    return chosenKey.map((pitchless) => (pitchless + rootNoteIndex) % 12);
  }

}


interface Chord {
  name: string,
  distribution: Array<number>,
  abbr: (root: string) => string,
}