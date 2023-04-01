import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import Tradional from "../../Common/Alerts/Traditional";
import CartSummary from "./Components/CartSummary";
import DeleteConfirmBox from "../../Common/ConfirmDelete";
import Modern from "../../Common/Alerts/Modern";
import Modal from "react-modal";
import Confirmation from "./Components/Confirmation";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout } from "../../../Redux";

const CartBody = () => {
  const params = useParams();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [delet, setDelete] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.value);

  useEffect(() => {
    getData();
  }, [isOpen, delet]);

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
      })
      .catch((res) => {
        console.log(res, "catch");
        setMessage(res.response.data.message);
      });
  };
  const handleDelete = (courseId, title) => {
    setCourseId(courseId);
    setIsOpen(true);
    setDelete(title);
  };
  const handleDeletee = () => {
    axios({
      method: "post",
      url: `${baseUrl}remove-from-cart`,
      data: {
        courseId: courseId,
        userId: params.id,
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
        setMessage(res.data.message);
        setError(true);
        //setIsLoading(false);
      })
      .catch((res) => {
        console.log(res.response.data, "catch");
        setMessage(res.response.data.message);
        setError(true);
      });
    setIsOpen(false);
  };
  function openModal() {
    setModalIsOpen(true);
    dispatch(
      setCheckout({
        checkout: {
          user:userData._id,
          courses: cart,
        },
      })
    )
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {<Modern message={message} setErr={setError} />}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "100%",
            maxWidth: "800px",
            height: "auto",
            margin: "auto",
            position: "absolute",
          },
        }}
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Confirmation cart={cart} />
      </Modal>
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="flex justify-between items-center my-4 ">
          <div className="flex items-center">
            <FaCartArrowDown className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">{cart.length} items</span>
          </div>
          <button
            onClick={openModal}
            className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Checkout
            <FaChevronRight className="w-5 h-5 ml-2 " />
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4 ">
          <div className="col-span-12 md:col-span-8 border-x-2 p-4 gap-4">
            <div className="max-h-96 overflow-auto">
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
                          onClick={() => handleDelete(item._id, item.title)}
                          className="text-lg font-bold p-2"
                        >
                          x
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              onClick={openModal}
              className="cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-200 p-4 mb-4 rounded-lg"
            >
              <div className=" flex sm:w-1/2 items-center justify-start">
                <div className="text-center">
                  <h2 className="text-lg font-bold text-indigo-600">
                    Proceed To Checkout
                  </h2>
                </div>
              </div>
              <div className="flex sm:w-1/2 items-end justify-end sm:justify-end">
                <div className="cursor-pointer">
                  <span className="text-lg font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="5"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartBody;
