import { Component, OnInit } from '@angular/core';
import { Options } from 'highcharts';
import * as Highcharts from 'highcharts/highstock';
import { DataServiceService } from 'src/app/services/data-service.service';
import * from 'highcharts-angular';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  earningsOptions;
  insights;
  earnings;
  recommendationOptions;
  constructor(private data$: DataServiceService) { }

  ngOnInit(): void {
    this.data$.subject.subscribe( data => {
      this.insights = data["insights"];
      this.earnings = data["earnings"];
    })

    this.recommendationOptions = {
      title: {
          text: `Recommendation Trends`,
      },
      series: this.insights.recommendation.series,
      plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            },
        }
    },
      chart: {
          type: 'column'
      },
      
      yAxis: {
        min: 0,
        title: {
            text: '#Analysis'
        },
    },
      xAxis: {
          categories: this.insights.recommendation.categories
      },

  }

    this.earningsOptions = {
      title: {
          text: `Historical EPS Surprises`,
      },
      tooltip: {
        shared: true
      },
      xAxis: {
          type: 'linear',
          scrollbar: {
              enabled: true
          },
          categories: this.insights.earnings.categories
      },
      yAxis: [{
          title: {
              text: 'Quarterly EPS',
          },
      }],
      series: [{
        data: this.insights.earnings.actual,
          type: 'spline',
          name: 'Actual',
          color: "#7bb5ec"
      }, {
          type: 'spline',
          name: 'Estimate',
          data: this.insights.earnings.estimate,
          color: "#434343",
      }]
  }
  }
  }

  
}
