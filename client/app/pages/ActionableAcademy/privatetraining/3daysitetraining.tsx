import React, { Suspense, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(
  () => import("../../../components/CookieConsent")
);
const WrongBrowserDisclaimer = React.lazy(
  () => import("../../../components/WrongBrowserDisclaimer")
);
import academy_icon from "assets/academy.webp";

const ThreeDaySiteTraining = () => {
  const [TrainforTomorrow, setTrainforTomorrow] = useState(
    "Train for Tomorrow - Today"
  );

  return (
    <>
      <SEO
        title="3-Day On-Site Training - Actionable Insights"
        description="Actionable Insights has been flying around the country training Xactimate and Matterport since 2016. There's no experience like an AI private training."
        link="3-day-site-training"
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
                <h2> 3-Day Remote Training </h2>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/14102942/Remote-Private-Training_3day_1180x400.png"
                  alt="Remote-Private-Training_3day"
                  loading="lazy"
                />
              </div>
              <div className="row detail">
                <div className="col-12">
                  <p>
                    Actionable Insights has been flying around the country
                    training Xactimate and Matterport since 2016. There’s no
                    experience like an AI private training engagement, and we’re
                    proud to say we’re great at inspiring outsized results with
                    our impactful curriculum. With that in mind, here’s what’s
                    included in our three-day on-site private training package:
                  </p>
                </div>
              </div>
              <div className="row Training_Information Training_Information_3Day">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="information">
                    <div className="content-icon">
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/04/14121232/Certifed-Trainers.png"
                        alt="Certifed-Trainers"
                        loading="lazy"
                      />
                    </div>
                    <div className="content-title">1 CERTIFIED TRAINER</div>
                    <hr />
                    <div className="content-desc">
                      <p> Xactimate Certified Trainer </p>
                      <p> Matterport Certified Trainer </p>
                      <p>
                        <strong> + 1 AI Support Analyst </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
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
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12">
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
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="information">
                    <div className="content-icon">
                      <img
                        src={academy_icon}
                        alt="academy_icon"
                        loading="lazy"
                      />
                    </div>
                    <div className="content-title">
                      1-DAY CERTIFICATION TRAINING
                    </div>
                    <hr />
                    <div className="content-desc">
                      <p> AI Matterport Certification </p>
                      <p> AI Tools Certification </p>
                      <br />
                      <p>
                        <i> * Included for all attendees </i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="text_block">
                <h4>
                  {" "}
                  Want more information or ready to see if you are a good fit?{" "}
                </h4>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <Link
                    to="/train-tomorrow-today"
                    target="_blank"
                    className="btn"
                    onMouseOver={() => setTrainforTomorrow("Learn More")}
                    onMouseOut={() =>
                      setTrainforTomorrow("Train for Tomorrow - Today")
                    }
                  >
                    {TrainforTomorrow}
                  </Link>
                </div>
              </div>
              <div className="Button_Bottom_Text">
                <p>
                  {" "}
                  Or don’t, but don’t say we didn’t warn you of the risk of
                  doing it the old way.{" "}
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

export default withRouter(ThreeDaySiteTraining);
