import React from "react";

function CartSummary(props) {
  const totalPrice = props.cart.reduce((acc, item) => acc + item.price, 0);
  const discountedPrice = props.cart.reduce(
    (acc, item) => acc + item.ourPrice,
    0
  );
  const discount = totalPrice - discountedPrice;
  const percentage =
    props.cart.reduce((acc, item) => acc + item.percentage, 0) /
    props.cart.length;
  return (
    <div className="min-h-full col-span-12 md:col-span-4 bg-gray-300 p-4">
      <div className="col-span-3 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Order Summary
        </h2>
        <div className="container mx-auto">
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

      <div className="bg-gray-100 p-4 mt-3 border-t-8 border-blue-500">
        <div className="flex justify-between mb-4 text-gray-700">
          <span className="font-medium">Total</span>
          <span className="font-medium">${totalPrice}.00</span>
        </div>
        <div className="flex justify-between mb-4 text-green-500">
          <span className="font-medium">Discount ({percentage}%)</span>
          <span className="font-medium">-${discount}.00</span>
        </div>
        <hr className="my-2 border-none bg-gray-300 h-px" />
        <div className="flex justify-between font-semibold text-gray-700">
          <span className="text-lg font-bold">Grand Total</span>
          <span className="text-lg font-bold">${discountedPrice}.00</span>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
