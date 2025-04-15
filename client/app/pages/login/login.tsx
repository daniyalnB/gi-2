import React, { Suspense, useContext, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AuthContext } from "../../../contexts/authContext";
import { resendVerificationEmail } from "../../../utils/api-routes/api-routes.util";
import history from "utils/history";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import email from "assets/envelope.svg";
import password from "assets/passwordnew.png";

const login = (props) => {
  
  const [loading, setLoading] = useState(false);

  const [path, setPath] = useState("");
  
  useEffect(() => {
    if (props.location.state === undefined) {
      history.push("/my-account");
    } else if (props.location.state.path == props.location.state.path) {
      setPath(props.location.state.path);
    } else {
      setPath(props.location.state.path)
    }
  }, []);

  const {
    loginError,
    status,
    dispatchLoginCustomer,
    emailOnChange,
    passwordOnChange,
    logoutCustomer,
    isAuthenticatedCustomer,
  } = useContext(AuthContext);
  //const [loginStatus, setLoginStatus] = useState(loginError);
  const handleEmailChange = (e: any) => emailOnChange(e.target.value);
  const [token, setToken] = useState(true);
  const handlePasswordChange = (e: any) => passwordOnChange(e.target.value);
  const handleSubmitForm = (e: any) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      dispatchLoginCustomer(path);
      setLoading(false);
    }, 1000)
  }

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer")) {
      history.push("/");
    } else {
      setToken(false);
    }
  }, []);

  const [emailaddress, setEmailAddress] = useState("");
  const [pass, setPass] = useState("");

  const resendEmail = () => {
    setTimeout(() => {
      const payload = {
        emailaddress: emailaddress,
      };

      const stringified = queryString.stringify(payload);

      resendVerificationEmail(stringified).subscribe((response) => {
        if (response) {
          window.location.reload();
        } else {
          alert("error");
        }
      });
    }, 500);
  };

  return (
    <>
      <Helmet>
				<title> 
          My Account - Actionable Insights
				</title>
			</Helmet>
			<Suspense
				fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
			>
        <ScrollToTop />
        <Navbar />
        <Breadcrumbs />
        {!token ? (
          <div className="login_page"> 
            <div className="container-fluid">
              <span className="title"> 
                Sign In with your insighter account
              </span>
              <div className="login_inner_Container">
                <div className="form-holder">
                  <form onSubmit={handleSubmitForm}>
                    <div className="row">
                      <div className="col">
                        <div className="upInputs form-group nogroup">
                          <img 
                            className="input_icon"
                            src={email}
                            alt="email"
                            loading="lazy"
                          />
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
                          <img 
                            className="input_icon" 
                            src={password}
                            alt="password"
                            loading="lazy"
                          />
                          <input
                            type="password"
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
                            {" "}
                            Password{" "}
                          </label>
                        </div>
                        <div className="forgotP_container">
                          <Link to="/my-account/lost-password"> Forgot Password? </Link>
                        </div>
                        {status === "error" ? (
                          <div className="form-group alert alert-danger" style={{ width: "257px" }}>
                            {loginError == "Email not verified." ? (
                              <div>
                                Please follow the link sent to your email to complete your account activation. 
                                Click{" "}
                                <span className="email-not-verified" onClick={resendEmail}>here</span>
                                {" "}to resend the activation email.
                              </div>
                            ) : loginError == "You have exceeded the available active sessions associated with your current plan." ? (
                              <div>
                                {loginError} Click{" "}
                                <span className="email-not-verified" onClick={logoutCustomer}>here</span>
                                {" "}to sign out of all devices..
                              </div>
                            ) : (
                              loginError
                            )}
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
                <div className="login_devider">
                  <span>New to getinsights.org?</span>
                </div>
                <div>
                  <Link
                    to="/get-started" 
                    className="btn create_account" 
                  > 
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(login);