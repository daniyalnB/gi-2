import React, { Suspense, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { Fade } from "react-slideshow-image";

const GiftCards = () => {

  const [path, setPath] = useState(location.pathname);

  const fadeImagesOne = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233637/gift_cards_membership_large1.jpg",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233703/gift_card_membership_back.png",
  ];

  const fadeImagesTwo = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/11004317/gift_card_AIMC_front.png",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/11004304/gift_card_AIMC_back.png",
  ]

  const fadeImagesThree = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/14195706/gift_card_Xact_Digital_Assets_Class_front.png",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233844/gift_card_matterport_geomni_xactimate_back.png",
  ]

  const fadeImagesFour = [
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233523/gift_card_insighter_points1.png",
    "https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2017/05/29233601/gift_card_insighter_point_back.png",
  ]
  
	return (
		<>
			<SEO
        title="Gift Cards - Actionable Insights"
        description="Here's how you can say thank you in a credible way to those in your network. You asked and we delivered! Check out how to use your Actionable Insights gift card."
        link="resources/gift-cards"
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
					<div className="Gift_Cards">
            <div className="holder">
              <h2> You asked & we delivered! </h2>
              <h3> Finally, there is a credible way to say thanks to those in your network! </h3>
            </div>
            <div className="Cards">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-5">
                  <h1> Membership Plans </h1>
                  <div className="card-detail">
                    <Fade arrows={false} duration={5000} transitionDuration={500} indicators={false} pauseOnHover={false}>
                      <div className="image-container">
                        <img
                          src={fadeImagesOne[0]}
                          alt="Membership Plans"
                          loading="lazy"
                        />
                      </div>
                      <div className="image-container">
                        <img
                          src={fadeImagesOne[1]}
                          alt="Membership Plans"
                          loading="lazy"
                        />
                      </div>
                    </Fade>
                    <p>
                      Give the{" "}
                      <a
                        href="/insight-sheets"
                        target="_blank"
                      >
                        Insight Sheet Database
                      </a>
                      , As Seen In Xact reports, Access to Macros, Commonly Overlooked Line Items,{" "}
                      <a
                        href="/shop/swag/actionable-insights-socks"
                        target="_blank"
                      >
                        Scissor Lift Socks
                      </a>
                      , and much more.
                      Pick the plan and duration that works best for your gift.
                    </p>
                    {localStorage.getItem("tokenCustomer") == null ? (
                      <Link
                        className="btn"
                        to={{
                          pathname: "/my-account",
                          state: {
                            path: path,
                          },
                        }}
                      >
                        Membership Gift Card
                      </Link>
                    ) : (
                      <Link
                        to="/shop/gift-card/membership-plans-gift-card" 
                        className="btn"
                      >
                        Membership Gift Card
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-5">
                  <h1> AI Matterport Certification </h1>
                  <div className="card-detail">
                    <Fade arrows={false} duration={5000} transitionDuration={500} indicators={false} pauseOnHover={false}>
                      <div className="image-container">
                        <img
                          src={fadeImagesTwo[0]}
                          alt="AI Matterport Certification"
                          loading="lazy"
                        />
                      </div>
                      <div className="image-container">
                        <img
                          src={fadeImagesTwo[1]}
                          alt="AI Matterport Certification"
                          loading="lazy"
                        />
                      </div>
                    </Fade>
                    <p>
                      Give the gift of education and train for the future. Choose the online, self-paced{" "}
                      <a
                        href="/aimc"
                        target="_blank"
                      >
                        Actionable Insights Matterport Certified{" "}
                      </a>
                      course.
                    </p>
                    {localStorage.getItem("tokenCustomer") == null ? (
                      <Link
                        className="btn"
                        to={{
                          pathname: "/my-account",
                          state: {
                            path: path,
                          },
                        }}
                      >
                        AI Matterport Certification Gift Card
                      </Link>
                    ) : (
                      <Link
                        to="/shop/gift-card/matterport-certification-gift-card"
                        className="btn"
                      >
                        AI Matterport Certification Gift Card
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-5">
                  <h1> Xactimate Training </h1>
                  <div className="card-detail">
                    <Fade arrows={false} duration={5000} transitionDuration={500} indicators={false} pauseOnHover={false}>
                      <div className="image-container">
                        <img
                          src={fadeImagesThree[0]}
                          alt="Xactimate Training"
                          loading="lazy"
                        />
                      </div>
                      <div className="image-container">
                        <img
                          src={fadeImagesThree[1]}
                          alt="Xactimate Training"
                          loading="lazy"
                        />
                      </div>
                    </Fade>
                    <p>
                      Give the gift of education and train for the future. Choose{" "}
                      <a
                        href="/resources/3d-training-modules"
                        target="_blank"
                      >
                        Xactimate{" "}
                      </a>
                      training.
                    </p>
                    {localStorage.getItem("tokenCustomer") == null ? (
                      <Link
                        className="btn"
                        to={{
                          pathname: "/my-account",
                          state: {
                            path: path,
                          },
                        }}
                      >
                        Xactimate Training Gift Card
                      </Link>
                    ) : (
                      <Link
                        to="/shop/gift-card/xactimate-training-gift-card"
                        className="btn"
                      >
                        Xactimate Training Gift Card
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-5">
                  <h1> Insighter Points Gift Card </h1>
                  <div className="card-detail">
                    <Fade arrows={false} duration={5000} transitionDuration={500} indicators={false} pauseOnHover={false}>
                      <div className="image-container">
                        <img
                          src={fadeImagesFour[0]}
                          alt="Insighter Points Gift Card"
                          loading="lazy"
                        />
                      </div>
                      <div className="image-container">
                        <img
                          src={fadeImagesFour[1]}
                          alt="Insighter Points Gift Card"
                          loading="lazy"
                        />
                      </div>
                    </Fade>
                    <p>
                      Give flexibility –{" "}
                      <a
                        href="/my-account/points"
                        target="_blank"
                      >
                        Insighter Points{" "}
                      </a>
                      can be used for
                      <br />
                      training, certifications, and Actionable Insights{" "}
                      <a
                        href="/swag"
                        target="_blank"
                      >
                        Swag
                      </a>
                      .
                      <br />
                      Select a custom Insighter Point value that works best for your gift.
                    </p>
                    {localStorage.getItem("tokenCustomer") == null ? (
                      <Link
                        className="btn"
                        to={{
                          pathname: "/my-account",
                          state: {
                            path: path,
                          },
                        }}
                      >
                        Insighter Points Gift Card
                      </Link>
                    ) : (
                      <Link
                        to="/shop/gift-card/insighter-points-gift-card"
                        className="btn"
                      >
                        Insighter Points Gift Card
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="delivered">
              <h3> Gift cards delivered to your door in 10 business days (or less). </h3>
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

export default withRouter(GiftCards);