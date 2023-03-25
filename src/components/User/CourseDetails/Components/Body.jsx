import React from "react";
import { FaStar, FaRegSquare } from "react-icons/fa";

function Body({ course }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {course.title}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaStar className="mr-1 h-4 w-4 text-yellow-500" />
              <span className="font-medium">{course.rating}</span>
              <span className="mx-2"></span>
              {/* <span>1,500 ratings</span> */}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaRegSquare className="mr-1 h-4 w-4" />
              <span>{course.category}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enroll now
            </button>
          </span>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-10">
          <img
            className="w-full object-cover object-center rounded-lg shadow-lg p-2"
            src={course.image}
            alt="Course"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg font-medium text-gray-900">
            About this course
          </h3>
          <div className="mt-4 text-gray-500 text-sm">
            <p>{course.description}</p>
            <p className="mt-4">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Sed fringilla dapibus sem, at
              accumsan enim efficitur nec.
            </p>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900">
              What you&lsquo;ll learn
            </h4>
            <ul className="mt-4 text-gray-500 text-sm">
              <li className="mt-2">Lorem ipsum dolor sit amet</li>
              <li className="mt-2">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </li>
              <li className="mt-2">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h4 className="text-lg font-medium text-gray-900">Course content</h4>
        <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          <li className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Introduction</p>
              <p className="mt-1 text-sm text-gray-500">
                Welcome to the course!
              </p>
            </div>
          </li>
          <li className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Chapter 1: Getting started
              </p>
              <ul className="mt-1 text-sm text-gray-500 list-disc pl-3">
                <li className="mt-2">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </li>
                <li className="mt-2">
                  Eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo.
                </li>
              </ul>
            </div>
          </li>
          <li className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Chapter 2: Intermediate concepts
              </p>
              <ul className="mt-1 text-sm text-gray-500 list-disc pl-3">
                <li className="mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="mt-2">
                  Aliquam faucibus elementum ante, auctor pretium sapien viverra
                  nec.
                </li>
              </ul>
            </div>
          </li>
          <li className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Chapter 3: Advanced topics
              </p>
              <ul className="mt-1 text-sm text-gray-500 list-disc pl-3">
                <li className="mt-2">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </li>
                <li className="mt-2">
                  Eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo.
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Body;
