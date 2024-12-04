import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RouteCard from "../components/RouteCard";
import Navbar from "../components/Navbar";
import MapRoute from "../components/MapRoute";
import { MapContainer, TileLayer } from "react-leaflet";

const AllRoutesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo, allRoutes } = state;

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="ml-10 mt-2 text-lg">
        <h4
          onClick={() => navigate("/home")}
          className="cursor-pointer hover:text-green-300"
        >
          {`<-Back to Home`}
        </h4>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        {allRoutes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 m-9 w-full h-1/3">
            {allRoutes?.map((item, index) => (
              <RouteCard
                key={item._id}
                id={item._id}
                title={item.title}
                coords={item.coordinates}
                startTime={item.startTime}
                endTime={item.endTime}
              />
            ))}
          </div>
        ) : (
          <h1>No routes</h1>
        )}
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="btn-primary absolute bottom-5 right-9 flex w-72 text-lg items-center justify-center rounded-full"
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
