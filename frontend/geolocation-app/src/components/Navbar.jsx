import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import Logo from "../assets/logo.png";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  let showProfileSection = [
    "/home",
    "/admin",
    "/allroutespage",
    "/stats",
  ].includes(location.pathname);

  return (
    <nav className="flex items-center justify-between p-4 relative">
      <img
        className="w-32 md:w-36 h-auto cursor-pointer"
        onClick={() => navigate("/")}
        src={Logo}
        alt="logo"
      />

      {showProfileSection ? (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      ) : (
        <>
          <div className="hidden md:flex space-x-2 md:mr-2">
            <button
              onClick={() => navigate("/login")}
              className="btn-secondary w-24 md:w-32"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="btn-primary w-32 md:w-48"
            >
              Get Started for Free
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-4xl focus:outline-none"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 md:w-1/3 bg-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="btn-secondary w-48"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                className="btn-primary w-48"
              >
                Get Started for Free
              </button>
            </div>
          </div>

          {menuOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
