const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
