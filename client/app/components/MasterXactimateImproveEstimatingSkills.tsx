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
import frame from "assets/Frame.svg";

const MasterXactimateImproveEstimatingSkills = () => {

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
        title="Master Xactimate: Avoid Common Mistakes and Improve Your Estimating Skills"
        description="Want to master Xactimate? Our expert tips and the Actionable Profile will help you write accurate estimates and create better outcomes. Read more."
        link="master-xactimate-improve-estimating-skills"
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
        <div className="MasterXactimateImproveEstimatingSkills-header">
          <div className="sub-header">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <h1>
                  Master Xactimate: Avoid
                  <br />
                  <span>Common Mistakes</span> and Improve
                  <br />
                  Your Estimating Skills
                </h1>
                <p> By Team Actionable | July 08, 2024 </p>
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
                  Xactimate includes over 20,000 line items, with more being added every month. With so many line items to manage, mistakes are common and can have significant consequences beyond wasting time. Every contractor understands that poorly written estimates lead to increased friction in approvals, underpayment for work, and in worst-case scenarios, business losses that can lead to bankruptcy.
                  <br /><br />
                  We're not here to scare you, but to offer a reliable solution. Yes, you can avoid estimating mistakes and improve your scopes. How? The Actionable Profile.
                </p>
                <h2 className="mt-5 mb-3">
                  What is the <span className="blue">Actionable Profile</span>?
                </h2>
                <p>
                  The Actionable Profile is a profile within Xactimate that provides live estimating guidance to help you write accurate, well-justified, and simply better Xactimate estimates. Unfortunately, the lack of a standard for invoicing in the restoration and property insurance industry is a major cause of friction in the estimate approval process.
                  <br /><br />
                  Despite the absence of standardized invoicing, estimating guidance does exist in the industry! The Actionable Profile offers guidance based on what activities and related line items are customary and reasonable in the industry for a certain mitigation or repair process. This alignment between adjusters and estimators reduces friction in the estimate approval process.
                </p>
                <h2 className="mt-5 mb-3">
                  How does the <span className="blue">Actionable Profile</span> help you avoid
                  <br />
                  Xactimate <span className="red">mistakes</span>?
                </h2>
                <p>
                  The key is live estimating guidance. The Actionable Profile boasts over 3,500 rules tailored to a wide range of mitigation and repair activities.
                  <br /><br />
                  For example, one of the most common activities is deploying an air mover. When you add this line item to your scope, the live estimating guidance will alert you to add lead protection line items as well, since this is a customary and reasonable charge. 
                  <br /><br />
                  The Actionable Profile alerts you to any issues with your scope, both potential mistakes and line items you have yet to include that might be warranted. Its primary goal is to ensure there are no mistakes and no missing line items in your estimates, providing thorough and accurate scopes every time.
                </p>
                <h2 className="mt-5 mb-3">
                  Types of guidance in the <span className="blue">Actionable Profile</span>
                </h2>
                <p className="mb-3"> Guidance in the Actionable Profile is provided in two primary ways: overages and omissions. </p>
                <h5 className="mb-2"> What are overages? </h5>
                <p className="mb-3"> An overage alert is triggered by Xactimate mistakes such as duplicative line items or excessive quantities based on the rest of your line items. </p>
                <h5 className="mb-2"> For example: </h5>
                <p className="mb-3"> If you add a line item for drywall that includes texture and then add a separate line item for texture, an alert will notify you of the potential duplication. You can then remove the redundant line item or add F9 notes to clarify. </p>
                <h5 className="mb-2"> What are omissions? </h5>
                <p className="mb-3"> An omission alert occurs when warranted line items are missing or when you fail to charge for something based on your scope. </p>
                <h5 className="mb-2"> For example: </h5>
                <p> If you're working on drywall in a 20-foot-high room but charge for a standard height, an omission alert will remind you to include the appropriate line item for the additional effort. This ensures that you are charging for the difficulty of working at that height, aligning with industry standards. </p>
                <div className="try-it-now mt-4">
                  <Link to="/actionable-xactimate-profile">
                    <button
                      className="btn"
                      style={{
                        fontSize: "20px",
                        width: "158px",
                        height: "50px",
                      }}
                    >
                      Learn more
                    </button>
                  </Link>
                </div>
                <h2 className="mt-5 mb-3">
                  Write Better <span className="red">Xactimate Scopes</span> For Better Claims Outcomes
                </h2>
                <p>
                  Getting paid fairly hinges on well-formatted and accurate estimates. No matter how thoroughly the work is completed, if your estimate doesn't reflect it, you won’t be compensated. 
                  <br /><br />
                  With the Actionable Profile, you can ensure your estimates are complete, accurate, and well-formatted. As illustrated in the examples above, the live estimating guidance helps you write better estimates and get paid fairly, which is the goal for both carriers and contractors.
                </p>
                <h2 className="mt-5 mb-3">
                  <span className="red">Improve your Xactimate Skills</span> with the Actionable Profile
                </h2>
                <p>
                  Historically, knowledge in the restoration and property insurance industry has primarily been shared peer-to-peer. You either have to gradually learn from your mistakes, from your peers, or through extensive training. However, no matter how much you’ve trained in Xactimate, whether for a month or a decade, it’s easy to make mistakes in your estimates. 
                  <br /><br />
                  That’s where the Actionable Profile comes in. Built upon the expertise of seasoned estimators and adjusters, it offers you a guiding hand as you write your scopes. With this tool, you can not only improve your Xactimate skills but also ensure accurate and complete estimates every time.
                  <br /><br />
                  Interesting, right? Now that you know how the Actionable Profile can help you avoid Xactimate mistakes and write better estimates, we have exciting news! 
                  <br /><br />
                  You can try the Actionable Profile with a 99% discount for the first month- almost free! Don't miss this chance to enhance your estimating skills and ensure accuracy in your work.
                </p>
                <div className="try-it-now mt-5">
                  <Link to="/plan-matrix">
                    <button
                      className="btn"
                      style={{
                        fontSize: "20px",
                        width: "140px",
                        height: "50px",
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

export default MasterXactimateImproveEstimatingSkills;