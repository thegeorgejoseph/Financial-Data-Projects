import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';
@Component({
  selector: 'app-descript-right',
  templateUrl: './descript-right.component.html',
  styleUrls: ['./descript-right.component.css'],
})
export class DescriptRightComponent implements OnInit {
  localData;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService() {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      this.localData.t = new Date(this.localData.t * 1000);
    });
  }
}
