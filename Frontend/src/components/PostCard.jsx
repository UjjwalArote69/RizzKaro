import { useState } from "react";
import axios from "axios";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function PostCard({ post, currentUserId }) {
  // Safeguard against null/undefined post
  if (!post) return <div className="bg-white rounded-xl p-4 shadow">Loading post...</div>;

  const [isLiked, setIsLiked] = useState(post.likes?.includes(currentUserId) || false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  // Safe user data with defaults
  const user = post.user || {
    avatar: "/default-avatar.png",
    username: "unknown"
  };

  const handleLike = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}/like`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        }
      );
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to like post");
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      {/* User Header */}
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={user.avatar} 
          className="w-10 h-10 rounded-full object-cover"
          alt={user.username}
        />
        <span className="font-semibold">@{user.username}</span>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 mb-2">{post.prompt}</p>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-medium">{post.response}</p>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex gap-4 text-gray-500">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1 ${isLiked ? "text-red-500" : ""}`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-1">
          <MessageCircle size={18} />
          <span>{post.comments?.length || 0}</span>
        </button>
        <button className="flex items-center gap-1">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
