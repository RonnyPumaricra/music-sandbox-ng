import { Injectable, signal, Type } from '@angular/core';
import { StoredKey } from '../interfaces/stored-key';
import { GuitarComponent } from '../components/guitar/guitar.component';
import { PianoComponent } from '../components/piano/piano.component';
import { StoredChord } from '../interfaces/stored-chord';

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

  storedChords = signal<StoredChord[]>([
    {
      chordIndex: 0,
      distanceFromRoot: 0,
    }
  ]);

  instruments: {name: string, component: Type<GuitarComponent | PianoComponent>}[] = [
    {
      name: "Guitar",
      component: GuitarComponent,
    },
    {
      name: "Piano",
      component: PianoComponent,
    }
  ];

  activePicker = signal(1);

  highlightedPitchlessNotes = signal<number[]>([]);

  /* Picked by clicking, used for listening to changes */
  pickedNote = signal<number | null>(null);
}
