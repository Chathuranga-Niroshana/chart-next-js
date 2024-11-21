"use client";

import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";


export default function MeterCard() {
  const [performance, setPerformance] = useState(51);
  const [availability, setAvailability] = useState(52);
  const [quality, setQuality] = useState(45);

  const smoothUpdate = (currentValue, targetValue, setValue) => {
    const step = (targetValue - currentValue) / 30;
    let frame = 0;

    const animate = () => {
      frame++;
      const updatedValue = currentValue + step * frame;
      if ((step > 0 && updatedValue >= targetValue) || (step < 0 && updatedValue <= targetValue)) {
        setValue(targetValue);
        return;
      }
      setValue(updatedValue);
      requestAnimationFrame(animate);
    };

    animate();
  };

  const updateData = (newPerformance, newAvailability, newQuality) => {
    smoothUpdate(performance, newPerformance, setPerformance);
    smoothUpdate(availability, newAvailability, setAvailability);
    smoothUpdate(quality, newQuality, setQuality);
  };

  useEffect(() => {

    // Add codes to set values

    const interval = setInterval(() => {
      const newPerformance = Math.min(100, Math.random() * 100);
      const newAvailability = Math.min(100, Math.random() * 100);
      const newQuality = Math.min(100, Math.random() * 100);

      updateData(newPerformance, newAvailability, newQuality);
    }, 3000);

    return () => clearInterval(interval);
  }, [performance, availability, quality]);

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="flex flex-col justify-center items-center bg-meter-box-gradient shadow-lg rounded-lg px-6 pt-8 pb-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-[#33333333] mr-auto mb-4">OEE</h1>


        <div className="flex flex-wrap justify-around gap-6 mb-10">
          <div className="flex flex-col items-center">
            <span className="text-xl text-gray-400 font-bold mb-1"> Performance</span>
            <div className="py-1 px-3 text-white font-bold bg-percentage-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 30 }} />  {performance.toFixed(2)}%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl text-gray-400 font-bold mb-1">Availability</span>
            <div className="py-1 px-3 text-white font-bold bg-availability-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 30 }} />  {availability.toFixed(2)}%
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl text-gray-400 font-bold mb-1">Quality</span>
            <div className="py-1 px-3 text-white font-bold bg-quality-box-gradient rounded-full text-center">
              <ArrowDropUpIcon sx={{ fontSize: 30 }} />  {quality.toFixed(2)}%
            </div>
          </div>
        </div>


        <div className="relative flex items-center justify-center w-[400px] h-[200px]">
          <svg
            viewBox="0 0 100 50"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/*  Gradients */}
            <defs>
              <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* <stop offset="0%" stopColor="#1995D2" /> */}
                {/* <stop offset="4%" stopColor="#049C64" /> */}
                <stop offset="100%" stopColor="#049C64" />
              </linearGradient>
              <linearGradient id="availabilityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* <stop offset="0%" stopColor="#4C78FF" /> */}
                <stop offset="0%" stopColor="#FF0004" />
                <stop offset="100%" stopColor="#FF0004" />
              </linearGradient>
              <linearGradient id="qualityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* <stop offset="0%" stopColor="#FF0004" /> */}
                <stop offset="40%" stopColor="#FFBB38" />
                <stop offset="100%" stopColor="#FFBB38" />
              </linearGradient>
            </defs>


            {/* Background */}
            <path
              d="M 34 50 A 15 15 0 0 1 66 50"
              fill="none"
              stroke="#6E7075"
              strokeWidth="46"
            />

            <path
              d="M 14 50 A 30 30 0 0 1 86 50"
              fill="none"
              stroke="#33363F"
              strokeWidth="13"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#33363F"
              strokeWidth="6"
            />
            <path
              d="M 16 50 A 29 29 0 0 1 84 50"
              fill="none"
              stroke="#33363F"
              strokeWidth="6"
            />
            <path
              d="M 22 50 A 28 28 0 0 1 78 50"
              fill="none"
              stroke="#33363F"
              strokeWidth="16"
            />


            {/* Performance  */}
            <path
              d="M 10 50 A 30 30 0 0 1 90 50"
              fill="none"
              stroke="url(#performanceGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(performance * 126) / 100}, 126`}
            />

            {/* Availability  */}
            <path
              d="M 16 50 A 29 29 0 0 1 84 50"
              fill="none"
              stroke="url(#availabilityGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(availability * 110) / 100}, 110`}
            />

            {/* Quality  */}
            <path
              d="M 22 50 A 28 28 0 0 1 78 50"
              fill="none"
              stroke="url(#qualityGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(quality * 94) / 100}, 94`}
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white text-2xl mt-32 font-bold">{(
              (performance + availability + quality) / 3
            ).toFixed(2)}%</span>
            <span className="text-white">OEE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
