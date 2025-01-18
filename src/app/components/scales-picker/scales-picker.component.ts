import { Component, computed, inject, signal } from '@angular/core';
import { ScalesService } from '../../services/scales.service';
import { JsonPipe } from '@angular/common';
import { ThreeDotsComponent } from "../../svg/three-dots/three-dots.component";
import { CrossComponent } from "../../svg/cross/cross.component";
import { PlusComponent } from "../../svg/plus/plus.component";

@Component({
  selector: 'app-scales-picker',
  standalone: true,
  imports: [
    ThreeDotsComponent,
    PlusComponent
],
  templateUrl: './scales-picker.component.html',
  styleUrl: './scales-picker.component.css'
})
export class ScalesPickerComponent {
  scalesService = inject(ScalesService);

  chosenScale = this.scalesService.chosenScale;
  chosenScaleIndex = this.scalesService.chosenScaleIndex;
  chosenScaleName = computed(() => this.chosenScale().leadingKey ?? this.chosenScale().modes[this.scalesService.chosenModeIndex()]);
  chosenModeName = this.scalesService.chosenModeName;
  scaleRoot = this.scalesService.rootNoteName;

  nextScale = () => this.scalesService.updateScale(1);
  prevScale = () => this.scalesService.updateScale(-1);

  nextMode = () => this.scalesService.updateMode(1);
  prevMode = () => this.scalesService.updateMode(-1);

  storedKeys = signal<StoredKey[]>([
    {
      modeIndex: 0,
      scaleIndex: 0,
      rootNoteIndex: 0,
    }
  ]);
  activeKeyIndex = signal(-1);

  addKey(
    rootNoteIndex: number,
    scaleIndex: number,
    modeIndex: number
  ) {
    this.storedKeys.update(st => {
      st.push({rootNoteIndex, scaleIndex, modeIndex})
      return st;
    });
  }

  storeKeyClick(index: number) {
    this.activeKeyIndex.set(index);
  }

}

interface StoredKey {
  rootNoteIndex: number;
  scaleIndex: number;
  modeIndex: number;
};