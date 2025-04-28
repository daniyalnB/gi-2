import React, { Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const TranscendingTheRestorationParadox = () => {
	return (
		<>
			<SEO
        title="Transcending The Restoration Paradox - Actionable Insights"
        description="If contractors generate sloppy, overpriced Xactimate estimates, then premiums skyrocket and claims processing becomes arduous for all materially inteIf contractors generate sloppy, overpriced Xactimate estimates, then premiums skyrocket and claims processing is challenging for all materially interested partiesrested parties"
				link="transcending-the-restoration-paradox"
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
					<div className="missing_pages">
						<div className="">
              <div className="holder">
								<h2> This is what drives us! </h2>
                <h3> Seasoned restoration contractors and claims professionals know the current path is unsustainable. </h3>
                <h5> This we-they dichotomy is encumbering our ability to love our jobs - the policyholder suffers when either side fails to participate in noble claims settlement. </h5>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/06/21164723/163453_White-Paper_photos-12_031918.jpg"
									alt="White-Paper_photos"
                  loading="lazy"  
                />
							</div>
              <div className="Restoration_Paradox">
	              <p>
                  If contractors generate sloppy, overpriced Xactimate estimates, then premiums skyrocket and claims processing becomes arduous for all materially interested parties. Conversely, if carriers are unwilling to reimburse their policyholders for reasonably incurred costs, then capable contractors who are financially solvent and equipped to warranty their work will become scarce.
                  If you love this industry, and you intend to operate within it for the foreseeable future, it is imperative that you get involved, get informed and do your part to preserve the health of the restoration industry.
                </p>
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

export default TranscendingTheRestorationParadox;