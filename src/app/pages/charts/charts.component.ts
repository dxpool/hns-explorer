import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Chart from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit, OnDestroy {
  burnedChart: Chart;
  supplyChart: Chart;
  txChart: Chart;
  totalTxChart: Chart;
  diffChart: Chart;

  text: any;

  langEvent: Subscription;

  constructor(private api: ApiService, private translate: TranslateService) {
    this.langEvent = this.translate.onLangChange.subscribe(() => {
      this.initAllCharts();
    });
  }

  ngOnInit(): void {
    this.initAllCharts();
  }

  ngOnDestroy(): void {
    this.langEvent.unsubscribe();
  }

  async initAllCharts() {
    const end = Math.round(new Date().getTime() / 1000);
    const start = end - 1000 * 24 * 60 * 60;
    this.text = await this.translate.get('chart').toPromise();

    this.handleBurnedChart(start, end);
    this.handleSupplyChart(start, end);
    this.handleTxChart(start, end);
    this.handleTotalTxChart(start, end);
    this.handleDiffChart(start, end);
  }

  async handleBurnedChart(startTime: number, endTime: number) {
    try {
      const { labels, data } = await this.handleChartData('burned', startTime, endTime);
      if (this.burnedChart) this.burnedChart.destroy();

      this.burnedChart = this.initChart('burned', this.text.burnedAmount, labels, data);
    } catch (error) {
      console.error(error);
    }
  }

  async handleSupplyChart(startTime: number, endTime: number) {
    try {
      const { labels, data } = await this.handleChartData('supply', startTime, endTime);
      if (this.supplyChart) this.supplyChart.destroy();

      this.supplyChart = this.initChart('supply', this.text.supplyAmount, labels, data);
    } catch (error) {
      console.error(error);
    }
  }

  async handleTxChart(startTime: number, endTime: number) {
    try {
      const { labels, data } = await this.handleChartData('dailyTransactions', startTime, endTime);
      if (this.txChart) this.txChart.destroy();

      this.txChart = this.initChart('tx', this.text.dailyTransactions, labels, data);

    } catch (error) {
      console.error(error);
    }
  }

  async handleTotalTxChart(startTime: number, endTime: number) {
    try {
      const { labels, data } = await this.handleChartData('dailyTotalTransactions', startTime, endTime);
      if (this.totalTxChart) this.totalTxChart.destroy();

      this.totalTxChart = this.initChart('totalTx', this.text.dailyTotalTransactions, labels, data);
    } catch (error) {
      console.error(error);
    }
  }

  async handleDiffChart(startTime: number, endTime: number) {
    try {
      const { labels, data } = await this.handleChartData('difficulty', startTime, endTime);
      if (this.diffChart) this.diffChart.destroy();

      this.diffChart = this.initChart('diff', this.text.difficulty, labels, data);
    } catch (error) {
      console.error(error);
    }
  }

  async handleChartData(type: string, startTime: number, endTime: number) {
    const result = await this.api.getCharts(type, startTime, endTime);

    const labels = [];
    const data = [];
    for (const item of result) {
      labels.push(item.date);
      data.push(item.value);
    }

    return { labels, data };
  }

  initChart(id: string, label: string, labels: any[], data: any[]) {
    return new Chart(id, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          label,
          fill: false,
          pointStyle: 'dash',
          borderColor: '#3498DB'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              autoSkipPadding: 50,
              source: 'auto'
            },
            time: {
              displayFormats: {
                millisecond: 'MM-DD',
                second: 'MM-DD',
                minute: 'MM-DD',
                hour: 'MM-DD',
                day: 'MM-DD',
                week: 'MM-DD',
                month: 'MM-DD',
                quarter: 'MM-DD',
                year: 'MM-DD'
              }
            }
          }],
          yAxes: [{
            ticks: {
              callback: this.handleTicks
            }
          }]
        },
        tooltips: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }

  handleTicks(tick: number) {
    const unit = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
    let index = 0;
    for (let i = 0; i < unit.length; i++) {
      if (tick < 1000) break;

      tick = tick / 1000;
      index++;
    }

    return parseFloat(tick.toFixed(2)) + unit[index];
  }
}
