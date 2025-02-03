import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { ScalesService } from '../../services/scales.service';
import { ThreeDotsComponent } from "../../svg/three-dots/three-dots.component";
import { PlusComponent } from "../../svg/plus/plus.component";
import { StoreService } from '../../services/store.service';
import { CrossComponent } from "../../svg/cross/cross.component";
import { PenOutlineComponent } from "../../svg/pen-outline/pen-outline.component";
import { MusicService } from '../../services/music.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ScaleEditorComponent } from '../scale-editor/scale-editor.component';
import { StoredKey } from '../../interfaces/stored-key';

@Component({
  selector: 'app-scales-picker',
  standalone: true,
  imports: [
    ThreeDotsComponent,
    PlusComponent,
    CrossComponent,
    ScaleEditorComponent,
    FormsModule,
],
  templateUrl: './scales-picker.component.html',
  styleUrl: './scales-picker.component.css'
})
export class ScalesPickerComponent {
  scalesService = inject(ScalesService);
  storeService = inject(StoreService);
  musicService = inject(MusicService);

  storedKeys = this.storeService.storedKeys;
  activeKeyIndex = signal(-1);

  changeHighlightedNotes = output<number[]>();

  addKey() {
    const stKeys = [...this.storedKeys()];
    stKeys.push({
      rootNoteIndex: 0,
      scaleIndex: 0,
      modeIndex: 0,
    });
    this.storedKeys.set(stKeys);
  }

  updateKey(
    keyData: StoredKey,
    keyIndex: number
  ) {
    const stKeys = [...this.storedKeys()];
    stKeys[keyIndex] = keyData;

    this.storedKeys.set(stKeys);
  }

  storeKeyClick(index: number) {
    this.activeKeyIndex.set(index);
  }

  deleteKey(index: number) {
    const stKeys = this.storedKeys();
    stKeys.splice(index, 1);
    this.storedKeys.set(stKeys);
    this.activeKeyIndex.set(-1);
  }

  /* at() doesn't return undefined on negative index  */
  activeKey = computed(() => [...this.storedKeys()][this.activeKeyIndex()] as StoredKey | undefined);

  constructor() {
    effect(() => {
      let activeKey = this.activeKey();
      if (activeKey == undefined) {
        this.changeHighlightedNotes.emit([]);
        return;
      };
      // this.storeService.setHighlightedPitchlessNotes(this.musicService.computeHighlightedNotes(activeKey.rootNoteIndex, activeKey.scaleIndex));
      this.changeHighlightedNotes.emit(this.musicService.computeHighlightedNotes(
        activeKey.rootNoteIndex,
        activeKey.scaleIndex,
        activeKey.modeIndex
      ));
    });

    // effect(() => {
    //   let storedKeys = this.storedKeys();
    //   console.log("storedKeys changed");
    //   console.table(storedKeys);
    // })
  }
  
}
