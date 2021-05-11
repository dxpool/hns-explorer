import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnDestroy {
  pageSize = 20;
  lists = [];
  page = 1;
  total = 0;
  loading = true;
  query = {
    page: null,
    status: null
  };

  biddingRank = [];
  biddingRankType = ['monthBid', 'weekBid'];
  rankIndex = 0;

  highestHistory = [];

  status = ['all', 'opening', 'bidding', 'reveal', 'closed', 'locked'];
  selectedStatus = 'all';

  spy: Subscription;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.handleBiddingRank(this.rankIndex);
    this.handleHighestHistory();

    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const page = this.route.snapshot.queryParams.page || 1;
        const status = this.route.snapshot.queryParams.status || null;
        this.selectedStatus = status === null ? 'all' : status;

        this.handleNames(page, status);
      }
    });
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  changePage(page: number): void {
    this.query.page = page;
    this.router.navigate(['/names'], { queryParams: this.query });
  }

  async changeStatus(type: string) {
    if (this.query.status !== type) {
      this.query.status = type === 'all' ? null : type;
      this.query.page = null;
      this.router.navigate(['/names'], { queryParams: this.query });
    }
  }

  async handleNames(page: number, status: string) {
    try {
      this.loading = true;
      const list = await this.api.getNames(this.pageSize, (page - 1) * this.pageSize, status);
      this.page = page;

      this.lists = list.result;
      this.total = list.total;

      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  async handleBiddingRank(index: number) {
    try {
      this.rankIndex = index;
      const list = await this.api.getNames(10, 0, undefined, this.biddingRankType[index]);
      this.biddingRank = list.result;
    } catch (error) {
      console.error(error);
    }
  }

  async handleHighestHistory() {
    try {
      const list = await this.api.getNames(10, 0, undefined, 'value');
      this.highestHistory = list.result;
    } catch (error) {
      console.error(error);
    }
  }
}
