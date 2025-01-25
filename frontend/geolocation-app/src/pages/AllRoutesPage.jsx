import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapRoute from "../components/MapRoute";
import { MapContainer, TileLayer } from "react-leaflet";
import axiosInstance from "../utils/axiosInstance";
import AllRoutesPagination from "../components/AllRoutesPagination";
import Footer from "../components/Footer";

const AllRoutesPage = () => {
  const [allRoutes, setAllRoutes] = useState(null);
  const [allRoutesSaved, setAllRoutesSaved] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    getAllRoutes();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="flex gap-3 items-center">
        <button
          onClick={() => navigate("/home")}
          className="btn-secondary w-32 ml-[4%]"
        >
          Home
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
        <p className="text-slate-300 text-xs italic">
          Press Map Icon For More Info{" "}
          <span>
            <i class="fas fa-map text-green-300 text-sm"></i>
          </span>
        </p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="btn-primary md:absolute md:bottom-9 md:right-9 flex w-72 mx-auto mt-6 text-md items-center justify-center"
      >
        Show all recorded routes
      </button>
      <AllRoutesPagination allRoutes={allRoutes} getAllRoutes={getAllRoutes} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-transparent w-5/6 h-5/6 rounded-lg relative">
            <div className="w-full h-[95%] rounded-lg">
              <MapContainer
                center={[43.515904, 16.4593664]}
                zoom={13}
                className="h-full w-full rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {allRoutes?.map((route) => (
                  <MapRoute
                    key={route._id}
                    coordinates={route.coordinates}
                    title={route.title}
                  />
                ))}
              </MapContainer>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="btn-primary w-32 mt-4 absolute left-1/2 transform -translate-x-1/2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRoutesPage;
