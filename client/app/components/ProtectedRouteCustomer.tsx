import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { customerAuth } from "utils/api-routes/api-routes.util";

const ProtectedRouteCustomer = ({ component: Component, ...rest }) => {

  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    customerAuth().subscribe(
      (response: any) => {
        // console.log(response, "response");
        //console.log(props, "hello");
      },
      (error) => {
        console.log("error in Protected Route Customer");
      }
    );
  }, [rest.location.pathname]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("tokenCustomer")) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/my-account",
                state: {
                  path: path,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRouteCustomer;