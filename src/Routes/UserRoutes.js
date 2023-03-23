import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateUser from '../components/Verifications/PrivateUser';
import Categories from '../pages/User/Explore';
import Courses from '../pages/User/Courses';
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Signup from '../pages/User/Signup'
import Navbar from '../components/User/Navbar'
import Footer from '../components/User/Footer/Footer'

function UserRoutes() {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto mt-26 max-h-screen  pb-26' style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitScrollbar: { display: "none" },
      }}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path="home" element={<Home />} />
          <Route path='explore' element={<Categories />} />
          <Route path='courses' element={<Courses />} />
          <Route element={<PrivateUser />}>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default UserRoutes

