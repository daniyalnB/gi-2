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
import frame from "assets/Frame2.svg";

const BecomeExpertXactimateEstimator = () => {

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
        title="Become an expert Xactimate Estimator with Actionable Insights"
        description="Become an expert in Xactimate and learn to write increasingly accurate estimates with Actionable Insights' two-day Xactimate course. Check it out now!"
        link="become-expert-xactimate-estimator"
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
        <div className="BecomeExpertXactimateEstimator-header">
          <div className="sub-header">
            <div className="row">
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 m-auto">
                <h1>
                  <span>Xactimate Courses:</span> Learn from the
                  <br />
                  Experts and Level Up Your Skills
                </h1>
                <p> By Team Actionable | Sep 09, 2024 </p>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 image-sec">
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
                  Are you looking to become a master estimator? We have the perfect Xactimate training for you. As one of the most widely used tools for generating scopes of work, Xactimate boasts an overwhelmingly detailed database of over 20,000 line items. Mastering Xactimate can be a truly challenging endeavor, but with our training and resources, you can learn to use it efficiently and effectively. Proficient Xactimate skills will boost your productivity and help your organization process claims fairly and quickly.
                </p>
                <h2 className="mt-5 mb-3">
                  Conventional <span className="blue">Learning</span> and Its <span className="red">Downsides</span>
                </h2>
                <p>
                  Historically, individuals in the property restoration industry have been either self-taught or peer-taught, gaining knowledge through experience, bosses, and colleagues. This conventional approach can leave gaps, making mastering Xactimate particularly difficult due to its ever-evolving list of line items.
                  <br /><br />
                  Downsides of Conventional Learning Methods:  
                </p>
                <ol className="mt-3">
                  <li><span>Inconsistent Knowledge and Skills:</span> Self-taught and peer-taught methods can lead to varying levels of knowledge and skills, missing essential best practices or industry standards.</li>
                  <li><span>Outdated Practices:</span> Without formal training, you might rely on outdated practices that don’t align with current industry standards, building methodology, and technological advancements.</li>
                  <li><span>Reduced Efficiency:</span> Without proper training, you might not use Xactimate to its full potential, decreasing overall efficiency and productivity.</li>
                  <li><span>Missed Optimization Opportunities:</span> Learning through self-taught or peer-taught methods might cause you to miss advanced features and shortcuts in Xactimate, leading to missed opportunities for optimization</li>
                </ol>
                <h2 className="mt-5 mb-3">
                  <Link to="/events">
                    Actionable Insights Xactimate course
                  </Link>
                </h2>
                <p>
                  After traveling around the country training Xactimate, we have created a masterclass to bridge the gap between self-taught scoping and industry estimating best practices. Our Xactimate training offers an in-depth learning experience on maximizing Xactimate's potential for modern-day estimators and claims professionals.
                  <br /><br />
                  Our training is condensed into just two days - we understand that your time is valuable. This intensive course ensures you get the most out of Xactimate without taking significant time away from your busy schedule.
                </p>
                <h2 className="mt-5 mb-3">
                  What’s Included in Actionable Insights <span className="red">Xactimate Training</span>?
                </h2>
                <p className="mb-3"> Here’s what’s included in our Xactimate course: </p>
                <h5 className="mb-2"> Overview of Xactimate: </h5>
                <p className="mb-3"> Typically on the first day of the training, you get a comprehensive overview of Xactimate, its history, and its future, focusing on learning the price list and best practices for using the software efficiently and effectively. </p>
                <h5 className="mb-2"> Expert Understanding of Xactimate:</h5>
                <p className="mb-3"> The course dives deeper to help you gain expertise in component buildups, yield adjustments, and the newest Xactimate utilities like XactXpert to further enhance your Xactimate skills. </p>
                <h5 className="mb-2"> Estimating with the Actionable Profile: </h5>
                <p className="mb-3"> The{" "}
                  <Link to="/actionable-xactimate-profile">
                    Actionable Profile
                  </Link>
                  {" "}is a live estimating guidance tool that alerts you in real-time to include any missing warranted line items or correct any mistakes before finalizing your scope. Leveraging the Actionable Xactimate Profile will streamline your estimating process and increase scope accuracy.
                </p>
                <h5 className="mb-2"> Skill Development: </h5>
                <p> By the end of our Xactimate training, you will be proficient in Xactimate estimating best practices and how to leverage the Actionable Xactimate Profile to optimize your work in the field. </p>
                <div className="try-it-now mt-4">
                  <Link to="/events">
                    <button
                      className="btn"
                      style={{
                        fontSize: "16px",
                        width: "127px",
                        height: "40px",
                      }}
                    >
                      Learn more
                    </button>
                  </Link>
                </div>
                <h2 className="mt-5 mb-3">
                  Who can join our <span className="red">Xactimate</span> Training?
                </h2>
                <p>
                  This course is designed for anyone looking to master Xactimate. Whether you're a veteran estimator seeking to enhance your skills or a beginner starting from scratch, you'll find immense value in our training. Ideally, students should have some basic knowledge of Xactimate, but if you’re starting from scratch, we can proudly say there’s no better place to learn how to do things the right way!
                </p>
                <h2 className="mt-5 mb-3">
                  Why Should You <span className="blue">Sign up</span> for our Xactimate Course?
                </h2>
                <p>
                  Our Xactimate course embodies years of experience in creating estimating resources and tools to help you create the most accurate scopes.
                  <br /><br />
                  Primary reasons to choose our Xactimate course:
                </p>
                <ul className="mt-3">
                  <li className="black"><span>Learn from Industry Experts:</span> Gain knowledge from experienced professionals with years of experience in using Xactimate who understand the nuances of the restoration industry.</li>
                  <li className="black"><span>Comprehensive Coverage:</span> Our course covers all aspects of Xactimate, from basic navigation to advanced estimating techniques.</li>
                  <li className="black"><span>Stay Updated:</span> Stay tuned with the latest features and updates of Xactimate. New line items and utilities are added every month!</li>
                  <li className="black"><span>Structured Learning Path:</span> Follow a structured learning path that systematically builds your knowledge and skills, preventing gaps and ensuring a solid foundation.</li>
                  <li className="black"><span>Increased Accuracy and Efficiency:</span> Enhance your estimating accuracy and efficiency, reducing errors and saving time for better project outcomes and client satisfaction.</li>
                  <li className="black"><span>Build Confidence:</span> Gain confidence in your estimating abilities, knowing you have been trained by the best and are using the most reliable resources.</li>
                  <li className="black"><span>Career Growth:</span> Position yourself for career growth and advancement with proven expertise in Xactimate.</li>
                </ul>
                <p className="mt-5">
                  <strong>Don't miss this opportunity to enhance your Xactimate skills and become an expert in best practices and the{" "}
                    <Link to="/actionable-xactimate-profile">
                      Actionable Xactimate Profile
                    </Link>
                  .</strong>
                </p>
                <div className="try-it-now mt-5">
                  <Link to="/events">
                    <button
                      className="btn"
                      style={{
                        fontSize: "16px",
                        width: "133px",
                        height: "40px",
                      }}
                    >
                      Sign up now
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

export default withRouter(BecomeExpertXactimateEstimator);