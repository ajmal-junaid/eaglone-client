import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../../utils/constants";
import Payment from "./Payment";

function Confirmation(props) {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(
    props.cart.reduce((acc, item) => acc + item.ourPrice, 0)
  );
  const totalPrice = props.cart.reduce((acc, item) => acc + item.ourPrice, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}apply-coupon`,
      data: {
        code: couponCode,
        totalAmount: totalPrice,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
        apikey:
          "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setCouponApplied(true);
        setCouponDiscount(res.data.data);
        if (!couponApplied) {
          setDiscountedPrice(discountedPrice - res.data.data);
        }
      })
      .catch((res) => {
        setCouponApplied(false);
        if (couponApplied) {
          setDiscountedPrice(discountedPrice + couponDiscount);
        }
        console.log(res.response.data, "catch");
      });
  };
  const handlePurchase = () => {
    console.log("succ");
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
                        <span className="font-medium">${item.ourPrice}.00</span>
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
                  placeholder="Enter coupon code ( If any )"
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
            {couponApplied && <span className="font-medium">Total</span>}
            {couponApplied && (
              <span className="font-medium">${totalPrice}.00</span>
            )}
          </div>
          {couponApplied ? (
            <div className="flex justify-between mb-4 text-green-500">
              <span className="font-medium">Coupon Discount</span>
              <span className="font-medium">-${couponDiscount}.00</span>
            </div>
          ) : (
            ""
          )}
          <hr className="my-2 border-none bg-gray-300 h-px" />
          <div className="flex justify-between font-semibold text-gray-700">
            <span className="text-lg font-bold">Grand Total</span>
            <span className="text-lg font-bold">${discountedPrice}.00</span>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center bg-gray-100 py-4 px-6 mt-3 border-t-2 border-blue-500 rounded-md shadow-md">
          <button
            onClick={handlePurchase}
            className="text-white font-bold py-2 px-4 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Proceed to Pay
          </button>
          <Payment/>
        </div>
      </div>
    </>
  );
}

export default Confirmation;
