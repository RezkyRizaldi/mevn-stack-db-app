const fs = require("fs");
const Post = require("../models/posts");

module.exports = class API {
  // fetch all posts
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // fetch post by ID
  static async fetchPostByID(req, res) {
    const id = req.params.id;

    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // create post
  static async createPost(req, res) {
    const post = req.body;
    const imageName = req.file.filename;

    post.image = imageName;
    try {
      await Post.create(post);
      res.status(201).json({ message: "Post created successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // update post
  static async updatePost(req, res) {
    const id = req.params.id;
    let newImage = "";

    if (req.file) {
      newImage = req.file.filename;
      try {
        fs.unlinkSync(`./public/${req.body.oldImage}`);
      } catch (err) {
        console.error(err);
      }
    } else {
      newImage = req.body.oldImage;
    }

    const newPost = req.body;

    newPost.image = newImage;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "Post updated successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // delete post
  static async deletePost(req, res) {
    const id = req.params.id;

    try {
      const result = await Post.findByIdAndDelete(id);

      if (result.image != "") {
        try {
          fs.unlinkSync(`./public/${resuit.image}`);
        } catch (err) {
          console.error(err);
        }
      }
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
