import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateUser=()=>{
    const token=localStorage.getItem('userToken')
    console.log(token);
    return token? <Outlet/> : <Navigate to="/user/login"/>
}

export default PrivateUser;
