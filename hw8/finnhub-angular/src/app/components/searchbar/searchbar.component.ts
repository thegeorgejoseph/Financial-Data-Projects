import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  ticker: string;
  constructor() {}

  ngOnInit(): void {}

  searchThis(): void {
    if (!this.ticker) {
      return console.log('the ticker is empty right now');
    }
    console.log(this.ticker);
  }

  onSubmit(): void {
    return;
  }
}
