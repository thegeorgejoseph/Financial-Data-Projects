import { getCurrencySymbol } from '@angular/common';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.css'],
})
export class WatchlistCardComponent implements OnInit {
  @Input() data;
  isPositive: boolean;
  color = 'black';
  constructor(private data$: DataServiceService) {}

  ngOnInit(): void {
    if (this.data.dp > 0) {
      this.isPositive = true;
      this.color = 'green';
    } else if (this.data.dp < 0) {
      this.isPositive = false;
      this.color = 'red';
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //     this.ngOnInit();
  // }
}
