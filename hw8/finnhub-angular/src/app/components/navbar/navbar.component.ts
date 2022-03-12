import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isPrimary: string;

  constructor() {}

  ngOnInit(): void {}

  changeLinkNumber1(): void {
    this.isPrimary = '1';
  }
  changeLinkNumber2(): void {
    this.isPrimary = '2';
  }
  changeLinkNumber3(): void {
    this.isPrimary = '3';
  }
}
