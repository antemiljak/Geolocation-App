import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RouteCard from "../components/RouteCard";
import Navbar from "../components/Navbar";
import MapRoute from "../components/MapRoute";
import { MapContainer, TileLayer } from "react-leaflet";
import axiosInstance from "../utils/axiosInstance";

const AllRoutesPage = () => {
  const [allRoutes, setAllRoutes] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    getAllRoutes();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <p
        onClick={() => navigate("/home")}
        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32 ml-[4%]"
      >
        Home
      </p>
      <div className="flex items-center justify-center gap-x-3">
        {allRoutes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 m-9 w-[85%] h-1/3">
            {allRoutes?.map((item, index) => (
              <RouteCard
                key={item._id}
                id={item._id}
                title={item.title}
                coords={item.coordinates}
                distance={item.distance}
                startTime={item.startTime}
                endTime={item.endTime}
                duration={item.duration}
              />
            ))}
          </div>
        ) : (
          <h1>No routes</h1>
        )}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="btn-primary absolute bottom-5 right-9 flex w-72 text-lg items-center justify-center"
      >
        Show all recorded routes
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-transparent w-5/6 h-5/6 rounded-lg relative">
            <div className="w-full h-full rounded-lg">
              <MapContainer
                center={[43, 16]}
                zoom={10}
                className="h-full w-full rounded"
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
              className="btn-primary w-72 mt-2 absolute left-1/2 transform -translate-x-1/2"
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
