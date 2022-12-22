const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bootcampRoute = require("./routes/bootcamp");
const connectDb = require("./config/db");

const app = express();

app.use(express.json());
dotenv.config({ path: "./config/config.env" });
connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO MY BOOTCAMP PROJECT</h1>");
});
app.use("/api/v1/bootcamp", bootcampRoute);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
