import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EditCategoryForm from '../components/Admin/Categories/EditCategoryForm'
import EditCourseForm from '../components/Admin/Courses/EditCourseForm'
import PrivateAdmin from '../components/Verifications/PrivateAdmin'

import CategoryManagement from '../pages/Admin/CategoryManagement'
import CourseManagement from '../pages/Admin/CourseManagement'
// import EditCourse from '../pages/Admin/EditCourse'
import Home from '../pages/Admin/Home'
import Login from '../pages/Admin/Login'
import UserManagement from '../pages/Admin/UserManagement'

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateAdmin />}>
                <Route path="home" element={<Home />} />
                <Route path='users' element={<UserManagement />} />
                <Route path='categories' element={<CategoryManagement />} />
                <Route path='courses' element={<CourseManagement />} />
                <Route path='courses/update-course/:id' element={<EditCourseForm />} />
                <Route path='categories/update-category/:id' element={<EditCategoryForm />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes