const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});

module.exports = app;
