import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'finnhub-angular';

  ngOnInit() {
    let watchlist = [];
    // let stocks: PortfolioStock[] = [];
    let portfolio = { wallet: 25000, stocks: {} };
    localStorage.setItem('dataStream', JSON.stringify({}));
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }
}
