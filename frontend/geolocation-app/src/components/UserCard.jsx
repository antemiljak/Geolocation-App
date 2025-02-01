import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

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
    <div className="rounded-xl p-4 bg-zinc-900 transition-shadow duration-300 shadow-none hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] mb-4 md:m-2">
      <div className="flex items-center justify-between">
        <h4 className="text-3xl font-bold txt-color">{name}</h4>
        <h6 className="text-xs text-slate-500">#{id.slice(0, 10)}</h6>
      </div>
      <div>
        <ul className=" mt-2">
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Email:</li>
            <li className="text-xl font-semibold text-rose-500">{email}</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">carPlate: </li>
            <li className="text-xl font-semibold text-rose-500">{carPlate}</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
