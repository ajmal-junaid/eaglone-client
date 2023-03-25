import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";

function CourseDetails({ id }) {
  const [course, setCourse] = useState({});
  const getData = (courseId) => {
    axios({
      method: "get",
      url: `${baseUrl}course/${courseId}`,
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
        setCourse(res.data.data);
        console.log(course, "cooo");
        //setIsLoading(false);
      })
      .catch((res) => {
        console.log(res, "catch");
        sweetAlert("warning", "res.response.data.message");
      });
  };
  useEffect(() => {
    getData(id);
  }, []);
  return (
    <div>
      <div className="bg-gray-100 py-10">
        <Body course={course} />
      </div>
    </div>
  );
}

export default CourseDetails;
