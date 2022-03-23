import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent implements OnInit {
  @Input() newsItem;
  image;
  url;
  headline;

  constructor(
    private data$: DataServiceService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.image = this.newsItem.image;
    this.url = this.newsItem.url;
    this.headline = this.newsItem.headline;
  }
}
