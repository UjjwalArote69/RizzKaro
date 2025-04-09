import React, { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-purple-800 via-violet-700 to-pink-600">
      <button onClick={() => navigate('/home')}>
        <ArrowLeft size={32}  className="text-white ml-4 mt-4"/>
      </button>
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fade-in">
          <div className="flex flex-col items-center space-y-4">
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=RizzKaro"
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md border-4 border-violet-400 animate-pulse"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              Hi {user?.fullname?.firstname} 👋
            </h2>
            <p className="text-sm text-gray-600 italic">
              “Rizz is an art. You’re the artist.”
            </p>
          </div>

          <div className="mt-6 space-y-3 text-gray-700 text-sm">
            <p>
              <strong>Full Name:</strong> {user?.fullname?.firstname}{" "}
              {user?.fullname?.lastname}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>User ID:</strong>{" "}
              <span className="text-xs break-all text-purple-700">
                {user?._id}
              </span>
            </p>
          </div>

          <button
            onClick={logoutHandler}
            className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-md transition transform hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
