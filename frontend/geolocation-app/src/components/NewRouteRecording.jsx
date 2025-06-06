import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calculateDuration, haversineDistance } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import RecIcon from "../assets/rec-icon.png";
import useGeolocation from "../utils/useGeolocation";

const NewRouteRecording = ({ userInfo }) => {
  const [inputValue, setInputValue] = useState("");
  const [routeTitle, setRouteTitle] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [coords, setCoords] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);

  const position = useGeolocation();
  const navigate = useNavigate();

  const addNewRoute = async (
    title,
    coords,
    distance,
    startTime,
    endTime,
    duration,
    description,
    status
  ) => {
    try {
      const routeData = {
        title: title,
        coordinates: coords,
        distance: distance,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        description: description,
        status: status,
      };

      const response = await axiosInstance.post("/add-map-route", routeData);

      if (response.status === 200) {
        console.log("Route successfully saved:", response.data);
      } else {
        console.log("Failed to save route:", response.data);
      }
    } catch (error) {
      console.error("Error saving route:", error);
    }
  };

  useEffect(() => {
    if (isRecording && position) {
      setCoords((prevCoords) => [...prevCoords, [position.lat, position.lng]]);
    }
  }, [position, isRecording]);

  const startRoute = () => {
    setRouteTitle(inputValue);
    setStartTime(Date.now());
    setIsRecording(true);
    setCoords([]);
  };

  const stopRoute = async () => {
    setIsRecording(false);
    setEndTime(Date.now());
    setStatus(false);
  };

  const onClear = () => {
    setInputValue("");
    setRouteTitle("");
    setCoords([]);
    setStartTime(null);
    setEndTime(null);
  };

  useEffect(() => {
    if (endTime && coords.length > 1) {
      const totalLength = coords.reduce((acc, curr, index) => {
        if (index === 0) return acc;
        return acc + haversineDistance(coords[index - 1], curr);
      }, 0);
      const totalDistance = totalLength / 1000;
      const totalDuration = endTime - startTime;

      setDistance(totalDistance);
      setDuration(totalDuration);

      const addRoute = async () => {
        await addNewRoute(
          routeTitle,
          coords,
          totalDistance,
          startTime,
          endTime,
          totalDuration,
          description,
          status
        );

        console.log("Route added to base");
      };

      addRoute();
    }
  }, [routeTitle, startTime, endTime]);

  return (
    <div className="w-full md:w-5/6 h-full rounded-xl flex flex-col">
      <div className="h-1/3 relative bg-zinc-900 rounded-lg mb-4">
        <h1 className="text-3xl font-semibold ml-4 my-2 italic txt-color">
          Start new drive
        </h1>
        <p className="text-sm text-slate-200 text-left mx-4 mb-4">
          {!endTime
            ? "To start your loCCo drive press Start."
            : "Drive recording complete! Clear to record again."}
        </p>
        <div className=" mx-auto flex flex-col items-center">
          <input
            type="text"
            placeholder="Title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isRecording}
            className="input-box w-4/5 mx-auto"
          />
          {!isRecording ? (
            <button
              onClick={() => {
                startRoute();
              }}
              className="btn-primary transition-all ease-in-out disabled:text-slate-400 disabled:scale-100 w-4/5 mx-auto mb-4"
              disabled={!inputValue || endTime}
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => {
                stopRoute();
              }}
              className="text-gray-900 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:bg-gradient-to-l hover:from-rose-500 hover:via-rose-600 hover:to-rose-500 transition duration-150 ease-out hover:scale-105 hover:ease-in focus:ring-2 focus:outline-none focus:ring-rose-500  font-medium rounded-lg text-sm px-5 py-2 text-center mx-auto w-4/5 mb-4"
            >
              Stop
            </button>
          )}

          {isRecording && (
            <img
              src={RecIcon}
              alt="RecIcon"
              className="absolute top-0 right-0 w-12 animate-pulse"
            ></img>
          )}
        </div>
      </div>
      <div className="h-2/3 bg-zinc-900 rounded-xl">
        <ul className="text-slate-200 w-4/5 mt-4 mx-auto">
          <li className="input-box py-1 flex justify-between items-center">
            Title: {routeTitle}
            <span>
              <i class="fas fa-tag text-lg text-rose-500"></i>
            </span>
          </li>
          <li className="input-box py-1 flex justify-between items-center">
            Start: {startTime ? new Date(startTime).toLocaleString() : null}
            <span>
              <i class="fas fa-person-running text-lg text-rose-500"></i>
            </span>
          </li>

          <li className="input-box flex justify-between items-center">
            Stop: {endTime ? new Date(endTime).toLocaleString() : null}
            <span>
              <i class="fas fa-flag-checkered text-lg text-rose-500"></i>
            </span>
          </li>
          <li className="input-box py-1 flex justify-between items-center">
            Duration: {endTime ? calculateDuration(duration) : ""}
            <span>
              <i class="fas fa-clock text-lg text-rose-500"></i>
            </span>
          </li>
          <li className="input-box py-1 flex justify-between items-center">
            Distance: {endTime ? distance.toFixed(2) + " km" : ""}
            <span>
              <i class="fas fa-road text-lg text-rose-500"></i>
            </span>
          </li>
          <div className="mt-6">
            <button
              onClick={() =>
                navigate("/allroutespage", { state: { userInfo } })
              }
              className="btn-primary transition-all ease-in-out disabled:text-slate-400 disabled:scale-100 mb-4"
              disabled={!endTime}
            >
              More info...
            </button>
            <button
              onClick={onClear}
              disabled={!endTime}
              className="btn-secondary transition-all disabled:scale-100 disabled:text-slate-400 mb-4"
            >
              Clear
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NewRouteRecording;
