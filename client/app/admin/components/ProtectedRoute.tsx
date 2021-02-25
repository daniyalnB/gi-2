import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";

function ProtectedRoute ({ component: Component, ...rest}) {

    const {isAuthenticated} = useContext(AuthContext);

    console.log(isAuthenticated);

    return (
        <Route 
            {...rest} 
            render={(props) => {
                if (isAuthenticated) {
                    return <Component />
                } else {
                    return (
                        <Redirect to={{ pathname: "/admin/login", state: { from: props.location} }} />
                    );
                }
            }}
        />
    );
}

export default ProtectedRoute;