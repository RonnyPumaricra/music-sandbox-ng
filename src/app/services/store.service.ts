import { Injectable, signal } from '@angular/core';
import { StoredKey } from '../interfaces/stored-key';

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
}
