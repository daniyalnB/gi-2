import React, { useState, useEffect, Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import { HideOn } from "react-hide-on-scroll";
import blog_image1 from "assets/blog_image1.png";
import blog_image2 from "assets/blog_image2.png";
import blog_image3 from "assets/blog_image3.png";
import blog_image4 from "assets/blog_image4.png";
import blog_image5 from "assets/blog_image5.png";
import blog_image6 from "assets/blog_image6.png";
import blog_image7 from "assets/blog_image7.png";
import blog_image8 from "assets/blog_image8.png";

const AnActionableGuideToTheInsightSheetDatabase = () => {

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
        title="An Actionable Guide To The Insight Sheet Database - Actionable Insights"
        description="As part of Actionable Insights' aim to preserve the health of the property insurance ecosystem, we guide you about license reciprocity, which is one state honoring the licenses of another. - (Actionable Insights exists to help preserve the health of the property insurance ecosystem. To further this mission, we created this guide to help insurance)"
        link="blog/an-actionable-guide-to-the-insight-sheet-database"
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
        <HideOn showOnPageInit height={isScreenHeight ? 6200 : 5900}>
          <div className="blog_side_menu">
            <a href="#insight-sheet-database">
              — 
              <span>
                What is the Insight
                <br />
                Sheet Database?
              </span>
            </a>
            <a href="#understanding-the-insight-sheet">
              —
              <span>
                Understanding the
                <br />
                Insight Sheet
              </span>
            </a>
            <a href="#conclusion">
              — <span>Conclusion</span>
            </a>
            <a href="#video">
              — <span>Video</span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder">
								<h2 className="mb-4">
                  A GUIDE TO THE INSIGHT
                  <br />
                  SHEET DATABASE
                </h2>
                <span className="team"> Team Actionable | September 18, 2024 </span>
                <br />
                <img
                  src={blog_image1}
                  className="mt-3 mb-4"
                />
                <div id="insight-sheet-database">
                  <p>
                    Hey Insighters, welcome to the very first Actionable Insights blog post! Our blog will feature lots of insightful content, including questions from you, tutorials, and other updates from our team. Our first blog post centers around a submission from Cole’s Common Questions: How do you use the Insight Sheet Database?
                  </p>
                </div>
                <div id="understanding-the-insight-sheet">
                  <h3 className="mt-5 mb-3"> First things first: <span className="red">What is the Insight Sheet Database?</span> </h3>
                  <p>
                    The <Link to="/insight-sheets" target="_blank">Insight Sheet Database</Link> consists of 3700+ pages of Xactimate invoicing templates (that’s a lot of pages!) that help clarify which line items should be used in a restoration claims environment. We began building out this database in 2016 with the goal of helping adjusters and contractors write more informed and justified Xactimate estimates. Actionable Insights members can access this entire database through their account at <Link to="/" target="_blank">getinsights.org</Link>.
                  </p>
                </div>
                <div>
                  <h4 className="mt-5 mb-3"> Understanding the Insight Sheet </h4>
                  <p className="mb-5"> Our Insight Sheets are intuitively designed to outline important line items and F9 note information in a concise, easy-to-understand format. Here's a breakdown of its layout: </p>
                  <p>
                    1. <strong>Front Page</strong>: The front page displays the title, version number, and color-coded categories (Mitigation = tango, Repair = teal).
                  </p>
                  <img
                    src={blog_image2}
                    className="mt-3 mb-5"
                  />
                  <p>
                    2. <strong>Loss Snapshot</strong>: This section gives background information on the loss the template was written for, including detailed information about the specific scenario.
                  </p>
                  <img
                    src={blog_image3}
                    className="mt-3 mb-5"
                  />
                  <p>
                    3. <strong>Line Item Index</strong>: A quick reference guide to all the line items covered in the Insight Sheet. Think Cliffsnotes for invoicing!
                  </p>
                  <img
                    src={blog_image4}
                    className="mt-3 mb-5"
                  />
                  <p className="mb-3">
                    4. <strong>Main Content</strong>: This section contains the category, selector code, activity, calculation, quantity, unit of measurement, and line item description, followed by a detailed F9 note for each line item.
                  </p>
                  <p className="mb-3">
                    5. <strong>Key Concepts</strong>: Located at the bottom left corner, this green box highlights essential industry knowledge, traditions, and background information to help you understand and justify using the line items.
                  </p>
                  <p>
                    6. <strong>Additional Line Item Info</strong>: In the bottom right corner, this blue box contains information pulled directly from Xactimate, including details about the line item itself, specific notes, depreciation, or life expectancy.
                  </p>
                  <img
                    src={blog_image5}
                    className="mt-3 mb-5"
                  />
                  <p>
                    7. <strong>Imagery</strong>: All Insight Sheets include images that illustrate certain aspects of the work performed, such as a mitered corner.
                  </p>
                  <img
                    src={blog_image6}
                    className="mt-3 mb-5"
                  />
                  <p>
                    8. <strong>Situationally Relevant Line Items</strong>: These are additional items that didn't make the cut for the specific scenario in the Insight Sheet but may be relevant for your particular loss.
                  </p>
                  <img
                    src={blog_image7}
                    className="mt-3 mb-5"
                  />
                  <p>
                    9. <strong>Contributors & Editors</strong>: Last but not least, we want to give a big thank you to those who have and continue to help write and curate these Insight Sheets. If you're interested in being a contributor or editor, feel free to reach out to our team at <a href="mailto:support@getinsights.org">support@getinsights.org</a>.
                  </p>
                  <img
                    src={blog_image8}
                    className="mt-3"
                    style={{ marginBottom: "-100px" }}
                  />
                </div>
                <div
                  className="mb-5"
                  id="conclusion"
                >
                </div>
                <div className="pb-5 pt-5"></div>
                <div id="video">
                  <h4 className="mb-3"> Conclusion </h4>
                  <p>
                    The Insight Sheet Database is your resource for creating well-informed, accurate, and standardized Xactimate estimates. This growing database is intuitively designed to help you access and utilize information for your estimates.
                    <br /><br />
                    If you have any other questions or need further clarification, please don't hesitate to reach out to us. Our team at Actionable Insights loves hearing from you and is always here to help. Stay tuned for more posts from us — happy scoping!
                  </p>
                </div>
                <div>
                  <h4 className="mt-5 mb-4"> Check Out the Video Guide: </h4>
                  <div className="youtube_video_main">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/UKeWC7qHHM0"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</div>
        <div className="try-the-actionable-xactimate-profile">
          <h1> Try the Actionable Xactimate Profile </h1>
          <p>
            Book a demo with an Actionable Insights expert to discover more membership
            <br />
            resources, including access to the award-nominated Actionable Profile.
          </p>
          <Link to="/demo" target="_blank">
            Book a Demo with Cole
          </Link>
        </div>
				<WrongBrowserDisclaimer />
				<CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(AnActionableGuideToTheInsightSheetDatabase);