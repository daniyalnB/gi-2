import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));

const MatterportFeatureRequest = () => {
	return (
		<>
			<SEO
        title="Matterport Feature Request | What do you wanna see in the future"
        description="As Matterport’s training and support partner, Actionable Insights will support your voice for future updates you want to see. Submit your form."
				link="advance-the-cause/matterport-feature-request"
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
					<div className="LIR">
						<div className="">
							<div className="holder">
								<h2> The Power Of Speaking With One Voice </h2>
							</div>
							<p className="word" style={{ marginTop: "0px" }}>
								If you’re thinking about Matterport right now, the timing couldn’t be better. 
								Actionable Insights has watched the property insurance ecosystem rapidly adopt this hot new technology as it helps all materially interested parties settle claims swiftly.
							</p>
							<p className="word">
								As Matterport’s training and support partner, Actionable Insights is happy to provide guidance and feedback about what contractors and adjusters want to see in future updates.
							</p>
							<div className="line">
								<Link
									to="/advance-the-cause/matterport-feature-request/matterport-feature-request-form"
									target="_blank"
									className="btn mfr"
								>
									Matterport Feature Request
								</Link>
							</div>
							<p className="word" style={{ marginTop: "0px" }}>
								Once you submit your recommendation, the Actionable Insights team will review your suggestion. 
								If it is determined to be a credible and warranted addition, it will be incorporated into the ongoing Matterport Request Manifest and compared against previous submissions.
							</p>
							<p className="word">
								This is the manifest that serves as the living document whereby Actionable Insights can track the progress of our attempt to serve and preserve the interests of the Insighters. 
								If you feel your suggestion(s) fall within the confines of our objectives outlined above and are not at odds with our&nbsp; 
								<Link
									to="/code-of-ethics"
								>
									Code of Ethics 
								</Link>
								, then please click the button above.
							</p>
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

export default withRouter(MatterportFeatureRequest);