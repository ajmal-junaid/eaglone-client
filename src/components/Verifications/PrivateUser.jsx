import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateUser = () => {
  const token = localStorage.getItem("userToken");
  return token ? <Outlet /> : <Navigate to="/user/login" />;
};

export default PrivateUser;
