import React, { Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { Helmet } from "react-helmet";

const Schedule = () => {
	return (
		<>
			<SEO
        title="Schedule - Actionable Insights"
        description="Learn how Actionable Insights enables contractors and adjusters to succeed by leveraging our resources and digital assets."
        link="schedule"
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
        <Helmet>
          <script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
        </Helmet>
				<div className="main-container">
					<div className="Schedule">
						<div className="">
              <div className="holder">
                <h2> CUSTOMIZE YOUR EXPERIENCE </h2>
                <p> Learn how Actionable Insights enables contractors and adjusters to succeed by leveraging our resources and digital assets. </p>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="meetings-iframe-container"
                  data-src="https://meetings.hubspot.com/cole121?embed=true"
                >
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

export default Schedule;