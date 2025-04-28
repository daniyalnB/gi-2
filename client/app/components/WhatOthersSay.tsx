import React, { Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const WhatOthersSay = () => {
	return (
		<>
      <SEO
        title="What Other's Say - Actionable Insights"
        description="Actionable Insights' leadership comprises of restoration industry leaders. That's why they're giving back to the industry they've been a part of for so long.
        - (This is what we do it for guys! Our leadership is comprised of experienced industry leaders that are indebted to an industry that has treated them exceeding)"
        link="what-others-say"
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
								<h2> Say What? </h2>
                <p style={{ textAlign: "center" }}>
                  This is what we do it for guys! Our leadership is comprised of experienced industry leaders that are indebted to an industry that has treated them exceeding well over the years.
                  As a result, they remain keen to pay it forward and they regard Actionable Insights as a credible vehicle whereby they can ensure others are poised to experience the same and similar and success if they are willing to work hard and commit themselves to becoming masters of their trade.
                </p>
							</div>
              <div className="Say_What">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-4">
                    <h1> ADJUSTERS </h1>
                    <p> “The 3D Training Modules takes the Xactimate curriculum to the next level, this 3D technology provides an immersive learning environment poised to increase student retention and make the much needed connection to the field." </p>
                    <a
                      href="http://www.nationalgeneral.com/"
                      target="_blank"
                    >
                      Scott Black, National General Insurance  
                    </a>
                    <p className="mt-5"> “After being in this business for as long as I have, it is not every day that I learn something new.  But every time I have attended these events, I leave with a new piece of information. For this, my friends, I thank you.” </p>
                    <a
                      href="http://reviewandconsulting.com"
                      target="_blank"
                    >
                      Patricia Bobbs, Review & Consulting  
                    </a>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-4">
                    <h1> CONTRACTORS </h1>
                    <p> “After functioning in numerous capacities throughout my tenure in the restoration industry, I have arrived at the conclusion that establishing a baseline standard for billing practices delivers value to carriers and contractors alike. The creation and adoption of the Actionable Insights database was long overdue. ” </p>
                    <a
                      href="http://www.thornstone.com"
                      target="_blank"
                    >
                      Khoa Truong, Thornstone Construction Group 
                    </a>
                    <p className="mt-5"> “As a restoration contractor, you would be crazy not to attend these events!" </p>
                    <a
                      href="http://www.ecopurerestoration.com/"
                      target="_blank"
                    >
                      Josh Long, EcoPure Restoration  
                    </a>
                    <p className="mt-5"> “Our shop is committed to continuing education, and as an expression of this, we have consistently attended the Actionable Insights training events – the results have delivered compelling results across the board.  Our estimating department leverages the Insight Sheet© database daily – their productivity has skyrocketed." </p>
                    <a
                      href="http://www.superiorflood.com/"
                      target="_blank"
                    >
                      Jody Cisewski, Superior DKI  
                    </a> 
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

export default WhatOthersSay;