import React, { Suspense } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const YearReview2019 = () => {
	return (
		<>
			<SEO
        title="2019: A Year in Review - Actionable Insights"
        description="Acyional Insights thanks you. Without your support, we would be nothing. Every subscription, training attendee, speaking engagement, and private training booking matters."
        link="2019-year-review"
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
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/01/31115439/2019AYearinReview_v2.png"
                  alt="2019AYearinReview"
                  loading="lazy"
                />
							</div>
              <div className="IRMS">
                <p>
                  As we close out January, the Actionable Insights team took a moment to look back at the last year with incredible gratitude and appreciation.
                  Our team grew (hey Elliott!), our families grew (welcome Zoey Whatley!), and in total we traveled over 74K+ miles around the country to impact the lives of contractors and carriers doing great work.
                </p>
                <p style={{ marginTop: "15px" }}>
                  Thank you. Without your support, we would be nothing.
                  Every subscription, training attendee, speaking engagement, and private training booking fuels our ability to affect positive change within the restoration ecosystem.
                </p>
                <p style={{ marginTop: "15px" }}>
                  In honor of those that made us better in 2019, consider taking a moment today and thanking someone for their help and support last year.
                </p>
                <p style={{ marginTop: "15px" }}>
                  So again, thank you.
                  You are the reason we keep building new resources designed to help people fall in love with their jobs, and with your support, we’ll keep going so you can too.
                </p>
                <p style={{ marginTop: "15px" }}>
                  Sincerely,
                  <br />
                  Seth Harrison
                  <br />
                  Associate Director
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

export default withRouter(YearReview2019);