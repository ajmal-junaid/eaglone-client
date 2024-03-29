import React from "react";

const RatingSystem = ({ rating, setRating }) => {
  const handleRatingClick = (value) => {
    setRating(value);
  };
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className={`p-1 ${
            index < rating ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => handleRatingClick(index + 1)}
        >
          <svg
            aria-hidden="true"
            className={`w-5 h-5 ${
              rating > index ? "text-yellow-400" : "gray-300 dark:text-gray-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title> {index + 1} ⭐</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default RatingSystem;
