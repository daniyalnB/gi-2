import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
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
import frame from "assets/Frame1.svg";

const MasterXactimateImportantTips = () => {

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
        title="Master Xactimate with these important tips | Actionable Insights"
        description="Want to master Xactimate? From leveraging the latest tech to small details like formatting scopes, we have the best tips to help you write accurate estimates."
        link="master-xactimate-important-tips"
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
                  Xactimate Mastery:
                  <br />
                  Actionable Tips for Better,
                  <br />
                  More Accurate Estimates
                </h1>
                <p> By Team Actionable | Aug 05, 2024 </p>
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
                  Writing accurate Xactimate estimates is crucial for any mitigation or repair process, playing a key role in both cost management and customer satisfaction. Accurate estimates ensure all necessary scope activities are accounted for, prevent cost overruns, and provide transparency to clients. Your Xactimate mastery can significantly enhance the accuracy of your estimates, leading to better project outcomes.
                </p>
                <h2 className="mt-5 mb-3">
                  Actionable Tips for Accurate <span className="red">Xactimate</span> Estimates
                </h2>
                <p className="mb-3"> Here, we share some Xactimate tips to help make your estimates more accurate. </p>
                <h4 className="mb-3"> 1. Leverage Live Estimating Guidance </h4>
                <p className="mb-3"> The Actionable Profile within Xactimate offers live estimating guidance, featuring over 3,500 alerts designed to enhance the accuracy of your estimates. What is live estimating guidance? Think of it as a real-time advisor that alerts you to potential mistakes or missing warranted line items while you write a scope. </p>
                <h5 className="mb-2"> How does the live estimating guidance work? </h5>
                <p className="mb-3">
                  The Actionable Profile is built on the expertise of seasoned estimators and adjusters. The alerts provide guidance based on what is reasonable and customary in the industry.
                  <br />
                  For example, if you add an air mover line item (WTR DRY) to your estimate, the live estimating guidance will prompt you to include the appropriate floor protection, labor to set up equipment, and PPE-oriented line items that may also be warranted to include in your scope.
                </p>
                <h5 className="mb-2"> Types of Alerts in the Actionable Profile </h5>
                <p className="mb-2"> You will see three primary types of alerts while working in XactXpert via the Actionable Profile. </p>
                <ul className="mb-4">
                  <li>
                    <span>Violations:</span> Highlight major problems in your estimates that must be resolved to print your scope. Note - there are no Violations in the Actionable Profile.
                  </li>
                  <li>
                    <span>Warnings:</span> Indicate potential issues that need to be addressed before finalizing your scope.
                  </li>
                  <li>
                    <span>Cautions:</span> Suggest potential improvements to your estimates, that may be warranted to include but have not been added yet.
                  </li>
                </ul>
                <p> These alerts collectively improve the accuracy of your estimates and help you achieve Xactimate mastery. If you’re not leveraging the Actionable Profile’s live estimating guidance, you’re missing out! </p>
                <div className="try-it-now mt-4 mb-4">
                  <Link to="/actionable-xactimate-profile">
                    <button
                      className="btn"
                      style={{
                        fontSize: "14px",
                        width: "111px",
                        height: "35px",
                      }}
                    >
                      Learn more
                    </button>
                  </Link>
                </div>
                <h4 className="mb-3"> 2. Use Macros </h4>
                <p className="mb-3"> Our second Xactimate tip is to use macros. A macro is an MCX file that is essentially a bundled set of Xactimate line items (and attached explanatory F9 notes). The Actionable Profile includes dozens of helpful pre-made macros that you can use to make your estimates more accurate. </p>
                <h5 className="mb-2"> How do macros work? </h5>
                <p>
                  Let’s say you are writing an invoice for a water mitigation project in a bedroom. Simply run a relevant macro and add the line items into your estimate. Alternatively, if you frequently work on similar estimates, you can save your own macros at any time to re-use in future scopes.
                  <br /><br />
                  Macros not only maximize productivity by cutting down the time spent on repetitive Xactimate tasks, but also minimize errors like omitting line items that may be necessary. After running the macro and customizing the line items to fit your current estimate, you can easily address any remaining issues with the help of live estimating guidance.
                </p>
                <div className="try-it-now mt-4 mb-4">
                  <Link to="/macros">
                    <button
                      className="btn"
                      style={{
                        fontSize: "14px",
                        width: "123px",
                        height: "35px",
                      }}
                    >
                      Explore more
                    </button>
                  </Link>
                </div>
                <h4 className="mb-3"> 3. Make sure to add F9 notes </h4>
                <p className="mb-3">
                  The friction between contractors and adjusters often stems from the difficulty of documenting losses and the administrative burden of settling an insurance claim. Clear, transparent communication is essential to the claims settlement process.
                  <br /><br />
                  One effective way to speed up the estimating and claims process is by adding detailed F9 notes to your estimates.
                </p>
                <h5 className="mb-2"> Why are F9 notes important? </h5>
                <p>
                  An explanatory F9 note can answer any scope questions before the question is asked! Industry experience will teach any estimator or adjuster what line items will come up in scope reviews more often than others, but if you’re not sure yet, it’s usually best practice to add an explanatory F9 note whenever possible to explain your reasoning and thought process behind adding that line item (or the calculation used for the line item).
                  <br /><br />
                  The Actionable Profile enhances this process by notifying you of any omissions or overages in your scope. Omissions indicate missing line items, while overages suggest possible duplication or overcharging. You can easily add an F9 note to clarify the activity after adding the line item.
                </p>
                <div className="try-it-now mt-4 mb-4">
                  <Link to="/video-gallery/academy-insights-next-generation-f9-notes">
                    <button
                      className="btn"
                      style={{
                        fontSize: "14px",
                        width: "117px",
                        height: "35px",
                      }}
                    >
                      Watch video
                    </button>
                  </Link>
                </div>
                <h4 className="mb-3"> 4. Formatting Matters </h4>
                <p>
                  The formatting and organization of your estimates have become crucial in determining the ability to settle a claim quickly and fairly. Presenting your scope properly is just as important as ensuring tight containment on the jobsite. To get paid fairly with minimal friction, it's essential to write accurate Xactimate estimates with proper formatting.
                  <br /><br />
                  Think of your estimate like a book: it should have proper formatting, bold headers for different trades or phases of the job, adequate spacing, and detailed notes to explain specific activities.
                  <br /><br />
                  This approach presents your digital brand as sophisticated and professional. With the Actionable Profile, you can ensure your estimates are always accurate and well-formatted.
                </p>
                <div className="try-it-now mt-4">
                  <Link to="/video-gallery/xact-hacks-formatting-estimates">
                    <button
                      className="btn"
                      style={{
                        fontSize: "14px",
                        width: "117px",
                        height: "35px",
                      }}
                    >
                      Watch video
                    </button>
                  </Link>
                </div>
                <h2 className="mt-5 mb-3">
                  Xactimate <span className="blue">Mastery</span> for Accurate Estimates
                </h2>
                <p>
                  Accurate Xactimate estimates aren’t just about years of experience in the field or in Xactimate. With an ever-expanding list of over 20,000 line items in Xactimate, it’s easy to overlook some in your scopes.
                  <br /><br />
                  Using the Actionable Profile is like having a certified Xactimate trainer reviewing your estimates while you work, alerting you to potential issues, and ensuring no line items are missed. This means fewer mistakes and more accurate estimates without needing extensive practice.
                  <br /><br />
                  <strong>Get an Actionable Insights membership and start using the Actionable Profile, now available for 99% off for the first month.</strong>
                </p>
                <div className="try-it-now mt-5">
                  <Link to="/plan-matrix">
                    <button
                      className="btn"
                      style={{
                        fontSize: "14px",
                        width: "98px",
                        height: "35px",
                      }}
                    >
                      Try it now
                    </button>
                  </Link>
                </div>
                <h2 className="mt-6 mb-3">
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

export default MasterXactimateImportantTips;