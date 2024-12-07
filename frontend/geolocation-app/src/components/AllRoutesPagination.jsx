import React, { useEffect, useState } from "react";
import RouteCard from "./RouteCard";

const AllRoutesPagination = ({ allRoutes }) => {
  const cardsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = allRoutes?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allRoutes?.length / cardsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {" "}
      <div className="flex items-center justify-center max-w-[95%] p-6 mx-auto">
        {allRoutes?.length > 0 ? (
          <div className="w-full h-full grid grid-cols-3 gap-6  ">
            {currentCards?.map((item, index) => (
              <RouteCard
                key={item._id}
                id={item._id}
                title={item.title}
                coords={item.coordinates}
                distance={item.distance}
                startTime={item.startTime}
                endTime={item.endTime}
                duration={item.duration}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium">No routes</h1>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 text-sm mt-12">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="btn-secondary w-24 disabled:scale-100 disabled:text-slate-400 disabled:border-slate-400 transition-all duration-300"
        >
          {`< BACK`}
        </button>
        {currentPage !== 1 && <span className="">{currentPage - 1}</span>}
        <span className=" text-md border rounded-lg px-4 py-2">
          {currentPage}
        </span>

        {currentPage !== totalPages && <span>{currentPage + 1}</span>}
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="btn-secondary w-24 disabled:scale-100 disabled:text-slate-400 disabled:border-slate-400 transition-all duration-300"
        >
          {` NEXT >`}
        </button>
      </div>
    </div>
  );
};

export default AllRoutesPagination;