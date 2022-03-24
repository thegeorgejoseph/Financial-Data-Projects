import { Component, OnInit } from '@angular/core';
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
}
