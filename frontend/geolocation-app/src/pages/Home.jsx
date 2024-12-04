import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import NewRouteRecording from "../components/NewRouteRecording";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allRoutes, setAllRoutes] = useState(null);

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

  const getAllRoutes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-map-routes");

      if (response.data && response.data.mapRoute) {
        setAllRoutes(response.data.mapRoute);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllRoutes();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="flex gap-10 text-lg ml-[4%]">
        <h4
          onClick={() =>
            navigate("/allroutespage", { state: { userInfo, allRoutes } })
          }
          className="cursor-pointer hover:text-green-300"
        >
          All Routes
        </h4>
        <h4>Stats</h4>
      </div>
      <div className="flex h-[90vh] p-6 mx-auto max-w-[95%]">
        <div className="flex-[0.8] bg-gray-200 flex items-center justify-center rounded-lg border-r border-gray-300">
          <Map allRoutes={allRoutes} />
        </div>
        <div className="flex-[0.4] flex flex-col gap-y-3 justify-center items-center rounded-lg">
          <NewRouteRecording />
        </div>
      </div>
    </div>
  );
};

export default Home;
