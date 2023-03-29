import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import CourseCard from "./CourseCard";

function Purchased() {
  const [courses, setCourses] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}get-purchased-courses/${params.id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("userToken")
        )}`,
        apikey:
          "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setCourses(res.data.data);
        console.log(res.data.data);

        //setIsLoading(false);
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
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            _id={course._id}
            title={course.title}
            instructor={course.tutorName}
            thumbnail={course.image}
            rating={course.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Purchased;
