import React, { Suspense, useState } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { ForgotPassword } from "../../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import validator from "validator";
import email from "assets/envelope.svg";

const EmailForm = (props) => {
    
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState("");

  const [msg, setMsg] = useState(false);

  const [emailaddress, setEmailAddress] = useState("");

  const validemail = validator.isEmail(emailaddress);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    
    setTimeout(() => {
      const payload = {
        email: emailaddress,
      };

      const stringified = queryString.stringify(payload);

      ForgotPassword(stringified).subscribe(
        (response) => {
          setMsg(true);
          setErr("");
          setLoading(false);
        },
        (error) => {
          setErr(JSON.parse(error.response).Message);
          setLoading(false);
        }
      );
    }, 2000);
  };

  return (
    <>
      <SEO
        title="Reset Password - Actionable Insights"
        description="Learn how to reset the password for your Actionable Insights membership account. Follow the guidelines and get back access to your account."
        link="my-account/lost-password"
      />
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
        <div className="login_page">
          <div className="container-fluid">
            <span className="title">RESET PASSWORD FORM</span>
            <h2 className="reset_password">
              Lost your password? Please enter your username or email address.
              <br />
              You will receive a link to create a new password via email.
            </h2>
            <div className="login_inner_Container">
              <div className="form-holder">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className="upInputs form-group nogroup">
                        <img className="input_icon" src={email} />
                        <input
                          type="email"
                          name="Email"
                          placeholder=" "
                          required
                          onChange={(e) => {
                            [setEmailAddress(e.currentTarget.value)];
                          }}
                        />
                        <label className="upLabel"> Email </label>
                      </div>
                      {err == "Email address not found." ? (
                        <div className="form-group alert alert-danger">{err}</div>
                      ) : (
                        ""
                      )}
                      {msg ? (
                        <div className="form-group alert alert-success"> Password reset email has been sent. </div>
                      ) : (
                        ""
                      )}
                      {!loading && (
                        <>
                          {!msg && (
                            <button
                              className="btn reset_btn"
                              type="submit"
                              disabled={
                                emailaddress == "" || validemail == false
                                  ? true
                                  : false
                              }
                            >
                              <span> Reset Password </span>
                            </button>
                          )}
                        </>
                      )}
                      {loading && (
                        <button className="btn reset_btn" disabled>
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
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(EmailForm);