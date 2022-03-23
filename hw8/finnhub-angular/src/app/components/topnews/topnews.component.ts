import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.css'],
})
export class TopnewsComponent implements OnInit {
  localData;
  newsList;
  tempList = [0, 1, 2, 3, 4];
  isLoaded;
  constructor(
    private data$: DataServiceService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getDataFromService();
  }

  getDataFromService() {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      if (this.localData.containsData) {
        this.newsList = this.localData.news;
        this.isLoaded = true;
      }
    });
  }
}
