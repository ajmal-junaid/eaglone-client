import axios from "axios";
import React, { useEffect, useState } from "react";
import sweetAlert from "../../Common/SweetAlert";
import { baseUrl } from "../../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { adminInstance } from "../../../utils/axios";

function EditLessonForm() {
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
  const params = useParams();
  const navigate = useNavigate();

  const sweetAlertt = (icon = "success", text) => {
    sweetAlert(icon, text);
    setSubmitSuccess(false);
  };
  useEffect(() => {
    getDatas();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  const getDatas = () => {
    adminInstance.get('courses').then((res) => {
      console.log(res.data);
      setOptions(res.data.data);
    });
   adminInstance.get(`lesson/${params.id}`).then((res) => {
      setTitle(res.data.data.title);
      setTutor(res.data.data.tutorName);
      setLessonId(res.data.data.lessonId);
      setCourse(res.data.data.course);
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
        const response = await adminInstance.put(`update-lesson/${params.id}`,formData)

        console.log(response.data);
        if (response.status >= 200 && response.status < 300) {
          if (response.data.err) {
            sweetAlertt("warning", response.data.message);
            setResponse(response.data.message);
          } else {
            navigate("/admin/lessons");
            sweetAlertt("success", response.data.message);
          }

          setSubmitSuccess(false);
        } else {
          setSubmitError("Failed to submit form");
        }
      } catch (error) {
        console.error(error.response);
        setSubmitError(error.response.data.message);
      }
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4 mt-10">
        <div className="text-center w-full">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Edit Lesson
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
            disabled
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

export default EditLessonForm;
