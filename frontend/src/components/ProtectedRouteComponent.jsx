import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../services/api";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const role = await getUserRole();
                setUserRole(role);
            } catch (error) {
                console.error("Failed to fetch user role:", error);
                setUserRole(null);
            } finally {
                setIsLoading(false);
            }
        };
        if (!allowedRoles.includes("guest")) {
            fetchUserRole();
        } else {
            setIsLoading(false);
        }

    }, []);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!allowedRoles.includes("guest") && (!userRole || !allowedRoles.includes(userRole))) {
        return <Navigate to="/login" replace />; // Redirect if unauthorized
    }

    return children; // Render children if authorized
};

export default ProtectedRoute;
