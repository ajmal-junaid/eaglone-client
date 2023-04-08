import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";
import jwt_decode from "jwt-decode";
import { setUserData } from "../../../Redux";
import Spinner from "../../Common/Spinner";
import instance from "../../../utils/axios";

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = localStorage.getItem("userToken");
    if (auth) {
      navigate("/user/home");
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
   
   instance.post('user-login', {
    email,
    password,
  })
      .then((res) => {
        setIsLoading(false);
        if (!res.data.err) {
          localStorage.setItem("userToken", JSON.stringify(res.data.token));
          localStorage.setItem("auth", true);
          const user = jwt_decode(res.data.token);
          dispatch(
            setUserData({
              userData: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                _id: user._id,
              },
            })
          );
          navigate("/user/home");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative flex flex-col justify-center overflow-hidden mt-20 ">
          <div className="w-full p-6 m-auto mt-2 bg-white rounded-md shadow-md lg:max-w-xl border-2">
            <h1 className="text-3xl font-bold text-center text-teal-300 font-outline-4">
              Log in
            </h1>
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
                Forgot Password?
              </a>
              <div className="mt-6">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-300 rounded-md hover:bg-teal-500 focus:outline-none focus:bg-teal -600"
                >
                  Login
                </button>
              </div>
            </form>
            <span className=" text-red-600 px-2 py-1 rounded">{error}</span>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
              Don&lsquo;t have an account?
              <Link
                to="/user/signup"
                className="font-medium text-teal-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
