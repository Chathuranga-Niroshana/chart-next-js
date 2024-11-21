"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function MeterCard() {
  const [performance, setPerformance] = useState(61);
  const [availability, setAvailability] = useState(52);
  const [quality, setQuality] = useState(34);

  // Calculate the average
  const average = ((performance + availability + quality) / 3).toFixed(1);

  const data = {
    labels: ["Performance", "Availability", "Quality", "a"],
    datasets: [
      {
        // Performance
        data: [performance, 100 - performance],
        backgroundColor: ["#049C64", "#33363F"],
        borderWidth: 0,
      },
      {
        // Availability
        data: [availability, 100 - availability],
        backgroundColor: ["#FF0004", "#33363F"],
        borderWidth: 0,
      },
      {
        // Quality
        data: [quality, 100 - quality],
        backgroundColor: ["#FFBB38", "#33363F"],
        borderWidth: 0,
        borderRadius: 3,
      },
      {
        // empty
        data: [100],
        backgroundColor: ["#33363F", "#33363F"],
        borderWidth: 0,
        cutout: "60%",

      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const { datasetIndex, dataIndex } = tooltipItem;
            const labels = ["Performance", "Availability", "Quality"];
            const values = [performance, availability, quality];
            if (dataIndex === 0) {
              return `${labels[datasetIndex]}: ${values[datasetIndex]}%`;
            }
            return null;
          },
        },
      },
      centerText: {
        display: true,
        text: `\n\n${average}%\n\nOEE`,
      },
    },
  };

  //  plugin for center text 
  ChartJS.register({
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      const { text } = chart.config.options.plugins.centerText;

      // Draw white circle in the center
      ctx.save();
      ctx.fillStyle = "transparent"; // White background for the center
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, height / 4.5, 0, Math.PI * 2); // Adjust radius
      ctx.fill();
      ctx.restore();

      // Draw center text
      if (text) {
        ctx.save();
        ctx.font = "900 32px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lines = text.split("\n");
        lines.forEach((line, index) => {
          ctx.fillText(line, width / 2, height / 2 + index * 20);
        });
        ctx.restore();
      }
    },
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className=" flex flex-col justify-between bg-meter-box-gradient shadow-lg rounded-lg px-2 pt-2 w-1/2 ">
        <h1 className="text-2xl mr-auto font-bold text-[#333333]">OEE</h1>

        {/*  Boxes */}
        <div className="flex justify-around w-full ">
          <div className="flex flex-col items-center">
            <span className="text-xl text-[#6E7075] font-bold mb-1"> Performance</span>
            <div className=" py-1 px-3 text-white font-bold bg-percentage-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 40 }} /> {performance.toFixed(2)}%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl text-[#6E7075] font-bold mb-1">Availability</span>
            <div className="py-1 px-3 text-white font-bold bg-availability-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 40 }} /> {availability.toFixed(2)}%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl text-[#6E7075] font-bold mb-1">Quality</span>
            <div className="py-1 px-3 text-white font-bold bg-quality-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 40 }} /> {quality.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="  w-[500px]  mx-auto h-[500px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
