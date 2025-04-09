import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { firstname, lastname, email, password };

    try {
      const response = await axios.post(
        `${https://rizzkaro.onrender.com/api/auth/register}`,
        userData
      );
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // <- Add this
        navigate("/get-started");
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert("Something went wrong 😓");
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg w-full max-w-sm sm:max-w-md">
        <div className="mb-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9790/9790549.png"
            alt="RizzKaro"
            className="w-16 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Join the Rizz Squad 😎
          </h1>
          <p className="text-gray-500 text-sm">
            Let’s rizz the world up together!
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="John"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 ring-violet-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="Doe"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 ring-violet-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              placeholder="you@vibes.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 ring-violet-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 ring-violet-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold text-sm tracking-wide transition"
          >
            Create Account ✨
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already on board?{" "}
          <Link
            to="/login"
            className="text-violet-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
