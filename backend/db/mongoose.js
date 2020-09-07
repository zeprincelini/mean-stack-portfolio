const mongoose = require('mongoose');
require("dotenv").config()

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://donlini:" + process.env.dbpass + "@cluster-portfolio.bgnei.mongodb.net/Portfolio?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
//Grid.mongo = mongoose.mongo;

module.exports = {mongoose};

