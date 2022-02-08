const mongoose = require("mongoose");

const db = mongoose;
if (process.env.NODE_ENV === "production") {
  db.connect(
    "mongodb+srv://donlini:" +
      process.env.dbpass +
      "@cluster-portfolio.bgnei.mongodb.net/Portfolio?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
} else {
  db.connect("mongodb://localhost:27017/Portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
module.exports = db;
