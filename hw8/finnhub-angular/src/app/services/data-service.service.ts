import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  dataStream = {
    containsData: false,
    didClick: false,
    watchlist: {},
    history: {},
  };
  public subject = new BehaviorSubject({});

  constructor() {
    console.log('Service Instantiated');
    this.dataStream = {
      containsData: false,
      didClick: false,
      watchlist: {},
      history: {},
    };
  }

  sendData(data): void {
    this.dataStream = { ...this.dataStream, ...data };
    this.dataStream.containsData = true;
    let ticker = localStorage.getItem('ticker');
    let result = JSON.parse(localStorage.getItem('dataStream'));
    result[ticker] = this.dataStream;
    localStorage.setItem('dataStream', JSON.stringify(result)); // storing it into local storage
    this.dataStream = {
      ...this.dataStream,
      history: { ...history, ...result },
    };
    this.subject.next(this.dataStream); // just passes current ticker data to observers
  }

  sendNewsItem(data): void {
    this.subject.next(data);
  }
}
