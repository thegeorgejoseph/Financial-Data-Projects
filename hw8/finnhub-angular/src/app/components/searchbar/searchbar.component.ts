import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  ticker: string;
  defaultOptions;
  options;
  isLoading: boolean;

  constructor(
    private AutoCompleteService: SearchService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.searchThis();
  }

  searchThis(): void {
    if (!this.ticker) {
      this.onClear();
      return console.log('the ticker is empty right now');
    }
    this.options = [];
    this.isLoading = true;
    this.AutoCompleteService.getAutoCompleteData(this.ticker)
      .pipe(debounceTime(500))
      .subscribe((response) => {
        this.options = response;
        this.isLoading = false;
      });
  }

  setTicker() {
    this.ticker = this.ticker.split(' ')[0];
  }
  onSubmit(): void {
    localStorage.setItem('ticker', this.ticker);
    this.router.navigateByUrl(`search/${this.ticker}`);
    console.log('submitted!');
  }

  onClear() {
    this.options = [];
    this.isLoading = false;
    this.ticker = '';
  }
}
