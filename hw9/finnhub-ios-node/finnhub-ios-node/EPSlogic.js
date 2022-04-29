function temporaryFunc(earnings) {
  //   let testElement = document.getElementById("test");

  let temp = JSON.parse(earnings);
  //      testElement.innerHTML = temp.title

  //    let temp = `Updating the initial string to ${value}`;

  //    testElement.innerHTML = `Something : `;
  try {
    //      testElement.innerElement = temp.title;
    Highcharts.stockChart("EPS-chart", {
      title: {
        text: `Historical EPS Surprises`,
      },
      tooltip: {
        shared: true,
      },
      xAxis: {
        type: "linear",
        scrollbar: {
          enabled: true,
        },
        categories: temp.categories,
      },
      yAxis: [
        {
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
    });
  } catch (e) {
    testElement.innerHTML =
      e + Object.keys(Highcharts).toString().split(",").sort().join("<br>");
  }
}
