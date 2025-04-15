import React, { Suspense, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { ContactUsForm } from "../../utils/api-routes/api-routes.util";
import InputMask from "react-input-mask";
import ReCAPTCHA from "react-google-recaptcha";
import download from "assets/Download.svg";
import frame from "assets/Frame5.svg";

const XactimateMacro = () => {

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
        title="Xactimate Macros: Automate and Accelerate Your Workflow"
        description="What are Xactimate Macros, and how can you use them to automate and streamline your Xactimate estimates? Learn from our comprehensive guide. Read more."
        link="xactimate-macro"
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
        <div className="MasterXactimateImportantTips-header">
          <div className="sub-header">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 m-auto">
                <h1>
                  Xactimate Macros: Automate and
                  <br />
                  Accelerate Your Workflow
                </h1>
                <p> By Team Actionable | Dec 11, 2024 </p>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 image-sec">
                <img src={frame} />
              </div>
            </div>
          </div>
        </div>
        <div className="main-container">
          <div className="contact-us">
            <div className="">
              <div className="master-xactimate-improve-estimating-skills">
                <p className="mt-4">
                  As an estimator or adjuster, managing multiple estimates simultaneously makes efficiency crucial.{" "}
                  <a href="https://xactimate.com/xor/sign-in" target="_blank" className="red">
                    Xactimate
                  </a> offers a powerful tool to help you automate and accelerate your workflow: macros. These allow you to streamline repetitive tasks in Xactimate estimates, increasing productivity and saving time.
                  <br /><br />
                  Here, we’ll explore how macros work, the advantages they bring to your workflow, and practical tips to make the most out of this feature. Let’s dive in!
                </p>
                <h2 className="mt-5 mb-3">
                  What Are <span className="red">Xactimate</span> Macros?
                </h2>
                <p className="mb-0">
                  Simply put, a macro in Xactimate is a pre-configured set of line items that can be quickly applied to common types of estimates, eliminating repetitive data entry.
                  <br /><br />
                  By creating macros for frequently recurring jobs, such as water mitigation, roofing repairs, or drywall replacement, you can standardize the estimating process and streamline Xactimate estimates. 
                  <br /><br />
                  This allows you to quickly populate your estimates with the necessary line items, ensuring that nothing is overlooked. Macros help you maintain consistency, save time, and reduce errors by applying a predefined template to various scenarios, making the estimating process faster and easier to manage.
                  <br /><br />
                  Actionable Insights offers over 100 macros designed to help you with your estimates.
                </p>
                <div className="try-it-now mt-4">
                  <Link to="/macros" target="_blank">
                    <button
                      className="btn"
                      style={{
                        fontSize: "20px",
                        maxWidth: "200px",
                        minHeight: "50px",
                      }}
                    >
                      Check them out
                    </button>
                  </Link>
                </div>
                <div className="about-actionable-profile" style={{ maxWidth: "600px", margin: "0 auto" }}>
                  <div className="youtube_video_main">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/RbJdXPBllTs"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="mt-5 mb-3">
                  Why Use Xactimate <span className="blue">Macros</span>?
                </h2>
                <h4 className="mb-3"> Time Savings </h4>
                <p className="mb-4">
                  Manually entering line items for every estimate can be tedious and time-consuming. With macros, you can predefine sets of line items for common jobs. Using macros to automate Xactimate estimates reduces data entry time, enabling you to generate comprehensive estimates in a shorter timeframe.
                </p>
                <h4 className="mb-3"> Consistency </h4>
                <p className="mb-4">
                  Macros ensure that every estimate adheres to your company’s standards. Preconfigured line items for specific tasks help maintain consistency across estimates, creating a more reliable and professional output.
                </p>
                <h4 className="mb-3"> Increased Productivity </h4>
                <p className="mb-0">
                  By automating routine tasks, Xactimate macros allow estimators to focus on strategic work, whether that’s fine-tuning estimates, addressing client needs, or enhancing processes. The saved time can be invested elsewhere, improving overall productivity while still delivering estimates on time.
                </p>
                <h2 className="mt-5 mb-3">
                  How to Use <span className="blue">Macros</span> in Xactimate?
                </h2>
                <p className="mb-4">
                  Xactimate macros are easy to set up and can greatly simplify your workflow. Here’s a step-by-step guide to creating and using macros to automate your estimates:
                </p>
                <h4 className="mb-3"> Step 1: Access the Macro Library in Xactimate </h4>
                <p className="mb-4">
                  To begin, open Xactimate and navigate to the Macros tab in the Items window. Here, you’ll find the macro library where existing macros are stored and where you can create new ones.
                </p>
                <h4 className="mb-3"> Step 2: Create a Macro Based on Frequently Used Line Items </h4>
                <p className="mb-4">
                  To create a macro, select the line items you frequently use in your estimates. Once selected, click on the “Create Macro” option, assign it a name (e.g., "Water Mitigation" or "Roofing Repair"), and save it for future use.
                </p>
                <h4 className="mb-3"> Step 3: Apply the Macro to New Estimates for Quick and Easy Automation </h4>
                <p className="mb-4">
                  When starting a new estimate, access the macro library, select the macro you want, and Xactimate will automatically populate the estimate with all pre-defined line items from your macro, saving you from manually inputting them each time.
                </p>
                <h4 className="mb-3"> Step 4: Customize and Modify Macros as Needed </h4>
                <p className="mb-0">
                  Once a macro is applied, you can customize it to fit the specific needs of the project. Add, remove, or modify line items as required to ensure the estimate is tailored to the job at hand. You can also update your macros over time as your processes evolve, ensuring they stay relevant to your needs.
                </p>
                <div className="about-actionable-profile" style={{ maxWidth: "600px", margin: "0 auto" }}>
                  <div className="youtube_video_main">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/83_BJykyTxc"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="mt-5 mb-3">
                  Take it to the next level with the <span className="blue">Actionable Profile</span>
                </h2>
                <p className="mb-0">
                  Macros are awesome, but there’s one hiccup when it comes to using them. When you use a macro, it populates all the line items at once. While this automation streamlines your Xactimate estimates, customization is still required to match the specific project. The best way to handle this effortlessly is by using the{" "}
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    Actionable Xactimate Profile
                  </Link>.
                  <br /><br />
                  Not only does it come with 115+ free Xactimate Macros to help you, but it also offers live estimating guidance. Once you are done using your macro and now it's time to make the customizations, that’s where the actual benefit of the profile comes into play. It will give you all the actions needed to be taken in the form of alerts. It identifies any missing warranted line items, incorrect entries, insufficient quantities, duplications, or other issues within your estimate. The Actionable Profile will guide you to make it right.
                  <br /><br />
                  Want to learn more about it? Book a free{" "}
                  <Link to="/demo" target="_blank">
                    demo
                  </Link>.
                </p>
                <h2 className="mt-5 mb-3">
                  Frequently Asked <span className="red">Questions</span> 
                </h2>
                <h5 className="mb-2"> Can I share my Xactimate macros with other team members? </h5>
                <p className="mb-3">
                  Yes, macros can be shared with your team. By exporting the macro file from your Xactimate system, other users can import it into their libraries and use it for their estimates.
                </p>
                <h5 className="mb-2"> Can I use macros for complex estimates with multiple phases? </h5>
                <p className="mb-3">
                  Absolutely! Xactimate macros can be tailored for different phases of complex projects. For example, you can create separate macros for demolition, mitigation, and reconstruction, making it easier to apply them to specific project phases.
                </p>
                <h5 className="mb-2"> What happens if Xactimate updates its line items? Do I need to update my macros? </h5>
                <p className="mb-3">
                  Yes, if Xactimate updates pricing or details of certain line items, you’ll need to manually update your macros to reflect these changes. It’s a good practice to review your macros periodically to ensure they are up-to-date.</p>
                <h5 className="mb-2"> Is there a limit to how many macros I can create in Xactimate? </h5>
                <p className="mb-3">
                  No, there is no limit on the number of macros you can create.
                </p>
                <h5 className="mb-2"> Can macros include notes or custom descriptions for specific line items? </h5>
                <p className="mb-3">
                  Yes, you can include custom notes or descriptions in your macros. This is especially helpful for adding important details that may need to be referenced in each estimate, ensuring clarity and compliance.
                </p>
                <h5 className="mb-2"> Can I edit a macro after applying it to an estimate? </h5>
                <p className="mb-3">
                  Yes, once a macro is applied to an estimate, you can freely edit the line items within the estimate without affecting the original macro. If you want to update the macro itself, you’ll need to save the changes separately.
                </p>
                <h5 className="mb-2"> How do I troubleshoot if my macro isn't working as expected? </h5>
                <p className="mb-0">
                  If a macro doesn’t populate the correct line items or isn’t working as expected, check for outdated line items or mismatched settings. Make sure that all necessary items are included and confirm the macro is compatible with the current version of Xactimate.
                </p>
                <h2 className="mt-5 mb-3">
                  About <span className="red">Actionable Insights</span>
                </h2>
                <p className="mb-3">
                  We're a 501(c)(6) educational non-profit that builds tools and resources to help the property insurance industry thrive.
                  <br /><br />
                  For any questions, reach out to us below:
                </p>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
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
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="about-actionable-profile">
                    <h2>
                      About <span>Actionable Profile</span>
                    </h2>
                    <p>
                      Live estimating guidance while you write in Xactimate.
                      <br/>
                      No more mistakes, no more missed line items. 
                    </p>
                    <div className="book-a-demo">
                      <Link to="/demo" target="_blank">
                        <button className="btn">
                          Book a demo with an expert
                        </button>
                      </Link>
                    </div>
                    <div className="youtube_video_main">
                      <div className="video">
                        <div className="fluid-width-video-wrapper">
                          <iframe
                            src="https://www.youtube.com/embed/jMO-tar3G8c?si=6B7y9jZWK1xXEM2Z"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            name="actionable-xactimate-profile"
                          />
                        </div>
                      </div>
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

export default withRouter(XactimateMacro);