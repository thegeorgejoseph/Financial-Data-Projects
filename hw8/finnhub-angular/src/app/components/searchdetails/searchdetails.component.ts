import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css'],
})
export class SearchdetailsComponent implements OnInit {
  ticker = localStorage.getItem('ticker');
  constructor() {}

  ngOnInit(): void {}
}
