import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlocksComponent } from './pages/blocks/blocks.component';
import { NamesComponent } from './pages/names/names.component';
import { BlockComponent } from './pages/block/block.component';
import { NameComponent } from './pages/name/name.component';
import { TxComponent } from './pages/tx/tx.component';
import { AddressComponent } from './pages/address/address.component';
import { SearchComponent } from './pages/search/search.component';
import { ChartsComponent } from './pages/charts/charts.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'names', component: NamesComponent },
  { path: 'block/:height', component: BlockComponent },
  { path: 'name/:name', component: NameComponent },
  { path: 'tx/:txid', component: TxComponent },
  { path: 'address/:address', component: AddressComponent },
  { path: 'search', component: SearchComponent },
  { path: 'charts', component: ChartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
