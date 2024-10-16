"use client";
import fetchData from "@/lib/fetchdata";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

// const data = [
//   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
// ];

function CategoryChart({ className }: { className: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<DataItem[]>([
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
  ]);
  const pathname = usePathname();

  useEffect(() => {
    const updateChartData = (newData: { [key: string]: number }) => {
      const updatedData = Object.keys(newData).map((key) => ({
        name: key,
        value: newData[key],
      }));
      setChartData(updatedData);
    };

    async function apiFetch() {
      const res = await axios.get(`/api/category-chart`);
      // console.log("response", res.data.data);
      updateChartData(res.data?.data);
    }

    apiFetch();
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  return (
    <section className="h-full w-full flex pl-12 items-center">
      <ResponsiveContainer width="90%" height={600}>
        <BarChart
          data={chartData}
          layout="vertical"
          barCategoryGap={20} // Space between categories
        >
          <CartesianGrid strokeDasharray="1 5" />
          <XAxis type="number" domain={[0, 70000]} tickCount={8} />
          <YAxis
            dataKey="name"
            type="category"
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "blue", color: "yellow" }} // Dark background with white text
            cursor={{ fill: "rgba(255, 0, 0, 0.1)" }}
          />
          <Legend />
          <Bar dataKey="value" onMouseOut={handleMouseLeave}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? "red" : "#82ca9d"}
                onMouseEnter={() => handleMouseEnter(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default CategoryChart;
