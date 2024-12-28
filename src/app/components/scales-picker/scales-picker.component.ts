import { Component, computed, inject } from '@angular/core';
import { ScalesService } from '../../services/scales.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-scales-picker',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './scales-picker.component.html',
  styleUrl: './scales-picker.component.css'
})
export class ScalesPickerComponent {
  scalesService = inject(ScalesService);

  chosenScale = this.scalesService.chosenScale;
  // chosenScale = computed(() => this.scalesService.chosenScale());
  chosenScaleIndex = this.scalesService.chosenScaleIndex;
  chosenScaleName = computed(() => this.chosenScale().leadingKey ?? this.chosenScale().modes[this.scalesService.chosenModeIndex()]);

  nextScale() {
    this.scalesService.chosenScaleIndex.update(i => {
      const length = this.scalesService.scales.length;
      return (i + 1 + length) % length;
    })
  }
}
