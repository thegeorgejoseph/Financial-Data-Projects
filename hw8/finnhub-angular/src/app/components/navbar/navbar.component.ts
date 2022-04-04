import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnChanges {
  isPrimary: string;

  constructor(public router: Router, private data$: DataServiceService) {}

  ngOnInit(): void {
    if (this.router.url === '/watchlist') {
      this.changeLinkNumber2();
    } else if (this.router.url === '/portfolio') {
      this.changeLinkNumber3();
    } else {
      this.changeLinkNumber1();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('something changed');
    this.ngOnInit();
  }
  changeLinkNumber1(): void {
    const ticker = localStorage.getItem('ticker');
    if (ticker) {
      this.router.navigate(['/search', `${ticker}`]);
      this.isPrimary = '1';
    } else {
      this.router.navigate(['/search', 'home']);
      this.isPrimary = '0'; //preventing other buttons from retaining their style
    }
  }
  changeLinkNumber2(): void {
    this.isPrimary = '2';
  }
  changeLinkNumber3(): void {
    this.isPrimary = '3';
  }
}
