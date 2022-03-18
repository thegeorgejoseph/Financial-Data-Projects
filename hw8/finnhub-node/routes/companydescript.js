const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();
dataObj = {};

router.get("/:ticker", (req, res) => {
  Promise.all([
    axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    ),
    axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    ),
  ])
    .then((responses) => {
      responses.map((res) => {
        current = res.data;
        dataObj = { ...dataObj, ...current };
      });
      res.status(200).json(dataObj);
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
});

module.exports = router;
