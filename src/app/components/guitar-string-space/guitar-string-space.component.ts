import { Component, inject } from '@angular/core';
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
}
