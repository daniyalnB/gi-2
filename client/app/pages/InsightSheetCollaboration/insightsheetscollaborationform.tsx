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

const InsightSheetCollaborationForm = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
        	portalId: "3936526",
					formId: "c431c7c2-2ced-430b-b8fc-1cc5253d4ae4",
          target: "#hubspotForm",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<SEO
        title="Insight Sheets Collaboration Form - Actionable Insights"
        description="Request the creation of an entirely new Insight Sheet. Apply to be a contributor for an existing Insight Sheet by submitting an image(s) in support of said sheet. - (Insight Sheets Collaboration. Advance The Insight Sheet Database. The Insight Sheet Database will continue to evolve and mature for decades to come. As new technologies are introduced and regulatory environments change, we remain confident that there will be a sustained demand for the publication of new Insight Sheets that seek to address these realities. As such, we will constantly be ...)"
				link="advance-the-cause/insight-sheet-collaboration/insight-sheets-collaboration-form"
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

export default withRouter(InsightSheetCollaborationForm);