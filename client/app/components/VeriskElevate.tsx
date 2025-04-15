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
import VeriskElevateFaces from "assets/VeriskElevateFaces.svg";

const VeriskElevate = () => {
  return (
    <>
      <SEO
        title="Verisk Elevate - Actionable Insights"
        description="Verisk Elevate unites insurance restoration professionals, helping you expand connections and partnerships. Attend sessions and workshops to find innovations, trends, and best practices. The event also provides access to experts offering unique outlooks on industry direction. You may find new technologies and solutions to help your organization overcome challenges, like the Actionable Xactimate Profile fueled by XactXpert"
        link="verisk-elevate"
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
        <div className="VeriskElevate-header">
          <div className="header">
            <h5> Verisk Elevate 2024 </h5>
            <p> February 12-15, 2024 - Hyatt Regency Salt Lake City </p>
          </div>
        </div>
        <div className="main-container">
          <div className="VeriskElevate">
            <h1>
              {" "}
              Actionable Insights is sponsoring and speaking at Elevate 2024{" "}
            </h1>
            <h3 className="mt-4"> Why attend Verisk Elevate 2024? </h3>
            <p className="mt-4">
              {" "}
              Attending provides valuable opportunities to network, learn, and
              gain insights. The conference brings together industry
              professionals, allowing you to broaden your connections and
              relationships. You can discover the latest innovations, trends,
              and best practices by attending educational sessions and
              workshops. The event also gives you access to experts and thought
              leaders who provide unique perspectives on the direction of the
              industry. You may find new technologies and solutions to help your
              organization overcome challenges, like the Actionable Xactimate
              Profile fueled by XactXpert.{" "}
            </p>
            <a
              href="https://events.verisk.com/event/2d6bdd7e-0998-4c38-8c07-e9b9c9da40b6/summary"
              target="_blank"
              className="my-4 btn"
            >
              Register Today
            </a>
            <h5>
              {" "}
              Actionable Insights is a Gold Sponsor of the Verisk Elevate 2024.{" "}
            </h5>
            <h3 className="mt-5 h3">
              {" "}
              What is the Actionable Xactimate Profile?{" "}
            </h3>
            <p className="mt-4 mb-3 text-left">
              {" "}
              The Actionable Profile is a profile within Xactimate that provides
              live estimating guidance while you write your scope. Here are some
              key details about the Actionable Profile:{" "}
            </p>
            <ul>
              <li> Fueled by the new inspection engine, XactXpert </li>
              <li>
                {" "}
                3000+ Actionable Alerts that provide estimating guidance that
                react to your scope while you write it{" "}
              </li>
              <li>
                {" "}
                Overage alerts to identify estimating mistakes so they can be
                corrected before submission{" "}
              </li>
              <li>
                {" "}
                Omission alerts to identify line items that may be warranted to
                add to your scope{" "}
              </li>
              <li>
                {" "}
                XactScope and Xact T&M are both accessible while working in the
                Actionable Profile{" "}
              </li>
            </ul>
            <div className="youtube_video_main_Actionable_Xactimate_Profile">
              <div className="video">
                <div className="fluid-width-video-wrapper">
                  <iframe
                    src="https://www.youtube.com/embed/uRuEmEXxHTI"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    name="actionable-xactimate-profile"
                  />
                </div>
              </div>
            </div>
            <h5 className="mt-5">
              {" "}
              The Actionable Profile is a second set of eyes on your scope. No
              more mistakes, no more missed line items.{" "}
            </h5>
            <Link to="/demo" className="my-4 btn demo-btn">
              Book a demo with our experts
            </Link>
            <h3 className="mt-2 mb-4">
              {" "}
              Streamlining Claims Estimation and Management with XactXpert's
              Latest Rules{" "}
            </h3>
            <div className="VeriskElevateFaces">
              <p className="VeriskElevateFaces-text text-left">
                <b>February 13 at 10.45 am. Regency C.</b>
                <br />
                Seth Harrison, Executive Director at Actionable Insights, will
                join Robb Harrell, Senior Product Manager at Verisk, who leads
                the XactXpert product in one of the conference sessions:
                Streamlining Claims Estimation and Management with XactXpert's
                Latest Rules.
              </p>
              <img src={VeriskElevateFaces} loading="lazy" />
            </div>
            <h3 className="my-5">
              {" "}
              Connect with the Actionable Insights team at the conference{" "}
            </h3>
            <p>
              {" "}
              Find us at our booth and try the Actionable Profile live with our
              experts. Book a time in advance at{" "}
              <a href="mailto:support@getinsights.org">
                support@getinsights.org
              </a>
            </p>
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(VeriskElevate);