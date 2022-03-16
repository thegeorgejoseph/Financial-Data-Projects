import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SearchdetailsComponent } from './components/searchdetails/searchdetails.component';

const routes: Routes = [
  { path: '', redirectTo: 'search/home', pathMatch: 'full' },
  { path: 'search/home', component: SearchComponent, pathMatch: 'full' },
  { path: 'search/:ticker', component: SearchComponent, children: [{ path:'', component: SearchdetailsComponent}]},
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
