"use client";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { setIsLoading } from "@/store/features/loading.slice";
import { DataItem } from "@/interface/ChartDataInterface";

function CategoryChart({ className }: { className: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartData, setChartData] = useState<DataItem[]>([]);

  useEffect(() => {
    dispatch(setIsLoading(true));
    // function to update the data in state
    const updateChartData = (newData: { [key: string]: number }) => {
      const updatedData = Object.keys(newData).map((key) => ({
        name: key,
        value: newData[key],
      }));
      setChartData(updatedData);
    };

    // making an api call for the data and updating the data into state
    async function apiFetch() {
      const res = await axios.get(`/api/category-chart`);
      updateChartData(res.data?.data);
      dispatch(setIsLoading(false));
    }
    apiFetch();
  }, [window.location.href]);

  // for onhover effect in the bar
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  // for onhover effect in the bar
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Suspense>
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
                  fill={index === activeIndex ? "#3c7d79" : "#57A6A1"}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={() => {
                    router.push(
                      `/category-chart/category?category=${entry.name}`
                    );
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>
    </Suspense>
  );
}

export default CategoryChart;
