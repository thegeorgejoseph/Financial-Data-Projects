import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  public subject = new BehaviorSubject({});

  constructor() {}

  sendData(data): void {
    this.subject.next(data); // essentially takes the data that is passed in from the component and then sends it to all the observers
  }
}
