const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3000;

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
