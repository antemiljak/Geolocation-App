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
  const showProfileSection = location.pathname === "/home";
  return (
    <div className="flex items-center justify-between px-6 py-2 ">
      <h2 className="text-xl font-medium text-green-300">Geolocation App</h2>

      <ul className="flex gap-8 text-lg">
        <li className="hover:text-green-300">Route Recording</li>
        <li className="hover:text-green-300">All Routes</li>{" "}
        <li className="hover:text-green-300">Statistics</li>
      </ul>

      {showProfileSection ? (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      ) : (
        <div className="space-x-3">
          <Link to={"/login"} className="btn-secondary w-24 px-8">
            Login
          </Link>
          <Link to={"/signup"} className="btn-primary w-48 px-12">
            Get Started for Free
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
