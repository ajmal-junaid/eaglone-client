import React from "react";
import { FaStar, FaRegSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUserData } from "../../../../Redux";
import { useNavigate } from "react-router-dom";
import instance from "../../../../utils/axios";

function Body({ course, lessons, category }) {
  const { _id } = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = (courseId) => {
   instance.post('add-to-cart',{
    userId: _id,
    courseId: courseId,
  })
      .then((res) => {
        new Swal("success", res.data.message, "success");
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("auth");
          dispatch(
            setUserData({
              userData: { name: null, email: null, mobile: null, _id: null },
            })
          );
          navigate("/user/login");
        }
        new Swal("warning", res.response.data.message, "warning");
      });
  };
  
  const enrollCourse = (courseId) => {
   instance.post('add-free-course',{
    userId: _id,
    courseId: courseId,
  })
      .then((res) => {
        new Swal("success", res.data.message, "success");
      })
      .catch((res) => {
        if (res.response.status >= 401 && res.response.status <= 403) {
          localStorage.removeItem("userToken");
          localStorage.removeItem("auth");
          dispatch(
            setUserData({
              userData: { name: null, email: null, mobile: null, _id: null },
            })
          );
          navigate("/user/login");
        }
        new Swal("warning", res.response.data.message, "warning");
      });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {course.title}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaStar className="mr-1 h-4 w-4 text-yellow-500" />
              <span className="font-medium">{course.rating}</span>
              <span className="mx-2"></span>
              {/* <span>1,500 ratings</span> */}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaRegSquare className="mr-1 h-4 w-4" />
              <span>{course.category}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <span className="ml-3 inline-flex rounded-md shadow-sm">
            {course.price > 0 ? (
              <button
                type="button"
                onClick={() => addToCart(course._id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add to cart
              </button>
            ) : (
              <button
                type="button"
                onClick={() => enrollCourse(course._id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enroll now
              </button>
            )}
          </span>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-10">
          <img
            className="w-full object-cover object-center rounded-lg shadow-lg p-2"
            src={course.image}
            alt="Course"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg font-medium text-gray-900">
            About this course
          </h3>
          <div className="mt-4 text-gray-500 text-sm">
            <p>{course.description}</p>
            <p className="mt-4">Category - {category.description}.</p>
          </div>
          <div className="mt-4 text-gray-500 text-sm">
            <p> -&gt; Life time access</p>
            <p className="mt-4">-&gt; 6 Months Support</p>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900">
              What you&lsquo;ll learn
            </h4>
            <ul className="mt-4 text-gray-500 text-sm">
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <li key={lesson} className="mt-2">
                    {index + 1} : {lesson.title}
                  </li>
                ))
              ) : (
                <li className="mt-2 text-red-600">Modules Uploading Soon</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 max-h-52 overflow-auto">
        <h4 className="text-lg font-semibold text-gray-900">Course content</h4>
        <ul className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          <li className="py-4 flex">
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">
                Welcome to the {course.title} Tutorials
              </p>
              <p className="mt-1 text-sm text-gray-500">{course.description}</p>
            </div>
          </li>
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <li key={lesson._id} className="py-4 flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Chapter {index + 1} : {lesson.title}
                  </p>
                  <ul className="mt-1 text-sm text-gray-500 list-disc pl-3">
                    <li className="mt-2">Tutor : {lesson.tutorName}</li>
                    <li className="mt-2">
                      Eaque ipsa quae ab illo inventore veritatis et quasi
                      architecto beatae vitae dicta sunt explicabo.
                    </li>
                  </ul>
                </div>
              </li>
            ))
          ) : (
            <li className="mt-1 text-sm text-red-500 list-disc pl-3">
              Modules Uploading Soon
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Body;
