import React from "react";
import RouteCard from "./RouteCard";

const PastRoutes = () => {
  return (
    <div className="w-4/5 h-2/3 bg-gray-700 rounded-lg shadow-green-200 shadow-md items-center justify-center">
      <h1 className="text-xl font-medium my-3 ml-4">Past Routes</h1>
      <div className="flex items-center justify-center gap-x-3">
        <RouteCard />
        <RouteCard />
        <RouteCard />
      </div>
    </div>
  );
};

export default PastRoutes;
