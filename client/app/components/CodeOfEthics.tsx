import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const CodeOfEthics = () => {
  return (
    <>
      <SEO
        title="Code of Ethics - Actionable Insights"
        description="Learn what Actionable Insights Code of Ethoics stands for and stands to preserve. It's all about serving the restoration industry - (Actionable Insights Code of Ethics. I care deeply about the restoration ecosystem; I intend to be a good steward of the restoration ecosystem ...)"
        link="code-of-ethics"
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
          <div className="CodeOfEthics">
            <div className="">
              <div className="holder">
                <h2> Actionable Insights Code of Ethics </h2>
              </div>
              <div className="Ethics">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/07/28155409/OG_crest.png"
                      alt="OG_crest"
                      loading="lazy"
                    />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                    <div style={{ paddingTop: "50px" }}>
                      <ul>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#26a69a" }}
                          >
                            {" "}
                          </i>
                          I care deeply about the restoration ecosystem
                        </li>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#dc4326" }}
                          >
                            {" "}
                          </i>
                          I intend to be a good steward of the restoration
                          ecosystem
                        </li>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#26a69a" }}
                          >
                            {" "}
                          </i>
                          I intend to give more to the restoration ecosystem
                          than I take away
                        </li>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#dc4326" }}
                          >
                            {" "}
                          </i>
                          I intend to strive for mastery, consistently choosing
                          to participate in education and training events
                        </li>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#26a69a" }}
                          >
                            {" "}
                          </i>
                          I agree to be polite, be professional and have a plan
                          to thoughtfully justify every position that I take
                        </li>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#dc4326" }}
                          >
                            {" "}
                          </i>
                          I agree to champion an environment of reasonable
                          profits, unencumbered competition and fair claims
                          settlement
                        </li>
                        <li>
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#26a69a" }}
                          >
                            {" "}
                          </i>
                          I am here to learn and contribute in a meaningful way,
                          not to carelessly market or poach talent
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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

export default withRouter(CodeOfEthics);