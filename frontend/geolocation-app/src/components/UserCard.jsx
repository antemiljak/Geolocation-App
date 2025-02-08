import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import RouteCard from "./RouteCard";
import { getInitials } from "../utils/helper";
import { filterRoutesByMonth } from "../utils/helper";

const UserCard = ({
  id,
  name,
  email,
  carPlate,
  reportPaidComission,
  reportUnpaidComission,
  selectedMonth,
}) => {
  const [allRoutes, setAllRoutes] = useState(null);
  const [unpaidRoutes, setUnpaidRoutes] = useState(null);
  const [totalPaidOut, setTotalPaidOut] = useState(0);
  const [totalPayDue, setTotalPayDue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const rate = 0.6;

  const getAllRoutes = async () => {
    try {
      const response = await axiosInstance.get(
        `/get-all-map-routes?userId=${id}`
      );

      if (response.data && response.data.mapRoute) {
        const filteredRoutes = filterRoutesByMonth(
          response.data.mapRoute,
          selectedMonth
        );

        setAllRoutes(filteredRoutes);

        const total = filteredRoutes
          .filter((route) => route.status === true)
          .reduce((acc, route) => acc + route.distance, 0);

        const totalDue = filteredRoutes
          .filter((route) => route.status === false)
          .reduce((acc, route) => acc + route.distance, 0);

        setUnpaidRoutes(
          filteredRoutes.filter((route) => route.status === false).length
        );
        setTotalPayDue(totalDue * rate);
        reportUnpaidComission(totalDue * rate);
        setTotalPaidOut(total * rate);
        reportPaidComission(total * rate); 
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  const updateRouteStatus = async (paidRoutes) => {
    try {
      await axiosInstance.put("/update-route-status", {
        routes: paidRoutes,
      });
      getAllRoutes();
    } catch (error) {
      console.error("Failed to update route status:", error);
    }
  };

  const handlePayment = (amount, paidRoutes) => {
    navigate("/paymentpage", { state: { amount, paidRoutes } });
  };

  useEffect(() => {
    getAllRoutes();
  }, [id, selectedMonth]);

  return (
    <div className="rounded-xl p-4 bg-zinc-800 transition-shadow duration-300 shadow-none hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] mb-4 md:m-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full text-green-300 text-2xl font-bold bg-zinc-900">
            {getInitials(name)}
          </div>
          <h4 className="text-2xl md:text-3xl font-bold txt-color">{name}</h4>
        </div>
        <h6 className="text-xs text-slate-500">#{id.slice(0, 10)}</h6>
      </div>
      <hr className="m-4 border-slate-300"></hr>
      <div>
        <ul className=" mt-2 md:flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Email:</li>
            <li className="text-xl font-semibold ">{email}</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Car licence plate: </li>
            <li className="text-xl font-semibold">{carPlate}</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Number of routes: </li>
            <li className="text-xl font-semibold">{allRoutes?.length}</li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">To be paid: </li>
            <li className="text-xl font-semibold text-rose-500">
              {unpaidRoutes}
            </li>
          </div>
          <div className="flex items-center gap-2">
            <li className="text-slate-300">Total comission: </li>
            <li className="text-xl font-semibold text-green-300">
              {totalPaidOut.toFixed(2)} €
            </li>
          </div>
        </ul>
      </div>
      <div>
        {allRoutes?.length > 0 ? (
          <div className="w-full h-[404px] overflow-y-auto custom-scrollbar scrollbar-thumb-rose-500 scrollbar-track-zinc-800">
            <div className="w-full md:grid md:grid-cols-3 gap-2 mt-2 mb-4 md:px-2">
              {[...(allRoutes || [])].reverse().map((item, index) => (
                <RouteCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  coords={item.coordinates}
                  distance={item.distance}
                  startTime={item.startTime}
                  endTime={item.endTime}
                  duration={item.duration}
                  status={item.status}
                  getAllRoutes={getAllRoutes}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-[404px] flex items-center justify-center">
            <h1 className="text-3xl font-bold mx-auto">No routes</h1>
          </div>
        )}
      </div>
      <hr className="m-4 border-slate-300"></hr>

      <div className="flex items-center justify-center gap-4">
        <h4 className="text-lg text-slate-300">Payment due:</h4>

        {totalPayDue ? (
          <div className="flex gap-4">
            <p className="text-3xl font-semibold text-rose-500">
              {totalPayDue.toFixed(2)}€
            </p>
            <button
              className="btn-primary w-32"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Pay out <i class="fas fa-money-bill"></i>
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <p className="text-3xl font-semibold text-green-300">
              {totalPayDue.toFixed(2)}€
            </p>
            <button className="btn-secondary w-32 cursor-default">
              Paid <i class="fas fa-check"></i>
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start md:items-center justify-center z-50 overflow-y-auto">
          <div className="bg-zinc-900 w-full md:w-5/6 rounded-lg ">
            <h1 className="mx-auto text-3xl txt-color font-bold p-4">
              Routes due:
            </h1>
            {allRoutes
              ?.filter((route) => route.status === false)
              .map((item, index) => (
                <div
                  key={item._id}
                  className="rounded-xl p-4 bg-zinc-800 mb-4 md:m-2 "
                >
                  <ul className=" mt-2 md:flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <li className="text-slate-300">Title:</li>
                      <li className="text-xl font-semibold text-rose-500">
                        {item.title}
                      </li>
                    </div>
                    <div className="flex items-center gap-2">
                      <li className="text-slate-300">Distance: </li>
                      <li className="text-xl font-semibold text-rose-500">
                        {item.distance.toFixed(2)} km
                      </li>
                    </div>
                    <div className="flex items-center gap-2">
                      <li className="text-slate-300">Price: </li>
                      <li className="text-xl font-semibold text-rose-500">
                        {(item.distance * rate).toFixed(2)}€
                      </li>
                    </div>

                    <button className="btn-primary w-32">
                      Pay now <i class="fas fa-money-bill"></i>
                    </button>
                  </ul>
                </div>
              ))}
            <div className="flex gap-4 mt-4 items-center justify-center my-4">
              <button
                className="btn-primary w-32"
                onClick={() => {
                  const paidRoutes = allRoutes.filter(
                    (route) => route.status === false
                  );
                  updateRouteStatus(paidRoutes.map((route) => route._id));
                  handlePayment(totalPayDue.toFixed(2));
                }}
              >
                Pay all <i class="fas fa-money-bill"></i>
              </button>
              <button
                className="btn-secondary w-32"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
