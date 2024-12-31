import { Component, computed, inject, input } from '@angular/core';
import { ArrayService } from '../../services/array.service';
import { MusicService } from '../../services/music.service';
import { ScalesService } from '../../services/scales.service';

@Component({
  selector: 'app-guitar-string',
  standalone: true,
  imports: [],
  templateUrl: './guitar-string.component.html',
  styleUrl: './guitar-string.component.css'
})
export class GuitarStringComponent {
  arrayService = inject(ArrayService);
  musicService = inject(MusicService);
  scalesService = inject(ScalesService);
  
  startingNoteIndex = input(0);
  
}
