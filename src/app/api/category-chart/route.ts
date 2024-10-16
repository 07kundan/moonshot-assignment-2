import fetchData from "@/lib/fetchdata";
import { NextRequest, NextResponse } from "next/server";

interface data {
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

interface categoryInterface {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

interface DataInterface {
  data: data[];
}

// accumulating the category value

function accumulateData(data: data[]): categoryInterface {
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

// filter data
function getFilteredData(
  data: DataInterface,
  gender?: string,
  age?: string,
  dateRange?: {
    startDate: string;
    endDate: string;
  }
): categoryInterface {
  // steps-:
  // fetch data for gender;
  // fetch data for age;
  // fetch data for dateRange;
  // fetch filtered data for all parameter

  // row data without filter
  if (!(gender && age && dateRange)) {
    return accumulateData(data.data);
  }

  // based on gender
  if (gender && !age && dateRange) {
    const filteredData = data.data.filter((item) => item.gender === gender);
    return accumulateData(filteredData);
  }

  // based on age
  if (age && !gender && !dateRange) {
    if (age === ">25") {
      const filteredData = data.data.filter((item) => item.age === ">=25");
      return accumulateData(filteredData);
    }
    const filteredData = data.data.filter((item) => item.age === "15-25");
    return accumulateData(filteredData);
  }

  //   based on dateRange
  if (dateRange && !age && !gender) {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);

    const dateFilteredData = data.data.filter((item) => {
      const entryDate = new Date(item.date);
      return entryDate >= start && entryDate <= end; // Include entries within the date range
    });
    return accumulateData(dateFilteredData);
  }

  //   based on all parameter
  const start = new Date(dateRange.startDate);
  const end = new Date(dateRange.endDate);
  const result = data.data.filter((item) => {
    const entryDate = new Date(item.date);
    const isWithinDateRange = entryDate >= start && entryDate <= end;
    const isMatchingAge = age ? item.age === age : true;
    const isMatchingGender = gender ? item.gender === gender : true;
    return isWithinDateRange && isMatchingAge && isMatchingGender;
  });

  return accumulateData(result);
}

export async function GET(req: NextRequest) {
  const data: DataInterface = await fetchData();
  let responseData;
  try {
    responseData = getFilteredData(data);
    // console.log(responseData);
    return NextResponse.json(
      {
        data: responseData,
        success: true,
        message: "fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while getting data", error);
    return NextResponse.json(
      {
        success: false,
        message: "error while filtering data",
      },
      {
        status: 500,
      }
    );
  }
}
