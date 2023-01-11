const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const path = require("path");

const bootcampRoute = require("./routes/bootcamp");
const courseRoute = require("./routes/course");

const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(fileupload());

dotenv.config({ path: "./config/config.env" });
connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamp", bootcampRoute);
app.use("/api/v1/courses", courseRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO MY BOOTCAMP PROJECT</h1>");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
