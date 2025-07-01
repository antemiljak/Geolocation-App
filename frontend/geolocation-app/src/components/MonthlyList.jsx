import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { filterRoutesByMonth, calculateDuration } from "../utils/helper";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MonthlyList = ({ selectedMonth, userInfo }) => {
  const [allRoutes, setAllRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Format selected month if not "All Time", otherwise leave it as "All Time"
  const formattedDate =
    selectedMonth && selectedMonth !== "All Time"
      ? new Date(selectedMonth).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
      : "All Time";

  useEffect(() => {
    if (selectedMonth && isOpen) fetchRoutes();
  }, [selectedMonth, isOpen]);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/get-all-company-routes");
      if (response.data && response.data.mapRoutes) {
        const filteredRoutes =
          selectedMonth !== "All Time"
            ? filterRoutesByMonth(response.data.mapRoutes, selectedMonth)
            : response.data.mapRoutes; // Don't filter if "All Time"
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

    const companyName = userInfo.company;
    const adminName = userInfo.name;
    const creationDate = new Date().toLocaleDateString();

    doc.setFontSize(14);
    doc.text(companyName, 10, 10);

    doc.setFontSize(12);
    doc.text(`Admin: ${adminName}`, 10, 20);
    doc.text(`Date: ${creationDate}`, 10, 30);

    doc.setFontSize(16);
    doc.text(`Monthly Routes Report - ${formattedDate}`, 10, 40);

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
      `${route.distance.toFixed(2)} km`,
      `${calculateDuration(route.duration)}`,
      `${(route.distance * 0.6).toFixed(2)} €`,
      `${route.description}`,
    ]);

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 50 });

    doc.text(
      `Total Cost: ${calculateTotalCost()} €`,
      10,
      doc.autoTable.previous.finalY + 10
    );

    doc.text(
      "Approved by: ______________________",
      10,
      doc.autoTable.previous.finalY + 30
    );

    doc.save(`MonthlyRoutes_${formattedDate || "All"}.pdf`);
  };

  return (
    <div className="mx-2 flex justify-center items-center gap-2">
      <p className="text-lg">Select month to generate report.</p>
      <button
        className={`btn-primary w-48 ${
          !selectedMonth || selectedMonth === "All Time"
            ? "text-gray-400 cursor-not-allowed"
            : ""
        }`}
        onClick={() => setIsOpen(true)}
        disabled={!selectedMonth || selectedMonth === "All Time"}
      >
        Generate report
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
