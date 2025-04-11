const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🚀 Auto-detect type from input
const detectType = (input) => {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes("roast")) return "roast";
  if (lowerInput.includes("pickup") || lowerInput.includes("rizz") || lowerInput.includes("flirt")) return "rizz";
  if (lowerInput.includes("compliment") || lowerInput.includes("nice") || lowerInput.includes("praise")) return "compliment";
  return "default";
};

// 💡 Get smart prompt based on type
const getPrompt = (type, input) => {
  switch (type.toLowerCase()) {
    case "roast":
      return `Roast "${input}" in a witty and playful way. Use GenZ slang and humor. Don't include a tech reference, but keep it minimal. Add a little flair, and make it mildly descriptive.`;
    case "rizz":
      return `Give a flirty pickup line for "${input}". Use GenZ language and be creative. Add a little extra flavor—more than just a one-liner. Don't use any tech reference.`;
    case "compliment":
      return `Give a sweet and heartwarming compliment to "${input}". Be expressive and descriptive. A very rare tech metaphor is okay but don't rely on it. Make it feel thoughtful and genuine.`;
    default:
      return `Reply to "${input}" with creativity and a GenZ tone. Add some description and avoid sounding robotic. Keep it fun, natural, and light.`;
  }
};

const generateGeminiReply = async (inputText, type) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  // 🧠 Use detected type if none or invalid passed
  const finalType = type && ["roast", "rizz", "compliment"].includes(type.toLowerCase())
    ? type
    : detectType(inputText);

  const prompt = `${getPrompt(finalType, inputText)} Try to keep it under 1-2 sentences. Don't use any tech references or programming languages reference and specific word 'undefined' in any response. Make it fun and lighthearted.`;

  console.log("🧠 Prompt sent to Gemini:", prompt);

  const result = await model.generateContent(prompt);

  if (!result || !result.response) {
    throw new Error("No response from Gemini");
  }

  const text = result.response.text();
  return text;
};

module.exports = generateGeminiReply;
