import { Routes } from '@angular/router';
import { InstrumentDisplayComponent } from './components/instrument-display/instrument-display.component';

export const routes: Routes = [
  // {
  //   path: "",
  //   component: undefined,
  //   pathMatch: "full",
  // },
  {
    path: ":instrument",
    component: InstrumentDisplayComponent,
  },
];
