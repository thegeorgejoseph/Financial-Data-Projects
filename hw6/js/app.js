dataStore = {};

function callBackend(e) {
  let text = e.value;
  fetch(`http://192.168.1.170:81/search?text=${text}`, {
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
  <th align='right'>Company Name</th><th align='left'>${profile["Company Name"]}</th></tr>
  <tr><th align='right'>Stock Ticker Symbol</th><th align='left'>${profile["Stock Ticker Symbol"]}</th></tr>
  <tr><th align='right'>Stock Exchange Code</th><th align='left'>${profile["Stock Exchange Code"]}</th></tr>
  <tr><th align='right'>Company Start Date</th><th align='left'>${profile["IPO"]}</th></tr>
  <tr><th align='right'>Category</th><th align='left'>${profile["Category"]}</th></tr></table>`;
  companyProfile.innerHTML = html;
}

function companyProfile() {
  let wrapper = document.getElementById("dynamic-wrapper");
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  stocksElement.style.display = "none";
  profileElement.style.display = "flex";
}
function stockSummary() {
  let wrapper = document.getElementById("dynamic-wrapper");
  let profileElement = document.getElementById("company-profile");
  let stocksElement = document.getElementById("stocks-summary");
  profileElement.style.display = "none";
  stocksElement.style.display = "flex";
  wrapper.insertBefore(stocksElement, wrapper.firstChild);
  summary = dataStore["Quote"];
  recommendation = dataStore["Recommendation"];
  redArrow = `<img src='img/RedArrowDown.png' width='10' height='10'></img>`;
  greenArrow = `<img src='img/GreenArrowUp.png' width='10' height='10'>`;
  html = `<table id="stats" ><tr><th align='right'>Stock Ticker Symbol</th><th align='left'>${
    summary["Stock Ticker Symbol"]
  }</th></tr>
  <tr><th align='right'>Trading Day</th><th align='left'>${
    summary["Trading Day"]
  }</th></tr>
  <tr><th align='right'>Previous Closing Price</th><th align='left'>${
    summary["Previous Closing Price"]
  }</th></tr>
  <tr><th align='right'>Opening Price</th><th align='left'>${
    summary["Opening Price"]
  }</th></tr>
  <tr><th align='right'>High Price</th><th align='left'>${
    summary["High Price"]
  }</th></tr>
  <tr><th align='right'>Low Price</th><th align='left'>${
    summary["Low Price"]
  }</th></tr>
  <tr><th align='right'>Change</th><th align='left'>${summary["Change"]} ${
    summary["Change"] < 0 ? redArrow : greenArrow
  }</th></tr>
  <tr><th align='right'>Change Percent</th><th align='left'>${
    summary["Change Percent"]
  } ${summary["Change Percent"] < 0 ? redArrow : greenArrow}</th></tr>
  </table>
  <table id="trend"><tr><th id="ss-text">Strong Sell</th><th id="ss">${
    recommendation["strongSell"]
  }</th><th id="s">${recommendation["sell"]}</th><th id="h">${
    recommendation["hold"]
  }</th><th id="b">${recommendation["buy"]}</th><th id="sb">${
    recommendation["strongBuy"]
  }</th><th id="sb-text">Strong Buy</th></tr></table>
  <h3>Recommendation Trends</h3>`;
  stocksElement.innerHTML = html;
}
function search() {
  console.log("Sup");
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
  textObj = document.getElementById("searchBar");
  callBackend(textObj);
}
