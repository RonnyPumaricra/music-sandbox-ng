import { Component, computed, inject } from '@angular/core';
import { ScalesService } from '../../services/scales.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-scales-picker',
  standalone: true,
  imports: [
    // JsonPipe,
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

}
