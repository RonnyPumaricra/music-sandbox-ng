import { Component, computed, inject, input, signal } from '@angular/core';
import { ScalesService } from '../../services/scales.service';
import { ThreeDotsComponent } from "../../svg/three-dots/three-dots.component";
import { PlusComponent } from "../../svg/plus/plus.component";
import { StoreService } from '../../services/store.service';
import { CrossComponent } from "../../svg/cross/cross.component";
import { PenOutlineComponent } from "../../svg/pen-outline/pen-outline.component";

@Component({
  selector: 'app-scales-picker',
  standalone: true,
  imports: [
    ThreeDotsComponent,
    PlusComponent,
    CrossComponent,
    PenOutlineComponent
],
  templateUrl: './scales-picker.component.html',
  styleUrl: './scales-picker.component.css'
})
export class ScalesPickerComponent {
  scalesService = inject(ScalesService);
  storeService = inject(StoreService);

  chosenScale = this.scalesService.chosenScale;
  chosenScaleIndex = this.scalesService.chosenScaleIndex;
  chosenScaleName = computed(() => this.chosenScale().leadingKey ?? this.chosenScale().modes[this.scalesService.chosenModeIndex()]);
  chosenModeName = this.scalesService.chosenModeName;
  scaleRoot = this.scalesService.rootNoteName;

  nextScale = () => this.scalesService.updateScale(1);
  prevScale = () => this.scalesService.updateScale(-1);

  nextMode = () => this.scalesService.updateMode(1);
  prevMode = () => this.scalesService.updateMode(-1);

  storedKeys = this.storeService.storedKeys;
  activeKeyIndex = signal(-1);

  addKey(
    rootNoteIndex: number,
    scaleIndex: number,
    modeIndex: number
  ) {
    const stKeys = this.storedKeys();
    stKeys.push({rootNoteIndex, scaleIndex, modeIndex});
    this.storedKeys.set(stKeys);
  }

  storeKeyClick(index: number) {
    this.activeKeyIndex.set(index);
  }

  deleteKey(index: number) {
    const stKeys = this.storedKeys();
    stKeys.splice(index, 1);
    this.storedKeys.set(stKeys);
    this.activeKeyIndex.set(-1);
  }

}
