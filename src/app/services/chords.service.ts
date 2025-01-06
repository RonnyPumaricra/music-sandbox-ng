import { computed, inject, Injectable, signal } from '@angular/core';
import { MusicService } from './music.service';
import { ArrayService } from './array.service';

@Injectable({
  providedIn: 'root'
})
export class ChordsService {

  musicService = inject(MusicService);
  arrayService = inject(ArrayService);

  rootNoteIndex = signal(0);
  chordIndex = signal(0);

  rootNoteName = computed(() => this.musicService.chromaticNotes[this.rootNoteIndex()]);
  // currentChord = computed(() => this.musicService.chords[this.chordIndex()]);
  uptadeChord = (variation: number) => this.chordIndex.update(chordIndex => this.arrayService.indexInRange(chordIndex + variation, this.musicService.chords));
  setRootNote(noteIndex: number) {
    this.rootNoteIndex.set(noteIndex % 12);
  }

  chosenChord = computed(() => this.musicService.chords[this.chordIndex()]);

  // currentDistribution = computed(() => this.chosenChord().distribution);

  // highlightedNotes = ;
}
