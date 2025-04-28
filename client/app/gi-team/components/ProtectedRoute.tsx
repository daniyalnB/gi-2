import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import { auth } from "utils/api-routes/api-routes.util";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    auth().subscribe(
      (response: any) => {
        // console.log(response, "response");
      },
      (error) => {
        console.log("error in Protected Route Admin");
        //logout();
      }
    );
  }, [location.pathname]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/gi-team/login" state={{ from: location }} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;