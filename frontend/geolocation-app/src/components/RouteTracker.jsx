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

  const addNewRoute = async (title, coords) => {
    try {
      const routeData = {
        title: title,
        coordinates: coords,
        startTime: startTime,
        endTime: endTime,
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
    setStartTime(Date.now());
    setIsRecording(true);
    setCoords([]); // Reset coordinates

    // Watch position to track movement
    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords((coords) => [...coords, [latitude, longitude]]);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    setWatchId(id); // Store the watch ID for later clearing
  };

  const stopRoute = async () => {
    setIsRecording(false);
    setEndTime(Date.now());

    // Stop the geolocation watch
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    if (coords.length > 1) {
      await addNewRoute(routeTitle, coords, startTime, endTime);

      const totalLength = coords.reduce((acc, curr, index) => {
        if (index === 0) return acc;
        return acc + haversineDistance(coords[index - 1], curr);
      }, 0);

      setRouteLength(totalLength / 1000); // Convert to kilometers
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

  return (
    <div>
      <input
        type="text"
        placeholder="Route Title"
        value={routeTitle}
        onChange={(e) => setRouteTitle(e.target.value)}
        disabled={isRecording}
        className="w-4/5 text-sm bg-transparent border-[1.5px] border-green-300 px-3 py-2 mx-2 rounded-3xl outline-none"
      />
      {!isRecording ? (
        <button
          onClick={startRoute}
          className="btn-primary w-4/5 bg-green-300 m-2 hover:bg-green-400"
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
