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
import blog_image38 from "assets/blog_image38.png";

const HowToEditProjectNamesInXactimateX1 = () => {

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
        title="How to Edit Project Names in Xactimate X1 | http://Getinsights.org"
        description="Xactimate X1's interface is quite different fro X28. Learn to edit project names in Xactimate X1 with this step-by-step guide. Read more."
        link="blog/how-to-edit-project-names-in-xactimate-x1"
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
            <a href="#editing-a-project-name-in-xactimate-x1">
              —
              <span>
                Editing a Project Name in
                <br />
                Xactimate X1
              </span>
            </a>
            <a href="#actionable-xactimate-profile">
              — 
              <span>
                Actionable Xactimate
                <br />
                Profile
              </span>
            </a>
            <a href="#join-the-actionable-profile-and-xact-best-practices-bootcamp">
              — 
              <span>
                Join the Actionable Profile
                <br />
                and Xact Best Practices
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
                    How to Edit Project Names in
                    <br />
                    <span className="red">Xactimate</span> X1?
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Mar 19, 2025 </span>
                  <br />
                  <img
                    src={blog_image38}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Efficient project management starts with the basics. Even small tasks, like editing a project name, play an essential role in keeping things organized. If you are new to <a href="https://xactimate.com/home/" target="_blank" className="red">Xactimate</a>, X1, its interface can feel overwhelming. This article provides a clear, step-by-step guide to editing project names in Xactimate X1.
                  </p>
                  <div
                    className="mb-5"
                    id="editing-a-project-name-in-xactimate-x1"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Editing a Project Name in Xactimate X1 </h5>
                  <p className="mb-2 text-center">
                    <strong>Accessing the Project Preview Option</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px", marginBottom: "5px" }}>
                      <li>Open Xactimate X1 and navigate to the Local Tab.</li>
                    </ul>
                    <ul style={{ paddingLeft: "90px", marginBottom: "5px", maxWidth: "750px" }}>
                      <li>The Local Tab serves as a central hub, displaying a list of your projects and estimates.</li>
                    </ul>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Find the project you want to edit from the list of projects in the Local Tab.</li>
                      <li>Click on the project to select it. This highlights the project and activates more options. You will see them in the menu bar on the right-hand side of the screen.</li>
                      <li>Once you select a project, a Menu Bar appears on the right-hand side of the screen. This bar provides various tools and options for managing the selected project.</li>
                      <li>At the top of the menu bar, you’ll find the Project Preview icon, represented by an “Eye” symbol.</li>
                    </ul>
                  </p>
                  <p className="mb-2 text-center">
                    <strong>Editing the Project Name</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px", marginBottom: "5px" }}>
                      <li>Click on the Project Preview icon to open the project details screen. Here you can access and edit the project name and other relevant fields.</li>
                      <li>In the Project Preview section, you’ll see several editable fields, including:</li>
                    </ul>
                    <ul style={{ paddingLeft: "90px", marginBottom: "5px", maxWidth: "750px" }}>
                      <li>Project Name: The primary identifier for your project.</li>
                      <li>Insured Name: The name of the insured party.</li>
                      <li>Claim Name: A secondary identifier tied to the claim.</li>
                    </ul>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>These fields allow users to input precise and accurate information.</li>
                      <li>Click on the Project Name field to activate it for editing.</li>
                      <li>Enter the new project name that reflects the changes you need to make. Be sure to double-check the spelling and formatting to ensure accuracy.</li>
                      <li>Once you’ve entered the new project name, look for the Save button. You can find it in the Project Preview menu.</li>
                      <li>Click Save to confirm your changes. The updated project name will immediately reflect in the Local tab and throughout Xactimate X1.</li>
                    </ul>
                  </p>
                  <p className="mb-3">
                    Check out the video tutorial:
                  </p>
                  <div className="mb-4 youtube_video_main">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/UqrwzexRpxk"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                          style={{ borderRadius: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mb-2 text-center">
                    <strong>The Importance of Proper Project Names</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    Project names act as identifiers. They help users quickly locate and differentiate between estimates. In a busy environment with multiple ongoing projects, this helps streamline workflows and reduces confusion. Furthermore, it ensures team members access the correct information without unnecessary delays.
                    <br />
                    Without proper project names, estimators and collaborators may spend excessive time searching for the right file, leading to inefficiencies and potential miscommunications. Proper project names make retrieval straightforward, improving productivity across the board.
                  </p>
                  <div
                    className="mb-5"
                    id="actionable-xactimate-profile"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Introducing the Actionable Xactimate Profile
                  </h5>
                  <p className="mb-4">
                    The Actionable Profile is a profile within Xactimate that integrates with XactXpert. With over 3,500 Actionable Alerts, it is designed to enhance the accuracy of your estimates.
                  </p>
                  <p className="mb-2 text-center">
                    <strong>Key Features of the Actionable Profile</strong>
                  </p>
                  <p className="mb-2">
                    <strong>Live Estimating Guidance</strong>
                  </p>
                  <p className="mb-0"> Get real-time guidance to correct any mistakes or add missing warranted line items. This ensures your estimates are increasingly accurate and thorough. </p>
                  <p className="mt-2 mb-2">
                    <strong>Actionable's Industry Standard Preferences</strong>
                  </p>
                  <p className="mb-0"> The Actionable Profile reflects the reality of execution in the field. </p>
                  <p className="mt-2 mb-2">
                    <strong>Access to Actionable Insights Macros</strong>
                  </p>
                  <p className="mb-0"> With over 100 macros, you can save significant time by automating repetitive tasks and maintaining consistency. </p>
                  <Link to="/actionable-xactimate-profile" target="_blank" className="btn" style={{ marginBottom: "-72px" }}>
                    Get started with 99% off now
                  </Link>
                  <div
                    className="mb-4"
                    id="join-the-actionable-profile-and-xact-best-practices-bootcamp"
                  >
                  </div>
                  <div className="pb-4 pt-4"></div>
                  <h5 className="mt-5 mb-4">
                    Join the Actionable Profile and
                    <br />
                    Xact Best Practices Bootcamp
                  </h5>
                  <p className="mb-4">
                    The Xactimate Bootcamp is the perfect opportunity for anyone looking to master Xactimate and its advanced features. Whether you’re new to the platform or a seasoned estimator, this bootcamp delivers in-depth training on key tools like instance-level rules, profile customization, and live guidance through XactXpert. With hands-on learning and real-world scenarios, participants gain practical expertise to elevate their estimating skills.
                  </p>
                  <Link to="/events" target="_blank" className="btn">
                    Sign up now
                  </Link>
                  <h5 className="mt-6 mb-3"> Summary </h5>
                  <p className="mb-0"> Editing project names in Xactimate X1 is simple. It is also critical for maintaining an organized and efficient workflow. If you want to improve your skills further, we recommend exploring the Actionable Xactimate Profile and attending the Xact Best Practices Bootcamp. With the right knowledge, Xactimate can become easier to use, ultimately improving your estimates. </p>
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

export default HowToEditProjectNamesInXactimateX1;