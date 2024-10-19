"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css";
import { Button } from "./ui/button";
import { Cross } from "lucide-react";

function SideBar({
  className,
  screenWindow,
  setHamburger,
  hamburger,
}: {
  className: string;
  screenWindow: boolean;
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [isDateActive, setIsDateActive] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(2022, new Date().getMonth(), new Date().getDate()),
      endDate: addDays(
        new Date(2022, new Date().getMonth(), new Date().getDate()),
        7
      ),
      key: "selection",
    },
  ]);
  const router = useRouter();

  // function for filtering based on date-range
  const handleFilterClick = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    const query = new URLSearchParams();
    query.set("startDate", startDate?.toISOString() || "");
    query.set("endDate", endDate?.toISOString() || "");
    router.push(`/category-chart?${query.toString()}`);
  };

  //fitering based on gender
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    const query = new URLSearchParams({ filter: "gender", gender });
    router.push(`/category-chart?${query.toString()}`);
  };

  // filtering based on age
  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const age = e.target.value;
    setSelectedAge(age);
    const query = new URLSearchParams({ filter: "age", age });
    router.push(`/category-chart?${query.toString()}`);
  };

  // reset all filter
  const handleReset = () => {
    router.replace("/category-chart");
  };

  return (
    <div
      className={cn(
        "pt-20 bg-zinc-300 border-r border-zinc-600 relative",
        className
      )}
    >
      {!screenWindow && hamburger && (
        <button
          className="absolute top-6 right-4 rotate-45 transition-all"
          onClick={() => setHamburger((prev) => !prev)}
        >
          <Cross />
        </button>
      )}
      <div className="text-xl md:px-6 w-full space-y-3">
        <button
          className="hover:bg-zinc-400/60 pl-10 md:pl-8 py-2 rounded-lg font-bold w-full text-left"
          onClick={() => setIsDateActive((prev) => !prev)}
        >
          Custom date
        </button>
        {isDateActive && (
          <div className="absolute top-20 left-full z-10 bg-white flex flex-col justify-center items-center gap-2">
            <DateRangePicker
              ranges={dateRange}
              onChange={(item: RangeKeyDict) => {
                console.log(item);
                setDateRange([item.selection]);
              }}
              months={2}
              direction="horizontal"
              maxDate={new Date()}
              minDate={new Date(2022, 0, 1)}
            />
            <Button
              onClick={() => {
                setIsDateActive((prev) => !prev);
                handleFilterClick(dateRange[0].startDate, dateRange[0].endDate);
              }}
              className=" bg-zinc-200/70 hover:bg-zinc-300/70 border border-zinc-600 font-bold"
              variant="outline"
            >
              Close
            </Button>
          </div>
        )}
      </div>

      <ul className="text-xl md:px-6 w-full space-y-3">
        <li className="flex pl-10 md:pl-8 py-2 rounded-lg font-bold hover:bg-zinc-400/60">
          <select
            className="w-3/4 rounded-lg py-1 bg-transparent focus:outline-none focus:border-blue-500"
            name="gender"
            id="gender"
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <option value="" disabled hidden>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </li>

        <li className="pl-10 md:pl-8 py-2 rounded-lg font-bold hover:bg-zinc-400/60">
          <select
            className="w-3/4 rounded-lg py-1 bg-transparent focus:outline-none focus:border-blue-500"
            name="age"
            id="age"
            value={selectedAge}
            onChange={handleAgeChange}
          >
            <option value="" disabled hidden>
              Age
            </option>
            <option value="15-25">15-25</option>
            <option value=">25">&gt;25</option>
          </select>
        </li>

        <li className="hover:bg-zinc-400/60 pl-10 md:pl-8 py-2 rounded-lg font-bold">
          <button className="w-full text-left" onClick={handleReset}>
            Reset
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
