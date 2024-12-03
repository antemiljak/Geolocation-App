import React, { useState, useEffect } from "react";
import { haversineDistance } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const RouteTracker = ({ onRouteUpdate }) => {
  const [routeTitle, setRouteTitle] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [routeLength, setRouteLength] = useState(0);
  const [coords, setCoords] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [watchId, setWatchId] = useState(null); // Track geolocation watcher ID

  const addNewRoute = async (title, coords, startTime, endTime) => {
    try {
      const routeData = {
        title: title,
        coordinates: coords,
        startTime: startTime,
        endTime: endTime,
      };
      console.log("Sending route data:", routeData); // Log data being sent
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
    console.log(coords);
    // Stop the geolocation watch
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const durationMs = endTime - startTime;
      const seconds = Math.floor((durationMs / 1000) % 60);
      const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
      const hours = Math.floor(durationMs / (1000 * 60 * 60));

      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return "N/A";
  };

  // Trigger updates for parent component.
  useEffect(() => {
    onRouteUpdate({
      routeTitle,
      startTime,
      endTime,
      duration: calculateDuration(),
      routeLength: routeLength.toFixed(2),
    });
  }, [routeTitle, startTime, endTime, routeLength]);

  useEffect(() => {
    if (endTime && coords.length > 1) {
      const totalLength = coords.reduce((acc, curr, index) => {
        if (index === 0) return acc;
        return acc + haversineDistance(coords[index - 1], curr);
      }, 0);
      console.log(totalLength);
      setRouteLength(totalLength / 1000); // Convert to kilometers

      const addRoute = async () => {
        await addNewRoute(routeTitle, coords, startTime, endTime);
        console.log("Route added to base");
      };

      addRoute(); // Call the function to save the route
    }
  }, [endTime]);

  return (
    <div>
      <input
        type="text"
        placeholder="Route Title"
        value={routeTitle}
        onChange={(e) => setRouteTitle(e.target.value)}
        disabled={isRecording}
        className="w-full text-sm bg-transparent border-[1.5px] border-green-300 px-3 py-2 rounded-3xl outline-none"
      />
      {!isRecording ? (
        <button
          onClick={startRoute}
          className="btn-primary mx-0 bg-green-300 m-2 hover:bg-green-400"
        >
          Start
        </button>
      ) : (
        <button
          onClick={stopRoute}
          className="btn-primary w-4/5 bg-green-500 m-2 hover:bg-green-600"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default RouteTracker;
