const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String},
    type: {type: String},
    //img: {data: Buffer, contentType: String},
    //name: {type: String},
    //path: {type: String},
    date: {type: String},
    url: {type: String}
});

module.exports = mongoose.model('posts', postSchema, 'Post');
