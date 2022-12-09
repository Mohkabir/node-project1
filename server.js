const express = require("express");
const dotenv = require("dotenv");
const bootcampRoute = require("./routes/bootcamp");

const app = express();
dotenv.config({ path: "./config/config.env" });

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO MY BOOTCAMP PROJECT</h1>");
});

app.use("/api/v1/bootcamp", bootcampRoute);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server listing on port ${PORT}`));
