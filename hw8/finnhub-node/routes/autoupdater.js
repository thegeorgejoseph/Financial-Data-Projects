const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/:ticker", (req, res) => {
  axios
    .get(
      `https://finnhub.io/api/v1/quote?symbol=${req.params.ticker}&token=${process.env.API_URL}` // double check that quote api gets all caps as input for it to work!
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;
