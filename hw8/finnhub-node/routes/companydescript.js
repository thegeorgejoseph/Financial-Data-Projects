const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();
dataObj = {};

const RES = "D";

let TO = new Date();
let FROM = new Date(TO);

router.get("/:ticker", (req, res) => {
  currentDate = new Date().toISOString().split("T")[0];
  dataMonthAgo = "2022-01-02";
  Promise.all([
    axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=${process.env.API_URL}` // double check that quote api gets all caps as input for it to work!
    ),
    axios.get(
      `https://finnhub.io/api/v1/stock/peers?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/company-news?symbol=${req.params.ticker}&from=${dataMonthAgo}&to=${currentDate}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${req.params.ticker}&from=${dataMonthAgo}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/stock/recommendation?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/stock/earnings?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${req.params.ticker}&token=${process.env.API_URL}&resolution=${RES}&from=${FROM}&to=${TO}`
    ),
  ])
    .then((responses) => {
      responses.map((res) => {
        current = res.data;
        // console.log(current);
        if (Object.keys(current).length === 0) {
          throw "Invalid Ticker";
        }
        if (
          Array.isArray(current) &&
          !Array.isArray(current[0]) &&
          current[0]["category"] !== undefined
        ) {
          current = current.filter(
            (item) =>
              item["image"] !== "" &&
              item["headline"] !== "" &&
              item["url"] !== "" &&
              item["datetime"] !== ""
          );
          dataObj = { ...dataObj, news: current.slice(0, 5) };
        } else if (Array.isArray(current)) {
          dataObj = { ...dataObj, response: current.filter((x) => x != "") };
        } else {
          dataObj = { ...dataObj, ...current };
        }
      });
      res.status(200).json(dataObj);
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
});

function getTimestamp(date) {
  return Math.round(date.getTime() / 1000);
}

function dateConvert(a) {
  let year = a.getFullYear();

  let date = a.getDate().toString().padStart(2, "0");
  let month = (a.getMonth() + 1).toString().padStart(2, "0");
  let time = year + "-" + month + "-" + date;
  return time;
}
function checkIfStockIsCommon(stock) {
  return stock.type == "Common Stock";
}

function dateConverterUNIXToDate(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);

  let month = (a.getMonth() + 1).toString().padStart(2, "0");
  let year = a.getFullYear();
  let date = a.getDate().toString().padStart(2, "0");

  let time =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    a.getHours() +
    ":" +
    a.getMinutes() +
    ":" +
    a.getSeconds();

  return time;
}

function determineMStatus(date) {
  let today = new Date();
  let qDate = new Date(date * 1000);

  let diff = today;

  let seconds = Math.floor(diff / 1000);
  return seconds;
}

function checkPeriod(stock) {
  return stock.symbol.split(".").length < 2;
}

function TopNewsDate(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let date = a.getDate().toString();
  let year = a.getFullYear();
  let months = [
    "January",
    "Febuary",
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

  let month = months[a.getMonth()];

  let time = month + " " + date + ", " + year;
  return time;
}

function dateFormatter() {
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let dd = String(today.getDate()).padStart(2, "0");

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

module.exports = router;
