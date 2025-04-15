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

const InsightSheetCollaboration = () => {
	return (
		<>
			<SEO
        title="Insight Sheet Collaboration | Advance the Database with us"
        description="Did you find room for improvement and upgrades in our Insight Sheets? We want to hear your feedback. Fill out this form and share it with us."
				link="advance-the-cause/insight-sheet-collaboration"
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
								<h2> Advance The Insight Sheet Database </h2>
							</div>
							<p className="word" style={{ marginTop: "0px" }}>
								The Insight Sheet Database will continue to evolve and mature for decades to come. 
								As new technologies are introduced and regulatory environments change, we remain confident that there will be a sustained demand for the publication of new Insight Sheets that seek to address these realities. 
								As such, we will constantly be writing, researching and attempting to provide clarity for the overarching restoration ecosystem.
							</p>
							<p className="word">
								There are several scenarios that typically function as catalysts for a submission on behalf of our user base.
							</p>
							<p className="word">
								1. (1) You have identified a need for a new Insight Sheet altogether. This topic had yet to be explored.
							</p>
							<p className="word" style={{ marginTop: "10px" }}>
								2. (2) You have a small amendment to an existing Insight Sheet – we may have missed something or you would like to provide some regional feedback based on the realities informed by the market by which you operate.
							</p>
							<p className="word" style={{ marginTop: "10px" }}>
								3. (3) You own an image that you feel would be a credible addition to an existing Insight Sheet.    
							</p>
							<p className="word" style={{ marginTop: "10px" }}>
								4. (4) You would like to apply to be listed as a formal “Contributor" (You contribute to an existing Insight Sheet in a material way and the AI Board formally approves your contribution).
							</p>
							<p className="word" style={{ marginTop: "10px" }}>
								5. (5) You would like to apply to be listed as a “Principal Author" (You own a new Insight Sheet from start-to-finish and you submit it to the AI Board for approval).
							</p>
							<p className="word">
								In any case, this is a great place to remit that feedback. 
								In an effort to accommodate continuous input from our membership, we have built out a detailed form that captures these recommendations.
							</p>
							<p className="word">
								When you’re ready to move forward, click the Insight Sheet Request button below.
							</p>
							<div className="line" style={{ margin: "50px 0px 0px 0px" }}>
								<Link
									to="/advance-the-cause/insight-sheet-collaboration/insight-sheets-collaboration-form"
									target="_blank"
									className="btn mfr"
								>
									Insight Sheet Collaboration
								</Link>
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

export default withRouter(InsightSheetCollaboration);