import { Component, inject, signal } from '@angular/core';
import { PickerWrapperComponent } from './components/picker-wrapper/picker-wrapper.component';
import { InstrumentTabNavigationComponent } from "./components/instrument-tab-navigation/instrument-tab-navigation.component";
import { InstrumentDisplayComponent } from "./components/instrument-display/instrument-display.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PickerWrapperComponent,
    InstrumentTabNavigationComponent,
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
