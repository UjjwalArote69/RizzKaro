import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { emailOrUsername, password };
    // console.log("Heloooooo");

    try {
      // console.log("Entering try block");
      console.log(import.meta.env.VITE_API_URL);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        userData
      );
      // console.log("Response:", response);
      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        // console.log("Login Success:", data);
        setUser(data.user);
        // console.log("Token in context:", data.user.token);
        toast.success(`Welcome back, ${data.user.fullname.firstname}! 😎`);
        // console.log("User set in context:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.user.token);
        navigate("/home");
      }
    } catch (err) {
      toast.error("Invalid credentials 🫣");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Neon Glowing Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      <div className="absolute -top-20 right-1/3 w-[200px] h-[200px] bg-purple-500 opacity-20 rounded-full blur-2xl animate-spin-slow -z-10" />

      {/* Main Login Card */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md animate-fade-in">
        <div className="mb-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9790/9790549.png"
            alt="RizzKaro"
            className="w-16 mx-auto mb-3 animate-bounce"
          />
          <h1 className="text-3xl font-extrabold text-indigo-700">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Let’s rizz the world up 🔥
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            required
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 ring-pink-400"
          />

          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 ring-pink-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 text-white py-3 rounded-xl font-semibold text-sm tracking-wide shadow-lg transition"
          >
            💥 Rizz In
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          New here?{" "}
          <Link
            to="/register"
            className="text-pink-600 font-semibold hover:underline"
          >
            Create Account 🚀
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
