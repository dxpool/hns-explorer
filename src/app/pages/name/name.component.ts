import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnDestroy {
  spy: any;
  name: string;
  data = {
    name: '',
    blocksUntil: 0,
    hash: '',
    height: 0,
    highest: 0,
    nextState: '',
    release: 0,
    renewal: 0,
    renewals: 0,
    reserved: false,
    revoked: 0,
    state: '',
    transfer: 0,
    value: 0,
    weak: false,
    bids: []
  };

  bids = [];

  history = [];
  list = [];
  pageSize = 20;
  page = 1;
  total = 0;
  loading = true;

  constructor(private api: ApiService, private router: Router) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.name = e.url.split('/')[2];
        this.handleName(this.name);
        this.handleHistory(this.name);
      }
    });
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  async handleName(name: string) {
    try {
      this.data = await this.api.getName(name);

      const bids = [];
      for (let i = 0; i < this.data.bids.length; i++) {
        bids.push(Object.assign({ id: this.data.bids.length - i }, this.data.bids[i]));
      }

      this.bids = bids;

    } catch (error) {
      console.error(error);
    }
  }

  async handleHistory(name: string) {
    try {
      this.loading = true;

      const data = await this.api.getNameHistory(name);

      this.history = data.result;
      this.total = data.result.length;
      this.changePage(1);

      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  changePage(page: number) {
    this.page = page;
    this.list = this.history.slice((page - 1) * this.pageSize, page * this.pageSize);
  }
}
