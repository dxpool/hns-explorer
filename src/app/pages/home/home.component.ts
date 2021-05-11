import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faCubes, faExchangeAlt, faDatabase, faCogs, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { Chart } from 'chart.js';
import { UtilsService } from 'src/app/services/util.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  network = {
    hashrate: {
      amount: 0,
      unit: 'H/s'
    },
    txs: 0,
    network: '',
    names: 0,
    diff: {
      sub: '0',
      sup: 0
    },
    chainwork: {
      sub: '0',
      sup: 0
    }
  };

  txs = [];

  blocks = [];

  faCubes = faCubes;
  faExchangeAlt = faExchangeAlt;
  faDatabase = faDatabase;
  faEnvelopeOpenText = faEnvelopeOpen;
  faCogs = faCogs;
  faBriefcase = faBriefcase;

  poolPieChart: Chart;
  poolData = [];
  poolTotal = 1;
  hashrate = 0;
  currentSpan = 7;

  trans: TranslateService;

  constructor(private api: ApiService, private util: UtilsService, private translateService: TranslateService) {
    this.trans = this.translateService;
  }

  ngOnInit(): void {
    this.handleSummary();
    this.handleTxsList();
    this.handleBlocksList();
  }

  async handleSummary() {
    try {
      const res = await this.api.getSummary();

      this.hashrate = res.hashrate;
      this.handlePoolChart(7);

      this.network.hashrate = this.handleHashrate(res.hashrate);
      this.network.txs = res.unconfirmed;
      this.network.network = res.network;
      this.network.names = res.registeredNames;
      this.network.diff = this.handleBigNum(res.difficulty.toString());
      this.network.chainwork = this.handleBigNum(parseInt(res.chainWork, 16).toString());
    } catch (error) {
      console.error(error);
    }
  }

  async handleTxsList() {
    try {
      const res = await this.api.getTxs(5);
      this.txs = res.result;
    } catch (error) {
      console.error(error);
    }
  }

  async handleBlocksList() {
    try {
      const res = await this.api.getBlocks(10, 0);
      this.blocks = res.result;
    } catch (error) {
      console.error(error);
    }
  }

  async handlePoolChart(span: number) {
    try {
      this.currentSpan = span;
      const now = Math.round(new Date().getTime() / 1000);
      const data = await this.api.getBlockDistribution(now - span * 24 * 60 * 60, now);

      this.poolData = [{
        poolName: 'Network',
        count: data.total,
        share: 1,
        hashrate: this.network.hashrate
      }];

      this.poolTotal = data.total;

      const labels = [];
      const counts = [];
      for (const item of data.items) {
        labels.push(item.poolName);
        counts.push(item.count);

        const share = data.total > 0 ? item.count / data.total : 0;
        this.poolData.push({
          poolName: item.poolName,
          count: item.count,
          share: share,
          hashrate: this.handleHashrate(share * this.hashrate),
          url: item.url
        });
      }

      if (this.poolPieChart) this.poolPieChart.destroy();

      this.poolPieChart = new Chart('poolPie', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            backgroundColor: this.util.getColor(counts.length)
          }]
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleHashrate(amount: number) {
    const units = ['K', 'M', 'G', 'T', 'P', 'E'];
    let unit = '';
    for (const item of units) {
      if (amount < 1000) break;

      amount = amount / 1000;
      unit = item;
    }

    return { amount, unit: `${unit}H/s` };
  }

  handleBigNum(str: string) {
    if (str.indexOf('+') !== -1) {
      return {
        sub: str.substring(0, 6),
        sup: parseInt(str.split('+')[1])
      }
    } else {
      const index = str.length - 1;
      return {
        sub: str.substring(0, 1) + '.' + str.substring(1, 5),
        sup: index
      }
    }
  }
}
