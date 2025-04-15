import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../contexts/appContext";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import down from "assets/down-arrow-user.svg";
import info from "assets/Info.svg";

const zora = () => {
	return (
		<>
			<Helmet>
				<title> 
					ZORA Analysis - Actionable Insights
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
					<div className="Solidifai_Zora">
						<div className="">
							<div className="holder">
								<h2> Zora (Estimate Audit Engine) </h2>
								<h3> 
									Click&nbsp; 
									<Link
										to="/solidifai"
										target="_blank"
										className="here"
									> 
										here 
									</Link>
									&nbsp;to review an example ZORA analysis.
								</h3>
							</div>
							<div className="analysis">
								<div className="row analysis-image-section">
									<div className="col">
										<div className="image-bg">
											<div style={{ backgroundColor: "#000" }}>
												<img 
													src="https://www.getinsights.org/wp-content/themes/onepress-child/assets/images/updated_zoramask.png"
													alt="ZORA"
													loading="lazy"
												/>
												<Link to="/plan-matrix">
													<button className="btn"> Update Plan </button>
												</Link>
											</div>
										</div>
									</div>
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

export default withRouter(zora);