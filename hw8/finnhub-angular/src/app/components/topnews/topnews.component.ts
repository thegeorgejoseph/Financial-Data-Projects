import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { SearchService } from '../../services/search.service';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.css'],
})
export class TopnewsComponent implements OnInit {
  localData;
  newsList;
  tempList;
  isLoaded;
  @ViewChild('newscard1', { static: false }) newscardChild: NewsCardComponent;
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
      this.isLoaded = false;
      this.localData = data;
      if (this.localData.containsData) {
        this.newsList = this.localData.news;
        // console.log(this.newsList);
        this.tempList = [...Array(Object.keys(this.newsList).length).keys()];
        this.isLoaded = true;
      }
    });
  }

  getItem(item) {
    return this.newsList[item];
  }
}
