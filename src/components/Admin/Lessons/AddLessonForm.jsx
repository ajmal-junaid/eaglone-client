import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../utils/constants";
import { unSetLessonForm } from "../../../Redux";
import sweetAlert from "../../Common/SweetAlert";

function AddLessonForm() {
  const [title, setTitle] = useState("");
  const [tutor, setTutor] = useState("");
  const [video, setVideo] = useState(null);
  const [lessonId, setLessonId] = useState("");
  const [course, setCourse] = useState("");
  const [options, setOptions] = useState([]);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();

  const sweetAlertt = (icon = "success", text) => {
    sweetAlert(icon, text);
    setSubmitSuccess(false);
  };
  useEffect(() => {
    getCourses();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  const getCourses = () => {
    axios({
      method: "get",
      url: `${baseUrl}admin/courses`,
      headers: {
        "Content-Type": "application/json",
        apikey:
          "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
      },
    })
      .then((res) => {
        console.log(res.data, "waht happend");
        setOptions(res.data.data);
      })
      .catch((error) => {
        console.log(error.response, "catch from courses");
      });
  };
  const handleLessonIdChange = (event) => {
    setLessonId(event.target.value);
  };

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleTutorChange(event) {
    setTutor(event.target.value);
  }
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTitle(title.trim());
    setTutor(tutor.trim());
    setLessonId(lessonId.trim());
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("course", course);
    formData.append("lessonId", lessonId);
    formData.append("tutorName", tutor);
    formData.append("video", video);
    if (lessonId.trim() === "" || tutor.trim() === "") {
      setSubmitError("Entered fields are invalid");
    } else {
      try {
        const response = await axios.post(
          `${baseUrl}admin/add-lesson`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              apikey:
                "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("adminToken")
              )}`,
            },
          }
        );

        console.log(response.data);
        if (response.status >= 200 && response.status < 300) {
          if (response.data.err) {
            sweetAlertt("warning", response.data.message);
            setResponse(response.data.message);
          } else {
            sweetAlertt("success", response.data.message);
            dispatch(unSetLessonForm());
          }

          setSubmitSuccess(false);
        } else {
          setSubmitError("Failed to submit form");
        }
      } catch (error) {
        console.error(error, "catchhh");
        setSubmitError(error.response.data.message);
      }
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Add Lesson
          </h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="lessonID"
          >
            Lesson Id:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="lessonId"
            type="text"
            value={lessonId}
            onChange={handleLessonIdChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tutor">
            Tutor Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="tutor"
            value={tutor}
            onChange={handleTutorChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Course:
          </label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={course}
            onChange={handleCourseChange}
            required
          >
            <option value="">Select a Course</option>
            {options &&
              options.map((option) => (
                <option key={option.courseId} value={option.courseId}>
                  {option.title}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Video:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="video"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </div>
        <div className="flex justify-center">
          {submitError && <div>Error: {submitError}</div>}
          {submitSuccess ? sweetAlertt("warning", response) : ""}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddLessonForm;
