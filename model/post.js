const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postData = new Schema({
  method: String,
});

const Post = mongoose.model("post", postData);

module.exports = Post
