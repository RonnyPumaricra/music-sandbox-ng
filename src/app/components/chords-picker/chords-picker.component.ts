import { Component, computed, inject } from '@angular/core';
import { ChordsService } from '../../services/chords.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-chords-picker',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './chords-picker.component.html',
  styleUrl: './chords-picker.component.css'
})
export class ChordsPickerComponent {

  chordsService = inject(ChordsService);

  rootNoteIndex = this.chordsService.rootNoteIndex;
  chosenChord = this.chordsService.chosenChord;

  chosenChordName = computed(() => this.chosenChord());

  prevChord = () => this.chordsService.uptadeChord(-1);
  nextChord = () => this.chordsService.uptadeChord(1);
}
