import React, { useEffect, useState } from "react";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";
import instance from "../../../utils/axios";

function CourseDetails({ id }) {
  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [category, setCategory] = useState({});
  const getData = (courseId) => {
    instance.get(`course/${courseId}`)
      .then((res) => {
        setCourse(res.data.data);
       instance.get(`category-details/${res.data.data.category}`)
          .then((res) => {
            setCategory(res.data.data);
          })
          .catch((res) => {
            console.log(res, "catch");
            sweetAlert("warning", res.response.data.message);
          });
        //setIsLoading(false);
      })
      .catch((res) => {
        console.log(res, "catch");
        sweetAlert("warning", res.response.data.message);
      });
   instance.get(`get-lessons-course/${courseId}`)
      .then((res) => {
        setLessons(res.data.data);
        //setIsLoading(false);
      })
      .catch((res) => {
        console.log(res, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  useEffect(() => {
    getData(id);
  }, []);
  return (
    <div>
      <div className="bg-gray-100 py-10">
        <Body course={course} lessons={lessons} category={category} />
      </div>
    </div>
  );
}

export default CourseDetails;
