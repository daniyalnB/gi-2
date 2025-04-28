import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { customerAuth } from "utils/api-routes/api-routes.util";

const ProtectedRouteCustomer = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("tokenCustomer"));

  useEffect(() => {
    const subscription = customerAuth().subscribe(
      (response) => {
        // Authentication successful
        setIsAuthenticated(true);
      },
      (error) => {
        console.log("error in Protected Route Customer");
        setIsAuthenticated(false);
      }
    );

    // Clean up subscription
    return () => subscription.unsubscribe();
  }, [location.pathname]);

  // If authenticated, render the child routes
  if (isAuthenticated) {
    return <Outlet />;
  }
  
  // If not authenticated, redirect to login
  return <Navigate to="/my-account" state={{ path: location.pathname }} replace />;
};

export default ProtectedRouteCustomer;