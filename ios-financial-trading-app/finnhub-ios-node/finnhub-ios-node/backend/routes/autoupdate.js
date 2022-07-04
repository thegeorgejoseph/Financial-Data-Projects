const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();
dataObj = {};

router.get("/:ticker", (req, res) => {
  axios
    .get(
      `https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=${process.env.API_URL}`
    )
    .then((response) => {
      dataObj = { ...dataObj, ...response.data };
      res.status(200).json(dataObj);
    })
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;
