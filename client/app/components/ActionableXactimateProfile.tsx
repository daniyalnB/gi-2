import React, { Suspense, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import ActionableXactimateProfileDemo from "../components/ActionableXactimateProfileDemo";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
const IconSlider = React.lazy(() => import("./IconsSlider"));
import { GetAllAILogos } from "../../utils/api-routes/api-routes.util";
import { HideOn } from "react-hide-on-scroll";
import { Helmet } from "react-helmet";
import STEP1 from "assets/STEP1_AXP.svg";
import STEP1_Active from "assets/STEP1_AXP_Active.svg";
import STEP2 from "assets/STEP2_AXP.svg";
import STEP2_Active from "assets/STEP2_AXP_Active.svg";
import STEP3 from "assets/STEP3_AXP.svg";
import STEP3_Active from "assets/STEP3_AXP_Active.svg";
import STEP4 from "assets/STEP4_AXP.svg";
import STEP4_Active from "assets/STEP4_AXP_Active.svg";
import STEP5 from "assets/STEP5_AXP.svg";
import STEP5_Active from "assets/STEP5_AXP_Active.svg";
import STEP6 from "assets/STEP6_AXP.svg";
import STEP6_Active from "assets/STEP6_AXP_Active.svg";
import down from "assets/add.svg";
import up from "assets/minus.svg";
import scrolldown from "assets/scroll.svg";
import SethHarrisonAP from "assets/SethHarrisonAP.svg";
import ColeAndDerekAP from "assets/ColeAndDerekAP.svg";
import LineItem from "assets/LineItem.svg";
import APLogo from "assets/APLogo.svg";
import ActionableAlerts from "assets/ActionableAlerts.svg";

const ActionableXactimateProfile = () => {

  const [logos, setLogos] = useState([]);

  useEffect(() => {
    GetAllAILogos().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setLogos(x);
      } else {
        alert("error");
      }
    });
  }, []);

  useEffect(() => {
    if (logos.length) {
      const root = document.documentElement;
      const sliderElementsDisplayed = getComputedStyle(root).getPropertyValue("--slider-elements-displayed");
      const sliderContent = document.querySelector("ul.slider-content");
  
      root.style.setProperty("--slider-elements", sliderContent.children.length);
  
      for(let i=0; i < sliderElementsDisplayed; i++) {
        sliderContent.appendChild(sliderContent.children[i].cloneNode(true));
      }
    }
  }, [logos]);

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  
  const scroll = () => {
    const section = document.querySelector("#BUY");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const [active, setActive] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  });

  return (
    <>
      <SEO
        title="Actionable Xactimate Profile | Live Guidance For Your Estimates"
        description="Write more accurate Xactimate estimates with live guidance in the Actionable Profile. No more mistakes, no more missed line items. Try it today."
        link="actionable-xactimate-profile"
      />
      <Helmet>
        <script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
      </Helmet>
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
        <div className="ActionableXactimateProfileHeader">
          <div className="header text-center">
            <h1> Live estimating guidance while you write in Xactimate </h1>
            <img src={APLogo} loading="lazy" />
            <p>
              No more mistakes, no more missed line items.
              <br />
              Ready to level up your scopes?
            </p>
            {localStorage.getItem("tokenCustomer") == null ? (
              <Link to="/get-started">
                Get Started
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="left-img-sec">
            <img src={SethHarrisonAP} loading="lazy" />
          </div>
          <div className="right-img-sec">
            <img src={ColeAndDerekAP} loading="lazy" />
          </div>
          <div className="right-gif-sec">
            <img src={LineItem} loading="lazy" />
          </div>
        </div>
        <div className="main-container">
          <div className="AIMC">
            <div className="">
              <div className="holder mt-3 mb-3">
                <h2 className="m-0"> What is The Actionable Xactimate Profile? </h2>
              </div>
              <div className="youtube_video_main_Actionable_Xactimate_Profile">
                <div className="video">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/uumgrymTO8U?si=rz65c5CdF0ZFZCqA"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      name="actionable-xactimate-profile"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text_block">
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                  >
                    The Actionable Profile is a new profile inside of Xactimate that you can leverage to write better, more accurate estimates.
                    Whether you are looking forward to our industry-standard default preferences that reflect the reality of execution in the field, or the estimating resources included within the Actionable Profile (like all of the Insight Sheet Macros!), we're excited to level up your scopes with you.
                    The Actionable Profile also gives you access to XactXpert, Xactimate's new Claims Rules Engine, that we have customized to include all of our Actionable Alerts - the live estimating guidance that pops up while you write your scope in the Actionable Profile.
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "16px",
                      marginTop: "30px",
                    }}
                  > 
                    What does this mean? <b>The Actionable Xactimate Profile will help you make fewer estimating mistakes and guide you to include all of the warranted line items.</b>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-md-4 col-sm-12 actionable-xactimate-profile-guide">
                  <img src={ActionableAlerts} />
                  <span>
                    Live estimating guidance
                    <br />
                    (Actionable Alerts) that leverages
                    <br />
                    the Insight Sheet Database
                  </span>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-12 actionable-xactimate-profile-guide">
                  <img src={ActionableAlerts} />
                  <span>
                    Actionable’s industry-standard
                    <br />
                    default preferences
                  </span>
                </div>
                <div className="col-xl-4 col-md-4 col-sm-12 actionable-xactimate-profile-guide">
                  <img src={ActionableAlerts} />
                  <span>
                    Access to all Actionable Insights
                    <br />
                    Macros
                  </span>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-xl-6">
                  <div className=" actionable-xactimate-profile-try">
                    <h5> TRY BEFORE YOU BUY </h5>
                    <p>
                      You already estimate enough in this industry. There’s no need to estimate your results with the Actionable Profile.
                      <br /><br />
                      Get a <b>99% discount on your first month</b> of the Actionable Profile (automatically applied at checkout).
                      <br /><br />
                      Build a proof of concept and see our profile’s capabilities first-hand.
                    </p>
                    <Link to="/plan-matrix">
                      Try It Now
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="actionable-xactimate-profile-pro-plan">
                    <h5> $162/month/seat </h5>
                    <p> 99% off the first month </p>
                    <span> Pro Plan includes </span>
                    <div className="row mt-3 mb-4">
                      <div className="col-xl-6 col-md-6">
                        <p className="list-items text-right">
                          Insight Sheet Database
                          <br />
                          Commonly Overlooked Line Item Database
                          <br />
                          As Seen in Xact Reports
                          <br />
                          Free Swag
                        </p>
                      </div>
                      <div className="col-xl-6 col-md-6">
                        <p className="list-items text-left">
                          All Insight Sheet Macros
                          <br />
                          Enterprise-Level Account Administration
                          <br />
                          Free Xactimate Training
                          <br />
                          Free Insighter Points
                        </p>
                      </div>
                    </div>
                    <Link to="/plan-matrix">
                      Sign Up for the Pro Plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="actionable-xactimate-profile-stepper">
          <h1> Sign Up - Step by Step </h1>
          <ol className="stepper">
            <li
              className={active.step1 ? "active" : ""}
              onMouseOver={() => setActive({
                step1: true,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
              onMouseOut={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
            >
              <div className={active.step1 ? "middle-line center" : "center"}></div>
              <div
                className={active.step1 ? "detail active center" : "detail center"}
                onMouseOver={() => setActive({
                  step1: true,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                <img src={active.step1 ? STEP1_Active : STEP1} />
                <p className="step-no"> Step 01 </p>
                <p className="step-name">
                  Sign Up for Pro Plan
                </p>
              </div>
            </li>
            <li
              className={active.step2 ? "active" : ""}
              onMouseOver={() => setActive({
                step1: false,
                step2: true,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
              onMouseOut={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
            >
              <div className={active.step2 ? "middle-line center" : "center"}></div>
              <div
                className={active.step2 ? "detail active center" : "detail center"}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: true,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                <img src={active.step2 ? STEP2_Active : STEP2} />
                <p className="step-no"> Step 02 </p>
                <p className="step-name">
                  Add all your company's
                  <br />
                  Xactimate Licenses to
                  <br />
                  your Pro Plan
                </p>
              </div>
            </li>
            <li
              className={active.step3 ? "active" : ""}
              onMouseOver={() => setActive({
                step1: false,
                step2: false,
                step3: true,
                step4: false,
                step5: false,
                step6: false,
              })}
              onMouseOut={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
            >
              <div className={active.step3 ? "middle-line center" : "center"}></div>
              <div
                className={active.step3 ? "detail active center" : "detail center"}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: true,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                <img src={active.step3 ? STEP3_Active : STEP3} />
                <p className="step-no"> Step 03 </p>
                <p className="step-name">
                  Request Company
                  <br />
                  Wide Actionable Profile
                  <br />
                  Activation
                </p>
              </div>
            </li>
            <li
              className={active.step4 ? "active" : ""}
              onMouseOver={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: true,
                step5: false,
                step6: false,
              })}
              onMouseOut={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
            >
              <div className={active.step4 ? "middle-line center" : "center"}></div>
              <div
                className={active.step4 ? "detail active center" : "detail center"}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: true,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                <img src={active.step4 ? STEP4_Active : STEP4} />
                <p className="step-no"> Step 04 </p>
                <p className="step-name">
                  Access to the
                  <br />
                  Actionable Profile is enabled
                </p>
              </div>
            </li>
            <li
              className={active.step5 ? "active" : ""}
              onMouseOver={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: true,
                step6: false,
              })}
              onMouseOut={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
            >
              <div className={active.step5 ? "middle-line center" : "center"}></div>
              <div
                className={active.step5 ? "detail active center" : "detail center"}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: true,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                <img src={active.step5 ? STEP5_Active : STEP5} />
                <p className="step-no"> Step 05 </p>
                <p className="step-name">
                  Sync your Actionable
                  <br />
                  Profile
                </p>
              </div>
            </li>
            <li
              className={active.step6 ? "active" : ""}
              onMouseOver={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: true,
              })}
              onMouseOut={() => setActive({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
              })}
            >
              <div className={active.step6 ? "middle-line center" : "center"}></div>
              <div
                className={active.step6 ? "detail active center" : "detail center"}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: true,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                <img src={active.step6 ? STEP6_Active : STEP6} />
                <p className="step-no"> Step 06 </p>
                <p className="step-name">
                  Estimate in the
                  <br />
                  Actionable Profile
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className="actionable-xactimate-profile-stepper-responsive">
          <h1> Sign Up - Step by Step </h1>
          <div className="stepper">
            <div className="step">
              <div>
                <div
                  className={active.step1 ? "circle circle-active" : "circle"}
                  onMouseOver={() => setActive({
                    step1: true,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                  onMouseOut={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                >
                  01
                </div>
              </div>
              <div
                className={active.step1 ? "active" : "non-active"}
                style={{ top: "-35px", height: "120px" }}
                onMouseOver={() => setActive({
                  step1: true,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                {active.step1 ? <div className="line"></div> : ""}
                <img src={active.step1 ? STEP1_Active : STEP1} />
                <p className="step-no"> Step 01 </p>
                <p className="step-name">
                  Sign Up for Pro Plan
                </p>
              </div>
            </div>
            <div className="step" style={{ marginTop: "80px" }}>
              <div>
                <div
                  className={active.step2 ? "circle circle-active" : "circle"}
                  onMouseOver={() => setActive({
                    step1: false,
                    step2: true,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                  onMouseOut={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                >
                  02
                </div>
              </div>
              <div
                className={active.step2 ? "active" : "non-active"}
                style={{ top: "-55px", height: "160px" }}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: true,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                {active.step2 ? <div className="line"></div> : ""}
                <img src={active.step2 ? STEP2_Active : STEP2}/>
                <p className="step-no"> Step 02 </p>
                <p className="step-name">
                  Add all your company's
                  <br />
                  Xactimate Licenses to
                  <br />
                  your Pro Plan
                </p>
              </div>
            </div>
            <div className="step" style={{ marginTop: "95px" }}>
              <div>
                <div
                  className={active.step3 ? "circle circle-active" : "circle"}
                  onMouseOver={() => setActive({
                    step1: false,
                    step2: false,
                    step3: true,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                  onMouseOut={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                >
                  03
                </div>
              </div>
              <div
                className={active.step3 ? "active" : "non-active"}
                style={{ top: "-50px", height: "150px" }}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: true,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                {active.step3 ? <div className="line"></div> : ""}
                <img src={active.step3 ? STEP3_Active : STEP3} />
                <p className="step-no"> Step 03 </p>
                <p className="step-name">
                  Request Company
                  <br />
                  Wide Actionable Profile
                  <br />
                  Activation
                </p>
              </div>
            </div>
            <div className="step" style={{ marginTop: "90px" }}>
              <div>
                <div
                  className={active.step4 ? "circle circle-active" : "circle"}
                  onMouseOver={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: true,
                    step5: false,
                    step6: false,
                  })}
                  onMouseOut={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                >
                  04
                </div>
              </div>
              <div
                className={active.step4 ? "active" : "non-active"}
                style={{ top: "-50px", height: "150px" }}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: true,
                  step5: false,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                {active.step4 ? <div className="line"></div> : ""}
                <img src={active.step4 ? STEP4_Active : STEP4} />
                <p className="step-no"> Step 04 </p>
                <p className="step-name">
                  Access to the
                  <br />
                  Actionable Profile is enabled
                </p>
              </div>
            </div>
            <div className="step" style={{ marginTop: "85px" }}>
              <div>
                <div
                  className={active.step5 ? "circle circle-active" : "circle"}
                  onMouseOver={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: true,
                    step6: false,
                  })}
                  onMouseOut={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                >
                  05
                </div>
              </div>
              <div
                className={active.step5 ? "active" : "non-active"}
                style={{ top: "-45px", height: "135px" }}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: true,
                  step6: false,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                {active.step5 ? <div className="line"></div> : ""}
                <img src={active.step5 ? STEP5_Active : STEP5} />
                <p className="step-no"> Step 05 </p>
                <p className="step-name">
                  Sync your Actionable
                  <br />
                  Profile
                </p>
              </div>
            </div>
            <div className="step" style={{ marginTop: "75px" }}>
              <div>
                <div
                  className={active.step6 ? "circle circle-active" : "circle"}
                  onMouseOver={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: true,
                  })}
                  onMouseOut={() => setActive({
                    step1: false,
                    step2: false,
                    step3: false,
                    step4: false,
                    step5: false,
                    step6: false,
                  })}
                >
                  06
                </div>
              </div>
              <div
                className={active.step6 ? "active" : "non-active"}
                style={{ top: "-45px", height: "135px" }}
                onMouseOver={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: true,
                })}
                onMouseOut={() => setActive({
                  step1: false,
                  step2: false,
                  step3: false,
                  step4: false,
                  step5: false,
                  step6: false,
                })}
              >
                {active.step6 ? <div className="line"></div> : ""}
                <img src={active.step6 ? STEP6_Active : STEP6} />
                <p className="step-no"> Step 06 </p>
                <p className="step-name">
                  Estimate in the
                  <br />
                  Actionable Profile
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-container">
          <div className="AIMC">
            <div className="">
              <ActionableXactimateProfileDemo />
              <div className="discover-what-others-already-have">
                <div className="holder">
                  <h2> DISCOVER WHAT OTHERS ALREADY HAVE </h2>
                  <h3> Try The Actionable Profile Today </h3>
                </div>
                <div className="infinite-slider">
                  <ul className="slider-content">
                    {logos.length && (
                      <>
                        {logos.map((logo) => {
                          return (
                            <li>
                              <a href={logo.companyurl} target="_blank">
                                <img src={logo.logourl} alt={"no slide found"} loading="lazy" />
                              </a>
                            </li>
                          );
                        })}
                      </>
                    )} 
                  </ul>
                </div>  
                {/* {logos.length && (
                  <IconSlider logos={logos} />
                )} */}
              </div>
              <div className="AXP_youtube_video_questions">
                <h1> More about Actionable Xact Profile </h1>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-12 mt-4">
                    <div className="youtube_video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/Sek2J_Q2fJM"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="what-is-aimc-ce"
                        />
                      </div>
                      <h5> What Is The Actionable Xactimate Profile?</h5>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mt-4">
                    <div className="youtube_video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/4JUrdfYIVO0"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="course-overview"
                        />
                      </div>
                      <h5> How Does The Actionable Xactimate Profile Work? </h5>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 mt-4">
                    <div className="youtube_video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/v9iTpYLqNXA"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="how-to-register-for-aimc-ce"
                        />
                      </div>
                      <h5> How To Sign Up For The Actionable Xactimate Profile? </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="FAQ">
                <h4> Faq </h4>
                <div className="Faq-Questions">
                  <div className="Tabs">
                    <div className="row" onClick={() => setOne(!one)}>
                      <div className="col-9">
                        <h1>
                          {" "}
                          How many people do I need to add to my Pro Plan?{" "}
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={one ? up : down} />
                      </div>
                    </div>
                    {one == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Each Xactimate license at your company needs to be
                          added to your Pro Plan subscription. Add as many
                          people to your Pro Plan as Xactimate licenses you
                          have. Once all Xactimate licenses are entered, we will
                          verify that information and then enable Actionable
                          Profile access.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setTwo(!two)}>
                      <div className="col-9">
                        <h1>
                          {" "}
                          I only want a portion of my estimating team to use the
                          Profile. Can you activate only for a few Xactimate
                          licenses?{" "}
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={two ? up : down} />
                      </div>
                    </div>
                    {two == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          No. The Actionable Profile is enabled at a company
                          level. This means either all of your Xactimate
                          licenses will get the Profile, or no licenses will get
                          the Profile.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setThree(!three)}>
                      <div className="col-9">
                        <h1>
                          {" "}
                          How long does it take to get my Actionable Profile in
                          my Xactimate?{" "}
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={three ? up : down} />
                      </div>
                    </div>
                    {three == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          The faster you add sub-users to your Pro Plan, the faster we can verify your information and collaborate with Verisk to enable your access to the Actionable Profile.
                          Once we receive your information, activation usually takes between 1-5 business days.
                          If you have any questions about your current activation status, please email us at{" "}
                          <a href="mailto:support@getinsights.org">
                            support@getinsights.org
                          </a>
                          {" "}and a member of our team will be happy to assist.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setFour(!four)}>
                      <div className="col-9">
                        <h1> What happens when I cancel my Pro Plan? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={four ? up : down} />
                      </div>
                    </div>
                    {four == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Access to the Actionable Profile will be removed from
                          your Xactimate licenses, as well as all estimates that
                          were written in the Actionable Profile.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="book-a-demo">
              <Link to="/actionable-xactimate-profile/FAQ" className="btn">
                View More FAQs
              </Link>
            </div>
          </div>
        </div>
        <div className="still-have-a-question">
          <div className="question-section">
            <h2> Still have questions? </h2>
            <Link to="/demo" className="btn">
              Book A Call With Our Team
            </Link>
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(ActionableXactimateProfile);