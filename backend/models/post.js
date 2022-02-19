const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String },
  type: { type: String },
  date: { type: String },
  url: { type: String },
  imageUrl: { type: String },
  imageId: { type: String },
});

module.exports = mongoose.model("posts", postSchema, "Post");
