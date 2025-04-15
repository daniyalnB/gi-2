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

const RetailLaborRates = () => {
	return (
		<>
      <SEO
        title="Retail Labor Rates - Actionable Insights"
        description="Actionable Insights is dedicated to streamlining fair wages in the restoration industry. You can help by filling this worksheet for Retail Labor Rates.
        - (Two ways to submit Retail Labor feedback: Log on to XactAnalysisXP , select Administration, choose ‘Pricing Feedback’ from the drop down, and fill out the a)"
        link="retail-labor-rates"
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
								<h2> Retail Labor Rates - Xactware </h2>
                <a href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/06/11115621/Retail_Labor_Rates_Worksheet.pdf">
                  <img
                    src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/06/11124057/Retail_Labor_Rates_Worksheet_800.png"
                    alt="Retail_Labor_Rates_Worksheet"
                    loading="lazy"
                  />
                </a>
							</div>
              <div className="worksheet">
                <a
                  className="btn"
                  href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/06/11115621/Retail_Labor_Rates_Worksheet.pdf"
                  target="_blank"
                >
                  Download the Worksheet
                </a>
                <p> Two ways to submit Retail Labor feedback: </p>
                <ol>
                  <li>
                    Log on to{" "}
                    <a
                      href="https://identity.verisk.com/"
                      target="_blank"
                    >
                      <u>XactAnalysisXP</u>
                    </a>
                    ,{" "}select Administration, choose ‘Pricing Feedback’ from the drop down, and fill out the appropriate data, being as specific as possible in your response.
                  </li>
                  <li>
                    Use the{" "}
                    <a 
                      href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/06/11115621/Retail_Labor_Rates_Worksheet.pdf"
                      target="_blank"
                    >
                      <u>Retail Labor Rates Worksheet</u>
                    </a>
                    {" "}and send your specific feedback by email to{" "}
                    <a
                      href="mailto:pricing@xactware.com"
                      target="_blank"
                    >
                      <u>pricing@xactware.com</u>
                    </a>
                    {" "}or{" "}
                    <a
                      href="mailto:pricing@xactware.ca"
                      target="_blank"
                    >
                      <u>pricing@xactware.ca</u>
                    </a>
                    {" "}for Canadian users.
                  </li>
                </ol>
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

export default withRouter(RetailLaborRates);