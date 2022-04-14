import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit,OnChanges {
  constructor(private data$: DataServiceService) {}
  summary;
  optionCharts;
  ngOnInit(): void {
      this.data$.subject.subscribe(data =>{
        this.summary = data["summary"];
      })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.summary) {
      if (
        changes.summary.isFirstChange() ||
        changes.summary.previousValue.name != changes.summary.currentValue.name
      ) {
        console.log('chart title');
        console.log(this.summary.quote.charts[0].title);
        this.optionCharts = {
          title: {
            text: `<div style="color:#737373f">${this.summary.quote.charts[0].title}</div>`,
            useHTML: true,
          },
          xAxis: {
            type: 'datetime',
            scrollbar: {
              enabled: true,
            },
          },
          legend: {
            enabled: false,
          },
          yAxis: [
            {
              labels: {
                align: 'right',
              },
              title: {
                text: '',
              },
              opposite: true,
            },
          ],
          chart: {
            marginRight: 20,
            marginLeft: 20,
          },
          
          series: [
            {
              type: 'line',
              color:
              this.summary.quote.dp > 0
                ? '#367b21'
                : this.summary.quote.dp < 0
                ? '#ea3323'
                : '#000',
              name: 'Stock Price',
              data: this.summary.quote.charts[0].data,
              // .map(([ date, value]) => {return [date, value]; })
             
              marker: {
                enabled: false,
              },
              threshold: null,
            },
          ],
        };
      }
    }
  }
}
