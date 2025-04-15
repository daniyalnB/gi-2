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
import blog_image33 from "assets/blog_image33.png";

const HolidaySeasonYourBestChanceToGetMatterportCertification = () => {

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
        title="Holiday season's your best chance to get Matterport Certification"
        description="Why the holiday season is ideal to get your Actionable Insights Matterport Certification & start the New Year with a competitive edge? Read more."
        link="blog/holiday-season-your-best-chance-to-get-matterport-certification"
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
        <HideOn showOnPageInit height={isScreenHeight ? 7200 : 6900}>
        <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#what-is-the-actionable-insights-matterport-certification">
              —
              <span>
                What is the Actionable
                <br />
                Insights Matterport
                <br />
                Certification?
              </span>
            </a>
            <a href="#matterport-training-overview">
              — 
              <span>
                Matterport Training
                <br />
                Overview
              </span>
            </a>
            <a href="#why-the-holidays-are-the-ideal-time-to-get-certified">
              — 
              <span>
                Why the Holidays Are the
                <br />
                Ideal Time to Get Certified
              </span>
            </a>
            <a href="#how-to-register-for-aimc">
              — 
              <span>
                How to Register for
                <br />
                AIMC?
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
                    Why are the holidays a good time to get
                    <br />
                    the Actionable Insights <span className="red">Matterport</span>
                    <br />
                    Certification?
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Dec 18, 2024 </span>
                  <br />
                  <img
                    src={blog_image33}
                    className="mt-3 mb-4"
                  />
                  <p className="mb-4">
                    The holiday season is often a time to relax and reflect, but it’s also a prime opportunity for self-improvement and career advancement. Obtaining the <Link to="/aimc" target="_blank">Actionable Insights Matterport Certification</Link> during this quieter period can provide a major boost for restoration and insurance professionals. 
                    <br />
                    This certification, which focuses on leveraging <a href="https://matterport.com/" target="_blank">Matterport’s</a> cutting-edge 3D scanning technology, equips professionals with skills to streamline claims, enhance business operations, and improve client relations. In this article, we’ll explore why the holiday season is an ideal time to earn this valuable credential, setting you up for success in the New Year.
                  </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/F0hVq4wSlBU"
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
                    id="what-is-the-actionable-insights-matterport-certification"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> What is the Actionable Insights Matterport Certification? </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    The <Link to="/aimc" target="_blank">Actionable Insights Matterport Certification</Link> (AIMC) is a self-paced, online video course designed to teach professionals in the property insurance industry how to maximize the potential of Matterport’s innovative technology. Matterport is renowned for its ability to create high-quality 3D scans of spaces, making it a vital tool for contractors and claims specialists. 
                    <br /><br />
                    The Matterport training covers a broad range of skills, from using Matterport tools to streamline claims settlement to enhancing sales, operations, and risk management. Accessible on any computer, tablet, or smartphone, the course features hands-on best practices, claims documentation tools, and automated sketching processes.
                  </p>
                  <div
                    className="mb-5"
                    id="matterport-training-overview"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Matterport Training Overview </h5>
                  <p className="mb-4"> The Actionable Insights Matterport Certification (AIMC) course offers a comprehensive and hands-on approach to mastering Matterport’s technology for the property insurance sector. Here’s a breakdown of the modules covered throughout the training: </p>
                  <p className="mb-3">
                    <strong>Module 1:</strong> Introduces the AIMC guides and trainers and gives a general overview of the course.
                  </p>
                  <p className="mb-3">
                    <strong>Module 2:</strong> Covers essential best practices for setting up the Matterport camera, tripod, and attaching necessary lighting for optimal scans. Each module includes a quiz to assess comprehension and requires a perfect score to proceed.
                  </p>
                  <p className="mb-3">
                    <strong>Module 3:</strong> Details how to organize your Matterport kit for fieldwork, including recommended accessories and carrying cases that boost efficiency.
                  </p>
                  <p className="mb-3">
                    <strong>Module 4:</strong> Introduces Matterport’s suite of apps and explains the best use cases for each.
                  </p>
                  <p className="mb-3">
                    <strong>Module 5:</strong> Focuses on the Showcase app, detailing scan timing, the different types of scans used for property insurance, and ways to leverage the app to enhance client engagement.
                  </p>
                  <p className="mb-3">
                    <strong>Module 6:</strong> Walks users through connecting the Matterport camera to the Capture app, preparing them for scanning operations.
                  </p>
                  <p className="mb-3">
                    <strong>Module 7:</strong> Prepares participants to conduct their first scans by explaining the scanning process and job-site preparation best practices.
                  </p>
                  <p className="mb-3">
                    <strong>Module 8 (Moving and Grooving):</strong> Provides hands-on training for capturing scans in challenging restoration environments, with a focus on what contractors and carriers need for remote claims processing.
                  </p>
                  <p className="mb-3">
                    <strong>Module 9:</strong> Offers scan troubleshooting tips, including converting 360 captures into 3D scans and fixing waypoints.
                  </p>
                  <p className="mb-3">
                    <strong>Module 10:</strong> Covers marking features like mirrors and windows within the Capture app and uploading completed scans.
                  </p>
                  <p className="mb-3">
                    <strong>Module 11:</strong> Explores additional hardware compatible with Matterport, such as the Ricoh Theta Z1 and Insta360 One X, and explains when to use different devices.
                  </p>
                  <p className="mb-3">
                    <strong>Module 12:</strong> Focuses on capturing scans with mobile devices, emphasizing feature parity between iOS and Android.
                  </p>
                  <p className="mb-3">
                    <strong>Modules 13-15:</strong> Explain how to navigate and set up a Matterport account, manage spaces, users, and collaborators, and adjust profile settings for efficient use.
                  </p>
                  <p className="mb-3">
                    <strong>Module 16:</strong> Provides an overview of uploaded scans, including tutorials on navigating the dollhouse and floor plan views.
                  </p>
                  <p className="mb-3">
                    <strong>Module 17:</strong> Discusses how to set scan starting points for optimal presentation and clarity.
                  </p>
                  <p className="mb-3">
                    <strong>Module 18:</strong> Explains how to edit 3D scans, remove sensitive data, and hide waypoints.
                  </p>
                  <p className="mb-3">
                    <strong>Module 19:</strong> Teaches users how to use 360 views within scans, including placement and adjustments.
                  </p>
                  <p className="mb-3">
                    <strong>Module 20:</strong> Demonstrates how to use the photo and video tools within scans to enhance claim documentation.
                  </p>
                  <p className="mb-3">
                    <strong>Module 21:</strong> Guides users on taking accurate measurements within scans and sharing them publicly.
                  </p>
                  <p className="mb-3">
                    <strong>Module 22:</strong> Explores deep links for justifying scopes and making scan sharing easier.
                  </p>
                  <p className="mb-3">
                    <strong>Module 23:</strong> Covers MatterTags, which document information directly within scans, including mobile editing features.
                  </p>
                  <p className="mb-3">
                    <strong>Module 24:</strong> Introduces the Notes feature, enabling collaborative work and real-time communication within a Matterport space.
                  </p>
                  <p className="mb-3">
                    <strong>Module 25:</strong> Provides an overview of the Highlight Reel for guiding stakeholders through scans.
                  </p>
                  <p className="mb-3">
                    <strong>Module 26:</strong> Reviews the Blurbrush tool, used to redact sensitive information and ensure compliance with regulations.
                  </p>
                  <p className="mb-3">
                    <strong>Module 27:</strong> Demonstrates how to use the Trim tool to clean up scans and remove sensitive data.
                  </p>
                  <p className="mb-3">
                    <strong>Module 28:</strong>  Covers adding labels to scans for identifying different rooms and areas.
                  </p>
                  <p className="mb-3">
                    <strong>Module 29:</strong> Explains how to share, transfer, and archive scans, which is crucial for using Matterport to settle claims quickly.
                  </p>
                  <p className="mb-3">
                    <strong>Module 30:</strong> Focuses on Schematic Floor Plans and their integration with Xactimate.
                  </p>
                  <p className="mb-3">
                    <strong>Module 31:</strong> Teaches the TruePlan feature for automating the sketching process and integrating with Veris and Matterport.
                  </p>
                  <p className="mb-3">
                    <strong>Module 32:</strong> Discusses best practices for invoicing scans and digital assets.
                  </p>
                  <p className="mb-0">
                    <strong>Module 33:</strong> Concludes with a recap from the guides and a final exam that, once passed, earns participants their certification.
                  </p>
                  <h5 className="mt-5 mb-4">
                    Industry Recognition of The Actionable Insights
                    <br />
                    Matterport Certification
                  </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    Our Matterport training is highly regarded and carries significant industry recognition. This certification is accredited by Matterport itself, as well as prominent organizations and regulatory bodies such as the Institute of Inspection, Cleaning and Restoration Certification (IICRC), and state authorities in California, Florida, Idaho, Georgia, and Nevada. This accreditation underscores the course's relevance and comprehensive approach to training professionals on Matterport's cutting-edge camera technology.
                  </p>
                  <div
                    className="mb-5"
                    id="why-the-holidays-are-the-ideal-time-to-get-certified"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Why the Holidays Are the Ideal Time to Get Certified </h5>
                  <p className="mb-2">
                    <strong>Flexible Schedules and More Free Time</strong>
                  </p>
                  <p className="mb-0"> The holiday season often brings a slowdown in business activity, giving professionals more breathing room and flexible schedules. With fewer pressing work obligations, this is the perfect opportunity to focus on personal development. Rather than letting downtime slip away, investing those hours in completing the Actionable Insights Matterport Certification can boost your skills and elevate your qualifications. Transforming this free time into an asset will pay dividends in both professional growth and job performance. </p>
                  <p className="mt-4 mb-2">
                    <strong>Kickstarting the New Year with an Advantage</strong>
                  </p>
                  <p className="mb-0"> Securing the AIMC certification before year-end means you’ll enter the New Year ahead of the curve. This accomplishment not only increases your marketability but also strengthens your position for new job opportunities, promotions, and career advancements. You’ll stand out as a motivated and skilled professional ready to tackle new challenges, setting the tone for success throughout the upcoming year. </p>
                  <p className="mt-4 mb-2">
                    <strong>Treat Yourself to the Best Present – Investing in Yourself</strong>
                  </p>
                  <p className="mb-0"> While the holidays are a time for giving, remember that you also deserve a gift. And what better gift could there be than investing in your own growth and success? The AIMC certification is a transformative present that equips you with essential skills, opens doors to new opportunities, and enhances your reputation within the industry. Give yourself the gift of self-improvement and professional development; it's a rewarding investment that never disappoints. </p>
                  <p className="mt-4 mb-2">
                    <strong>Make the Most of the Holiday Lull</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> The holiday season’s quieter moments can sometimes lead to boredom or routine-heavy days. Instead of binge-watching another TV series, why not invest 4-6 hours in a course that could change your professional trajectory? This Matterport training offers a productive break from the holiday routine, allowing you to learn valuable skills that can impact your career. It’s an engaging and impactful way to turn downtime into growth. </p>
                  <div
                    className="mb-5"
                    id="how-to-register-for-aimc"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> How to Register for AIMC? </h5>
                  <p className="mb-4">
                    Registering for the Actionable Insights Matterport Certified (AIMC) course is simple. 
                  </p>
                  <p className="mb-5">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Visit <Link to="/" target="_blank">getinsights.org</Link> and click "Sign In." </li>
                      <li>If it’s your first visit, select "Create Account" to set up your free profile. Existing users can log in using their established credentials. Ensure you use your personal account to correctly activate your new AIMC designation.</li>
                      <li>Once logged in, navigate to the "Actionable Academy" tab and select "AI Matterport Certification."</li>
                      <li>Scroll down to find "<Link to="/shop/certification/aimc-2022" target="_blank">Become Matterport Certified,</Link>" add any desired extras, and proceed to "Buy."</li>
                      <li>Enter your billing and payment details, agree to the terms and conditions, and finalize your purchase.</li>
                      <li>After completing your registration, go to the "Actionable Academy" tab and click "Go to Academy" to access the course. </li>
                      <li>Click "Get Started" to begin your journey toward becoming certified.</li>
                    </ul>
                  </p>
                  <h5 className="mt-5 mb-4"> Join Our Matterport Community on Facebook </h5>
                  <p className="mb-5"> Joining our Matterport Facebook group connects you to a thriving community of professionals dedicated to mastering Matterport technology. We regularly share updates on new features, practical tips, and tricks through our "<a href="https://www.youtube.com/watch?v=EnbtoF6PvZA&list=PLtF55NJwJ_ZMtH3fpBfZMSwbLpFTRbZvI" target="_blank">Matter Hacks</a>" series, and provide a space for collaborative problem-solving. Engaging with like-minded individuals ensures you stay informed, motivated, and always ready to excel. </p>
                  <a href="https://www.facebook.com/groups/MatterportNinjas/?rdid=Via2p4shjCZKjc5Z&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F17igbqrzDV%2F#" target="_blank" className="btn">
                    Connect with the community
                  </a>
                  <h5 className="mt-6 mb-4"> Finally </h5>
                  <p className="mb-0"> The holiday season presents a unique chance to enhance your career by completing the Actionable Insights Matterport Certification. With flexible schedules, the chance to start the New Year with a competitive edge, and opportunities to connect with industry peers, there’s no better time to invest in yourself. Don’t miss this chance. <Link to="/" target="_blank">Sign up</Link> now to become certified or learn more about how Matterport can transform your work! </p>
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

export default withRouter(HolidaySeasonYourBestChanceToGetMatterportCertification);