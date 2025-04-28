import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { HideOn } from "react-hide-on-scroll";
import step1 from "assets/STEP1.svg";
import step2 from "assets/STEP2.svg";
import step3 from "assets/STEP3.svg";
import down from "assets/add.svg";
import up from "assets/minus.svg";
import scrolldown from "assets/scroll.svg";

const Aimc = () => {

  const [path, setPath] = useState(location.pathname);

  const [one, setOne] = useState(false);
	const [two, setTwo] = useState(false);
	const [three, setThree] = useState(false);
	const [four, setFour] = useState(false);
	const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [seven, setSeven] = useState(false);
  const [eight, setEight] = useState(false);
  const [nine, setNine] = useState(false);
  const [ten, setTen] = useState(false);
  const [eleven, setEleven] = useState(false);
  const [twelve, setTwelve] = useState(false);

  const scroll = () => {
    const section = document.querySelector("#BUY");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

	return (
		<>
			<SEO
        title="Become AI Matterport Certified with Actionable Insights"
        description="Actionable Insights Matterport Certification is an industry-recognized course to help you use Matterport to the fullest. Register now."
        link="aimc"
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
        <HideOn atDiv divID="EXE">
          <div className="BUY_Scroll" onClick={scroll}>
            <p>
              Click Here
              <br />
              to buy
            </p>
            <div className="box bounce-1">
              <img src={scrolldown} />
            </div>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="AIMC">
						<div className="">
							<div className="holder">
								<h2> AI Matterport Certified </h2>
							</div>
              <div className="youtube_video_main">
                <div className="video">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/BUJ8Kk1ZniQ"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      name="actionable-insights-matterport-certified"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5" id="EXE">
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="youtube_video_questions">
                    <h5> What is AIMC? </h5>
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/gzcbGGEApMc"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        name="what-is-aimc"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="youtube_video_questions">
                    <h5> Course Overview </h5>
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/zSUG7gYNj2s"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        name="course-overview"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="youtube_video_questions">
                    <h5> How to Register for AIMC </h5>
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/q-PSAdvsiA8"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        name="how-to-register-for-aimc"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text_block">
                  <p>
                    Matterport’s technology is changing the property insurance ecosystem, instilling efficiency and transparency into the claims settlement process.
                    Actionable Insights wants people to love their jobs, and Matterport has made it easier for contractors and claims professionals to enjoy their work.
                    The Actionable Insights Matterport Certification course will ensure you know how to use this game-changing technology, help you scale the training and implementation across your company, and prepare you to leverage all aspects of this technology as it relates to sales, operations, business development, risk management, client retention, and more.
                  </p>
                </div>
              </div>
              <div className="row steps">
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="step">
                    <div className="content-icon"> 
                      <img src={step1} />
                    </div>
                    <div className="content-title"> 
                      Step 1 
                    </div>
                    <div className="content-desc">
                      Sign Up
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="step">
                    <div className="content-icon"> 
                      <img src={step2} />
                    </div>
                    <div className="content-title"> 
                      Step 2
                    </div>
                    <div className="content-desc">
                      Take Course Online
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="step">
                    <div className="content-icon"> 
                      <img src={step3} />
                    </div>
                    <div className="content-title"> 
                      Step 3
                    </div>
                    <div className="content-desc">
                      Get Certified
                    </div>
                  </div>
                </div>
              </div>
              <div className="Button" id="BUY">
                {localStorage.getItem("tokenCustomer") == null ? (
                  <Link 
                    to="/my-account"
                    state={{ path: path }}
                    className="btn"
                  >
                    Become Matterport Certified
                  </Link>
                ) : (
                  <Link
                    to={`/shop/certification/aimc-2022`}
                    className="btn"
                  >
                    Become Matterport Certified
                  </Link>
                )}
              </div>
              <hr />
              <div className="FAQ">
                <h4> Faq </h4>
                <div className="Faq-Questions">
                  <div className="Tabs">
                    <div className="row" onClick={() => setOne(!one)}>
                      <div className="col-9">
                        <h1> Is this course online? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={one ? up : down} />
                      </div>
                    </div>
                    {one == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Yes! All courses in the Actionable Academy are hosted online within the web browser of your choice.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setTwo(!two)}>
                      <div className="col-9">
                        <h1> How long will the AIMC course take me to complete? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={two ? up : down} />
                      </div>
                    </div>
                    {two == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          On average, it takes most students less than 6 hours to complete the AIMC course and exam.
                          The videos within the course are approximately 4 hours in length cumulatively.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setThree(!three)}>
                      <div className="col-9">
                        <h1> What kind of devices can I use to take the course and exam? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={three ? up : down} />
                      </div>
                    </div>
                    {three == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          You can use all desktop PCs, laptops, tablets, and mobile devices.
                          The Actionable Academy has been optimized to run on the Google Chrome Web Browser, but all courses will work on any major web browser.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setFour(!four)}>
                      <div className="col-9">
                        <h1> Can I skip modules that aren’t relevant to me? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={four ? up : down} />
                      </div>
                    </div>
                    {four == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          To ensure you acquire mastery of the topic at hand, the course does not allow students to skip sections.
                          Each module and the associated quiz must be completed before the next module is unlocked.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setFive(!five)}>
                      <div className="col-9">
                        <h1> Can I retake the exam if I don’t pass the first time? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={five ? up : down} />
                      </div>
                    </div>
                    {five == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          We think you can knock it out your first time around but in the rare case you don’t you can retake the exam for a fee of $100.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setSix(!six)}>
                      <div className="col-9">
                        <h1> Do the videos have subtitles? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={six ? up : down} />
                      </div>
                    </div>
                    {six == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Yes! All courses in the Actionable Academy include subtitles.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setSeven(!seven)}>
                      <div className="col-9">
                        <h1> What camera(s) does the course teach you how to use? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={seven ? up : down} />
                      </div>
                    </div>
                    {seven == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          The AIMC course is focused around the Matterport Pro Series cameras.
                          The Hardware Module will include a comparison of other cameras compatible with the Matterport Software.
                        </p>
                      </div>
                    )}
                  </div>
                  {/* <div className="Tabs">
                    <div className="row" onClick={() => setEight(!eight)}>
                      <div className="col-9">
                        <h1> How long is my AI Matterport Certification valid for? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={eight ? up : down} />
                      </div>
                    </div>
                    {eight == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Your certification will be active for 1 year from the day you pass the certification exam.
                          From there, you will have the opportunity to take an annual continuing.
                        </p>
                      </div>
                    )}
                  </div> */}
                  {/* <div className="Tabs">
                    <div className="row" onClick={() => setNine(!nine)}>
                      <div className="col-9">
                        <h1> Can I access the video modules after I complete the certification exam? If so, for how long? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={nine ? up : down} />
                      </div>
                    </div>
                    {nine == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          The video modules, quiz questions, and answers will be accessible for 1 year after the certification exam is completed.
                        </p>
                      </div>
                    )}
                  </div> */}
                  <div className="Tabs">
                    <div className="row" onClick={() => setTen(!ten)}>
                      <div className="col-9">
                        <h1> Who is this course recognized (accredited) by? Matterport, IICRC, etc. </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={ten ? up : down} />
                      </div>
                    </div>
                    {ten == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          This course is accredited by Matterport, the IICRC, and the states of California, Florida, Idaho, Georgia, and Nevada.
                          To view our Continuing Education Credit Compliance Information,{" "}
                          <a
                            href="https://docs.google.com/spreadsheets/d/1-RJQhqy0WDoSNghBT_q4hUg3h13q1a8mH72PtShxYmk/edit#gid=0"
                            target="_blank"
                          >
                            please click here
                          </a>
                          .
                        </p>
                      </div>
                    )}
                  </div>
                  {/* <div className="Tabs">
                    <div className="row" onClick={() => setEleven(!eleven)}>
                      <div className="col-9">
                        <h1> Will Actionable Insights offer continuing education courses? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={eleven ? up : down} />
                      </div>
                    </div>
                    {eleven == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Yes! Our continuing education courses will include updates that have been made to Matterport’s technology and application of said technology to ensure you are equipped with the most up to date tools.
                        </p>
                      </div>
                    )}
                  </div> */}
                  <div className="Tabs">
                    <div className="row" onClick={() => setTwelve(!twelve)}>
                      <div className="col-9" >
                        <h1> Are bulk course purchases available at a discounted rate? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={twelve ? up : down} />
                      </div>
                    </div>
                    {twelve == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Yes! Please email us at
                          <br />
                          <a href="mailto:support@getinsights.org">support@getinsights.org</a> 
                          &nbsp;to inquire about the waterfall tiers for bulk purchases.
                        </p>
                      </div>
                    )}
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

export default Aimc;