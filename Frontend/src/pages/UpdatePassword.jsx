import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match! 🫣");
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      toast.error("Password must contain at least 6 characters with 1 number");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Password updated successfully! Please login again 🔒");
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed 😓");
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Neon Glowing Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      <div className="absolute -top-20 right-1/3 w-[200px] h-[200px] bg-purple-500 opacity-20 rounded-full blur-2xl animate-spin-slow -z-10" />

      {/* Main Password Update Card */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md animate-fade-in">
        <div className="mb-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
            alt="Password"
            className="w-16 mx-auto mb-3 animate-bounce"
          />
          <h1 className="text-3xl font-extrabold text-indigo-700">
            Update Password 🔒
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Secure your account with a new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="At least 6 characters with 1 number"
              required
              minLength="6"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 text-white py-3 rounded-xl font-semibold text-sm tracking-wide shadow-lg transition ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? (
              <span className="animate-pulse">Updating...</span>
            ) : (
              "Update Password 🔑"
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Changed your mind?{" "}
          <button
            onClick={() => navigate(-1)}
            className="text-pink-600 font-semibold hover:underline"
          >
            Go back
          </button>
        </p>
      </div>
    </div>
  );
};

export default UpdatePassword;