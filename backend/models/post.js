const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    // username: String,
    // password: String
});

module.exports = mongoose.model('posts', UserSchema, 'Posts');
