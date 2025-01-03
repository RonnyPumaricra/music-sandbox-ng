import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScalesPickerComponent } from "./components/scales-picker/scales-picker.component";
import { ChordsPickerComponent } from "./components/chords-picker/chords-picker.component";
import { PianoComponent } from "./components/piano/piano.component";
import { GuitarComponent } from "./components/guitar/guitar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    ScalesPickerComponent,
    // ChordsPickerComponent,
    PianoComponent,
    GuitarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'music-sandbox-ng';
}
