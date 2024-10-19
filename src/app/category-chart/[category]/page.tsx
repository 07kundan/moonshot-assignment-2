"use client";
import { setIsLoading } from "@/store/features/loading.slice";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGesture } from "@use-gesture/react";
import { CategoryChart } from "@/interface/ChartDataInterface";

function Page() {
  const [chartData, setChartData] = useState<CategoryChart[]>([]);
  const [zoom, setZoom] = useState(1); // Zoom level (default 1)
  const [offset, setOffset] = useState(0); // Pan offset
  const dispatch = useDispatch();

  // fetching the data
  useEffect(() => {
    dispatch(setIsLoading(true));
    async function apiFetch() {
      const res = await axios.get(`/api/category-chart`);
      setChartData(res.data?.data);
      dispatch(setIsLoading(false));
    }
    apiFetch();
  }, []);

  // If the dependencies element's values changes
  const displayedData = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(offset));
    const endIndex = Math.min(
      chartData.length,
      Math.floor(offset + chartData.length / zoom)
    );
    return chartData.slice(startIndex, endIndex);
  }, [chartData, zoom, offset]);

  // If any zoom event occur
  const bind = useGesture({
    // onWheel: ({ delta }) => {
    //   setZoom((z) => {
    //     const newZoom = z - delta[1] * 0.01;
    //     return Math.max(1, newZoom);
    //   });
    // },
    onPinch: ({ offset: [d], event }) => {
      event.preventDefault();
      setZoom((z) => Math.max(1, z - d * 0.01));
    },
    onDrag: ({ delta }) => {
      setOffset((o) => Math.max(0, o - delta[0] / 10));
    },
  });

  return (
    <section className="h-5/6 mt-16 md:mt-4 md:h-full" {...bind()}>
      <ResponsiveContainer width="97%" height="100%" className={"select-none"}>
        <LineChart
          width={500}
          height={300}
          data={displayedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default Page;
