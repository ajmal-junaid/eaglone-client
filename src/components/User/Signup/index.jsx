import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import ErrorMessage from "../../Common/ErrorMessage";

function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("userToken");
    if (auth) {
      navigate("/user/home");
    }
  }, []);
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}verify-email`,
      data: {
        email,
        otp,
      },
    }).then((res) => {
      if (res.data.success) {
        navigate("/user/login");
      } else {
        setError(res.data.message);
      }
    });
  };
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}user-signup`,
      data: {
        name,
        email,
        mobile,
        password,
        active: false,
      },
    }).then((res) => {
      if (res.data.success) {
        setOtpSent(true);
        setError("");
      } else {
        setError(res.data.message);
      }
    });
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden border-2">
      <div className="w-full p-6 m-auto mt-24 bg-white rounded-md shadow-md lg:max-w-xl border-2">
        <h1 className="text-3xl font-bold text-center text-teal-300 font-outline-4">
          Sign Up
        </h1>
        {otpSent ? (
          <form className="mt-6" onSubmit={handleOtpSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-300 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-800"
              >
                Verify OTP
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Mobile
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-teal-400 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                onClick={handleEmailSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-300 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal-800"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        <span className=" text-red-600 px-2 py-1 rounded">{error}</span>
        <ErrorMessage message={error} />

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already &lsquo; have an account?
          <Link
            to="/user/login"
            className="font-medium text-teal-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Index;
