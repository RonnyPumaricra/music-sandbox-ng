import { Component, computed, inject } from '@angular/core';
import { GuitarStringSpaceComponent } from "../guitar-string-space/guitar-string-space.component";
import { GuitarStringComponent } from "../guitar-string/guitar-string.component";
import { GuitarService } from '../../services/guitar.service';
import { ScalesService } from '../../services/scales.service';

@Component({
  selector: 'app-guitar',
  standalone: true,
  imports: [GuitarStringSpaceComponent, GuitarStringComponent],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.css'
})
export class GuitarComponent {
  guitarService = inject(GuitarService);

  renderList = computed(() => this.guitarService.tuningNotes().reverse());
}
