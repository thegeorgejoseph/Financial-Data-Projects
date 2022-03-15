import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  ticker: string;
  options;
  constructor(private AutoCompleteService: SearchService) {}

  ngOnInit(): void {
    this.searchThis();
  }

  searchThis(): void {
    if (!this.ticker) {
      return console.log('the ticker is empty right now');
    }

    this.AutoCompleteService.getAutoCompleteData(this.ticker)
      .pipe(debounceTime(2000))
      .subscribe((response) => {
        this.options = response;
      });
  }

  onSubmit(): void {
    return;
  }
}
