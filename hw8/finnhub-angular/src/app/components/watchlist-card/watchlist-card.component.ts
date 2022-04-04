import { getCurrencySymbol } from '@angular/common';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.css'],
})
export class WatchlistCardComponent implements OnInit {
  @Input() data;
  @Input() localData;
  isPositive: boolean;
  color = 'black';
  @Output() onRemove = new EventEmitter<string>();
  constructor(private data$: DataServiceService, private router: Router) {}

  ngOnInit(): void {
    if (this.data.dp > 0) {
      this.isPositive = true;
      this.color = 'green';
    } else if (this.data.dp < 0) {
      this.isPositive = false;
      this.color = 'red';
    }
  }
  removeFromWatchList() {
    this.onRemove.emit(this.data.ticker);
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //     this.ngOnInit();
  // }
  goToRoute() {
    localStorage.setItem('ticker', this.data.ticker);
    this.router.navigate(['/search', `home`]);
    this.router.navigate(['/search', `${this.data.ticker}`]);
    let tickerInfoToPopulate = this.localData['history'][`${this.data.ticker}`];
    this.data$.sendData(tickerInfoToPopulate);
  }
}
