import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {

    const isLoggedIn = useAuthStore(state => state.isLoggedIn)

    if(isLoggedIn)
    {
        return <Outlet/>
    }

  return <Navigate to="/" replace />
}

export default ProtectedRoutes