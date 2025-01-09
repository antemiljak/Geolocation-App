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
    <div className="rounded-xl p-4 bg-zinc-900 relative transition-shadow duration-300 shadow-none hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] mb-4 md:mb-0">
      <div className="flex items-center justify-between ">
        <h4 className="text-2xl font-medium">{title}</h4>
        <h6 className="text-xs text-slate-500">#{id.slice(0, 10)}</h6>
      </div>
      <div className="flex items-center justify-end gap-2">
        <p className="text-slate-500 text-sm">Date:</p>
        <p>{formatedDate}</p>
      </div>
      <ul className=" mt-2">
        <div className="flex items-center gap-2">
          <li className="text-slate-300">Duration:</li>
          <li className="text-xl text-rose-500">
            {calculateDuration(duration)}
          </li>
        </div>
        <div className="flex items-center gap-2">
          <li className="text-slate-300">Distance: </li>
          <li className="text-xl text-rose-500">{distance.toFixed(2)} km</li>
        </div>
        <div className="flex items-center gap-2">
          <li className="text-slate-300">Avg Speed:</li>
          <li className="text-xl text-rose-500">{avgSpeed.toFixed(1)} km/h</li>
        </div>
      </ul>
      <button
        onClick={() => setShowModal(true)}
        className="absolute bottom-4 right-4 text-xs transition duration-150 ease-out hover:scale-125 hover:ease-in"
      >
        <img src={MapIcon} alt="MapIcon" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start md:items-center justify-center z-50">
          <div className="bg-zinc-900 w-full h-3/5 md:w-5/6 md:h-5/6 rounded-lg md:flex">
            {/* Map Section */}
            <div className="md:w-2/3 h-full md:rounded-l-lg">
              <MapContainer
                center={coords[Math.round(coords.length / 2)]}
                zoom={13}
                className="h-full w-full md:rounded"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapRoute key={id} coordinates={coords} title={title} />
              </MapContainer>
            </div>

            <div className="md:w-1/3 h-full p-6 flex flex-col md:justify-between">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold mb-4 italic">
                  Title: {title}
                </h4>
                <ul className="md:my-2 text-slate-300">
                  <li>
                    Date:
                    <span className="text-rose-500 md:text-lg font-semibold">
                      {" "}
                      {formatedDate}
                    </span>
                  </li>
                  <li>
                    Duration:
                    <span className="text-rose-500 md:text-lg font-semibold">
                      {" "}
                      {calculateDuration(duration)}
                    </span>
                  </li>
                  <li>
                    Distance:
                    <span className="text-rose-500 md:text-lg font-semibold">
                      {" "}
                      {distance.toFixed(2)} km
                    </span>
                  </li>
                  <li>
                    Average Speed:
                    <span className="text-rose-500 md:text-lg font-semibold">
                      {" "}
                      {avgSpeed.toFixed(1)} km/h
                    </span>
                  </li>
                </ul>
                <div className="mt-6 md:mt-12">
                  <h1 className="text-lg font-bold">Route Details:</h1>
                  <p className="text-slate-300">
                    From:{" "}
                    <span className="text-rose-500 md:text-lg font-semibold">
                      Ulica Domovinskog Rata 10
                    </span>
                  </p>
                  <p className="text-slate-300">
                    Via:{" "}
                    <span className="text-rose-500 md:text-lg font-semibold">
                      Solinska Ulica 12
                    </span>
                  </p>
                  <p className="text-slate-300">
                    To:{" "}
                    <span className="text-rose-500 md:text-lg font-semibold">
                      Vukovarska 1
                    </span>
                  </p>
                </div>
              </div>
              <button
                className="btn-primary mt-4 md:mt-0"
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
