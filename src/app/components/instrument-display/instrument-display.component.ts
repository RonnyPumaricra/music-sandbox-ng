import { Component, computed, effect, inject, Injector, viewChild, ViewContainerRef } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-instrument-display',
  standalone: true,
  imports: [
  ],
  templateUrl: './instrument-display.component.html',
  styleUrl: './instrument-display.component.css'
})
export class InstrumentDisplayComponent {
  storeService = inject(StoreService);
  activatedRoute = inject(ActivatedRoute);
  
  viewContainerRef = inject(ViewContainerRef);
  injector = inject(Injector);
  instrumentWrapper = viewChild.required("insContainer", { read: ViewContainerRef });

  paramMap = toSignal(this.activatedRoute.paramMap);
  instrumentName = computed(() => {
    const paramMap = this.paramMap();
    if (paramMap == undefined) return "";
    return paramMap.get("instrument") ?? ""
  });

  
  loadInstrument(instrumentName: string) {

    this.instrumentWrapper().clear();

    for (let ins of this.storeService.instruments) {
      if (instrumentName == ins.name) {
        const renderedInstrument = this.instrumentWrapper().createComponent(
          ins.component
        );
        
        renderedInstrument.setInput("highlightedPitchlessNotes", this.storeService.highlightedPitchlessNotes());
        renderedInstrument.instance.noteClick.subscribe((ev) => {
          // TODO
          console.log("Note: %d", ev);
          this.storeService.pickedNote.set(ev);
        })
      }
    }
  }

  constructor() {
    effect(() => {
      this.loadInstrument(this.instrumentName());
    })
  }

}
