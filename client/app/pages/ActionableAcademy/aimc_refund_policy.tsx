import React, { Suspense } from "react";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));

const AimcRefundPolicy = () => {
	return (
		<>
			<SEO
        title="AIMC Refund Policy - Actionable Insights"
        description="If you change your mind and no longer want to attend the course, you can email us at support@getinsights.org to request a refund."
        link="aimc-refund-policy"
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
					<div className="AIMC_GPR">
						<div className="">
              <div className="holder">
								<h2> AIMC Refund Policy </h2>
                <img
                  style={{ width: "198px" }}
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/03/31131027/AIMC_crest.png"
                  alt="AIMC_crest"
                  loading="lazy"
                />
							</div>
              <div style={{ marginTop: "20px" }}>
                <p
                  style={{ 
                    color: "#777777",
                    fontSize: "18px",
                    marginBottom: "0px",
                    fontWeight: 500,
                  }}
                >
                  Thank you for purchasing the Actionable Insights Matterport Certified course.
                  If you change your mind and no longer want to attend the course, you can email us at{" "}
                  <span style={{ color: "#26a69a" }}>
                    <a
                      style={{ color: "#26a69a" }}
                      href="mailto:support@getinsights.org"
                    >
                      support@getinsights.org
                    </a>
                  </span>{" "}to request a refund.
                  <br/>
                  Refunds are available to registrants that have not begun the video-based online course.
                  If you have purchased the AIMC course and have not started the first video module, then we will process your refund upon receipt.            
                  <br /><br />
                  Thank you for your support!
                </p>
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

export default AimcRefundPolicy;