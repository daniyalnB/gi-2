import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import history from "utils/history";
import logo from "assets/Logo.svg";
import { AuthContext } from "../../../../contexts/authContext";

export const AdminLogin = (props) => {
  const {
    loginError,
    status,
    dispatchLogin,
    emailOnChange,
    passwordOnChange,
    isAuthenticated,
  } = useContext(AuthContext);
  //const [loginStatus, setLoginStatus] = useState(loginError);
  const handleEmailChange = (e: any) => emailOnChange(e.target.value);
  const [token, setToken] = useState(true);
  const handlePasswordChange = (e: any) => passwordOnChange(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatchLogin();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/admin/dashboard");
    } else {
      setToken(false);
    }
  }, []);

  console.log(loginError);

  return (
    <>
      {!token ? (
        <div className="admin-login">
          <div className="container-fluid">
            <div className="image-section">
              <div className="logo">
                <img src={logo} />
              </div>
            </div>

            <div className="text-section">
              <h3> Sign In with your Actionalble Insights admin account. </h3>
            </div>

            <div className="login_inner_Container">
              <div className="form-holder">
                <form onSubmit={handleSubmitForm}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group nogroup">
                        <input
                          type="text"
                          name="Email"
                          required
                          id="inputField1"
                          className="input-area"
                          onChange={handleEmailChange}
                        />
                        <label htmlFor="inputField1" className="floating_label">
                          {" "}
                          Email{" "}
                        </label>
                      </div>

                      <div className="form-group nogroup">
                        <input
                          type="password"
                          name="Password"
                          required
                          id="inputField2"
                          className="input-area"
                          onChange={handlePasswordChange}
                        />
                        <label htmlFor="inputField2" className="floating_label">
                          {" "}
                          Password{" "}
                        </label>
                      </div>
                      {status === "error" ? (
                        <div className="form-group alert alert-danger">
                          {loginError}
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        className="btn"
                        // to="/admin/dashboard"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default withRouter(AdminLogin);
