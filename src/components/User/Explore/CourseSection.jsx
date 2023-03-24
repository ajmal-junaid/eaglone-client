import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";

function CourseSection({ current }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getDatas();
  }, [current]);

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
        })
        .catch((err) => {
          console.log(err.response, "catch");
          sweetAlert("warning", err.response.data.message);
        });
    } else {
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
          {courses.map((data) => (
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
          ))}
          <li
            key="pagination"
            className="flex flex-row m-2 h-24 container justify-center"
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-gray">
                  1
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900 dark:text-gray">
                  10
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-gray">
                  100
                </span>{" "}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0 gap-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Prev
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </button>
              </div>
            </div>
          </li>
        </motion.ul>
      </AnimatePresence>
    </>
  );
}

export default CourseSection;
