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

const StateInsuranceLicenseReciprocity = () => {
	return (
		<>
			<SEO
        title="State Insurance License Reciprocity |Actionable Insights"
        description="What is insurance license reciprocity and how do you leverage it? Learn everything you need to know with our helpful guide. Read more now."
        link="state-insurance-license-reciprocity"
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
								<h2> Insurance Reciprocity Made Simple </h2>
                <p style={{ textAlign: "center" }}>
                  Actionable Insights exists to help preserve the health of the property insurance ecosystem.
                  To further this mission, we created this guide to help insurance professionals understand insurance license reciprocity, and how they can use Actionable Insights resources to make earning Continuing Education Credit Hours easy.
                </p>
							</div>
              <div className="IRMS">
                <h5> What is insurance license reciprocity? </h5>
                <p>
                  What is insurance license reciprocity? Put simply, license reciprocity is one state honoring the licenses of another state.
                  Have a home state license? In some cases, you may be eligible for as many 34 licenses in other states.
                  The more licenses you hold, the more work that you can perform across the country.
                  Some state licenses are perceived to be more valuable than others.
                  Value can be derived from the state’s larger population, difficulty in obtaining the license, the reciprocity it enables with other states, or simply where the demand is for adjusting.
                </p>
                <h5 style={{ marginTop: "40px" }}> Know your states. </h5>
                <p style={{ marginBottom: "20px" }}>
                  There are two types of states when it comes to adjusting in the property insurance industry,{" "}
                  <strong>licensing states</strong> and <strong>non-licensing states</strong>
                  . Licensing states are those that reciprocate licenses of other states.
                  Non licensing states do not offer insurance adjuster licenses or offer reciprocity with other states.
                </p>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2021/09/02032756/licensing-states.png"
                  alt="licensing-states"
                  loading="lazy"
                />
                <h5 style={{ marginTop: "30px" }}> How do I apply for a reciprocal license? </h5>
                <p>
                  Applying for a reciprocal license can vary from state to state.
                  However, a large number of states use a third party software to make the paperwork and turn around time less of a burden for applicants.
                  You can complete paperwork, submit identification, and pay any fees all within the same software.
                  The most common 3rd party pieces of software are{" "}
                  <a
                    href="https://www.sircon.com/"
                    target="_blank"
                  >
                    Sircon
                  </a>
                  {" "}and{" "}
                  <a
                    href="https://nipr.com/"
                    target="_blank"
                  >
                    NIPR
                  </a>
                  . When in doubt, check out the desired state’s official government website for instructions.
                </p>
                <h5 style={{ marginTop: "40px" }}> Pre-Licensing vs Continuing Education </h5>
                <p>
                  Pre-licensing requirements are the steps and courses necessary to earn a home state license.
                  <br />
                  Continuing Education is the steps and courses necessary to keep or renew your license.
                </p>
                <h5 style={{ marginTop: "40px" }}> Where do Actionable Insights courses come in? </h5>
                <p>
                  We offer home state continuing education courses.
                  If you hold an insurance license in your home state with reciprocity in other states, you are now able to leverage your Actionable Academy course to cover Continuing Education requirements in your home state, thus helping you maintain your continuing education requirements.
                  In most cases by maintaining your home state license, you can maintain all your reciprocal licenses.
                </p>
                <Link
                  className="btn"
                  to="/aimc"
                >
                  LEARN MORE ABOUT ACCREDITED COURSES
                </Link>
                <p style={{ marginBottom: "20px" }}>
                  See the maps below for a quick reference as to where your Continuing Education Credits will be best leveraged.
                  Don’t forget, you need a home state license in a gold state to be able to leverage the CE course to other reciprocal states.
                  Teal indicates states that honor reciprocity with the home state.
                  In most cases, simply pay a fee and submit an application to get a license.
                  Tango indicates states that require an additional exam prior to honoring reciprocity with the home state.
                  In most cases, pay a fee, take the state final exam, and submit all required paperwork to get a license.
                  Grey indicates non-licensing states.
                </p>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2021/09/02032733/reciprocates-with-california.png"
                  alt="reciprocates-with-california"
                  loading="lazy"
                />
                <img
                  style={{ marginTop: "15px" }}
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2021/09/02032712/reciprocates-with-florida.png"
                  alt="reciprocates-with-florida"
                  loading="lazy"
                />
                <img
                  style={{ marginTop: "15px" }}
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2021/09/20235724/idaho-state.jpg"
                  alt="idaho-state"
                  loading="lazy"
                />
                <p style={{ marginTop: "30px" }}>
                  Questions about Actionable Insights Adjuster Continuing Education Credits? Send us an email at{" "}
                  <a
                    href="mailto:support@getinsights.org"
                    target="_blank"
                  >
                    support@getinsights.org
                  </a>
                  {" "}and a knowledgeable member of our staff will be happy to assist.
                </p>
                <p style={{ marginTop: "20px" }}>
                  To view our Continuing Education Credit Compliance Information, please{" "}
                  <a
                    href="https://docs.google.com/spreadsheets/d/1-RJQhqy0WDoSNghBT_q4hUg3h13q1a8mH72PtShxYmk/edit?usp=sharing"
                    target="_blank"
                  >
                    click here
                  </a>
                </p>
                <p style={{ marginTop: "20px" }}>
                  *Please note, laws and regulations around reciprocity constantly change.
                  This is intended to be used as an educational guide.
                  For technical questions, please refer to your state’s specific Department of Insurance.
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

export default withRouter(StateInsuranceLicenseReciprocity);