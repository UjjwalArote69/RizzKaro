import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Shared/Navbar";
// import Aurora from './Aurora'
// import Aurora from "";\
// import Aurora from "../components/Aurora"
import toast from "react-hot-toast";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

const GenerateResponse = () => {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("rizz");
  const [rizz, setRizz] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reply`,
        { prompt, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      switch (type) {
        case "rizz":
          toast.success("Rizzed up! 💖");
          break;
        case "roast":
          toast.success("Got Destroyed! 🔥");
          break;
        case "compliment":
          toast.success("Such a Gentleman! 🌟");
          break;
        default:
          break;
      }

      setRizz(response.data.reply);
    } catch (error) {
      console.error("Error generating:", error);
      setRizz("❌ Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rizz);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
  
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4 sm:p-8 pb-5">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-extrabold text-center text-purple-700 flex items-center justify-center gap-2">
            ✨ RizzKaro Generator
          </h1>

          <textarea
            className="w-full h-32 p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 resize-none text-gray-800"
            placeholder="Type something you want to rizz up..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <select
            className="w-full p-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="rizz">💘 Rizz</option>
            <option value="roast">🔥 Roast</option>
            <option value="compliment">🌟 Compliment</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Generating...</span>
            ) : (
              "💬 Generate"
            )}
          </button>

          {rizz && (
            <div className="relative bg-purple-50 border border-purple-200 rounded-xl p-4 text-gray-800 shadow-inner transition-all">
              <h3 className="font-bold text-purple-700 mb-2">Your Output:</h3>
              <p className="whitespace-pre-wrap leading-relaxed">{rizz}</p>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 text-purple-600 hover:text-purple-800 transition"
                title="Copy to clipboard"
              >
                {copied ? (
                  <ClipboardCheck size={20} />
                ) : (
                  <ClipboardCopy size={20} />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default GenerateResponse;
