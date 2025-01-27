import { Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-instrument-tab-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './instrument-tab-navigation.component.html',
  styleUrl: './instrument-tab-navigation.component.css'
})
export class InstrumentTabNavigationComponent {
  storeService = inject(StoreService);


}
