import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import NewRouteRecording from "../components/NewRouteRecording";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../components/Footer";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="flex gap-3 text-lg ml-[4%]">
        <button
          onClick={() => navigate("/allroutespage", { state: { userInfo } })}
          className="btn-secondary w-32"
        >
          All Routes
        </button>
        <button
          onClick={() => navigate("/stats", { state: { userInfo } })}
          className="btn-secondary w-32"
        >
          Stats
        </button>
      </div>
      <div className="flex h-[85vh] p-6 mx-auto max-w-[95%]">
        <div className="flex-[0.8]">
          <Map />
        </div>
        <div className="flex-[0.4] flex flex-col gap-y-4 justify-center items-center">
          <NewRouteRecording userInfo={userInfo} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
