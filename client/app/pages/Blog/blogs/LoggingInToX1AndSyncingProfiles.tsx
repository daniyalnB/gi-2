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
import blog_image37 from "assets/blog_image37.png";

const LoggingInToX1AndSyncingProfiles = () => {

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
        title="How to Log In and Sync Profiles in Xactimate X1 | Actionable Insights | Resources for Xactimate & Matterport"
        description="New to Xactimate X1? Learn how to log in to Xactimate X1 and sync essential profiles like the Actionable Profile in this guide. Read more now."
        link="blog/logging-in-to-x1-and-syncing-profiles"
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
        <HideOn showOnPageInit height={isScreenHeight ? 5000 : 4800}>
        <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#step-by-step-guide-to-logging-into-x1">
              —
              <span>
                Step-by-Step Guide to
                <br />
                Logging Into X1
              </span>
            </a>
            <a href="#syncing-profiles-during-your-first-login">
              — 
              <span>
                Syncing Profiles During
                <br />
                Your First Login
              </span>
            </a>
            <a href="#become-an-expert-estimator">
              — 
              <span>
                Become an Expert
                <br />
                Estimator
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
                    Logging In To X1 and Syncing Profiles
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Mar 05, 2025 </span>
                  <br />
                  <img
                    src={blog_image37}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Xactimate X1 is the latest version of <a href="https://xactimate.com/home/" target="_blank" className="red">Xactimate</a>, the most powerful estimating software. With advanced tools and seamless integration, Xactimate X1 simplifies workflows, ensuring accuracy and efficiency at every step. For estimators, the first step to using these features is logging into Xactimate X1 and syncing the necessary profiles. In this guide, we’ll walk you through how to log in to Xactimate X1 for the first time and sync your Xactimate profile to enhance your estimating experience.
                  </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-logging-into-x1"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Step-by-Step Guide to Logging Into X1 </h5>
                  <p className="mb-2 text-center">
                    <strong>Logging in with Your Xactimate ID</strong>
                  </p>
                  <p className="mb-0">
                    To access the full potential of Xactimate X1, you’ll need to start with your <a href="https://xactimate.com/xor/sign-in" target="_blank">Xactimate login</a>. Here's how:
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Open Xactimate X1 on your device.</li>
                      <li>Enter your Xactimate ID in the login field.</li>
                      <li>Input your password. (If you’re unsure of your credentials, check with your administrator or Xactware support.)Once logged in, you’ll be directed to the main interface of Xactimate X1, ready to begin syncing your Xactimate profile.</li>
                    </ul>
                  </p>
                  <p className="mb-2 text-center">
                    <strong>Accessing X1 for the First Time</strong>
                  </p>
                  <p className="mb-2">
                    When logging into Xactimate X1 for the first time, you’ll be prompted to select and sync the profiles you want to use. This step is essential for accessing features tailored to your specific estimating needs.
                  </p>
                  <p className="mb-2">
                    <strong>Select the Profile You Want to Sync</strong>
                  </p>
                  <p className="mb-4">
                    Select one profile you will be working in when logging in for the first time (Contractor, Carrier, Actionable, etc). While you can select multiple profiles to sync when logging in for the first time, we recommend only selecting a single profile during your first login. You will be able to sync additional profiles after login is complete under the Tools tab of X1 Xactimate.
                  </p>
                  <p className="mb-2 text-center">
                    <strong>Understanding Profiles in X1</strong>
                  </p>
                  <p className="mb-3">
                    When logging into Xactimate X1, it is crucial to select and sync the right profile. Profiles in Xactimate X1 are designed to cater to different types of users, providing tailored tools and reports based on specific needs. Let’s explore the available profiles and how they can enhance your estimating process.
                  </p>
                  <p className="mb-2">
                    <strong>Carrier Profile</strong>
                  </p>
                  <p className="mb-0">
                    The Carrier Profile is one of the most recommended choices for estimators due to its versatility and comprehensive features. Unlike other profiles, it offers fewer limitations and a broader range of tools, making it suitable for handling complex and varied estimates.
                  </p>
                  <p className="mb-0">
                    <strong>
                      <span className="blue">Why Choose the Carrier Profile?</span>
                    </strong>
                  </p>
                  <p className="mb-3">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Includes all the tools needed for accurate and detailed estimates.</li>
                      <li>Provides flexibility for working on diverse projects without restrictions.</li>
                      <li>Ideal for users who want to maximize the functionality of Xactimate X1.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Contractor Profile</strong>
                  </p>
                  <p className="mb-0">
                    The Contractor Profile is tailored for professionals who focus on job-specific reporting. While it has fewer features compared to the Carrier Profile, it includes exclusive reports that are essential for contractors.
                  </p>
                  <p className="mb-0">
                    <strong>
                      <span className="blue">Why Use the Contractor Profile?</span>
                    </strong>
                  </p>
                  <p className="mb-3">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Offers detailed job-specific reports that cater to contractor needs.</li>
                      <li>Best for users who require reports unavailable in the Carrier Profile.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Carrier-specific Profiles</strong>
                  </p>
                  <p className="mb-3">
                    Carrier-specific profiles are invaluable for estimators writing estimates in managed repair environments or program work. These profiles are customized for particular carriers, such as Branch Insurance.
                  </p>
                  <p className="mb-2">
                    <strong>Actionable Xactimate Profile</strong>
                  </p>
                  <p className="mb-0">
                    Among all the profiles available in X1 Xactimate, the Actionable Xactimate Profile stands out as it is specifically designed to help estimators write increasingly accurate and thorough estimates.
                  </p>
                  <p className="mb-0">
                    <strong>
                      <span className="red">What Makes the Actionable Xactimate Profile Unique?</span>
                    </strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Live Estimating Guidance: The Actionable Profile, powered by over 3,500 alerts, helps estimators identify omissions, overages, and other discrepancies in real time.</li>
                      <li>Industry-Standard Default Preferences: This profile reflects the realities of field execution, ensuring estimates align with real-world practices, unlike other profiles that often fail to do so.</li>
                      <li>Access to Actionable Insights Macros: Includes over 100 pre-built macros for some of the most common and complex scenarios to help you increase your productivity.</li>
                    </ul>
                  </p>
                  <div
                    className="mb-5"
                    id="syncing-profiles-during-your-first-login"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Syncing Profiles During Your First Login
                  </h5>
                  <p className="mb-4">
                    Syncing profiles during your initial Xactimate log-in is a crucial step in setting up your Xactimate X1 account. This process connects your account to the cloud, loads essential data, and ensures you have access to the profiles you need for efficient estimating.
                  </p>
                  <p className="mb-2 text-center">
                    <strong>Step-by-Step Process for Syncing Profiles</strong>
                  </p>
                  <p className="mb-2">
                    <strong>Log In to Xactimate X1:</strong>
                  </p>
                  <p className="mb-2">
                    Enter your Xactimate ID and password to access your account.
                  </p>
                  <p className="mb-2">
                    <strong>Select the Profiles You Want to Sync:</strong>
                  </p>
                  <p className="mb-2">
                    Choose from standard profiles like Carrier and Contractor. Don’t forget to sync the Actionable Xactimate Profile for its advanced tools and live estimating guidance.
                  </p>
                  <p className="mb-2">
                    <strong>Connect to the Cloud:</strong>
                  </p>
                  <p className="mb-2">
                    Syncing connects your account to the cloud, loads necessary data, and ensures you have access to files and preferences.
                  </p>
                  <p className="mb-3">
                    Watch the video to understand the process with a demo.
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/vb7HKJVTAmA"
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
                    id="become-an-expert-estimator"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Become an Expert Estimator with The <span className="blue">Actionable Profile</span>
                    <br />
                    and Xact Best Practices Bootcamp
                  </h5>
                  <p className="mb-0">
                    Mastering Xactimate X1 requires not just familiarity with its interface but also a deep understanding of its tools, and that’s where the Actionable Profile and Xact Best Practices Bootcamp comes in.
                    <br />
                    Whether you’re a beginner getting acquainted with Xactimate X1 or an experienced estimator looking to refine your skills, this comprehensive training helps you unlock the full potential of Xactimate, especially the Actionable Profile.
                  </p>
                  <p className="mb-5">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Build confidence in navigating Xactimate X1.</li>
                      <li>Learn to seamlessly sync Xactimate profiles and adapt them to your workflow.</li>
                      <li>Stay ahead with advanced tools and strategies that elevate your estimating skills.</li>
                    </ul>
                  </p>
                  <Link to="/events" target="_blank" className="btn">
                    Register now
                  </Link>
                  <h5 className="mt-5 mb-3"> Conclusion </h5>
                  <p className="mb-0"> Efficient estimating begins with proper setup and training. From logging in to Xactimate X1 and syncing essential profiles to selecting tools like the Actionable Xactimate Profile, each step sets the stage for better, more accurate estimates. Explore more articles and resources to deepen your understanding of Xactimate X1 and its features. </p>
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

export default withRouter(LoggingInToX1AndSyncingProfiles);