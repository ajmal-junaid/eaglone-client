import React, { useEffect } from "react";
// import { useState } from "react";
import Logo from "../../../asset/eaglone-logo.png";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { Link, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../Redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBook,
  FaDollarSign,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
// import {
//   FaShoppingCart,
//   FaBook,
//   FaDollarSign,
//   FaSignOutAlt,
// } from "react-icons/fa";

export default function Example() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const [show, setShow] = useState(false);
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  // const [profile, setProfile] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const user = jwt_decode(token);
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
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("auth");
    dispatch(
      setUserData({
        userData: { name: null, email: null, mobile: null, _id: null },
      })
    );
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Eaglone</span>
                <img className="h-9 w-auto" src={Logo} alt="Eaglone" />
              </Link>
            </div>
          </div>
          <div className="flex items-center md:order-2">
            {userData.name ? (<>
              <button
              type="button"
              className="flex mr-3 text-sm bg-gray-100 p-1 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              {/* <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              /> */}
              {userData?.name?.toUpperCase()}
            </button>
            {/* Dropdown menu */}
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {/* {userData?.name?.toUpperCase()} */}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {userData.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <NavLink
                  to={`/user/cart/${userData._id}`}
                  className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <FaShoppingCart className="mr-1 h-4 w-4 text-black-500" />

                  <span className="ml-2">
                    Cart
                    <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                      2
                    </span>
                  </span>
                </NavLink>
                <NavLink
                  to={`/user/my-courses/${userData._id}`}
                  className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <FaBook className="mr-1 h-4 w-4 text-black-500" />

                  <span className="ml-2">My Courses</span>
                </NavLink>
                <NavLink
                  to={`/user/purchase-history/${userData._id}`}
                  className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  <FaDollarSign className="mr-1 h-4 w-4 text-black-500" />

                  <span className="ml-2">Orders</span>
                </NavLink>
                <li className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <FaSignOutAlt />
                  <button onClick={logout} className="ml-2">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            </>):(<NavLink
                to="/user/login"
                className="text-sm font-semibold leading-6 text-gray-900 "
              >
                Log in <span aria-hidden="true">&larr;</span>
              </NavLink>)}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/user/home"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/explore"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/courses"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  All Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/community"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/tech-news"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Tech News
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
