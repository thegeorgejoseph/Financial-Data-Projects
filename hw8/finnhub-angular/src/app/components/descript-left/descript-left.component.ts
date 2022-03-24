import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
@Component({
  selector: 'app-descript-left',
  templateUrl: './descript-left.component.html',
  styleUrls: ['./descript-left.component.css'],
})
export class DescriptLeftComponent implements OnInit {
  localData;
  didClick: boolean;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService() {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      this.didClick = this.localData.didClick;
    });
  }

  changeStar() {
    this.didClick = !this.didClick;
    let watchlist = this.localData.watchlist;
    if (watchlist.hasOwnProperty(localStorage.getItem('ticker'))) {
      delete watchlist[localStorage.getItem('ticker')];
    } else {
      watchlist[localStorage.getItem('ticker')] = {
        ticker: this.localData.ticker,
        name: this.localData.name,
        c: this.localData.c,
        d: this.localData.d,
        dp: this.localData.dp,
      };
    }
    this.data$.sendData({ watchlist: watchlist, didClick: this.didClick });
  }
}
