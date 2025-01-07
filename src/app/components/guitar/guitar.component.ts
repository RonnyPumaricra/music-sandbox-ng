import { Component, computed, inject } from '@angular/core';
import { GuitarStringSpaceComponent } from "../guitar-string-space/guitar-string-space.component";
import { GuitarStringComponent } from "../guitar-string/guitar-string.component";
import { GuitarService } from '../../services/guitar.service';
import { ScalesService } from '../../services/scales.service';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-guitar',
  standalone: true,
  imports: [GuitarStringSpaceComponent, GuitarStringComponent],
  templateUrl: './guitar.component.html',
  styleUrl: './guitar.component.css'
})
export class GuitarComponent {
  musicService = inject(MusicService);
  guitarService = inject(GuitarService);

  tuningNotes = computed(() => this.guitarService.tuningNotes().reverse());

  renderListForScales = computed(() => {

    const tuningNotes = this.guitarService.tuningNotes();

    const renderList: {pitchlessNote: number, guitarNote: number}[] = [];
    /* Turn [6, 11, 3] to [6, 11, 14] */
    for (let i = 0; i < tuningNotes.length; i++) {
      let note = tuningNotes[i];
      if (i == 0) {
        renderList.push({pitchlessNote: note, guitarNote: note});
        continue;
      };
      let prev = renderList[i - 1];
      let curr = {pitchlessNote: note, guitarNote: 0};
      while (prev.guitarNote > note) {
        note += 12;
      }
      curr.guitarNote = note;

      renderList.push(curr);
      // console.table(renderList);
      
      
    }
    // tuningNotes.map((note, index) => {
    //   if (index == 0) return note;
    //   if (tuningNotes)
    // })
    


    return renderList.reverse();
  });

  renderList = computed(() => this.renderListForScales());
  // renderList = computed(() => this.musicService.activePicker() == 0 ? this.renderListForScales() : []);


  // highlightedNotes = ;

}
