import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { filterRoutesByMonth, calculateDuration } from "../utils/helper";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MonthlyList = ({ selectedMonth }) => {
  const [allRoutes, setAllRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(selectedMonth);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    if (isOpen) fetchRoutes();
    console.log(selectedMonth);
  }, [selectedMonth, isOpen]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-company-routes");
      if (response.data && response.data.mapRoutes) {
        const filteredRoutes = filterRoutesByMonth(
          response.data.mapRoutes,
          selectedMonth
        );
        setAllRoutes(filteredRoutes);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
    setLoading(false);
  };

  const calculateTotalCost = () => {
    return allRoutes
      .reduce((total, route) => total + route.distance * 0.6, 0)
      .toFixed(2);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Monthly Routes Report - ${formattedDatem || "All"}`, 10, 10);

    const tableColumn = [
      "EmployeeId",
      "Route",
      "Distance",
      "Time",
      "Price",
      "Work description",
    ];
    const tableRows = allRoutes.map((route) => [
      route.userId,
      route.title,
      `${route.distance} km`,
      `${calculateDuration(route.duration)}`,
      `${(route.distance * 0.6).toFixed(2)} €`,
      `${route.description}`,
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });

    doc.text(
      `Total Cost: ${calculateTotalCost()} €`,
      10,
      doc.autoTable.previous.finalY + 10
    );
    doc.save(`MonthlyRoutes_${selectedMonth || "All"}.pdf`);
  };

  return (
    <div className="mx-2">
      <button className="btn-primary w-48" onClick={() => setIsOpen(true)}>
        View Monthly List
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg w-3/4">
            <h2 className="text-3xl txt-color font-bold mb-4">
              Monthly Routes: {formattedDate}
            </h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="w-full border-collapse border rounded">
                  <thead>
                    <tr className="bg-zinc-900">
                      <th className="border p-2">UserId</th>
                      <th className="border p-2">Title</th>
                      <th className="border p-2">Distance</th>
                      <th className="border p-2">Time</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Work description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRoutes.map((route, index) => (
                      <tr key={index} className="border">
                        <td className="border p-2">
                          #{route.userId.slice(0, 10)}
                        </td>
                        <td className="border p-2">{route.title}</td>
                        <td className="border p-2">
                          {route.distance.toFixed(2)} km
                        </td>
                        <td className="border p-2">
                          {calculateDuration(route.duration)}{" "}
                        </td>
                        <td className="border p-2">
                          {(route.distance * 0.6).toFixed(2)} €
                        </td>
                        <td className="border p-2">{route.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="font-bold mt-4">
                  Total Cost: {calculateTotalCost()} €
                </p>
              </>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="btn-secondary mx-4"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button className="btn-primary mx-4" onClick={downloadPDF}>
                Download PDF report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyList;
