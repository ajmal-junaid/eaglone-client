import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";
import sweetAlert from "../../Common/SweetAlert";
import { Tooltip } from "react-tippy";

function CategorySection({ setCurrent }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = () => {
    axios({
      method: "get",
      url: `${baseUrl}admin/categories`,
      headers: {
        "Content-Type": "application/json",
        apikey:
          "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        //setCatagoryLoading(false)
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
          className="container overflow-y-auto  flex flex-col h-screen pt-16 pb-10 w-1/4 px-4 text-center"
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

          {categories.map((data) => (
            <li
              key={data.name}
              className="cursor-pointer pt-6 flex flex-col m-2 justify-self-center"
              onClick={() => handleCurrent(data.name)}
            >
              <Tooltip
                title={data.name}
                position="right"
                className="bg-inherit"
              >
                <img
                  className="-mt-1 md:mx-0 opacity-95 px-0 lg:px-20"
                  src={data.image}
                />
              </Tooltip>
              <span className="hidden sm:inline font-serif mt-3 font-semibold">
                {data.name}
              </span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </>
  );
}

export default CategorySection;
