import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataServiceService } from 'src/app/services/data-service.service';
interface PortfolioStock {
  quantityOwned: number;
  totalCost: number;
}
@Component({
  selector: 'app-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css'],
})
export class BuysellComponent implements OnInit, OnChanges {
  closeResult = '';
  localData;
  quantity: any = '';
  total;
  walletMoney;
  didBuy: boolean = false;
  ticker;
  quantityToSell;
  sellQuantity: any = '';
  constructor(
    private modalService: NgbModal,
    private data$: DataServiceService
  ) {}

  ngOnInit(): void {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      if (this.localData.containsData) {
        this.localData = data;
      }
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.ngOnInit();
  }

  buyStocks(ticker) {
    this.ticker = ticker;
    let currentTotalBuyPrice = this.quantity * this.localData.c;
    let portfolioMoney = JSON.parse(localStorage.getItem('portfolio'))[
      'wallet'
    ];
    let updatedMoney = portfolioMoney - currentTotalBuyPrice;
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let stocks = portfolio['stocks'];
    let stock: PortfolioStock;
    if (stocks.hasOwnProperty(ticker)) {
      stock = stocks[ticker];
      stock.quantityOwned = stock.quantityOwned + this.quantity;
      stock.totalCost = stock.totalCost + currentTotalBuyPrice;
      // stocks[ticker] = stock;
    } else {
      stock = {
        quantityOwned: this.quantity,
        totalCost: currentTotalBuyPrice,
      };
    }
    stocks[ticker] = stock;
    portfolio['wallet'] = updatedMoney;
    portfolio['stocks'] = stocks;
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    this.quantityToSell = this.quantity;
    this.walletMoney = updatedMoney;
    this.didBuy = true;
  }

  sellStocks(ticker) {
    // this.quantityToSell =
    //   JSON.parse(localStorage.getItem('portfolio'))['stocks'][ticker][
    //     'quantityOwned'
    //   ] || 0;
    let currentSellPrice = this.sellQuantity * this.localData.c;
    let portfolioMoney = JSON.parse(localStorage.getItem('portfolio'))[
      'wallet'
    ];
    let updatedMoney = portfolioMoney + currentSellPrice;
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let stocks = portfolio['stocks'];
    let stock: PortfolioStock;
    if (stocks.hasOwnProperty(ticker)) {
      stock = stocks[ticker];
      stock.quantityOwned = stock.quantityOwned - this.sellQuantity;
      stock.totalCost = stock.totalCost + currentSellPrice;
      // stocks[ticker] = stock;
    } else {
      stock = {
        quantityOwned: this.quantity,
        totalCost: currentSellPrice,
      };
    }
    stocks[ticker] = stock;
    portfolio['wallet'] = updatedMoney;
    portfolio['stocks'] = stocks;
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    this.walletMoney = updatedMoney;
  }
}
