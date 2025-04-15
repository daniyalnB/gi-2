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
import frame from "assets/Frame8.svg";

const XactimateTrainingOnline = () => {

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
        title="Learn Xactimate Online with Actionable Insights Bootcamp"
        description="You don't have to be on-site to learn Xactimate. Now you can join online Xactimate and Actionable Alert courses and we have just the one you need. Explore more now."
        link="xactimate-training-online"
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
                  Learn Xactimate Online: Flexible,
                  <br />
                  Convenient, and Comprehensive
                </h1>
                <p> By Team Actionable | Feb 12, 2025 </p>
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
                  Whether you’re an insurance adjuster, contractor, or restoration specialist, learning Xactimate opens doors to better career opportunities and improved efficiency. Today, the most flexible and accessible way to gain these skills is through online Xactimate courses.
                  <br /><br />
                  In this blog, we’ll explore why Xactimate is essential, the benefits of learning Xactimate online, and the tools you need to get started. Plus, we’ll introduce our intensive Xactimate training BootCamp, designed to help you become proficient in just two days. If you’re ready to enhance your skills, improve your workflow, and build credibility in the industry, this is for you.          
                </p>
                <h2 className="mt-5 mb-3">
                  What is <span className="red">Xactimate</span> and Why is it Important?
                </h2>
                <p className="mb-0">
                  <a href="https://xactimate.com/home/" target="_blank" className="red">
                    Xactimate
                  </a> is the industry-leading estimating software for property insurance claims, construction, and restoration. Developed by{" "}
                  <a href="https://www.verisk.com/" target="_blank">
                    Verisk
                  </a>, it simplifies the process of creating detailed, accurate estimates for property repairs caused by natural disasters, accidents, or everyday damages. The software enables users to estimate costs for materials, labor, and other expenses by leveraging a comprehensive database of localized pricing information. To excel in this essential skill, learning Xactimate online through dedicated Xactimate training programs is the best way to get started.
                </p>
                <h2 className="mt-5 mb-3">
                  Why is <span className="red">Xactimate</span> the Industry Standard?
                </h2>
                <p className="mb-2"> Xactimate is trusted by insurance carriers, contractors, and independent adjusters worldwide because of its unmatched ability to create precise, detailed, and consistent estimates. Here’s why Xactimate has earned its reputation: </p>
                <ul className="mb-0">
                  <li className="black mb-2"><span>Accurate and Detailed Estimates:</span> Xactimate’s robust pricing database ensures estimates reflect up-to-date local material and labor costs with transparency and clarity.</li>
                  <li className="black mb-2"><span>Standardized for the Industry:</span> Xactimate ensures a common platform for adjusters, contractors, and claims managers, reducing inconsistencies and streamlining communication during the claims process.</li>
                  <li className="black mb-2"><span>Efficiency and Reliability:</span> Xactimate automates complex tasks like sketching floor plans, calculating measurements, and managing revisions. This saves time while delivering reliable results.</li>
                  <li className="black mb-2"><span>Integration Across Systems:</span> Xactimate integrates with other tools, claim systems, and reporting platforms, creating a seamless workflow for professionals.</li>
                </ul>
                <h2 className="mt-5 mb-3">
                  Why Should You Learn <span className="red">Xactimate</span>?
                </h2>
                <h5 className="mb-3"> 1. Write Accurate Estimates to Avoid Losses </h5>
                <p className="mb-4">
                  Proficiency in Xactimate is critical for creating accurate estimates that reflect the true costs of repairs. Inaccurate or incomplete estimates can lead to financial losses, disputes, or project delays. Failing to include essential repairs or underestimating costs can impact profits and client satisfaction. By enrolling in online Xactimate courses, you can learn to produce precise, reliable estimates every time.
                </p>
                <h5 className="mb-3"> 2. Boost Your Workflow and Efficiency </h5>
                <p className="mb-4">
                  Xactimate offers tools that significantly improve your workflow, saving you time and effort. Features like macros and templates streamline repetitive tasks, reducing manual effort and minimizing errors. With the right Xactimate training, you can master these tools to enhance productivity and complete estimates faster.
                </p>
                <h5 className="mb-3"> 3. Increase Career Opportunities and Earnings </h5>
                <p className="mb-4">
                  Xactimate proficiency is a highly sought-after skill in the insurance and construction industries. Employers and clients prioritize professionals who can provide accurate, detailed, and timely estimates. Learning Xactimate online gives you the competitive edge needed to unlock higher-paying roles and grow your career.
                </p>
                <h5 className="mb-3"> 4. Build Credibility and Trust </h5>
                <p className="mb-0">
                  Clients and insurance carriers rely on accurate estimates to make important financial decisions. By mastering Xactimate through online Xactimate courses, you demonstrate your expertise and commitment to professionalism. This builds trust with clients, insurance companies, and partners in the field.
                </p>
                <h2 className="mt-5 mb-3">
                  Benefits of <span className="blue">Learning</span> Xactimate Online
                </h2>
                <p className="mb-3">
                  Learning Xactimate online offers a flexible, efficient, and cost-effective way to gain proficiency in the industry-leading estimating software. Whether you're an insurance adjuster, contractor, or restoration professional, online Xactimate courses provide significant advantages that make learning Xactimate easier and more convenient than ever.
                </p>
                <h5 className="mb-2"> Learn from Anywhere </h5>
                <p className="mb-3">
                  One of the biggest advantages of choosing to learn Xactimate online is flexibility. Unlike in-person sessions that require physical attendance, Xactimate training online allows you to learn from anywhere- whether at home, the office, or even on-site, making online learning ideal for busy professionals.
                </p>
                <h5 className="mb-2"> Save Time and Money </h5>
                <p className="mb-3">
                  With online Xactimate training, there’s no need to spend time or money traveling to physical classes. Traditional in-person sessions often come with hidden costs like transportation, hotel stays, and meals. Online Xactimate courses eliminate these expenses, offering a cost-effective way to achieve the same high-quality learning experience. Plus, you save valuable time that would otherwise be spent commuting.
                </p>
                <h5 className="mb-2"> Access Expert-Led Instruction </h5>
                <p className="mb-0">
                  Many online Xactimate courses are taught by industry professionals with years of real-world experience. These expert trainers guide you through every step, from basic sketching to advanced estimating techniques. By learning directly from certified professionals, you gain insights into best practices and practical applications that improve the accuracy and efficiency of your estimates.
                </p>
                <h2 className="mt-5 mb-3">
                  Tools and Software <span className="red">Requirements</span> for Learning Xactimate Online
                </h2>
                <p className="mb-3">
                  To get the most out of your journey to learn Xactimate online, it’s essential to have the right tools and setup. Here’s a quick overview of what you’ll need to excel in online Xactimate courses and complete your Xactimate training successfully:
                </p>
                <h5 className="mb-2"> 1. Xactimate Subscription </h5>
                <p className="mb-3">
                  To participate in any online Xactimate course, you’ll need access to the Xactimate software. Depending on your preference and workflow, you can choose between the desktop version or the cloud-based option. Make sure your subscription is active so you can practice the tools and features covered in your training.
                </p>
                <h5 className="mb-2"> 2. System Requirements </h5>
                <p className="mb-3">
                  A reliable computer is crucial for smooth performance during your Xactimate training. Ensure your device meets the minimum system requirements for Xactimate to avoid interruptions while learning.
                </p>
                <div className="comparison-table mb-4">
                  <table>
                    <tbody>
                      <tr>
                        <td width="15%">Processor</td>
                        <td width="85%">Quad-core x64-bit processor (e.g., Intel Core i5 or Core i7, AMD A10 or FX)</td>
                      </tr>
                      <tr>
                        <td width="15%">Video Card</td>
                        <td width="85%">OpenGL 4.1-compatible graphics with 4 GB of VRAM and the latest drivers</td>
                      </tr>
                      <tr>
                        <td width="15%">Memory</td>
                        <td width="85%">16 GB of RAM or more</td>
                      </tr>
                      <tr>
                        <td width="15%">Hard Drive</td>
                        <td width="85%">30 GB of continual free space and a solid-state drive (SSD)</td>
                      </tr>
                      <tr>
                        <td width="15%">Resolution</td>
                        <td width="85%">Monitor resolution set at 1920x1080 with 100% scaling or similar/higher quality</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h5 className="mb-2"> 3. High-Speed Internet </h5>
                <p className="mb-0">
                  Stable internet connectivity is essential for accessing live sessions and downloading course materials. A fast, reliable internet connection ensures you get the most out of your online Xactimate courses without delays or buffering issues.
                </p>
                <h2 className="mt-5 mb-3">
                  <span className="red">Free</span> vs. <span className="blue">Paid</span> Online Xactimate Training
                </h2>
                <p className="mb-3">
                  When deciding to learn Xactimate online, you’ll encounter both free and paid options. Each has its benefits and limitations, so it’s important to choose the right path for your needs.
                </p>
                <h5 className="mb-2"> Free Training Resources </h5>
                <p className="mb-3">
                  Free resources like YouTube videos, forums, and basic guides can provide a helpful introduction to Xactimate. These are great for exploring the software at a surface level and understanding its basic functionality.
                </p>
                <h5 className="mb-2"> Limitations of Free Training </h5>
                <p className="mb-3">
                  While free resources are accessible, they often lack the depth and structure needed to truly master Xactimate. They may not include real-world examples or hands-on practice, leaving learners unprepared for professional challenges.
                </p>
                <h5 className="mb-2"> Advantages of Paid Training </h5>
                <p className="mb-0">
                  Enrolling in online Xactimate courses or paid training ensures access to expert instruction, comprehensive content, and hands-on projects. These programs are designed to provide practical skills, structured learning paths, and direct guidance from industry professionals to become proficient in Xactimate.
                </p>

                <h2 className="mt-5 mb-3">
                  Why <span className="blue">Learning</span> Xactimate Online is the Future of Training
                </h2>
                <p className="mb-3">
                  The shift toward virtual learning has transformed professional training, making it easier than ever to learn Xactimate online.
                </p>
                <h5 className="mb-2"> Scalable and Accessible Learning </h5>
                <p className="mb-3">
                  Online training offers a scalable, flexible solution for both individual learners and large teams. It eliminates geographical barriers, allowing anyone to enroll in online Xactimate courses regardless of location.
                </p>
                <h5 className="mb-2"> Adapting to Industry Trends </h5>
                <p className="mb-3">
                  As remote work and digital tools become standard across industries, the demand for online training continues to grow. Virtual learning provides a cost-effective and efficient way to stay competitive in a fast-paced environment.
                </p>
                <h5 className="mb-2"> Effective Alternative to In-Person Training </h5>
                <p className="mb-0">
                  Xactimate training online combines convenience and practicality, offering the same high-quality instruction without the need for travel or fixed schedules. This flexibility ensures learners can develop their skills while balancing work and other commitments.
                </p>

                <h2 className="mt-5 mb-3">
                  Introducing <span className="blue">Actionable Insights</span> Xactimate BootCamp
                </h2>
                <p className="mb-3">
                  Our Xactimate BootCamp is an intensive, hands-on training program designed to fast-track your proficiency in Xactimate. Whether you’re a seasoned professional or new to the industry, this two-day comprehensive course equips you with the skills and insights needed to master Xactimate’s best practices and advanced tools.
                </p>
                <p className="mb-3">
                  This BootCamp is ideal for
                </p>
                <ul className="mb-3">
                  <li className="black mb-2"><span>Adjusters:</span> Field and desk adjusters looking to streamline claims processes.</li>
                  <li className="black mb-2"><span>Contractors:</span> Professionals needing accurate estimates to secure fair compensation.</li>
                  <li className="black mb-2"><span>Restoration Specialists:</span> Those working in property restoration and repair.</li>
                  <li className="black mb-2"><span>Industry Newcomers:</span> Individuals eager to build a strong foundation in Xactimate.</li>
                </ul>
                <p className="mb-3">
                  Whether you’re starting from scratch or building on prior knowledge, this is the ultimate program to learn Xactimate online and master the software.
                </p>

                <h2 className="mt-5 mb-3">
                  What Makes Our <span className="red">BootCamp</span> Unique?
                </h2>
                <h5 className="mb-2"> 1. Expert-Led Training </h5>
                <p className="mb-3">
                  Our BootCamp is led by Xactimate Certified Trainers (XCTs) with years of real-world experience. These professionals provide actionable insights into Xactimate’s best practices, helping you maximize the software’s potential.
                </p>
                <h5 className="mb-2"> 2. Hands-On Learning </h5>
                <p className="mb-3">
                  Participants work on real-world claim examples and Xactimate projects, ensuring practical, application-based learning. This approach helps you gain confidence in handling real-world scenarios.
                </p>
                <h5 className="mb-2"> 3. Comprehensive Curriculum </h5>
                <p className="mb-3">
                  We cover every aspect of Xactimate, from foundational to advanced skills, including:
                </p>
                <ul className="mb-3">
                  <li className="black mb-2"><span>Day One:</span> An overview of Xactimate’s history and future, focusing on learning the price list and best practices for using the software efficiently and effectively.</li>
                  <li className="black mb-2"><span>Homework Assignment:</span> Deepen your understanding of Xactimate's evolution and anticipate its future impact on the industry.</li>
                  <li className="black mb-2"><span>Day Two:</span> Master the Actionable Xactimate Profile, learning how to apply it to streamline your estimating process and increase accuracy.</li>
                </ul>
                <p className="mb-3">
                  By focusing on both the software’s core functionalities and cutting-edge utilities like XactXpert, we ensure you leave the BootCamp fully equipped to succeed.
                </p>
                <h5 className="mb-2"> 4. Interactive Format </h5>
                <p className="mb-3">
                  Our BootCamp features live instruction, interactive Q&A sessions, and collaborative learning opportunities. This ensures you receive personalized feedback and can engage directly with instructors for deeper understanding.
                </p>
                <h5 className="mb-2"> 5. Fast Results </h5>
                <p className="mb-3">
                  Unlike lengthy courses, our BootCamp ensures you achieve proficiency in Xactimate in just two days. By the end of the program, you’ll have the tools and confidence to tackle any claim or project with ease.
                </p>

                <h2 className="mt-5 mb-3">
                  Why Choose Our <span className="red">BootCamp</span>?
                </h2>
                <p className="mb-3">
                  If you’re serious about mastering Xactimate, there’s no better way to do it than through our focused, expert-led program. Whether you’re exploring online Xactimate courses for the first time or looking to refine your skills, our BootCamp delivers the comprehensive, hands-on Xactimate training you need to excel in the field.
                </p>

                <h2 className="mt-5 mb-3">
                  How to Register for <span className="blue">Actionable Insights</span> Xactimate BootCamp
                </h2>
                <ul className="mb-3">
                  <li className="black mb-2">Visit our website <Link to="/" target="_blank">www.getinsights.org</Link>. </li>
                  <li className="black mb-2">From the top navigation menu, go to <Link to="/events" target="_blank">Events</Link>. There you will see the tentative dates of all upcoming monthly Bootcamps.</li>
                  <li className="black mb-2">Click on the session that best aligns with your availability.</li>
                  <li className="black mb-2">Register by filling out the form at the bottom of the page.</li>
                </ul>

                <h2 className="mt-5 mb-3">
                  In Conclusion
                </h2>
                <p className="mb-3">
                  If you’re looking to build your career in property insurance claims, construction, or restoration, there’s no better time to start than now. With the flexibility and convenience of online Xactimate courses, you can learn at your own pace while gaining the expertise needed to excel. Structured Xactimate training like our BootCamp provides the hands-on experience and expert guidance to truly master the software.
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

export default withRouter(XactimateTrainingOnline);