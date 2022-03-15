const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();
router.get("/description", (req, res) => {
  axios
    .get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=TSLA&token=${process.env.API_URL}`
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(`Error : Company Description Route error`);
      res
        .status(400)
        .json({ msg: `Error : Company Description Route Error!, ${err}` });
    });
});

module.exports = router;
