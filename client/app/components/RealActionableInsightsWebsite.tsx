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
import frame from "assets/Frame7.svg";
import frame_sub from "assets/Frame_Sub1.svg";

const RealActionableInsightsWebsite = () => {

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
        title="Getinsights.com or Getinsights.org | Actionable Insights"
        description="We are addressing the confusion regarding the Actionable Insights official website. It is getinsights.org and not getinsights.com. Read more."
        link="real-actionable-insights-website"
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
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 m-auto">
                <h1 className="official-website">
                  Getinsights.com or Getinsights.org;
                  <br />
                  Which One is the Real Actionable
                  <br />
                  Insights Website?
                </h1>
                <p> By Team Actionable | Nov 13, 2024 </p>
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
                  <Link to="/" target="_blank">Actionable Insights</Link>{" "}
                  is a 501(c)(6) educational non-profit. We offer tools and resources designed to make restoration professionals fall in love with their jobs again. However, we’ve noticed some confusion among our Insighters caused by the domain getinsights.com, which is not associated with us in any way. To set the record straight,{" "}
                  <Link to="/" target="_blank">getinsights.org</Link>{" "}
                  is the official and only website for Actionable Insights.
                  <br /><br />
                  This page is here to help you navigate this common mix-up, so you can avoid visiting the wrong site and ensure you’re accessing the trusted resources and training you need. Let’s clarify everything you need to know about our domain and how to find us without any hassle.
                </p>
                <h2 className="mt-5 mb-3">
                  Why Getinsights.com Doesn’t Lead to <span className="red">Actionable Insights?</span> 
                </h2>
                <p>
                  It’s easy to understand why people confuse getinsights.com with getinsights.org. The domain names are nearly identical, but the two are not connected. While getinsights.org is the official website for Actionable Insights, offering trusted resources for the restoration and insurance industry, getinsights.com has no affiliation with our platform.
                  <br /><br />
                  This confusion often stems from quick searches or typos. Many Insighters looking for Actionable Insights mistakenly end up at getinsights.com, assuming it leads to the same trusted tools and training programs. However, visiting the wrong site can lead to frustration and missed opportunities to access the high-quality resources we provide.
                  <br /><br />
                  By clarifying this distinction, we aim to ensure Insighters reach the right destination: getinsights.org, the home of Actionable Insights.
                </p>
                <h2 className="mt-5 mb-3">
                  <span className="red">Getinsights.com</span> Isn’t What You’re Looking For
                </h2>
                <p className="mb-4">
                  It’s important to clear up any confusion: <span className="red"><b>getinsights.com is not associated with Actionable Insights</b></span>. While the similarity between the domain names may lead you to believe they’re connected, they are not. 
                  <br /><br />
                  In fact, getinsights.com is not an active or functioning website (as of now), and it does not host any content, tools, or services related to Actionable Insights.
                </p>
                <div>
                  <img src={frame_sub} />
                </div>
                <p className="mt-4">
                  <span className="red"><b>Actionable Insights has no affiliation with the domain getinsights.com</b></span>. Each of our tools and resources that you have been hearing so much about is housed exclusively on our official website: getinsights.org.
                  <br /><br />
                  Avoiding the wrong domain saves you time, minimizes frustration, and ensures you have the best experience checking out our tools and training materials.
                </p>
                <h2 className="mt-5 mb-3">
                  The Official Actionable Insights Website Is <span className="red">Getinsights.org</span>
                </h2>
                <h5 className="mb-2"> Official Website </h5>
                <p className="mb-2"> When it comes to restoration and insurance resources, getinsights.org is the only place to go. This is the official home of Actionable Insights, where all our authentic content, training programs, and tools are available to Insighters. Whether you’re looking for Xactimate training, Matterport certification, or valuable resources for frictionless estimate approvals and claims management, you’ll find it exclusively on getinsights.org. </p>
                <p className="mb-3"> Visiting the wrong site not only causes confusion but can also prevent you from accessing the resources you need to excel in your career. By bookmarking getinsights.org, you can ensure that you always land on the right platform. </p>
                <h5 className="mb-2"> Trust and Security </h5>
                <p className="mb-2"> While getinsights.com currently leads to no website, one of the biggest risks of navigating to the wrong domain is the possibility of encountering irrelevant or inaccurate information (in the future).</p>
                <p className="mb-3"> On the other hand, getinsights.org is a secure and reliable platform. When you visit our official website, you can trust that you’re accessing legitimate resources directly from Actionable Insights. Your data is safe, and the tools you rely on are always up-to-date and accurate. </p>
                <h5 className="mb-2"> Access to Quality Content </h5>
                <p className="mb-2"> By visiting getinsights.org you gain access to quality content created by industry veterans. Here’s what you can expect to find on the official Actionable Insights website: </p>
                <ul className="mb-0">
                  <li className="black mb-2"><span>The Actionable Profile:</span> You can access the <Link to="/actionable-xactimate-profile" target="_blank">Actionable Xactimate Profile</Link> which offers live estimating guidance to help you write accurate estimates.</li>
                  <li className="black mb-2"><span>Xactimate BootCamps:</span> Learn the industry-standard software from Xactimate Certified Trainers in our <Link to="/events" target="_blank">Actionable Profile and Xact Best Practices Bootcamp</Link>.</li>
                  <li className="black mb-2"><span>Restoration and Insurance Resources:</span> Stay updated with Xactimate <Link to="/resources/price-list-update-summary" target="_blank">Price List Update Summary</Link>, well-maintained databases of <Link to="/macros" target="_blank">macros</Link> and <Link to="/online-sketch-gallery" target="_blank">sketches</Link>, and <Link to="/video-gallery" target="_blank">expert tips</Link> in the form of micro-content.</li>
                  <li className="black mb-2"><span>Certification Programs:</span> Enhance your skills and credentials with our trusted <Link to="aimc" target="_blank">Matterport certification</Link> course.</li>
                  <li className="black mb-2"><span>Community Support:</span> Actionable Insights is made by the restoration industry professionals for the restoration industry professionals. Here, we will be your voice and advocate for the <Link to="/advance-the-cause/line-item-request" target="_blank">adoption of new line items</Link> and features in <Link to="/advance-the-cause/xactimate-feature-request" target="_blank">Xactimate</Link> and <Link to="/advance-the-cause/matterport-feature-request" target="_blank">Matterport</Link>.</li>
                </ul>
                <h2 className="mt-5 mb-3">
                  How to Avoid Visiting <span className="red">Getinsights.com</span> by Mistake
                </h2>
                <p className="mb-3">
                  The best way to steer clear of unnecessary confusion is to take proactive steps to ensure you always land on the correct website. Here are some practical tips to help you avoid accidentally visiting getinsights.com:
                </p>
                <h5 className="mb-2"> Bookmark Getinsights.org </h5>
                <p className="mb-3"> Save getinsights.org as a bookmark in your web browser. This will allow you to quickly access the official website without typing the URL each time, reducing the chance of errors. </p>
                <h5 className="mb-2"> Double-check the Domain Name </h5>
                <p className="mb-3"> Before clicking any links or typing a URL into your browser, take a moment to verify that the domain reads getinsights.org instead of getinsights.com. A quick glance can prevent you from visiting the wrong site. </p>
                <h5 className="mb-2"> Search Smartly </h5>
                <p> When searching for Actionable Insights, use specific terms like “Actionable Insights official website” or “Actionable Insights training programs” rather than generic keywords like “get insights.” This ensures that your search results direct you to the official site, not unrelated domains. </p>
                <h2 className="mt-5 mb-3">
                  How <span className="red">Actionable Insights</span> Is Addressing the Issue
                </h2>
                <p className="mb-3">
                  At Actionable Insights, we understand how frustrating it can be to end up on the wrong website. To address the confusion surrounding getinsights.com, we are taking proactive steps to ensure Insighters can easily find their way to our official website, getinsights.org.
                </p>
                <h5 className="mb-2"> Educating Insighters About Our Official Domain </h5>
                <p className="mb-3"> We’ve prioritized making our official domain, getinsights.org, clearly identifiable in all our communications. Whether it’s through social media, email campaigns, or anything else, we consistently emphasize that getinsights.org is the only legitimate source for Actionable Insights resources. </p>
                <h5 className="mb-2"> Leveraging SEO Strategies for Better Visibility </h5>
                <p className="mb-3"> One of our key strategies involves optimizing search engine rankings to ensure getinsights.org appears prominently when Insighters search for terms like "getinsights.com" or "Actionable Insights official website." This very landing page is part of that effort, crafted to rank high in search results and redirect Insighters to the correct domain. By focusing on targeted keywords and delivering valuable content, we’re ensuring that anyone searching for us won’t be misled. </p>
                <h5 className="mb-2"> Reassuring Our Commitment to Insighters </h5>
                <p className="mb-2"> We are committed to minimizing confusion and providing a seamless Insighters experience. Beyond SEO and education, we’re continually refining our approach to ensure our online presence aligns with our values of transparency and trust. Every step we take is aimed at making it easier for you to access the tools, training, and resources that empower your professional journey. </p>
                <p> To get the most reliable resources and tools for your restoration and insurance needs, always visit getinsights.org and not getinsights.com. We are committed to providing you with the best training and support, so stay connected and bookmark the official site now. </p>
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

export default withRouter(RealActionableInsightsWebsite);