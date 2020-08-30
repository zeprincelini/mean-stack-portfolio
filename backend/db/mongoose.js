const mongoose = require('mongoose');
let Grid = require('gridfs-stream');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Portfolio", {useNewUrlParser: true, useUnifiedTopology: true});
//Grid.mongo = mongoose.mongo;

module.exports = {mongoose};
