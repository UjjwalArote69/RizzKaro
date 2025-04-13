import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import { toast } from "react-hot-toast";
import { Camera } from "lucide-react";

const EditProfile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstname: user?.fullname?.firstname || "",
    lastname: user?.fullname?.lastname || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || ""
  });

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    const uploadData = new FormData();
    uploadData.append('avatar', file);
    
    try {
      setIsUploading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/avatar`,
        uploadData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      // Update both preview and form data
      setAvatarPreview(response.data.avatar);
      setFormData(prev => ({ ...prev, avatar: response.data.avatar }));
      
      toast.success("Avatar updated successfully! 🎉");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update-profile`,
        {
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname
          },
          username: formData.username,
          email: formData.email,
          avatar: formData.avatar
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUser(response.data.user);
      setAvatarPreview(response.data.user.avatar);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Profile updated! 🎉");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden p-6 sm:px-6">
      {/* Neon Glowing Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      <div className="absolute -top-20 right-1/3 w-[200px] h-[200px] bg-purple-500 opacity-20 rounded-full blur-2xl animate-spin-slow -z-10" />

      {/* Main Edit Profile Card */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md animate-fade-in">
        <div className="mb-6 text-center">
          {/* Avatar Upload Section */}
          <div className="relative mx-auto w-24 h-24 mb-4">
            <img
              src={avatarPreview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-2 border-purple-200 shadow-md"
            />
            <button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-110"
            >
              {isUploading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              ) : (
                <Camera size={20} />
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />
          </div>

          <h1 className="text-3xl font-extrabold text-indigo-700">
            Edit Your Profile ✨
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Make it uniquely you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar URL - Fallback option */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL (or upload above)
            </label>
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => {
                setFormData({...formData, avatar: e.target.value});
                setAvatarPreview(e.target.value);
              }}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Paste image URL or upload"
            />
          </div>

          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstname}
                onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastname}
                onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 text-white py-3 rounded-xl font-semibold text-sm tracking-wide shadow-lg transition mt-4"
          >
            Save Changes 🚀
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Changed your mind?{" "}
          <button 
            onClick={() => navigate("/profile")} 
            className="text-pink-600 font-semibold hover:underline"
          >
            Go back
          </button>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;