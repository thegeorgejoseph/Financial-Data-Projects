import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css'],
})
export class SearchdetailsComponent implements OnInit {
  ticker = localStorage.getItem('ticker');
  localData;
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    this.data$.subject.subscribe(data => this.localData = data)
  }
}
