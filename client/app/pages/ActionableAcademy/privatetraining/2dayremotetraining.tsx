import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));

const TwoDayRemoteTraining = () => {

  const [TrainforTomorrow, setTrainforTomorrow] = useState("Train for Tomorrow - Today");

	return (
		<>
			<SEO
        title="2-Day Remote Training - Actionable Insights"
        description="Actionable Insights has been proving online training for Xactimate and Matterport since 2016. It's been an incredibly efficient way to provide impactful knowledge. - (Actionable Insights has been training Xactimate and Matterport online since 2016. We've found it's an incredibly efficient way to provide our impactful ...)"
        link="2-day-remote-training"
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
					<div className="Training_2-Day_3-Day">
						<div className="">
							<div className="holder">
								<h2> 2-Day Remote Training </h2>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/14102932/Remote-Private-Training_2day_1180x400.png"
                  alt="Remote-Private-Training_2day"
                  loading="lazy"
                />
							</div>
              <div className="row detail">
                <div className="col-12">
                  <p>
                    Actionable Insights has been training Xactimate and Matterport online since 2016.
                    We’ve found it’s an incredibly efficient way to provide our impactful curriculum with your finances and logistics in mind.
                    With that in mind, here’s what’s included in our two-day remote private training package:
                  </p>
                </div>
              </div>
              <div className="row Training_Information">
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="information">
                    <div className="content-icon"> 
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/14121232/Certifed-Trainers.png"
                        alt="Certifed-Trainers"
                        loading="lazy"
                      />
                    </div>
                    <div className="content-title"> 
                      1 CERTIFIED TRAINER
                    </div>
                    <hr />
                    <div className="content-desc">
                      <p> Xactimate Certified Trainer </p>
                      <p> Matterport Certified Trainer </p>
                      <p><strong> + 1 AI Support Analyst </strong></p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="information">
                    <div className="content-icon"> 
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/14120555/matterport_icon.png"
                        alt="matterport_icon"
                        loading="lazy"
                      />
                    </div>
                    <div className="content-title"> 
                      1-DAY MATTERPORT TRAINING
                    </div>
                    <hr />
                    <div className="content-desc">
                      <p> Hands-On Best Practices </p>
                      <p> Claims Documentation Tools </p>
                      <p> Matterport’s Digital Assets </p>
                      <p> The Tenets of Matterport </p>
                      <p> AI Matterport Certification for all attendees </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="information">
                    <div className="content-icon"> 
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/14120351/xact_icon.png"
                        alt="xact_icon"
                        loading="lazy"
                      />
                    </div>
                    <div className="content-title"> 
                      1-DAY XACTIMATE TRAINING
                    </div>
                    <hr />
                    <div className="content-desc">
                      {/* <p> 1 Solidifai Order </p> */}
                      <p> Xactimate Best Practices </p>
                      <p> Optimal Default Profile Settings </p>
                      <p> Peer Review Checklist </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="text_block">
                <h4> Want more information or ready to see if you are a good fit? </h4>
              </div>
              <div className="row">
                <div className="col-12 text-center">
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
              <div className="Button_Bottom_Text">
                <p> Or don’t, but don’t say we didn’t warn you of the risk of doing it the old way. </p>
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

export default TwoDayRemoteTraining;