import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const ConventionLeads = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
          portalId: "3936526",
          formId: "17d18fa0-488e-48ff-aeae-62439992e074",
          target: "#hubspotWelcomeForm",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<SEO
        title="Convention Leads - Actionable Insights"
				description="Unlock exclusive insights and resources. Sign up now to access valuable industry information, expert tips, and special offers tailored just for you. Join our community today!"
				link="convention-leads"
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
					<div className="HubspotForm">
						<div className="">
							{!loading && (
                <>
                  <div className="row">
                    <div className="col">
                      <h2 className="welcome"> Welcome to Actionable Insights </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div id="hubspotWelcomeForm"></div>
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

export default withRouter(ConventionLeads);