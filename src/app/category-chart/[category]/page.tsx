"use client";
import { setIsLoading } from "@/store/features/loading.slice";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

function page() {
  const [chartData, setChartData] = useState<CategoryChart[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    async function apiFetch() {
      const res = await axios.get(`/api/category-chart`);
      setChartData(res.data?.data);
      dispatch(setIsLoading(false));
    }
    apiFetch();
  }, []);

  return (
    <section className="h-full">
      <ResponsiveContainer width="95%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
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
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            // activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default page;
