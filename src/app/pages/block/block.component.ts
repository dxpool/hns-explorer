import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnDestroy {
  spy: any;
  height: number;
  data = {
    time: 0,
    difficulty: 0,
    weight: 0,
    pool: {
      name: null,
      url: null
    },
    confirmations: 0,
    fees: 0,
    hash: '',
    prevBlock: '',
    nextHash: '',
    merkleRoot: '',
    bits: 0,
    nonce: 0
  }

  pageSize = 20;
  total = 1;
  page = 1;
  txs = [];

  constructor(private api: ApiService, private router: Router) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.height = parseInt(e.url.split('/')[2]);
        this.handleBlock(this.height);
        this.handleTxs(1);
      }
    });
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  async handleBlock(height: number) {
    try {
      const block = await this.api.getBlock(height);

      this.data = block;
    } catch (error) {
      console.error(error);
    }
  }

  async handleTxs(page: number) {
    try {
      const txs = await this.api.getTxs(this.pageSize, (page - 1) * this.pageSize, this.height);
      this.page = page;
      this.total = txs.total;

      this.txs = txs.result;
    } catch (error) {
      console.error(error);
    }
  }

  changePage(page: number) {
    this.handleTxs(page);
  }
}
