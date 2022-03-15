import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  ticker: string;
  defaultOptions;
  options;
  formGroup: FormGroup;

  constructor(
    private AutoCompleteService: SearchService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchThis();
  }

  searchThis(): void {
    if (!this.ticker) {
      this.options = [];
      return console.log('the ticker is empty right now');
    }

    this.AutoCompleteService.getAutoCompleteData(this.ticker)
      .pipe(debounceTime(500))
      .subscribe((response) => {
        this.options = response;
      });
  }

  onSubmit(): void {
    console.log('submitted!');
  }
}
