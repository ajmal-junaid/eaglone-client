import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sweetAlert from "../../Common/SweetAlert";
import Spinner from "../../Common/Spinner";
import instance from "../../../utils/axios";

function CategorySection({ setCurrent, current }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getDatas();
  }, []);
  const getDatas = () => {
    instance.get('categories')
      .then((res) => {
        //setCatagoryLoading(false)
        setIsLoading(false);
        setCategories(res.data.data);
      })
      .catch((res) => {
        console.log(res.response.data, "catch");
        sweetAlert("warning", res.response.data.message);
      });
  };
  const handleCurrent = (name) => {
    setCurrent(name);
  };

  return (
    <>
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container overflow-y-auto  flex flex-col h-screen pt-16 pb-10 w-1/4 px-4 text-center -z-0"
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          <li className="hidden sm:inline translate-y-px text-center text-xl pb-0">
            <h1 className="font-bold  mt-5 border text-2xl border-b-gray-900">
              Categories
            </h1>
          </li>

          {isLoading ? (
            <Spinner />
          ) : (
            categories.map((data) => (
              <li
                key={data.name}
                className={`${
                  current == data.name
                    ? "bg-slate-100 border scale-105"
                    : "scale-75"
                } cursor-pointer pt-6 flex flex-col m-2 justify-self-center`}
                onClick={() => handleCurrent(data.name)}
              >
                <img
                  className="-mt-1 md:mx-0 opacity-95 px-0 lg:px-24"
                  src={data.image}
                />

                <span className="hidden sm:inline font-serif mt-3 font-semibold">
                  {data.name}
                </span>
              </li>
            ))
          )}
        </motion.ul>
      </AnimatePresence>
    </>
  );
}

export default CategorySection;
