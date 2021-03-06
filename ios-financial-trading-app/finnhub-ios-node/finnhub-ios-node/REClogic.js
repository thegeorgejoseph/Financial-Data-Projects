function temporaryFunc(recommendation) {
    //   let testElement = document.getElementById("test");
    
    let temp = JSON.parse(recommendation);
    //      testElement.innerHTML = temp.title
    
    //    let temp = `Updating the initial string to ${value}`;
    
    //    testElement.innerHTML = `Something : `;
    try {
        //      testElement.innerElement = temp.title;
        Highcharts.chart("REC-chart", {
        title: {
        text: `Recommendation Trends`,
        },
        chart: {
        type: "column",
        },
            
        plotOptions: {
        series: {
        stacking: "normal",
        dataLabels: {
        enabled: true,
        },
        },
        },
        series: temp.series,
        xAxis: {
        categories: temp.categories,
        },
            
        yAxis: {
        opposite: false,
        min: 0,
        title: {
        text: "#Analysis",
        },
        },
        navigator: {
        enabled: false
        },
        legend: {
        enabled: true
        },
        rangeSelector: {
        enabled: false
        },
        scrollbar :{
            enabled: false
        }
            
        });
    } catch (e) {
        testElement.innerHTML =
        e + Object.keys(Highcharts).toString().split(",").sort().join("<br>");
    }
}
