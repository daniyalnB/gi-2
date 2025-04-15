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

const PrivateTraining = () => {

  const [TrainforTomorrow, setTrainforTomorrow] = useState("Train for Tomorrow - Today");

	return (
		<>
      <SEO
        title="Private Xactimate and Matterport Training | Actionable Insights"
        description="As Matterport's preffered training partner & having a staff full of Xactimate Certified Trainers, we offer on-demand private Xactimate & Matterport Training. Explore more."
        link="private-training"
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
					<div className="Private_Training">
						<div className="">
							<div className="holder">
								<h2> Private Training - Remote and On-Site </h2>
                <h3>
                  Desk adjusting/estimating is the future;
                  <br />
                  Don't be left behind!
                </h3>
							</div>
              <div className="Matterport_Xactimate">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 detail">
                    <h1> Matterport </h1>
                    <div className="description">
                      <p>
                        Actionable Insights is&nbsp; 
                        <a href="https://www.randrmagonline.com/articles/88273-matterport-names-actionable-insights-as-premier-certified-trainer-support-partner">
                          <span className="affordance_links">Matterport’s premier training and support partner</span>
                        </a> 
                        &nbsp;serving the property insurance ecosystem. We conduct our personalized training remotely or at your location, combining the best practices for using Matterport’s 3D cameras and claims documentation tools to process property insurance claims.
                        This customized walk-through of all things Matterport will prepare your organization to outperform as this technology demands more specialized roles within our industry.
                      </p>
                      <br />
                      <p>
                        Matterport is not hard to use, but getting the most out of this platform requires some hard-hitting training.
                        We have developed tools and techniques that will help your team leverage Matterport in all aspects of business.
                        These include: risk engineering, business development, sales, risk management, reduced contents breakage, and client retention.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 detail">
                    <h1> Xactimate </h1>
                    <div className="description">
                      <p>
                        Like it or not, Xactimate is at the core of nearly all activities within the property insurance ecosystem.
                        You have many training options when it comes to Xactimate, but there is only one Actionable Insights! Our focus on estimating theory, mastering the price list, and writing well thought-out, justified estimates that are poised for approval without hesitation is different, and we are proud of the impact our curriculum has on those that embrace it.
                      </p>
                      <br />
                      <p>
                        Our private training engagements are led by Xactimate Certified Trainers that are well equipped to make the formerly elusive connections between Matterport’s 3D assets and Xactimate.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row digital-assets">
                  <div className="col-12">
                    <h5>
                      3D DIGITAL ASSETS ARE THE CATALYST FOR THE MOST SIGNIFICANT PARADIGM SHIFT IN CLAIMS SETTLEMENT SINCE THE INTRODUCTION OF XACTIMATE IN 1987.
                    </h5>
                  </div>
                </div>
              </div>
              <hr />
              <div className="Stakeholders">
                <div className="holder">
                  <h2> 
                    Stakeholders keep searching for talent
                    <br />
                    that can "Write & Run"
                  </h2>
                  <h4 className="mb-2"> Those that are capable of outperformance in the following three capacities: </h4>
                  <h3 className="mb-2"> SALES • PROJECT MANAGEMENT • ESTIMATING </h3>
                  <h4> 
                    Let's face it - Neapolitan Ice Cream generally sucks.
                    If you want great ice cream, you have to select for artisan pints where the creamery acutely focuses their attention around delivering an excellent product in one particular flavor.
                  </h4>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="Stakeholders_Picture">
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/03/21131136/ice_cream_infographic4.png"
                        alt="ice_cream_infographic4"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <p>
                    Actionable Insights has seen what specialization can do for culture, efficiency, and profitability, and we have a <strong>proven</strong> ability to help your team get <strong>excited</strong> about change.
                    <br />
                    You can keep looking for “Write & Run” individuals, but let’s be real – if someone in your region is that good at all three roles, either (a) they are either wildly too expensive or (b) they have already fired up a competing operation!
                    <br />
                    Alternatively, we feel the future will reward stakeholders that hire and develop talent into specialized roles where they can become exceptional at one particular function.
                    What’s more, when these individuals are provided space to triple-down on what they are great at, the natural outcome is they tend to fall in love with their jobs again!
                  </p>
                  <br />
                  <p>
                    Actionable Insights is well equipped to provide guidance on organizational redevelopment as our industry moves swiftly towards these remote desk adjusting/estimating.
                    <br />
                    And you’re in luck! Our curriculum is equally effective and applicable to contractors and carriers alike.
                    It doesn’t matter if you are an independent/franchise contractor or a Top 25 major carrier – Actionable Insights is poised to positively impact your bottom line.
                  </p>
                  <br />
                  <p>
                    <strong>
                      And for you contractors out there, currently your write-and-run estimators can only write $2.5Mn/yr.
                      Alternatively, once we trifurcate the roles and reduce the windshield time to near zero, your estimators will be pumping out $7Mn+.
                      We know you want in on that action…
                    </strong>
                  </p>
                </div>
                <div className="Training_Buttons">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 two-day">
                      <Link
                        to="/2-day-remote-training"
                        className="btn"
                      >
                        2-Day Remote Training
                      </Link>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 three-day">
                      <Link
                        to="/3-day-site-training"
                        className="btn"
                      >
                        3-Day On-Site Training
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-center mt-4">
                      <Link
                        to="/train-tomorrow-today"
                        target="_blank"
                        className="btn"
                        onMouseOver={() => setTrainforTomorrow("Learn More")}
                        onMouseOut={() => setTrainforTomorrow("Train for Tomorrow - Today")}
                      >
                        {TrainforTomorrow}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="Button_Bottom_Text">
                  <p> Or don’t, but don’t say we didn’t warn you of the risk of doing it the old way. </p>
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

export default withRouter(PrivateTraining);