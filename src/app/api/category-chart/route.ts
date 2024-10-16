import fetchData from "@/lib/fetchdata";
import { NextRequest, NextResponse } from "next/server";

interface DataItem {
  date: string;
  age: string;
  gender: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

interface CategoryInterface {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

interface DataInterface {
  data: DataItem[];
}

// Function to accumulate category values
function accumulateData(data: DataItem[]): CategoryInterface {
  const result = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  data.forEach((item) => {
    result.A += item.A || 0;
    result.B += item.B || 0;
    result.C += item.C || 0;
    result.D += item.D || 0;
    result.E += item.E || 0;
    result.F += item.F || 0;
  });

  return result;
}

// Function to filter data based on optional gender, age, and date range
function getFilteredData(
  data: DataInterface,
  gender?: string | null,
  age?: string | null,
  date?: string | null,
  dateRange?: {
    startDate: string | null;
    endDate: string | null;
  }
): CategoryInterface {
  let filteredData = data.data;
  // Filter by gender if present
  if (gender) {
    filteredData = filteredData.filter((item) => item.gender === gender);
  }

  // Filter by age if present
  if (age) {
    if (age === ">25") {
      filteredData = filteredData.filter((item) => item.age === ">=25");
    } else {
      filteredData = filteredData.filter((item) => item.age === "15-25");
    }
  }

  if (date) {
    filteredData = filteredData.filter((item) => {
      const filterDate = new Date(date);
      const entryDate = new Date(item.date);
      return entryDate >= filterDate;
    });
  }

  // Filter by date range if present
  if (dateRange && dateRange.startDate && dateRange.endDate) {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);

    filteredData = filteredData.filter((item) => {
      const entryDate = new Date(item.date);
      return entryDate >= start && entryDate <= end;
    });
  }

  // Return accumulated result of the filtered data
  return accumulateData(filteredData);
}

export async function GET(req: NextRequest) {
  try {
    // console.log(req.headers.get("referer"));
    const url = req.headers.get("referer");
    const urlObj = new URL(url as string);
    // console.log(urlObj);
    const params = new URLSearchParams(urlObj.search);
    const startDate: string | null = params.get("startDate");
    const endDate: string | null = params.get("endDate");
    const dateRange = {
      startDate: startDate || null,
      endDate: endDate || null,
    };
    const gender: string | null = params.get("gender") || null;
    const age: string | null = params.get("age") || null;
    const date: string | null = params.get("date") || null;
    // Fetch data
    const data: DataInterface = await fetchData();

    console.log({ gender, age, date, dateRange });
    // Filter data
    const responseData = getFilteredData(data, gender, age, date, dateRange);
    // console.log(responseData);
    return NextResponse.json(
      {
        data: responseData,
        success: true,
        message: "Fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while getting data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while filtering data",
      },
      { status: 500 }
    );
  }
}
