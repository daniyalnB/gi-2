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
import blog_image34 from "assets/blog_image34.png";

const RequestingPriceListInX1 = () => {

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
        title="How to Request Xactimate Price Lists in X1 - Actionable Insights"
        description="What are Xactimate Price Lists? How can you request, download, and manage them in X1 to write accurate estimates? Check out this guide to learn more."
        link="blog/requesting-price-list-in-x1"
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
        <HideOn showOnPageInit height={isScreenHeight ? 4900 : 4700}>
        <div className="blog_side_menu">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#understanding-price-lists-in-x1">
              —
              <span>
                Understanding Price
                <br />
                Lists in X1
              </span>
            </a>
            <a href="#step-by-step-guide-to-requesting-a-price-list-in-x1">
              — 
              <span>
                Step-by-Step Guide to
                <br />
                Requesting a Price List
                <br />
                in X1
              </span>
            </a>
            <a href="#master-xactimate-price-lists-with-our-xactimate-bootcamp">
              — 
              <span>
                Master Xactimate Price
                <br />
                Lists With Our Xactimate
                <br />
                Bootcamp
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
                    Requesting a <span className="red">Price List</span> in X1
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Jan 29, 2025 </span>
                  <br />
                  <img
                    src={blog_image34}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Accurate estimates are the backbone of any successful restoration or construction project, and having the correct price list is essential for accuracy. In Xactimate X1, requesting a price list has been streamlined but requires a clear understanding of the updated interface. 
                    <br />
                    Whether you’re looking for the current Xactimate pricing, a free Xactimate price list, or even a specific Xactimate price list, knowing how to navigate the system can save time and avoid costly errors. This guide walks you through the process of requesting an Xactimate price list and ensures you're using the right data for your estimates.
                  </p>
                  <div
                    className="mb-5"
                    id="understanding-price-lists-in-x1"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Understanding Price Lists in X1 </h5>
                  <p className="mb-2">
                    <strong>What Are Price Lists in Xactimate?</strong>
                  </p>
                  <p className="mb-0"> Price lists in Xactimate are essential data sets that detail the cost of labor, materials, and equipment for various construction and restoration tasks. They form the foundation for generating accurate and reliable estimates, ensuring every project is priced correctly based on prevailing market rates. Whether you’re dealing with roofing, flooring, or plumbing, an Xactimate price list provides standardized pricing to eliminate guesswork and establish consistency. </p>
                  <p className="mt-4 mb-2">
                    <strong>Why Do Price Lists Vary?</strong>
                  </p>
                  <p className="mb-0"> Xactimate price lists are tailored to reflect local market conditions, making them specific to geographic regions. For instance, pricing in Los Angeles may differ from Houston due to varying labor costs, material availability, and other factors. When you request an Xactimate price list, you can refine it by location (city or zip code) to ensure the data matches the project’s exact requirements. Additionally, price lists are updated monthly to capture changes in market rates, making it essential to work with the current Xactimate pricing. For example, if you’re estimating a project in July, you’ll need the most up-to-date list for that month to maintain accuracy. </p>
                  <p className="mt-4 mb-2">
                    <strong>How to Use Price Lists Effectively</strong>
                  </p>
                  <p className="mb-0"> Selecting the right price list is crucial for delivering accurate estimates. Using outdated or incorrect lists can lead to discrepancies, delays, and disputes. By ensuring you’re always working with the current Xactimate pricing, you minimize the risk of errors and streamline the approval process. Furthermore, for historical data or regional adjustments, Xactimate allows you to download specific lists (e.g., the Xactimate price list from San Diego in June 2023 or maybe February 2024 for retrospective estimates). </p>
                  <p className="mt-4 mb-2">
                    <strong>Accessing Free Xactimate Price Lists</strong>
                  </p>
                  <p className="mb-0"> If you’re looking for a free Xactimate price list, note that Xactimate typically provides access through its licensed users. While the lists are free to download within the software, a valid Xactimate subscription is required to access them. For estimators working across multiple regions or projects, the ability to quickly download and apply the correct price list for any location or timeframe is a game-changer. </p>
                  <p className="mt-4 mb-2">
                    <strong>Actionable Insights’ Price List Update Summary</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    Every time Xactimate releases an update, we analyze and summarize it in our “<Link to="/resources/price-list-update-summary" target="_blank">Price List Update Summary</Link>” series. These summaries provide a clear breakdown of all the changes, including adjustments to labor costs, material pricing, and line items, making it easier for estimators to adapt their workflows.
                    <br />
                    Not only are these detailed summaries accessible, but they are also available for free on our <Link to="/" target="_blank">website</Link>. Our extensive archive includes every price list update released by Xactimate since February 2016, allowing you to track pricing trends over time or reference older data for retrospective estimates.
                  </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-requesting-a-price-list-in-x1"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Step-by-Step Guide to Requesting a Price List in X1 </h5>
                  <p className="mb-4">
                    Here, we’ve outlined detailed steps to help you effectively request, download, and apply an Xactimate price list for your projects.
                  </p>
                  <p className="mb-2">
                    <strong>Navigating to the Pricing Tab</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Open X1 and locate the Preferences tab on the dashboard.</li>
                      <li>Navigate to the Pricing section at the top of the interface.</li>
                      <li>This section allows you to manage all price list-related configurations and ensures you’re set up to request or apply the correct price list for your estimates.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Setting Default Price Lists</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Go to the Pricing section under the Preferences tab in X1.</li>
                      <li>Choose a price list to set as the default for your Xactimate account.</li>
                      <li>Keep in mind that this selection will apply the chosen price list to all estimates by default.</li>
                      <li>If you work with custom price lists frequently, this feature saves time by pre-applying the custom list across all your estimates instead of requiring manual updates each time.</li>
                      <li>Remember to update this setting when working in a new region or switching between different estimate types to maintain accuracy.</li>  
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Requesting a Price List</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px", marginBottom: "0px" }}>
                      <li>In the Price List dialogue box, click on the menu icon (three lines or dots) to access request options.</li>
                      <li>Select how you want to request the price list:</li>
                    </ul>
                    <ul style={{ paddingLeft: "90px", marginBottom: "0px", maxWidth: "750px" }}>
                      <li>By city, enter the city name associated with your estimate.</li>
                      <li>By zip code, such as entering "19109" to pull the pricing specific to that area.</li>
                      <li>By specific names, such as "CAST," which represents the California-San Diego price list.</li>
                    </ul>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Enter the current Xactimate pricing date for the most up-to-date list or specify a previous date for a past price list.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Downloading and Applying a Price List</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px", marginBottom: "0px" }}>
                      <li>Once the price list is requested:</li>
                    </ul>
                    <ul style={{ paddingLeft: "90px", marginBottom: "0px", maxWidth: "750px" }}>
                      <li>Choose the language in which you want the price list, such as English.</li>
                      <li>Specify if the price list should be assigned to a specific profile, like a carrier or contractor profile, if applicable.</li>
                      <li>For general use, skip profile-specific assignments to make the price list accessible across all estimates.</li>
                    </ul>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Click “Download” to retrieve the requested price list.</li>
                      <li>Confirm the download by checking if the price list appears in the Pricing section.</li>
                      <li>Apply the price list by selecting it in the Pricing tab to ensure it’s used for all new estimates.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Requesting Price Lists Directly Within an Estimate</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <ul style={{ paddingLeft: "30px", marginBottom: "0px" }}>
                      <li>Open an existing estimate in X1 where you want to apply a new price list.</li>
                      <li>Navigate to the Claim Info section under the Parameters tab.</li>
                      <li>Click on the Price List dropdown menu to manage the pricing.</li>
                      <li>Select the smart list option (highlighted in blue).</li>
                      <li>Request the price list by:</li>
                    </ul>
                    <ul style={{ paddingLeft: "90px", marginBottom: "0px", maxWidth: "750px" }}>
                      <li>Entering the city or zip code where the estimate is being created.</li>
                      <li>Specifying the exact price list name, if you know it.</li>
                    </ul>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Download the requested price list directly from this section to ensure accurate and up-to-date pricing is applied to the current estimate.</li>
                    </ul>
                  </p>
                  <div
                    className="mb-5"
                    id="master-xactimate-price-lists-with-our-xactimate-bootcamp"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Master Xactimate Price Lists With Our
                    <br />
                    Xactimate Bootcamp
                  </h5>
                  <p className="mb-5">
                    Our <Link to="/events" target="_blank">two-day comprehensive course</Link> aims to transform attendees into experts in Xactimate best practices and the <Link to="/actionable-xactimate-profile" target="_blank">Actionable Xactimate Profile</Link>. You will be able to deepen your understanding of Xactimate's evolution, history, and future, with a focus on learning the price list and best practices to use the software efficiently and effectively.
                    <br /> <br />
                    Accurate and well-managed price lists are the backbone of precise estimates in Xactimate X1. By following the methods and tips shared in this guide, you can enhance your estimating process and deliver results that build trust and efficiency.
                  </p>
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

export default RequestingPriceListInX1;