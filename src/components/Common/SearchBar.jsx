import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import instance from "../../utils/axios";
const SearchBar = ({ setCourses, reset, setMessage }) => {
  const [query, setQuery] = useState("");
  function handleQueryChange(event) {
    setQuery(event.target.value);
    if (event.target.value) {
      instance
        .get(`search/${event.target.value}`)
        .then((res) => {
          setCourses(res.data.data);
          setMessage(`${res.data.data.length} Course found`);
        })
        .catch((err) => {
          setMessage(`Courses not found`);
          console.log(err.response);
        });
    } else {
      handleClear();
    }
  }
  const handleClear = () => {
    setQuery("");
    setMessage("");
    reset();
  };

  return (
    <div className="relative mt-5 px-5 md:px-20">
      <div className="absolute inset-y-0 left-10 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
        className="block w-full py-3 px-4 leading-tight rounded-md bg-white border border-gray-400 shadow-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-500 transition duration-300 ease-in-out"
      />

      {query && (
        <div
          onClick={handleClear}
          className="absolute inset-y-0 right-5 w-10 pr-3 flex items-center justify-center cursor-pointer"
        >
          {" "}
          <b>X</b>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
