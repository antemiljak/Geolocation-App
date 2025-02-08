import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapRoute from "../components/MapRoute";
import { MapContainer, TileLayer } from "react-leaflet";
import axiosInstance from "../utils/axiosInstance";
import AllRoutesPagination from "../components/AllRoutesPagination";
import Footer from "../components/Footer";
import MonthPicker from "../components/MonthPicker";
import { filterRoutesByMonth } from "../utils/helper";

const AllRoutesPage = () => {
  const [allRoutes, setAllRoutes] = useState(null);
  const [allRoutesSaved, setAllRoutesSaved] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo } = state;

  const getAllRoutes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-map-routes");

      if (response.data && response.data.mapRoute) {
        const filteredRoutes = filterRoutesByMonth(
          response.data.mapRoute,
          selectedMonth
        );
        setAllRoutes(filteredRoutes);
        setAllRoutesSaved(filteredRoutes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

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

        <p className="text-slate-300 text-xs italic">
          Press Map Icon For More Info{" "}
          <span>
            <i class="fas fa-map text-green-300 text-sm"></i>
          </span>
        </p>
      </div>
      <div className="flex justify-center md:block my-4 md:ml-[4%]">
        <MonthPicker
          onMonthChange={handleMonthChange}
          onAllTime={handleAllTimeClick}
        />
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="btn-primary flex w-72 ml-[4%] items-center justify-center"
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
      <Footer></Footer>
    </div>
  );
};

export default AllRoutesPage;
