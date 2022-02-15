dataStore = {};

function callBackend(e) {
  let text = e.value;
  fetch(`http://10.25.102.196:81/search?text=${text}`, {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((data) => createCompanyHTML(data))
    .catch((err) => console.log("Error", err));
}

function createCompanyHTML(data) {
  dataStore = data;
  profile = data["Profile"];
  logo = profile["logo"];
  let companyProfile = document.getElementsByClassName("company-profile")[0];
  let stocksSummary = document.getElementById("stocks-summary");
  companyProfile.style.display = "flex";
  stocksSummary.style.display = "none";
  html = `<img src=${logo} id='logo'>
  <table><tr>
  <th align='right'>Company Name</th><th align='left' id="lighweight">${profile["Company Name"]}</th></tr>
  <tr><th align='right'>Stock Ticker Symbol</th><th align='left' id="lighweight">${profile["Stock Ticker Symbol"]}</th></tr>
  <tr><th align='right'>Stock Exchange Code</th><th align='left' id="lighweight">${profile["Stock Exchange Code"]}</th></tr>
  <tr><th align='right'>Company Start Date</th><th align='left' id="lighweight">${profile["IPO"]}</th></tr>
  <tr><th align='right'>Category</th><th align='left' id="lighweight">${profile["Category"]}</th></tr></table>`;
  companyProfile.innerHTML = html;
}

function companyProfile() {
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
  let wrapper = document.getElementById("dynamic-wrapper");
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  profileElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  stocksElement.style.display = "flex";
  wrapper.insertBefore(stocksElement, wrapper.firstChild);
  summary = dataStore["Quote"];
  recommendation = dataStore["Recommendation"];
  redArrow = `<img src='img/RedArrowDown.png' width='10' height='10'></img>`;
  greenArrow = `<img src='img/GreenArrowUp.png' width='10' height='10'>`;
  html = `<table id="stats" ><tr><th align='right'>Stock Ticker Symbol</th><th align='left' id="lighweight">${
    summary["Stock Ticker Symbol"]
  }</th></tr>
  <tr><th align='right'>Trading Day</th><th align='left' id="lighweight">${
    summary["Trading Day"]
  }</th></tr>
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
}

function getCharts() {
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  profileElement.style.display = "none";
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "flex";
}
function search() {
  let obj = document.getElementById("searchBar");
  obj.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("Entered");
      callBackend(e);
    }
  });
}

function searchButton() {
  console.log("Search Button Clicked");
  searchObj = document.getElementById("searchBar");
  let navbarElement = document.getElementsByClassName("nav-container")[0];
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  let newsElement = document.getElementById("latest-news");
  let chartsElement = document.getElementById("charts");
  navbarElement.style.display = "flex";
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  callBackend(searchObj);
}

function getNews() {
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
    date = item["Date"];
    image = item["Image"];
    link = item["Link to Original Post"];
    title = item["Title"];
    currentHtml = `<div class="card"><img src=${image} width="80" height="80"/><div class="content"><h4>${title}</h4><p>${date}</p><a href=${link}>See Original Post</a></div></div>`;
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
  searchBar.value = "";
  companyElement.style.display = "none";
  stocksElement.style.display = "none";
  newsElement.style.display = "none";
  chartsElement.style.display = "none";
  navElement.style.display = "none";
}
