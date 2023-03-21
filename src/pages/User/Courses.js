import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import sweetAlert from '../../components/Common/SweetAlert';
import { baseUrl } from '../../utils/constants';

function Courses() {
    const [courses, setCourses] = useState([])
    const userData = useSelector((state) => state.userData.value);
    useEffect(() => {
        console.log(userData,"iam from course user")
        axios({
            method: "get",
            url: `${baseUrl}courses`,
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(
                    localStorage.getItem("adminToken")
                )}`,
                apikey:
                    "getCourse $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
            },
        })
            .then((res) => {
                setCourses(res.data.data);
            })
            .catch((res) => {
                console.log(res.response.data, "catch");
                sweetAlert("warning", res.response.data.message);
            });
    }, [])

    return (
        <div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                    {courses.map((course) => (
                        <div key={course.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                                <p className="mt-2 text-gray-600">{course.author}</p>
                                <div className="mt-3 flex items-center">
                                    <span className="text-gray-700 font-semibold">{course.price}</span>
                                    <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Courses