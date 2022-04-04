import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AlertServiceService {
  public subject = new BehaviorSubject('');

  constructor() {}

  sendData(message) {
    this.subject.next(message);
  }
  
}
