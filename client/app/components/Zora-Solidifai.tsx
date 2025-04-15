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

const zorasolidifai = () => {
  return (
    <>
			<SEO
        title="Solidifai - Actionable Insights"
        description="Explore how your estimate is reviewed once submitted in the claims settlement process with Actionable Insights' estimate audit engine Solidifai. - (Have you ever wondered what’s going to happen once you submit an estimate to the other party in the claims settlement process? It sure would be nice to know)"
				link="solidifai"
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
					<div className="Zora-Solidifai">
						<div className="">
							<div className="holder">
								<div className="row">
									<div className="col-xl-12 col-lg-12 col-md-12 data">
										<img
											src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/03/14115914/solidifai_logo.jpg"
											alt="solidifai_logo"
											loading="lazy"
										/>
										<h2> Solidifai </h2>
										<p className="detail">
											Are you confident that every estimate leaving your office is as tight and justified as you want it to be? When was the last time your company’s estimates were reviewed by a fresh set of analytical eyes? 
										</p>
										<p className="detail">
											It’s time for you to meet Solidifai, Actionable Insights’ estimate edit engine. As a natural evolution to our ZORA tool, Solidifai takes auditing to the next level and actually edits your estimate to ensure all warranted line items were captured, thoughtfully justified, and organized in a clear, linear fashion.
										</p>
										<p className="detail">
											Upload your Matterport and Xactimate data to Solidifai to have your sheet scrubbed for overages, excesses and omissions. As Solidifai is designed to be an educational evaluation tool, please note that Solidifai is not to be used on live claims that are ongoing.
										</p>
										<p className="detail">
											Please&nbsp;
											<a 
												href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/01/14235401/Solidifai_BA.pdf"
												target="_blank"
												rel="noopener noreferrer"
											>
												click here
											</a>
											&nbsp;to review an example.
										</p>
									</div>
								</div>
								<div className="license">
									<Link
										to="/aitc"
										className="btn"
									>
										Activate Your AITC License
									</Link>
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

export default withRouter(zorasolidifai);