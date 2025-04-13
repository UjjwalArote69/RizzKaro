import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, BadgeInfo, UserCircle2, LogOut, Edit3, Key } from "lucide-react";
import TiltedCard from "../components/TitledCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully! 👋");
    navigate("/login");
  };

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile/${user.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReplies(res.data.replies || []);
      } catch (err) {
        console.error("Error fetching rizz history:", err);
        toast.error("Failed to load history 😓");
      }
    };

    if (user?.username) {
      fetchReplies();
    }
  }, [user]);

  return (
    <div className="relative min-h-screen overflow-hidden text-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      <div className="absolute -top-20 right-1/3 w-[200px] h-[200px] bg-purple-500 opacity-20 rounded-full blur-2xl animate-spin-slow -z-10" />

      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="fixed m-4 p-2 bg-white/20 hover:bg-white/30 transition backdrop-blur-sm rounded-full shadow-md z-10"
      >
        <ArrowLeft size={28} className="" />
      </button>

      {/* Profile Content */}
      <div className="flex flex-col items-center pt-20 pb-10 px-4">
        {/* Tilted Profile Card */}
        <div className="relative group">
          <TiltedCard
            imageSrc={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            altText={`${user?.fullname?.firstname}`}
            captionText={`${user?.fullname?.firstname}`}
            containerHeight="325px"
            containerWidth="325px"
            imageHeight="275px"
            imageWidth="225px"
            rotateAmplitude={15}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="text-center">
                <p className="tilted-card-demo-text text-xl font-bold">@{user?.username}</p>
                <p className="text-sm mt-1">{user?.email}</p>
              </div>
            }
          />
        </div>

        {/* User Stats */}
        <div className="flex gap-6 mt-6 mb-8">
          <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold ">{replies.length}</p>
            <p className="text-sm ">Rizzes</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-white">{user?.followers?.length || 0}</p>
            <p className="text-sm ">Followers</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-white">{user?.following?.length || 0}</p>
            <p className="text-sm ">Following</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Link
            to="/edit-profile"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl shadow-md transition transform hover:scale-[1.02]"
          >
            <Edit3 size={18} />
            Edit Profile
          </Link>
          <Link
            to="/update-password"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl shadow-md transition transform hover:scale-[1.02]"
          >
            <Key size={18} />
            Change Password
          </Link>
          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl shadow-md transition transform hover:scale-[1.02]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Rizz History Section */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-t-3xl shadow-inner text-white px-6 sm:px-10 pt-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg">
            🧠
          </span>
          Rizz History
        </h3>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {replies.length > 0 ? (
            replies.map((reply, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-white/10 to-white/20 p-4 rounded-xl shadow-md border border-white/10 hover:border-pink-300/30 transition"
              >
                <div className="flex justify-between items-center text-sm text-black mb-2">
                  <span className="capitalize font-medium bg-white/10 px-2 py-1 rounded-md">
                    {reply.type}
                  </span>
                  <span className="text-xs opacity-80">
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 space-y-2">
                  <p className="text-white">
                    <span className="font-semibold text-pink-200">Prompt:</span> {reply.input}
                  </p>
                  <p className="text-white">
                    <span className="font-semibold text-pink-200">Reply:</span> {reply.reply}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-700">No rizzed replies yet.</p>
              <button 
                onClick={() => navigate('/generate-response')}
                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Create Your First Rizz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
