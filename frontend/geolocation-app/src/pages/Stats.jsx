import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";
import { filterRoutesByMonth, calculateDuration } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import Footer from "../components/Footer";
import MonthPicker from "../components/MonthPicker";

const Stats = () => {
  const [allRoutes, setAllRoutes] = useState(null);
  const [allRoutesSaved, setAllRoutesSaved] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo } = state;
  const rate = 0.6;
  console.log(userInfo);

  const getAllRoutes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-map-routes");

      const filteredRoutes = filterRoutesByMonth(
        response.data.mapRoute,
        selectedMonth
      );
      setAllRoutes(filteredRoutes);
      setAllRoutesSaved(filteredRoutes);
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

  const calcPayedRoutes = allRoutes?.length
    ? allRoutes
        .filter((route) => route.status === true)
        .reduce((sum, route) => sum + route.distance * rate, 0)
    : 0;

  const calcUnpayedRoutes = allRoutes?.length
    ? allRoutes
        .filter((route) => route.status === false)
        .reduce((sum, route) => sum + route.distance * rate, 0)
    : 0;

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleAllTimeClick = () => {
    setSelectedMonth(null);
  };

  useEffect(() => {
    getAllRoutes();

    return () => {};
  }, [selectedMonth]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <section className="h-screen-min bg-[url('assets/bg-landingpage-mobile.jpg')] md:bg-[url('assets/bg-landingpage.jpg')] bg-cover bg-center">
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
        </div>

        <div className="flex justify-center my-4 md:block md:ml-[4%]">
          <MonthPicker
            onMonthChange={handleMonthChange}
            onAllTime={handleAllTimeClick}
          />
        </div>

        <div className="md:flex items-center justify-center gap-12 mb-10">
          <div className="flex-[0.4] mx-4 md:mx-0 md:ml-[4%]">
            <h2 className="text-5xl txt-color font-bold mb-4 italic">CHARTS</h2>
            <div className="md:bg-zinc-900 md:p-6 rounded-xl">
              <p className="txt-color text-lg">
                Welcome to{" "}
                <span className="font-bold text-green-300">GeoLocc </span> app
                chart section, take a look at your stats, routes, profile info
                and more. Data is visulaized using js library Charts.js. To take
                a look at drawn routes on map go to All routes section.
              </p>
            </div>
          </div>
          <div className="flex-[0.8] p-4 md:mr-[4%] mt-4 md:mt-0 mb-8">
            <Charts allRoutes={allRoutes} />
          </div>
        </div>
      </section>
      <div
        id="profile-section"
        className="bg-zinc-900 rounded-xl mt-6 mb-8 p-6 max-w-[90%] md:max-w-[75%] mx-auto "
      >
        <h2 className="text-3xl md:text-5xl font-bold italic txt-color">
          PROFILE INFO
        </h2>

        <div className=" mt-6 ">
          <div className="flex items-center gap-4 mb-6">
            <div className="md:flex w-full md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <i class="fas fa-user fa-lg md:fa-2xl"></i>
                  <h3 className="text-xl font-bold">{userInfo.name}</h3>
                </div>
                <h3 className="text-xs text-slate-300">#{userInfo._id}</h3>
              </div>
              <div className="md:flex gap-12">
                <div>
                  <p className="text-sm text-slate-300">Age:</p>
                  <p className="text-xl font-bold">{userInfo.age}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Company:</p>
                  <p className="text-xl font-bold">{userInfo.company}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Licence plate:</p>
                  <p className="text-xl font-bold">{userInfo.carPlate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-300">Email:</p>
                <p className="text-xl font-bold">{userInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="flex  justify-between md:justify-center mb-6 mr-8 md:mr-0 md:gap-12">
            <div className="md:flex gap-12">
              <div>
                <p className="text-sm text-slate-300">Rate:</p>
                <p className="text-xl font-bold">0,60 €/km</p>
              </div>
              <div>
                <p className="text-sm text-slate-300">To be paid:</p>
                <p className="text-xl font-bold text-rose-500">
                  {calcUnpayedRoutes.toFixed(2)}€
                </p>
              </div>
            </div>
            <div className="md:flex gap-12">
              <div>
                <p className="text-sm text-slate-300">Paid out:</p>
                <p className="text-xl font-bold text-green-300">
                  {calcPayedRoutes.toFixed(2)}€
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-300">Total:</p>
                <p className="text-xl font-bold">
                  {(calcPayedRoutes + calcUnpayedRoutes).toFixed(2)}€
                </p>
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
