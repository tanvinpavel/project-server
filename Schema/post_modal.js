const { Schema, model } = require("mongoose");

const postSchema = Schema({
  creator: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true
  },
  post: {
    type: String,
    trim: true,
    required: true
  },
  private: {
    type: Boolean,
    required: true
  },
});

const Post = new model("Post", postSchema);

module.exports = Post;