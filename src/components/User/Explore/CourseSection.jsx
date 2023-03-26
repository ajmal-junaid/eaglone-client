import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import Spinner from "../../Common/Spinner";
import Pagination from "../../Common/Pagination";

function CourseSection({ current }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    getDatas();
  }, [current, pageNo]);

  const getDatas = () => {
    if (current) {
      axios({
        method: "get",
        url: `${baseUrl}get-course-category/${current}`,
        headers: {
          "Content-Type": "application/json",
          apikey:
            "get $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
        },
      })
        .then((res) => {
          setCourses(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response, "catch");
          sweetAlert("warning", err.response.data.message);
        });
    } else {
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
          console.log(res, "catch");
          sweetAlert("warning", res.response.data.message);
        });
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-x-auto px-3 flex flex-col h-screen  pt-16 pb-10  w-3/4 "
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          <li
            key="header"
            className="hidden sm:inline translate-y-px text-center text-xl pb-10"
          >
            <h1 className="font-bold  mt-5 border text-2xl border-b-gray-900">
              Courses
            </h1>
          </li>
          {isLoading ? (
            <Spinner />
          ) : (
            courses.map((data) => (
              <li
                key={data._id}
                className="flex flex-row m-2 h-24 container border border-black"
              >
                <img
                  className="md:w-2/12 object-contain m-2 border border-gray"
                  src={data.image}
                />
                <div className="w-full">
                  <h1 className="font-semibold pl-3 pt-2 w-64">{data.title}</h1>
                  <h1 className="font-thin pl-2 pt-2">{data.description}</h1>
                </div>
              </li>
            ))
          )}
          <Pagination
            pageNo={parseInt(pageNo)}
            setPageNo={setPageNo}
            totalPages={parseInt(totalPages)}
          />
        </motion.ul>
      </AnimatePresence>
    </>
  );
}

export default CourseSection;
