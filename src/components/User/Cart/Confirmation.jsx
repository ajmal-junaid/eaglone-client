import React, { useState } from "react";

function Confirmation(props) {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const totalPrice = props.cart.reduce((acc, item) => acc + item.price, 0);
  const discountedPrice = props.cart.reduce(
    (acc, item) => acc + item.ourPrice,
    0
  );
  const discount = totalPrice - discountedPrice;
  const percentage =
    props.cart.reduce((acc, item) => acc + item.percentage, 0) /
    props.cart.length;
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponApplied(true);
    console.log(couponApplied, couponCode);
    // Your coupon validation logic goes here
  };
  return (
    <>
      <div className="inset-0 z-40 flex flex-col justify-items-start pt-14 border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          {/* {submitError ? <Traditional err={submitError} /> : ""} */}
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Confirm you order
          </h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto">
            <div className="container mx-auto max-h-56 overflow-auto">
              <ul className="space-y-2 pt-2 text-gray-700">
                {props.cart &&
                  props.cart.map((item) => {
                    return (
                      <li key={item._id} className="flex justify-between">
                        <span className="font-medium">{item.title}</span>
                        <span className="font-medium">${item.price}.00</span>
                      </li>
                    );
                  })}
                <hr className="my-2 border-none bg-gray-300 h-px " />
                <li className="flex justify-between font-bold ">
                  <span>Total</span>
                  <span>${totalPrice}.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-row bg-gray-100 p-4 mt-3 border-t-1 border-blue-500">
          <div className="flex items-center justify-center">
            <form onSubmit={handleApplyCoupon} className="w-full max-w-sm">
              <div className="flex items-center border-b-2 border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Enter coupon code"
                  aria-label="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="submit"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex-row bg-gray-100 p-4 mt-3 border-t-2 border-blue-500">
          <div className="flex justify-between mb-4 text-gray-700">
            <span className="font-medium">Total</span>
            <span className="font-medium">${totalPrice}.00</span>
          </div>
          <div className="flex justify-between mb-4 text-green-500">
            <span className="font-medium">
              Discount ({percentage.toFixed(2)}%)
            </span>
            <span className="font-medium">-${discount}.00</span>
          </div>
          <hr className="my-2 border-none bg-gray-300 h-px" />
          <div className="flex justify-between font-semibold text-gray-700">
            <span className="text-lg font-bold">Grand Total</span>
            <span className="text-lg font-bold">${discountedPrice}.00</span>
          </div>
        </div>
        <div className="flex-row bg-gray-100 p-4 mt-3 border-t-1 border-blue-500 text-center">
          Proceed To pay
        </div>
      </div>
    </>
  );
}

export default Confirmation;
