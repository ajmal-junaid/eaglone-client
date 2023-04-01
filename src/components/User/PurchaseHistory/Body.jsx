import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";

function Body() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}get-orders/${params.id}`,
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
        setOrders(res.data.data);
        console.log(res.data.data);

        //setIsLoading(false);
      })
      .catch((res) => {
        console.log(res.response, "catch");
        //setMessage(res.response.data.message);
      });
  }, []);
  const params = useParams();
  console.log(params.id, "id daaaaaaaaa");
 
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="#" className="text-lg font-bold">
              <h1 className="text-3xl font-bold">Purchase History</h1>
            </a>
            {/* <div className="flex items-center">
              <input
                type="search"
                placeholder="Search"
                className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <a
                href="#"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition duration-200"
              >
                Search
              </a>
            </div> */}
          </div>
        </header>

        <div className="container mx-auto px-4 mt-5">
          <div className="">
           
                <CourseCard
                 
                  orders={orders}
                />
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
