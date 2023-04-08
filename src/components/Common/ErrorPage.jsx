import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/14/04/45/error-1824145_1280.png"
          alt="Error Icon"
          className="w-20 h-20 mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-xl text-gray-700 mb-4">
          Something went wrong. Please try again later.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
