import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../../utils/constants";
import Traditional from "../../Common/Alerts/Traditional";
import SweetAlert from "../../Common/SweetAlert";

function AddBannerForm({ handleClose }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleImageChange = (event) => {
    setSubmitError(null);
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setName(name.trim());
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        `${baseUrl}admin/add-banner`,
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
        setResponse(response.data.message);
        handleClose();
        setSubmitSuccess(true);
      } else {
        SweetAlert("error", "Failed to submit form");
      }
    } catch (error) {
      SweetAlert("error", error.response.data.message);
    }
    setIsSubmitting(false);
    
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
        <div className="text-center w-full">
          {submitError ? <Traditional err={submitError} /> : ""}
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider mb-1">
            Add Banner
          </h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto"
      >
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
            required
          />
        </div>
        <div className="flex justify-center">
          {submitSuccess ? SweetAlert("warning", response) : ""}

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

export default AddBannerForm;
