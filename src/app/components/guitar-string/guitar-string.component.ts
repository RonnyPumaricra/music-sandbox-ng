import { Component, inject } from '@angular/core';
import { ArrayService } from '../../services/array.service';

@Component({
  selector: 'app-guitar-string',
  standalone: true,
  imports: [],
  templateUrl: './guitar-string.component.html',
  styleUrl: './guitar-string.component.css'
})
export class GuitarStringComponent {
  arrayService = inject(ArrayService);
}
