function temporaryFunc(quote){
    let testElement = document.getElementById('test');
    
    let temp = JSON.parse(quote)
//    testElement.innerHTML = temp.charts[0].title
    
    //    let temp = `Updating the initial string to ${value}`;
    
    //    testElement.innerHTML = `Something : `;
    try{
        Highcharts.chart('hourly-chart',{
        title: {
        text: `<div style="color:#737373">${temp.charts[0].title}</div>`,
        useHTML: true,
        },
        chart: {
        marginRight: 20,
        marginLeft: 20,
        height: 360,
        },
        xAxis: {
        type: 'datetime',
        scrollbar: {
        enabled: true,
        },
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
        legend: {
        enabled: false,
        },
        series: [
                 {
                 type: 'line',
                 name: '',
                 data: temp.charts[0].data,
                     // .map(([ date, value]) => {return [date, value]; })
                 color:
                     temp.dp > 0
                     ? '#367b21'
                     : temp.dp < 0
                     ? '#ea3323'
                     : '#000',
                 marker: {
                 enabled: false,
                 },
                 threshold: null,
                 },
                 ],
        });
    }
    catch(e){
        testElement.innerHTML = e
    }
    
}
