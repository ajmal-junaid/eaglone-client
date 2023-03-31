import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import Loading from "../../Common/Loading";
import LoadingBar from "../../Common/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setCatagoryLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const userData = useSelector((state) => state.userData.value);
  const navigate = useNavigate();

  const handleMyCourse = () => {
    navigate(`/user/courses-purchased/${userData._id}`);
  };
  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = () => {
    axios({
      method: "get",
      url: `${baseUrl}courses`,
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
        apikey:
          "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setCourses(res.data.data);
        setIsLoading(false);
      })
      .catch((res) => {
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
    axios({
      method: "get",
      url: `${baseUrl}admin/categories`,
      headers: {
        "Content-Type": "application/json",
        apikey:
          "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setCatagoryLoading(false);
        setCategories(res.data.data);
      })
      .catch((res) => {
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  const [hovered, setHovered] = useState(false);
  const [hoveredf, setHoveredf] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleMouseEnterf = () => {
    setHoveredf(true);
  };

  const handleMouseLeavef = () => {
    setHoveredf(false);
  };


  return (
    <>
      <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="w-full">
          <Banner />
          <div>
            <div className="my-6 pt-4">
              <h1 className="text-2xl md:text-3xl lg:text-3xl font-extrabold font-mono">
                Popular Courses
              </h1>
            </div>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="flex justify-center flex-wrap">
                  {courses.map((card) => (
                    <div
                      key={card.title}
                      className="relative w-1/2 md:w-1/3 lg:w-1/6 max-w-sm rounded overflow-hidden shadow-lg p-4 flex-row"
                    >
                      <img
                        className="w-full h-36 max-h-fit object-fill p-5"
                        src={card.image}
                        alt={card.title}
                      />

                      <div className="px-1 py-1 mb-3">
                        <div className="font-bold text-sm mb-1">
                          {card.title}
                        </div>
                        <p className="text-gray-700 text-sm">{card.category}</p>
                      </div>
                      <div className="text-right text-sm bottom-2 right-2 absolute">
                        <span className="text-gray-700">
                          {card.rating ? "⭐" : "⭐"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-11 container">
            <div className="flex flex-wrap">
              {/* Card start */}
              <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mt-5">
                <div className="card-container">
                  <div
                    className={`relative rounded-lg overflow-hidden border-2 border-gray-200 shadow-xl bg-white transform transition-all duration-300 ${
                      hoveredf ? "scale-105 shadow-2xl" : "scale-100 shadow-xl"
                    }`}
                    onMouseEnter={handleMouseEnterf}
                    onMouseLeave={handleMouseLeavef}
                  >
                    <div className="absolute top-0 right-0 p-2">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500 text-2xl"
                      />
                    </div>
                    <div className="px-6 py-4">
                      <div className="mb-4">
                        <h3 className="text-gray-900 font-bold text-lg tracking-wide">
                          Premium Benefits
                        </h3>
                      </div>
                      <ul className="text-gray-700 text-sm">
                        <li className="flex items-center mb-2">
                          <div className="rounded-full bg-green-500 mr-2 p-1">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white text-xs"
                            />
                          </div>
                          Access to exclusive content
                        </li>
                        <li className="flex items-center mb-2">
                          <div className="rounded-full bg-green-500 mr-2 p-1">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white text-xs"
                            />
                          </div>
                          Priority support
                        </li>
                        <li className="flex items-center mb-2">
                          <div className="rounded-full bg-green-500 mr-2 p-1">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white text-xs"
                            />
                          </div>
                          Ad-free experience
                        </li>
                      </ul>
                    </div>
                    <div className="w-full flex justify-center items-center absolute inset-0">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-gray-700 text-3xl animate-bounce ${
                          hoveredf ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    </div>
                    <div
                      className={`${
                        hoveredf ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300 absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center`}
                    >
                      <h4 className="text-white font-bold text-lg mb-2">
                        Upgrade to Premium
                      </h4>
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* first card enmc */}
              <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mt-5 cursor-pointer">
                <div className="card-container">
                  <div
                    className={`relative rounded-lg overflow-hidden border-2 border-gray-200 shadow-xl bg-white transform transition-all duration-300 ${
                      hovered ? "scale-105 shadow-2xl" : "scale-100 shadow-xl"
                    }`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="px-6 py-4">
                      <div className="mb-4">
                        <h3 className="text-gray-900 font-bold text-lg tracking-wide">
                          Enrolled Courses
                        </h3>
                      </div>
                      <ul className="text-gray-700 text-sm">
                        <li className="flex items-center mb-2">
                          <div className="rounded-full bg-green-500 mr-2 p-1">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white text-xs"
                            />
                          </div>
                          Access to course materials
                        </li>
                        <li className="flex items-center mb-2">
                          <div className="rounded-full bg-green-500 mr-2 p-1">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-white text-xs"
                            />
                          </div>
                          Progress tracking
                        </li>
                        <li className="flex items-center mb-2">
                          <div className="rounded-full bg-green-500 mr-2 p-1">
                            <FontAwesomeIcon
                              icon={faGraduationCap}
                              className="text-white text-xs"
                            />
                          </div>
                          Certificate of completion
                        </li>
                      </ul>
                    </div>
                    <div
                      className={`${
                        hovered ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300 absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center`}
                    >
                      <h4 className="text-white font-bold text-lg mb-2">
                        Enrolled Courses
                      </h4>
                      <button onClick={handleMyCourse} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transform transition-all duration-300 hover:scale-105">
                        View courses
                      </button>
                    </div>
                    <div onClick={handleMyCourse}
                      className={`${
                        hovered ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-300 absolute inset-0 flex justify-center items-center`}
                    >
                      <div className="w-full flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`text-gray-700 text-3xl animate-bounce ${
                            hovered ? "opacity-0" : "opacity-100"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="my-6 pt-4">
              <h1 className="text-2xl md:text-3xl lg:text-3xl font-extrabold font-mono">
                Categories
              </h1>
            </div>
            <div>
              {isCategoryLoading ? (
                <LoadingBar />
              ) : (
                <div className="flex justify-center flex-wrap ">
                  {categories.map((card) => (
                    <div
                      key={card.name}
                      className="hover:bg-slate-400 cursor-pointer m-2  w-1/3 md:w-1/6  2xl:w-2/12 max-w-sm rounded overflow-hidden shadow-lg p-4"
                    >
                      <img
                        className="w-full h-20 object-scale-down"
                        src={card.image}
                        alt={card.name}
                      />
                      <div className=" w-auto">
                        <div className="text-center font-light text-xs">
                          {card.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
