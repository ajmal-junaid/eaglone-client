/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/constants";
import Pagination from "../../Common/Pagination";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";
import Loading from "../../Common/Spinner";

function AllCouses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getData = () => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `${baseUrl}courses?page=${pageNo}`,
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
        setPageNo(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setCourses(res.data.data);
        setIsLoading(false);
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  useEffect(() => {
    getData();
  }, [pageNo]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading ? <Loading /> : <Body courses={courses} />}
      <Pagination
        pageNo={parseInt(pageNo)}
        setPageNo={setPageNo}
        totalPages={parseInt(totalPages)}
      />
    </div>
  );
}

export default AllCouses;
