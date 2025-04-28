import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
import SEO from "../../../components/SEO";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import { ContactUsForm } from "../../../../utils/api-routes/api-routes.util";
import { HideOn } from "react-hide-on-scroll";
import InputMask from "react-input-mask";
import ReCAPTCHA from "react-google-recaptcha";
import download from "assets/Download.svg";
import blog_image39 from "assets/blog_image39.png";

const HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates = () => {

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

  const [loading, setLoading] = useState(false);

  const [Msg, setMsg] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    youremail: "",
    yourphone: "",
    subject: "",
    message: "",
  });

  const [file, setFile] = useState("");

  const [isError, setIsError] = useState(false);

  const fileChange = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);

    if(file === undefined) {
      console.log("undefined")
    } else if(file.type === "image/png" || file.type === "image/jpeg") {
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const [verified, setVerified] = useState(false);

  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("youremail", userData.youremail);
    formData.append("yourphone", userData.yourphone);
    formData.append("subject", userData.subject);
    formData.append("message", userData.message);
    formData.append("fileToUpload", file);

    ContactUsForm(formData).subscribe((response) => {
      if (response.response.Requested_Action) {
        setUserData({
          firstName: "",
          lastName: "",
          youremail: "",
          yourphone: "",
          subject: "",
          message: "",
        });
        setFile("");
        setMsg(response.response.Message);
        setLoading(false);
      } else {
        setMsg(false);
        setLoading(false);
      }
    });
  };
  
  return (
    <>
      <SEO
        title="Requesting New Alerts in the Actionable Profile | http://Getinsights.org"
        description="The Actionable Profile provides live estimating guidance for Xactimate estimates. Learn how to request new alerts for accurate estimating. Read more."
        link="blog/how-do-you-request-a-new-alert-in-the-actionable-profile-for-better-xactimate-estimates"
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
        <HideOn showOnPageInit height={isScreenHeight ? 4300 : 4100}>
        <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#what-is-the-actionable-profile">
              —
              <span>
                What is the Actionable
                <br />
                Profile?
              </span>
            </a>
            <a href="#how-to-request-new-alerts-in-the-actionable-profile">
              — 
              <span>
                How to Request New
                <br />
                Alerts in the Actionable
                <br />
                Profile
              </span>
            </a>
            <a href="#we-regularly-update-the-actionable-profile">
              — 
              <span>
                We Regularly Update the
                <br />
                Actionable Profile!
              </span>
            </a>
          </div>
        </HideOn>
        <div className="main-container">
          <div className="Blog_Page">
            <div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    How do you request a new alert in the
                    <br />
                    <span className="blue">Actionable Profile</span> for Better <span className="red">Xactimate</span>
                    <br />
                    Estimates?
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Mar 26, 2025 </span>
                  <br />
                  <img
                    src={blog_image39}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Accurate estimating is crucial in the restoration and insurance industries. Your Xactimate estimates must reflect real-world pricing and industry standards. The Actionable Profile enhances this process by providing live estimating guidance.
                    <br /><br />
                    Methodology and estimating techniques evolve with the industry. To keep up with these changes, we regularly update the Actionable Profile. But what if you notice a missing alert or an area that could use more guidance? The good news is that you can also contribute by requesting new alerts.
                    <br /><br />
                    This article explains the Actionable Profile, how it improves your Xactimate estimates, and how you can request new alerts to make it even better.
                  </p>
                  <div
                    className="mb-5"
                    id="what-is-the-actionable-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    What is the <span className="blue">Actionable Profile</span>?
                  </h5>
                  <p className="mb-3">
                    The <Link to="/actionable-xactimate-profile" target="_blank">Actionable Profile</Link> is an Xactimate profile that leverages XactXpert and acts as an intelligent guide. The Actionable Profile helps estimators write accurate estimates and reduce costly errors. Here are some of its key features:
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Offers live estimating guidance while you write your Xactimate estimates. With over 3,200 Alerts, it ensures your estimates are accurate and thorough.</li>
                      <li>Follows Actionable's default preferences to align your waste settings with established industry standards.</li>
                      <li>Includes 110+ free macros to enhance your productivity.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Live Estimating Guidance</strong>
                  </p>
                  <p className="mb-3">
                    One of the biggest advantages of the Actionable Profile is its live estimating guidance. These alerts notify you of essential details. It reminds you to
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Include all the missing warranted line items.</li>
                      <li>Correct any mistakes or incorrect line items in the scope.</li>
                      <li>Ensure no two mutually exclusive line items are used together.</li>
                    </ul>
                  </p>
                  <p className="mb-0">
                    Using the Actionable Profile, you can be confident that your Xactimate estimates are accurate. This reduces the friction and helps with the timely approval of your estimates.
                  </p>
                  <Link to="/demo" target="_blank" className="btn" style={{ marginBottom: "-144px" }}>
                    Book a free demo now
                  </Link>
                  <div
                    className="mb-5"
                    id="how-to-request-new-alerts-in-the-actionable-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    How to Request New <span className="red">Alerts</span> in the <span className="blue">Actionable Profile</span>
                  </h5>
                  <p className="mb-4">
                    We regularly update the Actionable Profile to offer the most sophisticated estimating guidance. It incorporates the latest industry standards, price list updates, and user feedback. If you encounter a scenario where additional guidance would be beneficial, you can request new alerts. This will help us improve the guidance for you and other Insighters. Here’s how you can submit a request and what happens afterward.
                  </p>
                  <p className="mb-2">
                    <strong>Where to Submit Alert Requests</strong>
                  </p>
                  <p className="mb-2">
                    If you have an idea for a new alert that would improve estimating accuracy, there are two primary ways to submit a request:
                  </p>
                  <p className="mb-2" style={{ paddingLeft: "10px" }}>
                    <strong>1. Visit <Link to="/" target="_blank">GetInsights.org</Link> </strong>
                  </p>
                  <p className="mb-3">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Go to <Link to="/" target="_blank">getinsights.org</Link>.</li>
                      <li>Click on the <b>"Advance the Cause"</b> tab in the top right corner.</li>
                      <li>Fill out the request form with details about the specific alert you’d like to see added.</li>
                      <li>Submit your request for review.</li>
                    </ul>
                  </p>
                  <p className="mb-2" style={{ paddingLeft: "10px" }}>
                    <strong>2. Send an Email to Support </strong>
                  </p>
                  <p className="mb-3">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>If you prefer email, send your alert suggestion to <a href="mailto:support@getinsights.org">support@getinsights.org</a>.</li>
                      <li>Be as detailed as possible. Try to include information about the missing alert, its expected impact, and any other details.</li>
                      <li>If your colleagues face the same issue, encourage them to submit similar requests individually. This will highlight the demand and help us advocate for the new alert.</li>
                    </ul>
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/F5gRlr2Pmwo"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                          style={{ borderRadius: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="mb-5"
                    id="we-regularly-update-the-actionable-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    We Regularly <span className="blue">Update</span> the Actionable Profile!
                  </h5>
                  <p className="mb-4">
                    The Actionable Profile helps you write accurate Xactimate estimates by providing real-time guidance. To maintain its effectiveness, it undergoes regular and rigorous updates. This ensures that it reflects the latest industry developments and user feedback. Here’s how these updates work and why your input matters.
                  </p>
                  <p className="mb-2">
                    <strong>Monthly Updates Based on Verisk’s Price List Changes</strong>
                  </p>
                  <p className="mb-4">
                    Verisk updates its monthly price list to reflect real-world fluctuations. This includes changes in the costs of materials, labor, and equipment. We update the Actionable Profile according to these changes to ensure estimating accuracy.
                  </p>
                  <p className="mb-2">
                    <strong>Continuous Improvements to Match Your Feedback</strong>
                  </p>
                  <p className="mb-4">
                    The Actionable Profile evolves based on real-world estimating challenges and feedback from Insighters. The goal is to make guidance clear and actionable, so you can effortlessly apply recommendations for greater accuracy.
                  </p>
                  <p className="mb-2">
                    <strong>Your Role in Improving the Actionable Profile</strong>
                  </p>
                  <p className="mb-4">
                    The Actionable Profile is a tool built for estimators like you. Your feedback is essential for its continuous improvement. Feel free to submit your requests if you notice any missing alerts or see areas for improvement. By providing feedback, you contribute to a more effective and accurate estimating process. This will help you and the broader industry create better Xactimate estimates.
                  </p>
                  <h5 className="mt-6 mb-4"> About Actionable Insights </h5>
                  <p className="mb-4"> We're a 501(c)(6) educational non-profit, meaning that everything we do goes into developing and maintaining tools and resources to help the industry thrive. </p>
                  <p className="mb-4"> For any questions, reach out to us below: </p>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <form onSubmit={handleSubmit}>
                        <div className="contact-us-form">
                          <div className="row">
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> First Name </label> 
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <input
                                  type="text"
                                  name="firstName"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={userData.firstName}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      firstName: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> Last Name </label> 
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <input
                                  type="text"
                                  name="lastName"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={userData.lastName}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      lastName: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> Your Email </label>
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={userData.youremail}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      youremail: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label> Your Phone Number </label>
                                <b 
                                  style={{
                                    color: "red",
                                    fontSize: "25px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  *
                                </b>
                                <InputMask
                                  mask="999-999-9999"
                                  value={userData.yourphone}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      yourphone: e.currentTarget.value,
                                    })
                                  }
                                >
                                  {(inputProps) => (
                                    <input
                                      type="text"
                                      name="phone"
                                      className="form-control"
                                      placeholder="Enter"
                                      required
                                      {...inputProps}
                                    />
                                  )}
                                </InputMask>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-xs-12 mt-2">
                              <div className="form-group">
                                <label> Subject </label>
                                <input
                                  type="text"
                                  name="subject"
                                  className="form-control"
                                  placeholder="Enter"
                                  value={userData.subject}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      subject: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-xs-12 mt-2">
                              <div className="form-group">
                                <label> Upload Image (Optional) </label> 
                                <label className="file">
                                  <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={fileChange}
                                    onClick={(e) => (e.target.value = null)}
                                  />
                                  <img
                                    className="input_icon"
                                    src={download}
                                    alt="download"
                                    loading="lazy"
                                  />
                                  <span className="file-custom"> Select </span>
                                </label>
                                {file && (
                                  <>
                                    {isError ? (
                                      <div className="image-error">
                                        Oops. Please upload your image as a PNG or JPG.
                                      </div>
                                    ) : (
                                      <div className="image-name">
                                        {"   " + file.name}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col mt-2">
                              <div className="form-group">
                                <label> Your Message </label>
                                <textarea
                                  name="your-message"
                                  className="form-control"
                                  style={{ height: "200px" }}
                                  placeholder="Enter"
                                  value={userData.message}
                                  onChange={(e) =>
                                    setUserData({
                                      ...userData,
                                      message: e.currentTarget.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                            <ReCAPTCHA
                              sitekey="6LcGHDwoAAAAAEEwh5SAw7fWnY_SnzYMF68EFKUx"
                              size="normal"
                              onChange={onChange}
                            />
                            </div>
                          </div>
                          <div className="send">
                            {!loading && (
                              <button
                                className="btn"
                                type="submit"
                                disabled={isError ? true : verified ? false : true}
                              >
                                Send
                              </button>
                            )}
                            {loading && (
                              <button className="btn" disabled> 
                                <i className="fas fa-spinner fa-spin"></i>
                              </button>
                            )}
                          </div>
                          {Msg && (
                            <div 
                              style={{
                                display: "block",
                                fontSize: "15px",
                                margin: "20px 0px",
                                padding: "10px",
                                border: "2px solid #398f14",
                                borderRadius: "4px",
                              }}
                            >
                              {Msg}
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
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

export default HowDoYouRequestANewAlertInTheActionableProfileForBetterXactimateEstimates;