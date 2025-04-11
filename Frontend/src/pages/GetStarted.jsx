import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import gsap from "gsap";

const GetStarted = () => {
  const navigate = useNavigate();
  const containerRef = useRef();

  // useEffect(() => {
  //   gsap.from(containerRef.current, {
  //     opacity: 0,
  //     y: 30,
  //     duration: 1,
  //     ease: "power2.out",
  //   });
  // }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-white via-violet-50 to-purple-100">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
        Welcome to RizzKaro 💬
      </h1>
      <p className="text-gray-700 mb-6 max-w-xl">
        The AI wingman you didn’t know you needed. Whether it’s a roast, a rizz,
        or a compliment — Skibbidi style — we got you.
      </p>
      <button
        onClick={() => navigate("/generate-response")}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 shadow-md transition"
      >
        Let’s Rizz 🎯
      </button>
    </div>
  );
};

export default GetStarted;
