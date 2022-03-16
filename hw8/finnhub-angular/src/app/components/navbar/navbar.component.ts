import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isPrimary: string;

  constructor(public router: Router) {}

  ngOnInit(): void {}

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
