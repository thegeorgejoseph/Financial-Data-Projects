const express = require("express");
const axios = require("axios");
app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5003;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const autocompleteRoute = require("./routes/autocomplete");
const companyDetailsRoute = require("./routes/companyDetails");
const companyDescriptRoute = require("./routes/companydescript");

app.use("/autocomplete", autocompleteRoute);
app.use("/company", companyDetailsRoute);
app.use("/companydescript", companyDescriptRoute);

app.listen(PORT, () => console.log(`Node server running on port ${PORT}...`));
