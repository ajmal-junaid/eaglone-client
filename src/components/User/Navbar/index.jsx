import React, { useEffect } from "react";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import Logo from "../../../asset/eaglone-logo.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../Redux";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.value);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const user = jwt_decode(token);
      dispatch(
        setUserData({
          userData: { name: user.name, email: user.email, mobile: user.mobile },
        })
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("auth");
    dispatch(
      setUserData({
        userData: { name: null, email: null, mobile: null },
      })
    );
    navigate("/");
  };

  return (
    <div className="w-full">
      <header className=" fixed top-0 left-0 w-full bg-white border-b-2 z-10">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-9 w-auto" src={Logo} alt="LL" />
            </Link>
          </div>

          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <NavLink
              to="/user/home"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/user/categories"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Categories
            </NavLink>
            <NavLink
              to="/user/courses"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Courses
            </NavLink>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userData.name ? (
              <div
                aria-haspopup="true"
                className="cursor-pointer w-full flex items-center justify-end relative"
                onClick={() => setProfile(!profile)}
              >
                {profile ? (
                  <ul className="p-2 w-40 border-r bg-white absolute rounded z-40 right-0 shadow mt-40 ">
                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={12} cy={7} r={4} />
                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <span className="ml-2">My Profile</span>
                      </div>
                    </li>
                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-help"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={12} cy={12} r={9} />
                        <line x1={12} y1={17} x2={12} y2="17.01" />
                        <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                      </svg>
                      <span className="ml-2">Help Center</span>
                    </li>
                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-logout"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-5a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                      </svg>

                      <button onClick={logout} className="ml-2">
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
                <p className="text-gray-800 text-sm ml-2 bg-slate-100   ">
                  <button className="text-sm font-semibold leading-6 text-gray-900 ">
                    {userData.name.toUpperCase()}
                  </button>
                </p>
              </div>
            ) : (
              <NavLink
                to="/user/login"
                className="text-sm font-semibold leading-6 text-gray-900 "
              >
                Log in <span aria-hidden="true">&larr;</span>
              </NavLink>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
