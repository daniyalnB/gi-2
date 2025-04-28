import React, { Suspense, useState, useEffect, useContext } from "react";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../contexts/appContext";
import history from "utils/history";

const ActionableProfileAlertRequestForm = () => {

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
  }, []);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
      history.push("/my-account");
    }
  }, []);

  useEffect(() => {
		if (myInfo) {
      if (window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org") {
        const script = document.createElement("script");
        script.src = "https://js.hsforms.net/forms/v2.js";
        document.body.appendChild(script);
        
        script.addEventListener("load", () => {
          if(window.hbspt) {
            window.hbspt.forms.create({
              portalId: "3936526",
              formId: "71b36b58-d70e-405f-8991-5f8179cb06b4",
              target: "#hubspotForm",
              onFormReady: function($form) {
                $form.find('input[name="email"]').val(`${myInfo.ownerinfo.emailaddress}`).change();
              }
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
              formId: "900838ef-d1d9-40bc-8915-0936dbf6364b",
              target: "#hubspotForm",
              onFormReady: function($form) {
                $form.find('input[name="email"]').val(`${myInfo.ownerinfo.emailaddress}`).change();
              }
            });
          }
          setLoading(false);
        });
      }
    }
  }, [myInfo]);

	return (
		<>
			<SEO
        title="Request a Custom Alert in the Actionable Profile - Actionable Insights"
        description="Elevate your Xactimate estimates with custom alerts in the Actionable Profile. Request a personalized alert tailored to your specific needs and enhance the accuracy and efficiency of your Xactimate Estimates."
				link="advance-the-cause/actionable-profile-alert-request/actionable-profile-alert-request-form"
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
        {/* <Breadcrumbs /> */}
        <div className="Disable-Breadcrumb"></div>
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

export default ActionableProfileAlertRequestForm;