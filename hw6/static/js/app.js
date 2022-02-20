let dataStore = {};
let currentTab = "";
let URL = `https://finnhub-webapp-python.nn.r.appspot.com/`;
fetchConfig = {
  method: "GET",
  mode: "cors",
};
function callBackend(e) {
  let navbarElement = document.getElementsByClassName("nav-container")[0];
  let text = e.value.toUpperCase();

  if (text != "") {
    Promise.all([
      fetch(`${URL}profile?text=${text}`, {
        method: "GET",
        mode: "cors",
      }),
      fetch(`${URL}quote?text=${text}`, {
        method: "GET",
        mode: "cors",
      }),
      fetch(`${URL}recommendation?text=${text}`, {
        method: "GET",
        mode: "cors",
      }),
      fetch(`${URL}charts?text=${text}`, {
        method: "GET",
        mode: "cors",
      }),
      fetch(`${URL}news?text=${text}`, {
        method: "GET",
        mode: "cors",
      }),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then((data) => {
        navbarElement.style.display = "flex";
        createDataStore(data);
        // console.log(dataStore);
      })
      .catch((err) => handleError());
  }
}

function handleError() {
  let errorElement = document.getElementsByClassName("error-bar")[0];
  let navbarElement = document.getElementsByClassName("nav-container")[0];
  let companyProfile = document.getElementsByClassName("company-profile")[0];
  companyProfile.style.display = "none";
  navbarElement.style.display = "none";
  errorElement.style.display = "flex";
}

function createDataStore(data) {
  let errorElement = document.getElementsByClassName("error-bar")[0];
  errorElement.style.display = "none";
  for (const obj in Object.values(data)) {
    let tempKey = Object.keys(data[obj]);
    let tempValues = Object.values(data[obj]);
    dataStore[tempKey[0]] = tempValues[0];
  }
  //   console.log(dataStore);
  if (currentTab == "") {
    createCompanyHTML(dataStore);
  } else if (currentTab == "Company") {
    // console.log("Clicking");
    createCompanyHTML(dataStore);
  } else {
    // console.log("Here");
    currentTab.click();
  }
}
function createCompanyHTML(data) {
  //   dataStore = data;
  document.getElementsByClassName("getn")[0].classList.remove("tab-grey");
  document.getElementsByClassName("comp")[0].classList.add("tab-grey");
  document.getElementsByClassName("comp")[0].classList.remove("hover");
  document.getElementsByClassName("summ")[0].classList.add("hover");
  document.getElementsByClassName("char")[0].classList.add("hover");
  document.getElementsByClassName("getn")[0].classList.add("hover");
  document.getElementsByClassName("summ")[0].classList.remove("tab-grey");
  document.getElementsByClassName("char")[0].classList.remove("tab-grey");
  profile = data["Profile"];
  logo = profile["logo"];
  let companyProfile = document.getElementsByClassName("company-profile")[0];
  let stocksSummary = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  companyProfile.style.display = "flex";
  stocksSummary.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  html = `<img src=${logo} id='logo'>
  <table><tr>
  <th align='right'>Company Name</th><th align='left' id="lighweight">${profile["Company Name"]}</th></tr>
  <tr><th align='right'>Stock Ticker Symbol</th><th align='left' id="lighweight">${profile["Stock Ticker Symbol"]}</th></tr>
  <tr><th align='right'>Stock Exchange Code</th><th align='left' id="lighweight">${profile["Stock Exchange Code"]}</th></tr>
  <tr><th align='right'>Company IPO Date</th><th align='left' id="lighweight">${profile["IPO"]}</th></tr>
  <tr><th align='right'>Category</th><th align='left' id="lighweight">${profile["Category"]}</th></tr></table>`;
  companyProfile.innerHTML = html;
}

function companyProfile() {
  if (currentTab != "" && currentTab != "Company") {
    createCompanyHTML(dataStore);
  }
  currentTab = "Company";
  document.getElementsByClassName("getn")[0].classList.remove("tab-grey");
  document.getElementsByClassName("comp")[0].classList.add("tab-grey");
  document.getElementsByClassName("comp")[0].classList.remove("hover");
  document.getElementsByClassName("summ")[0].classList.add("hover");
  document.getElementsByClassName("char")[0].classList.add("hover");
  document.getElementsByClassName("getn")[0].classList.add("hover");
  document.getElementsByClassName("summ")[0].classList.remove("tab-grey");
  document.getElementsByClassName("char")[0].classList.remove("tab-grey");
  let wrapper = document.getElementById("dynamic-wrapper");
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  profileElement.style.display = "flex";
}
function stockSummary() {
  currentTab = document.getElementById("summ");
  document.getElementsByClassName("getn")[0].classList.remove("tab-grey");
  document.getElementsByClassName("comp")[0].classList.remove("tab-grey");
  document.getElementsByClassName("summ")[0].classList.add("tab-grey");
  document.getElementsByClassName("summ")[0].classList.remove("hover");
  document.getElementsByClassName("comp")[0].classList.add("hover");
  document.getElementsByClassName("getn")[0].classList.add("hover");
  document.getElementsByClassName("char")[0].classList.add("hover");
  document.getElementsByClassName("char")[0].classList.remove("tab-grey");
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let wrapper = document.getElementById("dynamic-wrapper");
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  let profile_ticker = dataStore["Profile"]["Stock Ticker Symbol"];
  profileElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  stocksElement.style.display = "flex";
  wrapper.insertBefore(stocksElement, wrapper.firstChild);
  summary = dataStore["Quote"];
  tradingDate = new Date(parseInt(summary["Trading Day"]) * 1000);
  tradingDateString = `${tradingDate.getDate()} ${
    monthNames[tradingDate.getMonth()]
  }, ${tradingDate.getFullYear()}`;
  recommendation = dataStore["Recommendation"];
  redArrow = `<img id="redArrow" src='../static/img/RedArrowDown.png' width='10' height='10'></img>`;
  greenArrow = `<img id="greenArrow" src='../static/img/GreenArrowUp.png' width='10' height='10'></img>`;
  html = `<table id="stats" ><tr><th align='right'>Stock Ticker Symbol</th><th align='left' id="lighweight">${profile_ticker}</th></tr>
  <tr><th align='right'>Trading Day</th><th align='left' id="lighweight">${tradingDateString}</th></tr>
  <tr><th align='right'>Previous Closing Price</th><th align='left' id="lighweight">${
    summary["Previous Closing Price"]
  }</th></tr>
  <tr><th align='right'>Opening Price</th><th align='left' id="lighweight">${
    summary["Opening Price"]
  }</th></tr>
  <tr><th align='right'>High Price</th><th align='left' id="lighweight">${
    summary["High Price"]
  }</th></tr>
  <tr><th align='right'>Low Price</th><th align='left' id="lighweight">${
    summary["Low Price"]
  }</th></tr>
  <tr><th align='right'>Change</th><th align='left' id="lighweight">${
    summary["Change"]
  } ${summary["Change"] < 0 ? redArrow : greenArrow}</th></tr>
  <tr><th align='right'>Change Percent</th><th align='left' id="lighweight">${
    summary["Change Percent"]
  } ${summary["Change Percent"] < 0 ? redArrow : greenArrow}</th></tr>
  </table>
  <table id="trend"><tr><th id="ss-text" class="lighweight">Strong Sell</th><th id="ss">${
    recommendation["strongSell"]
  }</th><th id="s">${recommendation["sell"]}</th><th id="h">${
    recommendation["hold"]
  }</th><th id="b">${recommendation["buy"]}</th><th id="sb">${
    recommendation["strongBuy"]
  }</th><th id="sb-text" class="lighweight">Strong Buy</th></tr></table>
  <h3>Recommendation Trends</h3>`;
  stocksElement.innerHTML = html;
  if (summary["Change"] == 0 && summary["Change Percent"] == 0) {
    document.querySelectorAll("#greenArrow")[0].style.display = "none";
    document.querySelectorAll("#greenArrow")[1].style.display = "none";
  }
}

function getCharts() {
  currentTab = document.getElementById("char");
  document.getElementsByClassName("getn")[0].classList.remove("tab-grey");
  document.getElementsByClassName("comp")[0].classList.remove("tab-grey");
  document.getElementsByClassName("summ")[0].classList.remove("tab-grey");
  document.getElementsByClassName("char")[0].classList.add("tab-grey");
  document.getElementsByClassName("char")[0].classList.remove("hover");
  document.getElementsByClassName("comp")[0].classList.add("hover");
  document.getElementsByClassName("summ")[0].classList.add("hover");
  document.getElementsByClassName("getn")[0].classList.add("hover");
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  let chartsContainer = document.getElementById("charts-container");
  profileElement.style.display = "none";
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "flex";

  let date = dataStore["Charts"]["Date"];
  let stockPrice = dataStore["Charts"]["Stock Price"];
  let volume = dataStore["Charts"]["Volume"];
  let lastDateObj = new Date(parseInt(date[0]) * 1000);
  let month =
    lastDateObj.getMonth() < 10
      ? `0${lastDateObj.getMonth()}`
      : lastDateObj.getMonth();
  let lastDate = ` ${lastDateObj.getFullYear()}-${month}-${lastDateObj.getDate()}`;
  let headlineString =
    `Stock Price ${dataStore["Profile"]["Stock Ticker Symbol"]}` + lastDate;
  let byLineString = `<a href='https://finnhub.io/' target='_blank'>Source: Finnhub</a>`;

  dateStockPrice = date.map((el, idx) => [
    parseInt(el) * 1000,
    stockPrice[idx],
  ]);
  dateVolume = date.map((el, idx) => [parseInt(el) * 1000, volume[idx]]);

  Highcharts.stockChart("charts-container", {
    title: {
      text: headlineString,
      margin: 40,
    },
    subtitle: {
      text: byLineString,
      useHTML: true,
    },
    yAxis: [
      {
        labels: {
          align: "right",
        },
        title: {
          text: "Stock Price",
        },
        opposite: false,
        enabled: true,
      },
      {
        labels: {
          align: "left",
          offset: 20,
        },
        title: {
          text: "Volume",
        },
        opposite: true,
        enabled: true,
      },
    ],
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 7,
          text: "7d",
        },
        {
          type: "day",
          count: 15,
          text: "15d",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
      ],
      selected: 4,
      inputEnabled: false,
    },
    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },
    series: [
      {
        type: "area",
        name: "Stock Price",
        data: dateStockPrice,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        threshold: null,
      },
      {
        type: "column",
        name: "Volume",
        data: dateVolume,
        yAxis: 1,
        color: "#434348",
      },
    ],
  });
}
function search() {
  let obj = document.getElementById("searchBar");
  obj.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      //   console.log("Entered");
      callBackend(e);
    }
  });
}

