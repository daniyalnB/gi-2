import React, { Suspense, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));

const MatterportFeatureRequestForm = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
          portalId: "3936526",
          formId: "7c014c93-66a5-401f-acef-122f18c46dcf",
          target: "#hubspotForm",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<SEO
        title="Matterport Feature Request Form - Actionable Insights"
        description="Matterport Feature Request. Learn how the Actionable Insights team reviews your recommendation and incorporates it into the ongoing Matterport Request Manifest. - (Matterport Feature Request. Once you submit your recommendation, the Actionable Insights team will review your suggestion. If it is determined to be a credible and warranted addition, it will be incorporated into the ongoing Matterport Request Manifest and compared against previous submissions. This is the manifest that serves as the living ...)"
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

export default withRouter(MatterportFeatureRequestForm);