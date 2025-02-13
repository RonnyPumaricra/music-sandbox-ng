import { Component, computed, inject, input, output } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ArrayService } from '../../services/array.service';
import { PianoService } from '../../services/piano.service';

@Component({
  selector: 'app-piano',
  standalone: true,
  imports: [],
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.css'
})
export class PianoComponent {

  musicService = inject(MusicService);
  pianoService = inject(PianoService);
  arrayService = inject(ArrayService);

  highlightedPitchlessNotes = input<number[]>([]);

  noteClick = output<number>();

  pianoRootNote = computed(() => this.highlightedPitchlessNotes().at(0) ?? 0);
    
  pianoRange = computed(() => this.arrayService.range(
    this.pianoRootNote() - 4,
    this.pianoRootNote() + 12 + 4
  ));

  transformedHighlightedNotes = computed(() => {
    let highlightedNotes = [...this.highlightedPitchlessNotes()];
    let prev = -1;
    for (let i = 0; i < highlightedNotes.length; i++) {
      while (highlightedNotes[i] < prev) {
        highlightedNotes[i] += 12;
      }
      prev = highlightedNotes[i];
    }
    return highlightedNotes;
  });
  
  isNoteHighlighted(pianoNote: number) {
    return this.transformedHighlightedNotes().some(note => note == pianoNote);
  }

}
