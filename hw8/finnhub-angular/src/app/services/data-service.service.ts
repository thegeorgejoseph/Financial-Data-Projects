import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  dataStream;
  public subject = new BehaviorSubject({
    // ticker: localStorage.getItem('ticker') || '',
  });

  constructor() {
    this.dataStream = {};
  }

  sendData(data): void {
    this.dataStream = { ...this.dataStream, ...data };
    this.subject.next(this.dataStream); // essentially takes the data that is passed in from the component and then sends it to all the observers
  }
}
