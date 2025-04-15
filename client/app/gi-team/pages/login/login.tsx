import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
import history from "utils/history";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../../contexts/authContext";
import logo from "assets/Logo.svg";
import showpassword from "assets/show_password.svg";
import hidepassword from "assets/hide_password.svg";

const AdminLogin = (props) => {
  
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      dispatchLogin(emailaddress);
      setLoading(false);
    }, 1000)
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/gi-team/dashboard");
    } else {
      setToken(false);
    }
  }, []);

  const [emailaddress, setEmailAddress] = useState("");
  const [pass, setPass] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => setPasswordShown(!passwordShown);

  return (
    <>
      <Helmet>
        <title> 
          Sign In - Actionable Insights Admin
        </title>
      </Helmet>
      <ScrollToTop />
      {!token ? (
        <div className="admin-login">
          <div className="container-fluid">
            <div className="image-section">
              <div className="logo">
                <img src={logo} />
              </div>
            </div>
            <div className="text-section">
              <h3> Sign In with your Actionable Insights admin account. </h3>
            </div>
            <div className="login_inner_Container">
              <div className="form-holder">
                <form onSubmit={handleSubmitForm}>
                  <div className="row">
                    <div className="col">
                      <div className="upInputs form-group nogroup">
                        <input 
                          type="email"
                          name="Email"
                          placeholder=" "
                          required
                          onChange={(e) => {
                            handleEmailChange(e);
                            setEmailAddress(e.currentTarget.value);
                          }}
                        />
                        <label className="upLabel"> Email </label>
                      </div>
                      <div className="form-group nogroup">
                        <input
                          type={passwordShown ? "text" : "password"}
                          name="Password"
                          required
                          id="inputField2"
                          className="input-area"
                          onChange={(e) => {
                            handlePasswordChange(e);
                            setPass(e.currentTarget.value);
                          }}
                        />
                        <label htmlFor="inputField2" className="floating_label">
                          Password
                        </label>
                        <img 
                          className="input_icon"
                          style={{
                            right: "0",
                            cursor: "pointer",
                          }}
                          src={passwordShown ? showpassword : hidepassword}
                          onClick={togglePassword}
                        />
                      </div>
                      {status === "error" ? (
                        <div className="form-group alert alert-danger">
                          {loginError}
                        </div>
                      ) : (
                        ""
                      )}
                      {!loading && (
                        <button 
                          className="btn"
                          type="submit"
                          disabled={emailaddress == "" || pass == "" ? true : false}
                        > 
                          <span> Sign In </span>
                        </button>
                      )}
                      {loading && (
                        <button 
                          className="btn"
                          disabled
                        > 
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}
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