import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Toaster } from "sonner";
function DashboardLayout() {

    return (
        <>
            <Outlet />
            <Toaster position="top-right" richColors className='customToaster' />
        </>
    )
}

export default DashboardLayout