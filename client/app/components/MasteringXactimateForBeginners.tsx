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
import frame from "assets/Frame3.svg";

const MasteringXactimateForBeginners = () => {

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
        title="Top 5 Essential Tips for Mastering Xactimate as a Beginner"
        description="These 5 tips from our Xactimate beginner's guide will teach you to start estimating like a pro. Learn to write accurate estimates and get paid fairly."
        link="mastering-xactimate-for-beginners"
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
                  Mastering Xactimate
                  <br />
                  for Beginners
                </h1>
                <p> By Team Actionable | Oct 16, 2024 </p>
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
                  Learning the basics and best practices of Xactimate is crucial for new estimators. It’s one of the most used and widely accepted estimating tools in the property insurance industry and the go-to standard for most carriers and Third-Party Administrators (TPAs).
                  <br /><br />
                  Accurate Xactimate estimates are essential to ensure your company is paid fairly for the work completed. If you're a new adjuster or estimator, honing your Xactimate skills is key to thriving in the industry. While it may seem daunting, this beginner Xactimate guide will help you improve your skills and write more accurate estimates.
                </p>
                <h2 className="mt-5 mb-3">
                  Our Top 5 <span className="red">Xactimate</span> Beginner Tips
                </h2>
                <p className="mb-3"> Here are the top 5 beginner tips our Xactimate Certified Trainers consider essential to mastering Xactimate. </p>
                <h4 className="mb-3"> Tip #1 - Keep Xactimate updated </h4>
                <p className="mb-3">
                  The first tip for mastering Xactimate for beginners is to always make sure you're using the latest version. Actionable Insights works closely with Verisk’s pricing department to push for the creation of new line items, and Verisk frequently adds new features to Xactimate.
                  <br /><br />
                  If you’re not using the most up-to-date version, you may miss out on these features or experience bugs and errors. So, how can you ensure your version of Xactimate is fully updated with the latest line items? Simple—just update it regularly.
                  <br /><br />
                  Not sure how? No worries! Derek Stone, our Associate Director of Membership Resources, has put together a quick one-minute walkthrough to guide you through the update process.
                </p>
                <h4 className="mb-3"> Tip #2 - Substantiate line items with detailed F9 notes </h4>
                <p className="mb-4">
                  A common mistake novice estimators make is assuming that adjusters understand every process and line item used. This is far from the truth. In reality, you must make everything as clear for the adjuster as possible, and{" "}
                  <a href="https://www.youtube.com/watch?v=ZZiiHj9yJcQ" target="_blank">
                    F9 notes are the best way to do this
                  </a>.
                  <br /><br />
                  It is one of the most basic tips for mastering Xactimate for beginners. By adding an F9 note, you proactively answer potential questions from the adjuster. This makes communication clearer and the approval process much smoother. 
                  <br /><br />
                  Wherever possible, justify the use of line items by adding F9 notes. These notes help the adjuster understand why specific tasks were done and why certain line items were necessary.
                  <br /><br />
                  For example, if you used one line item for drywall protection and another for painting protection, the adjuster might assume they’re the same. In cases like these, F9 notes can clarify the difference and prevent confusion, especially when similar or duplicate items are involved.
                </p>
                <div className="about-actionable-profile" style={{ maxWidth: "600px", margin: "0 auto" }}>
                  <div className="youtube_video_main">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/uXJ6igwoiRs"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="mt-4 mb-3"> Tip #3 Take advantage of live estimating guidance </h4>
                <p className="mb-4">
                  This important Xactimate beginner tip can turn a novice estimator into an expert without taking the hard, conventional path. 
                  <br /><br />
                  Live estimating guidance is the smart way of estimating accurately. But what does it mean? Well, as the name suggests, it is guidance in the form of real-time alerts that can help you identify the issue in your scope.
                  <br /><br />
                  Actionable Insights’ Xactimate Certified Trainers published a 3,000+ page book, the Umpire’s Estimating Manual. The purpose was to establish a standard of invoicing based on customary building practices and reasonable line items. The ultimate goal was to help reduce the friction in the approval process.
                  <br /><br />
                  Now, we’ve turned that into the{" "}
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    Actionable Xactimate Profile
                  </Link>—a profile within Xactimate with over 3,500 alerts. These alerts guide you while writing your scope, helping you choose the correct line items from the 20,000 available and never miss any. With the Actionable Profile, you never have to worry about mistakes or missing line items in your estimates.
                </p>
                <h5 className="mb-2"> How does it work? </h5>
                <p className="mb-3"> The live estimating guidance works in two ways: omissions and overages. </p>
                <h5 className="mb-2"> Overages </h5>
                <p className="mb-3">
                  Overages occur when you use duplicative line items or more than the required quantities of certain line items.
                  <br /><br />
                  For example, if you’ve included a line item for drywall that already has texture and then add a separate line item for texture, an alert will notify you of the potential duplication. You can then either remove the redundant line item or add F9 notes to provide clarification
                </p>
                <h5 className="mb-2"> Omissions </h5>
                <p className="mb-3">
                  Omissions occur when warranted line items are missing or when you fail to charge for something based on your scope.
                  <br /><br />
                  For instance, if you're working on drywall in a room that's 20 feet high but you are charging for a standard height in your estimate, an omission alert will remind you to include the appropriate line item for the additional effort.
                </p>
                <h5 className="mb-2"> How does it help beginners learn? </h5>
                <p className="mb-3">
                  The Actionable Profile{" "}
                  <a href="https://www.youtube.com/watch?v=XAF9vyyTSH0" target="_blank">
                    combines the experience of veteran estimators and adjusters
                  </a>. The guidance it provides is shaped by their extensive experience and countless hours spent determining the right process and line items. By following this guidance, you’ll be learning from some of the top professionals in the industry.
                </p>
                <h4 className="mb-3"> Tip #4 Learn from other estimators </h4>
                <p className="mb-3">
                  Another essential tip for mastering Xactimate as a beginner is learning from peers. Traditionally, learning in the industry has been peer-taught. While it has certain drawbacks, its benefits cannot be denied. By connecting with senior professionals, you can gain valuable insights from their experience instead of learning from mistakes.
                  <br /><br />
                  While the{" "}
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    Actionable Profile
                  </Link> is your go-to guide for estimating in{" "}
                  <a href="https://www.verisk.com/products/xactimate/" target="_blank" className="red">
                    Xactimate
                  </a>, peers can offer practical advice on navigating the software, finding line items, and learning shortcuts. Whether you're just getting started or facing a tricky material you can't easily identify, peers can be a valuable resource.
                </p>
                <h5 className="mb-2"> Where to find a community of peers? </h5>
                <p className="mb-0"> Finding the right community is difficult but equally important. In fact, Actionable Insights started as a community of fellow adjusters and estimators trying to reduce friction in the approval process. Now, you can join our growing community of over 23,000 professionals to learn from industry professionals, ask questions, and much more. </p>
                <div className="try-it-now mt-4 mb-4">
                  <a href="https://www.facebook.com/groups/XactimateNinjas/" target="_blank">
                    <button
                      className="btn"
                      style={{
                        fontSize: "20px",
                        maxWidth: "444px",
                        minHeight: "50px",
                      }}
                    >
                      Join the Xactimate Ninjas Facebook group
                    </button>
                  </a>
                </div>
                <p className="mb-3">
                  Also, remember that we advocate for the adoption of new line items? We do this based on the feedback from our community. So down the road, if you feel there is a missing line item in Xactimate,{" "}
                  <Link to="/advance-the-cause/line-item-request" target="_blank">
                    let us know
                  </Link>, and we will be your voice.
                </p>
                <h4 className="mb-3">
                  Tip #5{" "}
                  <Link to="/macros" target="_blank">
                    Use Macros
                  </Link>
                </h4>
                <p className="mb-3">
                  Last but not least, let’s talk about{" "}
                  <Link to="/macros" target="_blank">
                    macros
                  </Link>, an incredibly useful tool for simplifying complex estimates and boosting productivity by cutting down on repetitive Xactimate tasks. But what exactly are macros? A macro is an MCX file that bundles multiple Xactimate line items (along with their explanatory F9 notes) into one template.
                </p>
                <h5 className="mb-2"> How do macros work? </h5>
                <p className="mb-3">
                  Let’s understand it with an example. Say you are writing an invoice for a water mitigation project in a kitchen. Simply run a relevant macro, and it will populate all the line items into your estimate. Alternatively, if you frequently work on similar projects, you can even save your own macros to reuse in future scopes, saving you time and effort. 
                  <br /><br />
                  Did you know the Actionable Profile comes with 100+ ready-to-use macros? After using a macro, you can customize the line items to fit your current estimate. For any errors that may appear, you can easily address them with the help of the Actionable Profile’s live estimating guidance.
                  <br /><br />
                  This Xactimate beginner guide will help you in mastering Xactimate. So make sure you follow these Xactimate beginner tips that we’ve compiled for you. 
                  <br /><br />
                  Oh, and before you go, how does 99% off on the Actionable Profile sound? Pretty amazing, right? Check it out and get it at 99% off now and start estimating like a pro in no time.
                </p>
                <div className="try-it-now mt-5">
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    <button
                      className="btn"
                      style={{
                        fontSize: "20px",
                        maxWidth: "140px",
                        minHeight: "50px",
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

export default withRouter(MasteringXactimateForBeginners);