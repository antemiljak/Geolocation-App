import React from "react";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col  ml-[4%] mt-28">
        <p className="text-xl mb-2">Discover the World Around You with </p>
        <h1 className="text-6xl font-bold text-green-300 mb-8">
          Geolocation
          <span className="text-rose-500 italic"> App</span>
        </h1>{" "}
        <p className="w-[75%] mb-8">
          Real-Time Location Tracking, Simplified. Experience the power of
          accurate and real-time location tracking with{" "}
          <span className="font-bold">Geolocation App</span>. Whether you're
          navigating through a new city, keeping track of loved ones, or
          managing assets, our app gives you the tools you need to stay
          connected and in control.
        </p>
        <p></p>
        <div className="flex items-center gap-8">
          <button className="btn-primary w-64">Create Account</button>
          <p className="btn-secondary w-64">Find more about...</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
