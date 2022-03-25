import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { SearchService } from '../../services/search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent implements OnInit, OnChanges {
  @Input() newsItem;
  image;
  url;
  headline;
  source;
  date;
  description;
  // @Input() name;
  closeResult = '';
  localData;
  monthMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  constructor(
    private data$: DataServiceService,
    private searchService: SearchService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // console.log(this.newsItem);
    this.image = this.newsItem.image;
    this.url = this.newsItem.url;
    this.headline = this.newsItem.headline;
    this.source = this.newsItem.source;
    let tempDate = new Date(this.newsItem.datetime * 1000);
    let month = this.monthMap[tempDate.getMonth() + 1];
    let day = tempDate.getDate();
    let year = tempDate.getFullYear();
    this.date = `${month} ${day}, ${year}`;
    this.description = this.newsItem.summary;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }
}
