import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  dataStream = { containsData: false };
  public subject = new BehaviorSubject({
    // ticker: localStorage.getItem('ticker') || '',
  });

  constructor() {
    console.log('Service Instantiated');
    // this.dataStream = { containsData: false };
  }

  sendData(data): void {
    this.dataStream = { ...this.dataStream, ...data };
    this.dataStream.containsData = true;
    this.subject.next(this.dataStream); // essentially takes the data that is passed in from the component and then sends it to all the observers
  }
}
