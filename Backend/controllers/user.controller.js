const User = require("../models/user.model");
const mongoose = require("mongoose");

// Register a new user✅
module.exports.registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await User.hashPassword(password); // ✅ using static method correctly

    const newUser = await User.create({
      username,
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
    });

    const token = newUser.generateAuthToken();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during registration" });
  }
};

// Login a user✅
module.exports.loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  console.log("Login Request Received");
  console.log("Request Body:", req.body);

  try {
    const user = await User.findOne({
      $or: [
        { email: new RegExp(`^${emailOrUsername}$`, "i") },
        { username: new RegExp(`^${emailOrUsername}$`, "i") },
      ],
    }).select("+password");

    // console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🧿 Follow a user
module.exports.followUser = async (req, res) => {
  const { id: targetUserId } = req.params;
  const currentUserId = req.user._id;

  try {
    // Prevent self-follow
    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    console.log("Current User ID:", currentUserId);
    console.log("Target User ID:", targetUserId);
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ message: "Already following" });
    }

    targetUser.followers.push(currentUserId);
    currentUser.following.push(targetUserId);

    await targetUser.save();
    await currentUser.save();

    console.log("➕ FollowUser called");
    res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    console.error("Follow error:", err);
    res
      .status(500)
      .json({ error: "Something went wrong", message: err.message });
  }
};

// 🧿 Unfollow a user

module.exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.id;

    if (userId.toString() === targetUserId) {
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Make sure user.following and targetUser.followers exist
    if (!Array.isArray(user.following)) user.following = [];
    if (!Array.isArray(targetUser.followers)) targetUser.followers = [];

    user.following.pull(targetUserId);
    targetUser.followers.pull(userId);

    // console.log("User to save:", user);
    // console.log("Target User to save:", targetUser);

    await user.save(); // 👈 this should no longer throw username error
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

// 🧿 Get user profile by username
module.exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select(
      "_id fullname username avatar followers following replies"
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    // Sort replies by createdAt descending (latest first)
    const sortedReplies = [...user.replies].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      avatar: user.avatar,
      followers: user.followers,
      following: user.following,
      replies: sortedReplies,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// 🧿 Get user by username
module.exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    console.log("User found:", user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Search user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
