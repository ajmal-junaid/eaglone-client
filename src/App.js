import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/User/Home'
import NotFound from './pages/NotFound';
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App