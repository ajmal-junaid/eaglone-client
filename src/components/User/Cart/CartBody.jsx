import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import Tradional from "../../Common/Alerts/Traditional";
import CartSummary from "./CartSummary";
import DeleteConfirmBox from "../../Common/ConfirmDelete";

const CartBody = () => {
  const params = useParams();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [delet, setDelete] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: "get",
      url: `${baseUrl}get-cart?userId=${params.id}`,
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
        setCart(res.data.data);
        console.log(res.data.data);
        //setIsLoading(false);
      })
      .catch((res) => {
        console.log(res, "catch");
        setMessage(res.response.data.message);
        setError(true);
      });
  };
  const handleDelete = (title) => {
    setIsOpen(true);
    setDelete(title);
  };
  const handleDeletee = () => {
    setIsOpen(false);
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {error ? <Tradional setErr={setError} message={message} /> : null}
      {delet ? (
        <DeleteConfirmBox
          itemName={delet}
          isOpen={isOpen}
          handleDelete={handleDeletee}
          setIsOpen={setIsOpen}
        />
      ) : (
        ""
      )}
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="flex justify-between items-center my-4 ">
          <div className="flex items-center">
            <FaCartArrowDown className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">{cart.length} items</span>
          </div>
          <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Checkout
            <FaChevronRight className="w-5 h-5 ml-2 " />
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8 border-x-2 p-4 gap-4">
            <div className="max-h-screen">
              {cart &&
                cart.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-4 mb-4 rounded-lg"
                    >
                      <div className="flex items-center sm:w-1/2">
                        <img
                          className="w-16 h-16 object-contain mr-4"
                          src={item.image}
                          alt="Product"
                        />
                        <div>
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <p className="text-sm text-gray-600">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:w-1/4 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-gray-500 line-through">
                          ${item.price}
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          ${item.ourPrice}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          ({item.percentage}% OFF)
                        </span>
                      </div>

                      <div className="cursor-pointer">
                        <span
                          onClick={() => handleDelete(item.title)}
                          className="text-lg font-bold p-2"
                        >
                          x
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartBody;
