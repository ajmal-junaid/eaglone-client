import React from 'react';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
    </div>
  )
}

export default App