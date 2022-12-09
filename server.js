const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./config/config.env" });

// const server = http.createServer((req, res) => {
//   console.log(3, "req");
//   res.write("Holaa");
//   res.end();
// });

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server listing on port ${PORT}`));
