import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { unSetCategoryForm } from "../../../Redux";
import Swal from "sweetalert2";
import Traditional from "../../Common/Alerts/Traditional";
import { adminInstance } from "../../../utils/axios";

function AddCategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const dispatch = useDispatch();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const sweetAlert = (icon = "success", text) => {
    Toast.fire({
      icon: icon,
      title: text,
    });
    setSubmitSuccess(false);
  };

  function handleNameChange(event) {
    setSubmitError(null);
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setSubmitError(null);
    setDescription(event.target.value);
  }

  const handleImageChange = (event) => {
    setSubmitError(null);
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setName(name.trim());
    setDescription(description.trim());
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    if (name.trim() === "" || description.trim() === "") {
      setSubmitError("Entered fields are invalid");
    } else {
      try {
        const response = await adminInstance.post("add-category", formData);
        if (response.status >= 200 && response.status < 300) {
          if (response.data.err) {
            sweetAlert("warning", response.data.message);
            setResponse(response.data.message);
          } else {
            sweetAlert("success", response.data.message);
            dispatch(unSetCategoryForm());
          }

          setSubmitSuccess(false);
        } else {
          setSubmitError("Failed to submit form");
        }
      } catch (error) {
        console.error(error);
        setSubmitError(error.message);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          {submitError ? <Traditional err={submitError} /> : ""}
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Add Category
          </h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter Category Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            name="description"
            placeholder="Description"
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
        <div className="flex justify-center">
          {submitSuccess ? sweetAlert("warning", response) : ""}

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

export default AddCategoryForm;
