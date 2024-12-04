import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RouteCard from "../components/RouteCard";
import Navbar from "../components/Navbar";

const AllRoutesPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userInfo, allRoutes } = state;

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="ml-10 mt-2 text-lg">
        <h4
          onClick={() => navigate("/home")}
          className="cursor-pointer hover:text-green-300"
        >
          {`<-Back to Home`}
        </h4>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        {allRoutes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 m-9 w-full h-1/3">
            {allRoutes?.map((item, index) => (
              <RouteCard
                key={item._id}
                id={item._id}
                title={item.title}
                coords={item.coordinates}
                startTime={item.startTime}
                endTime={item.endTime}
              />
            ))}
          </div>
        ) : (
          <h1>No routes</h1>
        )}
      </div>
    </div>
  );
};

export default AllRoutesPage;
