const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// origin: process.env.FRONTEND_URL
app.use(cors());
app.use(express.json());

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

module.exports = app;
