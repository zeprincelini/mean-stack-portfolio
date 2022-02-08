const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, require: true },
  type: { type: String, require: true },
  date: { type: String, require: true },
  url: { type: String, require: true },
  imageUrl: { type: String, require: true },
  imageId: { type: String, require: true },
});

module.exports = mongoose.model("posts", postSchema, "Post");
