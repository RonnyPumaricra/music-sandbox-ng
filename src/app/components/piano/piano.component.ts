import { Component, computed, inject } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ArrayService } from '../../services/array.service';
import { range } from 'rxjs';
import { ScalesService } from '../../services/scales.service';

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

  pianoRootNote = this.scalesService.rootNoteIndex;

  pianoRange = computed(() => this.arrayService.range(this.pianoRootNote(), this.pianoRootNote() + 12));
  isWhiteNote = this.musicService.isWhiteNote;
}
