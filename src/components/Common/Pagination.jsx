import React from "react";

function Pagination({ pageNo, setPageNo, totalPages, changed }) {
  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
    changed();
  };
  const handleNext = () => {
    if (pageNo < totalPages) setPageNo(pageNo + 1);
    changed();
  };
  return (
    <div className="flex flex-col items-center mt-7 bottom-0">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-gray">
          {pageNo}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-gray">
          {totalPages}
        </span>{" "}
        Page
      </span>
      <div className="inline-flex mt-2 xs:mt-0 gap-2">
        <button
          onClick={() => handlePrev()}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Prev
        </button>
        <button
          onClick={() => handleNext()}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
