import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import pagenotfound from "assets/page-not-found.svg";

const NotFound = () => {
	return (
		<>
			<SEO
        title="404 - Actionable Insights"
        link="404"
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
				<div className="main-container">
          <div className="page-not-found">
            <img
              src={pagenotfound}
              loading="lazy"
            />
            <h1>
              We cannot process your request right now.
              <br />
              Please try again later.
            </h1>
            <Link
              to="/contact-us"
              className="btn"
            >
              Contact Us
            </Link>
          </div>
				</div>
				<WrongBrowserDisclaimer />
				<CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(NotFound);