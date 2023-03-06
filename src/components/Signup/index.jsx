import React from "react";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden border-2">
      <div className="w-full p-6 m-auto mt-24 bg-white rounded-md shadow-md lg:max-w-xl border-2">
        <h1 className="text-3xl font-bold text-center text-teal-300 font-outline-4">
          Sign Up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Mobile
            </label>
            <input
              type="tel"
              className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-teal-400 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-300 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-800">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already &lsquo; have an account?
          <Link to='/login' className="font-medium text-teal-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default index;
