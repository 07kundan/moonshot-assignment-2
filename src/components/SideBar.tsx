"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function SideBar({ className }: { className: string }) {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleFilterClick = (filter: string) => {
    const query = new URLSearchParams();
    const today = new Date();
    const todayIn2022 = new Date(2022, today.getMonth(), today.getDate());

    if (filter === "Today") {
      query.set("date", todayIn2022.toISOString()); // Today's date in ISO 8601 format
    } else if (filter === "Yesterday") {
      const yesterday = todayIn2022
      yesterday.setDate(yesterday.getDate() - 1);
      query.set("date", yesterday.toISOString()); // Yesterday's date
    } else if (filter === "Last 7 Days") {
      const lastWeek = todayIn2022
      lastWeek.setDate(lastWeek.getDate() - 7); // Last week date in 2022
      query.set("startDate", lastWeek.toISOString());
      query.set("endDate", todayIn2022.toISOString()); // Last 7 days range in 2022
    } else if (filter === "This month") {
      const firstDayOfMonth = new Date(2022, today.getMonth(), 1); // First day of the current month in 2022
      query.set("startDate", firstDayOfMonth.toISOString());
      query.set("endDate", todayIn2022.toISOString()); // First day of the month to today's date in 2022
    }
  
    router.push(`${pathname}?${query.toString()}`);
  };
  

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    const query = new URLSearchParams({ filter: "gender", gender });
    router.push(`${pathname}?${query.toString()}`);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const age = e.target.value;
    setSelectedAge(age);
    const query = new URLSearchParams({ filter: "age", age });
    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <div className={cn("flex justify-center pt-20", className)}>
      <ul className="text-xl px-6 w-full space-y-3">
        {["Today", "Yesterday", "Last 7 Days", "This month"].map((item) => (
          <li
            key={item}
            className="hover:bg-zinc-700/60 pl-8 py-2 rounded-lg"
            onClick={() => handleFilterClick(item)}
          >
            <button className="w-full text-left">{item}</button>
          </li>
        ))}

        <li className="hover:bg-zinc-700/60 pl-8 py-2 rounded-lg">
          <button className="w-full text-left" onClick={() => handleFilterClick("Custom Range")}>
            Custom Range
          </button>
        </li>

        <li className="pl-8 py-2 rounded-lg bg-lime-900">
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

        <li className="pl-8 py-2 rounded-lg">
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
            <option value=">25">>25</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
