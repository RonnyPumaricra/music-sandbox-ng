import { Component, computed, inject, input } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ArrayService } from '../../services/array.service';
import { ScalesService } from '../../services/scales.service';
import { PianoService } from '../../services/piano.service';
import { ChordsService } from '../../services/chords.service';

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

  // pianoRootNote = () => this.musicService.activePicker() == 0 ? this.scalesService.rootNoteIndex : this.chordsService.rootNoteIndex;
  pianoRootNote = computed(() => this.highlightedPitchlessNotes().at(0) ?? 0);
    
  pianoRange = computed(() => this.arrayService.range(
    this.pianoRootNote() - 4,
    this.pianoRootNote() + 12 + 4
  ));
  
  isNoteHighlighted(pianoNote: number) {
    return this.highlightedPitchlessNotes().some(note => note == pianoNote);
  }

}
