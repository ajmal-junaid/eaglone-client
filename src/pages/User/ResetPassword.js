import React, { useState } from 'react'
import instance from '../../utils/axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const ResetPassword = () => {
    const [newPassword, setPassword] = useState("")
    const [error, setError] = useState("")
    const params = useParams()
    const navigate = useNavigate()
    const tokenValue = params.id
    const handleClick = () => {
        instance.post('reset-password', {
            newPassword,
            tokenValue
        }).then((res) => {
            console.log(res);
            new Swal("success", "Password updated successfully", "success")
            setError("")
            navigate('/user/login')
        }).catch((err) => {
            console.log(err, "catch")
            setError(err.response.data.message)
            new Swal("failed", err.response.data.message, "error")
        })
    }
    return (
        <div className='pt-16 pb-4'> <div className="relative flex flex-col justify-center overflow-hidden mt-20 ">
            <div className="w-full p-6 m-auto mt-2 bg-white rounded-md shadow-md lg:max-w-xl border-2">
                <h1 className="text-3xl font-bold text-center text-teal-300 font-outline-4">
                    Reset Password
                </h1>
                <div className="mt-6">

                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => handleClick()}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-300 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal -600"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
                <span className=" text-red-600 px-2 py-1 rounded">{error}</span>

            </div>
        </div></div>
    )
}

export default ResetPassword