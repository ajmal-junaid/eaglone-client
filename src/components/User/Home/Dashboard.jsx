import axios from "axios";
import React, { useEffect, useState } from "react";
import bannerImage from "../../../asset/banner.jpg";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import Loading from "../../Common/Loading";
import LoadingBar from "../../Common/Loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setCatagoryLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const userData = useSelector((state) => state.userData.value);
  const navigate = useNavigate();

  const handleMyCourse = () => {
    console.log("fdshjkdsafhjk");
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

  return (
    <>
      <div className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="w-full">
          <div>
            <img
              className="min-w-full object-center max-h-56"
              src={bannerImage}
              alt="banner"
            ></img>
          </div>
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
              <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mt-5">
                <div className="card-container">
                  <div className="rounded-lg shadow-md bg-customGreen">
                    <div className="flex items-center mb-4">
                      <div className="w-full text-center mt-10 tracking-widest">
                        <h3 className="relative text-xl lg:text-4xl font-bold font-serif tracking-widest leading-relaxed">
                          Premium Benefits
                        </h3>
                      </div>
                      <div className="rounded-full pr-10 mt-10 ">
                        <svg
                          width="75"
                          height="75"
                          viewBox="0 0 75 75"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M56.9223 8.03571C57.2401 8.03544 57.5534 8.11057 57.8365 8.25491C58.1196 8.39926 58.3645 8.60871 58.5509 8.86606L58.6955 9.0991L69.4286 29.2232L69.5438 29.4964L69.5732 29.5982L69.6188 29.8045L69.6455 30.0402L69.6402 30.308L69.6455 30.1339C69.6463 30.4064 69.5916 30.6761 69.4848 30.9268L69.4045 31.0875L69.2973 31.2643L69.158 31.4491L39.1072 66.1741C38.8501 66.5181 38.4866 66.7676 38.0732 66.8839L37.9179 66.9214L37.658 66.9589L37.5 66.9643L37.2321 66.9455L37.0018 66.9027L36.7259 66.8116L36.6563 66.7795C36.4084 66.6689 36.1873 66.5063 36.008 66.3027L5.81786 31.4089L5.65179 31.1759L5.52322 30.9268L5.42947 30.6589L5.36786 30.3107V29.9678L5.40804 29.7027L5.43482 29.5955L5.52322 29.3411L5.59822 29.1884L16.3125 9.0991C16.4618 8.81909 16.6754 8.57844 16.9356 8.39686C17.1959 8.21528 17.4955 8.09794 17.8098 8.05446L18.0804 8.03571H56.9197H56.9223ZM47.9652 32.1428H27.0321L37.5054 59.3571L47.9652 32.1428ZM22.733 32.1428H11.7589L31.508 54.9589L22.7304 32.1428H22.733ZM63.2384 32.1428H52.275L43.508 54.9402L63.2411 32.1428H63.2384ZM26.8527 12.0509H19.2857L10.7143 28.125H22.5643L26.8527 12.0509ZM43.9955 12.0509H31.0098L26.7241 28.125H48.2786L43.9929 12.0509H43.9955ZM55.717 12.0509H48.15L52.4384 28.125H64.2857L55.717 12.0509Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gray-100 rounded-full p-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.15002 21.1C6.90002 20.85 6.77502 20.554 6.77502 20.212C6.77502 19.8707 6.90002 19.575 7.15002 19.325L14.475 12L7.12502 4.65C6.89169 4.41667 6.77502 4.125 6.77502 3.775C6.77502 3.425 6.90002 3.125 7.15002 2.875C7.40002 2.625 7.69602 2.5 8.03802 2.5C8.37936 2.5 8.67502 2.625 8.92502 2.875L17.325 11.3C17.425 11.4 17.496 11.5083 17.538 11.625C17.5794 11.7417 17.6 11.8667 17.6 12C17.6 12.1333 17.5794 12.2583 17.538 12.375C17.496 12.4917 17.425 12.6 17.325 12.7L8.90002 21.125C8.66669 21.3583 8.37936 21.475 8.03802 21.475C7.69602 21.475 7.40002 21.35 7.15002 21.1Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mt-5 cursor-pointer">
                <div className="card-container" onClick={handleMyCourse}>
                  <div className="rounded-lg shadow-md bg-customGreen">
                    <div className="flex items-center mb-4">
                      <div className="w-full text-center mt-10 tracking-widest">
                        <h3 className="relative text-xl lg:text-4xl font-bold font-serif tracking-widest leading-relaxed">
                          Enrolled Courses
                        </h3>
                      </div>
                      <div className="rounded-full pr-10 mt-10 ">
                        <svg
                          width="68"
                          height="68"
                          viewBox="0 0 68 68"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_3_176)">
                            <path
                              d="M63.75 42.3672C63.7721 42.4115 63.7832 42.7324 63.7832 43.3301C63.7832 43.9277 63.7943 44.6914 63.8164 45.6211C63.8385 46.5508 63.8385 47.6243 63.8164 48.8418C63.7943 50.0592 63.7943 51.2878 63.8164 52.5273C63.8385 53.7669 63.8275 55.0286 63.7832 56.3125C63.7389 57.5964 63.7389 58.7253 63.7832 59.6992C63.8275 60.6732 63.8164 61.5475 63.75 62.3223C63.6836 63.097 63.6836 63.5729 63.75 63.75H0V59.7324C0 58.6921 -0.0110677 57.5521 -0.0332031 56.3125C-0.0553385 55.0729 -0.0553385 53.8223 -0.0332031 52.5605C-0.0110677 51.2988 -0.0221354 50.0592 -0.0664062 48.8418C-0.110677 47.6243 -0.110677 46.5618 -0.0664062 45.6543C-0.0221354 44.7467 -0.0221354 43.972 -0.0664062 43.3301C-0.110677 42.6882 -0.0885417 42.3672 0 42.3672L12.7168 4.25H25.5V8.5H15.7715L4.44922 42.5H18.3281L22.5781 51H41.1719L45.4219 42.5H59.3008L47.9785 8.5H38.25V4.25H51.0332L63.75 42.3672ZM59.5 46.75H48.0781L43.8281 55.25H19.9219L15.6719 46.75H4.25V59.5H59.5V46.75ZM29.75 30.9785V0H34V30.9785L43.7617 21.25L46.75 24.2383L31.875 39.1133L17 24.2383L19.9883 21.25L29.75 30.9785Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3_176">
                              <rect width="68" height="68" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gray-100 rounded-full p-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.15002 21.1C6.90002 20.85 6.77502 20.554 6.77502 20.212C6.77502 19.8707 6.90002 19.575 7.15002 19.325L14.475 12L7.12502 4.65C6.89169 4.41667 6.77502 4.125 6.77502 3.775C6.77502 3.425 6.90002 3.125 7.15002 2.875C7.40002 2.625 7.69602 2.5 8.03802 2.5C8.37936 2.5 8.67502 2.625 8.92502 2.875L17.325 11.3C17.425 11.4 17.496 11.5083 17.538 11.625C17.5794 11.7417 17.6 11.8667 17.6 12C17.6 12.1333 17.5794 12.2583 17.538 12.375C17.496 12.4917 17.425 12.6 17.325 12.7L8.90002 21.125C8.66669 21.3583 8.37936 21.475 8.03802 21.475C7.69602 21.475 7.40002 21.35 7.15002 21.1Z"
                            fill="black"
                          />
                        </svg>
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
