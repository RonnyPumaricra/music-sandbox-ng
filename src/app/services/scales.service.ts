import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScalesService {

  public chosenScaleIndex = signal(0);
  public chosenModeIndex = signal(0);

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

  chosenScale = computed(() => this.scales[this.chosenScaleIndex()]);
  chosenModeName = computed(() => this.chosenScale().modes[this.chosenModeIndex()]);
}
