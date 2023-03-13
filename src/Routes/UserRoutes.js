import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateUser from '../components/Verifications/PrivateUser';
import Home from '../pages/User/Home'
import Login from '../pages/User/Login'
import Signup from '../pages/User/Signup'

function UserRoutes() {
  return (
   <Routes>
<Route path="login" element={<Login />} />
<Route path='signup' element={<Signup/>}/>
<Route element={<PrivateUser/>}>
<Route path="home" element={<Home/>}/>
</Route>
   </Routes>
  )
}

export default UserRoutes

