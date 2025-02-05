import { Injectable, signal, Type } from '@angular/core';
import { StoredKey } from '../interfaces/stored-key';
import { GuitarComponent } from '../components/guitar/guitar.component';
import { PianoComponent } from '../components/piano/piano.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  storedKeys = signal<StoredKey[]>([
    {
      modeIndex: 0,
      scaleIndex: 0,
      rootNoteIndex: 0,
    }
  ]);

  instruments: {name: string, component: Type<unknown>}[] = [
    {
      name: "Guitar",
      component: GuitarComponent,
    },
    {
      name: "Piano",
      component: PianoComponent,
    }
  ];

  highlightedPitchlessNotes = signal<number[]>([]);

}
