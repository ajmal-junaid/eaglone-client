import React from "react";
import { useNavigate } from "react-router-dom";
import calculateRating from "../../../Common/calculateRating";

const Popular = ({ courses }) => {
  const navigate = useNavigate();
  const handleCourse = (id) => {
    navigate(`/user/course/${id}`);
  };
  return (
    <div className="flex flex-no-wrap overflow-y-auto">
      {courses.map((card) => (
        <div
          onClick={() => handleCourse(card.courseId)}
          key={card.title}
          style={{
            scrollBehavior: "smooth",
            scrollLeft: "scrollLeft",
          }}
          className="cursor-pointer mr-10  border relative w-1/2 md:w-1/3 lg:w-1/6 max-w-sm rounded overflow-hidden shadow-lg  flex-row hover:bg-slate-100 hover:translate-y-1.5"
        >
          <img
            className="w-full max-h-28 object-contain p-3"
            src={card.image}
            alt={card.title}
          />

          <div className="px-1 py-1 text-center">
            <div className="font-bold text-sm mb-1">{card.title}</div>
            <p className="text-gray-700 text-sm">{card.category}</p>
          </div>
          <div className="text-right text-sm top-2 right-2 absolute">
            <span className="text-gray-700">
              {calculateRating(card.rating) + "⭐"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Popular;
