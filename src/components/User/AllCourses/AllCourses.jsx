import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/constants";
import Pagination from "../../Common/Pagination";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";
import Loading from "../../Common/Spinner";

function AllCouses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const userData = useSelector((state) => state.userData.value);
  const getData = () => {
    setIsLoading(true);
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
  };
  useEffect(() => {
    console.log(userData, "iam from course user");
    getData();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? <Loading /> : <Body courses={courses} />}
        <Pagination />
      </div>
    </div>
  );
}

export default AllCouses;
