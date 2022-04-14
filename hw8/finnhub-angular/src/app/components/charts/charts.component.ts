import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts/highstock';

import { DataServiceService } from 'src/app/services/data-service.service';

HVBP(Highcharts);
HExporting(Highcharts);
HMore(Highcharts);
HIndicators(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, OnChanges {
  highcharts = Highcharts;
  optionsChart: Highcharts.Options = {};
  localData;
  constructor(private data$: DataServiceService) {}

  ngOnChanges(changes: any): void {
    this.data$.subject.subscribe((data) => {
      this.localData = data;
      this.updateMe();
    });
  }
  ngOnInit(): void {
    this.updateMe();
  }

  updateMe(): any {
    this.optionsChart = {
      title: {
        text: this.highcharts.title,
      },

      subtitle: {
        text: 'With SMA and Volume by Price technical indicators',
      },

      rangeSelector: {
        enabled: true,
      },

      xAxis: {
        type: 'datetime',
      },
      chart: {
        marginLeft: 40,
      },
      yAxis: [
        {
          top: '65%',
          height: '35%',
          offset: 0,
          labels: {
            align: 'right',
            x: -2,
          },
          opposite: true,
          title: {
            text: 'Volume',
          },

          lineWidth: 2,
        },
        {
          title: {
            text: 'OHLC',
          },
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'right',
            x: -3,
          },

          height: '60%',
          offset: 0,
          opposite: true,
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
      ],

      series: [
        {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.highcharts.data.volume,
          yAxis: 1,
        },
        {
          type: 'vbp',
          linkedTo: 'olhc',
          params: {
            volumeSeriesID: 'volume',
          },
          zoneLines: {
            enabled: false,
          },
          dataLabels: {
            enabled: false,
          },
        },
        {
          type: 'candlestick',
          name: this.localData.ticker,
          id: 'olhc',
          zIndex: 2,
          data: this.highcharts.data.olhc,
        },
        {
          type: 'sma',
          marker: {
            enabled: false,
          },
          linkedTo: 'olhc',
          zIndex: 5,
        },
      ],

      legend: {
        enabled: false,
      },
      tooltip: {
        split: true,
      },
      navigator: {
        enabled: true,
      },
      scrollbar: {
        enabled: true,
      },
    };
  }
}
