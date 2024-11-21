"use client";

import { useState, useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

ChartJS.register(
  ArcElement,
  Legend,
  {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, width } = chart;
      const centerX = width / 2;

      const text = chart.config.options.plugins.centerText.text;

      if (text) {
        const [mainText, subText] = text.split(" \n ");
        ctx.save();

        const circleBottomY = chart.chartArea.bottom;

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(mainText, centerX, circleBottomY - 50);

        ctx.font = "16px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(subText, centerX, circleBottomY - 20);
        ctx.restore();
      }
    },
  }
);

export default function MeterCard() {
  const [performance, setPerformance] = useState(51);
  const [availability, setAvailability] = useState(52);
  const [quality, setQuality] = useState(45);

  const chartRef = useRef(null);

  const average = ((performance + availability + quality) / 3).toFixed(1);

  const chartData = {
    datasets: [
      {
        data: [performance, 100 - performance],
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { width, height } = chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, "#1995D2");
          gradient.addColorStop(0.3, "#049C64");
          gradient.addColorStop(1, "#049C64");
          return [gradient, "#33363F"];
        },
        borderWidth: 0,
        borderRadius: 20,
      },
      {
        data: [availability, 100 - availability],
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { width, height } = chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, width, height);

          
          gradient.addColorStop(0, "#4C78FF");
          gradient.addColorStop(0.3, "#FF0004");
          gradient.addColorStop(1, "#FF0004");
          return [gradient, "#33363F"];
        },
        borderWidth: 0,
        borderRadius: 20,
      },
      {
        data: [quality, 100 - quality],
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { width, height } = chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, width, height);

          gradient.addColorStop(0, "#FF0004");
          gradient.addColorStop(0.3, "#FFBB38");
          gradient.addColorStop(1, "#FFBB38");
          return [gradient, "#33363F"];
        },
        borderWidth: 0,
        borderRadius: 20,
      },
      {
        data: [100],
        backgroundColor: ["transparent"],
        borderWidth: 150,
        borderColor: "rgba(110, 112, 117, 0.4)",
        cutout: "0%",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      centerText: {
        display: true,
        text: `${average}% \n OEE`,
      },
    },
    hover: {
      mode: null,
    },
  };

  const smoothUpdate = (datasetIndex, newValue) => {
    if (chartRef.current) {
      const chart = chartRef.current;

      let currentValue = chart.data.datasets[datasetIndex].data[0];

      const step = (newValue - currentValue) / 30;
      const animation = () => {
        currentValue += step;

        if ((step > 0 && currentValue >= newValue) || (step < 0 && currentValue <= newValue)) {
          currentValue = newValue;
        }

        chart.data.datasets[datasetIndex].data[0] = currentValue;
        chart.data.datasets[datasetIndex].data[1] = 100 - currentValue;
        chart.update("none");
        if (currentValue !== newValue) {
          requestAnimationFrame(animation);
        }
      };

      animation();
    }
  };


  const updateData = (newPerformance, newAvailability, newQuality) => {
    if (newPerformance !== performance) {
      smoothUpdate(0, newPerformance);
      setPerformance(newPerformance);
    }

    if (newAvailability !== availability) {
      smoothUpdate(1, newAvailability);
      setAvailability(newAvailability);
    }

    if (newQuality !== quality) {
      smoothUpdate(2, newQuality);
      setQuality(newQuality);
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const newPerformance = Math.min(100, Math.random() * 100).toFixed(1);
      const newAvailability = Math.min(100, Math.random() * 100).toFixed(1);
      const newQuality = Math.min(100, Math.random() * 100).toFixed(1);

      updateData(Number(newPerformance), Number(newAvailability), Number(newQuality));
    }, 3000);

    return () => clearInterval(interval);
  }, [performance, availability, quality]);

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="flex flex-col justify-between bg-meter-box-gradient shadow-lg rounded-lg px-4 pt-4 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-[#333333] mb-4">OEE</h1>

        <div className="flex flex-wrap justify-around gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xl text-[#6E7075] font-bold mb-1">
              Performance
            </span>
            <div className="py-1 px-3 text-white font-bold bg-percentage-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 40 }} /> {performance.toFixed(2)}%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl text-[#6E7075] font-bold mb-1">
              Availability
            </span>
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

        <div className="w-full h-[200px] mt-10 md:h-[200px] lg:h-[200px] relative overflow-hidden">
          <div className="bg-[#33363F] w-[400px] h-[200px] mb-10 rounded-t-full overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold">
            <Doughnut
              data={chartData}
              options={chartOptions}
              ref={(chart) => {
                chartRef.current = chart;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
