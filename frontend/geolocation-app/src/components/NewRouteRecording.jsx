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

  const onClear = () => {
    setRouteData({
      routeTitle: "N/A",
      startTime: null,
      endTime: null,
      duration: "N/A",
      routeLength: "0.00",
    });
  };

  return (
    <div className="w-4/5 h-full rounded-lg flex flex-col">
      <div className="h-1/3 relative bg-gray-700 rounded-lg mb-2">
        <h1 className="text-3xl font-medium  ml-4 text-left">Record Route</h1>
        <p className="text-sm text-slate-200 text-left mx-4 my-2">
          {!routeData.endTime
            ? "To track movement on map add Title and press Start."
            : "Route recording complete! Clear to record again."}
        </p>
        <div className="w-full flex justify-center">
          <RouteTracker onRouteUpdate={handleRouteUpdate} />
        </div>
      </div>
      <div className="h-2/3 bg-gray-700 rounded-lg">
        <h1 className="text-xl font-medium ml-4 mt-4">Route Info</h1>
        <ul className="text-md text-slate-200 w-4/5 my-4 mx-auto">
          <li className="input-box">Route Title: {routeData.routeTitle}</li>
          <li className="input-box">
            Start:{" "}
            {routeData.startTime
              ? new Date(routeData.startTime).toLocaleString()
              : null}
          </li>

          <li className="input-box">
            Stop:{" "}
            {routeData.endTime
              ? new Date(routeData.endTime).toLocaleString()
              : null}
          </li>
          <li className="input-box">Route Duration: {routeData.duration}</li>
          <li className="input-box">
            Route Length: {routeData.routeLength} km
          </li>
          <div>
            <button
              className="btn-primary text-center bg-green-300 text-black rounded-full w-2/3  p-1 disabled:bg-green-100 disabled:text-slate-500"
              disabled={!routeData.endTime}
            >
              More info...
            </button>
            <button
              onClick={onClear}
              className="text-center rounded-full w-1/3  p-1"
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
