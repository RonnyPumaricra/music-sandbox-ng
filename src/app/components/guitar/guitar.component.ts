import { Component } from '@angular/core';
import { GuitarStringSpaceComponent } from "../guitar-string-space/guitar-string-space.component";
import { GuitarStringComponent } from "../guitar-string/guitar-string.component";

@Component({
  selector: 'app-guitar',
  standalone: true,
  imports: [GuitarStringSpaceComponent, GuitarStringComponent],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.css'
})
export class GuitarComponent {

}
