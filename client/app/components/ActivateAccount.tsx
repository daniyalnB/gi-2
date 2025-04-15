import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { ActivateAccountAPI } from "../../utils/api-routes/api-routes.util";
import history from "utils/history";
import queryString from "query-string";
import { Helmet } from "react-helmet";

const ActivateAccount = (props) => {

  const [Msg, setMsg] = useState("");

  const data = queryString.parse(props.location.search);

  const stringified = queryString.stringify({thetoken: data.thetoken});

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
      if (stringified) {
        ActivateAccountAPI(stringified).subscribe((response) => {
          if (response.response.Requested_Action) {
            setMsg("true");
          } else {
            setMsg(response.response.Message);
          }
        });
      } else {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }, []);

	return (
		<>
			<Helmet>
				<title> 
				  Actionable Insights
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
				<div className="main-container">
          <div className="ActivateAccount">
          {Msg == "true" ? (
            <div className="email-verification-success-msg">
              <h4> Your email address is verified </h4>
              <Link
                to="/my-account"
                className="btn"
              >
                Proceed
              </Link>
            </div>
          ) : Msg == "Invalid Token" ? (
            <div className="email-verification-failed-msg">
              <h4>
                Verification link has expired.
              </h4>
              <Link
                to="/my-account"
                className="btn"
              >
                Sign In
              </Link>
            </div>
          ) : (
            ""
          )}
          </div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default ActivateAccount;