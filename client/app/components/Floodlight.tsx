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
import { Helmet } from "react-helmet";
import APLogo from "assets/APLogoWhite.svg";

const Floodlight = () => {
	return (
		<>
			<SEO
        title="Floodlight & Actionable Insights: Optimize Your Estimating with the Actionable Xactimate Profile - Actionable Insights"
        description="Discover the power of the Actionable Profile! Improve your Xactimate scopes via the live estimating guidance that corrects mistakes and identifies line items you should include."
				link="floodlight"
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
          <div className="VeriskElevate">
            <h1> Floodlight Consulting Group & Actionable Insights </h1>
            <p className="mt-4">
              <span> We are proud to be a Floodlight Consulting Group Partner! </span>
              <br />
              As a 501(c)(6) non-profit institution, Actionable Insights exists to preserve the health of the property insurance ecosystem. As an extension of this mission, we
              <br />
              have created and curated a number of invoicing/estimating resources, educational videos, white papers, and certification courses.
						</p>
						<h4 className="mt-5 mb-4"> What is the best estimating tool for restorers? </h4>
						<img
              className="APLogo"
              src={APLogo}
              loading="lazy"
            />
						<p className="mt-4"> Live estimating guidance in Xactimate that helps your estimating team avoid costly mistakes </p>
						<div className="youtube_video_main_Actionable_Xactimate_Profile">
              <div className="video">
                <div className="fluid-width-video-wrapper floodlight">
                  <iframe
                    src="https://www.youtube.com/embed/LrTfdpeqq-g"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    name="actionable-xactimate-profile"
                  />
                </div>
              </div>
            </div>
            <p className="mt-5 mb-3"> Avoid unnecessary friction in the claims process with the Actionable Xactimate Profile. </p>
            <ul>
              <li> No more estimating mistakes thanks to Actionable Alerts that point them out while you are making them. </li>
              <li> Include warranted line items in your scope the first time around. </li>
            </ul>
            <p> <b>The Actionable Xactimate Profile will guide you while you write your scope!</b> </p>
            <div className="FloodlightConsultingGroup">
              <text> Helping you is what we do best, so take advantage of the Floodlight Consulting Group deal: </text>
              <br /><br />
              <text> <b>99% discount</b> on your first month of the Actionable Profile (automatically applied at checkout). </text>
              <br /><br />
              <text className="text"> Build a proof of concept and see our profile’s capabilities first-hand. </text>
            </div>
            <Link
              to="/plan-matrix"
              className="my-4 btn signup-btn"
            >
              Sign up for the Pro Plan
            </Link>
            <h3 className="mt-5 mb-4">
              Want to ask questions before jumping in?
              <br />
              Book a demo with our expert
            </h3>
            <div className="Demo">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" style={{ padding: "5px" }}>
                  <div
                    className="meetings-iframe-container"
                    data-src="https://meetings.hubspot.com/cole121?embed=true"
                  >
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/actionable-xactimate-profile"
              className="btn actionable-profile-btn"
            >
              Learn more about the Actionable Profile
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

export default Floodlight;