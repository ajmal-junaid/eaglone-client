/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pagination from "../../Common/Pagination";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";
import Loading from "../../Common/Spinner";
import instance from "../../../utils/axios";

function AllCouses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getData = () => {
    setIsLoading(true);
    instance.get(`courses?page=${pageNo}`)
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
  const changed=()=>{
    getData()
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {isLoading ? <Loading /> : <Body courses={courses} />}
      <Pagination
        pageNo={parseInt(pageNo)}
        setPageNo={setPageNo}
        totalPages={parseInt(totalPages)}
        changed={changed}
      />
    </div>
  );
}

export default AllCouses;
