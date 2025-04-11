// pages/SearchUser.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import Navbar from "../components/Shared/Navbar";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(UserDataContext);
  const token = user?.token || localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/profile/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log("Search result:", res.data);
      setSearchResult(res.data);
      setError("");
    } catch (err) {
      setError("User not found");
      setSearchResult(null);
    }
  };

  const handleFollow = async () => {
    // console.log("Token being used:", token);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/follow/${searchResult._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResult((prev) => ({
        ...prev,
        followers: [...prev.followers, user._id],
      }));
    } catch (err) {
      console.error("Follow failed", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/unfollow/${searchResult._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResult((prev) => ({
        ...prev,
        followers: prev.followers.filter((id) => id !== user._id),
      }));
    } catch (err) {
      console.error("Unfollow failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f0ff] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Search User
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Find fellow Rizzlords by username
        </p>
        <form
          onSubmit={(e) => {
            handleSearch(e);
          }}
          className="mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Enter username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Search
          </button>
        </form>
        {searchResult && (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl shadow-inner text-center">
            <img
              src={searchResult.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-20 h-20 mx-auto rounded-full border border-gray-300 object-cover"
            />
            <h3 className="mt-2 text-xl font-bold text-gray-800">
              {searchResult.username}
            </h3>
            <p className="text-sm text-black">
              {searchResult.followers.length} Rizzlords |{" "}
              {searchResult.following.length} Wingmates
            </p>

            {/* Don't show the button if it's the same user */}
            {user._id !== searchResult._id && (
              <>
                {searchResult.followers.includes(user._id) ? (
                  <button
                    onClick={handleUnfollow}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollow}
                    className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-lg"
                  >
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {error && (
          <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default SearchUser;
