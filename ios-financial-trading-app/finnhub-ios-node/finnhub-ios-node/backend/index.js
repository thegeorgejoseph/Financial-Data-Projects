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

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

const autocompleteRoute = require("./routes/autocomplete");
const companyDetailsRoute = require("./routes/companyDetails");
const companyDescriptRoute = require("./routes/companydescript");
const autoUpdateRoute = require("./routes/autoupdater");

app.use("/autocomplete", autocompleteRoute);
app.use("/company", companyDetailsRoute);
app.use("/companydescript", companyDescriptRoute);
app.use("/autoupdate", autoUpdateRoute);

app.use(express.static(path.join(__dirname,'todayDatetodaty')))
app.get('/',(req, res) => res.redirect("/search/home"))
app.get('/search',(req, res) => res.redirect("/search/home"))
app.use('/search/home', express.static(path.join(__dirname,'public')))
app.use('/search/:ticker', express.static(path.join(__dirname,'public')))
app.use('/watchlist', express.static(path.join(__dirname,'public')))
app.use('/portfolio', express.static(path.join(__dirname,'public')))

app.listen(PORT, () => console.log(`Node server running on port ${PORT}...`));
