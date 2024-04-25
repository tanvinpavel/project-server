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
  publicId: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
  },
  post: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    trim: true,
  },
  private: {
    type: Boolean,
    required: true
  },
});

const Post = new model("Post", postSchema);

module.exports = Post;