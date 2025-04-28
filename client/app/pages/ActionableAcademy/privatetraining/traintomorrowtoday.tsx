import React, { Suspense, useState, useEffect } from "react";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));

const TrainTomorrowToday = () => {

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
    
    script.addEventListener("load", () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
        	portalId: "3936526",
					formId: "0bbe35d9-98aa-4095-9972-b2528bc0a45d",
          target: "#hubspotForm",
        });
      }
			setLoading(false);
    });
  }, []);

	return (
		<>
			<SEO
        title="Train for Tomorrow - Today - Actionable Insights"
        description="Want to know what kind of private training Actionable Insights has to offer? Figure out what training works best for you and your team, remote or on-site."
				link="train-tomorrow-today"
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

export default TrainTomorrowToday;