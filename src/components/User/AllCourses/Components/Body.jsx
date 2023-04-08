import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../../utils/constants";
import Rating from "./Rating";
import Traditional from "../../../Common/Alerts/Traditional";
import Banner from "../../../Common/Alerts/Modern";
import { setUserData } from "../../../../Redux";

function Body({ courses }) {
  const { _id } = useSelector((state) => state.userData.value);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    navigate(`/user/course/${id}`);
  };
  const enrollCourse = (courseId) => {
    axios({
      method: "post",
      url: `${baseUrl}add-free-course`,
      data: {
        userId: _id,
        courseId: courseId,
      },
      headers: {
        apikey:
          "login $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
        authorization: `addToCart ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    })
      .then((res) => {
        setSuccess(true);
        setErr(false);
        setMessage(res.data.message);
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("auth");
          dispatch(
            setUserData({
              userData: { name: null, email: null, mobile: null, _id: null },
            })
          );
          navigate("/user/login");
        }
        setErr(true);
        setSuccess(false);
        setMessage(res.response.data.message);
      });
  };
  const addToCart = (courseId) => {
    axios({
      method: "post",
      url: `${baseUrl}add-to-cart`,
      data: {
        userId: _id,
        courseId: courseId,
      },
      headers: {
        apikey:
          "login $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
        authorization: `addToCart ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
      },
    })
      .then((res) => {
        setSuccess(true);
        setErr(false);
        setMessage(res.data.message);
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("auth");
          dispatch(
            setUserData({
              userData: { name: null, email: null, mobile: null, _id: null },
            })
          );
          navigate("/user/login");
        }
        setErr(true);
        setSuccess(false);
        setMessage(res.response.data.message);
      });
  };

  return (
    <>
      {err ? <Traditional setErr={setErr} err={message} /> : null}
      {success ? <Banner setErr={setSuccess} err={message} /> : null}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-6">
        {courses &&
          courses.map((course) => (
            <a
              key={course._id}
              className="flex cursor-pointer flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-400 dark:bg-slate-300-100 dark:hover:bg-gray-200"
            >
              <img
                onClick={() => handleClick(course.courseId)}
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-40 md:rounded-none md:rounded-l-lg p-3"
                src={course.image}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal h-full">
                <h5
                  onClick={() => handleClick(course.courseId)}
                  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-700"
                >
                  {course.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {course.description}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <s>{course.price}</s> {course.ourPrice}
                </p>
                <div className="flex"></div>
                <div className="justify-self-end flex">
                  <span className="flex mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <Rating rating={course.rating} />
                  </span>
                  {course.price > 0 ? (
                    <button
                      onClick={() => addToCart(course._id)}
                      className="ml-auto self-end mt-auto inline-block px-5 py-1 font-medium text-white transition duration-500 ease-in-out transform bg-gray-400 border border-emerald-200 rounded-lg hover:bg-emerald-400 focus:outline-none focus:shadow-outline-blue"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollCourse(course._id)}
                      className="ml-auto self-end mt-auto inline-block px-5 py-1 font-medium text-white transition duration-500 ease-in-out transform bg-gray-400 border border-emerald-200 rounded-lg hover:bg-emerald-400 focus:outline-none focus:shadow-outline-blue"
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </a>
          ))}
      </div>
    </>
  );
}

export default Body;
