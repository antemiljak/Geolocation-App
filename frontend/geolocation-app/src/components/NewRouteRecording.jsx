import React, { useState } from "react";
import RouteTracker from "../components/RouteTracker";

const NewRouteRecording = () => {
  const [routeData, setRouteData] = useState({
    routeTitle: "N/A",
    startTime: null,
    endTime: null,
    duration: "N/A",
    routeLength: "0.00",
  });

  const handleRouteUpdate = (data) => {
    setRouteData(data);
  };

  return (
    <div className="w-4/5 h-1/3 rounded-lg flex gap-3">
      <div className="flex-1 relative bg-gray-700 rounded-lg shadow-green-200 shadow-md">
        <h1 className="text-3xl font-medium my-3 ml-4 text-left">New Route</h1>
        <p className="text-sm text-slate-200 text-left mx-4 mb-2">
          {!routeData.endTime
            ? "To track movement on map press Start."
            : "Route recording complete!"}
        </p>
        <RouteTracker onRouteUpdate={handleRouteUpdate} />
      </div>
      <div className="flex-1 bg-gray-700	rounded-lg shadow-green-200 shadow-md">
        <h1 className="text-xl font-medium my-3 ml-4">Recording Route</h1>
        <ul className="text-sm text-slate-200 my-2 ml-3">
          <li>Route Title: {routeData.routeTitle}</li>
          <li>
            Start:{" "}
            {routeData.startTime
              ? new Date(routeData.startTime).toLocaleString()
              : "N/A"}
          </li>

          <li>
            Stop:{" "}
            {routeData.endTime
              ? new Date(routeData.endTime).toLocaleString()
              : "N/A"}
          </li>
          <li>Route Duration: {routeData.duration}</li>
          <li>Route Length: {routeData.routeLength} km</li>
        </ul>
      </div>
    </div>
  );
};

export default NewRouteRecording;
