import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ allRoutes }) => {
  const options = {
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            family: "Roboto Slab",
            size: 16, // Change the font size of X-axis labels
          }, // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            family: "Roboto Slab",
            size: 16, // Change the font size of X-axis labels
          },
        },
      },
    },
    plugins: {
      tooltip: {
        titleColor: "white", // Tooltip title color
        bodyColor: "white", // Tooltip body color
      },
      legend: {
        labels: {
          color: "white",
          font: {
            family: "Roboto Slab",
            size: 20, // Change the font size of X-axis labels
          }, // Legend text color
        },
      },
    },
  };
  const distance = {
    labels: allRoutes?.map((item) => item.title),
    datasets: [
      {
        label: "Distance of all routes visualized",
        data: allRoutes?.map((item) => item.distance),
        fill: false,
        borderColor: "rgb(134 239 172)",
        tension: 0.2,
      },
    ],
  };

  const duration = {
    labels: allRoutes?.map((item) => item.title), // X-axis labels
    datasets: [
      {
        label: "Duration of all routes", // Dataset label
        data: allRoutes?.map((item) => item.duration), // Values for each label
        backgroundColor: "rgb(134 239 172)", // Bar color
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-8 bg-gray-700">
        <Line data={distance} options={options} />
      </div>
      <div className="mb-8 bg-gray-700">
        <Bar data={duration} options={options} />
      </div>
    </div>
  );
};

export default Charts;
