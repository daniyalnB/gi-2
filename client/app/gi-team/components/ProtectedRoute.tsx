import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import { auth } from "utils/api-routes/api-routes.util";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    auth().subscribe(
      (response: any) => {
        // console.log(response, "response");
        //console.log(props, "hello");
      },
      (error) => {
        console.log("error in Protected Route Admin");
        //logout();
      }
    );
  }, [rest.location.pathname]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/gi-team/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;