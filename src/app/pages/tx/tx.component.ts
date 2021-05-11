import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.scss']
})
export class TxComponent implements OnDestroy {
  spy: any;

  txid: string;
  data = {
    time: 0,
    height: 0,
    confirmations: 0,
    fee: 0,
    inputs: [],
    outputs: []
  };
  value = 0;

  constructor(private api: ApiService, private router: Router) {
    this.spy = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.txid = e.url.split('/')[2];
        this.handleTx(this.txid);
      }
    });
  }

  ngOnDestroy(): void {
    this.spy.unsubscribe();
  }

  async handleTx(txid: string) {
    try {
      const info = await this.api.getTx(txid);

      let value = 0;
      info.inputs.forEach((input) => {
        value += input.value;
      });

      this.value = value;
      this.data = info;

    } catch (error) {
      console.error(error);
    }
  }
}
