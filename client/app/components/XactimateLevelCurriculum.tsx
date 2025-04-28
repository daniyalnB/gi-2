import React, { Suspense } from "react";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));

const XactimateLevelCurriculum = () => {
	return (
		<>
      <SEO
        title="MX_LVL2_AI_v10 - Actionable Insights"
        description="Learn more with visual models in the Xactimate Level II Curriculum with practical examples of both the mitigation scope and the repair scope. - (Insight Sheet Tutorial; Events; Free Resources. Price List Update Summary; Insighter Report; Video Gallery; 3D Training Modules; Matterport Standards; Membership Resources. Membership Plans; Insight Sheet Database; Commonly Overlooked Line Items; ZORA (Estimate Audit Engine) Solidifai (Estimate Edit Engine) Actionable Academy. Go to Academy; AI ...)"
        link="mx_lvl2_ai_v10"
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
								<h2> Xactimate Level II Curriculum </h2>
							</div>
              <div className="MX_LVL2_AI_v10">
                <h4> 30,000ft </h4>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/15203342/AI_XACT_FLOOR_PLAN_v11.png"
                  alt="AI_XACT_FLOOR_PLAN_v11"
                  loading="lazy"
                />
                <h4 className="mt-5"> 20,000ft </h4>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/15203309/AI_XACT_ENTRY_PROPERTIES_v1.png"
                  alt="AI_XACT_ENTRY_PROPERTIES"
                  loading="lazy"
                />
                <h4 className="mt-5"> 10,000ft </h4>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/15203330/AI_XACT_FLOOR_PLAN_OPEN_WALL_v11.png"
                  alt="AI_XACT_FLOOR_PLAN_OPEN_WALL"
                  loading="lazy"
                />
                <h4 className="mt-5"> 5,000ft </h4>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/15203320/AI_XACT_FLOOR_PLAN_MISSING_WALL_v11.png"
                  alt="AI_XACT_FLOOR_PLAN_MISSING_WALL"
                  loading="lazy"
                />
              </div>
              <div className="row mt-5">
                <div className="col text-center">
                  <a
                    style={{
                      color: "#38ADA2",
                      fontSize: "35px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                    href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/15211005/MX_MIT_V10_SCOPE_REPORT_CAR_Redacted_v3.pdf"
                  >
                    MITIGATION (SCOPE)
                  </a>
                </div>
                <div className="col text-center">
                  <a 
                    style={{
                      color: "#38ADA2",
                      fontSize: "35px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                    href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/04/15211008/MX_REPAIR_V10_SCOPE_REPORT_CAR_Redacted_v3.pdf"
                  >
                    REPAIR (SCOPE)
                  </a>
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

export default XactimateLevelCurriculum;