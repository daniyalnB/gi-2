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
import blog_image36 from "assets/blog_image36.png";

const TruePlanIntegrationWithXactimate = () => {

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
        title="Automate Sketches with Matterport TruePlan for Xactimate"
        description="Learn to integrate Matterport TruePlan with Xactimate to save time, reduce errors, and improve efficiency with pre-built sketches. Read more."
        link="blog/trueplan-integration-with-xactimate"
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
        <HideOn showOnPageInit height={isScreenHeight ? 7200 : 6800}>
        <div className="blog_side_menu blog_side_menu_new1">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#understanding-trueplan-and-its-benefits">
              —
              <span>
                Understanding TruePlan
                <br />
                and Its Benefits
              </span>
            </a>
            <a href="#how-the-integration-works">
              — 
              <span>
                How the Integration Works
              </span>
            </a>
            <a href="#using-trueplan-within-xactimate">
              — 
              <span>
                Using TruePlan Within
                <br />
                Xactimate
              </span>
            </a>
            <a href="#learn-with-visuals">
              — 
              <span>
                Learn with Visuals
              </span>
            </a>
            <a href="#troubleshooting-and-support">
              — 
              <span>
                Troubleshooting and
                <br />
                Support
              </span>
            </a>
            <a href="#best-practices-for-accurate-trueplan-integration">
              — 
              <span>
                Best Practices for
                <br />
                Accurate TruePlan
                <br />
                Integration
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
                    TruePlan Integration with <span className="red">Xactimate</span>
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Feb 26, 2025 </span>
                  <br />
                  <img
                    src={blog_image36}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Accurate data is essential for efficient claims handling in the property insurance industry. <a href="https://matterport.com/" target="_blank" className="red">Matterport</a> TruePlan and its integration with <a href="https://xactimate.com/" target="_blank" className="red">Xactimate</a> X1 simplify this process by offering precise, pre-built property sketches directly linked to claims. This seamless connection saves time, reduces manual errors, and ensures fairer outcomes for contractors and adjusters.
                    <br /><br />
                    From ordering TruePlan to troubleshooting common issues, this guide walks you through everything you need to know about using TruePlan effectively. Learn how the TruePlan Matterport integration is transforming claims processing with streamlined workflows, faster approvals, and improved transparency.
                  </p>
                  <div
                    className="mb-5"
                    id="understanding-trueplan-and-its-benefits"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Understanding TruePlan and Its Benefits
                  </h5>
                  <p className="mb-4">
                    TruePlan is a tool designed to simplify creating property sketches by turning Matterport scans into ready-to-use Xactimate sketches. This eliminates the need for manual measurements and drawings.
                    <br />
                    Accurate property scans are crucial for insurance claims. They ensure all the details are captured and nothing is missed. With TruePlan Matterport, you can rely on precise data, which leads to better estimates and fewer disputes.
                  </p>
                  <p className="mb-4">
                    <strong>How TruePlan integration helps</strong>
                  </p>
                  <p className="mt-0 mb-0">
                    <strong>Saves time:</strong> Pre-built Xactimate sketches eliminate hours of manual work, speeding up the claims process.
                  </p>
                  <p className="mt-0 mb-0">
                    <strong>Reduces errors:</strong> Manual work can lead to mistakes. TruePlan ensures your measurements are accurate and consistent.
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <strong>Improves efficiency:</strong> Reliable property data enables faster, fairer claims processing.
                  </p>
                  <div
                    className="mb-5"
                    id="how-the-integration-works"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> How the Integration Works </h5>
                  <p className="mb-4">
                    The integration of TruePlan is the result of a collaboration between Matterport and Verisk. This partnership allows you to order TruePlan directly within Xactimate X1 software. It’s a seamless process designed to save time and ensure accuracy during property assessments.
                    <br /><br />
                    Setting Up the Integration
                  </p>
                  <p className="mb-2">
                    <strong>How to enable TruePlan on Matterport</strong>
                  </p>
                  <p className="mb-0">
                    <ol className="mb-0 for-bold-marker">
                      <li>
                        <strong>Log in to your Matterport account.</strong>
                        <br />
                        Start by signing into your account using your credentials.
                      </li>
                      <li>
                        <strong>Go to settings.</strong>
                        <br />
                        Once logged in, navigate to the settings section and find the option for managing add-ons.
                      </li>
                      <li>
                        <strong>Enable the features.</strong>
                        <br />
                        In the add-ons menu, turn on both TruePlan and the Verisk Xactimate settings.
                      </li>
                      <li>
                        <strong>Enter your XactNet ID.</strong>
                        <br />
                        Add your XactNet ID to complete the setup. This step ensures your accounts are connected for a smooth workflow.
                      </li>
                    </ol>
                  </p>
                  <p className="mb-4"> To make the process even easier, enable automatic TruePlan ordering. This ensures quick approvals, reducing delays and making it more efficient to get the sketches you need. </p>
                  <p className="mb-2">
                    <strong>Connecting Accounts</strong>
                  </p>
                  <p className="mb-0"> Linking your Matterport and Xactimate accounts is straightforward. You can configure this integration in two ways: </p>
                  <p className="mb-0">
                    <ul className="mb-0" style={{ paddingLeft: "30px" }}>
                      <li>
                        <strong>One-to-one configuration:</strong> A single Matterport account links to one Xactimate account.
                      </li>
                      <li>
                        <strong>One-to-many configuration:</strong> A single Matterport account links to multiple Xactimate accounts, depending on your team’s needs.
                      </li>
                    </ul>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> By connecting these platforms, you enable a seamless system where Matterport TruePlan creates accurate property scans, and Xactimate transforms these scans into detailed, ready-to-use sketches. </p>
                  <div
                    className="mb-5"
                    id="using-trueplan-within-xactimate"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Using TruePlan Within Xactimate
                  </h5>
                  <p className="mb-4">
                    TruePlan integration with Xactimate makes creating accurate property sketches straightforward and efficient. Here's how you can use TruePlan within Xactimate to enhance your workflow.
                  </p>
                  <p className="mb-2">
                    <strong>Placing an Order</strong>
                  </p>
                  <p className="mb-0"> Follow these steps to order a TruePlan directly from Xactimate X1: </p>
                  <p className="mb-0">
                    <ol className="mb-0 for-bold-marker">
                      <li>
                        <strong>Open a claim.</strong>
                        <br />
                        Start by accessing the specific claim in Xactimate X1.
                      </li>
                      <li>
                        <strong>Click on "Request Data."</strong>
                        <br />
                        Inside the claim file, locate and click the "Request Data" button. This feature allows you to order a TruePlan quickly.
                      </li>
                      <li>
                        <strong>Enter the required information.</strong>
                        <br />
                        Provide all necessary details, including:
                      </li>
                    </ol>
                    <ul className="mb-0" style={{ paddingLeft: "60px" }}>
                      <li>Property address.</li>
                      <li>Specific claim identifiers, such as claim number or policy details.</li>
                      <li>Any additional information is needed to process the order accurately.</li>
                    </ul>
                  </p>
                  <p className="mb-4"> Once submitted, Matterport TruePlan will process your request and generate the sketch. </p>
                  <p className="mb-2">
                    <strong>Importing TruePlan into Sketch</strong>
                  </p>
                  <p className="mb-0"> When your TruePlan is ready, it can be seamlessly integrated into Xactimate. Here’s how: </p>
                  <p className="mb-4">
                    <ol className="mb-0 for-bold-marker">
                      <li>
                        <strong>Download the ESX file</strong>
                        <br />
                        Retrieve the pre-built sketch file provided by TruePlan Matterport.
                      </li>
                      <li>
                        <strong>Import into Sketch</strong>
                        <br />
                        Open the Sketch feature within Xactimate and import the ESX file. The integration ensures the sketch is ready to use without manual adjustments.
                      </li>
                      <li>
                        <strong>Review and adjust</strong>
                        <br />
                        After importing, review the sketch and make minor adjustments as needed to fit the specific claim requirements.
                      </li>
                    </ol>
                  </p>
                  <p className="mb-2">
                    <strong>Benefits of Using a Pre-Built Sketch</strong>
                  </p>
                  <p className="mb-0"> Using a pre-built sketch from Matterport TruePlan offers several advantages: </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li><strong>Faster claims processing:</strong> A complete and accurate sketch speeds up the estimating process. </li>
                      <li><strong>Reduced errors:</strong> Eliminates manual sketching mistakes, ensuring property dimensions are precise. </li>
                      <li><strong>Efficiency:</strong> Spend less time drafting and more time managing claims effectively. </li>
                    </ul>
                  </p>
                  <div
                    className="mb-5"
                    id="learn-with-visuals"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Learn with Visuals
                  </h5>
                  <p className="mb-4">
                    For a video tutorial of Matterport TruePlan integration with Xactimate, check out this video.
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/DjgQ9QxipAk"
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
                    id="troubleshooting-and-support"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Troubleshooting and Support </h5>
                  <p className="mb-4">
                    While integrating Matterport TruePlan with Xactimate X1 is designed to be seamless, occasional issues can arise. Here’s how to address them and ensure accurate integration.
                  </p>
                  <p className="mb-2">
                    <strong>Integration Delays</strong>
                  </p>
                  <p className="mb-0">
                    <strong>Issue:</strong> Sometimes, TruePlan orders may take longer to process.
                  </p>
                  <p className="mb-4">
                    <strong>Solution:</strong> Contact Matterport support for updates or escalate the issue with Xactimate representatives. Both teams are equipped to resolve delays and guide you through any technical difficulties.
                  </p>
                  <p className="mb-2">
                    <strong>Incorrect Address or Claim File Matching</strong>
                  </p>
                  <p className="mb-0">
                    <strong>Issue:</strong> Discrepancies between property addresses or mismatched claim files can lead to integration errors.
                  </p>
                  <p className="mb-4">
                    <strong>Solution:</strong> Double-check that the property address in the Matterport model matches the information entered in Xactimate. This step ensures smooth data exchange.
                  </p>
                  <p className="mb-2">
                    <strong>General Assistance</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <strong>Recommendation:</strong> If issues persist, reach out to Matterport or Xactimate representatives for personalized help. Their support teams can provide tailored solutions and troubleshoot unique problems.
                  </p>
                  <div
                    className="mb-5"
                    id="best-practices-for-accurate-trueplan-integration"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Best Practices for Accurate TruePlan Integration </h5>
                  <p className="mb-4">
                    To make the most of TruePlan integration, follow these best practices:
                  </p>
                  <p className="mb-2">
                    <strong>Ensure Address Accuracy</strong>
                  </p>
                  <p className="mb-4"> Always verify that the property address in the Matterport model aligns with the details in Xactimate. This minimizes errors and ensures the data flows seamlessly. </p>
                  <p className="mb-2">
                    <strong>Use Unique Identifiers</strong>
                  </p>
                  <p className="mb-4"> Include model IDs or other unique identifiers when linking files. This improves precision and avoids confusion between similar claims. </p>
                  <p className="mb-2">
                    <strong>Manage Pre- and Post-Mitigation Scans</strong>
                  </p>
                  <p className="mb-0"> For restoration projects, keep separate scans for the pre-mitigation and post-mitigation stages. This practice ensures clear documentation and supports better claims assessment. </p>
                  <h5 className="mt-5 mb-4"> Helpful Resources </h5>
                  <p className="mb-2">
                    <strong>Become Matterport Certified in Just 4.5 hours</strong>
                  </p>
                  <p className="mb-4"> If you want to master Matterport, we can proudly say that there is no better place to learn it than the <Link to="/aimc" target="_blank">Actionable Insights Matterport Certification</Link>. This is a comprehensive course designed to help professionals fully understand how to use Matterport effectively. This certification covers everything from handling hardware and software to leveraging the technology for sales, operations, business development, risk management, client retention, and more. </p>
                  <p className="mb-2">
                    <strong>Become a Master Estimator with the Actionable Profile And Xact Best Practices Bootcamp</strong>
                  </p>
                  <p className="mb-0"> This <Link to="/events" target="_blank">two-day comprehensive</Link> course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile. Covering the software's history, future, and essential features, this bootcamp provides an in-depth analysis of how to maximize Xactimate's potential for the modern-day estimator and claims professional. By the end of the course, you’ll gain expertise in line items, component buildups, yield adjustments, and the newest XactXpert utilities to further enhance your Xactimate skills.</p>
                  <h5 className="mt-5 mb-4"> Xactimate Sketch Gallery </h5>
                  <p className="mb-0">
                    Besides Matterport TruePlan, Sketch templates are also a great way to improve the accuracy of your sketches and the speed of your workflows. Our <Link to="/online-sketch-gallery" target="_blank">Xactimate Sketch Gallery</Link> contains over 100 sketch templates for various complex structures and components. The best thing is that you can get them for free on our <Link to="/" target="_blank">website</Link>.
                  </p>
                  <h5 className="mt-5 mb-4"> In Conclusion </h5>
                  <p className="mb-0">
                    As the property insurance industry adopts advanced tools, Matterport TruePlan and its integration with Xactimate stand out for its ability to promote transparency, efficiency, and trust. By leveraging this innovative solution, you can improve your claims processing and ultimately the bottom line of your business.
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

export default withRouter(TruePlanIntegrationWithXactimate);