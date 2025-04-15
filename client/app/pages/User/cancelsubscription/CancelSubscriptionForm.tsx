import React, { Suspense, useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import {
  cancelSubscriptionPlan,
  changeSubscriptionPlanStatusToPendingCancellation,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "../../../../contexts/appContext";
import { Helmet } from "react-helmet";

const CancelSubscriptionForm = () => {

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setSubscriptionInfo(myInfo.subscriptioninfo);
    }
  }, [myInfo]);

  const [loading, setLoading] = useState(true);

  const [planCancelled, setPlanCancelled] = useState(false);

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
              formId: "338e4d44-c1e8-42f2-b7d1-fc070b984ed1",
              target: "#hubspotForm",
              onFormReady: function($form){
                $('input[id="email-338e4d44-c1e8-42f2-b7d1-fc070b984ed1"]').val(`${myInfo.ownerinfo.emailaddress}`).change();
              },
              onFormSubmit: function($form) {
                cancelPlan();
              },
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
              formId: "efc86360-360d-4f16-85a9-96775774b7af",
              target: "#hubspotForm",
              onFormReady: function($form){
                $('input[id="email-efc86360-360d-4f16-85a9-96775774b7af"]').val(`${myInfo.ownerinfo.emailaddress}`).change();
              },
              onFormSubmit: function($form) {
                cancelPlan();
              },
            });
          }
          setLoading(false);
        });
      }
    }
  }, [myInfo]);

  const cancelPlan = () => {
    if (subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlanAnnual" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlanAnnual") {
      changeSubscriptionPlanStatusToPendingCancellation().subscribe((response) => {
        if (response.response.Requested_Action) {
          setPlanCancelled(true);
          console.log(response, "Pending true")
        } else {
          setPlanCancelled(false);
          console.log(response, "Pending error")
        }
      });
    } else {
      cancelSubscriptionPlan().subscribe((response) => {
        if (response.response.Requested_Action) {
          setPlanCancelled(true);
          console.log(response, "true")
        } else {
          setPlanCancelled(false);
          console.log(response, "error")
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Cancel Subscription Form - Actionable Insights
        </title>
      </Helmet>
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
          <div className="Cancel_Subscription">
            <div className="">
              <div className="holder">
                <h2 className="mb-3"> {planCancelled ? "You Have Canceled Your Actionable Insights Membership" : "CANCEL YOUR ACTIONABLE INSIGHTS MEMBERSHIP"} </h2>
                <h5>
                  Your feedback is invaluable in helping us improve the property insurance industry. Please take a moment to answer a few quick
                  <br />
                  questions below:
                </h5>
              </div>
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
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(CancelSubscriptionForm);