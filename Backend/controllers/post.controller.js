const Post = require("../models/post.model");
const User = require("../models/user.model");

module.exports.createPost = async (req, res) => {
  try {
    const { prompt, response, type } = req.body;

    const post = await Post.create({
      user: req.user._id,
      prompt,
      response,
      type,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

module.exports.getDiscoverPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("user", "username avatar");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};
module.exports.getFollowingPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      user: { $in: user.following },
    })
      .sort({ createdAt: -1 })
      .populate("user", "username avatar");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch following posts", error });
  }
};
module.exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user._id;

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle like", error });
  }
};
