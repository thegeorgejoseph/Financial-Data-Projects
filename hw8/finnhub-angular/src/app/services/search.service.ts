import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, map, filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAutoCompleteData(value) {
    return this.http.get(`http://localhost:5003/autocomplete/${value}`);
  }
}
