import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit, OnChanges {
  walletMoney;
  portfolio = [];
  localDataStream;
  isPositive: string;
  constructor() {}

  ngOnInit(): void {
    this.localDataStream = JSON.parse(localStorage.getItem('dataStream'));
    this.walletMoney = JSON.parse(localStorage.getItem('portfolio'))['wallet'];
    this.portfolio = JSON.parse(localStorage.getItem('portfolio'))['stocks'];
    // this.portfolio = Object.entries(temp).map((e) => ({ [e[0]]: e[1] }));
    // this.portfolio.filter((obj) => {
    //   Object.values['quantityOwned'] > 0;
    // });
    // console.log(this.portfolio);
  }

  ngOnChanges(changes: any): void {
    this.ngOnInit();
  }
}
