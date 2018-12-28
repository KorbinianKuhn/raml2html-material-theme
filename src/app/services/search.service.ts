import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Output() changed: EventEmitter<string> = new EventEmitter();

  inputChanged: Subject<string> = new Subject();

  public value: string = '';

  constructor() {
    this.inputChanged
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.value = value;
        this.changed.emit(value);
      });
  }

  setValue(value: string): void {
    this.inputChanged.next(value);
  }
}
