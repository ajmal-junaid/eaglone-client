import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";
import instance from "../../../utils/axios";
import { SyncLoader } from "react-spinners";

function Purchased() {
  const [courses, setCourses] = useState([]);
  const params = useParams();
  useEffect(() => {
    instance
      .get(`get-purchased-courses/${params.id}`)
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((res) => {
        console.log(res.response, "catch");
        //setMessage(res.response.data.message);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900">
        Purchased /Enrolled Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {courses.length ? (
          courses.map((course) => (
            <CourseCard
              key={course._id}
              _id={course._id}
              title={course.title}
              instructor={course.tutorName}
              thumbnail={course.image}
              rating={course.rating}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-96">
            <SyncLoader size={15} color="#3B82F6" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchased;
