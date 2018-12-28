import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  @Output()
  alert: Subject<Alert> = new Subject();
  constructor() {}

  success(message: string) {
    this.alert.next(new Alert('check_circle', 'success', 'Success', message));
  }

  error(message: string) {
    this.alert.next(new Alert('error', 'error', 'Error', message));
  }
}
