import { Component, computed, inject, input, output } from '@angular/core';
import { StoredKey } from '../../interfaces/stored-key';
import { MusicService } from '../../services/music.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-scale-editor',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './scale-editor.component.html',
  styleUrl: './scale-editor.component.css'
})
export class ScaleEditorComponent {
  musicService = inject(MusicService);

  key = input.required<StoredKey>();

  keySubmit = output<StoredKey>();

  noteName = computed(() => this.musicService.getNoteName(this.key().rootNoteIndex));



  pickedScaleIndex = 0;
  pickedModeIndex = 0;

  scaleOptions = this.musicService.scales.map(scale => {
    return scale.leadingKey ?? scale.modes[0] as string
  });


}
