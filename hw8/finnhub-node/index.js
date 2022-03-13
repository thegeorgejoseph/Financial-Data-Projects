const express = require("express");
const axios = require("axios");
app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5003;
const companyDetailsRoute = require("./routes/companyDetails");

app.use("/company", companyDetailsRoute);

app.listen(PORT, () => console.log(`Node server running on port ${PORT}...`));
