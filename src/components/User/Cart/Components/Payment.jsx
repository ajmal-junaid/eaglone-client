import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51MqJ81SGQtDohDQ3hjqu6uR41vjTCQrYsxVuqw83MhM2sceqseQJVrjrT7lVbMillInMnUCWVfMfQfWzn5OKzYDi00tcumukUp"
);
function Payment({ clientSecret }) {
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="my-component m-16  inset-0 z-50">
      <div className="my-component-root">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Payment;
