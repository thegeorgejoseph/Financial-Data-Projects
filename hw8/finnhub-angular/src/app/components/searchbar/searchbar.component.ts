import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

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
  companyDescriptionObject;

  constructor(
    private SearchService: SearchService,
    public router: Router,
    private data$: DataServiceService
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
    this.SearchService.getAutoCompleteData(this.ticker)
      .pipe(debounceTime(500))
      .subscribe((response) => {
        this.options = response;
        this.isLoading = false;
      });
  }

  setTicker() {
    this.ticker = this.ticker.split(' ')[0];
    // this.data$.sendData({ ticker: this.ticker }); // this is the reason for the dynamic rendering in the searchdetails child so remove this if there is a bug
  }
  onSubmit(): void {
    localStorage.setItem('ticker', this.ticker);
    this.router.navigateByUrl(`search/${this.ticker}`);
    //here need to load the loading component / set the variable that will load the loading component and then
    this.SearchService.getCompanyDescription(this.ticker).subscribe((res) => {
      this.companyDescriptionObject = res;
      this.data$.sendData(this.companyDescriptionObject);
    });

    console.log('submitted!');
  }

  onClear() {
    this.options = [];
    this.isLoading = false;
    this.ticker = '';
  }

  clearLocal(): void {
    localStorage.removeItem('ticker'); // clearing local storage for development purposes
    localStorage.removeItem('dataStream');
  }

  homeRoute(): void {
    this.router.navigateByUrl('/search/home');
  }
}
