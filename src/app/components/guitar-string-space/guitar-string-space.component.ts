import { Component, inject, input } from '@angular/core';
import { ArrayService } from '../../services/array.service';

@Component({
  selector: 'app-guitar-string-space',
  standalone: true,
  imports: [],
  templateUrl: './guitar-string-space.component.html',
  styleUrl: './guitar-string-space.component.css'
})
export class GuitarStringSpaceComponent {
  arrayService = inject(ArrayService);

  row = input.required<number>();
  
  decoratives = [
    [2, 2],
    [2, 4],
    [2, 6],
    [2, 8],
    [1, 11],
    [3, 11],
  ]

  isDecorative(index: number) {
    return this.decoratives.some(coord => coord[0] == this.row() && coord[1] == index);
  }

}
