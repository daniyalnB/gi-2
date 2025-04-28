import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
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
import blog_image32 from "assets/blog_image32.png";

const HowToUseXactimateSketchGallery = () => {

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
        title="Xactimate Sketch Gallery: Sketching with Pre-Made Templates"
        description="Save time and improve accuracy in your Xactimate estimates using the Sketch Gallery on Actionable Insights. Learn how to access and use it. Read more."
        link="blog/how-to-use-xactimate-sketch-gallery"
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
        <HideOn showOnPageInit height={isScreenHeight ? 5700 : 5400}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#what-is-the-xactimate-sketch-gallery">
              —
              <span>
                What is the Xactimate
                <br />
                Sketch Gallery?
              </span>
            </a>
            <a href="#step-by-step-guide-how-to-access-and-use-templates-from-the-sketch-gallery">
              — 
              <span>
                Step-by-Step Guide:
                <br />
                How to Access and Use
                <br />
                Templates from the
                <br />
                Sketch Gallery
              </span>
            </a>
            <a href="#benefits-of-using-the-xactimate-sketch-gallery">
              — 
              <span>
                Benefits of Using the
                <br />
                Xactimate Sketch Gallery
              </span>
            </a>
            <a href="#additional-tips">
              — 
              <span>Additional Tips</span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    How to use the <span className="red">Xactimate</span> Sketch
                    <br />
                    Gallery on <span className="blue">getinsights.org</span>?
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Dec 04, 2024 </span>
                  <br />
                  <img
                    src={blog_image32}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Creating accurate sketches in <a href="https://xactimate.com/home/" target="_blank" className="red">Xactimate</a> is essential for reliable estimates. However, complex structures like spiral staircases, angled roofs, and customized room layouts can pose significant challenges. Manually building these complex sketches in Xactimate requires advanced skills, which takes time and increases the potential for error. The <Link to="/online-sketch-gallery" target="_blank">Xactimate Sketch Gallery</Link> on <Link to="/" target="_blank">getinsights.org</Link> was designed to simplify this process, offering estimators a valuable resource of pre-made templates for complex structures.
                    <br /><br />
                    This blog will guide you through the purpose, benefits, and types of templates available in the Xactimate Sketch Gallery, empowering you to make the most of these ready-made free resources for complex estimates.
                  </p>
                  <div
                    className="mb-5"
                    id="what-is-the-xactimate-sketch-gallery"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> What is the Xactimate Sketch Gallery? </h5>
                  <p className="mb-4"> The Xactimate Sketch Gallery is an online repository hosted on getinsights.org, offering pre-built Xactimate sketch templates for complex structures. This gallery is a valuable resource, allowing estimators to download and use professionally designed templates within Xactimate to streamline their sketching process. These templates are designed for easy integration, requiring only minimal adjustments to fit specific projects. </p>
                  <p className="mb-2">
                    <strong>Purpose of the Sketch Gallery</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> The Sketch Gallery on <Link to="/" target="_blank">getinsights.org</Link> was developed to support Xactimate users by reducing the time spent on intricate sketches and enhancing estimate quality. Instead of drawing challenging elements from scratch, users can leverage the gallery’s templates to achieve a high level of detail and consistency in their estimates. </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-how-to-access-and-use-templates-from-the-sketch-gallery"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Step-by-Step Guide: How to Access and Use Templates from the Sketch Gallery </h5>
                  <p className="mb-2">
                    <strong>Navigating to the Sketch Gallery</strong>
                  </p>
                  <p className="mb-1"> Accessing the Xactimate Sketch Gallery on <Link to="/" target="_blank">getinsights.org</Link> is straightforward. Follow these steps to find the sketch templates: </p>
                  <p className="mb-0">
                    <ol>
                      <li>Visit <Link to="/" target="_blank">getinsights.org</Link> and locate the navigation menu at the top of the page.</li>
                      <li>Click on the “Free Resources” tab.</li>
                      <li>From the dropdown, select Xactimate Sketch Gallery.</li>
                      <li>In the Sketch Gallery, you’ll find a library of pre-made Xactimate sketch templates designed to simplify complex estimates, from staircases to roofs.</li>
                    </ol>
                  </p>
                  <p className="mb-2 mt-4">
                    <strong>Selecting and Downloading Templates</strong>
                  </p>
                  <p className="mb-1"> Browsing through the Xactimate Sketch Gallery is easy, with templates organized by category. Let’s take an example of downloading a template for a spiral staircase: </p>
                  <p className="mb-1">
                    <ol className="mb-0">
                      <li>Scroll through the gallery to find the desired template (e.g., spiral staircase).</li>
                      <li>Click on the download link next to the template you’d like to use.</li>
                      <li>Save the downloaded SKX file to a convenient location on your computer (e.g., Desktop or Downloads folder).</li>
                    </ol>
                  </p>
                  <p className="mb-0"> All templates are compatible with various Xactimate versions, including Xactimate Online and X1 Desktop, so you can confidently download them knowing these templates will function smoothly regardless of your version. </p>
                  <p className="mb-2 mt-4">
                    <strong>Importing Sketch Templates into Xactimate</strong>
                  </p>
                  <p className="mb-1"> To import the downloaded sketch template (SKX file) into Xactimate, follow these steps: </p>
                  <p className="mb-1">
                    <ol className="mb-0">
                      <li>Open Xactimate and go to the <strong>Sketch</strong> tab.</li>
                      <li>In the toolbar, click on <strong>Options</strong>, then select <strong>Load Template</strong>.</li>
                      <li>Click <strong>Import</strong> and locate the SKX file you saved.</li>
                      <li>Select the file and confirm by pressing <strong>OK</strong>.</li>
                    </ol>
                  </p>
                  <p className="mb-0"> The template will be accessible within the sketch interface, ready to be added to your current estimate. </p>
                  <p className="mb-2 mt-4">
                    <strong>Placing the Template</strong>
                  </p>
                  <p className="mb-1"> After importing the Xactimate sketch template, it’s time to place it within your estimate: </p>
                  <p className="mb-1">
                    <ol className="mb-0">
                      <li>Select the imported template from the library</li>
                      <li>Position it in your estimate by clicking on the desired location within the sketch.</li>
                      <li>Adjust measurements, angles, and dimensions to fit the specific project requirements.</li>
                    </ol>
                  </p>
                  <p className="mb-0"> Each template can be customized to meet unique project needs, allowing you to fine-tune details such as wall lengths, staircase angles, or deck dimensions to fit the layout accurately. </p>
                  <p className="mt-4 mb-4"> Check out the video for a better understanding. </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/FqQZGvH2fLw"
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
                    id="benefits-of-using-the-xactimate-sketch-gallery"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Benefits of Using the Xactimate Sketch Gallery </h5>
                  <p className="mb-2">
                    <strong>Save Time</strong>
                  </p>
                  <p className="mb-0"> One of the primary advantages of the Xactimate Sketch Gallery is its ability to streamline the estimating process. Pre-defined templates eliminate the need to draw complex elements from scratch, saving valuable time on each estimate. Instead of repeatedly drawing similar structures, estimators can simply import a template, allowing them to focus on other essential aspects of the job. </p>
                  <p className="mt-4 mb-2">
                    <strong>Improve Accuracy</strong>
                  </p>
                  <p className="mb-0"> Templates also enhance consistency and accuracy across estimates. By using standardized sketches, estimators ensure precise measurements and consistently applied key design elements across all projects. This level of accuracy also minimizes the risk of discrepancies, leading to more reliable and professional estimates. </p>
                  <p className="mt-4 mb-2">
                    <strong>Ease of Use for Complex Structures</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    The Sketch Gallery simplifies the inclusion of intricate structures that are typically challenging to draw, such as spiral staircases, multi-tier decks, and complex roofing angles. These Xactimate sketch templates remove the hassle of calculating exact angles, dimensions, and proportions, making it easy to incorporate them into estimates.
                    <br /><br />
                    Moreover, these templates are highly customizable. Once imported, users can adjust measurements, angles, and other specifications to match project requirements, making them suitable for various layouts and designs. This flexibility makes the Xactimate Sketch Gallery an invaluable tool for complex sketches and enhances the estimator’s ability to create tailored estimates with ease.
                  </p>
                  <div
                    className="mb-5"
                    id="additional-tips"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Additional Tips for Using the Xactimate Sketch Gallery Effectively </h5>
                  <p className="mb-2">
                    <strong>Regularly Explore New Templates</strong>
                  </p>
                  <p className="mb-0"> The Xactimate Sketch Gallery is updated periodically with new templates to meet a range of estimating needs. Checking the gallery regularly ensures that you’re taking advantage of the latest resources to help tackle specific challenges that may arise. Whether it’s new building designs, unique materials, or specific client requests, new templates can significantly expand your options and enhance your estimating flexibility. </p>
                  <p className="mt-4 mb-2">
                    <strong>Combining Templates for Comprehensive Estimates</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> For more comprehensive estimates, consider combining multiple templates. For instance, if a project includes both an outdoor deck and a staircase, you can combine templates for each to create a cohesive and detailed sketch of the full property. This method allows for a high level of customization and provides a complete view of the project, improving the estimate’s accuracy and readability. </p>
                  <div
                    className="mb-5"
                    id="best-practices-for-saving-running-exporting-and-importing-macros-for-xactimate"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Become an Xactimate Expert with the Actionable Profile and Xact Best Practices Bootcamp
                  </h5>
                  <p className="mb-5">
                    To fully harness the power of the Xactimate Sketch Gallery and other advanced features, register for the <Link to="/event/actionable-xactimate-profile-and-xact-best-practices-bootcamp-dec-12"  target="_blank">Actionable Profile and Xact Best Practices Bootcamp</Link>. This intensive training program covers best practices for estimating, making it ideal for those who want to refine their skills, improve accuracy, and maximize efficiency. Gain expertise in line items, component buildups, yield adjustments, and the newest XactXpert utilities. This training is highly recommended for both beginners and seasoned estimators who wish to stay competitive in the industry.
                  </p>
                  <Link to="/events" target="_blank" className="btn">
                    Register Now
                  </Link>
                  <h5 className="mt-6 mb-4"> In the end </h5>
                  <p className="mb-0"> The Xactimate Sketch Gallery offers estimators an efficient, accurate, and user-friendly approach to creating complex sketches. By leveraging pre-made templates, users save time, ensure consistency, and improve the overall quality of their estimates. Regularly exploring the gallery and combining multiple templates in a single estimate further enhances this tool’s versatility, enabling estimators to deliver detailed and accurate estimates for any project. </p>
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

export default HowToUseXactimateSketchGallery;