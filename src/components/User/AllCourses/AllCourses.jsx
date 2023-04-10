/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Pagination from "../../Common/Pagination";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";
import Loading from "../../Common/Spinner";
import instance from "../../../utils/axios";
import SearchBar from "../../Common/SearchBar";

function AllCouses() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const getData = () => {
    setIsLoading(true);
    instance
      .get(`courses?page=${pageNo}`)
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
  const changed = () => {
    getData();
    setMessage("");
  };
  useEffect(() => {
    getData();
    setMessage("");
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
      <div>
        <SearchBar
          setCourses={setCourses}
          reset={changed}
          setMessage={setMessage}
        />
        {message && (
          <p className="transition-all ease-linear mt-4 p-3 flex items-center justify-center border border-red-400 font-medium mx-96">
            {message}
          </p>
        )}
      </div>

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
