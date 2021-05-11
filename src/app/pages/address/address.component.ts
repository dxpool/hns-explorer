import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnDestroy {
  spy: any;

  list = [];
  page = 1;
  total = 0;
  pageSize = 20;

  address = '';
  info = {
    confirmed: 0,
    received: 0,
    spent: 0
  };

  constructor(private api: ApiService, private router: Router) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.address = e.url.split('/')[2];
        this.handleAddress(this.address);
        this.handleTxs(this.address, 1);
      }
    });
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  async handleAddress(addr: string) {
    try {
      const info = await this.api.getAddress(addr);
      this.info = info;
    } catch (error) {
      console.error(error);
    }
  }

  async handleTxs(addr: string, page: number) {
    try {
      const txs = await this.api.getTxs(this.pageSize, (page - 1) * this.pageSize, null, addr);
      this.page = page;
      this.list = txs.result;
      this.total = txs.total;

    } catch (error) {
      console.error(error);
    }
  }

  changePage(page: number) {
    this.handleTxs(this.address, page);
  }
}
