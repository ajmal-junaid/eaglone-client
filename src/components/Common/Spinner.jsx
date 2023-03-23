import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-80">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
      >
        <rect
          x="10"
          y="10"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <rect x="16" y="16" width="8" height="8" fill="currentColor" />
      </svg>
    </div>
  );
}

export default Spinner;
