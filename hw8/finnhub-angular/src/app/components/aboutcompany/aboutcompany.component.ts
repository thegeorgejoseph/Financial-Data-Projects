import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../services/data-service.service';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aboutcompany',
  templateUrl: './aboutcompany.component.html',
  styleUrls: ['./aboutcompany.component.css'],
})
export class AboutcompanyComponent implements OnInit {
  localData;
  companyDescriptionObject;
  constructor(
    private data$: DataServiceService,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToDataStream();
  }

  subscribeToDataStream() {
    this.data$.subject.subscribe((data) => (this.localData = data));
  }

  clickIt() {
    window.open(this.localData.weburl.slice(0, -1));
  }

  peerClick(ticker) {
    this.onSubmit(ticker);
    // this.router.navigate(['/search', `${ticker}`]);
  }
  onSubmit(ticker): void {
    localStorage.setItem('ticker', ticker);
    this.router.navigateByUrl(`search/${ticker}`);
    //here need to load the loading component / set the variable that will load the loading component and then
    this.searchService.getCompanyDescription(ticker).subscribe((res) => {
      this.companyDescriptionObject = res;
      this.data$.sendData(this.companyDescriptionObject);
    });

    console.log('submitted!');
  }
}