function searchButton() {
  console.log("Search Button Clicked");
  searchObj = document.getElementById("searchBar");
  //   console.log(searchObj.value);
  let navbarElement = document.getElementsByClassName("nav-container")[0];
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  let errorElement = document.getElementsByClassName("error-bar")[0];
  if (searchObj.value == "") {
    navbarElement.style.display = "none";
    profileElement.style.display = "none";
    errorElement.style.display = "none";
  }
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  if (searchObj.value != "") {
    callBackend(searchObj);
  }
  //   console.log(currentTab);
}

function getNews() {
  currentTab = document.getElementById("getn");
  document.getElementsByClassName("getn")[0].classList.add("tab-grey");
  document.getElementsByClassName("getn")[0].classList.remove("hover");
  document.getElementsByClassName("comp")[0].classList.add("hover");
  document.getElementsByClassName("summ")[0].classList.add("hover");
  document.getElementsByClassName("char")[0].classList.add("hover");
  document.getElementsByClassName("comp")[0].classList.remove("tab-grey");
  document.getElementsByClassName("summ")[0].classList.remove("tab-grey");
  document.getElementsByClassName("char")[0].classList.remove("tab-grey");
  let companyElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  companyElement.style.display = "none";
  stocksElement.style.display = "none";
  chartsElement.style.display = "none";
  newsElement.style.display = "flex";
  newsList = dataStore["News"];
  html = ``;
  newsList.forEach((item) => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let temp_date = item["Date"];
    let temp = new Date(parseInt(temp_date) * 1000);
    // console.log(
    //   temp.getDate(),
    //   monthNames[temp.getMonth()],
    //   temp.getFullYear()
    // );
    let image = item["Image"];
    let link = item["Link to Original Post"];
    let title = item["Title"];
    let currentHtml = `<div class="card"><img src=${image} width="80" height="80"/><div class="content"><h4>${title}</h4><p>${temp.getDate()} ${
      monthNames[temp.getMonth()]
    }, ${temp.getFullYear()}</p><a href=${link} target="_blank">See Original Post</a></div></div>`;
    html += currentHtml;
  });
  newsElement.innerHTML = html;
}

function clearAll() {
  let companyElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  let searchBar = document.getElementById("searchBar");
  let navElement = document.getElementsByClassName("nav-container")[0];
  let errorElement = document.getElementsByClassName("error-bar")[0];
  currentTab = document.getElementById("comp");
  currentTab.click();
  searchBar.value = "";
  companyElement.style.display = "none";
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  navElement.style.display = "none";
  errorElement.style.display = "none";
}

function clickSearch() {
  buttonElement = document.getElementById("search");
  buttonElement.click();
}
