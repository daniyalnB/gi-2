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
import blog_image30 from "assets/blog_image30.png";

const DeepLinksInMatterport = () => {

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
        title="How to Create and Use Deep Links in Matterport"
        description="A comprehensive guide to creating and using Deep Links in Matterport. Learn how to use this feature to make your estimates even better. Read more."
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
        <HideOn showOnPageInit height={isScreenHeight ? 5000 : 4700}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#what-are-deep-links-in-matterport">
              —
              <span>
                What Are Deep Links in
                <br />
                Matterport?
              </span>
            </a>
            <a href="#step-by-step-guide-to-creating-deep-links">
              — 
              <span>
                Step-by-Step Guide
                <br />
                to Creating Deep
                <br />
                Links
              </span>
            </a>
            <a href="#how-to-use-deep-links-in-claim-settlements">
              — 
              <span>
                How to Use Deep Links
                <br />
                in Claim Settlements
              </span>
            </a>
            <a href="#matter-hacks">
              — 
              <span>Matter Hacks</span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    How to Create and Use <span className="blue">Deep Links</span> in
                    <br />
                    <span className="red">Matterport?</span>
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Nov 20, 2024 </span>
                  <br />
                  <img
                    src={blog_image30}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Matterport is transforming claim settlements with its advanced 3D scanning technology, offering detailed virtual tours of properties. This tool is invaluable for adjusters and contractors, enabling them to assess property damage remotely and accurately. A key feature of Matterport is deep links. In this article, we'll explore what deep links are in Matterport, how to create and use them, and their benefits. We'll also cover best practices and solutions to common issues related to deep links, ensuring you can maximize the potential of this feature.
                  </p>
                  <div
                    className="mb-5"
                    id="what-are-deep-links-in-matterport"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> What Are Deep Links in Matterport? </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    Deep links in Matterport are unique URLs that pinpoint a specific location within a 3D scan. Unlike a general link to a Matterport virtual tour, deep links allow users to jump directly to a precise spot, providing a view of a particular feature or area within the scanned property. This is particularly useful in scenarios where certain details need to be highlighted, such as water damage in a basement, fire damage to a wall, or other localized issues within a property.
                  </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-creating-deep-links"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Step-by-Step Guide to Creating Deep Links </h5>
                  <p className="mb-2">
                    <strong>Step 1: Log into Your Matterport Account</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Start by logging into your Matterport account using your credentials.</li>
                      <li>Once logged in, navigate to the dashboard and select the 3D scan you want to work with. Make sure the scan is fully loaded before moving to the next step.</li>
                    </ul>
                  </p>
                  <p className="mb-2 mt-4">
                    <strong>Step 2: Navigate to the Desired Location</strong>
                  </p>
                  <p className="mb-0">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Use your mouse or keyboard to move through the 3D scan and find the specific spot you want to highlight.</li>
                      <li>Zoom in and adjust your view to focus precisely on the area where you wish to create a deep link. This could be a damaged area or any building material that needs to be referenced.</li>
                    </ul>
                  </p>
                  <p className="mb-2 mt-4">
                    <strong>Step 3: Press the U Key to Generate a Deep Link</strong>
                  </p>
                  <p className="mb-0">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>After positioning yourself at the desired spot in the 3D scan, press the “U” key on your keyboard.</li>
                      <li>This will generate a deep link for the current view and display it in the top right corner of your screen.</li>
                    </ul>
                  </p>
                  <p className="mb-2 mt-4">
                    <strong>Step 4: Copy and Share the Deep Link</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Click the “Copy” button or highlight the URL and press “Ctrl+C” to copy the link to your clipboard.</li>
                      <li>For best practices, paste these deep links into F9 notes for easy reference, share the link directly with stakeholders like adjusters, contractors, or policyholders. Be sure to provide context when sharing the link to avoid any confusion.</li>
                    </ul>
                  </p>
                  <p className="mb-4">Prefer watching the tutorial instead? Jump right in and view the video!</p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/ufzMLmupMSw"
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
                    id="how-to-use-deep-links-in-claim-settlements"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> How to Use Deep Links in Claim Settlements </h5>
                  <p className="mb-4">
                    Deep links are a powerful tool for claim settlement when embedded into F9 notes within Xactimate. By generating a link to a specific point within a Matterport 3D scan, adjusters and contractors can directly reference the exact location they are discussing. Once the deep link is created in Matterport, copy and paste it into the F9 notes section of an Xactimate estimate. This allows anyone reviewing the estimate to click the link and be taken directly to the relevant spot within the scan, providing immediate visual context for the claim.
                  </p>
                  <p className="mb-4">
                    <strong>Examples of Scenarios Where Deep Links Enhance Clarity</strong>
                  </p>
                  <p className="mb-1">
                    <strong><span className="blue">Justifying a Line Item</span></strong>
                  </p>
                  <p className="mb-4"> For instance, if an adjuster is debating a repair cost with a contractor, a deep link can be used to show precisely where the damage occurred. This visual evidence helps justify the inclusion of a particular line item in the estimate. </p>
                  <p className="mb-1">
                    <strong><span className="blue">Referencing Specific Damage Locations</span></strong>
                  </p>
                  <p className="mb-4"> When a policyholder is unsure about the extent of the damage, deep links allow them to see the exact area under discussion. This ensures transparency, helping policyholders understand why certain repairs are necessary. It also helps contractors clearly explain the scope of work. </p>
                  <p className="mb-4">
                    <strong>Benefits of Using Deep Links in Matterport</strong>
                  </p>
                  <p className="mb-1">
                    <strong><span className="blue">Enhanced Communication</span></strong>
                  </p>
                  <p className="mb-4"> Deep Links in Matterport are powerful tools for fostering clear communication among all stakeholders. By providing a direct visual reference point in a 3D tour, they help ensure that adjusters, contractors, and policyholders all see the same details. This shared understanding makes discussions more productive, leading to faster consensus and reducing misunderstandings that could delay the claim settlement process. </p>
                  <p className="mb-1">
                    <strong><span className="blue">Time Savings</span></strong>
                  </p>
                  <p className="mb-4"> One of the significant advantages of using deep links in Matterport is the time saved during claim settlements. Embedding links into documentation eliminates the need for lengthy explanations or multiple visits to the property. Instead, stakeholders can view the scene remotely, reducing the administrative workload and helping to shorten the overall claim cycle. This efficiency is particularly beneficial for managing multiple claims, as it allows adjusters to handle their workload more effectively. </p>
                  <p className="mb-1">
                    <strong><span className="blue">Accuracy in Documentation</span></strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> Deep links provide precision in claim documentation, which is critical in reducing disputes and errors. By linking directly to a specific spot in a Matterport 3D scan, adjusters can ensure that the referenced location is visible to all parties involved. This minimizes the risk of mistakes or misinterpretations, which can often occur when descriptions are vague or when multiple areas of a property need examination. </p>
                  <div
                    className="mb-5"
                    id="matter-hacks"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Matter Hacks </h5>
                  <p className="mb-0">
                    Matter Hacks is a series by Actionable Insights that shares the best tips and tricks for using Matterport. Whether it's exploring unique applications of geospatial technology or diving into various features, our short, quick tutorials cover everything you need to know.
                    For more tutorials, visit our <a href="https://www.youtube.com/playlist?list=PLtF55NJwJ_ZMtH3fpBfZMSwbLpFTRbZvI" target="_blank">channel</a>.
                  </p>
                  <h5 className="mt-5 mb-4"> Become a Certified Matterport Expert in Just 4.5 Hours! </h5>
                  <p className="mb-5"> Matterport’s technology is transforming the property insurance industry by bringing efficiency and transparency to the claims settlement process. The Actionable Insights Matterport Certification course equips you with the skills to fully utilize this revolutionary technology, enabling you to scale its training and implementation across your company. You'll be prepared to leverage Matterport as intended. </p>
                  <Link to="/aimc" target="_blank" className="btn">
                    Check it out now
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

export default withRouter(DeepLinksInMatterport);