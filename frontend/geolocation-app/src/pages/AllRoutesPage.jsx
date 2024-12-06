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
      <button
        onClick={() => navigate("/home")}
        className="btn-secondary w-32 ml-[4%]"
      >
        Home
      </button>
      <div className="flex items-center justify-center max-w-[95%] p-6 mx-auto">
        {allRoutes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-6  h-1/3 w-full">
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
          <h1 className="text-xl font-medium">No routes</h1>
        )}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="btn-primary absolute bottom-9 right-9 flex w-72 text-md items-center justify-center"
      >
        Show all recorded routes
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-transparent w-5/6 h-5/6 rounded-lg relative">
            <div className="w-full h-[95%] rounded-lg">
              <MapContainer
                center={[43, 16]}
                zoom={10}
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
