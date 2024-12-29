import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
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


  isWhiteNote(noteIndex: number) {
    return [0,2,4,5,7,9,11].some(i => i === noteIndex);
  }

  getNoteName(noteIndex: number) {
    return this.chromaticNotes[noteIndex % this.chromaticNotes.length];
  }

}
