import { CategoryChart } from "@/components";
import React from "react";

function page({ className }: { className: string }) {
  return (
    <div>
      <CategoryChart className={className} />
    </div>
  );
}

export default page;
