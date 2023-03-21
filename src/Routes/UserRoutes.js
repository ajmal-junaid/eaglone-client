import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateUser from '../components/Verifications/PrivateUser';
import Categories from '../pages/User/Categories';
import Courses from '../pages/User/Courses';
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Signup from '../pages/User/Signup'

function UserRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path='categories' element= {<Categories/>}/>
      <Route path ='courses' element={<Courses/>}/>
      <Route element={<PrivateUser />}>
      </Route>
    </Routes>
  )
}

export default UserRoutes

