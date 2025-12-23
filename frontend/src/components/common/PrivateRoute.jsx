import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page but save the location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && (!user || user.role !== 'admin')) {
        // If admin access is required but user is not admin, redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;