import { Component, inject } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ScalesPickerComponent } from "../scales-picker/scales-picker.component";
import { ChordsPickerComponent } from "../chords-picker/chords-picker.component";
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-picker-wrapper',
  standalone: true,
  imports: [
    ScalesPickerComponent,
    ChordsPickerComponent
],
  templateUrl: './picker-wrapper.component.html',
  styleUrl: './picker-wrapper.component.css'
})
export class PickerWrapperComponent {
  musicService = inject(MusicService);
  storeService = inject(StoreService);

  pickerOptions = ["Scales", "Chords"];

  updateHighlightedNotes(highlighted: number[]) {
    this.storeService.highlightedPitchlessNotes.set(highlighted);
  }
}
