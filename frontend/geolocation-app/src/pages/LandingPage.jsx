import React from "react";
import Navbar from "../components/Navbar";
import Earth from "../assets/earth.png";
import Footer from "../components/Footer";
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col  ml-[4%] mt-28 w-1/2 relative">
        <p className="text-6xl mb-2 mb-8 bg-gradient-to-r from-green-300 via-white to-rose-500 bg-clip-text text-transparent">
          Discover the World
          <br /> Around You
        </p>
        <ul className="flex justify-center justify-center gap-12 text-xs text-slate-200 w-[75%] mb-4">
          <li>REAL-TIME</li>
          <li>TRACKING</li>
          <li>MANAGE</li>
          <li>DISCOVER</li>
        </ul>

        <div className="w-[75%] mb-8 bg-zinc-900 rounded-xl p-6">
          <p className="mb-8 rounded-lg p-2 text-slate-100">
            Experience the power of accurate and real-time location tracking
            with <span className="font-bold">Geolocation App</span>. Whether
            you're navigating through a new city, keeping track of loved ones,
            or managing assets, our app gives you the tools you need to stay
            connected and in control.
          </p>
          <p></p>
          <div className="px-2 flex items-center justify-center gap-4">
            <button className="btn-primary w-64">Create Account</button>
            <p className="btn-secondary w-64">Learn more...</p>
          </div>
        </div>
      </div>
      <img src={Earth} alt="" className="absolute bottom-0 right-0 w-[65%]" />{" "}
    </div>
  );
};

export default LandingPage;
