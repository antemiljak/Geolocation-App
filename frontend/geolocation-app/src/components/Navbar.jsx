import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import Logo from "../assets/logo.png";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
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
    <div className="flex items-center justify-between p-4">
      <img
        className="w-32 md:w-36 h-auto cursor-pointer"
        onClick={() => navigate("/")}
        src={Logo}
        alt="logo"
      />

      {showProfileSection ? (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      ) : (
        <div className="flex space-x-2 md:mr-2">
          <button
            onClick={() => navigate("/login")}
            className="btn-secondary w-24 md:w-48 md:text-lg rounded-full"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="btn-primary w-32 md:w-64 md:text-lg rounded-full"
          >
            Get Started for Free
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
