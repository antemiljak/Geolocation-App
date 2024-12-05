import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import NewRouteRecording from "../components/NewRouteRecording";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

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
        <h4
          onClick={() => navigate("/allroutespage", { state: { userInfo } })}
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32"
        >
          All Routes
        </h4>
        <h4
          onClick={() => navigate("/stats", { state: { userInfo } })}
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32"
        >
          Stats
        </h4>
      </div>
      <div className="flex h-[85vh] p-6 mx-auto max-w-[95%]">
        <div className="flex-[0.8] bg-gray-200 flex items-center justify-center rounded-lg border-r border-gray-300">
          <Map />
        </div>
        <div className="flex-[0.4] flex flex-col gap-y-3 justify-center items-center rounded-lg">
          <NewRouteRecording />
        </div>
      </div>
    </div>
  );
};

export default Home;
