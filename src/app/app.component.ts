import { Component, inject } from '@angular/core';
import { ScalesPickerComponent } from "./components/scales-picker/scales-picker.component";
import { ChordsPickerComponent } from "./components/chords-picker/chords-picker.component";
import { PianoComponent } from "./components/piano/piano.component";
import { GuitarComponent } from "./components/guitar/guitar.component";
import { MusicService } from './services/music.service';
import { PickerWrapperComponent } from './components/picker-wrapper/picker-wrapper.component';
import { InstrumentTabNavigationComponent } from "./components/instrument-tab-navigation/instrument-tab-navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PickerWrapperComponent,
    InstrumentTabNavigationComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
