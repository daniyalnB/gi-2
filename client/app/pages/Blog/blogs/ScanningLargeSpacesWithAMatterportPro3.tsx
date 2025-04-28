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
import blog_image27 from "assets/blog_image27.png";

const ScanningLargeSpacesWithAMatterportPro3 = () => {

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
        title="Step-by-step Guide to Take Matterport Scans of Large Spaces"
        description="Taking Matterport Scans of large spaces requires skills and guidance. Learn how to do it with our comprehensive guide. Read more."
        link="blog/scanning-large-spaces-with-a-matterport-pro3"
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
        <HideOn showOnPageInit height={isScreenHeight ? 7800 : 7300}>
          <div className="blog_side_menu blog_side_menu_new1">
            <a href="#introduction">
              — 
              <span>Introduction</span>
            </a>
            <a href="#why-matterport-pro3-is-perfect-for-large-spaces">
              —
              <span>
                Why Matterport Pro3 is
                <br />
                Perfect for Large
                <br />
                Spaces?
              </span>
            </a>
            <a href="#key-features-of-the-pro3-for-large-environments">
              — 
              <span>
                Key Features of the
                <br />
                Pro3 for Large
                <br />
                Environments
              </span>
            </a>
            <a href="#step-by-step-guide-to-scanning-a-large-space-with-the-matterport-pro3">
              — 
              <span>
                Step-by-Step Guide to
                <br />
                Scanning a Large Space
                <br />
                with the Matterport Pro3 
              </span>
            </a>
            <a href="#best-practices-for-scanning-large-spaces">
              — 
              <span>
                Best Practices for
                <br />
                Scanning Large Spaces
              </span>
            </a>
            <a href="#matter-hacks">
              — 
              <span>Matter Hacks</span>
            </a>
            <a href="#become-a-certified-matterport-expert-in-just-6-hours">
              — 
              <span>
                Become a Certified
                <br />
                Matterport Expert in Just
                <br />
                6 Hours!
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
                    Taking Matterport Scans of Large
                    <br />
                    Spaces with a Pro3
                  </h2>
                </div>
                <div className="sub-header">
                  <span className="team"> Team Actionable | Oct 23, 2024 </span>
                  <br />
                  <img
                    src={blog_image27}
                    className="mt-3 mb-4"
                  />
                  <p style={{ marginBottom: "-144px" }}>
                    In industries like restoration and construction where large spaces are often involved, capturing every detail is essential. Taking Matterport scans of these spaces presents unique challenges due to their size and repetitive structures.
                    <br /><br />
                    The Matterport Pro3 excels in this environment, offering professionals the ability to create high-quality scans. Its advanced features and improved functionality make it perfect for handling the complexities of vast environments while maintaining the precision and detail Matterport users rely on.
                    <br /><br />
                    As part of the Matter Hacks series, Actionable Insights aims to explore and demonstrate the capabilities of cutting-edge scanning technology like the Matterport Pro3. This article offers practical guidance on using this tool, especially in large spaces.
                  </p>
                  <div
                    className="mb-5"
                    id="why-matterport-pro3-is-perfect-for-large-spaces"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Why Matterport Pro3 is Perfect for Large Spaces? </h5>
                  <p className="mb-4"> The Matterport Pro3 is optimized to handle larger spaces with ease, offering significant improvements over previous models. Its ability to scan over greater distances and adapt to both indoor and outdoor environments makes it the ideal tool for large-scale projects. </p>
                  <p className="mb-4">
                    <strong>Pro3 vs. Pro2</strong>
                  </p>
                  <div className="comparison-table mb-4">
                    <table>
                      <thead>
                        <tr>
                          <th>Feature</th>
                          <th>Matterport Pro2</th>
                          <th>Matterport Pro3</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Max Scanning Distance</td>
                          <td>7-10 feet between scans</td>
                          <td>30+ feet between scans</td>
                        </tr>
                        <tr>
                          <td>Outdoor Scanning</td>
                          <td>Limited, often unreliable</td>
                          <td>Optimized for outdoor environments</td>
                        </tr>
                        <tr>
                          <td>Accuracy</td>
                          <td>Requires AprilTags in repetitive spaces</td>
                          <td>No AprilTags needed</td>
                        </tr>
                        <tr>
                          <td>Repetitive Architecture</td>
                          <td>Requires additional tagging for accuracy</td>
                          <td>Handles repetitive architecture easily</td>
                        </tr>
                        <tr>
                          <td>Performance in Large Spaces</td>
                          <td>Requires multiple close scans</td>
                          <td>Covers larger areas with fewer scans</td>
                        </tr>
                        <tr>
                          <td>Speed</td>
                          <td>Slower scanning due to proximity</td>
                          <td>Faster due to extended range</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p style={{ marginBottom: "-144px" }}> As the table illustrates, the Pro3 provides users with enhanced range, allowing for scans over greater distances, and reducing the number of matterport scans needed to cover large spaces like warehouses. Unlike the Pro2, which struggled with repetitive architecture and often required the use of AprilTags, the Pro3 performs smoothly even in complex environments. </p>
                  <div
                    className="mb-5"
                    id="key-features-of-the-pro3-for-large-environments"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Key Features of the Pro3 for Large Environments </h5>
                  <p className="mb-4"> Here are the key features that make it the go-to tool for professionals dealing with expansive environments: </p>
                  <p className="mb-2">
                    <strong>Long Distance Scanning</strong>
                  </p>
                  <p className="mb-4"> One of the standout features of the Pro3 is its ability to scan distances up to 30 feet or more between waypoints. In a warehouse or large facility, users don’t need to make as many stops for scans, significantly speeding up the process. This is particularly beneficial when dealing with large, open spaces where previous models would have required multiple scans in closer proximity. </p>
                  <p className="mb-2">
                    <strong>Accuracy</strong>
                  </p>
                  <p className="mb-4"> Despite the longer distances between scan points, the Pro3 maintains high accuracy, ensuring every scan is properly aligned. Even in environments with repetitive architecture, such as rows of shelving or pallets in a warehouse, the Pro3’s advanced technology captures every detail with precision. This level ensures that the Matterport scans are an accurate reflection of the actual environment. </p>
                  <p className="mb-2">
                    <strong>Outdoor Capabilities</strong>
                  </p>
                  <p className="mb-4"> Another significant improvement in the Pro3 is its ability to perform well in outdoor environments. Whether scanning detached garages, pools, side yards, or parking lots, the Pro3 provides consistent, high-quality Matterport scans. This outdoor capability is especially valuable for industries where both indoor and outdoor spaces need to be documented. </p>
                  <p className="mb-2">
                    <strong>No Need for AprilTags</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> One major advantage of the Pro3 over its predecessor is its ability to scan large spaces without needing AprilTags for alignment. In the past, the Pro2 required these markers in environments with repetitive features, such as warehouse aisles or large rooms with minimal variation. With the Pro3, these additional steps are no longer necessary, allowing for a faster, more streamlined process without sacrificing accuracy. </p>
                  <div
                    className="mb-5"
                    id="step-by-step-guide-to-scanning-a-large-space-with-the-matterport-pro3"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3">
                    Step-by-Step Guide to Scanning a Large Space
                    <br />
                    with the Matterport Pro3
                  </h5>
                  <p className="mb-5"> When scanning a large space with the Matterport Pro3, a systematic approach ensures every detail is captured accurately and efficiently. Here's a step-by-step guide to ensure the most effective use of the Pro3 in expansive environments. </p>
                  <p className="mb-2">
                    <strong><span className="red">Step 1:</span> <span className="blue">Start with the Construction Traffic Zone and Front Office Area</span></strong>
                  </p>
                  <p className="mb-4"> Before diving into the heart of the space, it’s important to start at the perimeter—particularly in areas like the construction traffic zone or the front office. </p>
                  <p className="mb-2">
                    <strong>Capture the Full Scope of the Property</strong>
                  </p>
                  <p className="mb-4"> Begin by scanning the front office area and any external spaces like parking lots, equipment storage, or surrounding zones. These spaces often play a crucial role in project documentation, providing a full picture of the site’s environment. </p>
                  <p className="mb-2">
                    <strong>Protection of the Site</strong>
                  </p>
                  <p className="mb-5"> By taking Matterport scans of the outside spaces, such as parking lots or areas with dumpsters, you will protect your team and company from potential liabilities. These scans act as a visual record, ensuring accurate documentation in case of future disputes about the property’s condition at the start of a project. </p>
                  <p className="mb-2">
                    <strong><span className="red">Step 2:</span> <span className="blue">Scanning Entryways with the “7 and 7” Rule</span></strong>
                  </p>
                  <p className="mb-4"> Next, transition from the front office or traffic zone into the larger warehouse space. This is where the “7 and 7” rule comes into play. </p>
                  <p className="mb-2">
                    <strong>What is the 7 and 7 Rule?</strong>
                  </p>
                  <p className="mb-4"> When using Matterport to scan smaller spaces like doorways, hallways, or entryways, it’s essential to follow the “7 and 7” guideline. Place the Matterport Pro3 approximately 7 feet inside the door frame, and then another 7 feet on the other side to ensure full coverage. </p>
                  <p className="mb-2">
                    <strong>Why Accuracy Matters?</strong>
                  </p>
                  <p className="mb-5"> Entryways are critical for navigation within the 3D model, particularly when estimators or project managers are reviewing the scan remotely. Scanning these areas precisely helps ensure smooth transitions between rooms and provides the necessary detail to show how different spaces are connected. </p>
                  <p className="mb-2">
                    <strong><span className="red">Step 3:</span> <span className="blue">Scanning the Actual Large Space</span></strong>
                  </p>
                  <p className="mb-4"> Once inside the main area, you can start leveraging the Pro3’s powerful long-distance scanning capabilities. </p>
                  <p className="mb-2">
                    <strong>Extend Scan Distances in The Main Area</strong>
                  </p>
                  <p className="mb-4"> In the main area, you can take full advantage of the Pro3's range. Instead of placing the scanner every 7 feet, the Pro3 enables you to extend the distance between scans up to 30 feet or more. </p>
                  <p className="mb-2">
                    <strong>Pushing the Limits for Efficiency</strong>
                  </p>
                  <p className="mb-4"> In large environments like a warehouse, time is valuable. The Pro3’s ability to push boundaries, scanning farther than previous models, like the Pro2, means fewer scan points and less time spent moving equipment. However, it still retains the precision necessary to ensure accurate, detailed results. </p>
                  <p className="mb-4"> Want to see it in action? View our video walkthrough. </p>
                  <div className="youtube_video_main" style={{ marginBottom: "-144px" }}>
                    <div className="video">
                      <div className="fluid-width-video-wrapper">
                        <iframe
                          src="https://www.youtube.com/embed/Bx1BTE752Yo"
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
                    id="best-practices-for-scanning-large-spaces"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Best Practices for Scanning Large Spaces </h5>
                  <p className="mb-5"> When scanning large environments like warehouses with the Matterport Pro3, adhering to best practices ensures that your final model is both comprehensive and efficient. </p>
                  <p className="mb-2">
                    <strong><span className="blue">Spacing Between Scans</span></strong>
                  </p>
                  <p className="mb-4"> One of the standout features of the Matterport Pro3 is its ability to scan large distances, but knowing when to apply different scanning techniques is key. </p>
                  <p className="mb-2">
                    <strong>The “7 and 7” Rule for Small Spaces</strong>
                  </p>
                  <p className="mb-4"> In confined or detailed areas such as doorways, hallways, or entry points, stick to the “7 and 7” rule. Placing the Matterport scanner 7 feet from one side of the entryway and another 7 feet inside to ensure full, accurate coverage. </p>
                  <p className="mb-2">
                    <strong>Extending to 30+ Feet in Open Spaces</strong>
                  </p>
                  <p className="mb-5"> Once you’ve entered a large space, you can start stretching the Pro3's legs. Thanks to its superior range, you can extend the distance between scans to 30 feet or more. This drastically reduces the time spent moving the scanner while still maintaining accuracy. </p>
                  <p className="mb-2">
                    <strong><span className="blue">Positioning for Maximum Coverage</span></strong>
                  </p>
                  <p className="mb-4"> Proper positioning of the Matterport Pro3 ensures no critical information is lost during the scan. </p>
                  <p className="mb-2">
                    <strong>Wide, Open Areas</strong>
                  </p>
                  <p className="mb-4"> In large environments, position the Pro3 at central points to capture the full breadth of the space. Placing it in the middle of aisles or large open areas minimizes the number of Matterport scans needed to cover the entire environment. </p>
                  <p className="mb-2">
                    <strong>Avoiding Obstructions</strong>
                  </p>
                  <p className="mb-4"> Ensure that the Pro3 has a clear line of sight to maximize data capture. Avoid placing it too close to large objects that could block the view or limit the depth of the scan. </p>
                  <p className="mb-2">
                    <strong>Scan from Multiple Angles</strong>
                  </p>
                  <p className="mb-5"> For particularly complex sections of the space such as those with heavy machinery or stacked inventory, scan from different angles. This ensures that all critical details are included and that no data is missed. </p>
                  <p className="mb-2">
                    <strong><span className="blue">Capturing Key Areas</span></strong>
                  </p>
                  <p className="mb-4"> When scanning large spaces, it’s essential to focus on areas that are frequently used or require specific documentation. </p>
                  <p className="mb-2">
                    <strong>Doorways and Entry Points</strong>
                  </p>
                  <p className="mb-4"> These areas should always be scanned with extra care, as they serve as transition points in the virtual model. Accurate Matterport scans here help users navigate the space more easily. </p>
                  <p className="mb-2">
                    <strong>Exterior Spacess</strong>
                  </p>
                  <p style={{ marginBottom: "-144px" }}> Don’t forget about outside environments like parking lots, delivery areas, and equipment zones. The Matterport Pro3 excels in outdoor scanning, making it easier to capture comprehensive site data beyond just the interior. </p>
                  <div
                    className="mb-5"
                    id="matter-hacks"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Matter Hacks </h5>
                  <p className="mb-4"> Matter Hacks is a series started by Actionable Insights that covers the best Matterport tips and tricks. From unique use cases of geospatial technology to exploring the various features, we cover everything you need to know about Matterport in quick and short tutorials. If you want to view the video of the tutorial instead, jump right in. </p>
                  <p style={{ marginBottom: "-144px" }}> For more tutorials, visit our <a href="https://www.youtube.com/playlist?list=PLtF55NJwJ_ZMtH3fpBfZMSwbLpFTRbZvI" target="_blank">channel</a>.</p>
                  <div
                    className="mb-5"
                    id="become-a-certified-matterport-expert-in-just-6-hours"
                  >
                  </div>
                  <div className="pb-5 pt-5"></div>
                  <h5 className="mt-5 mb-3"> Become a Certified Matterport Expert in Just 6 Hours! </h5>
                  <p className="mb-5">Matterport’s cutting-edge technology is revolutionizing the property insurance industry by bringing efficiency and transparency to the claims settlement process. At Actionable Insights, we believe in helping professionals fall in love with their jobs again, and Matterport is making that possible for both contractors and claims specialists. With the <Link to="/aimc" target="_blank">Actionable Insights Matterport Certification</Link> (AIMC) course, you'll master this transformative technology and gain the skills to seamlessly integrate it across your company. Whether it’s sales, operations, business development, risk management, or client retention, AIMC prepares you to harness Matterport's full potential for success. </p>
                  <Link to="/aimc" target="_blank" className="btn">
                    Check it out now
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

export default ScanningLargeSpacesWithAMatterportPro3;