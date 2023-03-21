import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import ErrorMessage from "../../Common/ErrorMessage";

function Index() {
  const [name, setName] = useState("");
  const [isValidMail, setIsValidMail] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [mobile, setMobile] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handlePasswordChange = () => {
    
    setValidPassword(password === confirmPassword);
  };
  useEffect(() => {
    const auth = localStorage.getItem("userToken");
    if (auth) {
      navigate("/user/home");
    }
  }, []);
  const handleEmailChange = (e) => {
    const input = e.target.value;
    setEmail(input);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidMail(pattern.test(input));
  };
  const handleNameChange = (e) => {
    const input = e.target.value;
    setName(input);
    const pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    setIsValidName(input.length >= 3 && pattern.test(input));
  };
  const handleMobileChange = (e) => {
    const input = e.target.value;
    setMobile(input);
    const pattern = /^[1-9]\d{9}$/;
    setIsValidMobile(pattern.test(input));
  };
  const toggleShowPassword = () => setShowPassword(!showPassword);
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
    if (password === confirmPassword && password.length >= 5) {
      setValidPassword(false);
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
        headers: {
          apikey:
            "signUp $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
        },
      }).then((res) => {
        if (res.data.success) {
          setOtpSent(true);
          setError("");
        } else {
          setError(res.data.message);
        }
      });
    } else {
      setValidPassword(true);
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
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
                required
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
          <form className="mt-6" onSubmit={handleEmailSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              {!isValidMail && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              {!isValidName && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter a valid name.
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Mobile
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
              {!isValidMobile && (
                <p className="text-sm text-red-500 mt-1">
                  Please enter Ten Digit Mobile.
                </p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  onMouseLeave={handlePasswordChange}                
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-eye-off"
                    >
                      <path d="M6 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM1 1L15 15"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                onMouseLeave={handlePasswordChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {isValidPassword ? (
                ""
              ) : (
                <p className="text-sm text-red-500 mt-1">
                  Password Must be Same as Password. (Enter atleast 5
                  characters)
                </p>
              )}
            </div>
            <a href="#" className="text-xs text-teal-400 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                type="submit"
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
