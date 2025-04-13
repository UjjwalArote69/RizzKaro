import React, { useRef } from "react";
import { Home, Search, MessageCircle, User, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const iconsRef = useRef([]);
  const plusIconRef = useRef(null);
  const plusButtonRef = useRef(null);

  gsap.registerPlugin(useGSAP);

  const currentPath = location.pathname;

  // Animate icons one after another
  useGSAP(() => {
    gsap.from(iconsRef.current, {
      scale: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.2,
    });
  }, []);

  useGSAP(() => {
    gsap.from(plusIconRef.current, {
      scale: 0,
      rotate: 180,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.5,
    });
  }, []);

  useGSAP(() => {
    gsap.from(plusButtonRef.current, {
      color: "white",
      scale: 0,
      duration: 0.7,
      ease: "back.out(1.7)",
    });
  });

  const getButtonStyle = (path) =>
    currentPath === path ? "text-black" : "text-gray-400 hover:text-black";

  return (
    <div className="fixed bottom-2 w-full p-2  flex justify-center items-center z-50">
      {/* Main navbar */}
      <div className="bg-white flex items-center justify-between px-6 py-3 rounded-full shadow-lg w-[320px] max-w-[90%]">
        <button
          ref={(el) => (iconsRef.current[0] = el)}
          onClick={() => navigate("/home")}
          className={`${getButtonStyle("/home")}`}
        >
          <Home size={24} />
        </button>
        <button
          ref={(el) => (iconsRef.current[1] = el)}
          onClick={() => navigate("/search-user")}
          className={`${getButtonStyle("/search-user")}`}
        >
          <Search size={24} />
        </button>
        <button
          ref={(el) => (iconsRef.current[2] = el)}
          onClick={() => navigate("/messages")}
          className={`${getButtonStyle("/messages")}`}
        >
          <MessageCircle size={24} />
        </button>
        <button
          ref={(el) => (iconsRef.current[3] = el)}
          onClick={() => navigate("/profile")}
          className={`${getButtonStyle("/profile")}`}
        >
          <User size={24} />
        </button>
      </div>

      {/* Floating '+' button */}
      <button
        ref={plusButtonRef}
        onClick={() => navigate("/generate-response")}
        className={` bg-gradient-to-br from-purple-800 via-violet-700 to-pink-600 rounded-full w-13 h-13 flex items-center justify-center ml-3 shadow-lg hover:scale-105 transition ${
          currentPath === "/generate-response" ? "ring-2 ring-white" : ""
        }`}
      >
        <Plus ref={plusIconRef} color="white" size={28} />
      </button>
    </div>
  );
};

export default Navbar;
