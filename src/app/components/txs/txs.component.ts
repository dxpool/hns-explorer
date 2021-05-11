import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-txs',
  templateUrl: './txs.component.html',
  styleUrls: ['./txs.component.scss']
})
export class TxsComponent {
  @Input() list: any[];
  @Input() page: number;
  @Input() total: number;
  @Input() pageSize: number;
  @Input() changePage: Function;
  @Input() address: string;

  data = [];

  constructor() { }

  ngOnChanges(): void {
    this.data = [];

    for (const tx of this.list) {
      const inputs = [];

      for (const input of tx.inputs) {
        let from = '';
        if (input.coinbase) {
          from = 'coinbase';
        } else if (input.airdrop) {
          from = 'airdrop';
        }

        inputs.push({
          coinbase: input.coinbase,
          from,
          value: input.value,
          address: input.address
        });
      }

      this.data.push({
        inputs,
        outputs: tx.outputs,
        hash: tx.hash,
        fee: tx.fee,
        time: tx.time
      });
    }
  }
}
