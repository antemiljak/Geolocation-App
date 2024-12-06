import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import {
  getInitials,
  haversineDistance,
  calculateDuration,
} from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Stats = () => {
  const [allRoutes, setAllRoutes] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo } = state;

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

  return (
    <div className="bg-black">
      <Navbar userInfo={userInfo} />
      <button
        onClick={() => navigate("/home")}
        className="btn-secondary w-32 ml-[4%]"
      >
        Home
      </button>

      <div className="bg-gray-700 rounded-lg my-6 p-6 max-w-[75%] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Profile Info</h2>

          <select className="btn-primary w-32 ">
            <option>This Year</option>
            <option>This Month</option>
            <option>This Week</option>
          </select>
        </div>
        <div className=" mt-6">
          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-2xl font-bold text-green-300">
              {" "}
              {getInitials(userInfo?.name)}
            </div>
            <div className="flex w-full justify-between">
              <div>
                <h3 className="text-xl font-bold">{userInfo.name}</h3>
                <h3 className="text-xs text-slate-300">#{userInfo._id}</h3>
              </div>
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
              <div>
                <p className="text-sm text-slate-300">Email:</p>
                <p className="text-xl font-bold">{userInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 flex-1 ">
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-flag-checkered fa-2xl"></i>
              <div>
                <p className="text-sm">Number of Routes</p>
                <h4 className="text-2xl font-semibold">{allRoutes?.length}</h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-stopwatch fa-2xl"></i>
              <div>
                <p className="text-sm">Avg Route Duration</p>
                <h4 className="text-2xl font-semibold">
                  {calculateDuration(calcDuration / allRoutes?.length)}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-line-chart fa-2xl"></i>
              <div>
                <p className="text-sm">Avg Route Length</p>
                <h4 className="text-2xl font-semibold">
                  {(calcDistance / allRoutes?.length).toFixed(2)} km
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-gauge-high fa-2xl"></i>
              <div>
                <p className="text-sm">Avg Route Speed</p>
                <h4 className="text-2xl font-semibold">{avgSpeed} km/h</h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-road fa-2xl"></i>
              <div>
                <p className="text-sm">Total Distance Covered</p>
                <h4 className="text-2xl font-semibold">{calcDistance} km</h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-clock fa-2xl"></i>
              <div>
                <p className="text-sm">Total Time Recorded</p>
                <h4 className="text-2xl font-semibold">
                  {calculateDuration(calcDuration)}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-medal fa-2xl"></i>
              <div>
                <p className="text-sm">{`Longest Route (distance)`}</p>
                <h4 className="text-2xl font-semibold">
                  {longestDistanceRoute?.title || "N/A"}
                </h4>
              </div>
            </div>
            <div className="flex items-center  gap-4 bg-gray-900 p-4 rounded-lg shadow-lg transition duration-150 ease-out hover:scale-105 hover:ease-in">
              <i class="fas fa-person-running fa-2xl"></i>
              <div>
                <p className="text-sm">{`Longest Route (time)`}</p>
                <h4 className="text-2xl font-semibold">
                  {longestDurationRoute?.title || "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold my-6 text-center">Charts</h2>
      <div className="rounded-lg p-6 w-[75%] mx-auto mb-16">
        <Charts allRoutes={allRoutes} />
      </div>
    </div>
  );
};

export default Stats;
