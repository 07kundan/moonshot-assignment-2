export const dynamic = "force-dynamic";

import {
  CategoryChart,
  CategoryInterface,
  DataInterface,
  dateRange,
  RawDataItem,
} from "@/interface/ChartDataInterface";
import fetchData from "@/lib/fetchdata";
import { NextRequest, NextResponse } from "next/server";

// Function to accumulate category values
function accumulateData(data: RawDataItem[]): CategoryInterface {
  const result = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  // accumulating category value
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
  category: keyof RawDataItem,
  gender?: string | null,
  age?: string | null,
  dateRange?: dateRange
): CategoryInterface | CategoryChart[] {
  // varible to make changes
  let filteredData = data.data;

  // Filteration by category for url /category-chart/category
  if (category) {
    const categoryResult: CategoryChart[] = filteredData.map(
      (item: RawDataItem) => ({
        date: new Date(item.date).toLocaleDateString(),
        value: item[category] as number,
      })
    );

    const aggregatedResult = categoryResult.reduce((acc, curr) => {
      const existing = acc.find((item) => item.date === curr.date);
      if (existing) {
        existing.value += curr.value;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [] as { date: string; value: number }[]);
    return aggregatedResult;
  }

  // Filteration by gender if present
  if (gender) {
    filteredData = filteredData.filter((item) => item.gender === gender);
  }
  // Filteration by age if present
  if (age) {
    if (age === ">25") {
      filteredData = filteredData.filter((item) => item.age === ">25");
    } else {
      filteredData = filteredData.filter((item) => item.age === "15-25");
    }
  }

  // Filteration by date range if present
  if (dateRange && dateRange.startDate && dateRange.endDate) {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    filteredData = filteredData.filter((item) => {
      const entryDate = new Date(item.date);
      return entryDate >= start && entryDate <= end;
    });
  }

  // returning the accumulated end result
  return accumulateData(filteredData);
}

export async function GET(req: NextRequest) {
  try {
    const url = req.headers.get("referer");
    const urlObj = new URL(url as string);
    const params = new URLSearchParams(urlObj.search);
    const category = params.get("category");
    const startDate: string | null = params.get("startDate");
    const endDate: string | null = params.get("endDate");
    const gender: string | null = params.get("gender") || null;
    const age: string | null = params.get("age") || null;
    const dateRange = {
      startDate: startDate || null,
      endDate: endDate || null,
    };

    // fetching the entire data
    const data: DataInterface = await fetchData();

    // call the function for filtering the data based on query
    const responseData = getFilteredData(
      data,
      category as keyof RawDataItem,
      gender,
      age,
      dateRange
    );

    // returning the response body
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
