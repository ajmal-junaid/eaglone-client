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
        <div className="flex justify-between items-center my-4 ">
          <div className="flex items-center">
            <FaCartArrowDown className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">3 items</span>
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Checkout
            <FaChevronRight className="w-5 h-5 ml-2 " />
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 border-x-2 p-4 gap-4">
            <div className="h-full">
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
                  <span className="text-lg font-bold">$14.99</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-gray-300 p-4">4:12</div>
        </div>
      </div>
    </div>
  );
};

export default CartBody;
