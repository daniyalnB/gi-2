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
import frame from "assets/Frame4.svg";
import frame_sub from "assets/Frame_Sub.svg";

const RemoteXactimateEstimator = () => {

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
        title="Actionable's Guide for Remote Xactimate Estimators"
        description="Learn the basics of being a successful remote Xactimate estimator, the benefits, the skills required, & how to overcome related challenges. Read more."
        link="remote-xactimate-estimator"
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
                <h1>
                  Remote <span>Xactimate</span> Estimating:
                  <br />
                  Work from Home and Thrive
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
                  As the world reaches the digital era's climax, remote Xactimate estimators' role has seen significant growth in the restoration ecosystem. These professionals are at the forefront of the industry, playing a pivotal role in estimating property damage, often from the comfort of their homes. In this article, we’ll explore the fundamentals of being a successful work-from-home Xactimate estimator, the benefits the skills needed, and how to overcome challenges in a remote environment.
                </p>
                <h2 className="mt-5 mb-3">
                  What is <span className="red">Xactimate</span>?
                </h2>
                <p className="mb-3">
                  Xactimate is a widely used software for property damage estimating in the property insurance industry. It allows professionals to create detailed estimates for repair and restoration work by integrating measurements, photos, and invoicing into one comprehensive scoping tool.
                </p>
                <h5 className="mb-2"> The Critical Role of an Estimator </h5>
                <p> Estimators play a crucial role in the restoration process. They provide the financial and logistical framework needed to restore damaged properties by ensuring repair scope accuracy. A well-prepared estimate will smooth out the entire claims process for policyholders, contractors, and insurance carriers alike. As a remote Xactimate estimator, your role is even more critical, as you must rely on the data provided by field technicians and apply your expertise to deliver accurate estimates without physically being on-site.</p>
                <h2 className="mt-5 mb-3">
                  Benefits of Being a Remote <span className="red">Xactimate</span> Estimator
                </h2>
                <h5 className="mb-2"> Flexibility </h5>
                <p className="mb-3"> One of the most appealing aspects of being a remote Xactimate estimator is the flexibility it offers. Working from home allows you to manage your time, balance your personal life, and still meet the demands of the job. Gone are the days of sitting in traffic or traveling to multiple job sites. Instead, you can complete estimates from the comfort of your home office with a schedule that fits your lifestyle. </p>
                <h5 className="mb-2"> Cost Efficiency </h5>
                <p className="mb-3"> Working remotely eliminates commuting costs and significantly reduces overhead. There's no need to spend on fuel, public transport, or even office attire. This cost-efficiency benefits both the employee and the employer, making remote work an appealing option for both parties. </p>
                <h5 className="mb-2"> Nationwide Opportunities </h5>
                <p className="mb-3"> When you work from home, you’re not limited by geography. As a remote Xactimate estimator, you can work for companies across the country, expanding your client base and exposing yourself to various types of restoration work. Whether you’re located in a rural area or a major city, the opportunity to contribute to projects nationwide is a significant advantage. </p>
                <h5 className="mb-2"> Scalability </h5>
                <p> Remote work allows you to scale your business or freelance practice efficiently. You can take on more projects by optimizing your work processes, and you are no longer constrained by the number of jobs you can physically visit in a day. This scalability can lead to increased income and opportunities for growth in your career. </p>
                <h2 className="mt-5 mb-3">
                  Skills Needed to <span className="blue">Succeed</span> as a Remote Xactimate Estimator
                </h2>
                <h5 className="mb-2"> Mastery of Xactimate </h5>
                <p className="mb-3"> To thrive as a successful Xactimate estimator, <Link to="/master-xactimate-important-tips" target="_blank">mastery of the software is essential</Link>. Joining relevant <Link to="/become-expert-xactimate-estimator" target="_blank">Xactimate training courses</Link> is highly recommended, as it demonstrates your proficiency to potential clients or employers. As you gain experience, consider advancing your skills by learning to use the software’s more complex features and utilities. Continuous learning and practice will ensure you stay competitive in the field. </p>
                <h5 className="mb-2"> Strong Communication Skills </h5>
                <p className="mb-3"> In a remote role, clear and effective communication becomes even more important. You’ll need to collaborate with field technicians, project managers, and insurance adjusters without the benefits of face-to-face interactions. Being proactive in seeking clarification, ensuring instructions are understood, and maintaining regular communication are key components to delivering accurate estimates remotely. </p>
                <h5 className="mb-2"> Attention to Detail </h5>
                <p className="mb-3"> Since you won’t be on-site to verify measurements or assess the damage, attention to detail is crucial. You’ll need to rely heavily on the data and images provided to you. Double-checking information and asking for clarification when something seems off can save you from making costly errors. </p>
                <h5 className="mb-2"> Time Management </h5>
                <p> Working remotely comes with the added responsibility of managing your time effectively. With multiple projects, deadlines, and potential distractions, it’s easy to fall behind. Create a schedule that prioritizes tasks based on urgency and complexity. Time-blocking techniques and productivity tools can help ensure you stay on track and meet deadlines consistently. </p>
                <h2 className="mt-5 mb-3">
                  Overcoming <span className="red">Challenges</span> of Remote Estimating
                </h2>
                <h5 className="mb-2"> Lack of On-Site Presence </h5>
                <p className="mb-3"> One of the primary challenges of working remotely as an estimator is the inability to physically inspect the site. You’ll need to rely heavily on field staff for data collection, photos, and accurate measurements. Establishing a system for receiving high-quality, detailed information from those on-site is critical for producing accurate estimates. You can also consider using virtual walkthroughs, drone footage, or geospatial scans via Matterport to get a more accurate view of the damage. </p>
                <h5 className="mb-2"> Communication Gaps </h5>
                <p> Working remotely means you won’t have the benefit of face-to-face conversations, making communication gaps a real concern. To bridge this gap, make full use of technology. Video calls, emails, and instant messaging can ensure that you're on the same page with your team and clients. Regular check-ins and status updates can also minimize misunderstandings. </p>
                <h2 className="mt-5 mb-3">
                  Your Copilot for <span className="blue">Accurate</span> And Thorough Estimates
                </h2>
                <p className="mb-3">
                  Since you’re not on-site and may be working with second-hand data, you may want a co-pilot to help with the heavy lifting. The Actionable Profile and its live estimating guidance is the perfect tool to help fill in the gaps for potential overages and omissions while generating scopes.
                </p>
                <h5 className="mb-2"> What is the Actionable Profile? </h5>
                <p className="mb-3"> The Actionable Profile is a profile within Xactimate that provides live estimating guidance as you   work on your scopes. Alerts will pop up as you work, pointing out potential mistakes and line items that have yet to be added but may be warranted. Built upon the experience of veteran estimators and adjusters across the industry, the Actionable Profile provides real-time feedback based on building methodology, safety best practices, and how the line items in Xactimate complement each other. Check out this quick video below. </p>
                <div className="youtube_video_main">
                  <div className="video">
                    <div className="fluid-width-video-wrapper">
                      <iframe
                        src="https://www.youtube.com/embed/uumgrymTO8U?si=OslvLFIrJc7WMiug"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        name="actionable-xactimate-profile"
                      />
                    </div>
                  </div>
                </div>
                <h5 className="mt-3 mb-2"> What is Live Estimating Guidance? </h5>
                <p className="mb-3"> Live estimating guidance means that the Actionable Profile offers you real-time alerts about potential mistakes in the scope. For a work-from-home Xactimate estimator, this ensures that despite challenges like lack of on-site presence, you can still provide accurate and thorough estimates. </p>
                <div className="frame_sub">
                  <img src={frame_sub} />
                </div>
                <h2 className="mt-5 mb-3">
                  The <span className="blue">Actionable Profile</span> Advantage for Remote Xactimate Estimators?
                </h2>
                <p className="mb-3">
                  One of the biggest challenges for remote Xactimate estimators is the lack of direct access to job sites. Working remotely means relying on second-hand data like Matterport scans, photos, or reports from field staff. These data sources can sometimes miss crucial details, leading to inaccuracies in estimates. This is where the Actionable Profile's live estimating guidance becomes invaluable.
                </p>
                <h5 className="mb-2"> Overcoming the Lack of On-Site Presence </h5>
                <p className="mb-3"> The absence of direct access to a job site can leave remote estimators vulnerable to missing critical details that would typically be evident in person. The live estimating guidance of the Actionable Profile helps bridge the gap by automatically alerting you to <Link to="/master-xactimate-improve-estimating-skills" target="_blank">avoid common mistakes or overlooked line items in real time</Link>. For instance, if certain items or damages are typically associated with specific room types or job scopes, the guidance will prompt you to consider them, even if they weren’t explicitly noted in the field report or scan. This helps ensure that all relevant repairs and materials are accounted for in the estimate. </p>
                <h5 className="mb-2"> Maximizing Accuracy with Second-Hand Data </h5>
                <p className="mb-3"> Matterport scans and field reports are valuable, but they can sometimes lack the full picture needed for accurate estimates. The Actionable Profile assists in interpreting this second-hand data by offering contextual guidance based on the type of damage and location. For example, if you're working with a scan that doesn’t clearly show the extent of water damage behind walls, the live guidance might recommend including moisture mitigation protocols commonly required for such situations. This ensures that even when data is incomplete or vague, your estimates remain thorough and account for potential hidden costs. </p>
                <h5 className="mb-2"> Preventing Common Estimating Errors </h5>
                <p className="mb-3"> When working remotely, it’s easy to overlook smaller details or make assumptions based on incomplete information. The live guidance of the Actionable Xactimate Profile helps prevent errors by cross-referencing the information you input with standard estimating protocols. If something doesn’t align with industry standards or local rules, the system alerts you, allowing real-time corrections. This is especially useful when you’re working from field reports or scans that don’t provide a full narrative of the site conditions. </p>
                <h5 className="mb-2"> Writing Accurate Estimates Despite Incomplete Data </h5>
                <p> The Actionable Profile's live guidance compensates for gaps in data by suggesting standard line items that may be missing from the estimate. For example, suppose you’ve included drywall repair but forgotten to add associated costs like painting. In that case, the system will prompt you to add them, ensuring that your estimate covers all necessary repairs. This proactive assistance minimizes the risk of incomplete estimates, which can delay claim approvals or lead to costly revisions. </p>
                <div className="try-it-now mt-5">
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    <button
                      className="btn"
                      style={{
                        fontSize: "20px",
                        maxWidth: "428px",
                        minHeight: "50px",
                      }}
                    >
                      Try the Actionable Xactimate Profile now
                    </button>
                  </Link>
                </div>
                <p className="mt-5">
                  The role of a remote Xactimate estimator offers an exciting opportunity to professionals looking for flexibility, scalability, and cost-efficiency. Before you go, don’t forget to check out the <Link to="/actionable-xactimate-profile" target="_blank">Actionable Profile</Link> and enjoy 99% off the first month! Thank you, and good luck settling those claims out there.
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

export default withRouter(RemoteXactimateEstimator);