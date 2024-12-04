import React from "react";
import { haversineDistance, calculateDuration } from "../utils/helper";
import Map from "./Map";

const RouteCard = ({ id, title, coords, startTime, endTime }) => {
  const totalLength =
    coords.reduce((acc, curr, index) => {
      if (index === 0) return acc;
      return acc + haversineDistance(coords[index - 1], curr);
    }, 0) / 1000;

  return (
    <div className="rounded p-4 bg-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h6 className="text-sm font-medium">{title}</h6>
            <h6 className="text-sm text-slate-500">Date:{}</h6>
            <h6 className="text-xs text-slate-500">#{id}</h6>
          </div>
          <span className="text-xs text-slate-500">
            Duration: {calculateDuration(startTime, endTime)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          Length: {totalLength.toFixed(3)} km
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
