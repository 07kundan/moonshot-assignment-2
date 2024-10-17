import React from "react";

const LineLoading = () => {
  return (
    <div className="w-full h-1 bg-gray-200 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-800 animate-loading-line"></div>
    </div>
  );
};

export default LineLoading;
