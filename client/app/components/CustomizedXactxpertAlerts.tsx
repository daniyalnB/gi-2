import React, { Suspense, useState, useEffect } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const CustomizedXactxpertAlerts = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org") {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "eed0d8da-3e6b-4705-b2df-ea6639592871",
            target: "#HubspotForm",
          });
        }
        setLoading(false);
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "9bed5d63-fe9a-47ac-85de-12f444d41e04",
            target: "#HubspotForm",
          });
        }
        setLoading(false);
      });
    }
  }, []);

	return (
		<>
			<SEO
        title="Customized XactXpert Alerts - Actionable Insights"
				description="Work one-on-one with an Actionable Insights team member to develop customized XactXpert alerts for your company."
				link="customized-xactxpert-alerts"
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
				<div className="main-container" style={{ minHeight: "60vh" }}>
					<div className="HubspotForm">
						<div className="">
							{!loading && (
                <>
                  <div className="row">
                    <div className="col">
                      <h2 className="welcome"> Custom Alerts For You </h2>
                      <p className="cye"> Work one-on-one with Actionable Insights to develop custom alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology. </p>
                      <h5 className="provide-details"> Provide your details to schedule a meeting with our custom alert experts. </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div id="HubspotForm"></div>
                    </div>
                  </div>
                </>
							)}
							{loading && (
                <div className="loader-inner">
                  <LottieLoader />
                </div>
              )}
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

export default CustomizedXactxpertAlerts;