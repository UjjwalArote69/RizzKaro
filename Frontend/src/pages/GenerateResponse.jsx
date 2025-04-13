import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Shared/Navbar";
import toast from "react-hot-toast";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

const GenerateResponse = () => {
  const [inputText, setInputText] = useState("");
  const [type, setType] = useState("rizz");
  const [rizz, setRizz] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const token = localStorage.getItem("token");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reply/generate-reply`,
        { inputText, type },
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

  const handleShareToFeed = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        {
          prompt: inputText,
          response: rizz,
          type,
          caption,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Posted to your feed!");
      setIsShareModalOpen(false);
      setCaption("");
    } catch (error) {
      console.error("Error sharing post:", error);
      toast.error(error.response?.data?.message || "Failed to share post");
    }
  };

  return (
    <div>
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      <div className="absolute -top-20 right-1/3 w-[200px] h-[200px] bg-purple-500 opacity-20 rounded-full blur-2xl animate-spin-slow -z-10" />

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 pb-5">
        <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-extrabold text-center text-purple-700 flex items-center justify-center gap-2">
            ✨ Rizz Generator
          </h1>

          <textarea
            className="w-full h-32 p-4 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 resize-none text-gray-800"
            placeholder="Type something you want to rizz up..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
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
            disabled={loading || !inputText}
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
              <div className="whitespace-pre-wrap leading-relaxed">
                {rizz.split("\n").map((line, i) => (
                  <p key={i}>{line || <br />}</p>
                ))}
              </div>
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShareModalOpen(true);
                }}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Share to Feed
              </button>
            </div>
          )}

          {/* Share Modal */}
          {isShareModalOpen && (
            <div 
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setIsShareModalOpen(false)}
            >
              <div 
                className="bg-white p-6 rounded-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Share to Feed</h3>
                <textarea
                  placeholder="Add a caption (optional)"
                  className="w-full p-2 border rounded mb-4"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsShareModalOpen(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleShareToFeed();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default GenerateResponse;
