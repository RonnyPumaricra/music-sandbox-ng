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
  arrayService = inject(ArrayService);
  scalesService = inject(ScalesService);
  chordsService = inject(ChordsService);
  pianoService = inject(PianoService);

  highlightedPitchlessNotes = input<number[]>([]);

  pianoRootNote = () => this.musicService.activePicker() == 0 ? this.scalesService.rootNoteIndex : this.chordsService.rootNoteIndex;
  // pianoRootNote = computed(() => this.musicService.activePicker() == 0 ? this.scalesService.rootNoteIndex() : this.chordsService.rootNoteIndex());
  // highlightedNotes = this.pianoService.highlightedNotes;

  // pianoRange = computed(() => this.arrayService.range(
  //   this.pianoRootNote() - this.scalesService.chosenModeIndex() - 4,
  //   this.pianoRootNote() - this.scalesService.chosenModeIndex() + 12 + 4
  // ));
  pianoRange = computed(() => this.arrayService.range(
    this.pianoRootNote()() - 4,
    this.pianoRootNote()() + 12 + 4
  ));

  setRootNote(pitchlessNote: number) {
    if (this.musicService.activePicker() == 0) {
      this.scalesService.setRootNote(pitchlessNote);
    } else this.chordsService.setRootNote(pitchlessNote);
  }
  
  isNoteHighlighted(pianoNote: number) {
    return this.highlightedPitchlessNotes().some(note => note == pianoNote);
  }

}
