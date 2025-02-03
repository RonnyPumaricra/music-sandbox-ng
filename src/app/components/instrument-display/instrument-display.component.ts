import { Component, computed, effect, inject, Injector, viewChild, ViewContainerRef } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-instrument-display',
  standalone: true,
  imports: [
    NgComponentOutlet
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
  // instrument = computed<{name: string, component: any} | null>(() => {
  //   return 
  // });

  
  loadInstrument(instrumentName: string) {

    this.instrumentWrapper().clear();

    for (let ins of this.storeService.instruments) {
      if (instrumentName == ins.name) {
        const renderedInstrument = this.instrumentWrapper().createComponent(
          ins.component
        );
        // effect(() => {
        //   renderedInstrument.setInput("highlightedPitchlessNotes", this.storeService.highlightedPitchlessNotes());
        // });
        
        renderedInstrument.setInput("highlightedPitchlessNotes", this.storeService.highlightedPitchlessNotes());
        
      }
    }
  }

  constructor() {
    effect(() => {
      
      this.loadInstrument(this.instrumentName());
    })
  }

}
