import React, { Suspense, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import right from "assets/right.svg";

const EnterprisePlan = () => {

	const [showTooltip1, setShowTooltip1] = useState(false);
	const refTooltip1 = useRef(null);

	const [showTooltip2, setShowTooltip2] = useState(false);
	const refTooltip2 = useRef(null);

	const [showTooltip3, setShowTooltip3] = useState(false);
	const refTooltip3 = useRef(null);

	const [showTooltip4, setShowTooltip4] = useState(false);
	const refTooltip4 = useRef(null);

	const [showTooltip7, setShowTooltip7] = useState(false);
	const refTooltip7 = useRef(null);

	const [showTooltip8, setShowTooltip8] = useState(false);
	const refTooltip8 = useRef(null);

	return (
		<>
			<SEO
        title="Enterprise Membership Plan | Organizations that need enterprise-grade features, scale, reporting and support."
        description={`Upgrade to our Enterprise Membership Plan on [getInsights.org](https://GetInsights.org "‌"). Tailored to fit large organization needs, our plan offers enterprise-grade features, scale, reporting and support.`}
				link="enterprise-membership"
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
					<div className="Plan_Matrix">
						<div className="">
							<div className="holder">
								<h2> Membership Plan </h2>
							</div>	
              <div className="Matrix Enterprise_Plan">
                <div className="row">
                  <div className="col">
                    <div className="h">
                      <h4> Features </h4>
                    </div>
                    <div className="features">
                      <h5>
                        <OverlayTrigger
                          placement="right"
                          // delay={{ show: 250, hide: 1500 }}
                          show={showTooltip1}
                          container={refTooltip1}
                          overlay={(
                            <Tooltip
                              id="planmatrix-tooltip-insightsheet"
                              onMouseEnter={() => setShowTooltip1(true)}
                              onMouseLeave={() => setShowTooltip1(false)}
                            >
                              3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
                              <Link
                                to="/insight-sheets"
                                target="_blank"
                              >
                                Learn More
                              </Link>
                            </Tooltip>
                          )}
                        >
                          <strong
                            ref={refTooltip1}
                            onMouseEnter={() => setShowTooltip1(true)}
                            onMouseLeave={() => setShowTooltip1(false)}
                          >
                            Insight Sheet Database
                          </strong>
                        </OverlayTrigger>
                      </h5>
                    </div>
                    <div className="features">
                      <h5>
                        <OverlayTrigger
                          placement="right"
                          // delay={{ show: 250, hide: 1500 }}
                          show={showTooltip2}
                          container={refTooltip2}
                          overlay={(
                            <Tooltip
                              id="planmatrix-tooltip-coli"
                              onMouseEnter={() => setShowTooltip2(true)}
                              onMouseLeave={() => setShowTooltip2(false)}
                            >
                              Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
                              200+ line items that you will never miss again!{" "}
                              <Link
                                to="commonly-overlooked-line-items"
                                target="_blank"
                              >
                                Learn More
                              </Link>
                            </Tooltip>
                          )}
                        >
                          <strong
                            ref={refTooltip2}
                            onMouseEnter={() => setShowTooltip2(true)}
                            onMouseLeave={() => setShowTooltip2(false)}
                          >
                            Commonly Overlooked Line Item Database
                          </strong>
                        </OverlayTrigger>
                      </h5>
                    </div>
                    <div className="features">
                      <h5>
                        <OverlayTrigger
                          placement="right"
                          // delay={{ show: 250, hide: 1500 }}
                          show={showTooltip3}
                          container={refTooltip3}
                          overlay={(
                            <Tooltip
                              id="planmatrix-tooltip-insightsheet"
                              onMouseEnter={() => setShowTooltip3(true)}
                              onMouseLeave={() => setShowTooltip3(false)}
                            >
                              Verify the formatting and accuracy of your scopes quickly.{" "}
                              <Link
                                to="/insight-sheets"
                                target="_blank"
                              >
                                Learn More
                              </Link>
                            </Tooltip>
                          )}
                        >
                          <strong
                            ref={refTooltip3}
                            onMouseEnter={() => setShowTooltip3(true)}
                            onMouseLeave={() => setShowTooltip3(false)}
                          >
                            As Seen in Xact Reports
                          </strong>
                        </OverlayTrigger>
                      </h5>
                    </div>
                    <div className="features">
                      <h5>
                        <OverlayTrigger
                          placement="right"
                          // delay={{ show: 250, hide: 1500 }}
                          show={showTooltip4}
                          container={refTooltip4}
                          overlay={(
                            <Tooltip
                              id="planmatrix-tooltip-macro"
                              onMouseEnter={() => setShowTooltip4(true)}
                              onMouseLeave={() => setShowTooltip4(false)}
                            >
                              100+ Xactimate Macros that help you estimate efficiently.
                              All Macros include relevant line items and F9 notes.{" "}
                              <Link
                                to="/macros"
                                target="_blank"
                              >
                                Learn More
                              </Link>
                            </Tooltip>
                          )}
                        >
                          <span
                            ref={refTooltip4}
                            onMouseEnter={() => setShowTooltip4(true)}
                            onMouseLeave={() => setShowTooltip4(false)}
                          >
                            Ability to Purchase <strong> Macros </strong>
                          </span>
                        </OverlayTrigger>
                      </h5>
                    </div>
                    <div className="features">
                      <h5>
                        <OverlayTrigger
                          placement="right"
                          // delay={{ show: 250, hide: 1500 }}
                          show={showTooltip7}
                          container={refTooltip7}
                          overlay={(
                            <Tooltip
                              id="planmatrix-tooltip-coli"
                              onMouseEnter={() => setShowTooltip7(true)}
                              onMouseLeave={() => setShowTooltip7(false)}
                            >
                              Elevate your Xactimate profile.
                              Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
                              <Link
                                to="/actionable-xactimate-profile"
                                target="_blank"
                              >
                                Learn More
                              </Link>
                            </Tooltip>
                          )}
                        >
                          <strong
                            ref={refTooltip7}
                            onMouseEnter={() => setShowTooltip7(true)}
                            onMouseLeave={() => setShowTooltip7(false)}
                          >
                            Actionable Xactimate Profile w/ all Actionable Macros
                          </strong>
                        </OverlayTrigger>
                      </h5>
                    </div>
                    <div className="features">
                      <h5>
                        <OverlayTrigger
                          placement="right"
                          // delay={{ show: 250, hide: 1500 }}
                          show={showTooltip8}
                          container={refTooltip8}
                          overlay={(
                            <Tooltip
                              id="planmatrix-tooltip-swag"
                              onMouseEnter={() => setShowTooltip8(true)}
                              onMouseLeave={() => setShowTooltip8(false)}
                            >
                              Manage your company/co-workers with ease, all under the same account.{" "}
                              <a
                                href="https://value.getinsights.org/enterprise-benefits"
                                target="_blank"
                              >
                                Learn More
                              </a>
                            </Tooltip>
                          )}
                        >
                          <span
                            ref={refTooltip8}
                            onMouseEnter={() => setShowTooltip8(true)}
                            onMouseLeave={() => setShowTooltip8(false)}
                          >
                            Enterprise-Level Account Administation
                          </span>
                        </OverlayTrigger>
                      </h5>
                    </div>
                  </div>
                  <div className="col">
                    <div className="h" style={{ textAlign: "center" }}>
                      <h4> Enterprise Plan </h4>
                    </div>
                    <div className="bc">
                      <img src={right} />
                    </div>
                    <div className="bc">
                      <img src={right} />
                    </div>
                    <div className="bc">
                      <img src={right} />
                    </div>
                    <div className="bc">
                      <p className="bc_3"> 
                        <span className="data">
                          Included in Actionable
                          <br />
                          Xactimate Profile
                        </span>
                      </p>
                    </div>
                    <div className="bc">
                      <img src={right} />
                    </div>
                    <div className="bc">
                      <img src={right} />
                    </div>
                    <div className="dc">
                      <span> Contact us for a quote </span>
                      <br />
                      <div className="buy">
                        <Link
                          className="btn"
                          to="/contact-us"
                        >
                          Contact Membership Services
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
							<div className="Request-a-call">
								<div className="row">
									<div className="col-xl-9 col-lg-8 col-md-12">
										<h1> Want to learn more about which plan works best for you? Set up a call here: </h1>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-12">
										<Link
											className="btn"
											to="/demo"
										>
											Request A Call
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="Worry-free-sign-up">
					<h1> Worry-free sign up </h1>
					<div className="row">
						<div className="Worry-free-sign-up-seections">
							<h5> Start off strong </h5>
							<p> Leverage every tool and resource to its fullest potential with a personalized rundown on your new subscription with a member of the Actionable Insights team. </p>
						</div>
						<div className="Worry-free-sign-up-seections">
							<h5> No hidden costs </h5>
							<p> We are upfront with every tool/resource and the associated costs. You won’t be receiving any supplements from our team. </p>
						</div>
						<div className="Worry-free-sign-up-seections">
							<h5> Cancel anytime </h5>
							<p> You are in the driver’s seat. You can quickly cancel or switch plans as your team’s needs change. </p>
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

export default EnterprisePlan;