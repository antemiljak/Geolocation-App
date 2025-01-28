import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import { getInitials, calculateDuration } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../components/Footer";

const Stats = () => {
  const [allRoutes, setAllRoutes] = useState(null);
  const [allRoutesSaved, setAllRoutesSaved] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo } = state;

  const getAllRoutes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-map-routes");

      if (response.data && response.data.mapRoute) {
        setAllRoutes(response.data.mapRoute);
        setAllRoutesSaved(response.data.mapRoute);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  const handleFilter = (time) => {
    console.log("Handle called");
    let filterRoutes;
    const now = new Date();
    if (time === "last-year") {
      filterRoutes = allRoutesSaved.filter(
        (route) =>
          new Date(route.startTime) >=
          new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate(),
            0,
            0,
            0
          )
      );
      setAllRoutes(filterRoutes);
    }
    if (time === "last-month") {
      const filterRoutes = allRoutesSaved.filter(
        (route) =>
          new Date(route.startTime) >=
          new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
            0,
            0,
            0
          )
      );
      console.log(filterRoutes);
      setAllRoutes(filterRoutes);
    }
    if (time === "last-week") {
      const filterRoutes = allRoutesSaved.filter(
        (route) =>
          new Date(route.startTime) >=
          new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7,
            0,
            0,
            0
          )
      );
      console.log(filterRoutes);
      setAllRoutes(filterRoutes);
    }
    if (time === "today") {
      const filterRoutes = allRoutesSaved.filter(
        (route) =>
          new Date(route.startTime) >=
          new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      );
      console.log(filterRoutes);
      setAllRoutes(filterRoutes);
    }
  };

  const calcDistance = allRoutes
    ?.reduce((sum, route) => sum + route.distance, 0)
    .toFixed(2);

  const calcDuration = allRoutes?.reduce(
    (sum, route) => sum + route.duration,
    0
  );

  const avgSpeed = (((calcDistance * 1000000) / calcDuration) * 3.6).toFixed(1);

  const longestDistanceRoute = allRoutes?.reduce(
    (max, route) => (route.distance > (max.distance || 0) ? route : max),
    {}
  );

  const longestDurationRoute = allRoutes?.reduce(
    (max, route) => (route.duration > (max.duration || 0) ? route : max),
    {}
  );

  useEffect(() => {
    getAllRoutes();

    return () => {};
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/home")}
          className="btn-secondary w-32 ml-[4%]"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection("profile-section")}
          className="btn-secondary w-32"
        >
          Profile Info
        </button>
        <select
          className="btn-primary w-32"
          onChange={(e) => handleFilter(e.target.value)} // Handle filtering on change
        >
          <option value="last-year">Last Year</option>
          <option value="last-month">Last Month</option>
          <option value="last-week">Last Week</option>
          <option value="today">Today</option>
        </select>
      </div>
      <div className="md:flex items-center justify-center gap-12 mt-20 mb-10">
        <div className="flex-[0.4] mx-4 md:mx-0 md:ml-[4%]">
          <h2 className="text-5xl txt-color font-bold mb-4 italic">CHARTS</h2>
          <div className="md:bg-zinc-900 md:p-6 rounded-xl">
            <p className="txt-color font-semibold text-lg">
              Welcome to{" "}
              <span className="font-bold text-green-300">GeoLocc </span> app
              chart section, take a look at your stats, workouts, routes,
              profile info and more. Data is visulaized using js library
              Charts.js. To take a look at drawn routes on map go to All routes
              section.
            </p>
          </div>
        </div>
        <div className="flex-[0.8] p-4 md:mr-[4%] mt-4 md:mt-0 mb-8">
          <Charts allRoutes={allRoutes} />
        </div>
      </div>
      <div
        id="profile-section"
        className="bg-zinc-900 rounded-xl mt-6 mb-24 p-6 max-w-[85%] md:max-w-[75%] mx-auto transition duration-150 ease-out hover:scale-105 hover:ease-in"
      >
        <h2 className="text-3xl md:text-5xl font-bold italic txt-color">
          PROFILE INFO
        </h2>

        <div className=" mt-6 ">
          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="md:flex w-full md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <i class="fas fa-user fa-lg md:fa-2xl"></i>
                  <h3 className="text-xl font-bold">{userInfo.name}</h3>
                </div>
                <h3 className="text-xs text-slate-300">#{userInfo._id}</h3>
              </div>
              <div className="flex gap-12">
                <div>
                  <p className="text-sm text-slate-300">Age:</p>
                  <p className="text-xl font-bold">{userInfo.age}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Height:</p>
                  <p className="text-xl font-bold">{userInfo.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Weight:</p>
                  <p className="text-xl font-bold">{userInfo.weight} kg</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-300">Email:</p>
                <p className="text-xl font-bold">{userInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 flex-1 ">
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-flag-checkered fa-2xl"></i>
              <div>
                <p className="text-sm">Number of Routes</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {allRoutes?.length}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-stopwatch fa-2xl"></i>
              <div>
                <p className="text-sm">Avg Route Duration</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {calculateDuration(calcDuration / allRoutes?.length)}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-line-chart fa-2xl"></i>
              <div>
                <p className="text-sm">Avg Route Length</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {(calcDistance / allRoutes?.length).toFixed(2)} km
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-gauge-high fa-2xl"></i>
              <div>
                <p className="text-sm">Avg Route Speed</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {avgSpeed} km/h
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-road fa-2xl"></i>
              <div>
                <p className="text-sm">Total Distance Covered</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {calcDistance} km
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-clock fa-2xl"></i>
              <div>
                <p className="text-sm">Total Time Recorded</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {calculateDuration(calcDuration)}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-medal fa-2xl"></i>
              <div>
                <p className="text-sm">{`Longest Route (distance)`}</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {longestDistanceRoute?.title || "N/A"}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-black p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-person-running fa-2xl"></i>
              <div>
                <p className="text-sm">{`Longest Route (time)`}</p>
                <h4 className="text-2xl text-rose-500 font-semibold">
                  {longestDurationRoute?.title || "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Stats;
