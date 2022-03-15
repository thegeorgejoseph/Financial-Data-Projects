const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/", (req, res) => {
  axios
    .get(`https://finnhub.io/api/v1/search?q=TSLA&token=${process.env.API_URL}`)
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(404).json({ msg: `Error in Autocomplete Call: ${err}` })
    );
});

module.exports = router;
