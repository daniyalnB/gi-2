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
import { HideOn } from "react-hide-on-scroll";
import step1 from "assets/STEP1.svg";
import step2 from "assets/STEP2.svg";
import step3 from "assets/STEP3.svg";
import down from "assets/add.svg";
import up from "assets/minus.svg";
import scrolldown from "assets/scroll.svg";

const AimcCe = () => {

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
  const [thirteen, setThirteen] = useState(false);
  const [fourteen, setFourteen] = useState(false);

  const scroll = () => {
    const section = document.querySelector("#BUY");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

	return (
		<>
      <SEO
        title="AIMC CONTINUING EDUCATION 2021"
        description="This 90-minute Continuing Education course will explore all of the new concepts and strategies, and is specifically designed for the challengers and graduates of AIMC 2020."
        link="aimc-ce"
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
								<h2> AIMC Continuing Education 2022 </h2>
							</div>
              <div className="youtube_video_main">
                <div className="video">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/0mNg8rpDFmM"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      name="aimc-continuing-education-2021"
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5" id="EXE">
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="youtube_video_questions">
                    <h5> What is AIMC CE? </h5>
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/jeqzS6Wop34"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        name="what-is-aimc-ce"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12">
                  <div className="youtube_video_questions">
                    <h5> Course Overview </h5>
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/4Bae6YbsTNY"
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
                    <h5> How to Register for AIMC CE </h5>
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/Dh6tb6Uzb9A"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        name="how-to-register-for-aimc-ce"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text_block">
                  <p>
                    AIMC CE – It’s time! In the past 12+ months, there have been significant updates to Matterport’s technology and how it can be applied in the property insurance ecosystem.
                    This 90-minute Continuing Education course will explore all of the new concepts and strategies, and is specifically designed for the challengers and graduates of AIMC 2021 and AIMC CE 2021.
                    We’re going to dive right into what’s new and necessary, making sure you’re caught up on what’s changed and improved since you became AI Matterport Certified.
                    Plus – this CE course will ensure your AIMC designation remains Active for another twelve months! An active AIMC designation ensures full access to all of your previously passed AIMC course content and Solidifai for all Pro Plan Insighters.
                    Actionable Insights is also proud to announce AIMC CE 2022 is an IICRC Continuing Education Credit accredited course.
                    IICRC registrants will earn 3 Continuing Education Credit hours in the Cleaning & Restoration, Master, or Inspection Certification categories for passing AI Matterport Certified Continuing Education 2022.
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
                      Take CE Course Online
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
                      Renew AIMC Designation
                    </div>
                  </div>
                </div>
              </div>
              <div className="Button" id="BUY">
                {localStorage.getItem("tokenCustomer") == null ? (
                  <Link 
                    to={{
                      pathname: "/my-account",
                      state: {
                        path: path,
                      },
                    }}
                    className="btn"
                  >
                    Register For AIMC Continuing Education 2022
                  </Link>
                ) : (
                  <Link
                    to={`/shop/certification/aimc-ce22`}
                    className="btn"
                  >
                    Register For AIMC Continuing Education 2022
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
                        <h1> I took AIMC CE 2021 in 2021. What is different about this Continuing Education course? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={one ? up : down} />
                      </div>
                    </div>
                    {one == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          This course covers all of the new Matterport features, tools, and improvements that have changed or been added in the past year.
                          You’re not rewatching the full AIMC course or AIMC CE 2021 – only what’s new and necessary, customized just for AIMC 2021 and AIMC CE 2021 graduates.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setTwo(!two)}>
                      <div className="col-9">
                        <h1> If I took the original AIMC 2020 course, can I register for AIMC CE 2022? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={two ? up : down} />
                      </div>
                    </div>
                    {two == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Only if you challenged and passed either AIMC 2021 or AIMC CE 2021.
                          It’s important to stay up-to-date on all the latest changes to Matterport’s technology.
                          To ensure every certified graduate is equipped to leverage Matterport in a claims environment, challengers need to remain active and up-to-date on their annual designations.
                          You will need to take the newest full AIMC course to ensure you are up to date on all things Matterport from 2020 through 2022.
                          If you have any questions about your status or the course you should be taking, please reach out to <a href="mailto:support@getinsights.org">support@getinsights.org</a> and a member of our staff will be happy to help.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setThree(!three)}>
                      <div className="col-9">
                        <h1> I passed AIMC 2021 or AIMC CE 2021, but my designation has since expired. What course do I need to take to reactivate my designation? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={three ? up : down} />
                      </div>
                    </div>
                    {three == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          As long as you passed AIMC 2021 or AIMC CE 2021, you can quickly renew your AIMC designation by taking and passing AIMC CE 2022, even if it is currently expired.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setFour(!four)}>
                      <div className="col-9">
                        <h1> I’m familiar with Matterport but have never taken an AIMC course before. Can I sign up for the AIMC CE 2022 course instead of the full AIMC 2022 course? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={four ? up : down} />
                      </div>
                    </div>
                    {four == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          No, this Continuing Education course is only available to those that challenged and passed an AIMC course in 2021 (AIMC 2021 or AIMC CE 2021).
                          Good news though – the full AIMC 2022 course has been completely overhauled with all new content to ensure you are up-to-date on the best ways to leverage Matterport’s technology in the property insurance industry.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setFive(!five)}>
                      <div className="col-9">
                        <h1> Is this course online? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={five ? up : down} />
                      </div>
                    </div>
                    {five == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Yes! All courses in the Actionable Academy are hosted online within the web browser of your choice.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setSix(!six)}>
                      <div className="col-9">
                        <h1> How long will the AIMC CE course take me to complete? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={six ? up : down} />
                      </div>
                    </div>
                    {six == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          On average, it takes most students less than 2.5 hours to complete the AIMC course and exam.
                          The videos within the course are approximately 1.5 hours in length cumulatively.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setSeven(!seven)}>
                      <div className="col-9">
                        <h1> What kind of devices can I use to take the AIMC CE course and exam? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={seven ? up : down} />
                      </div>
                    </div>
                    {seven == true && (
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
                    <div className="row" onClick={() => setEight(!eight)}>
                      <div className="col-9">
                        <h1> Can I skip modules that aren’t relevant to me? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={eight ? up : down} />
                      </div>
                    </div>
                    {eight == true && (
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
                    <div className="row" onClick={() => setNine(!nine)}>
                      <div className="col-9">
                        <h1> Do the videos have subtitles? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={nine ? up : down} />
                      </div>
                    </div>
                    {nine == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Yes! All courses in the Actionable Academy include subtitles.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setTen(!ten)}>
                      <div className="col-9">
                        <h1> Can I retake the AIMC CE exam if I don’t pass the first time? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={ten ? up : down} />
                      </div>
                    </div>
                    {ten == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          We think you can knock it out your first time around but in the rare case you don’t you can retake the exam for a fee of $50.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setEleven(!eleven)}>
                      <div className="col-9">
                        <h1> How long does this CE course renew/extend my active AIMC designation? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={eleven ? up : down} />
                      </div>
                    </div>
                    {eleven == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Your AIMC designation will be renewed for 12 months from the date the CE exam is passed.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setTwelve(!twelve)}>
                      <div className="col-9" >
                        <h1> Who is this course recognized (accredited) by? Matterport, IICRC, etc. </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={twelve ? up : down} />
                      </div>
                    </div>
                    {twelve == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          This course is accredited by Matterport, the IICRC for 3 Continuing Education Credit hours to any registrant in the Cleaning & Restoration, Master, or Inspection Certification categories, and is pending CA/FL/TX CE status.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setThirteen(!thirteen)}>
                      <div className="col-9" >
                        <h1> Can I access the AIMC CE video modules after I complete the CE certification exam? If so, for how long? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={thirteen ? up : down} />
                      </div>
                    </div>
                    {thirteen == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          The video modules, quiz questions, and answers will be accessible for 1 year after the CE certification exam is completed.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setFourteen(!fourteen)}>
                      <div className="col-9" >
                        <h1> What happens to my AIMC 2021 course and content? Can I still access it? </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={fourteen ? up : down} />
                      </div>
                    </div>
                    {fourteen == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          When you purchase the Continuing Education course, you will retain access to your previously passed AIMC videos and quizzes (plus gain access to all of the new CE content).
                          However, if your AIMC designation expires, access to AIMC-related content within the Actionable Academy does as well.
                          If you have questions about your designation status and related access, you can check the AIMC Graduates Public Registry for your expiration date or email <a href="mailto:support@getinsights.org">support@getinsights.org</a> for more information.
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

export default withRouter(AimcCe);