import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { options } from "../../utils/helper";
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

  const handlePrev = () => {
    setCurrentChartIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : 4 - 1
    );
  };

  const handleNext = () => {
    setCurrentChartIndex((prevIndex) =>
      prevIndex < 4 - 1 ? prevIndex + 1 : 0
    );
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

  return (
    <div>
      <div className="flex items-center justify-between gap-8">
        <button onClick={handlePrev}>
          <i class="fas fa-chevron-left fa-lg"></i>
        </button>
        <div className="mb-8 bg-gray-700 rounded-lg hover:shadow-[0px_0px_3px_3px_rgba(107,114,128,0.8)] transition duration-150 ease-out hover:scale-105 hover:ease-in w-full h-full">
          {currentChartIndex === 0 && (
            <Line data={distance} options={options} />
          )}
          {currentChartIndex === 3 && <Bar data={distance} options={options} />}
          {currentChartIndex === 2 && (
            <Line data={duration} options={options} />
          )}
          {currentChartIndex === 1 && <Bar data={duration} options={options} />}
        </div>
        <button onClick={handleNext}>
          <i class="fas fa-chevron-right fa-lg"></i>
        </button>
      </div>
      <div className=" mx-auto flex gap-4 items-center justify-center">
        <p className="text-md border rounded-lg px-4 py-2 w-10 text-center">
          {currentChartIndex - 1}
        </p>
        <p className="text-md border rounded-lg px-4 py-2 w-10 text-center">
          {currentChartIndex}
        </p>
        <p className="text-md border rounded-lg px-4 py-2 w-10 text-center">
          {currentChartIndex + 1}
        </p>
      </div>
    </div>
  );
};

export default Charts;
