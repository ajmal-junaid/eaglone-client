import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

function Body({ courses }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/user/course/${id}`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-6">
      
      {courses &&
        courses.map((course) => (
          <a
            onClick={() => handleClick(course.courseId)}
            key={course.id}
            className="flex cursor-pointer flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-400 dark:bg-slate-300-100 dark:hover:bg-gray-200"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-none md:rounded-l-lg p-3"
              src={course.image}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal h-full">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-700">
                {course.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {course.description}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <s>{course.price}</s> {course.ourPrice}
              </p>
              <div className="flex"></div>
              <div className="justify-self-end flex">
                <p className="flex mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <Rating rating={course.rating} />
                </p>
                {course.price > 0 ? (
                  <button className="ml-auto self-end mt-auto inline-block px-5 py-1 font-medium text-white transition duration-500 ease-in-out transform bg-gray-400 border border-emerald-200 rounded-lg hover:bg-emerald-400 focus:outline-none focus:shadow-outline-blue">
                    Add to Cart {course.Ourprice}
                  </button>
                ) : (
                  <button className="ml-auto self-end mt-auto inline-block px-5 py-1 font-medium text-white transition duration-500 ease-in-out transform bg-gray-400 border border-emerald-200 rounded-lg hover:bg-emerald-400 focus:outline-none focus:shadow-outline-blue">
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </a>
        ))}
    </div>
  );
}

export default Body;
