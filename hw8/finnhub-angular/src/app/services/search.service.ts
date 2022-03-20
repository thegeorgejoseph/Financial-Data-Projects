import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, map, filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

const BACKEND_URL = 'http://localhost:5003';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAutoCompleteData(value) {
    return this.http.get(`${BACKEND_URL}/autocomplete/${value}`);
  }

  getCompanyDescription(value) {
    return this.http.get(`${BACKEND_URL}/companydescript/${value}`);
  }

  runAutoUpdater(value) {
    return this.http.get(`${BACKEND_URL}/autoupdate/${value}`);
  }
  
}
