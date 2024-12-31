import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  range = (start: number, end: number, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
      end = start;
      start = 0;
    }
    for (let i = start; i < end; i += step) {
      output.push(i);
    }
    return output;
  };

  indexInRange(value: number, range: any[] | number) {
    let rangeSize = typeof range == "number" ? range : range.length;
    
    if (value >= 0) return value % rangeSize;
    else return (value % rangeSize) + rangeSize;
  }

  valueInRange<T>(index: number, list: T[]) {
    return list[this.indexInRange(index, list)];
  }
}
