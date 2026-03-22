import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {
    const token = localStorage.getItem('loginToken');

    return !token ? <Outlet /> : <Navigate to='/dashboard' replace />
}

export default PublicRoutes;