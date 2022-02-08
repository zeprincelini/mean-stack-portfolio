//package includes
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

//js includes
const api = require("./routes/api");
const db = require("./db/db");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Connection", "open");
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(path.join(__dirname, "../dist")));
app.use("/api", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/myportfolio", "index.html"));
});

app.listen(PORT, () => {
  console.log("running on port: ", PORT);
});
