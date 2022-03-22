import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AutoupdaterService } from 'src/app/services/autoupdater.service';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-descript-right',
  templateUrl: './descript-right.component.html',
  styleUrls: ['./descript-right.component.css'],
})
export class DescriptRightComponent implements OnInit, OnDestroy {
  localData;
  autoUpdateData;
  color = 'black';
  isPositive: boolean;
  intervalId: any;
  constructor(
    private data$: DataServiceService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  ngOnDestroy(): void {
    if (this.intervalId !== 'undefined') {
      clearInterval(this.intervalId);
    }
  }

  getDataFromService() {
    // console.log(this.isPositive);
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      // console.log(this.localData);
      if (this.localData.containsData) {
        this.ngOnDestroy();
        if (!new String(this.localData.t).includes(':')) {
          this.localData.t = new Date(this.localData.t * 1000)
            .toISOString()
            .split('.')[0]
            .replace('T', ' ');
          this.localData.c = this.localData.c.toFixed(2);
          this.localData.d = this.localData.d.toFixed(2);
          this.localData.dp = this.localData.dp.toFixed(2);
        }
        if (this.localData.dp > 0) {
          this.color = 'green';
          this.isPositive = true;
        } else if (this.localData.dp < 0) {
          this.color = 'red';
          this.isPositive = false;
        }
        // this.callSearchServiceAutoUpdater();
      }
    });
  }

  callSearchServiceAutoUpdater() {
    this.intervalId = setInterval(
      () =>
        this.searchService
          .runAutoUpdater(this.localData.ticker)
          .subscribe((res) => {
            this.autoUpdateData = res;
            this.data$.sendData(this.autoUpdateData);
          }),
      15000
    );
  }
}
