import React, { Suspense, useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../contexts/appContext";

const ActionableProfileAlertRequest = () => {

	const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

	const [loading, setLoading] = useState(true);

	const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  useEffect(() => {
		if (localStorage.getItem("tokenCustomer") == null) {
			setLoading(false);
		} else {
			if (myInfo) {
				setSubscriptionInfo(myInfo.subscriptioninfo);
				setLoading(false);
			}
		}
  }, [myInfo]);

	return (
		<>
			<SEO
        title="Actionable Profile Alert Request Form | Vouch for new alerts"
        description="We improve Actionable Alerts based on your feedback. Help us create better alerts and improve your Xactimate experience. Share your thoughts with us."
				link="advance-the-cause/actionable-profile-alert-request"
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
				<div className="main-container actionable-profile-alert-request">
					<div className="LIR">
						{!loading && (
							<div className="">
								<div className="holder">
									<h2 className="mb-2"> Actionable Profile Alert Request Form </h2>
								</div>
								<p className="word" style={{ marginTop: "0px" }}>
									Actionable Insights is working hard in collaboration with Verisk to improve the tools you use every day. As a part of that mission, we gather requests from Insighters like yourself to create new alerts inside of the Actionable Profile. What would you like to be reminded about when creating an invoice or estimate when working in the Actionable Profile?
								</p>
								<div className="line">
									{localStorage.getItem("tokenCustomer") == null ? (
										<Link
											to="/my-account"
											className="btn"
										>
											Actionable Alert Request Form
										</Link>
									) : subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlanAnnual" ? (
										<Link
											to="/advance-the-cause/actionable-profile-alert-request/actionable-profile-alert-request-form"
											target="_blank"
											className="btn"
										>
											Actionable Alert Request Form
										</Link>
									) : myInfo.ischilduser ? (
										<Link
											to="/advance-the-cause/actionable-profile-alert-request/actionable-profile-alert-request-form"
											target="_blank"
											className="btn"
										>
											Actionable Alert Request Form
										</Link>
									) :	(
										<>
											<button
												className="btn"
												disabled
											>
												Actionable Alert Request Form
											</button>
											<div className="form-group alert alert-danger mt-3">
												Please upgrade to Pro Plan
											</div>
										</>
									)}
								</div>
								<p className="word" style={{ marginTop: "0px" }}>
									A reminder that Actionable Alerts are accessed by thousands of estimators and adjusters every day - we're excited to see what you'd like to remind yourself and your peers to do or include!
								</p>
							</div>
						)}
						{loading && (
							<div className="loader-inner">
								<LottieLoader />
							</div>
						)}
					</div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default ActionableProfileAlertRequest;