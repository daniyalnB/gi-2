import React, { Suspense, useState, useEffect } from "react";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));

const LineItemRequestForm = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
          portalId: "3936526",
          formId: "1e3b4586-b5e0-4932-8930-13965bde7b3a",
          target: "#hubspotForm",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<SEO
        title="Line Item Request Form - Actionable Insights"
        description="Learn what happens when you submit your Line Item recommendation to Actionable Insights. How it is determined to be a credible and warranted addition. - (ACTIONABLE INSIGHTS CODE OF ETHICS. I care deeply about the restoration ecosystem. I intend to be a good steward of the restoration ecosystem. I intend to give more to the restoration ecosystem than I take away. I intend to strive for mastery, …)"
				link="advance-the-cause/line-item-request/line-item-request-form"
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
								<div className="row">
									<div className="col">
										<div id="hubspotForm"></div>
									</div>
								</div>
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

export default LineItemRequestForm;