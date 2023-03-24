import React, { useState } from "react";
import CategorySection from "./CategorySection";
import CourseSection from "./CourseSection";

function Explore() {
  const [current, setCurrent] = useState("");
  return (
    <div className="flex">
      <CategorySection current={current} setCurrent={setCurrent} />
      <CourseSection current={current} />
    </div>
  );
}

export default Explore;
