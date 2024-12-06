import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const location = useLocation(); // Access current route
  let showProfileSection = false;
  if (
    location.pathname === "/home" ||
    location.pathname === "/allroutespage" ||
    location.pathname === "/stats"
  ) {
    showProfileSection = true;
  } else {
    showProfileSection = false;
  }

  return (
    <div className="flex items-center justify-between p-4 ">
      <h2 className="text-3xl font-medium text-green-300">Geolocation App</h2>

      {showProfileSection ? (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={() => navigate("/login")}
            className="btn-secondary w-32"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/allroutespage")}
            className="btn-primary w-64"
          >
            Get Started for Free
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
