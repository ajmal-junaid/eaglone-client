import React from "react";

function LoadingBar() {
  return (
    <svg
      width="100%"
      height="10"
      viewBox="0 0 500 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="10" rx="5" fill="#E2E8F0" />
      <rect width="0" height="10" rx="5" fill="#4F46E5">
        <animate
          attributeName="width"
          from="0"
          to="100%"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

export default LoadingBar;

// spinning circle

{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-blue-500">
<circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none">
  <animate attributeName="stroke-dasharray" values="1 20; 20 1; 1 20" dur="1.5s" repeatCount="indefinite" />
  <animate attributeName="stroke-dashoffset" values="0; -15; -30" dur="1.5s" repeatCount="indefinite" />
  <animate attributeName="stroke-opacity" values="1; 0" dur="1.5s" repeatCount="indefinite" />
</circle>
</svg>*/ }
