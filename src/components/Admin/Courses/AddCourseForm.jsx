import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../../utils/constants";
import { unSetCourseForm } from "../../../Redux";
import sweetAlert from "../../Common/SweetAlert";

function AddCourseForm() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [premium, setPremium] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  const handlePercentageChange = (event) => {
    setPercentage(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleToggle = () => {
    setPremium(!premium);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = () => {
    axios({
      method: "get",
      url: `${baseUrl}admin/categories`,
      headers: {
        "Content-Type": "application/json",
        apikey:
          "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    }).then((res) => {
      console.log(res.data);
      setOptions(res.data.data);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    const formData = new FormData();
    formData.append("courseId", id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("premium", premium);
    formData.append("price", price);
    formData.append("percentage", percentage);
    try {
      const response = await axios.post(
        `${baseUrl}admin/add-course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            apikey:
              "addCategory $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
          },
        }
      );

      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        sweetAlert("success", response.data.message);
        dispatch(unSetCourseForm());
        setSubmitSuccess(true);
      } else {
        sweetAlert("error", "Failed to submit form");
      }
    } catch (error) {
      sweetAlert("error", error.response.data.message);
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Add Course
          </h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Course Id:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {options.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="mr-4 font-bold" htmlFor="premium">
            Premium:
          </label>
          <div className="relative">
            <input
              type="checkbox"
              name="premium"
              id="premium"
              className="sr-only"
              checked={premium}
              onChange={handleToggle}
            />
            <div
              className={`${
                premium ? "bg-blue-500" : "bg-gray-400"
              } relative inline-block w-12 h-6 rounded-full transition-colors cursor-pointer`}
              onClick={handleToggle}
            >
              <div
                className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform transform ${
                  premium ? "translate-x-full" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-xs ml-2">{premium ? "On" : "Off"}</span>
          </div>
        </div>

        {premium && (
          <div className="mb-4 flex content-between">
            <div className="">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="Actual Price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded py-2 pl-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                pattern="\d*"
                inputMode="numeric"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
            <div className="ml-3">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="discount"
              >
                Discount Percentage ( in % )
              </label>
              <input
                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow"
                type="text"
                pattern="\d*"
                inputMode="numeric"
                min="0"
                max="100"
                value={percentage}
                onChange={handlePercentageChange}
                onInput={(e) => {
                  if (e.target.value > 100) {
                    e.target.value = 100;
                  }
                }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {submitSuccess && <div>Form submitted successfully!</div>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default AddCourseForm;
