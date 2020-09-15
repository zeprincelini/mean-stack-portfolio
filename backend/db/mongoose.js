const mongoose = require('mongoose');
require("dotenv").config()

mongoose.Promise = global.Promise;
//production
mongoose.connect("mongodb+srv://donlini:" + process.env.dbpass + "@cluster-portfolio.bgnei.mongodb.net/Portfolio?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//local
//mongoose.connect("mongodb://localhost:27017/Portfolio", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

module.exports = {mongoose};

