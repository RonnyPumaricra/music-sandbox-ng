import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  static guitarTunings = [
    {
      name: "Standard",
      distribution: [0, 5, 10, 3, 7, 0],
    },
    {
      name: "Drop",
      distribution: [0, 7, 0, 5, 9, 2],
    },
  ];

  /* Default tuning */
  tuningIndex = signal(0);
  guitarRoot = signal(4);
  
  tuning = computed(() => GuitarService.guitarTunings[this.tuningIndex()]);
  tuningNotes = computed(() => this.tuning().distribution.map(el => (el + this.guitarRoot()) % 12));
}
