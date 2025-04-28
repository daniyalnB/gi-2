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
import blog_image31 from "assets/blog_image31.png";

const ViolationCautionAndWarningAlertsInXactimate = () => {

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
        title="What are Violation, Caution, and Warning Alerts in Xactimate?"
        description="Violations, Cautions, and Warnings are three types of alerts in Xactimate. This article will help you understand each alert and how to address it. Read more."
        link="blog/deep-links-in-matterport"
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
        <HideOn showOnPageInit height={isScreenHeight ? 5800 : 5300}>
          <div className="blog_side_menu blog_side_menu_new1">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#introducing-the-actionable-xactimate-profile">
              —
              <span>
                Introducing the 
                <br />
                Actionable Xactimate
                <br />
                Profile
              </span>
            </a>
            <a href="#what-is-live-estimating-guidance">
              — 
              <span>
                What Is Live Estimating
                <br />
                Guidance?
              </span>
            </a>
            <a href="#violation-alerts">
              — 
              <span>
                Violation Alerts
              </span>
            </a>
            <a href="#warning-alerts">
              — 
              <span>
                Warning Alerts
              </span>
            </a>
            <a href="#caution-alerts">
              — 
              <span>Caution Alerts</span>
            </a>
            <a href="#how-alerts-make-your-estimate-more-accurate-and-thorough">
              — 
              <span>
                How Alerts Make Your 
                <br />
                Estimate More Accurate
                <br />
                and Thorough
              </span>
            </a>
            <a href="#actionable-profile-and-xact-best-practices-bootcamp">
              — 
              <span>
                Actionable Profile and
                <br />
                Xact Best Practices
                <br />
                Bootcamp
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
                    What are Violation, Caution, and
                    <br />
                    Warning Alerts in <span className="red">Xactimate?</span>
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Nov 27, 2024 </span>
                  <br />
                  <img
                    src={blog_image31}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Accuracy and compliance are crucial when creating estimates in <a href="https://xactimate.com/home/" target="_blank" className="red">Xactimate</a>, as they ensure fair and seamless claim settlements. Xactimate includes three different built-in alert types to guide users throughout the estimating process. These alerts provide real-time feedback, highlighting potential errors, mandatory fields, or suggestions to improve estimate accuracy and adherence to best practices. Understanding how these alerts function can help users navigate the complexities of Xactimate, leading to more accurate and thorough estimates. This article will explain each alert and how to address them.
                  </p>
                  <div
                    className="mb-5"
                    id="introducing-the-actionable-xactimate-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Introducing the Actionable Xactimate Profile </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    The <Link to="/actionable-xactimate-profile" target="_blank">Actionable Profile</Link> is a Xactimate profile designed to streamline the estimating process. It provides users with live estimating guidance with over 3500+ alerts to ensure that estimates meet industry standards.
                  </p>
                  <div
                    className="mb-5"
                    id="what-is-live-estimating-guidance"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> What Is Live Estimating Guidance? </h5>
                  <p className="mb-5">
                    Live estimating guidance, a feature of the Actionable Xactimate Profile, provides real-time alerts as users write estimates. As you input data and adjust the scope of work, this guidance adapts to the specific details of your estimate, offering alerts and suggestions.
                    This dynamic approach means estimators are not left guessing about potential issues or oversights. Instead, the guidance system flags relevant alerts (Violations, Warnings, or Cautions) depending on the scope.
                  </p>
                  <Link to="/demo" target="_blank" className="btn">
                    Book a demo of the Actionable Profile
                  </Link>
                  <p style={{ marginBottom: "-144px" }}></p>
                  <div
                    className="mb-5"
                    id="violation-alerts"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Violation Alerts </h5>
                  <p className="mb-2">
                    Violation alerts in Xactimate are critical notifications that must be addressed before an estimate can be completed or printed. These alerts are marked in red within the XactXpert Drawer, making them easy to identify. Violation alerts signal significant issues, such as missing required fields or unmet criteria, impacting the accuracy of the estimate. They ensure that essential details are included, maintaining compliance with industry standards.
                  </p>
                  <p className="mb-2">
                    <strong>Examples</strong>
                  </p>
                  <p className="mb-2">
                    Examples of common violation alerts include missing information in required fields like the "Date Received" or "Date Inspected." Another frequent violation involves the Labor Minimums review, which checks if labor minimums are correctly applied after adding line items.
                  </p>
                  <p className="mb-2">
                    <strong>How to Resolve Violation Alerts</strong>
                  </p>
                  <p className="mb-4">
                    To address these, users can click directly on the violation in the XactXpert Drawer, navigate to the problem area, and input the missing information or correct the issue. 
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/gA6anH9g-dc"
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
                    id="warning-alerts"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Warning Alerts </h5>
                  <p className="mb-2">
                    Warning alerts in Xactimate highlight potential issues requiring attention but offer flexibility in how they are handled. Displayed in orange in the XactXpert Drawer, they’re less urgent than violations but still require resolution. Warnings must be addressed or bypassed with a proper explanation before an estimate can be completed or printed.
                  </p>
                  <p className="mb-2">
                    <strong>Examples</strong>
                  </p>
                  <p className="mb-2">
                    Common scenarios for warning alerts include using line items incorrectly or overages in a scope. For instance, a warning might trigger if a particular material or service is applied outside its intended use.
                  </p>
                  <p className="mb-2">
                    <strong>How to Resolve or Bypass Warning Alerts</strong>
                  </p>
                  <p className="mb-4">
                    Users have the option to resolve the warning per the guidance or bypass it by adding an explanation for disregarding it. This flexibility allows estimators to maintain their preferred methods while providing adjusters with a clear rationale when exceptions are made.
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/_1J30nuBY4s"
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
                    id="caution-alerts"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Caution Alerts </h5>
                  <p className="mb-2">
                    Caution alerts serve as suggestions or reminders, helping estimators refine their estimates without requiring mandatory changes. These alerts are displayed in yellow in the XactXpert Drawer and act as optional guidance. They notify users of potential improvements or issues that may not directly affect the completion of the estimate but could enhance quality or accuracy.
                  </p>
                  <p className="mb-2">
                    <strong>Role of Caution Alerts</strong>
                  </p>
                  <p className="mb-2">
                    Unlike violations and warnings, caution alerts don’t need to be resolved for the estimate to be completed or printed. They provide insight into areas that may benefit from additional review.
                  </p>
                  <p className="mb-2">
                    <strong>Reviewing Caution Alerts</strong>
                  </p>
                  <p className="mb-4">
                    To get the most out of caution alerts, users should review them to ensure they’re aware of any potential improvements, contributing to more complete and accurate estimates.
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/C5twaVXK6WI"
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
                    id="how-alerts-make-your-estimate-more-accurate-and-thorough"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> How Alerts Make Your Estimate More Accurate and Thorough </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    Each type of alert in Xactimate plays a crucial role in refining the accuracy of estimates. Violation alerts ensure that mandatory information is included, warning alerts prompt users to address potential issues that might otherwise go unnoticed, and caution alerts offer valuable suggestions that can fine-tune an estimate for improved accuracy.
                    Before completing and printing an estimate, it is essential to review all active alerts. This review process helps to ensure that no critical errors are left unaddressed and that any deviations are properly explained. By following these alerts, estimators can produce more accurate and thorough estimates, leading to smoother claims processes.
                  </p>
                  <div
                    className="mb-5"
                    id="actionable-profile-and-xact-best-practices-bootcamp"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Actionable Profile and Xact Best Practices Bootcamp </h5>
                  <p className="mb-5"> Our Actionable Profile and Xact Best Practices Bootcamp offers in-depth training on using Xactimate to its full potential. In this two-day comprehensive course, participants learn about Xactimate’s history, future, and essential features, and how to leverage the Actionable Profile’s live estimating guidance. Our bootcamp is designed to help both novice and experienced professionals master line items, component buildups, yield adjustments, and the newest XactXpert utilities. </p>
                  <Link to="/events" target="_blank" className="btn">
                    Sign up now
                  </Link>
                  <h5 className="mt-6 mb-4"> In a nutshell </h5>
                  <p className="mb-0"> Understanding and utilizing alerts in Xactimate is essential for creating accurate, complete estimates. From addressing critical issues to suggestions for improvements, these alerts guide users through the complexities of the estimating process. By reviewing and resolving alerts before finalizing estimates, professionals can ensure that there are no mistakes and no missing warranted line items. </p>
                  <h5 className="mt-5 mb-4"> About Actionable Insights </h5>
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

export default ViolationCautionAndWarningAlertsInXactimate;