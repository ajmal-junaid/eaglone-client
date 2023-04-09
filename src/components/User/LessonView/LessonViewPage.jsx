import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBook, FaPause, FaPlay, FaSpinner } from "react-icons/fa";
import sweetAlert from "../../Common/SweetAlert";
import instance from "../../../utils/axios";
import Video from "./components/Video";
import RatingSystem from "./components/RatingSystem";
import CommentBox from "./components/CommentBox";
import Swal from "sweetalert2";
import calculateRating from "../../Common/calculateRating";
import Rating from "../../Common/Rating";
import { useSelector } from "react-redux";

function LessonViewPage() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [avg, setAvg] = useState(0);
  const [comment, setComment] = useState("");
  const videoRef = useRef(null);
  const userData = useSelector((state) => state.userData.value);
  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video.paused) {
      setIsPlaying(true);
      video.play();
    } else {
      setIsPlaying(false);
      video.pause();
    }
  };

  function handleRewind() {
    videoRef.current.currentTime -= 10;
  }

  function handleVolumeChange(event) {
    videoRef.current.volume = event.target.value;
  }
  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = () => {
    instance
      .get(`cours/${params.id}`)
      .then((res) => {
        setCourse(res.data.data);
        setAvg(calculateRating(res.data.data.rating));
        const data = res.data.data?.rating?.find((obj) => obj.user = userData._id)
        setComment(data.comment)
        setRating(data.rating)
        instance
          .get(`get-lessons-pcourse/${res.data.data.courseId}`)
          .then((res) => {
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
  const lessonChange = (val, lessonId) => {
    setSelectedLesson(val);
    setUrl("");
    instance
      .get(`video?id=${lessonId}`)
      .then((res) => {
        setUrl(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleRating = () => {
    instance
      .post("rate-course", {
        courseId: course._id,
        rating: rating,
        comment: comment,
      })
      .then(() => {
        alert("success");
      })
      .catch((err) => {
        new Swal("Error", err.response.data.message, "warning");
      });
  };
  const isUserCommented = () => {
    return (
      course &&
      course?.rating?.find((obj) => obj.user === userData._id) !== undefined
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 custom-height">
      <header className="bg-white shadow px-4 py-2 flex justify-between items-center container mx-auto">
        <h1 className="text-2xl font-bold py-2">
          {course.title}{" "}
          <span className="text-sm">{avg ? "⭐️" + avg : "Not rated"}</span>
        </h1>
        <div className="flex items-center"></div>
      </header>
      <div className="flex">
        <section className="bg-white mt-4 shadow container mx-auto px-4 py-4">
          <h2 className="text-lg font-bold mb-2">Course Overview</h2>
          <p className="mb-2">{course.description}.</p>
          <p className="mb-2 font-bold">Instructor: John Doe</p>
          <p className="mb-2">Duration: 10 hours</p>
        </section>
        <section className="bg-white mt-4 shadow container mx-auto px-4 py-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-2">Rate The Course</h2>
            <div className="ml-auto">
              {isUserCommented() ? (
                <button
                  disabled
                  className="px-2 py-1 rounded-md bg-green-500 text-white text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Commented
                </button>
              ) : (
                <button
                  onClick={handleRating}
                  className="px-2 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
          <div className="mb-2">
            <RatingSystem rating={rating} setRating={setRating} />
          </div>
          <div className="mb-2">
            <CommentBox comment={comment} setComment={setComment} />
          </div>
        </section>
      </div>
      <section className="container mx-auto px-4 py-4 mt-4 flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <h2 className="text-lg font-bold mb-2">Course Outline</h2>
          <div className=" h-40 overflow-auto">
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${
                    selectedLesson === lesson.index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => lessonChange(index + 1, lesson._id)}
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
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900">Comments </h4>
            <ul className="mt-4 text-gray-500 text-sm h-32 overflow-auto">
              {course && course?.rating?.length > 0 ? (
                course.rating.map((rating, index) => (
                  <li
                    key={index}
                    className="mt-2 w-full max-w-md rounded overflow-hidden shadow-lg"
                  >
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        <Rating rating={rating.rating} />
                      </div>
                      <p className="text-gray-700 text-base">
                        {rating.comment}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="mt-2 text-red-600">Modules Uploading Soon</li>
              )}
            </ul>
          </div>
        </div>

        <div className="md:w-full border">
          {selectedLesson ? (
            <div className="flex flex-col items-center ">
              <h2 className="text-lg font-bold mb-2">
                {lessons[selectedLesson - 1].title}
              </h2>
              {url ? (
                <Video
                  url={url}
                  lessons={lessons}
                  selectedLesson={selectedLesson}
                  videoRef={videoRef}
                />
              ) : (
                <div className="flex justify-center items-center py-32">
                  <FaSpinner className="animate-spin h-5 w-5 mr-3" />
                  <span>Loading...</span>
                </div>
              )}

              <p className="mb-2">{lessons[selectedLesson - 1].lessonId}</p>
              {url && (
                <div className="flex flex-row justify-self-start border w-1/2">
                  {isPlaying ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg "
                      onClick={handlePlayPause}
                    >
                      <FaPause className="text-white mr-2" />
                      Pause
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg "
                      onClick={handlePlayPause}
                    >
                      <FaPlay className="text-white mr-2" />
                      Play
                    </button>
                  )}

                  <button className="ml-5" onClick={handleRewind}>
                    Rewind
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="1"
                    onChange={handleVolumeChange}
                    className="ml-6"
                  />
                </div>
              )}
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
