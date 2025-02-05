import { inject, Injectable } from '@angular/core';
import { ArrayService } from './array.service';

@Injectable({
  providedIn: 'root'
})
export class PianoService {

  arrayService = inject(ArrayService);

  isWhiteNote(noteIndex: number) {
    let indexInRange = this.arrayService.indexInRange(noteIndex, 12);
    return [0,2,4,5,7,9,11].some(i => i == indexInRange);
  }

}
