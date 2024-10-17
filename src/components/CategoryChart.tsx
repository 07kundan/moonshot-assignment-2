"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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
import { cn } from "@/lib/utils";

interface DataItem {
  name: string;
  value: number;
}

function CategoryChart({ className }: { className: string }) {
  const searchParams = useSearchParams(); // Get current query parameters

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<DataItem[]>([
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
  ]);

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
      updateChartData(res.data?.data);
    }

    apiFetch();
  }, [searchParams]);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section className={cn(className, "")}>
      <ResponsiveContainer width="95%" height={600}>
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
          {/* <Tooltip
            contentStyle={{ backgroundColor: "blue", color: "yellow" }} // Dark background with white text
            cursor={{ fill: "rgba(255, 0, 0, 0.1)" }}
          /> */}
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
