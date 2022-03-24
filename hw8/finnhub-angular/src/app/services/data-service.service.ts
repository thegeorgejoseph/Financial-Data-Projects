import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  dataStream = { containsData: false, didClick: false, watchlist: {} };
  public subject = new BehaviorSubject({
    // ticker: localStorage.getItem('ticker') || '',
  });

  constructor() {
    console.log('Service Instantiated');
    this.dataStream = { containsData: false, didClick: false, watchlist: {} };
  }

  sendData(data): void {
    this.dataStream = { ...this.dataStream, ...data };
    this.dataStream.containsData = true;
    localStorage.setItem('dataStream', JSON.stringify(this.dataStream));
    this.subject.next(this.dataStream); // essentially takes the data that is passed in from the component and then sends it to all the observers
  }
}
