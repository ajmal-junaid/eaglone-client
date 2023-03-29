import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBook, FaPlay } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";

function LessonViewPage() {
  const params = useParams();
  console.log(params.id);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  function playVideo() {
    const videoUrl = lessons[selectedLesson - 1].video;
    const videoTitle = lessons[selectedLesson - 1].title;
    const videoPlayer = document.createElement("iframe");
    videoPlayer.className = "absolute top-0 left-0 w-screen h-screen";
    videoPlayer.src = videoUrl;
    videoPlayer.title = videoTitle;
    videoPlayer.sandbox =
      "allow-scripts allow-forms allow-same-origin allow-modals allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-orientation-lock allow-top-navigation-by-user-activation allow-presentation";
    videoPlayer.allowDownloads = false;
    videoPlayer.allowFullScreen = true;
    videoPlayer.allowDownload = false;
    const videoContainer = document.querySelector(".flex.justify-center.mb-4");
    videoContainer.appendChild(videoPlayer);
  }
  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = () => {
    axios({
      method: "get",
      url: `${baseUrl}cours/${params.id}`,
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
        axios({
          method: "get",
          url: `${baseUrl}get-lessons-pcourse/${res.data.data.courseId}`,
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
            console.log(res, "rsponodfshjljk");
            setLessons(res.data.data);
            //setIsLoading(false);
          })
          .catch((res) => {
            console.log(res, "catch");
            sweetAlert("warning", res.response.data.message);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 custom-height">
      {/* Header section */}
      <header className="bg-white shadow px-4 py-2 flex justify-between items-center container mx-auto">
        <h1 className="text-2xl font-bold py-2">{course.title}</h1>
        <div className="flex items-center"></div>
      </header>

      {/* Course overview section */}
      <section className="bg-white mt-4 shadow container mx-auto px-4 py-4">
        <h2 className="text-lg font-bold mb-2">Course Overview</h2>
        <p className="mb-2">{course.description}.</p>
        <p className="mb-2 font-bold">Instructor: John Doe</p>
        <p className="mb-2">Duration: 10 hours</p>
      </section>

      {/* Lesson list section */}
      <section className="container mx-auto px-4 py-4 mt-4 flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <h2 className="text-lg font-bold mb-2">Course Outline</h2>
          {lessons
            ? console.log(selectedLesson, "yess")
            : console.log("nothing")}
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer hover:bg-gray-200 ${
                  selectedLesson === lesson.index ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedLesson(index + 1)}
              >
                <div className="flex items-center">
                  <FaBook className="text-gray-600 mr-2" />
                  <div>
                    <h3 className="text-base font-bold">{lesson.title}</h3>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className=" text-red-500">Lessons under uploading</h1>
          )}
        </div>
        <div className="md:w-2/3">
          {selectedLesson ? (
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-2">
                {lessons[selectedLesson - 1].title}
              </h2>
              <div className="flex justify-center mb-4">
                <div className="absolute h-0" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={lessons[selectedLesson - 1].video}
                    title={lessons[selectedLesson - 1].title}
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="mb-2">{lessons[selectedLesson - 1].lessonId}</p>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
                onClick={playVideo}
              >
                <FaPlay className="text-white mr-2" />
                Watch Video
              </button>
            </div>
          ) : (
            <p className="text-lg text-gray-600">
              Select a lesson from the course outline to get started.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default LessonViewPage;
