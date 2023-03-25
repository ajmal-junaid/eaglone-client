import React from "react";
import { useParams } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const CartBody = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <FaCartArrowDown className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">3 items</span>
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Checkout
            <FaChevronRight className="w-5 h-5 ml-2 " />
          </button>
        </div>
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center sm:w-1/2">
              <img
                className="w-16 h-16 object-contain mr-4"
                src="https://dummyimage.com/80x80/000/fff"
                alt="Product"
              />
              <div>
                <h2 className="text-lg font-bold">Product Name</h2>
                <p className="text-sm text-gray-600">
                  Product description goes here
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:w-1/4">
              <label className="block text-gray-700 font-bold mb-2">
                Quantity:
              </label>
              <div className="relative inline-block w-32">
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:w-1/4">
              <span className="text-lg font-bold">$29.99</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 mt-4 rounded-lg">
            <div className="flex items-center sm:w-1/2">
              <img
                className="w-16 h-16 object-contain mr-4"
                src="https://dummyimage.com/80x80/000/fff"
                alt="Product"
              />
              <div>
                <h2 className="text-lg font-bold">Another Product</h2>
                <p className="text-sm text-gray-600">
                  Another product description goes here
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:w-1/4">
              <label className="block text-gray-700 font-bold mb-2">
                Quantity:
              </label>
              <div className="relative inline-block w-32">
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:w-1/4">
              <span className="text-lg font-bold">$19.99</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 mt-4 rounded-lg">
            <div className="flex items-center sm:w-1/2">
              <img
                className="w-16 h-16 object-contain mr-4"
                src="https://dummyimage.com/80x80/000/fff"
                alt="Product"
              />
              <div>
                <h2 className="text-lg font-bold">Yet Another Product</h2>
                <p className="text-sm text-gray-600">
                  Yet another product description goes here
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:w-1/4">
              <label className="block text-gray-700 font-bold mb-2">
                Quantity:
              </label>
              <div className="relative inline-block w-32">
                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:w-1/4">
              <span className="text-lg font-bold">$14.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartBody;
