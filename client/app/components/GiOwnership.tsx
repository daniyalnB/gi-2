import React, { Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const GiOwnership = () => {
  return (
    <>
      <SEO
        title="Actionable Insights Ownership - Actionable Insights"
        description="Actionable Insights Ownership. There’s a video circulating of a man named Jason Wood says he's President and CEO of Actionable Insights and we proudly don't know this person. -  (Actionable Insights Ownership. Home > Actionable Insights Ownership. There’s a video circulating right now of a man named Jason Wood that says he is President and CEO of Actionable Insights. We are proud to say we do not know this person.)"
        link="gi-ownership"
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
          <div className="gi-owner">
            <div className="">
              <div className="row">
                <div className="col">
                  <div className="gi-owner-picture">
                    <img
                      src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/07/09074501/JasonWoodStory2.png"
                      alt="JasonWoodStory"
                      loading="lazy"  
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="gi-owner-detail">
                    <p>
                      There’s a video circulating right now of a man named Jason Wood that says he is President and CEO of Actionable Insights.
                    </p>
                    <p>
                      We are proud to say we do not know this person. There are a few Actionable Insights out there, and we’ve been tagged and emailed numerous times in the past confusing us with Jason Wood’s company.
                    </p>
                    <p>
                      We are a 501(c)(6) non-profit that was founded to preserve the health of the property insurance ecosystem. We seek to heal, not divide
                    </p>
                    <p>
                      No one should have to endure what those workers did. You will never hear or see anything like that from the great people within our organization.
                    </p>
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

export default GiOwnership;