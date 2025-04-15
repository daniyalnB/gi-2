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

const LineItemRequest = () => {
	return (
		<>
			<SEO
        title="Line Item Request | Let's speak for new Xactimate Line items"
        description="We work closely with Verisk to vouch for new line items to be added in Xactimate based on your feedback. Fill out this form to share your perspective."
				link="advance-the-cause/line-item-request"
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
								Do you see an opportunity where the adoption of a new line item would help claims professionals reduce cycle times? 
								<br/>
								Are technicians performing an activity in the field but there’s no line item for policyholder reimbursement? 
								<br />
								Are you unsure of how a line item was intended to be used/applied? 
								<br />
								Have you found a component-related or grammatical error in the Xactimate Price List? 
							</p>
							<p className="word">
								After writing and publishing the first Insight Sheets, the Actionable Insights team realized there were numerous opportunities to provide value to the property insurance ecosystem by advocating on its behalf to the Xactware Pricing Department. 
								If you have an idea for a new line item or want clarity on existing line items, let us know with our Line Item Request form!
							</p>
							<div className="line">
								<Link
									to="/advance-the-cause/line-item-request/line-item-request-form"
									target="_blank"
									className="btn"
								>
									Line Item Request
								</Link>
							</div>
							<p className="word" style={{ marginTop: "0px" }}>
								This form is where we collect data in regards to what Price List additions and/or amendments the Insighters would like to see considered for eventual adoption by the Pricing Department. 
								We aggregate and organize your submissions – this provides us an opportunity to take a data-driven approach as we prioritize our conversations with Pricing Department stakeholders.
							</p>
							<p className="word">
								That said, we don’t typically tackle the pricing aspect associated with established line items. 
								Let’s be completely unambiguous about this – these Price Lists are accurate. 
								The mathematics and transparent methodologies applied are entirely beyond criticism. 
								Greg Pyne and his team have worked tirelessly for decades to create regional price lists comprised of ~19.7k line items. 
								Great care has been taken in their composition. 
								This body of work has provided the foundation by which contractors and adjusters have successfully negotiated claims for 20+ years. 
								As such, we don’t seek to inject ourselves in that aspect of the conversation – moreover, we don’t think that aspect of claims settlement is broken.
							</p>
							<p className="word">
								In other words, the price structure associated with individual line items is not the aspect that typically encumbers the claims settlement process. 
								In our experience, it is wildly more common for adjusters and contractors to arrive at an impasse when they can’t agree on line items that actually apply to the loss at hand. 
								Both parties want a fair price for the required work done right. Be that the case, we think the Insight Sheet Database is well positioned to provide value for all materially interested parties. 
							</p>
							<p className="word">
								If you have specific pricing related feedback, we encourage you to submit feedback to the Pricing Depart directly at pricing@xactware.com. 
							</p>
							<p className="word">
								As we transcend the pricing aspect, most Xactimate users have a couple of line items they would like to see added to a future price list. 
								This is your outlet folks – this is where we come together and identify various underrepresented aspects of the Price List.
							</p>
							<p className="word">
								Once you submit your recommendation, the Actionable Insights team will review your suggestion. 
								If it is determined to be a credible and warranted addition, it will be incorporated into the ongoing Line Item Request Manifest and compared against previous submissions.
							</p>
							<p className="word">
								This is the manifest that serves as the living document whereby Actionable Insights can track the progress of our attempt to serve and preserve the interests of the Insighters. 
								In an effort to keep our limited resources laser-focused, we only target a limited number of potential additions to the Price List at any given time. 
								<br />
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

export default withRouter(LineItemRequest);