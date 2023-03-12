import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { baseUrl } from "../../../utils/constants";
import AddCategoryForm from "./AddCategoryForm";
Modal.setAppElement("#root");

function CategoryBody() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    axios({
      method: "get",
      url: `${baseUrl}admin/categories`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data.message);
      setCategories(res.data.data);
      console.warn(categories);
    });
  };
  const headers = ["No", "Name", "Descriptions", "Actions"];
  return (
    <>
      <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h4 className="text-2xl font-bold leading-tight text-gray-800">
            Category Management
          </h4>
        </div>
        <div className="mt-6 lg:mt-0">
          <button
            onClick={openModal}
            className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
          >
            Add Category
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
          <AddCategoryForm />
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
                  {categories.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {row.description}
                      </td>
                      <td className="px-6 py-4 md:py-6 md:px-8 text-sm md:text-base font-medium leading-5 text-gray-800 ">
                        <button
                          className="bg-emerald-300 hover:bg-emerald-500 text-gray-800 text-xs py-1 px-3 rounded"
                          //    onClick={() => handleEdit(rowIndex)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryBody;
