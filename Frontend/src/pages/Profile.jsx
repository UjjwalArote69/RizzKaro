import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, BadgeInfo, UserCircle2, LogOut } from "lucide-react";
import TiltedCard from "../components/TitledCard";
import axios from "axios";

const Profile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [replies, setReplies] = useState([]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
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
      }
    };

    if (user?.username) {
      fetchReplies();
    }
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-purple-800 via-violet-700 to-pink-600 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="m-4 p-2 bg-white/20 hover:bg-white/30 transition backdrop-blur-sm rounded-full shadow-md"
      >
        <ArrowLeft size={28} className="text-white" />
      </button>

      {/* Profile Content */}
      <div className="flex items-center justify-center flex-col gap-y-10 px-4 pb-10">
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText={`${user?.fullname?.firstname}`}
          captionText={`${user?.fullname?.firstname}`}
          containerHeight="325px"
          containerWidth="325px"
          imageHeight="275px"
          imageWidth="225px"
          rotateAmplitude={15}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="tilted-card-demo-text">{`${user?.username}`}</p>
          }
        />
        <button
          onClick={logoutHandler}
          className="p-5 mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-md transition transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Rizz History Section */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-t-3xl shadow-inner text-white px-6 sm:px-10 pt-8">
        <h3 className="text-2xl font-bold mb-4 text-white">🧠 Rizz History</h3>
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          {replies.length > 0 ? (
            replies.map((reply, idx) => (
              <div key={idx} className="bg-white/20 p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-center text-sm text-pink-200">
                  <span className="capitalize font-medium">{reply.type}</span>
                  <span className="text-xs">
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white">
                  <strong>Prompt:</strong> {reply.input}
                </p>
                <p className="text-sm text-white mt-1">
                  <strong>Reply:</strong> {reply.reply}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white/70">No rizzed replies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
