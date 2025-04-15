import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const DigitalAssetsLicenseAgreement = () => {
  return (
    <>
			<SEO
        title="Digital Assets License Agreement - Actionable Insights"
        description="Digital Assets refer to files and educational resources provided by Actionable Insights such as macros, slide decks, building basics, content images, clip art, stock images, and 3D tours.
        - (1.0 Digital Assets. “Digital Assets” refers to Actionable Insights-provided files such as macros, slide decks, building basics, content images, clip art, st)"
        link="digital-assets-license-agreement"
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
								<h2> Actionable Insights Digital Asset License Agreement </h2>
							</div>
							<p className="word">
                <strong> 1.0 Digital Assets. </strong> “Digital Assets” refers to Actionable Insights-provided files such as macros, slide decks, building basics, content images, clip art, stock images, and 3D tours.
                Digital Assets cannot be used for any other purpose than for which they were provided.
                You cannot distribute Digital Assets on a stand-alone basis (i.e., in circumstances in which the Digital Assets constitute the primary value of the product being distributed), and you cannot claim any rights in the Digital Assets.
							</p>
              <p className="word">
                <strong> 1.1 License. </strong> The license associated with our digital assets are granted to the associated user that initiated the initial purchase (i.e., each macros is licensed to one user and one user only – they are not intended for distribution/use within out outside your company to other users).
                All digital assets are subject to compliance with our&nbsp;
                <Link to="/terms-and-conditions">
                  Terms and Conditions
                </Link>
                &nbsp;in addition to the applicable law that may govern use of our digital assets.
              </p>
              <p className="word">
                <strong> 1.2 Actionable Insights Intellectual Property. </strong> We (and our licensors) remain the sole owner of all right, title, and interest in the Services or Software.
                We do not grant you any rights to patents, copyrights, trade secrets, trademarks, or any other rights in respect to the items in the Services or Software.
                We reserve all rights not granted under the&nbsp;
                <Link to="/terms-and-conditions">
                  Terms and Conditions
                </Link>
                .
              </p>
              <p className="word">
                <strong> 1.3 Use and Support. </strong> Use of and support for Actionable Insights digital assets requires an active&nbsp;
                <Link to="/plan-matrix">
                  Subscription
                </Link>
                &nbsp;(i.e., Plus Plan or better).
              </p>
              <p className="word">
                <strong> 1.4 Selling Actionable Insights Digital Assets. </strong> Users are not allowed you to sell our digital assets under any circumstance.
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

export default withRouter(DigitalAssetsLicenseAgreement);