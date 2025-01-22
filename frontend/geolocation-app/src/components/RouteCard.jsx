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
  getAllRoutes,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [startAddress, setStartAddress] = useState("");
  const [middleAddress, setMiddleAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [error, setError] = useState("");

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
    const apiKey = "AIzaSyDoxLwouyKMFoNPRZLtW1S93LL_I2hFxCc"; // Replace with your Google API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    console.log(`Fetching address for coordinates: ${lat}, ${lng}`); // Log coordinates

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        return results[0].formatted_address;
      } else {
        console.warn(`No address found for ${lat}, ${lng}`); // Log warning if no address is found
        return "No address found";
      }
    } catch (err) {
      console.error("Error fetching address:", err); // Log error if request fails
      return "Error fetching address";
    }
  };

  // Automatically fetch addresses when the component mounts and coords change

  const fetchAddresses = async () => {
    if (coords && coords.length > 0) {
      try {
        const firstCoordinate = coords[0]; // First coordinate
        const middleCoordinate = coords[Math.floor(coords.length / 2)]; // Middle coordinate
        const lastCoordinate = coords[coords.length - 1]; // Last coordinate

        console.log("First Coordinate:", firstCoordinate);
        console.log("Middle Coordinate:", middleCoordinate);
        console.log("Last Coordinate:", lastCoordinate);

        // Fetch addresses for the first, middle, and last coordinates
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

        // Update state with the fetched addresses
        setStartAddress(firstAddress);
        setMiddleAddress(middleAddress);
        setEndAddress(endAddress);
        setError(""); // Reset error state
      } catch (err) {
        setError("Error fetching addresses");
      }
    }
  };

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
        onClick={() => {
          setShowModal(true);
          fetchAddresses();
        }}
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
              </div>
              <div className="flex">
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
