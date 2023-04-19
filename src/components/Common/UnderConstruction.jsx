import React from "react";
import { motion } from "framer-motion";

const UnderConstruction = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-yellow-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 22s8-4 8-10V6a4 4 0 00-4-4h-8a4 4 0 00-4 4v6c0 6 8 10 8 10z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 10l5 5 5-5"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Site under construction - Sorry
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We&apos;re working hard to bring you the best experience possible.
        </p>
        <motion.div
          className="bg-yellow-500 rounded-lg p-2"
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{ duration: 2, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1] }}
        >
          <button className="text-white font-bold py-2 px-4 rounded">
            Contact Us
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
