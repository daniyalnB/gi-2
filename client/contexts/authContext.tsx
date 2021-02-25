import * as React from "react";
import { login, logoutAPI, auth } from "../utils/api-routes/api-routes.util";
import history from "../utils/history";
import { useState } from "react";

interface IContextProps {
  payload: object;
  loginError: string | undefined;
  isAuthenticated: boolean;
  status: string | undefined;
  dispatchLogin: Function;
  emailOnChange: Function;
  passwordOnChange: Function;
  logout: Function;
}

export const AuthContext = React.createContext({} as IContextProps);

// TODO: Move to typings file
interface ProfileStorage {
  token: string;
}

export default React.memo(({ children }) => {
  const [loginError, setLoginError] = useState("");
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let profile: ProfileStorage = { token: "" };

  // React.useEffect(() => {
  //   // console.log("pageIsPublic",pageIsPublic);

  //   auth().subscribe(
  //     (response: any) => {
  //       console.log(response, "response");
  //     },
  //     (error) => {
  //       logout();
  //     }
  //   );
  // }, []);

  let payload = React.useMemo(() => {
    return { emailaddress: "", password: "" };
  }, []);

  const emailOnChange = (email: string) => {
    payload.emailaddress = email;
    //  validateEmail();
  };

  const passwordOnChange = (pwd: string) => {
    payload.password = pwd;
    //  validatePassword();
  };

  const dispatchLogin = () => {
    setStatus("pending");

    login(payload).subscribe(
      (response) => {
        setIsAuthenticated(true);
        setStatus("success");
        //console.log(response);
        profile = response.response;
        localStorage.setItem("token", profile);
        history.push("/admin/dashboard");
      },
      (error) => {
        console.log(error, "asasdasdc");
        setIsAuthenticated(false);
        setLoginError(error.response);
        setStatus("error");
      }
    ); //.subscribe(
    //   (response: any) => {
    //     console.log("sdas");
    //     // if (response.response === "Invalid Credentials") {
    //     //   console.log(response, "asdas");
    //     //   setLoginError("Invalid Credentials");
    //     //   setStatus("error");
    //     //   setIsAuthenticated(false);
    //     //   // showNotify("success", "Invalid Credentials");
    //     // } else {
    //     setIsAuthenticated(true);
    //     setStatus("success");
    //     //console.log(response);
    //     profile = response.response;
    //     localStorage.setItem("profile", JSON.stringify(profile));
    //     localStorage.setItem("token", profile);
    //     history.push("/admin/dashboard");

    //     console.log(response.status);
    //   },
    //   (error) => {
    //     setIsAuthenticated(false);
    //     setLoginError(error.status);
    //     setStatus("error");
    //     //console.log(status);
    //     //showNotify("error", "Invalid Credentials");
    //   }
    // );
  };

  const logout = () => {
    logoutAPI().subscribe(
      (response: any) => {
        setStatus("success");
        setIsAuthenticated(false);
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        history.push("/admin/login");
      },
      (response) => {
        setIsAuthenticated(false);
        // setLoginError(
        //   response.response.message
        //     ? response.response.message
        //     : response.response.Message
        // );
        setStatus("error");
      }
    );
  };

  const defaultContext = {
    payload,
    loginError,
    isAuthenticated,
    status,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
    logout,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
});
