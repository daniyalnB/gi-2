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
import frame from "assets/Frame9.svg";

const ActionableProfileVsEstimateReviewers = () => {

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
        title="The Actionable Profile vs Estimate Reviewers | Getinsights.org"
        description="The Actionable Profile is an Xactimate profile that offers live estimating guidance. But how does it differ from 3rd party estimate auditors? Find out."
        link="actionable-profile-vs-estimate-reviewers"
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
                  How is the Actionable Profile
                  <br />
                  different from 3rd party estimate
                  <br />
                  review solutions?
                </h1>
                <p> By Team Actionable | Apr 17, 2025 </p>
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
                  Your estimates can make or break your business because they determine your payout. The more accurately your estimates reflect the work done, the easier it will be to get paid in full. In this regard, many third-party estimate review services are available, but the{" "}
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    Actionable Xactimate Profile
                  </Link> is different from these review services. How? This article will explore exactly that.
                </p>
                <h2 className="mt-5 mb-3">
                  What is the <span className="blue">Actionable Profile</span>?
                </h2>
                <p className="mb-0">
                  The Actionable Xactimate Profile is not a third-party estimate writing or review service. Instead, it is a profile within{" "}
                  <a href="https://xactimate.com/home/" target="_blank" className="red">
                    Xactimate
                  </a> that provides live estimating guidance.
                </p>
                <h2 className="mt-5 mb-3">
                  What makes it <span className="red">different</span>?
                </h2>
                <h5 className="mb-2"> Origin </h5>
                <p className="mb-3">
                  The Actionable Profile was created to reduce friction in the claims process. A group of Xactimate estimators and adjusters in San Diego came together to determine and establish standards of invoicing based on customary building practices.
                  <br /><br />
                  Soon, this evolved into a 3,000-page book authored by our Founder, Mark Whatley, and Executive Director, Seth Harrison. Drawing from their years of experience as Xactimate Certified Trainers, they compiled this book, which later became the Actionable Profile.
                  <br /><br />
                  The Actionable Profile leverages the collective experience of all the estimators and adjusters who participated in this effort to minimize claims disputes between carriers and contractors.
                </p>
                <h5 className="mb-2"> Integrated with Xactimate </h5>
                <p className="mb-3">
                  Unlike third-party estimate review services, the Actionable Profile is built within Xactimate. This means that you don’t have to send your estimates to anyone to get reviewed. You can have them reviewed using the Actionable Profile within Xactimate. This removes the unnecessary hassle and extra steps involved with sending your estimates back and forth. Furthermore, with less hassle, you will save more time as well.
                </p>
                <h5 className="mb-2"> Live Estimating Guidance </h5>
                <p className="mb-3">
                  The Actionable Xactimate Profile offers live estimating guidance. This means that the Actionable Profile reviews your estimate as you write your scope. Over 4,200 Actionable Alerts guide you to write increasingly accurate and complete estimates. But how does this guidance work? There are two primary types of alerts: Overages and Omissions.
                  <br /><br />
                  Overages refer to excessive quantities and duplicative line items used in the estimate. Overage alerts help you use mutually exclusive line items and set accurate quantities. For example, the drywall line item already includes texture. An overage alert will trigger if you add drywall and texture as separate line items. It will prompt you to remove the redundant item or provide clarification using an F9 note.
                  <br /><br />
                  Omissions refer to missing but warranted items, as well as insufficient quantities of line items. These alerts help ensure that your estimate reflects the true scope of work. For example, when working on a 20-foot-high ceiling, you may charge for the usual height. In this case, an omission alert will remind you to add a line item for the additional cost of working at that height.
                  <br /><br />
                  Together, these alerts help you write accurate and complete estimates, reducing friction in the approval process.
                </p>
                <h5 className="mb-2"> Learn from the guidance </h5>
                <p className="mb-3">
                  Compared to estimate auditing services, the Actionable Profile acts as a mentor who guides you while you write your scope. Its live estimating guidance also serves as a learning tool that gives you the why and the what. If you read the guidance with each alert, you will understand the reasons and learn how to apply it in future estimates. 
                  <br /><br />
                  As the guidance is based on what is customary and reasonable in the industry, the Actionable Profile helps you grow your construction experience and knowledge. This is unique to the Actionable Profile because third-party estimate reviewers will only review your estimates.
                </p>
                <h5 className="mb-2"> Fast but not Furious </h5>
                <p className="mb-3">
                  The constant back and forth at the time of estimate approvals costs the industry billions of dollars annually. Having more delays or back-and-forth is the last thing that this industry needs. Another major advantage of the Actionable Profile is that it eliminates the need for any back-and-forth to review your estimates. 
                  <br /><br />
                  You do not need to submit your estimate anywhere. Simply work on it as you would normally do, and you will be notified about mistakes and missing warranted line items in real-time. No need to send it off, wait for it to come back, or follow up. You can do it on your own, right then and there.
                </p>
                <h5 className="mb-2"> 100+ free macros available </h5>
                <p className="mb-3">
                  The first step in getting your estimate reviewed is to write it. The Actionable Profile comes with over 100 free macros– pre-saved templates of line items for specific scenarios. Macros make your work easier and help you be more productive. 
                  <br /><br />
                  For instance, if you are writing an estimate for gluing down a wooden floor, you can simply load the macro, and it will list all the line items required. You can adjust the values and then make your estimates more accurate with the Actionable Profile’s live estimating guidance.
                </p>
                <h5 className="mb-2"> Properly Formatted Estimates </h5>
                <p className="mb-3">
                  Formatting matters a lot when it comes to getting your estimates approved and getting paid accurately. The easier your estimate is to understand for the adjuster, the less friction it will face before getting approved. Traditional Xactimate estimate review services typically only review your mistakes, they do not improve your formatting.
                  <br /><br />
                  The Actionable Xactimate Profile comes with a formatting header macro, which helps you arrange the line items in your estimate in a proper format. This makes it easier for the adjuster reviewing your estimate to understand the work done. The better they can understand it, the less friction it will face.
                </p>
                <h5 className="mb-2"> No strings attached </h5>
                <p className="mb-3">
                  We know that flexibility matters in our industry, so we offer the Actionable Profile without any contracts. You can cancel and resubscribe any time you want. This gives you the flexibility to manage your subscription based on your company's requirements. Furthermore, we understand the importance of testing the waters before fully committing. You can try the Actionable Xactimate Profile at 99% OFF the first month.
                </p>
                <h5 className="mb-2"> Regularly Updated </h5>
                <p className="mb-0">
                  All of the Actionable Alerts are regularly updated to reflect changes in the prices and the line items in Xactimate. We also add new alerts based on the updates in Xactimate. With the Actionable Profile, you can rest assured that you will always be provided with the most updated guidance.
                </p>
                <div className="try-it-now mt-4">
                  <Link to="/actionable-xactimate-profile" target="_blank">
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
                <h2 className="mt-5 mb-3">
                  In a nutshell
                </h2>
                <p className="mb-3">
                  The Actionable Profile is unique from its origin to how it operates. Each of its distinct features is built to ensure maximum help in writing increasingly accurate and complete scopes. The ultimate goal is to reduce the back and forth in the claims process which the Actionable Profile has proven to do by about 50%. If you want to ensure that there are no mistakes and no missed line items in your estimates, try the Actionable Profile.
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

export default ActionableProfileVsEstimateReviewers;