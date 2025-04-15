import React, { Suspense, useState } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import ActionableXactimateProfileDemo from "../components/ActionableXactimateProfileDemo";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import down from "assets/add.svg";
import up from "assets/minus.svg";

const ActionableXactimateProfileFAQs = () => {

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [seven, setSeven] = useState(false);
  const [eight, setEight] = useState(false);

  return (
    <>
      <SEO
        title="Actionable Xactimate Profile FAQs"
        description="Write more accurate Xactimate estimates with live guidance in the Actionable Profile. No more mistakes, no more missed line items."
        link="actionable-xactimate-profile/FAQ"
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
          <div className="AIMC">
            <div className="">
              <div className="holder">
                <h2> Actionable Xactimate Profile Faqs </h2>
              </div>
              <div className="FAQ" style={{ margin: "0px" }}>
                <div className="Faq-Questions">
                  <div className="Tabs">
                    <div className="row" onClick={() => setOne(!one)}>
                      <div className="col-9">
                        <h1>
                          How many people do I need to add to my Pro Plan?
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
                          I only want a portion of my estimating team to use the
                          Profile. Can you activate only for a few Xactimate
                          licenses?
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
                          How long does it take to get my Actionable Profile in
                          my Xactimate?
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
                  <div className="Tabs">
                    <div className="row" onClick={() => setFive(!five)}>
                      <div className="col-9">
                        <h1>
                          Can I customize or turn off rules in the Actionable
                          Profile?
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={five ? up : down} />
                      </div>
                    </div>
                    {five == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Not at this time, but we are happy to receive all
                          feedback requests at{" "}
                          <a href="mailto:support@getinsights.org">
                            support@getinsights.org
                          </a>
                          .
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setSix(!six)}>
                      <div className="col-9">
                        <h1>
                          What kind of Xactimate license will work with the
                          Actionable Profile?
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={six ? up : down} />
                      </div>
                    </div>
                    {six == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          The Actionable Profile can be turned on for any type
                          of Xactimate license.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setSeven(!seven)}>
                      <div className="col-9">
                        <h1>
                          I currently have a Standard or Plus Plan Subscription
                          on getinsights.org, can I get the Actionable Profile?
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={seven ? up : down} />
                      </div>
                    </div>
                    {seven == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          The Actionable Profile is available exclusively on our
                          Pro Plan Subscription.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="Tabs">
                    <div className="row" onClick={() => setEight(!eight)}>
                      <div className="col-9">
                        <h1>
                          I’m not sure if the Actionable Profile will be a good
                          fit for my company. Who can I talk to?
                        </h1>
                      </div>
                      <div className="col-3 text-right">
                        <img src={eight ? up : down} />
                      </div>
                    </div>
                    {eight == true && (
                      <div className="Dropdown">
                        <hr />
                        <p>
                          Book a call below and a member of our staff will be
                          happy to answer all of your questions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <hr
                style={{
                  marginTop: "3rem",
                  marginBottom: "0rem",
                }}
              />
              <ActionableXactimateProfileDemo />
            </div>
          </div>
        </div>
        <div className="why-actionable-insights" style={{ marginBottom: "100px" }}>
          <h1> Why Actionable Insights? </h1>
          <p>
            Download the Ultimate Guide to AI Resources and identify the tools needed in order to succeed in the digital age of
            <br/>
            estimating and adjusting.
          </p>
          <div className="download">
            <a
              href="https://getinsights2-data.s3.amazonaws.com/Ultimate_Guide_to_AI_Resources.pdf"
              target="_blank"
            >
              Download .PDF
              <span>
                <i className="fas fa-download"></i>
              </span>
            </a>
          </div>
        </div>
        <WrongBrowserDisclaimer />
				<CookieConsentGI2 />
				<Footer />
			</Suspense>
    </>
  );
};

export default withRouter(ActionableXactimateProfileFAQs);