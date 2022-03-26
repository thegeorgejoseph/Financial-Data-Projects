import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SearchComponent } from './components/search/search.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SearchdetailsComponent } from './components/searchdetails/searchdetails.component';

import { DataServiceService } from './services/data-service.service';
import { AutoupdaterService } from './services/autoupdater.service';
import { DescriptLeftComponent } from './components/descript-left/descript-left.component';
import { DescriptMiddleComponent } from './components/descript-middle/descript-middle.component';
import { DescriptRightComponent } from './components/descript-right/descript-right.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TopnewsComponent } from './components/topnews/topnews.component';
import { ChartsComponent } from './components/charts/charts.component';
import { InsightsComponent } from './components/insights/insights.component';
import { HLOPComponent } from './components/hlop/hlop.component';
import { AboutcompanyComponent } from './components/aboutcompany/aboutcompany.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { WatchlistCardComponent } from './components/watchlist-card/watchlist-card.component';
import { BuysellComponent } from './components/buysell/buysell.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WatchlistComponent,
    PortfolioComponent,
    SearchComponent,
    SearchbarComponent,
    SearchdetailsComponent,
    DescriptLeftComponent,
    DescriptMiddleComponent,
    DescriptRightComponent,
    SummaryComponent,
    TopnewsComponent,
    ChartsComponent,
    InsightsComponent,
    HLOPComponent,
    AboutcompanyComponent,
    NewsCardComponent,
    WatchlistCardComponent,
    BuysellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    BrowserAnimationsModule,
  ],
  providers: [DataServiceService, AutoupdaterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
