import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Signup from '../pages/User/Signup'

function UserRoutes() {
  return (
   <Routes>
<Route path="home" element={<Home/>}/>
<Route path="login" element={<Login />} />
<Route path='signup' element={<Signup/>}/>
   </Routes>
  )
}

export default UserRoutes

