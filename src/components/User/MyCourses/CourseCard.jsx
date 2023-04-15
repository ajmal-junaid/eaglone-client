import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import calculateRating from "../../Common/calculateRating";

function CourseCard({ title, instructor, rating, thumbnail, _id }) {
  const navigate = useNavigate();
  const handleCourse = (courseId) => {
    navigate(`/user/private-lesson/${courseId}`);
  };
  return (
    <div
      className="flex items-center p-4 bg-white shadow rounded-lg border hover:bg-slate-200 cursor-pointer"
      onClick={() => handleCourse(_id)}
    >
      <img className="w-20 h-20 mr-4" src={thumbnail} alt={title} />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{instructor}</p>
        <div className="flex items-center mt-2">
          <span className="text-sm font-medium text-yellow-500">
            {calculateRating(rating)}⭐
          </span>
          <FaAngleRight className="w-4 h-4 ml-2 text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
