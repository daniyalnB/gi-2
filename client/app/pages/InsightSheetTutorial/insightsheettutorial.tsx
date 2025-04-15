import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));

const InsightSheetTutorial = () => {
  return (
    <>
      <SEO
        title="Insight Sheet Tutorial - Actionable Insights"
        description="Watch this tutorial to explore and dissect the various elements associated with an Insight Sheet. Search the Insight Sheet Database for more solutions
        - (In this tutorial, we will explore and dissect the various elements associated with an Insight Sheet. Search the Insight Sheet Database.)"
        link="insight-sheet-tutorial"
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
          <div className="IS_page">
            <div className="holder">
              <h2> Insight Sheet Tutorial </h2>
              <h3> In this tutorial, we will explore and dissect the various elements associated with an Insight Sheet. </h3>
            </div>
            <div className="Tutorial">
              <div className="Slides">
                <div className="slide-wrapper">
                  <iframe
                    src="https://docs.google.com/presentation/d/e/2PACX-1vQ5wP6F95ZLPXf_zBVbiVkstdK8StGxRnXG67bOSTpCei-VPe-NMrI5rA-MBfjy89PCuS2AbnotFFeN/embed?start=false&loop=false&delayms=3000"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="sisd">
              <Link
                to="/insight-sheets"
                className="btn"
              >
                Search the Insight Sheet Database
              </Link>
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

export default withRouter(InsightSheetTutorial);