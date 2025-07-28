import { Component, computed, effect, inject, input, output, untracked } from '@angular/core';
import { StoredKey } from '../../interfaces/stored-key';
import { MusicService } from '../../services/music.service';
import { FormsModule } from '@angular/forms';
import { PickerComponent } from "../../svg/picker/picker.component";
import { StoreService } from '../../services/store.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-scale-editor',
  standalone: true,
  imports: [
    FormsModule,
    PickerComponent
],
  templateUrl: './scale-editor.component.html',
  styleUrl: './scale-editor.component.css'
})
export class ScaleEditorComponent {
  musicService = inject(MusicService);
  storeService = inject(StoreService);

  key = input.required<StoredKey>();

  keySubmit = output<StoredKey>();

  noteName = computed(() => this.musicService.getNoteName(this.key().rootNoteIndex));



  pickedScaleIndex = 0;

  scaleOptions = this.musicService.scales.map(scale => {
    return scale.name
  });

  waitingForRoot = false;

  waitForRootNote() {
    this.waitingForRoot = true;
  }

  // pickedNote = toSignal(this.storeService.pickedNote);

  constructor() {
    effect(() => {
      let pickedNote = this.storeService.pickedNote();
      console.table({pickedNote});
      if (!this.waitingForRoot) return;
      
      const updatedKey = {
        ...this.key(),
        rootNoteIndex: pickedNote,
      };

      this.keySubmit.emit(updatedKey);

      this.waitingForRoot = false;
    });
  }

}
