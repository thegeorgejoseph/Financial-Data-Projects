import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
@Component({
  selector: 'app-descript-middle',
  templateUrl: './descript-middle.component.html',
  styleUrls: ['./descript-middle.component.css'],
})
export class DescriptMiddleComponent implements OnInit {
  localData;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService() {
    this.data$.subject.subscribe((data) => (this.localData = data));
  }
}
