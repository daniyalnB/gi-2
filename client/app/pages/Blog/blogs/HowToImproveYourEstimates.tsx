import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import { HideOn } from "react-hide-on-scroll";
import blog_image11 from "assets/blog_image11.png";
import blog_image12 from "assets/blog_image12.png";
import blog_image13 from "assets/blog_image13.png";
import blog_image14 from "assets/blog_image14.png";
import blog_image15 from "assets/blog_image15.png";
import blog_image16 from "assets/blog_image16.png";
import blog_image17 from "assets/blog_image17.png";

const HowToImproveYourEstimates = () => {

  const [isScreenHeight, setIsScreenHeight] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const height = window.innerHeight;
      if (height < 786) {
        setIsScreenHeight(true);
      } else {
        setIsScreenHeight(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);
  
	return (
		<>
			<SEO
        title="Write accurate Xactimate estimates with the Actionable Profile"
        description="The Actionable Profile is reinventing estimating in Xactimate. Improve accuracy, catch mistakes, and include all warranted line items for more comprehensive estimates."
        link="blog/how-to-improve-your-estimates"
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
        <HideOn showOnPageInit height={isScreenHeight ? 6600 : 6400}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#the-actionable-xactimate-profile">
              —
              <span>
                The Actionable
                <br />
                Xactimate Profile
              </span>
            </a>
            <a href="#the-types-of-guidance-in-the-actionable-profile">
              — 
              <span>
                The Types of Guidance
                <br />
                in the Actionable Profile
              </span>
            </a>
            <a href="#getting-started-with-the-actionable-xactimate-profile">
              — 
              <span>
                Getting started with the
                <br />
                Actionable Xactimate
                <br />
                Profile
              </span>
            </a>
            <a href="#video-guide">
              — <span>Video Guide</span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    How to Write Better Estimates in Xactimate?
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Oct 2, 2024 </span>
                  <br />
                  <img
                    src={blog_image17}
                    className="mt-3 mb-4"
                  />
                  <p className="mb-0">
                    <a href="https://www.verisk.com/products/xactimate/" target="_blank" className="red">Xactimate</a> is the go-to estimating tool in the restoration industry. Furthermore, it is equally important for both contractors and adjusters to ensure accurate estimates for fair payment. Without the ability to deliver professionally written Xactimate Estimates to your clients, insurance companies, and third-party administrators, you will be at a competitive disadvantage in your local market.
                    <br /><br />
                    Learning line items and creating detailed sketches are great starting points to <span className="blue">write better estimates</span> but what if you had embedded guidance in Xactimate?
                  </p>
                  <img
                    src={blog_image11}
                    className="mt-4 mb-4"
                    style={{ width: "500px" }}
                  />
                  <p>
                    If you’re familiar with Xactimate, you’ll know that there are two profiles in the software: one for carriers and one for contractors. 
                    <br /><br />
                    Now, there’s a new profile in town that can help you improve your estimates.
                  </p>
                  <img
                    src={blog_image12}
                    className="mt-4"
                    style={{ width: "500px", marginBottom: "-144px" }}
                  />
                  <div
                    className="mb-5"
                    id="the-actionable-xactimate-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <div>
                    <h5 className="mt-5 mb-3"> The Actionable <span className="red">Xactimate</span> Profile </h5>
                    <p>
                      Released in October 2022 by Actionable Insights, the <Link to="/actionable-xactimate-profile" target="_blank">Actionable Xactimate Profile</Link> is a profile within Xactimate that provides live estimating guidance, helping Xactimate users write a complete and accurate estimate. The Actionable Profile traces its origin back to the Umpire’s Invoicing Manual, a 3,000-page book on Invoicing Rules based on customary and reasonable practices in the industry. Now, the Actionable Profile has over 3,500 alerts guiding users to improve their Xactimate estimates.
                      <br /><br />
                      Industry-Standard Default Settings for Reality
                      <br /><br />
                      The Actionable Profile’s default settings thoughtfully reflect the reality of mitigation and repair in the field. These settings change how the waste functions/algorithms in Xact function.
                      <br /><br />
                      For example, the Actionable Profile does not deduct missing doors or windows from wall calculations, but it will deduct missing walls from wall calculations if they’re greater than 24 square feet. This profile recognizes that trade-off between labor and material – you shouldn’t paint a missing wall, but you might need to do more work to accommodate that missing area.
                    </p>
                  </div>
                  <img
                    src={blog_image13}
                    className="mt-4"
                    style={{ width: "500px" }}
                  />
                  <h5 className="mt-5 mb-3"> An Inspection Engine With <span className="red">Live Estimating Guidance</span> </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    The Actionable Profile provides live estimating guidance – powered by the Insight Sheet Database – as you write your scope. The Actionable Profile generates Actionable Alerts to help catch mistakes, overages, and omissions and ensure all warranted line items are included so you can write better estimates. 
                    <br /><br />
                    For example, the inspection engine will flag an Actionable Alert noting that you’ve included sink activities but you have no supply lines or angle stop valves. This is what we would call an omission rule.
                  </p>
                  <div
                    className="mb-5"
                    id="the-types-of-guidance-in-the-actionable-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <div>
                    <h5 className="mt-5 mb-3"> The <span className="blue">Types of Guidance</span> in the Actionable Profile </h5>
                    <p className="mb-0">
                      The Actionable Profile provides two primary types of guidance in Xactimate to help you write accurate estimates.
                      <br /><br />
                      <span className="red text-decoration-none bold">Omission Alerts</span>
                      <br /><br />
                      As you can see from the example above, an omission alert notifies you about missing warranted line items or a less-than-appropriate quantity of those line items.
                      <br /><br />
                      Another example of the omission rule is when you work on a 20-foot-high ceiling. In this case, the omission rule reminds you to appropriately charge by adding the relevant line item.
                    </p>
                  </div>
                  <img
                    src={blog_image14}
                    className="mt-3 mb-3"
                  />
                  <p className="mb-0">
                    <span className="red text-decoration-none bold">Overage Alerts</span>
                    <br /><br />
                    An overage alert fires when you are using duplicate line items or excessive quantities of line items based on your sketch and the rest of the scope.
                    <br /><br />
                    For instance, the line item for drywall already contains texture in it. If you add a separate line item for texture, the overage alert will notify you to remove the additional line item or add an F9 note to clarify.
                  </p>
                  <img
                    src={blog_image15}
                    className="mt-3 mb-3"
                  />
                  <p className="mb-0 text-center"> Hey, there’s more! </p>
                  <p className="mt-3">
                    <span className="red text-decoration-none bold">XactScope</span>
                    <br /><br />
                    We’ve also equipped the Actionable Profile with XactScope for mitigation invoicing and exterior estimating. With rule scripts tailored for both green and seasoned teams, you can improve your estimates and deliver exceptional results, no matter the project type.
                  </p>
                  <h5 className="mt-5 mb-3"> Access to 100+ <span className="red">Xactimate Macros</span> </h5>
                  <p className="mb-0">
                    Most contractors and adjusters who estimate in Xactimate know about macros. These are MCX files which are essentially a group of line items bundled into templates. You can use macros to boost your productivity in repetitive estimating tasks. Gain access to <Link to="/macros" target="_blank">getinsights/macros</Link> that will help you estimate efficiently. All Macros include relevant line items and F9 notes and you get them for free with the Actionable Profile.
                  </p>
                  <p className="mt-5 text-center">
                    <strong> Try the Actionable Xactimate Profile for 99% off your first month! </strong>
                  </p>
                  <div className="mt-4 text-center" style={{ marginBottom: "-144px" }}>
                    <Link to="/actionable-xactimate-profile" target="_blank" className="btn">
                      BOOK A CALL
                    </Link>
                  </div>
                  <div
                    className="mb-5"
                    id="getting-started-with-the-actionable-xactimate-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <div>
                    <h5 className="mt-5 mb-3">
                      Getting started with the <span className="blue">Actionable Xactimate Profile</span>
                      <br />
                      is simple
                    </h5>
                    <p className="mb-0">
                      <ul>
                        <li>Sign up for the Actionable Insights <Link to="/plan-matrix" target="_blank">Pro Plan</Link></li>
                        <li>Add your company's Xactimate licenses</li>
                        <li>Request company-wide activation</li>
                        <li>Enable access to the Actionable Profile</li>
                        <li>Sync it</li>
                        <li>Start estimating with confidence</li>
                      </ul>
                    </p>
                  </div>
                  <p className="mt-5 mb-0">
                    Master Xactimate and Learn to Write Accurate Estimates With <Link to="/actionable-xactimate-profile" target="_blank">Actionable Profile & Xact Best Practices Bootcamp</Link>
                  </p>
                  <img
                    src={blog_image16}
                    className="mt-4 mb-4"
                    style={{ width: "500px" }}
                  />
                  <div>
                    <p style={{ marginBottom: "-144px" }}>
                      Want to write better estimates? We have designed a <b>two-day comprehensive course</b> to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile. This bootcamp covers Xactimate’s history, future, and essential features, providing an in-depth analysis of how to maximize Xactimate's potential for the modern-day estimator and claims professional. Whether you’re an experienced professional or starting from scratch, we can proudly say there’s no better place to learn how to do things the right way.
                      <br /><br />
                      Consistently writing well-informed and accurate estimates is essential in today’s restoration market, and technology can help you get there. Sign up for the Actionable Insights Pro Plan membership, which includes access to the Actionable Xactimate Profile and more. Experience a new era of precision, speed, and efficiency in estimating workflow. 
                      <br />We hope this was helpful! We love answering questions and getting feedback from our users. If you have any further questions, please contact us at <a href="mailto:support@getinsights.org">support@getinsights.org</a>.
                    </p>
                  </div>
                  <div
                    className="mb-5"
                    id="video-guide"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <div>
                    <h5 className="mt-5 mb-4"> Check out the video guide: </h5>
                    <div className="youtube_video_main mb-4">
                      <div className="video">
                        <div className="fluid-width-video-wrapper">
                          <iframe
                            src="https://www.youtube.com/embed/Sek2J_Q2fJM"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            name="actionable-xactimate-profile"
                            style={{ borderRadius: "15px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-center">
                      Book a demo to witness the Actionable Profile today. 
                      <br />
                      Get <b>99% off</b> your first month – just $1.62/seat!
                    </p>
                    <Link to="/demo" target="_blank" className="btn">
                      SCHEDULE A CALL
                    </Link>
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

export default HowToImproveYourEstimates;