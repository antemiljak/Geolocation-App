import React, { useEffect, useState } from "react";
import RouteCard from "./RouteCard";

const AllRoutesPagination = ({ allRoutes, getAllRoutes }) => {
  const cardsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const reversedRoutes = [...(allRoutes || [])].reverse();
  console.log(reversedRoutes);
  const currentCards = reversedRoutes?.slice(startIndex, endIndex);

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
          <div className="w-full h-full md:grid md:grid-cols-3 gap-2 mb-6 ">
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
                status={item.status}
                getAllRoutes={getAllRoutes}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-medium">No routes</h1>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 text-sm md:mt-12 pb-8">
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
