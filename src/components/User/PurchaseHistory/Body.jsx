import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useParams } from "react-router-dom";
import instance from "../../../utils/axios";

function Body() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
   instance.get(`get-orders/${params.id}`)
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
