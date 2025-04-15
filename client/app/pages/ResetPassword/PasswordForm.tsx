import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { ResetPassword } from "../../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import password from "assets/passwordnew.png";

const PasswordForm = (props) => {

  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const data = queryString.parse(props.location.search);

  const email = data.email;

  const resettoken = data.resettoken;

  localStorage.setItem("resettoken", resettoken);

  const [resetpassword, setResetPassword] = useState({
    new: "",
    renew: "",
  });

  let str1 = resetpassword.new;
  let str2 = resetpassword.renew;

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    
    setTimeout(() => {
      const payload = {
        email: email,
        newpassword: resetpassword.new,
      };

      const stringified = queryString.stringify(payload);

      ResetPassword(stringified).subscribe(
        (response) => {
          setErr("Your Password reset Successfully");
          setResetPassword({
            new: "",
            renew: "",
          });
          setLoading(false);
          localStorage.removeItem("resettoken");
        },
        (error) => {
          setErr("Reset Password Failed");
          setLoading(false);
        }
      );
    }, 2000);
  };

  return (
    <>
      <Helmet>
				<title> 
          Reset Password - Actionable Insights
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
        <div className="login_page"> 
          <div className="container-fluid">
            <span className="title"> 
              RESET PASSWORD FORM
            </span>
            <h2 className="reset_password">
              Enter new password below
            </h2>
            <div className="login_inner_Container">
              <div className="form-holder">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group nogroup">
                        <img className="input_icon" src={password} />
                        <input
                          type="password"
                          name="password"
                          required
                          id="inputField5"
                          className="input-area"
                          value={resetpassword.new}
                          onChange={(e) =>
                            setResetPassword({
                              ...resetpassword,
                              new: e.currentTarget.value,
                            })
                          }
                        />
                        <label htmlFor="inputField5" className="floating_label">
                          New Password Characters(4-60)
                        </label>
                      </div>
                      <div className="form-group nogroup">
                        <img className="input_icon" src={password} />
                        <input
                          type="password"
                          name="confirmpassword"
                          required
                          id="inputField6"
                          className="input-area"
                          value={resetpassword.renew}
                          onChange={(e) =>
                            setResetPassword({
                              ...resetpassword,
                              renew: e.currentTarget.value,
                            })
                          }
                        />
                        <label htmlFor="inputField6" className="floating_label">
                          Confirm Password Characters(4-60)
                        </label>
                      </div>
                      {resetpassword.new !== "" &&
                        resetpassword.renew !== "" &&
                        (str1 === str2) == true ? (
                          // <div className="passwrd-height">
                          //   <span className="password-strength strong">
                          //     {" "}
                          //     Password Matched{" "}
                          //   </span>
                          // </div>
                          ""
                      ) : resetpassword.new !== "" &&
                        resetpassword.renew !== "" &&
                        (str1 === str2) == false ? (
                          <div className="passwrd-height">
                            <span className="password-strength">
                                {" "}
                                Password Mismatch{" "}
                            </span>
                          </div>
                      ) : resetpassword.new == "" &&
                        resetpassword.renew == "" &&
                        (str1 === str2) == true ? (
                          ""
                      ) : (
                        ""
                      )}
                      {err == "Your Password reset Successfully" && (
                        <div className="form-group alert alert-success">{err}</div>
                      )}
                      {err && err != "Your Password reset Successfully" && (
                        <div className="form-group alert alert-danger">{err}</div>
                      )}
                      {!loading && (
                        <>
                          {err == "Your Password reset Successfully" ? (
                            ""
                          ) : (
                            <button 
                              className="btn reset_btn"
                              type="submit"
                              disabled={
                                resetpassword.new == "" ||
                                resetpassword.renew == ""
                                ? true
                                : false
                              }
                            > 
                              <span> Save </span>
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

export default withRouter(PasswordForm);