import React, { useState } from "react";
import { calculateDuration } from "../utils/helper";
import { MapContainer, TileLayer } from "react-leaflet";
import MapRoute from "../components/MapRoute";
import MapIcon from "../assets/map-icon.png";

const RouteCard = ({
  id,
  title,
  coords,
  distance,
  startTime,
  endTime,
  duration,
}) => {
  const [showModal, setShowModal] = useState(false);
  const formatedDate = new Date(startTime).toLocaleString();
  const avgSpeed = ((distance * 1000000) / (endTime - startTime)) * 3.6;

  return (
    <div className="rounded p-4 bg-gray-700 relative">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-medium">{title}</h4>
        <h6 className="text-xs text-slate-500">#{id}</h6>
      </div>
      <ul className="text-sm text-slate-300">
        <li>Date: {formatedDate}</li>
        <li>Duration: {calculateDuration(duration)}</li>
        <li>Distance: {distance.toFixed(2)} km</li>
        <li>Average Speed: {avgSpeed.toFixed(1)} km/h</li>
      </ul>
      <button
        onClick={() => setShowModal(true)}
        className=" absolute bottom-4 right-4 text-xs"
      >
        <img src={MapIcon} alt="MapIcon" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 w-5/6 h-5/6 rounded-lg flex">
            {/* Map Section */}
            <div className="w-2/3 h-full bg-gray-900 rounded-l-lg">
              <MapContainer
                center={coords[Math.round(coords.length / 2)]}
                zoom={13}
                className="h-full w-full rounded"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapRoute key={id} coordinates={coords} title={title} />
              </MapContainer>
            </div>

            <div className="w-1/3 h-full p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-3xl font-bold mb-4">Route: {title}</h4>
                <ul className="text-md my-2">
                  <li>Date: {formatedDate}</li>
                  <li>Duration: {calculateDuration(duration)}</li>
                  <li>Distance: {distance.toFixed(2)} km</li>
                  <li>Average Speed: {avgSpeed.toFixed(1)} km/h</li>
                </ul>
              </div>
              <button
                className="btn-primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteCard;
