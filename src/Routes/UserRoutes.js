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
import Course from '../pages/User/Course';
import Cart from '../pages/User/Cart';
import LessonView from '../pages/User/LessonView';
import NotFound from '../pages/NotFound';
import PurchaseHistory from '../pages/User/PurchaseHistory';
import PremiumFeatures from '../pages/User/PremiumFeatures';
import PaymentSuccess from '../pages/User/PaymentSuccess';
import MyCourses from '../pages/User/MyCourses';
import Community from '../pages/User/Community'
import ErrorBoundary from '../components/Common/ErrorBoundary';
import ErrorPage from '../components/Common/ErrorPage';
import ResetPassword from '../pages/User/ResetPassword';
import Technews from '../pages/User/Technews';

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
        <ErrorBoundary fallback={<ErrorPage/>}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path="home" element={<Home />} />
          <Route path='explore' element={<Categories />} />
          <Route path='courses' element={<Courses />} />
          <Route path='course/:id' element={<Course />} />
          <Route path='premium-benefits' element={<PremiumFeatures />} />
          <Route path='reset-password/:id' element={<ResetPassword/>}/>
          <Route path='tech-news' element={<Technews/>}/> 
          <Route element={<PrivateUser />}>
            <Route path='cart/:id' element={<Cart />} />
            <Route path='my-courses/:id' element={<MyCourses />} /> 
            <Route path='private-lesson/:id' element={<LessonView />} />
            <Route path='purchase-history/:id' element={<PurchaseHistory />} />
            <Route path='payment-success' element={<PaymentSuccess />} />
            <Route path='community' element={<Community/>}/> 
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  )
}

export default UserRoutes

