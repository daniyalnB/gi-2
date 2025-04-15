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
import blog_image29 from "assets/blog_image29.png";

const HowToSaveRunExportAndImportMacrosForXactimate = () => {

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
        title="How to save, run, export, and import macros for Xactimate?"
        description="A guide on saving, running, exporting, & importing macros for Xactimate including best practices & troubleshooting common issues. Read more."
        link="blog/how-to-save-run-export-and-import-macros-for-xactimate"
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
        <HideOn showOnPageInit height={isScreenHeight ? 6400 : 6200}>
          <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#understanding-macros-for-xactimate">
              —
              <span>
                Understanding Macros
                <br />
                for Xactimate
              </span>
            </a>
            <a href="#step-by-step-guide-to-saving-a-macro">
              — 
              <span>
                Step-by-Step Guide
                <br />
                to Saving a Macro
              </span>
            </a>
            <a href="#best-practices-for-saving-running-exporting-and-importing-macros-for-xactimate">
              — 
              <span>
                Best Practices for 
                <br />
                saving, running,
                <br />
                exporting, and importing
                <br />
                Macros for Xactimate
              </span>
            </a>
            <a href="#macros-from-actionable-insights">
              — 
              <span>
                Macros from Actionable
                <br />
                Insights
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
                    How to save, run, export, and import
                    <br />
                    macros for <span className="red">Xactimate?</span>
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Nov 06, 2024 </span>
                  <br />
                  <img
                    src={blog_image29}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    <a href="https://xactimate.com/home/" target="_blank" className="red">Xactimate</a> is a powerful tool in the property claims and estimation industry, widely used by adjusters and contractors for creating accurate, detailed estimates. However, many users are unaware of one key feature that can dramatically cut down the time spent on repetitive tasks: macros. Macros for Xactimate allow you to save groups of frequently used line items and reuse them in future estimates, reducing the need to input each item manually. This article provides a comprehensive, step-by-step guide on saving, running, exporting, and importing Macros for Xactimate, helping both new and seasoned users streamline their workflow and maximize productivity.
                  </p>
                  <div
                    className="mb-5"
                    id="understanding-macros-for-xactimate"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Understanding Macros for Xactimate </h5>
                  <p className="mb-2">
                    <strong>What is a Macro in Xactimate?</strong>
                  </p>
                  <p className="mb-4"> In Xactimate, a macro is a pre-defined set of line items that can be saved and reused in multiple estimates. Instead of manually adding each line item to every project, users can run a saved macro to automatically add all the necessary items, making the estimating process faster and more consistent. </p>
                  <p className="mb-2">
                    <strong>Why Use Macros for Estimating Efficiency?</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> Using Xactimate macros saves significant time, especially when dealing with repetitive estimates like standard room repairs or common damage scenarios. By storing these frequently used sets of line items, adjusters and contractors can focus on customizing their estimates rather than building them from scratch each time. Macros also ensure consistency across estimates, minimizing the chances of overlooking key details. Ultimately, they empower users to deliver more accurate and timely estimates, giving them an edge in a competitive industry. </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-saving-a-macro"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Step-by-Step Guide to Saving a Macro </h5>
                  <p className="mb-2">
                    <strong>Step 1: Selecting Line Items for a Macro</strong>
                  </p>
                  <p className="mb-0">
                    <ol>
                      <li>Open an estimate in Xactimate.</li>
                      <li>Navigate to the “Estimate Items” tab.</li>
                      <li>Select the first line item for the macro.</li>
                      <li>To select multiple consecutive line items, hold down the Shift key and click the last item in the group.</li>
                      <li>To select non-consecutive line items, hold down the Control (Ctrl) key and click on each item you want to include.</li>
                    </ol>
                  </p>
                  <p className="mb-2 mt-4">
                    <strong>Step 2: Saving the Selected Line Items as a Macro</strong>
                  </p>
                  <p className="mb-0">
                    <ol>
                      <li>With the desired line items selected, right-click and choose "Save Macro" from the dropdown menu.</li>
                      <li>In the "Save Macro" window, enter a clear and descriptive name for the macro.</li>
                      <li>Click OK to save the macro.</li>
                    </ol>
                  </p>
                  <h5 className="mt-5 mb-4"> How to Run a Macro in Xactimate </h5>
                  <p className="mb-0">
                    <ol>
                      <li>Go to the "Macros" tab in Xactimate.</li>
                      <li>Click on the "Retrieve Macro" option.</li>
                      <li>Select the desired macro from the list.</li>
                      <li>Click OK to run the macro and automatically add the saved line items to your estimate.</li>
                    </ol>
                  </p>
                  <h5 className="mt-5 mb-4"> Exporting Macros for Xactimate </h5>
                  <p className="mb-0">
                    <ol>
                      <li>Open the "Data Transfer" tool in Xactimate.</li>
                      <li>Select the "Export Macros" option.</li>
                      <li>Choose the macro(s) you want to export.</li>
                      <li>Select the location where you wish to save the exported macro file and click OK.</li>
                    </ol>
                  </p>
                  <h5 className="mt-5 mb-4"> Importing a Macro in Xactimate </h5>
                  <p style={{ marginBottom: "-144px" }}>
                    <ol>
                      <li>Open the "Data Transfer" tool in Xactimate.</li>
                      <li>Select the "Import Macros" option.</li>
                      <li>Browse to the location of the macro file and select it.</li>
                      <li>Click OK to import the macro into Xactimate.</li>
                    </ol>
                  </p>
                  <div
                    className="mb-5"
                    id="best-practices-for-saving-running-exporting-and-importing-macros-for-xactimate"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Best Practices for saving, running, exporting, and
                    <br />
                    importing Macros for Xactimate
                  </h5>
                  <p className="mb-2">
                    <span className="blue">Tips for Keeping Macros Organized with Clear Naming Conventions</span>
                  </p>
                  <p className="mb-4"> Naming macros thoughtfully is crucial for keeping your workflow efficient, especially as you accumulate a variety of them. Here are some tips for effective naming: </p>
                  <p className="mb-2">
                    <strong>Be Descriptive</strong>
                  </p>
                  <p className="mb-4"> Include details like the type of project (e.g., “Kitchen_Repair_Standard”) or a specific room (e.g., “Bathroom_Tile_Replacement”). </p>
                  <p className="mb-2">
                    <strong>Use Consistent Formatting</strong>
                  </p>
                  <p className="mb-4"> Stick to a uniform style such as underscores or dashes between words, and ensure consistency throughout your library. For example, use “RoomType_Action” (e.g., “LivingRoom_Painting”). </p>
                  <p className="mb-2">
                    <strong>Include Dates or Version Numbers</strong>
                  </p>
                  <p className="mb-4"> If you frequently update macros, add dates or version numbers to differentiate between older and updated versions (e.g.,“LivingRoom_Painting_v2_0924”). </p>
                  <p className="mb-2">
                    <span className="blue">How to Save Customizations in Macros</span>
                  </p>
                  <p className="mb-4"> Macros can save more than just a list of standard line items; they can also include customizations like trade codes, making your estimating even more precise. </p>
                  <p className="mb-2">
                    <strong>Adjust Trade Codes Before Saving</strong>
                  </p>
                  <p className="mb-4"> When setting up your line items, assign specific trade codes (e.g., “DEM” for demolition or “DRY” for drywall). Make sure these adjustments are applied before you select and save your macro. </p>
                  <p className="mb-2">
                    <strong>Include Custom Pricing or Adjustments</strong>
                  </p>
                  <p className="mb-4"> If you’ve made any pricing adjustments or added specific notes to a line item, these details will carry over when the macro is run in future estimates. </p>
                  <p className="mb-2">
                    <strong>Save Macros for Specific Trades</strong>
                  </p>
                  <p className="mb-4"> If you work with a diverse range of trades, consider creating separate macros for each trade (e.g., “Electrical_Installations,” “Plumbing_Fixtures”). This ensures that trade-specific adjustments are preserved, making it easier to add them when needed. </p>
                  <p className="mb-2">
                    <span className="blue">Ensuring Macros Maintain the Correct Order of Line Items</span>
                  </p>
                  <p className="mb-4"> The order of line items within a macro can impact how they appear in an estimate, which is particularly important when working with detailed scopes of work. </p>
                  <p className="mb-2">
                    <strong>Select Line Items Carefully</strong>
                  </p>
                  <p className="mb-4"> When creating a macro, select line items in the order that you want them to appear. Start from the top and proceed downward to ensure that the macro preserves this sequence. </p>
                  <p className="mb-2">
                    <strong>Review Macro Content Before Saving</strong>
                  </p>
                  <p className="mb-4"> Before you finalize a macro, double-check the arrangement of line items to confirm they follow the logical sequence needed for the task at hand. </p>
                  <p className="mb-2">
                    <strong>Test the Macro After Saving</strong>
                  </p>
                  <p className="mb-0"> After saving, test the macro using a dummy estimate to verify that the items appear as expected. This small step can save time and avoid errors in future estimates. </p>
                  <p className="mt-4 mb-4">
                    <span className="blue">Troubleshooting Common Issues</span>
                  </p>
                  <p className="mb-2">
                    <strong>What to Do if a Macro Doesn’t Save Correctly</strong>
                  </p>
                  <p className="mb-2"> Sometimes, after going through the process of saving a macro, it may not appear in the list or might not save with the selected line items. </p>
                  <p className="mb-2">
                    <strong>Solution</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Double-check that all line items intended for the macro are highlighted before clicking the "Save Macro" option.</li>
                      <li>Verify that the name of the macro does not contain any special characters that could cause saving errors.</li>
                      <li>Restart Xactimate and attempt to save the macro again, as a software refresh can often resolve minor glitches.</li>
                      <li>Make sure you have the correct user permissions to save Macros for Xactimate, as restricted permissions may prevent saving.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Handling Sketch Algorithm Items That Cannot Be Saved</strong>
                  </p>
                  <p className="mb-2"> Certain items tied to the sketch algorithms, like specific room structures or measurement-based items, may not be saved directly in a macro. </p>
                  <p className="mb-2">
                    <strong>Solution</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> For sketch-related items, save the sketch itself as a template rather than relying on macros. This allows you to retain all sketch configurations without compatibility issues. You can also create a macro for associated line items and use the saved sketch template alongside it, integrating them during the estimating process. </p>
                  <div
                    className="mb-5"
                    id="macros-from-actionable-insights"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Macros from Actionable Insights </h5>
                  <p className="mb-5"> Actionable Insights has over 110 macros covering a wide range of processes from overhauling debris to roofing. Each macro is fully customizable and comes with related F9 notes. </p>
                  <Link to="/macros" target="_blank" className="btn">
                    Check out our Macros
                  </Link>
                  <p className="mt-5 mb-2">
                    <strong>Supplement Macros with Live Estimating Guidance</strong>
                  </p>
                  <p className="mb-3"> We believe that no two estimates are the same. Even if you are using Macros for Xactimate, there are many chances of making mistakes or forgetting warranted line items. That’s where live estimating guidance from the Actionable Profile comes in handy. It will remind you to make all the necessary adjustments to ensure your estimates are accurate and thorough. You also get all of our macros for free with the Actionable Xactimate Profile. </p>
                  <Link to="/actionable-xactimate-profile" target="_blank" className="btn" style={{ padding: "12px 25px" }}>
                    Try before you buy with 99% off
                  </Link>
                  <p className="mt-4 mb-2">
                    <strong>Master Xactimate With Actionable Profile and Xact Best Practices Bootcamp</strong>
                  </p>
                  <p className="mb-3"> This intensive two-day course is designed to turn attendees into experts in Xactimate best practices and the Actionable Xactimate Profile. It covers everything from the software's history and future developments to its most essential features, offering a deep dive into how to fully leverage Xactimate's capabilities for today's estimators and claims professionals. The bootcamp also helps you better understand how to leverage live estimating guidance from the Actionable Profile to write increasingly accurate estimates. </p>
                  <Link to="/events" target="_blank" className="btn">
                    Find out more
                  </Link>
                  <h5 className="mt-5 mb-3"> About Actionable Insights </h5>
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

export default withRouter(HowToSaveRunExportAndImportMacrosForXactimate);