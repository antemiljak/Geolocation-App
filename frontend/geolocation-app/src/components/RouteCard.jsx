import React from "react";

const RouteCard = ({
  title,
  startTime,
  startStreet,
  endTime,
  endStreet,
  routeDuration,
  routeLength,
}) => {
  return (
    <div className="rounded p-4 bg-slate-900 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{/*title*/}Route Title</h6>
          <span className="text-xs text-slate-500">start Time, end Time</span>
        </div>
      </div>
      <p className="text-xs text-slate-600 mt-2">startStreet-----endStreet</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">duration and length</div>
      </div>
    </div>
  );
};

export default RouteCard;
