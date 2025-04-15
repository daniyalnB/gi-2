import React, { Suspense, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import step1 from "assets/STEP1.svg";
import step2 from "assets/STEP2.svg";
import step3 from "assets/STEP3.svg";

const Aitc = () => {

  const [path, setPath] = useState(location.pathname);
  
	return (
		<>
			<SEO
        title="AITC - Actionable Insights"
        description="The Actionable Insights Tools Certification course will walk you through the AI Resources – the Insight Sheet Database, the associated macros for each invoicing"
        link="aitc"
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
					<div className="AIMC">
						<div className="">
							<div className="holder">
								<h2> Actionable Insights Tools Certified </h2>
							</div>
              <div className="youtube_video_main">
                <div className="video">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/Yqf1jlAz4GU"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      name="actionable-insights-tools-certified"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text_block_aitc">
                  <p>
                    Actionable Insights is a toolbox of resources for property insurance professionals.
                    Just like technicians in the field need their tools to do great work, so do those crafting and reviewing invoices and estimates! The Actionable Insights Tools Certification course will walk you through the AI Resources – the Insight Sheet Database, the associated macros for each invoicing template, the monthly Price List Update Summary, Insighter Reports, and the estimate audit/edit engines (ZORA and Solidifai) among other tools.
                    After passing the AITC course, you will be ready to navigate the property insurance ecosystem more successfully with the best resources available!
                  </p>
                </div>
              </div>
              <div className="row steps">
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="step">
                    <div className="content-icon"> 
                      <img src={step1} />
                    </div>
                    <div className="content-title"> 
                      Step 1 
                    </div>
                    <div className="content-desc">
                      Sign Up
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="step">
                    <div className="content-icon"> 
                      <img src={step2} />
                    </div>
                    <div className="content-title"> 
                      Step 2
                    </div>
                    <div className="content-desc">
                      Take Course Online
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="step">
                    <div className="content-icon"> 
                      <img src={step3} />
                    </div>
                    <div className="content-title"> 
                      Step 3
                    </div>
                    <div className="content-desc">
                      Get Certified
                    </div>
                  </div>
                </div>
              </div>
              <div className="Button" style={{ marginBottom: "0px"}}>
                {localStorage.getItem("tokenCustomer") == null ? (
                  <Link 
                    to={{
                      pathname: "/my-account",
                      state: {
                        path: path,
                      },
                    }}
                    className="btn"
                  >
                    Become Tools Certified
                  </Link>
                ) : (
                  <Link
                    to={`/shop/certification/aitc`}
                    className="btn"
                  >
                    Become Tools Certified
                  </Link>
                )}
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

export default withRouter(Aitc);