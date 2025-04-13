import React, { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import Navbar from "../components/Shared/Navbar";
import { toast } from "react-hot-toast";
import { Search, UserPlus, UserMinus, Users } from "lucide-react";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserDataContext);
  const token = user?.token || localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/profile/${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSearchResult(res.data);
      toast.success("User found! 👋");
    } catch (err) {
      setSearchResult(null);
      toast.error("User not found 🫣");
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/follow/${searchResult._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResult(prev => ({
        ...prev,
        followers: [...prev.followers, user._id]
      }));
      toast.success(`Following @${searchResult.username}! 🎉`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Follow failed 😓");
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/unfollow/${searchResult._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResult(prev => ({
        ...prev,
        followers: prev.followers.filter(id => id !== user._id)
      }));
      toast.success(`Unfollowed @${searchResult.username}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unfollow failed 😓");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 pb-20">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl animate-fade-in">
          <div className="text-center mb-6">
            <Users size={48} className="mx-auto text-indigo-600 mb-3" />
            <h2 className="text-3xl font-extrabold text-indigo-700">
              Find Rizzlords
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Discover and connect with fellow wingmen
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-white ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search User
                </>
              )}
            </button>
          </form>

          {searchResult && (
            <div className="mt-6 bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-xl shadow-inner border border-white">
              <div className="flex flex-col items-center">
                <img
                  src={searchResult.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt={searchResult.username}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  @{searchResult.username}
                </h3>
                <div className="flex gap-4 mt-2">
                  <div className="text-center">
                    <p className="font-bold text-indigo-600">{searchResult.followers.length}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-pink-600">{searchResult.following.length}</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>

                {user._id !== searchResult._id && (
                  <div className="mt-4">
                    {searchResult.followers.includes(user._id) ? (
                      <button
                        onClick={handleUnfollow}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white py-2 px-6 rounded-full text-sm font-medium shadow-md"
                      >
                        <UserMinus size={16} />
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={handleFollow}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white py-2 px-6 rounded-full text-sm font-medium shadow-md"
                      >
                        <UserPlus size={16} />
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default SearchUser;
