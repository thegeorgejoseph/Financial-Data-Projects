import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
@Component({
  selector: 'app-descript-middle',
  templateUrl: './descript-middle.component.html',
  styleUrls: ['./descript-middle.component.css'],
})
export class DescriptMiddleComponent implements OnInit {
  localData;
  isClosed: boolean = false;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService() {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      const current = new Date();
      if (this.localData.t != 0) {
        const timestamp = new Date(this.localData.t * 1000);
        if (Math.floor((current.getTime() - timestamp.getTime()) / 60000) < 5) {
          this.isClosed = true;
        }
      }
    });
  }
}
