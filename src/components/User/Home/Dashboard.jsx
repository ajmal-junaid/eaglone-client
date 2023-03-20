import axios from "axios";
import React, { useEffect, useState } from "react";
import bannerImage from "../../../asset/banner.jpg";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";

function Dashboard() {
  const [courses, setCourses] = useState([]);
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
      })
      .catch((res) => {
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  const cardsData = [
    {
      title: "Card 1",
      description: "Duis au.",
      image: "https://via.placeholder.com/500x400",
    },
    {
      title: "Card 2",
      description: "Duis au.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Card 3",
      description: "Duis au.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Card 4",
      description: "Duis au.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Card 5",
      description: "Duis au.",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Card 6",
      description: "Duis au.",
      image: "https://via.placeholder.com/300x200",
    },
  ];
  return (
    <>
      <div className="container mx-auto px-6 my-6 flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4">
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
              <div className="flex justify-center flex-wrap">
                {courses.map((card) => (
                  <div
                    key={card.title}
                    className="relative w-1/2 md:w-1/3 lg:w-1/6 max-w-sm rounded overflow-hidden shadow-lg p-4 flex-row"
                  >
                    <img
                      className="w-full h-36 max-h-fit object-fill p-2"
                      src={card.image}
                      alt={card.title}
                    />

                    <div className="px-1 py-1 mb-3">
                      <div className="font-bold text-lg mb-1">{card.title}</div>
                      <p className="text-gray-700 text-base">{card.category}</p>
                    </div>
                    <div className="text-right text-sm bottom-2 right-2 absolute">
                      <span className="text-gray-700">2023</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16 container">
            <div className="flex justify-center flex-wrap -mx-2">
              <div className="card-container px-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 ">
                <div className="bg-white rounded-lg shadow-md p-4 bg-cyan-300">
                  <div className="flex items-center mb-4">
                    <div className="w-3/4 text-center p-2 tracking-widest">
                      <h3 className="relative text-5xl font-medium tracking-widest leading-tight">
                        Premium Benefits
                      </h3>
                    </div>
                    <div className="bg-gray-300 rounded-full p-2 mr-2">
                      Icon
                    </div>
                  </div>
                  {/* <p className="text-gray-700 leading-relaxed mb-4">Content</p> */}
                  {true && (
                    <div className="flex justify-end">
                      <div className="bg-gray-100 rounded-full p-2">
                        Bottom Icon
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-container px-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mt-4 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 ">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium">Title</h3>
                    <div className="bg-gray-300 rounded-full p-2 mr-2">
                      Icon
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">Content</p>
                  {true && (
                    <div className="flex justify-end">
                      <div className="bg-gray-300 rounded-full p-2">
                        Bottom Icon
                      </div>
                    </div>
                  )}
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
              <div className="flex justify-center flex-wrap">
                {cardsData.map((card) => (
                  <div
                    key={card.title}
                    className="w-1/3 md:w-1/6  2xl:w-1/12 max-w-sm rounded overflow-hidden shadow-lg p-4"
                  >
                    <img
                      className="w-full h-20 object-cover"
                      src={card.image}
                      alt={card.title}
                    />
                    <div className="py-1">
                      <div className="text-center font-bold text-lg mb-1">
                        {card.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
