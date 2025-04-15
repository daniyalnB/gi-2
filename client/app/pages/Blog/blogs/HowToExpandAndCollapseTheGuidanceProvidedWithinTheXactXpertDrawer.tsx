import React, { useState, useEffect, Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
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
import blog_image40 from "assets/blog_image40.png";
import violations from "assets/Violations.svg";
import warnings from "assets/Warnings.svg";
import cautions from "assets/Cautions.svg";

const HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer = () => {

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
        title="How to Expand/Collapse Guidance in XactXpert | Getinsights.org"
        description="Learn how to expand/collapse guidance in the XactXpert Drawer for easier navigation and improved workflows. Read more now."
        link="blog/how-to-expand-and-collapse-the-guidance-provided-within-the-xactxpert-drawer"
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
        <HideOn showOnPageInit height={isScreenHeight ? 5100 : 4800}>
        <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#understanding-the-xactxpert-drawer">
              —
              <span>
                Understanding the
                <br />
                XactXpert Drawer
              </span>
            </a>
            <a href="#how-to-quickly-expand-and-collapse-violations-warnings-and-cautions-in-xactxpert">
              — 
              <span>
                How to Quickly Expand
                <br />
                and Collapse Violations,
                <br />
                Warnings, and Cautions in
                <br />
                XactXpert
              </span>
            </a>
            <a href="#the-actionable-xactimate-profile">
              — 
              <span>
                The Actionable Xactimate 
                <br />
                Profile
              </span>
            </a>
            <a href="#learn-more">
              — 
              <span>
                Learn More
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
                    How to expand and collapse the
                    <br />
                    guidance provided within the
                    <br />
                    <span className="red">XactXpert</span> drawer
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Apr 03, 2025 </span>
                  <br />
                  <img
                    src={blog_image40}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    The <a href="https://www.verisk.com/products/xactimate/xactxpert/" target="_blank" className="red">XactXpert</a> Drawer is a powerful tool in <a href="https://xactimate.com/home/" target="_blank" className="red">Xactimate</a> that provides real-time guidance while writing estimates. It helps estimators ensure accuracy and compliance by flagging potential issues. This tool is invaluable for maintaining high standards in estimates. During our Xact Best Practices Bootcamp, we found that many estimators didn’t know they could expand or collapse the guidance in this tab.
                    <br /><br />
                    The expand-and-collapse functionality makes it easy to navigate and focus on specific issues within the estimate. This article provides a detailed, step-by-step guide on how to use these features effectively.
                  </p>
                  <div
                    className="mb-5"
                    id="understanding-the-xactxpert-drawer"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Understanding the XactXpert Drawer
                  </h5>
                  <p className="mb-4">
                    The XactXpert Drawer interface is located on the right side of the Xactimate screen. It serves as a home for live estimating alerts, categorized into three main types:
                  </p>
                  <div className="d-flex mb-2">
                    <p className="mb-0">
                      <strong>Violations</strong>
                    </p>
                    <img
                      src={violations}
                      className="ml-2"
                    />
                  </div>
                  <p className="mb-4">
                    Violations are critical issues that require immediate attention. These alerts ensure essential standards and rules are not overlooked, safeguarding the accuracy and validity of the estimate. Violations must be resolved to be able to Print or Complete an estimate.
                  </p>
                  <div className="d-flex mb-2">
                    <p className="mb-0">
                      <strong>Warnings</strong>
                    </p>
                    <img
                      src={warnings}
                      className="ml-2"
                    />
                  </div>
                  <p className="mb-4">
                    Warnings highlight areas of concern that need closer examination. While not as urgent as violations, addressing these alerts helps prevent discrepancies in the estimate. Warning must be resolved or bypass to be able to Print or Complete an estimate.
                  </p>
                  <div className="d-flex mb-2">
                    <p className="mb-0">
                      <strong>Cautions</strong>
                    </p>
                    <img
                      src={cautions}
                      className="ml-2"
                    />
                  </div>
                  <p style={{ marginBottom: "-144px" }}>
                    Cautions are the least severe type of XactXpert alerts. They serve as suggestions or reminders to review specific aspects of the scope. These alerts help fine-tune estimates and ensure thoroughness. Cautions do not need to be resolved or dismissed to be able to Print or Complete an estimate.
                  </p>
                  <div
                    className="mb-5"
                    id="how-to-quickly-expand-and-collapse-violations-warnings-and-cautions-in-xactxpert"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    How to Quickly Expand and Collapse Violations,
                    <br />
                    Warnings, and Cautions in XactXpert
                  </h5>
                  <p className="mb-4">
                    The XactXpert Drawer is designed to provide clear and organized guidance. A key feature that adds flexibility to this process is the ability to expand and collapse guidance for each type of alert. This makes navigation more efficient, especially when working on lengthy scopes or focusing on specific alert types.</p>
                  <p className="mb-3">
                    <strong>How to Expand and Collapse Guidance</strong>
                  </p>
                  <p className="mb-2">
                    <strong>Locate the Alert Buttons:</strong>
                  </p>
                  <p className="mb-4">
                    Within the XactXpert Drawer, you’ll find three distinct buttons for Violations, Warnings, and Cautions. These represent the different alert types flagged by the system.
                  </p>
                  <p className="mb-2">
                    <strong>View the Alert List:</strong>
                  </p>
                  <p className="mb-4">
                    Click on any alert buttons (e.g., Violations) to expand the list of corresponding alerts. This displays detailed information about each issue, providing insights to guide your next steps.
                  </p>
                  <p className="mb-2">
                    <strong>Collapse the Guidance:</strong>
                  </p>
                  <p className="mb-4">
                    To collapse the list, simply click the same button again. This minimizes the section, declutters the workspace, and helps you focus on other tasks or alert types.
                  </p>
                  <p className="mb-2">
                    <strong>Repeat as Needed:</strong>
                  </p>
                  <p className="mb-3">
                    Expand and collapse each section independently based on your workflow. This flexibility ensures you can easily navigate and address issues without losing focus.
                    <br /><br />
                    Are you a visual learner? Don’t worry, because Stone has explained this in a quick tutorial. Check it out.
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/5ieGw5mGOaY"
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
                    id="the-actionable-xactimate-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Better, More Accurate Estimates with
                    <br />
                    The Actionable Xactimate Profile
                  </h5>
                  <p className="mb-4">
                    The <Link to="/actionable-xactimate-profile" target="_blank">Actionable Xactimate Profile</Link> is a game-changer for professionals seeking accuracy and efficiency in their estimates. This innovative tool delivers live estimating guidance through 3,500 Actionable Alerts that integrate seamlessly into your workflow, leveraging the Insight Sheet Database to provide relevant, data-driven recommendations.
                  </p>
                  <p className="mb-2">
                    <strong>How it Provides Live Estimating Guidance</strong>
                  </p>
                  <p className="mb-4">
                    The Actionable Xactimate Profile acts as a sherpa within Xactimate, offering real-time alerts for potential issues in your estimates. It ensures your estimates are accurate and complete by identifying missing warranted line items, suggesting corrections, and flagging critical errors.
                  </p>
                  <div className="d-flex mb-2">
                    <p className="mb-0">
                      <strong>Omission Alerts</strong>
                    </p>
                    <img
                      src={cautions}
                      className="ml-2"
                    />
                  </div>
                  <p className="mb-2">
                    Omission alerts notify users when important line items are missing or when the quantities of included items are insufficient. This ensures that all warranted expenses are accounted for in the estimate.
                  </p>
                  <p className="mb-2">
                    <strong>For example:</strong>
                  </p>
                  <p className="mb-2 font-italic">
                    <strong>Missing Line Items:</strong> When working on a 20-foot-high ceiling, an omission alert will remind you to add a line item for the additional cost of working at that height. This ensures that your estimate reflects the true scope of work.
                  </p>
                  <p className="mb-4 font-italic">
                    <strong>Appropriate Quantities:</strong> If the quantity of a specific material or item is underreported, the Actionable Profile will flag it, helping you avoid undercharging or misrepresenting the project requirements.
                  </p>
                  <div className="d-flex mb-2">
                    <p className="mb-0">
                      <strong>Overage Alerts</strong>
                    </p>
                    <img
                      src={warnings}
                      className="ml-2"
                    />
                  </div>
                  <p className="mb-2">
                    Overage alerts, on the other hand, help you avoid overcharging by identifying duplicate or excessive line items that don't align with the project's scope or sketch. 
                  </p>
                  <p className="mb-2">
                    <strong>For example:</strong>
                  </p>
                  <p className="mb-2 font-italic">
                    <strong>Duplicate Items:</strong> If you add both drywall and texture as separate line items, even though the drywall line item already includes texture, an overage alert will prompt you to remove the redundant item or provide clarification using an F9 note.
                  </p>
                  <p className="mb-0 font-italic">
                    <strong>Excessive Quantities:</strong> If a quantity exceeds what is justified by the sketch or project scope, the alert will notify you, helping you maintain accuracy and fairness in your estimate.
                  </p>
                  <Link to="/actionable-xactimate-profile" target="_blank" className="btn" style={{ marginBottom: "-144px" }}>
                    Try it now
                  </Link>
                  <div
                    className="mb-5"
                    id="learn-more"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Learn More with the Actionable Profile and
                    <br />
                    Xact Best Practices Bootcamp
                  </h5>
                  <p className="mb-5">
                    The Actionable Profile and Xact Best Practices Bootcamp go beyond basic tutorials. It provides an in-depth learning experience tailored to equip participants with real-world skills. This comprehensive training program empowers both beginners and experienced users, helping them master the full potential of features that Xactimate offers.
                  </p>
                  <Link to="/events" target="_blank" className="btn">
                    Register now
                  </Link>
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

export default withRouter(HowToExpandAndCollapseTheGuidanceProvidedWithinTheXactXpertDrawer);