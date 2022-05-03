function temporaryFunc(earnings) {
  //   let testElement = document.getElementById("test");

  let temp = JSON.parse(earnings);
  //      testElement.innerHTML = temp.title

  //    let temp = `Updating the initial string to ${value}`;

  //    testElement.innerHTML = `Something : `;
  try {
    //      testElement.innerElement = temp.title;
    Highcharts.chart("EPS-chart", {
      title: {
        text: `Historical EPS Surprises`,
      },
      tooltip: {
        shared: true,
      },
      xAxis: {
        type: "linear",
        categories: temp.categories,
      labels:{
          rotation: -45
      }
      },
      yAxis: [
        {
        opposite: false,
          title: {
            text: "Quarterly EPS",
          },
        },
      ],
      series: [
        {
          type: "spline",
          name: "Actual",
          data: temp.actual,
          color: "#7bb5ec",
        },
        {
          type: "spline",
          name: "Estimate",
          data: temp.estimate,
          color: "#434343",
        },
      ],
    navigator: {
    enabled: false
    },
    legend: {
    enabled: true
    },
    scrollbar :{
        enabled: false
        },
    rangeSelector:{
        enabled: false
    }
    });
  } catch (e) {
    testElement.innerHTML =
      e + Object.keys(Highcharts).toString().split(",").sort().join("<br>");
  }
}
