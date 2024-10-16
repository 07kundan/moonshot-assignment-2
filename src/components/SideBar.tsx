import { cn } from "@/lib/utils";
import React from "react";

function SideBar({ className }: { className: string }) {
  return (
    <div className={cn("flex justify-center pt-20", className)}>
      <ul className="text-xl px-6 w-full space-y-3">
        {["Today", "Yesterday", "Last 7 Days", "This month"].map((item) => (
          <li className="hover:bg-zinc-700/60 pl-8 py-2 rounded-lg">
            <button className="w-full text-left">{item}</button>
          </li>
        ))}

        <li className="hover:bg-zinc-700/60 pl-8 py-2 rounded-lg">
          <button className="w-full text-left">Custom Range</button>
        </li>
        <li className=" pl-8 py-2 rounded-lg">
          <select
            className="w-3/4 rounded-lg py-1 px-3 bg-transparent focus:outline-none focus:border-blue-500"
            name="gender"
            id="gender"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Gender
            </option>
            <option value="Male" className="">
              Male
            </option>
            <option value="Female">Female</option>
          </select>
        </li>
        <li className=" pl-8 py-2 rounded-lg">
          <select
            className="w-3/4 rounded-lg py-1 px-3 bg-transparent focus:outline-none focus:border-blue-500"
            name="age"
            id="age"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Age
            </option>
            <option value="Male">15-25</option>
            <option value="Female">&gt;25</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
