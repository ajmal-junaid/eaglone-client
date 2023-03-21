import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/User/Home'
import NotFound from './pages/NotFound';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // return a cleanup function to set the overflow back to auto when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/user/home' replace />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App