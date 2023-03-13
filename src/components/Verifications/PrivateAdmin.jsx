import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdmin=()=>{
    const token=localStorage.getItem('adminToken')
    console.log(token);
    return token? <Outlet/> : <Navigate to="/admin"/>
}

export default PrivateAdmin;
