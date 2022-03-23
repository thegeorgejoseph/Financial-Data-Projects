const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();
dataObj = {};

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

module.exports = router;
