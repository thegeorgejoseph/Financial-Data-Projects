import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlistSize;
  watchlist = {};
  localData;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      if (this.localData.containsData) {
        this.watchlist = this.localData.watchlist;
      }
      this.watchlistSize = Object.keys(this.watchlist).length;
    });
  }

  removeCard(ticker) {
    delete this.watchlist[ticker];
    this.data$.sendData({ ...this.localData, watchlist: this.watchlist });
    this.watchlistSize = Object.keys(this.watchlist).length;
    let temp = JSON.parse(localStorage.getItem('watchlist'));
    temp = temp.filter((item) => item !== ticker);
    localStorage.setItem('watchlist', JSON.stringify(temp));
  }
}
