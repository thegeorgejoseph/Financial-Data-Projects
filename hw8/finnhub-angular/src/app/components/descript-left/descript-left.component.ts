import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
@Component({
  selector: 'app-descript-left',
  templateUrl: './descript-left.component.html',
  styleUrls: ['./descript-left.component.css'],
})
export class DescriptLeftComponent implements OnInit {
  localData;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.getDataFromService();
  }

  getDataFromService() {
    this.data$.subject.subscribe((data) => (this.localData = data));
  }
}
