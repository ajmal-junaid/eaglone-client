import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constants";

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${baseUrl}admin/login`,
      data: {
        email,
        password,
      },
    }).then((res) => {
      if (!res.data.err) {
        navigate("/admin/home");
      } else {
        setError(res.data.message);
      }
      console.log(res.data, "REact daaaaaaaaaaaaaa");
    });
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden border-2">
      <div className="w-full p-6 m-auto mt-24 bg-white rounded-md shadow-md lg:max-w-xl border-2">
        <h1 className="text-3xl font-bold text-center text-teal-300 font-outline-4">
          Admin Log in
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
        </p>
      </div>
    </div>
  );
}

export default Index;
