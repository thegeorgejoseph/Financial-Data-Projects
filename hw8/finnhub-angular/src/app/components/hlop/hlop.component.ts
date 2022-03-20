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
      if (this.localData.containsData) {
        this.ngOnDestroy();
        this.localData.h = this.localData.h.toFixed(2);
        this.localData.l = this.localData.l.toFixed(2);
        this.localData.o = this.localData.o.toFixed(2);
        this.localData.pc = this.localData.pc.toFixed(2);

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
