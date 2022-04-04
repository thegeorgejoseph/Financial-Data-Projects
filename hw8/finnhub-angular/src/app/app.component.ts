import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'finnhub-angular';
  currentURL;
  tickerData;
  lastTicker;
  constructor(private data$: DataServiceService) {}
  ngOnInit() {
    this.lastTicker = localStorage.getItem('ticker') || '';
    if (this.lastTicker === '') {
      let watchlist = [];
      // let stocks: PortfolioStock[] = [];
      let portfolio = { wallet: 25000, stocks: {} };
      localStorage.setItem('dataStream', JSON.stringify({}));
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      localStorage.setItem('portfolio', JSON.stringify(portfolio));
    } else {
      this.tickerData = JSON.parse(localStorage.getItem('dataStream'))[
        localStorage.getItem('ticker')
      ];
      this.data$.sendData(this.tickerData);
    }
  }
}
