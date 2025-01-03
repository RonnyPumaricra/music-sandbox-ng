import { Component, computed, inject } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ArrayService } from '../../services/array.service';
import { ScalesService } from '../../services/scales.service';
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
  arrayService = inject(ArrayService);
  scalesService = inject(ScalesService);
  pianoService = inject(PianoService);

  pianoRootNote = this.scalesService.rootNoteIndex;
  highlightedNotes = this.pianoService.highlightedNotes;

  // pianoRange = computed(() => this.arrayService.range(
  //   this.pianoRootNote() - this.scalesService.chosenModeIndex() - 4,
  //   this.pianoRootNote() - this.scalesService.chosenModeIndex() + 12 + 4
  // ));
  pianoRange = computed(() => this.arrayService.range(
    this.pianoRootNote() - 4,
    this.pianoRootNote() + 12 + 4
  ));


  
}
