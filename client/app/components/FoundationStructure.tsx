import React, { Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const FoundationStructure = () => {
  return (
    <>
      <SEO
        title="Foundation Structure - Actionable Insights"
        description="Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and global billing standards. - (Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally recogni)"
        link="foundation-structure"
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
                <h1> Foundation Structure </h1>
                <p style={{ marginTop: "30px" }}> 
                  Actionable Insights is a foundation that exists to preserve the health of the restoration ecosystem by advancing legislation and clarifying globally recognized billing standards.
                  As a natural expression of this mission, we established estimating guidelines that help Xactimate users generate accurate estimates that are approved without hesitation.
                </p>
                <p>
                  Our leadership is comprised of adjusters, speciality contractors, insurance defense attorneys and Xactimate trainers.
                  We all care deeply about this industry and we regard Actionable Insights as a vehicle by which we can give back to an industry that has been so good to us.
                  There is a groundswell movement emerging, comprised of individuals (on both sides of the claim) that are keen to explore better ways to settle claims.
                  With industry-wide participation, we can transcend the “we-they" dichotomy that often emerges between adjusters and contractors.
                  Doesn’t that sound refreshing! Collectively, we can further the adoption of new line items, advance beneficial legislation, reduce cycle times, champion a spirit of fairly settled claims, make reasonable profits and have some fun in the process.
                </p>
                <p style={{ marginBottom: "0px" }}>
                  <strong> ***The ultimate beneficiary is the policyholder, who is our common client and whose interests we should be working together to serve and preserve.*** </strong>
                </p>
              </div>
              <div className="foundation-structure">
                <div className="divider"></div>
                <p>
                  Below is an ad-hoc organizational&nbsp;chart that seeks to highlight some of the&nbsp;key aspects associated with the Actionable&nbsp;Insights Bi-Laws and the associated Council Charters.
                </p>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/11/12155356/Actionable-Insights-Foundation-Structure.png"
                  alt="Actionable-Insights-Foundation-Structure"
                  loading="lazy"
                />
                <div className="divider"></div>
                <div className="Buttons">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 mb-3">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScqoRFkJusuke6E-zP5t_GT_wUqch2C6PZ_qEj6yNo0pi3jQw/viewform?usp=sf_link"
                        target="_blank"
                        className="btn"
                      >
                        Ambassador Application
                      </a>
                    </div>
                    <div className="col-lg-3 col-md-12 mb-3">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdolSYK5kHIwK-RGk6rn9oz8k5cX4py0eiNJ1VKrXHx-WiRBQ/viewform?usp=sf_link"
                        target="_blank"
                        className="btn"
                      >
                        Contractor Council Application
                      </a>
                    </div>
                    <div className="col-lg-3 col-md-12 mb-3">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfPmxoMKw-NcKC7tyc7YPZLp8kBifxzhDZEfCmbl3WXVS2fCg/viewform?usp=sf_link"
                        target="_blank"
                        className="btn"
                      >
                        Carrier Council Application
                      </a>
                    </div>
                    <div className="col-lg-3 col-md-12 mb-3">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeG6c26oIi_Kt4SEriycs1SvJhAn6hewaMZ7SvP9RGTv9FozA/viewform?usp=sf_link"
                        target="_blank"
                        className="btn"
                      >
                        Board Member Application
                      </a>
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

export default FoundationStructure;