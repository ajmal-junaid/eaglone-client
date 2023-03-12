import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CategoryManagement from '../pages/Admin/CategoryManagement'
import CourseManagement from '../pages/Admin/CourseManagement'
import Home from '../pages/Admin/Home'
import Login from '../pages/Admin/Login'
import UserManagement from '../pages/Admin/UserManagement'

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path='users' element={<UserManagement/>}/>
            <Route path='categories' element={<CategoryManagement/>}/>
            <Route path='courses' element={<CourseManagement/>}/>
        </Routes>
    )
}

export default AdminRoutes