import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from './search.service';
@Injectable({
  providedIn: 'root',
})
export class AutoupdaterService {
  public subject = new BehaviorSubject({ hasUpdated: false });
  data: any = { hasUpdated: false };

  constructor(private searchService: SearchService) {}

  sendToObserver(ticker): void {
    // console.log(ticker);
    if (typeof ticker === 'string') {
      this.data.hasUpdated = false;
      setInterval(() => this.callUpdaterAPI(ticker), 15000);
    }
  }

  callUpdaterAPI(ticker) {
    this.searchService.runAutoUpdater(ticker).subscribe((data) => {
      this.data = data;
      this.data['hasUpdated'] = true;
      // console.log('!!!', this.data);
      this.subject.next(this.data);
      this.data['hasUpdated'] = false;
    });
  }

  

}
