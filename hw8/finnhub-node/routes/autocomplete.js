const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/:ticker", (req, res) => {
  axios
    .get(
      `https://finnhub.io/api/v1/search?q=${req.params.ticker}&token=${process.env.API_URL}`
    )
    .then((response) => {
      response.data = response.data.result
        .filter((res) => res.type === "Common Stock")
        .map((obj) => obj.displaySymbol);
      res.status(200).json(response.data);
    })
    .catch((err) =>
      res.status(404).json({ msg: `Error in Autocomplete Call: ${err}` })
    );
});

module.exports = router;
