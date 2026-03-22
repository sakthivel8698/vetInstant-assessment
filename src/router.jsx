import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const Login = lazy(() => import("./pages/Login"));
const PrivateRoutes = lazy(() => import("./authLayout/PrivateRoutes"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Navigate to='/login' replace />
            },
            {
                path: 'login',
                element: <Login />,
            }
        ]
    },
    {
        element: <PrivateRoutes />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;