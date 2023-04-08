import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sweetAlert from "../../Common/SweetAlert";
import Spinner from "../../Common/Spinner";
import Pagination from "../../Common/Pagination";
import { useNavigate } from "react-router-dom";
import instance from "../../../utils/axios";

function CourseSection({ current }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getDatas = () => {
    if (current) {
     instance.get( `get-course-category/${current}`)
        .then((res) => {
          setCourses(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response, "catch");
          sweetAlert("warning", err.response.data.message);
        });
    } else {
      instance.get(`courses?page=${pageNo}`)
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
  const changed = () => {
    console.log("working");
    getDatas();
  };
  useEffect(() => {
    setIsLoading(true);
    getDatas();
  }, [current]);
  const handleCourse = (id) => {
    navigate(`/user/course/${id}`);
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
                onClick={() => handleCourse(data.courseId)}
                className="cursor-pointer flex flex-row m-2 h-24 container border border-black hover:border-green-400"
              >
                <img
                  className="md:w-2/12 object-contain m-2 border border-gray hover:scale-110"
                  src={data.image}
                />
                <div className="w-full">
                  <h1 className="font-semibold pl-3 pt-2 w-64">{data.title}</h1>
                  <h1 className="font-thin pl-2 pt-2">{data.description}</h1>
                </div>
              </li>
            ))
          )}
          {!isLoading && (
            <Pagination
              pageNo={parseInt(pageNo)}
              setPageNo={setPageNo}
              totalPages={parseInt(totalPages)}
              changed={changed}
            />
          )}
        </motion.ul>
      </AnimatePresence>
    </>
  );
}

export default CourseSection;
