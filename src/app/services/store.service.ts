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

  activePicker = signal(0);

  highlightedPitchlessNotes = signal<number[]>([]);

  /* Picked by clicking, used for listening to changes */
  pickedNote = signal<number>(-1);

  createDefaultChord() {
    this.storedChords.update(chords => [
      ...chords,
      {chordIndex: 0, distanceFromRoot: 0}
    ])
  }

  updateChordType(chordIdx: number, idx: number) {
    this.storedChords.update(chords => {
      chords[idx].chordIndex = chordIdx;
      return chords;
    });
  }

  updateChordRoot(root: number, idx: number) {
    this.storedChords.update(chords => {
      chords[idx].distanceFromRoot = root;
      return chords;
    });
  }

  deleteChord(removeIndex: number) {
    this.storedChords.update(storedChords => {
      storedChords.splice(removeIndex, 1);
      return storedChords;
    });
    // this.activeChordIndex.set(-1);
  }
}
