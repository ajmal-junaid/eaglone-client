import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/constants";
import Pagination from "../../Common/Pagination";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";

function AllCouses() {
  const [courses, setCourses] = useState([]);
  const userData = useSelector((state) => state.userData.value);
  useEffect(() => {
    console.log(userData, "iam from course user");
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
  }, []);
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Body courses={courses} />
        <Pagination />
      </div>
    </div>
  );
}

export default AllCouses;
