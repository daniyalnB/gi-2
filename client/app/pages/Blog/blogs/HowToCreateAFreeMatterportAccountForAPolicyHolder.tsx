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
import blog_image35 from "assets/blog_image35.png";

const HowToCreateAFreeMatterportAccountForAPolicyHolder = () => {

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
        title="How to Create a Free Matterport Account for Policyholders?"
        description="A step-by-step guide to creating a free Matterport account for your policyholders and how it can positively impact your business. Read more to learn."
        link="blog/how-to-create-a-free-matterport-account-for-a-policy-holder"
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
        <HideOn showOnPageInit height={isScreenHeight ? 5500 : 5200}>
        <div className="blog_side_menu blog_side_menu_new1">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#why-create-a-free-matterport-account-for-policyholders">
              —
              <span>
                Why Create a Free
                <br />
                Matterport Account for
                <br />
                Policyholders?
              </span>
            </a>
            <a href="#step-by-step-guide-to-creating-a-free-matterport-account">
              — 
              <span>
                Step-by-Step Guide to
                <br />
                Creating a Free
                <br />
                Matterport Account
              </span>
            </a>
            <a href="#transferring-a-scan-to-the-policyholders-account">
              — 
              <span>
                Transferring a Scan to the
                <br />
                Policyholder’s Account
              </span>
            </a>
            <a href="#best-practices-for-managing-a-policyholders-matterport-account">
              — 
              <span>
                Best Practices for
                <br />
                Managing a Policyholder’s
                <br />
                Matterport Account
              </span>
            </a>
            <a href="#become-a-certified-matterport-expert-in-just-4point5-hours">
              — 
              <span>
                Become a Certified
                <br />
                Matterport Expert in Just
                <br />
                4.5 Hours!
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
                    How to create a free <span className="red">Matterport</span> Account
                    <br />
                    for a Policy Holder
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Feb 5, 2025 </span>
                  <br />
                  <img
                    src={blog_image35}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    Setting up a Matterport account can be a game-changer for policyholders. With a free Matterport account, they can securely store and access one 3D scan forever at no cost. Creating a Matterport account is simple and requires no credit card. It ensures that policyholders always have a detailed record of their property, which can be invaluable during secondary losses or insurance claims. 
                    <br /><br />
                    In this guide, we’ll walk you through the exact steps to create a free Matterport account, transfer scans, and manage them effectively. By the end, you’ll understand how a Matterport account free of charge can strengthen your connection with policyholders while providing them long-term value. Let’s get started.
                  </p>
                  <div
                    className="mb-5"
                    id="why-create-a-free-matterport-account-for-policyholders"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Why Create a Free Matterport Account for
                    <br />
                    Policyholders?
                  </h5>
                  <p className="mb-4"> A free Matterport account offers policyholders significant value and convenience, making it a practical choice for restoration professionals. Here's why setting one up can benefit both you and your clients: </p>
                  <p className="mb-2">
                    <strong>Long-term Access to Scans</strong>
                  </p>
                  <p className="mb-0"> A free Matterport account allows policyholders to keep one scan forever at no cost. Whether it's a pre-mitigation scan to document initial damage, a post-mitigation scan showing progress, or a post-repair scan highlighting the finished work, this long-term access ensures they always have a detailed record. </p>
                  <p className="mt-4 mb-2">
                    <strong>Enhanced Documentation</strong>
                  </p>
                  <p className="mb-0"> Having visual proof can make a world of difference in insurance claims. A Matterport account provides clear, immersive 3D scans that simplify the process for all stakeholders involved. </p>
                  <p className="mt-4 mb-2">
                    <strong>Cost Savings</strong>
                  </p>
                  <p className="mb-0"> A free Matterport account removes financial barriers for policyholders, providing them with a powerful tool at no cost. This ensures they have access to essential documentation at no additional cost. </p>
                  <p className="mt-4 mb-2">
                    <strong>Professional Collaboration</strong>
                  </p>
                  <p className="mb-0"> Sharing a Matterport account fosters trust and transparency. Policyholders can view detailed 3D scans of their property, giving them a clear understanding of the restoration work. This collaborative approach enhances communication and builds confidence in your services. </p>
                  <p className="mt-4 mb-2">
                    <strong>Brand Recall</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    Every time policyholders access their Matterport account, they’ll remember your professionalism and care. This brand recall makes them more likely to return to your company for future restoration needs or refer you to their family and friends.
                  </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-creating-a-free-matterport-account"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Step-by-Step Guide to Creating a Free Matterport Account </h5>
                  <p className="mb-4">
                    Creating a Matterport free account for a policyholder is straightforward and ensures they can access essential property scans without added costs. Follow these steps to set up the account:
                  </p>
                  <p className="mb-2">
                    <strong>Access Matterport's Website</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Visit <a href="https://my.matterport.com" target="_blank">my.matterport.com</a>. </li>
                      <li>Click "Sign Up for Free" under the login options</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Fill in the Required Details</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Provide the requested information, including:</li>
                      <li>Organization Name: Use your company name instead of entering "Policyholder."</li>
                      <li>Industry Category: Select "Property Insurance" from the dropdown.</li>
                      <li>Ensure accuracy, as this data customizes the account for property-related needs.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Complete the CAPTCHA</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Solve the CAPTCHA challenge to verify you're not a robot.</li>
                      <li>Follow on-screen instructions (e.g., selecting images) to complete this step.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Submit the Form</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Double-check all entered details.</li>
                      <li>Click "Finish" to complete the account creation process.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Confirm Policyholder Access</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Once the account is created, a welcome email will be sent to the provided email address.</li>
                      <li>Share the login credentials (email and password) with the policyholder to ensure they can access their Matterport account free of charge.</li>
                    </ul>
                  </p>
                  <div
                    className="mb-5"
                    id="transferring-a-scan-to-the-policyholders-account"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Transferring a Scan to the Policyholder’s Account
                  </h5>
                  <p className="mb-4">
                    Transferring a scan to a free Matterport account helps policyholders keep important records forever. It’s a simple way to share clear documentation of their property.
                  </p>
                  <p className="mb-2">
                    <strong>Why Transfer a Scan?</strong>
                  </p>
                  <p className="mb-4">
                    Transferring a scan to a free Matterport account ensures policyholders have lasting access to important documentation. These scans serve as a reliable visual record. Having these records stored permanently in their account provides policyholders with peace of mind and clarity.
                    <br />
                    Additionally, this helps build transparency and trust with policyholders by ensuring they have the tools to navigate their claims efficiently. This small step can leave a lasting impression and strengthen your professional relationship with the policyholder.
                  </p>
                  <p className="mb-3">
                    <strong>How to Transfer a Scan</strong>
                  </p>
                  <p className="mb-2">
                    <strong>Choose the Scan</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px", marginBottom: "0px" }}>
                      <li>Talk to the policyholder and decide which scan they want. Options include:</li>
                    </ul>
                    <ul style={{ paddingLeft: "90px", marginBottom: "0px", maxWidth: "750px" }}>
                      <li>Pre-mitigation: Shows the damage before work starts.</li>
                      <li>Post-mitigation: Captures progress and equipment setup.</li>
                      <li>Post-repair: Highlights the final restored property.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Send the Scan</strong>
                  </p>
                  <p className="mb-4">
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Go to the scan in your Matterport account.</li>
                      <li>Use the transfer or sharing feature to send it to their Matterport free account.</li>
                    </ul>
                  </p>
                  <p className="mb-2">
                    <strong>Confirm the Transfer</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}>
                    <ul style={{ paddingLeft: "30px" }}>
                      <li>Matterport will email the policyholder, asking them to accept the scan.</li>
                      <li>Let them know to check their email and accept the transfer.</li>
                    </ul>
                  </p>
                  <div
                    className="mb-5"
                    id="best-practices-for-managing-a-policyholders-matterport-account"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4">
                    Best Practices for Managing a Policyholder’s
                    <br />
                    Matterport Account
                  </h5>
                  <p className="mb-2">
                    <strong>Organize Account Credentials</strong>
                  </p>
                  <p className="mb-0"> Securely share the Matterport account credentials, including the email and password, with the policyholder. Ensure they can access their free Matterport account while keeping the information safe. Proper organization helps avoid any issues when logging in later. </p>
                  <p className="mt-4 mb-2">
                    <strong>Explain Account Features</strong>
                  </p>
                  <p className="mb-0"> Educate the policyholder on the tools available in their Matterport free account. Walk them through viewing their scan, using editing and markup tools, and retrieving archived spaces. Understanding these features ensures they can fully benefit from their free Matterport account without confusion. </p>
                  <p className="mt-4 mb-2">
                    <strong>Leverage for Future Losses</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> Highlight the long-term advantages of their Matterport account free of cost. Explain how the scan can document the property’s condition, which can be useful for addressing secondary losses or future claims. This reinforces the value of having a permanent visual record for reference. </p>
                  <div
                    className="mb-5"
                    id="become-a-certified-matterport-expert-in-just-4point5-hours"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-4"> Become a Certified Matterport Expert in Just 4.5 Hours! </h5>
                  <p className="mb-0">
                    Matterport is transforming property insurance by making claims settlement more efficient and transparent. The Actionable Insights Matterport Certification teaches you how to use this technology effectively, implement it across your company, and apply it to areas like sales, operations, risk management, and client retention.
                  </p>
                  <h5 className="mt-5 mb-4"> To Conclude </h5>
                  <p className="mb-0">
                    Using a Matterport free account isn't just a smart move; it gives policyholders a reliable way to access scans that document their property. For professionals, it’s a chance to build trust, provide clarity, and create lasting value. By understanding how to create and manage a Matterport account, you can set yourself apart in the property insurance and restoration space.
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

export default withRouter(HowToCreateAFreeMatterportAccountForAPolicyHolder);