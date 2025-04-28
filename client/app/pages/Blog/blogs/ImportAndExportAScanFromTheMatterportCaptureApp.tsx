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
import blog_image18 from "assets/blog_image18.png";
import blog_image19 from "assets/blog_image19.png";
import blog_image20 from "assets/blog_image20.png";
import blog_image21 from "assets/blog_image21.png";
import blog_image22 from "assets/blog_image22.png";
import blog_image23 from "assets/blog_image23.png";
import blog_image24 from "assets/blog_image24.png";
import blog_image25 from "assets/blog_image25.png";
import blog_image26 from "assets/blog_image26.png";

const ImportAndExportAScanFromTheMatterportCaptureApp = () => {

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
        title="How to Import and Export Matterport Scans Across Devices"
        description="A step-by-step guide on transferring Matterport scans between devices using the import/export feature (with updated screenshots). Read more."
        link="blog/import-and-export-a-scan-from-the-matterport-capture-app"
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
        <HideOn showOnPageInit height={isScreenHeight ? 8200 : 7800}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#step-by-step-guide-to-exporting-data">
              —
              <span>
                Step-by-Step Guide to
                <br />
                Exporting Data
              </span>
            </a>
            <a href="#step-by-step-guide-to-importing-data">
              — 
              <span>
                Step-by-Step Guide 
                <br />
                to Importing Data
              </span>
            </a>
            <a href="#benefits-practical-applications">
              — 
              <span>
                Benefits & Practical
                <br />
                Applications
              </span>
            </a>
            <a href="#matter-hacks">
              — 
              <span>Matter Hacks</span>
            </a>
            <a href="#video">
              — 
              <span>Video</span>
            </a>
            <a href="#aimc-certification">
              — 
              <span>AIMC Certification</span>
            </a>
          </div>
        </HideOn>
				<div className="main-container">
					<div className="Blog_Page">
						<div className="">
              <div className="holder DiscoverPreGeneratedVideosAndGifsInYourMatterportScansIntroduction">
                <div id="introduction">
                  <h2 className="mb-4">
                    Import and Export a Scan from the
                    <br />
                    Matterport Capture App
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Oct 09, 2024 </span>
                  <br />
                  <img
                    src={blog_image18}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Not once, not twice, but many times, we forget to bring the device we need to capture <a href="https://matterport.com/industries/insurance-restoration" target="_blank" className="red">Matterport scans</a>.
                    We’re sure that it has happened to you too. Not only that, sometimes, you need the scans on a different  device from the one used to capture them. Fortunately, you can now import and export scans between devices using the  <a href="https://matterport.com/3d-camera-app" target="_blank" className="red">Matterport Capture app</a>. How? Without further ado, let’s dive in.
                  </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-exporting-data"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Step-by-Step Guide to Exporting Data </h5>
                  <p className="mb-4">
                    We’ll show you how to export the data from the capture device to the cloud, allowing you to import it onto another device from the cloud. For this tutorial, we’re using an iPad as our exporting capture device.
                  </p>
                  <p className="mb-2">
                    <strong>Open the Matterport Capture App</strong>
                  </p>
                  <p className="mb-0"> This is the obvious first step. pen your Matterport Capture app, and you’ll see all the scans captured on the device. </p>
                  <img
                    src={blog_image19}
                    className="mt-4 mb-4"
                  />
                  <p className="mb-2">
                    <strong>Select The Scan</strong>
                  </p>
                  <p className="mb-0"> From the scans you have in the app, choose the one you want to export. Make sure the scan name is unique and not similar to others. This way, you can easily find it while importing it. </p>
                  <img
                    src={blog_image20}
                    className="mt-4 mb-4"
                  />
                  <p className="mb-2">
                    <strong>Click The Ellipses And Choose "Export."</strong>
                  </p>
                  <p className="mb-0"> Click on the three dots (ellipses) at the bottom of the selected scan. A menu will appear—select "Export." The file size will be shown, and the app will archive the file into a zip folder. This may take a few minutes depending on the size of the scan and your device’s processing power. </p>
                  <img
                    src={blog_image21}
                    className="mt-4 mb-4"
                  />
                  <p className="mb-2">
                    <strong>Save & Upload The Scan</strong>
                  </p>
                  <p className="mb-0"> Once the file is archived, you’ll be given options to save it locally or upload it to cloud platforms. Here we are uploading it on Google Drive. </p>
                  <img
                    src={blog_image22}
                    className="mt-4 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}> With the file successfully uploaded, the export process is complete. </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-importing-data"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Step-by-Step Guide to Importing Data </h5>
                  <p className="mb-4"> Now, let’s import the scan from the cloud to another device that has the Matterport Capture App. For this tutorial, we’ll be using an iPhone. To import the data from the cloud, you need to make sure that the relevant cloud account is logged on your device. </p>
                  <p className="mb-2">
                    <strong>Choose “Import” from the App Menu</strong>
                  </p>
                  <p className="mb-0"> Once you open the app, click the ellipses (three dots) in the top-right corner, and select “Import” from the menu. </p>
                  <img
                    src={blog_image23}
                    className="mt-4 mb-4"
                    style={{ width: "360px" }}
                  />
                  <p className="mb-2">
                    <strong>Import from .Zip Archive</strong>
                  </p>
                  <p className="mb-0"> After selecting “import”, the app will show you two options—import from a .zip archive or file location. Choose the former to access your cloud account. </p>
                  <img
                    src={blog_image24}
                    className="mt-4 mb-4"
                    style={{ width: "360px" }}
                  />
                  <p className="mb-2">
                    <strong>Select And Unzip The File</strong>
                  </p>
                  <p className="mb-0"> From the cloud, choose the file you want to import. Remember the unique name you gave it? This will come in handy when searching for the file you want to import. Select the file, and the app will automatically unzip and import it. </p>
                  <img
                    src={blog_image25}
                    className="mt-4 mb-4"
                    style={{ width: "360px" }}
                  />
                  <p className="mb-2">
                    <strong>Verify The Scan</strong>
                  </p>
                  <p className="mb-0"> Once unzipping is complete, your scan will appear in the dashboard. From here, open the scan and make sure you do not close the app while it opens and updates the scan. This may take a few minutes, so wait patiently. After loading is finished, you can easily view your scan. </p>
                  <img
                    src={blog_image26}
                    className="mt-4 mb-4"
                    style={{ width: "360px" }}
                  />
                  <p style={{ marginBottom: "-144px" }}> And that's it! You’ve successfully exported your scan from one capture device to the cloud and imported it into another device. </p>
                  <div
                    className="mb-5"
                    id="benefits-practical-applications"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Benefits & Practical Applications </h5>
                  <p className="mb-4"> Being able to export and import the scans between devices unlocks endless possibilities. Here are some of the most beneficial and practical applications of this process. </p>
                  <p className="mb-2">
                    <strong>Flexibility with On-site Capture Devices</strong>
                  </p>
                  <p className="mb-4"> First of all, the biggest advantage is that you don’t have to worry about having the same device on-site. Whether you have forgotten it, the battery is not charged, or the device is unavailable, this method provides the solution. Simply take the scans from the available device and later transfer the data to the device of your choice. </p>
                  <p className="mb-2">
                    <strong>Scheduling Multiple Scans Without Device Limitations</strong>
                  </p>
                  <p className="mb-4"> Teams can now manage multiple scans simultaneously without the logistical hassle of ensuring the same device is available at every location. This improves coordination between team members, as they can seamlessly transfer data between their devices, speeding up the entire workflow. </p>
                  <p className="mb-2">
                    <strong>Save Time</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> For contractors or restoration professionals, this feature saves valuable time. Whether you’re juggling different sites or working with a large team, the ability to import and export scans across devices ensures that your data is always accessible without being restricted to a single device. </p>
                  <div
                    className="mb-5"
                    id="matter-hacks"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Matter Hacks </h5>
                  <p style={{ marginBottom: "-144px" }}> Matter Hacks is a series started by Actionable Insights that covers the best Matterport tips and tricks. From unique geospatial technology applications to exploring the various features, we cover everything you need to know about Matterport in quick tutorials. If you want to view the video of the tutorial instead, jump right in. </p>
                  <div
                    className="mb-5"
                    id="video"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <div className="youtube_video_main mt-4 mb-4">
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/zZM_b6eg_7c"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          name="actionable-xactimate-profile"
                          style={{ borderRadius: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <p style={{ marginBottom: "-144px" }}> For more tutorials, visit our <a href="https://www.youtube.com/playlist?list=PLtF55NJwJ_ZMtH3fpBfZMSwbLpFTRbZvI" target="_blank">channel</a>.</p>
                  <div
                    className="mb-5"
                    id="aimc-certification"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Further Your Education in New Tools & Tech </h5>
                  <p className="mb-5"> Want to master Matterport’s game-changing technology? We have just the certification for you. With the <Link to="/aimc" target="_blank">Actionable Insights Matterport Certification</Link> (AIMC), you will learn to use this revolutionary technology the way it is meant to be used. It will further help you scale the training and implementation across your company and prepare you to leverage all aspects of this technology as it relates to sales, operations, business development, risk management, client retention, and more. </p>
                  <Link to="/aimc" target="_blank" className="btn">
                    Check it out now
                  </Link>
                  <h5 className="mt-5 mb-3"> Have any questions? Feel free to ask. </h5>
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

export default ImportAndExportAScanFromTheMatterportCaptureApp;