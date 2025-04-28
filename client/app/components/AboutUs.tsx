import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import AS from "assets/AboutUs.webp";
import logo from "assets/Logo_Footer.svg";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us - Actionable Insights"
        description="Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally ..."
        link="about-us"
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
          <div className="about-us">
            <div className="">
              <div className="holder">
                <h1> About Us </h1>
                <h3> Diverse Perspectives - Shared Objective </h3>
              </div>
              <div className="row">
                <div className="col">
                  <div className="about-us_video">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/U0YX2TlQ1dk"
                          frameBorder="0"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sec-1">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 mt-5 text-sec">
                    <p>
                      Actionable Insights is a foundation that exists to
                      preserve the health of the restoration ecosystem by
                      advancing legislation and clarifying globally recognized
                      billing standards. As a natural expression of this
                      mission, we established estimating guidelines that help
                      Xactimate users generate accurate estimates that are
                      approved without hesitation.
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 mt-5">
                    <img src={AS} />
                  </div>
                </div>
              </div>
              <div className="sec-2">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 img-sec">
                    <img src={logo} />
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 text-sec">
                    <p>
                      Our leadership is comprised of adjusters, specialty
                      contractors, insurance defense attorneys and Xactimate
                      trainers. We all care deeply about this industry and we
                      regard Actionable Insights as a vehicle by which we can
                      give back to an industry that has been so good to us.
                      There is a groundswell movement emerging, comprised of
                      individuals (on both sides of the claim) that are keen to
                      explore better ways to settle claims. With industry-wide
                      participation, we can transcend the “we-they” dichotomy
                      that often emerges between adjusters and contractors.
                      Doesn’t that sound refreshing! Collectively, we can
                      further the adoption of new line items, advance beneficial
                      legislation, reduce cycle times, champion a spirit of
                      fairly settled claims, make reasonable profits and have
                      some fun in the process.
                    </p>
                  </div>
                </div>
              </div>
              <div className="ultimate-beneficiary">
                <p>
                  ***The ultimate beneficiary is the policyholder, who is our
                  common client and whose interests we should be working
                  together to serve and preserve.***
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="still-have-a-question">
          <div className="question-section">
            <h2> Want to learn more? </h2>
            <Link to="/demo" className="btn">
              Book a demo with an expert
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

export default AboutUs;