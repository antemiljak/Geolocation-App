import React, { useState, useEffect } from "react";
import { calculateDuration, haversineDistance } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import RecIcon from "../assets/rec-icon.png";

const RouteTracker = ({ onRouteUpdate }) => {
  const [inputValue, setInputValue] = useState("");
  const [routeTitle, setRouteTitle] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [coords, setCoords] = useState([]);
  const [watchId, setWatchId] = useState(null); // Track geolocation watcher ID
  const [isRecording, setIsRecording] = useState(false);

  const addNewRoute = async (
    title,
    coords,
    distance,
    startTime,
    endTime,
    duration
  ) => {
    try {
      const routeData = {
        title: title,
        coordinates: coords,
        distance: distance,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
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

  const startRoute = () => {
    setRouteTitle(inputValue);
    setStartTime(Date.now());
    setIsRecording(true);
    setCoords([]); // Reset coordinates

    // Watch position to track movement
    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position.coords);
        setCoords((prevCoords) => [...prevCoords, [latitude, longitude]]);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );

    setWatchId(id); // Store the watch ID for later clearing
  };

  const stopRoute = async () => {
    setIsRecording(false);
    setEndTime(Date.now());
    setInputValue("");

    // Stop the geolocation watch
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };

  useEffect(() => {
    if (endTime && coords.length > 1) {
      const totalLength = coords.reduce((acc, curr, index) => {
        if (index === 0) return acc;
        return acc + haversineDistance(coords[index - 1], curr);
      }, 0);
      const totalDistance = totalLength / 1000; // Calculate distance in km

      //const calcDuration = calculateDuration(startTime, endTime);
      const calcDuration = endTime - startTime;

      const addRoute = async () => {
        await addNewRoute(
          routeTitle,
          coords,
          totalDistance,
          startTime,
          endTime,
          calcDuration
        );
        console.log("Route added to base");
      };

      addRoute(); // Call the function to save the route

      onRouteUpdate({
        routeTitle,
        startTime,
        endTime,
        duration: calculateDuration(calcDuration),
        distance: totalDistance.toFixed(2),
      });
    }
  }, [routeTitle, startTime, endTime]);

  return (
    <div>
      <input
        type="text"
        placeholder="Route Title"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isRecording}
        className="w-full text-sm bg-transparent border-[1.5px] border-green-300 px-3 py-2 rounded-3xl outline-none"
      />
      {!isRecording ? (
        <button
          onClick={() => {
            startRoute();
          }}
          className="btn-primary mx-0 bg-green-300 m-2 hover:bg-green-400 disabled:bg-green-100 disabled:text-slate-500"
          disabled={!inputValue || endTime}
        >
          Start
        </button>
      ) : (
        <button
          onClick={stopRoute}
          className="btn-primary mx-0 bg-green-500 m-2 hover:bg-green-600"
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
  );
};

export default RouteTracker;
