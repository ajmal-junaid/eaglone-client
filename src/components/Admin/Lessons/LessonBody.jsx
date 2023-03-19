import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import AddLessonForm from "./AddLessonForm";
import Modal from "react-modal";
import { setLessonForm, unSetLessonForm } from "../../../Redux";
import { useDispatch, useSelector } from "react-redux";
import sweetAlert from "../../Common/SweetAlert";

function LessonBody() {
  const [lessons, setLessons] = useState([]);
  const modalIsOpen = useSelector((state) => state.lessonForm.value);
  const dispatch = useDispatch();
  useEffect(() => {
    getLessons();
  }, []);
  const getLessons = () => {
    axios({
      method: "get",
      url: `${baseUrl}admin/lessons`,
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("adminToken")
        )}`,
        apikey:
          "getlesson $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setLessons(res.data.data);
      })
      .catch((res) => {
        console.log(res.response.data, "catch");
        sweetAlert(
          "warning",
          res.response.data.message
            ? res.response.data.message
            : "something went wrong"
        );
      });
  };
  function openModal() {
    dispatch(setLessonForm());
  }

  function closeModal() {
    dispatch(unSetLessonForm());
  }
  const headers = ["No", "LessonId", "Title", "Course", "Tutor", "Actions"];

  return (
    <>
      <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="text-2xl font-bold leading-tight text-gray-800">
            Lesson Management
          </h4>
        </div>
        <div className="mt-6 lg:mt-0">
          <button
            onClick={openModal}
            className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Add Lesson
          </button>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              margin: "auto",
              position: "relative",
            },
          }}
        >
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 1 0 1.414-1.414L11.414 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <AddLessonForm />
        </Modal>
        <div className="w-full rounded">
          <div className="max-w-7xl sm:px-2 ">
            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {headers.map((header, index) => (
                      <th key={index} className="py-3 px-6 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {lessons &&
                    lessons.map((lesson, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {lesson.lessonId}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {lesson.title}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {lesson.course}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {lesson.tutorName}
                        </td>

                        <td className="px-6 py-4 md:py-6 md:px-8 text-sm md:text-base font-medium leading-5 text-gray-800 ">
                          <Link
                            className="bg-emerald-300 hover:bg-emerald-500 text-gray-800 text-xs py-1 px-3 ml-4 rounded"
                            to={`update-lesson/${lesson._id}`}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonBody;
