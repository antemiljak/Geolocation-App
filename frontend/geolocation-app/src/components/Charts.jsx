import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { options } from "../utils/helper";
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
  const [currentChartIndex, setCurrentChartIndex] = useState(0);

  const numOfCharts = 6;

  const handlePrev = () => {
    setCurrentChartIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : numOfCharts - 1
    );
  };

  const handleNext = () => {
    setCurrentChartIndex((prevIndex) =>
      prevIndex < numOfCharts - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClick = (index) => {
    setCurrentChartIndex(index);
  };

  const distance = {
    labels: allRoutes?.map((item) => item.title),
    datasets: [
      {
        label: "Distance of all routes in kilometers",
        data: allRoutes?.map((item) => item.distance),
        fill: false,
        borderColor: "rgb(244 63 94)",
        backgroundColor: "rgb(244 63 94)",
        tension: 0.2,
      },
    ],
  };

  const durationInTime = allRoutes?.map((item) => item.duration / (1000 * 60));

  const duration = {
    labels: allRoutes?.map((item) => item.title), // X-axis labels
    datasets: [
      {
        label: "Duration of all routes in minutes", // Dataset label
        data: durationInTime, // Values for each label
        backgroundColor: "rgb(244 63 94)",
        borderColor: "rgb(244 63 94)", // Bar color
      },
    ],
  };

  const avgSpeed = {
    labels: allRoutes?.map((item) => item.title), // X-axis labels
    datasets: [
      {
        label: "Avg Speed of all routes in km/h", // Dataset label
        data: allRoutes?.map(
          (item) => (item.distance * 1000 * 60 * 60) / item.duration
        ), // Values for each label

        backgroundColor: "rgb(244 63 94)",
        borderColor: "rgb(244 63 94)", // Bar color
      },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-8">
        <button onClick={handlePrev}>
          <i class="fas fa-chevron-left fa-lg"></i>
        </button>
        <div className="mb-8 bg-zinc-900 rounded-lg hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] transition duration-150 ease-out hover:scale-105 hover:ease-in w-full h-full p-2">
          {currentChartIndex === 0 && (
            <Line data={distance} options={options} />
          )}
          {currentChartIndex === 1 && <Bar data={distance} options={options} />}
          {currentChartIndex === 2 && (
            <Line data={duration} options={options} />
          )}
          {currentChartIndex === 3 && <Bar data={duration} options={options} />}
          {currentChartIndex === 4 && (
            <Line data={avgSpeed} options={options} />
          )}
          {currentChartIndex === 5 && <Bar data={avgSpeed} options={options} />}
        </div>
        <button onClick={handleNext}>
          <i class="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
      <div className=" mx-auto flex gap-4 items-center justify-center">
        {Array.from({ length: numOfCharts }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handleClick(i)} // Always use a unique key for list items in React
            className="bg-zinc-900 rounded-lg px-4 py-2 w-10 text-center hover:scale-125 transition-all ease-in-out duration-150"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Charts;
