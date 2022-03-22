import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-hlop',
  templateUrl: './hlop.component.html',
  styleUrls: ['./hlop.component.css'],
})
export class HLOPComponent implements OnInit, OnDestroy {
  localData;
  intervalId;
  autoUpdateData;
  constructor(
    private data$: DataServiceService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getHLOP();
  }

  ngOnDestroy(): void {
    if (this.intervalId !== 'undefined') {
      clearInterval(this.intervalId);
    }
  }

  getHLOP() {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      // console.log(this.localData);
      if (this.localData.containsData) {
        this.ngOnDestroy();
        // if (
        //   (this.localData.h + '').split('.')[1].length > 2 ||
        //   (this.localData.l + '').split('.')[1].length > 2 ||
        //   (this.localData.o + '').split('.')[1].length > 2 ||
        //   (this.localData.pc + '').split('.')[1].length > 2
        // ) {
        // }

        this.localData.h = this.roundMe(this.localData.h);
        this.localData.l = this.roundMe(this.localData.l);
        this.localData.o = this.roundMe(this.localData.o);
        this.localData.pc = this.roundMe(this.localData.pc);

        // this.callSearchServiceAutoUpdater();
      }
    });
  }
  roundMe(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
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
