import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sweetAlert from "../../Common/SweetAlert";
import { adminInstance } from "../../../utils/axios";
import Swal from "sweetalert2";

function EditCategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const sweetAlertt = (icon = "success", text) => {
    sweetAlert(icon, text);
    setSubmitSuccess(false);
  };

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, []);
  const getCategory = () => {
    adminInstance(`category/${params.id}`).then((res) => {
      console.log(res.data);
      setName(res.data.data.name);
      setDescription(res.data.data.description);
    }).catch((err)=>{
      Swal("Warning",err.message,"error")
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await adminInstance.put( `update-category/${params.id}`,formData)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        navigate("/admin/categories");
        sweetAlertt("success", response.data.message);
      } else {
        setSubmitError("Failed to submit form");
      }
      setSubmitSuccess(false);
    } catch (error) {
      console.error(error);
      setSubmitError(error.message);
    }
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Edit Category
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
            disabled
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
          {submitError && <div>Error: {submitError}</div>}
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

export default EditCategoryForm;
