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
      console.log('calling');
      this.localData = data;
      if (
        JSON.parse(localStorage.getItem('watchlist')).includes(
          localStorage.getItem('ticker')
        )
      ) {
        this.didClick = true;
      } else {
        this.didClick = false;
      }
    });
  }

  changeStar() {
    this.didClick = !this.didClick;
    if (this.didClick) {
      let localWatchList = JSON.parse(localStorage.getItem('watchlist'));
      localWatchList.push(localStorage.getItem('ticker'));
      localStorage.setItem('watchlist', JSON.stringify(localWatchList));
    } else {
      let localWatchList = JSON.parse(localStorage.getItem('watchlist'));
      localWatchList = localWatchList.filter(
        (x) => x !== localStorage.getItem('ticker')
      );
      localStorage.setItem('watchlist', JSON.stringify(localWatchList));
    }
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
