import axios from "axios";
import React, { useEffect, useState } from "react";
import {baseUrl} from '../../../utils/constants'
function Dashboard() {
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    getUsers()
  },[])
  const getUsers=()=>{
    axios({
      method:'get',
      url:`${baseUrl}admin/users`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      console.log(res.data.userData);
      setRows(res.data.userData)
      console.log(rows)
    })
  }
  const headers = ["No", "Name", "Email", "Mobile","Status"];
  return (
    <>
      <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="text-2xl font-bold leading-tight text-gray-800">
            User Management
          </h4>
          {/* <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
            <li className="flex items-center mr-3 mt-3 md:mt-0">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paperclip" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                </svg>
              </span>
              <span>Active</span>
            </li>
            <li className="flex items-center mr-3 mt-3 md:mt-0">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="3 17 9 11 13 15 21 7" />
                  <polyline points="14 7 21 7 21 14" />
                </svg>
              </span>
              <span> Trending</span>
            </li>
            <li className="flex items-center mt-3 md:mt-0">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plane-departure" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z" transform="rotate(-15 12 12) translate(0 -1)" />
                  <line x1={3} y1={21} x2={21} y2={21} />
                </svg>
              </span>
              <span>Started on 29 Jan 2020</span>
            </li>
          </ul> */}
        </div>
        <div className="mt-6 lg:mt-0">
          {/* <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">
            Blocked Users
          </button> */}
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="w-full rounded">
          <div className="max-w-7xl sm:px-2 ">
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {headers.map((header, index) => (
                      <th key={index} className="py-3 px-6 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  
                  {true && rows?.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                     <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                     <td className="py-3 px-6 text-left whitespace-nowrap">{user.email}</td>
                     <td className="py-3 px-6 text-left whitespace-nowrap">{user.mobile}</td>
                     <td className="py-3 px-6 text-left whitespace-nowrap">{user.active?"Active":"Deactivated"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
