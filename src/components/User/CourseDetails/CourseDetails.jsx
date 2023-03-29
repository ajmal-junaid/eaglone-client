import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import Body from "./Components/Body";

function CourseDetails({ id }) {
  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [category, setCategory] = useState({});
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
        console.log(res.data, "res from Course Details");
        setCourse(res.data.data);
        axios({
          method: "get",
          url: `${baseUrl}category-details/${res.data.data.category}`,
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
    axios({
      method: "get",
      url: `${baseUrl}get-lessons-course/${courseId}`,
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
