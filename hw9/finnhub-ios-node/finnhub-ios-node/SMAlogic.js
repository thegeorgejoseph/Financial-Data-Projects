function temporaryFunc(charts) {
  let testElement = document.getElementById("test");

  let temp = JSON.parse(charts);
  //      testElement.innerHTML = temp.title

  //    let temp = `Updating the initial string to ${value}`;

  //    testElement.innerHTML = `Something : `;
  try {
    //      testElement.innerElement = temp.title;
    Highcharts.stockChart("SMA-chart", {
      chart: {
        height: 360,
      },
      rangeSelector: {
        enabled: true,
      },
      title: {
        text: temp.title,
      },
      subtitle: {
        text: "With SMA and Volume by Price technical indicators",
      },

      xAxis: {
        type: "datetime",
      },

      yAxis: [
        {
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: "right",
            x: -3,
          },
          title: {
            text: "OHLC",
          },
          height: "60%",
          lineWidth: 2,
          resize: {
            enabled: true,
          },
          offset: 0,
          opposite: true,
        },
        {
          labels: {
            align: "right",
            x: -2,
          },
          title: {
            text: "Volume",
          },
          top: "65%",
          height: "35%",
          offset: 0,
          lineWidth: 2,
          opposite: true,
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
        navigator: 5
      },
      scrollbar: {
        enabled: true,
      },

      series: [
        {
          type: "candlestick",
          name: this.ticker,
          id: "olhc",
          zIndex: 2,
          data: temp.data.olhc,
        },
        {
          type: "column",
          name: "Volume",
          id: "volume",
          data: temp.data.volume,
          yAxis: 1,
        },
        {
          type: "vbp",
          linkedTo: "olhc",
          params: {
            volumeSeriesID: "volume",
          },
          dataLabels: {
            enabled: false,
          },
          zoneLines: {
            enabled: false,
          },
        },
        {
          type: "sma",
          linkedTo: "olhc",
          zIndex: 5,
          marker: {
            enabled: false,
          },
        },
      ],
    });
  } catch (e) {
    testElement.innerHTML =
      e + Object.keys(Highcharts).toString().split(",").sort().join("<br>");
  }
}
