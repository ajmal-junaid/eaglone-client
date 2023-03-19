import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../../utils/constants';

function EditCategoryForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const params = useParams();
    const navigate = useNavigate()
  
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
      const getCategory=()=>{
        axios({
            method: "get",
            url: `${baseUrl}admin/category/${params.id}`,
            headers: {
              "Content-Type": "application/json",
               "apikey":"bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi"
            },
          }).then((res) => {
            console.log(res.data);
            setName(res.data.data.name);
            setDescription(res.data.data.description);
          });
      }
  
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
        const response = await axios.put(
          `${baseUrl}admin/update-category/${params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "apikey":"bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi"
            },
          }
        )
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          setSubmitSuccess(true);
          navigate("/admin/categories")
        } else {
          setSubmitError("Failed to submit form");
        }
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
  )
}

export default EditCategoryForm