import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import sweetAlert from "../../Common/SweetAlert";
import { adminInstance } from "../../../utils/axios";

function Body() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const headers = ["No", "orderId", "Date", "Total amount", "Payment Status"];
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    adminInstance
      .get("orders")
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("adminToken");
          navigate("/admin");
        }
        sweetAlert("warning", res.message);
      });
  };
  return (
    <>
      <div className="my-3 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="text-2xl font-bold leading-tight text-gray-800">
            Home
          </h4>
          <h6 className="text-sm font-mono leading-tight mt-2 text-gray-800">
            Last Transactions
          </h6>
        </div>
        <div className="mt-6 lg:mt-0"></div>
      </div>
      <div className="container mx-auto px-6">
        <div className="w-full rounded">
          <div className="max-w-7xl sm:px-2 ">
            <div className="bg-white shadow-md rounded my-6 custom-height">
              <table className="min-w-max w-full table-auto ">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {headers.map((header, index) => (
                      <th key={index} className="py-3 px-6 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light ">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {order._id}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {order.createdAt.slice(0, 10)}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {order.totalAmount}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {order.client}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
