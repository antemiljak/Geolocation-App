import React, { useState } from "react";
import { calculateDuration } from "../utils/helper";
import { MapContainer, TileLayer } from "react-leaflet";
import MapRoute from "../components/MapRoute";
import MapIcon from "../assets/map-icon.png";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const RouteCard = ({
  id,
  title,
  coords,
  distance,
  startTime,
  endTime,
  duration,
  description,
  status,
  getAllRoutes,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [workDescription, setWorkDescription] = useState("");
  const [coinfirmDescription, setCoinfirmDescription] = useState(false);
  const [startAddress, setStartAddress] = useState("");
  const [middleAddress, setMiddleAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [error, setError] = useState("");
  const rate = 0.6;

  const deleteRoute = async () => {
    try {
      const response = await axiosInstance.delete("/delete-map-route/" + id);

      if (response.data && !response.data.error) {
        getAllRoutes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.message) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  };

  const getAddress = async (lat, lng) => {
    const apiKey = "AIzaSyDoxLwouyKMFoNPRZLtW1S93LL_I2hFxCc";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        const formattedAddress = results[0].formatted_address;

        const addressParts = formattedAddress.split(",");
        const shortAddress = `${addressParts[0]}, ${addressParts[1].trim()}`;
        return shortAddress;
      } else {
        console.warn(`No address found for ${lat}, ${lng}`);
        return "No address found";
      }
    } catch (err) {
      console.error("Error fetching address:", err);
      return "Error fetching address";
    }
  };

  const fetchAddresses = async () => {
    if (coords && coords.length > 0) {
      try {
        const firstCoordinate = coords[0];
        const middleCoordinate = coords[Math.floor(coords.length / 2)];
        const lastCoordinate = coords[coords.length - 1];

        console.log("First Coordinate:", firstCoordinate);
        console.log("Middle Coordinate:", middleCoordinate);
        console.log("Last Coordinate:", lastCoordinate);

        const firstAddress = await getAddress(
          firstCoordinate[0],
          firstCoordinate[1]
        );
        const middleAddress = await getAddress(
          middleCoordinate[0],
          middleCoordinate[1]
        );
        const endAddress = await getAddress(
          lastCoordinate[0],
          lastCoordinate[1]
        );

        setStartAddress(firstAddress);
        setMiddleAddress(middleAddress);
        setEndAddress(endAddress);
        setError("");
      } catch (err) {
        setError("Error fetching addresses");
      }
    }
  };

  const formatedDate = new Date(startTime).toLocaleString();
  const avgSpeed = ((distance * 1000000) / (endTime - startTime)) * 3.6;

  const handleDescriptionUpdate = async () => {
    if (!workDescription) {
      setError("Description cannot be empty.");
      return;
    }

    try {
      const response = await axiosInstance.put("/update-route-description", {
        routeId: id,
        description: workDescription,
      });

      if (response.data && response.data.message) {
        setError("");
        getAllRoutes();
        console.log("updated route description" + workDescription + id);
      }
    } catch (error) {
      setError("Failed to update route description");
      console.error(error);
    }
  };

  return (
    <div className="rounded-xl p-4 bg-zinc-900 relative transition-shadow duration-300 shadow-none hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] mb-4 md:mb-0">
      <div className="flex items-center justify-between ">
        <h4 className="text-3xl font-bold txt-color">{title}</h4>
        <h6 className="text-xs text-slate-500">#{id.slice(0, 10)}</h6>
      </div>
      <div className="flex items-center justify-end gap-2 my-1">
        <p className="text-slate-500 text-sm">Date:</p>
        <p className="font-semibold">{formatedDate}</p>
      </div>
      <div className="md:flex gap-6">
        <ul className=" mt-2">
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Duration:</li>
            <li className="text-xl font-semibold text-rose-500">
              {calculateDuration(duration)}
            </li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Distance: </li>
            <li className="text-xl font-semibold text-rose-500">
              {distance.toFixed(2)} km
            </li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Avg Speed:</li>
            <li className="text-xl font-semibold text-rose-500">
              {avgSpeed.toFixed(1)} km/h
            </li>
          </div>
        </ul>
        <ul className="md:mt-2">
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Payment:</li>
            {status ? (
              <li className="text-xl font-semibold text-green-300">
                {(rate * distance).toFixed(2)}€
              </li>
            ) : (
              <li className="text-xl font-semibold text-rose-500">
                {(rate * distance).toFixed(2)}€
              </li>
            )}
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Status: </li>
            {status ? (
              <li className="text-xl font-semibold text-green-300">Payed</li>
            ) : (
              <li className="text-xl font-semibold text-rose-500">Pending</li>
            )}
          </div>
        </ul>
      </div>
      <button
        onClick={() => {
          setShowModal(true);
          fetchAddresses();
        }}
        className="absolute bottom-4 right-4 text-xs transition duration-150 ease-out hover:scale-125 hover:ease-in"
      >
        <img src={MapIcon} alt="MapIcon" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start md:items-center justify-center z-50 overflow-y-auto custom-scrollbar">
          <div className="bg-zinc-900 w-full h-2/3 md:w-5/6 md:h-5/6 rounded-lg md:flex">
            {/* Map Section */}
            <div className="md:w-2/3 h-full md:rounded-l-lg">
              <MapContainer
                center={coords[Math.round(coords.length / 3)]}
                zoom={14}
                className="h-full w-full md:rounded"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapRoute key={id} coordinates={coords} title={title} />
              </MapContainer>
            </div>

            <div className="md:w-1/3 p-4 md:p-6 flex flex-col md:justify-between">
              <h4 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 italic txt-color">
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
              <div className="md:mt-2 md:mt-12">
                <h2 className="text-lg font-bold txt-color mb-2">
                  Work descrition:
                </h2>
                {description ||
                window.location.pathname !== "/admindashboard" ? (
                  <p className="">{description}</p>
                ) : (
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="text"
                      placeholder="Work description"
                      className="input-box mb-0"
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                    ></input>
                    <button
                      className="btn-primary w-16"
                      onClick={() => {
                        handleDescriptionUpdate();
                        setCoinfirmDescription(true);
                      }}
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>
              <div className="md:mt-2 md:mt-12">
                <h2 className="text-lg font-bold txt-color">Route Details:</h2>
                <p className="text-slate-300">
                  From:{" "}
                  <span className="text-rose-500 md:text-lg font-semibold">
                    {startAddress}
                  </span>
                </p>
                <p className="text-slate-300">
                  Via:{" "}
                  <span className="text-rose-500 md:text-lg font-semibold">
                    {middleAddress}
                  </span>
                </p>
                <p className="text-slate-300">
                  To:{" "}
                  <span className="text-rose-500 md:text-lg font-semibold">
                    {endAddress}
                  </span>
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold txt-color">Payment:</h2>
                <p className="text-slate-300">
                  Rate:{" "}
                  <span className="text-rose-500 md:text-lg font-semibold">
                    {rate} €/km
                  </span>
                </p>
                <p className="text-slate-300">
                  Total:{" "}
                  <span className="text-rose-500 md:text-lg font-semibold">
                    {(rate * distance).toFixed(2)} €
                  </span>
                </p>
                <p className="text-slate-300">
                  Status:{" "}
                  <span className="text-rose-500 md:text-lg font-semibold">
                    To be paid
                  </span>
                </p>
              </div>

              <div className="flex pb-4">
                <button
                  className="btn-secondary mt-4 md:mt-0"
                  onClick={() => {
                    deleteRoute();
                    setShowModal(false);
                  }}
                >
                  Delete Route
                </button>
                <button
                  className="btn-primary mt-4 md:mt-0"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteCard;
