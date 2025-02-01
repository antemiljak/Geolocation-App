import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import RouteCard from "./RouteCard";
import { getInitials } from "../utils/helper";

const UserCard = ({ id, name, email, carPlate }) => {
  const [allRoutes, setAllRoutes] = useState(null);

  const getAllRoutes = async () => {
    try {
      const response = await axiosInstance.get(
        `/get-all-map-routes?userId=${id}`
      );

      if (response.data && response.data.mapRoute) {
        setAllRoutes(response.data.mapRoute);
        console.log("Routes for ", name, ": ", response.data.mapRoute);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  useEffect(() => {
    getAllRoutes();
  }, [id]);

  return (
    <div className="rounded-xl p-4 bg-zinc-800 transition-shadow duration-300 shadow-none hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] mb-4 md:m-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full text-green-300 text-2xl font-bold bg-zinc-900">
            {getInitials(name)}
          </div>
          <h4 className="text-3xl font-bold txt-color">{name}</h4>
        </div>
        <h6 className="text-xs text-slate-500">#{id.slice(0, 10)}</h6>
      </div>
      <div>
        <ul className=" mt-2 md:flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Email:</li>
            <li className="text-xl font-semibold text-rose-500">{email}</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Car licence plate: </li>
            <li className="text-xl font-semibold text-rose-500">{carPlate}</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Number of routes: </li>
            <li className="text-xl font-semibold text-rose-500">
              {allRoutes?.length}
            </li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">To be paid: </li>
            <li className="text-xl font-semibold text-rose-500">1</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Total comision: </li>
            <li className="text-xl font-semibold text-green-300">0 €</li>
          </div>
        </ul>
      </div>
      <div>
        {allRoutes?.length > 0 ? (
          <div className="w-full h-full md:grid md:grid-cols-3 gap-4 mb-4 ">
            {allRoutes?.map((item, index) => (
              <RouteCard
                key={item._id}
                id={item._id}
                title={item.title}
                coords={item.coordinates}
                distance={item.distance}
                startTime={item.startTime}
                endTime={item.endTime}
                duration={item.duration}
                getAllRoutes={getAllRoutes}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium">No routes</h1>
        )}
      </div>
    </div>
  );
};

export default UserCard;
