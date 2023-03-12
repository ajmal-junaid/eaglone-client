import React from "react";
// import { Link } from "react-router-dom";

import Sidebar from "../../components/Admin/Sidebar/index";
import Dashboard from "../../components/Home/Dashboard";

function Home() {
  return (
    <>
      <Sidebar />
      <Dashboard />
    </>
  );
}

export default Home;
