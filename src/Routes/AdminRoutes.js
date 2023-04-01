import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EditCategoryForm from '../components/Admin/Categories/EditCategoryForm'
import EditCourseForm from '../components/Admin/Courses/EditCourseForm'
import EditLessonForm from '../components/Admin/Lessons/EditLessonForm'
import Navbar from '../components/Admin/Navbar'
import PrivateAdmin from '../components/Verifications/PrivateAdmin'
import CategoryManagement from '../pages/Admin/CategoryManagement'
import CourseManagement from '../pages/Admin/CourseManagement'
import Home from '../pages/Admin/Home'
import LessonManagement from '../pages/Admin/LessonManagement'
import Login from '../pages/Admin/Login'
import UserManagement from '../pages/Admin/UserManagement'
import axios from 'axios'
import CouponManagement from '../pages/Admin/CouponManagement'
import BannerManagement from '../pages/Admin/BannerManagement'

import NotFound from '../pages/NotFound'
import OrderManagement from '../pages/Admin/OrderManagement'

function AdminRoutes() {
  axios.defaults.headers.common['apikey'] = 'invalid $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi';
  return (
    <div>
      <Navbar />
      <div className='container mx-auto mt-26 max-h-screen overflow-y-scroll pb-26' style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitScrollbar: { display: "none" },
      }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateAdmin />}>
            <Route path="home" element={<Home />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='categories' element={<CategoryManagement />} />
            <Route path='courses' element={<CourseManagement />} />
            <Route path='courses/update-course/:id' element={<EditCourseForm />} />
            <Route path='categories/update-category/:id' element={<EditCategoryForm />} />
            <Route path='lessons' element={<LessonManagement />} />
            <Route path='lessons/update-lesson/:id' element={<EditLessonForm />} />
            <Route path='coupons' element={<CouponManagement />} />
            <Route path='banners' element={<BannerManagement />} />
            <Route path='orders' element={<OrderManagement />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default AdminRoutes