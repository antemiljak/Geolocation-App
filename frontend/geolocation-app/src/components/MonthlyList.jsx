import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { filterRoutesByMonth } from "../utils/helper";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MonthlyList = ({ selectedMonth }) => {
  const [allRoutes, setAllRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) fetchRoutes();
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
    doc.text(`Monthly Routes Report - ${selectedMonth || "All"}`, 10, 10);

    const tableColumn = ["UserId", "Route", "Distance", "Time", "Price"];
    const tableRows = allRoutes.map((route) => [
      route.userId,
      route.title, // ✅ Corrected from `route.name` to `route.title`
      `${route.distance} km`,
      `${route.duration} min`,
      `${(route.distance * 0.6).toFixed(2)} €`,
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
    <div>
      {/* ✅ Button to open modal */}
      <button className="btn-primary" onClick={() => setIsOpen(true)}>
        View Monthly List
      </button>

      {/* ✅ Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
            <h2 className="text-2xl font-bold mb-4">
              Monthly Routes - {selectedMonth || "All"}
            </h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <table className="w-full border-collapse border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">UserId</th>
                      <th className="border p-2">Route</th>
                      <th className="border p-2">Distance</th>
                      <th className="border p-2">Time</th>
                      <th className="border p-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRoutes.map((route, index) => (
                      <tr key={index} className="border">
                        <td className="border p-2">{route.userId}</td>
                        <td className="border p-2">{route.title}</td>
                        <td className="border p-2">{route.distance} km</td>
                        <td className="border p-2">{route.duration} min</td>
                        <td className="border p-2">
                          {(route.distance * 0.6).toFixed(2)} €
                        </td>
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
                className="btn-secondary mr-2"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button className="btn-primary" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyList;
