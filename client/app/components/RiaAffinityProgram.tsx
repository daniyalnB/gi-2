import React, { useState, useEffect, Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { Helmet } from "react-helmet";
import RIALogo from "assets/RIAAffinityPartnerLogo.webp";
import ActionableAlerts from "assets/ActionableAlerts.svg";

const RiaAffinityProgram = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);

  return (
    <>
      <SEO
        title="RIA Affinity Program - Actionable Insights"
        description="Actionable Insights has an exciting offer for RIA Members. Get a lifetime 10% off on our Actionable Xactimate Profile Pro Plan. Check it out now!"
        link="ria-affinity-program"
      />
       <Helmet>
        <script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
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
          <div className="Ria-Affinity-Program">
            <div className="">
              <div className="holder">
                <a
                  href="https://www.restorationindustry.org/product-service-discounts-ria-members"
                  target="_blank"
                >
                  RIA affinity program
                </a>
                {isSmallScreen ? (
                  <div className="row">
                    <div className="col-12 mt-5">
                      <a
                        href="https://www.restorationindustry.org/product-service-discounts-ria-members"
                        target="_blank"
                      >
                        <img
                          src={RIALogo}
                          alt="RIALogo"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <div className="col-12 mt-4">
                      <h1> Do you want to get your estimate right the first time? The Actionable Xactimate Profile provides live estimating guidance that lets you write better, more accurate estimates. <strong>RIA Members can now avail a lifetime 10% off on our Pro Plan</strong>. What are you waiting for? </h1>
                    </div>
                  </div>
                ) : (
                  <div className="row mt-5">
                    <div className="col-9">
                      <h1> Do you want to get your estimate right the first time? The Actionable Xactimate Profile provides live estimating guidance that lets you write better, more accurate estimates. <strong>RIA Members can now avail a lifetime 10% off on our Pro Plan</strong>. What are you waiting for? </h1>
                    </div>
                    <div className="col-3">
                      <a
                        href="https://www.restorationindustry.org/product-service-discounts-ria-members"
                        target="_blank"
                      >
                        <img
                          src={RIALogo}
                          alt="RIALogo"
                          loading="lazy"
                        />
                      </a>
                    </div>
                  </div>
                )}
                {localStorage.getItem("tokenCustomer") == null ? (
                  <div className="mt-5">
                    <Link
                      to="/plan-matrix"
                      target="_blank"
                      className="btn"
                    >
                      Sign Up Now
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                <p className="mt-5">
                  The Actionable Profile is an Xactimate profile that gives you access to XactXpert, Xactimate's new Claims Rules Engine. The Actionable Profile uses the Insight Sheet Database to provide live estimating guidance while you work in Xact. Additionally, it includes access to Insights Sheet Macros and adheres to industry-standard preferences. No more mistakes, no more missed line items!
                </p>
              </div>
              <div className="youtube_video_main mt-4">
                <div className="video">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/jMO-tar3G8c"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      name="actionable-xactimate-profile"
                    />
                  </div>
                </div>
              </div>
              <div className="actionable-xactimate-profile-guide">
                <h5> Actionable Xactimate Profile Pro Plan includes: </h5>
                <div className="row">
                  <div className="col-xl-4 col-md-4 col-sm-12 actionable-xactimate-profile">
                    <img src={ActionableAlerts} />
                    <span>
                      Live estimating guidance
                      <br />
                      (Actionable Alerts) that leverages
                      <br />
                      the Insight Sheet Database
                    </span>
                  </div>
                  <div className="col-xl-4 col-md-4 col-sm-12 actionable-xactimate-profile">
                    <img src={ActionableAlerts} />
                    <span>
                      Actionable’s industry-standard
                      <br />
                      default preferences
                    </span>
                  </div>
                  <div className="col-xl-4 col-md-4 col-sm-12 actionable-xactimate-profile">
                    <img src={ActionableAlerts} />
                    <span>
                      Access to all Actionable Insights
                      <br />
                      Macros
                    </span>
                  </div>
                </div>
              </div>
              <div className="holder">
                <p> Write increasingly accurate estimates with the Actionable Profile and eliminate the constant back and forth to get your estimates approved. </p>
                <div className="mt-5">
                  <Link
                    to="/actionable-xactimate-profile"
                    target="_blank"
                    className="btn"
                  >
                    Learn more here
                  </Link>
                </div>
              </div>
              <div className="ActionableInsightsDemo">
                <h5> Book a meeting with us! </h5>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0">
                    <div
                      className="meetings-iframe-container"
                      data-src="https://meetings.hubspot.com/cole121?embed=true"
                    >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Exclusive-RIA-Deal">
          <h1> Exclusive RIA Deal </h1>
          <p> Use these coupon code to get special discounts </p>
          <div className="deals-box">
            <div className="row">
              <div className="deals">
                <Link
                  to="/plan-matrix"
                  target="_blank"
                >
                  "PRO10RIA"
                </Link>
                <div className="deal-info">
                  <div className="outer">
                    <span className="inner">$162</span>
                  </div>
                  <span className="amount">$145.80</span> 
                  <span className="month">/month</span>
                  <span className="month">/seat</span>
                  <div className="annually">
                    with MONTHLY BILLING
                  </div>
                </div>
              </div>
              <div className="deals">
                <Link
                  to="/plan-matrix"
                  target="_blank"
                >
                  "PRO10RIAANNUAL"
                </Link>
                <div className="deal-info">
                  <div className="outer">
                    <span className="inner">$135</span>
                  </div>
                  <span className="amount">$121.50</span> 
                  <span className="month">/month</span>
                  <span className="month">/seat</span>
                  <div className="annually">
                    with ANNUAL BILLING
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

export default withRouter(RiaAffinityProgram);