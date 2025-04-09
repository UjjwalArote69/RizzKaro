const generateGeminiReply = require("../utils/generateGeminiReply");
const User = require("../models/user.model"); // 👈 Add this line

module.exports.generateReply = async (req, res) => {
  try {
    const { inputText, type } = req.body;
    console.log("📥 inputText:", inputText);
    console.log("📥 type:", type);

    let reply = await generateGeminiReply(inputText, type);
    console.log("Gemini full reply:", reply);
    if (!reply || reply.length < 5) {
      reply = "Couldn't generate a fun reply. Try again!";
    }

    // Extract only lines that look like proper replies (skip headings like **Funny**, etc.)
    const lines = reply.split("\n").map((line) => line.trim());

    // Filter for bullet-style replies or quotes
    const responseLines = lines.filter(
      (line) =>
        line.startsWith("* ") ||
        line.startsWith("–") ||
        line.startsWith('"') ||
        /^[a-zA-Z0-9]/.test(line)
    );

    // Choose the first valid line, or a fallback message
    reply = responseLines[0] || "Couldn't generate a fun reply. Try again!";
    reply = String(reply).replace(/^"|"$/g, ""); // Remove extra quotes

    const user = await User.findById(req.user._id);
    user.replies.push({ input: inputText, type, reply });
    await user.save();

    res.status(200).json({ reply });
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
