import React, { Suspense, useState, useEffect } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const ElevateLeads = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
        	portalId: "3936526",
					formId: "9f7469bb-8d32-4df8-9b1e-0b1ee40abb49",
          target: "#hubspotWelcomeForm",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<SEO
        title="Elevate Leads - Actionable Insights"
				description="The Actionable Xactimate Profile is an estimating solution that provides live estimating guidance within Xactimate, helping guide Xactimate users toward a complete and thorough scope of work. The tool aims to give equal credence to both overages as well as omissions, help reduce cycle times, champion a spirit of fairly settled claims, and foster environments of reasonable profits."
				link="elevate-leads"
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

export default ElevateLeads;