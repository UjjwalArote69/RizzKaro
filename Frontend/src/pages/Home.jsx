import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import PostCard from "../components/PostCard";
import Navbar from "../components/Shared/Navbar";
import { toast } from "react-hot-toast";
import { Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("discover");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const endpoint =
          activeTab === "discover" ? "/posts/discover" : "/posts/following";

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Please login to view posts");
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        const errorMessage =
          err.response?.data?.message || err.message || "Failed to load posts";
        toast.error(errorMessage);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchPosts();
    }
  }, [activeTab, user?.token, navigate]);

  // Rest of your component remains the same...
  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Tabs */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-20 p-4 border-b border-gray-200 shadow-sm">
          <div className="flex max-w-md mx-auto rounded-full bg-gray-100 p-1">
            {["discover", "following"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-1 transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "discover" ? (
                  <Sparkles size={16} />
                ) : (
                  <Users size={16} />
                )}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="p-4 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} currentUserId={user?._id} />
            ))
          ) : (
            <div className="text-center py-10">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md max-w-md mx-auto">
                <Sparkles size={40} className="mx-auto text-pink-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {activeTab === "discover"
                    ? "No posts to discover yet"
                    : "You're not following anyone yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === "discover"
                    ? "Be the first to create a post!"
                    : "Follow some users to see their posts"}
                </p>
                <button
                  onClick={() =>
                    navigate(
                      activeTab === "discover"
                        ? "/generate-response"
                        : "/search-user"
                    )
                  }
                  className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition"
                >
                  {activeTab === "discover" ? "Create Post" : "Find Users"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </div>
  );
}
