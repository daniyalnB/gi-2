import React, { useState, useEffect } from "react";
import LottieLoader from "../components/LottieLoader";

const ActionableInsightsDemo = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org") {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "2476b97e-29eb-44a9-81de-e6895f432f16",
            target: "#hubspotForm",
          });
        }
        setLoading(false);
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "eba92cb9-cf91-4f79-8dfd-81adc729a119",
            target: "#hubspotForm",
          });
        }
        setLoading(false);
      });
    }
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      const width = window.innerWidth;
      if (width < 992) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="Demo">
          <div className="holder">
            <h2> Customize your experience </h2>
            <h3> Learn how Actionable Insights enables contractors and adjusters to succeed by leveraging our resources and digital assets. </h3>
          </div>
          <div className="ActionableInsightsDemo">
            {isSmallScreen ? (
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <h5> Actionable Insights Demo </h5>
                  <video
                    controls
                    width="100%"
                    height="auto"
                  >
                    <source
                      src="https://getinsights-static.s3.us-east-2.amazonaws.com/Actionable+Rundown.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  {!loading && (
                    <>
                      <p> Your demo is just around the corner, but first, we have a couple of questions. </p>
                      <div id="hubspotForm"></div>
                    </>
                  )}
                  {loading && (
                    <div className="loader-inner">
                      <LottieLoader />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  {!loading && (
                    <>
                      <h5> Actionable Insights Demo </h5>
                      <p> Your demo is just around the corner, but first, we have a couple of questions. </p>
                      <div id="hubspotForm"></div>
                    </>
                  )}
                  {loading && (
                    <div className="loader-inner">
                      <LottieLoader />
                    </div>
                  )}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <video
                    controls
                    width="100%"
                    height="auto"
                    style={{
                      padding: "50px 0px",
                    }}
                  >
                    <source
                      src="https://getinsights-static.s3.us-east-2.amazonaws.com/Actionable+Rundown.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            )}
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
    </>
  );
};

export default ActionableInsightsDemo;