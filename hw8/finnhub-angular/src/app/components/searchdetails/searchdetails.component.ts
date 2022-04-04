import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { BuysellComponent } from '../buysell/buysell.component';
import { debounceTime } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { MessageBundle } from '@angular/compiler';

@Component({
  selector: 'app-searchdetails',
  templateUrl: './searchdetails.component.html',
  styleUrls: ['./searchdetails.component.css'],
})
export class SearchdetailsComponent implements OnInit {
  ticker = localStorage.getItem('ticker');
  localData;
  successMessage = '';
  showAlert = false;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  constructor(
    private data$: DataServiceService,
    private alert$: AlertServiceService
  ) {}

  ngOnInit(): void {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      console.log(this.localData);
    });
    this.alert$.subject.subscribe((message) => {
      this.successMessage = message;
      if (this.successMessage !== '') {
        setTimeout(() => this.selfClosingAlert.close(), 5000);
      }
    });
  }
}
