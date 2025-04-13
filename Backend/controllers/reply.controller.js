const generateGeminiReply = require("../utils/generateGeminiReply");
const User = require("../models/user.model");
const Post = require("../models/post.model");

module.exports.generateReply = async (req, res) => {
  try {
    const { inputText, type } = req.body;
    console.log("📥 inputText:", inputText);
    console.log("📥 type:", type);

    // 1. Generate reply from Gemini
    let reply = await generateGeminiReply(inputText, type);
    console.log("Gemini full reply:", reply);

    if (!reply || reply.length < 5) {
      reply = "Couldn't generate a fun reply. Try again!";
    }

    // 2. Process the reply
    const lines = reply.split("\n").map((line) => line.trim());
    const responseLines = lines.filter(
      (line) =>
        line.startsWith("* ") ||
        line.startsWith("–") ||
        line.startsWith('"') ||
        /^[a-zA-Z0-9]/.test(line)
    );
    reply = responseLines[0] || "Couldn't generate a fun reply. Try again!";
    reply = String(reply).replace(/^"|"$/g, "");

    // 3. Save to user's replies
    const user = await User.findById(req.user._id);
    user.replies.push({ input: inputText, type, reply });
    await user.save();

    // 4. Create a new post
    const post = await Post.create({
      user: req.user._id,
      prompt: inputText,
      response: reply,
      type,
    });

    // 5. Send single response
    res.status(200).json({
      reply,
      id: post._id,
      prompt: post.prompt,
      response: post.response,
    });
  } catch (error) {
    console.error("🔥 Error in /reply:", error);
    res.status(500).json({ error: "Failed to generate reply" });
  }
};

module.exports.getReplies = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const replies = user.replies.reverse();
    res.status(200).json({ replies });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reply history" });
  }
};
