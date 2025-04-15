import * as React from "react";
import { useState, useEffect } from "react";
import {
  login,
  logoutAPI,
  auth,
  customerLogin,
  customerLogout,
  customerAuth,
} from "../utils/api-routes/api-routes.util";
import history from "../utils/history";

interface IContextProps {
  profile: object;
  payload: object;
  loginError: string | undefined;
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  status: string | undefined;
  dispatchLogin: Function;
  emailOnChange: Function;
  passwordOnChange: Function;
  logout: Function;
  isAuthenticatedCustomer: boolean;
  setIsAuthenticatedCustomer: Function;
  dispatchLoginCustomer: Function;
  logoutCustomer: Function;
  switchData: any;
}

export const AuthContext = React.createContext({} as IContextProps);

interface CustomerProfileStorage {
  tokenCustomer: string;
}

interface CustomerFirstName {
  CustomerFirstName: string;
}

export default React.memo(({ children }) => {

  const [loginError, setLoginError] = useState("");
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticatedCustomer, setIsAuthenticatedCustomer] = useState(false);
  const [profile, setProfile] = useState("");
  const [switchData, setSwitchData] = useState([]);

  let customerProfile: CustomerProfileStorage = { tokenCustomer: "" };

  let CustomerFirstName: CustomerFirstName = { CustomerFirstName: "" };

  let payload = React.useMemo(() => {
    return { emailaddress: "", password: "" };
  }, []);

  const emailOnChange = (email: string) => {
    payload.emailaddress = email;
  };

  const passwordOnChange = (pwd: string) => {
    payload.password = pwd;
  };

  const dispatchLogin = (email) => {
    setStatus("pending");

    login(payload).subscribe(
      (response) => {
        // console.log(response.response, "login response");
        setProfile(response.response);
        setIsAuthenticated(true);
        setStatus("success");
        if (response.response.mfaenabled) {
          localStorage.setItem("email", email);
          history.push("/gi-team/login-mfa");
        } else {
          localStorage.setItem("email", email);
          localStorage.setItem("token", response.response.sessiontoken);
          localStorage.setItem("role", response.response.role);
          localStorage.setItem("2fa", response.response.mfaenabled);
          history.push("/gi-team/dashboard");
        }
      },
      (error) => {
        // console.log(error, "admin login error");
        setIsAuthenticated(false);
        setLoginError(error.response.Message);
        setStatus("error");
      }
    );
  };

  const logout = () => {
    logoutAPI().subscribe(
      (response: any) => {
        setStatus("success");
        setIsAuthenticated(false);
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("2fa");
        localStorage.removeItem("activeTab");
        history.push("/gi-team/login");
      },
      (response) => {
        setIsAuthenticated(false);
        setStatus("error");
      }
    );
  };

  const dispatchLoginCustomer = (path) => {
    setStatus("pending");

    const newPath = `${path === "/my-account/lost-password/show-reset-form" || path === "/my-account/lost-password" ? "/" : path}`;

    customerLogin(payload).subscribe(
      (response) => {
        // console.log(response, "customer login response");
        setIsAuthenticatedCustomer(true);
        setStatus("success");
        customerProfile = response.response.sessiontoken;
        localStorage.setItem("tokenCustomer", customerProfile);
        CustomerFirstName = response.response.firstname;
        localStorage.setItem("CustomerFirstName", CustomerFirstName);
        history.push(`${newPath}`);
      },
      (error) => {
        // console.log(error, "customer login error");
        if (error.response.data) {
          const token = error.response.data[0];
          localStorage.setItem("signoutTokenCustomer", token);
        }
        setIsAuthenticatedCustomer(false);
        setLoginError(error.response.Message);
        setStatus("error");
      }
    );
  };

  // useEffect(() => {
  //   setSwitchData(JSON.parse(localStorage.getItem("switchData")));
  // }, []);

  const logoutCustomer = (path, removeAll) => {
    customerLogout(removeAll ? true : false).subscribe(
      (response: any) => {
        setStatus("success");
        setIsAuthenticatedCustomer(false);
        localStorage.removeItem("tokenCustomer");
        localStorage.removeItem("CustomerFirstName");
        if (localStorage.getItem("signoutTokenCustomer") == null) {
          history.push("/");
        } else {
          localStorage.removeItem("signoutTokenCustomer");
          dispatchLoginCustomer(path);
        }
      },
      (response) => {
        setIsAuthenticatedCustomer(false);
        setStatus("error");
      }
    );
  };

  const defaultContext = {
    profile,
    payload,
    loginError,
    isAuthenticated,
    status,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
    logout,
    setIsAuthenticated,
    isAuthenticatedCustomer,
    setIsAuthenticatedCustomer,
    dispatchLoginCustomer,
    logoutCustomer,
    switchData,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
});