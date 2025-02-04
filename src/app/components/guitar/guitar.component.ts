import { Component, computed, inject, input } from '@angular/core';
import { GuitarStringSpaceComponent } from "../guitar-string-space/guitar-string-space.component";
import { GuitarStringComponent } from "../guitar-string/guitar-string.component";
import { GuitarService } from '../../services/guitar.service';

@Component({
  selector: 'app-guitar',
  standalone: true,
  imports: [
    GuitarStringSpaceComponent,
    GuitarStringComponent,
  ],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.css'
})
export class GuitarComponent {
  guitarService = inject(GuitarService);

  highlightedPitchlessNotes = input<number[]>();

  tuningNotes = computed(() => this.guitarService.tuningNotes());

  openStringNotes = computed(() => {

    const tuningNotes = this.guitarService.tuningNotes();

    /* Array of open string guitar notes */
    const openNotes: number[] = [];
    /* Turn [6, 11, 3] to [6, 11, 14] */
    for (let i = 0; i < tuningNotes.length; i++) {
      let guitarNote = tuningNotes[i];
      if (i == 0) {
        openNotes.push(guitarNote);
        continue;
      };
      let prevNote = openNotes[i - 1];
      while (prevNote > guitarNote) {
        guitarNote += 12;
      }
      openNotes.push(guitarNote);
    }
    
    return openNotes.reverse();
  });
}
