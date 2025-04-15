import React, { Suspense } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const ScanTerminology = React.lazy(() => import("../MatterportStandards/ScanTerminology"));
import PreMitAddon from "assets/PreMitAddon.webp";
import MatterportInfographic from "assets/XACT_SUPPORTED_DEVICESl.png";
import MatterportPro2 from "assets/MatterportPro2.webp";
import PelicanAir1615Case from "assets/PelicanAir1615Case.webp";
import MatterportPro3 from "assets/MatterportPro3.webp";
import Manfrotto190X from "assets/Manfrotto190X.webp";
import SuptigUnderwaterLights from "assets/SuptigUnderwaterLights.webp";
import LightAdapters from "assets/LightAdapters.webp";
import SkeletonClampDesmondDACX1 from "assets/SkeletonClampDesmondDACX1.webp";
import AppleiPadAir from "assets/AppleiPadAir.webp";
import DoorStoppers from "assets/DoorStoppers.webp";
import BinderClips from "assets/BinderClips.webp";
import ScotchPaintersTape from "assets/ScotchPaintersTape.webp";
import AnkerPortableCharger from "assets/AnkerPortableCharger.webp";
import Insta360OneX2 from "assets/Insta360OneX2.webp";

const MatterportStandards = () => {
  return (
    <>
      <SEO
        title="Matterport Restoration Industry Standards - Actionable Insights"
        description="If there's one guide that tells you everything you need to know about Matterport's standard equipment, terminology, add-ons, etc. This is it. Read now."
        link="matterport-standards"
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
        <div className="main-container">
          <div className="Matterport_Standards">
            <div className="">
              <div className="holder">
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/27154624/Matterport_newlogo2.png"
                  alt="Matterport_newlogo"
                  loading="lazy"
                />
              </div>
              <div className="certified">
                <h2> Looking to become AI Matterport Certified? </h2>
                <h5> Learn how to make the most of Matterport's game-changing technology with our online, self-paced training and certification course. </h5>
                <div className="lm">
                  <Link to="/aimc" className="btn">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="Content">
                <h4 className="detail">
                  This page is a collection of what Actionable Insights deems the best practice of implementing the digital assets provided by Matterport into a claims environment. We will discuss the use of Mattertags, Schematic Floor Plans, and Remote Estimating.
                </h4>
                <h3 className="heading">
                  Incorporating Matterport in a Claims Environment
                </h3>
                <h4 className="detail">
                  Matterport 3D imagery is extremely useful in a claims environment with the new practice of Remote Estimating. Remote estimating is provided by immersive walkthroughs that would allow for an Estimator to walk properties from the safety of a desk, while still being able to accurately calculate the amount of work or material necessary for the completion of a job.
                </h4>
                <h3 className="heading">
                  Actionable Insights Powered Kit
                </h3>
                <h4 className="detail">
                  Actionable Insights has worked with Matterport cameras for many years, and made our way through troves of gear. After such a long time, we’ve developed an arsenal of equipment that we stand by to operate our collection of Matterport cameras. We decided to share our recommended equipment loadout with the rest of the restoration community to help keep everyone well prepared for any size property.
                </h4>
                <h5 className="sub-heading mt-5 mb-3">
                  ACTIONABLE PRO KIT
                </h5>
                <h4 className="detail">
                  Our Actionable Pro Kit is comprised of the accessories you’ll need to operate your Matteport Pro camera in the property insurance industry.
                </h4>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/iSTDs5Q"
                        target="_blank"
                      >
                        <img
                          src={MatterportPro2}
                          loading="lazy"
                          style={{
                            width: "201px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Matterport Pro2 </p>
                      <a
                        className="btn"
                        href="https://a.co/d/iSTDs5Q"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/8aoF1KR"
                        target="_blank"
                      >
                        <img
                          src={MatterportPro3}
                          loading="lazy"
                          style={{
                            width: "151px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Matterport Pro3 </p>
                      <a
                        className="btn"
                        href="https://a.co/d/8aoF1KR"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/9xMgNB2"
                        target="_blank"
                      >
                        <img
                          src={PelicanAir1615Case}
                          loading="lazy"
                          style={{
                            width: "225px",
                            height: "139px",
                          }}
                        />
                      </a>
                      <p
                        className="name"
                        style={{ marginTop: "60px" }}
                      >
                        Pelican Air 1615 Case
                      </p>
                      <a
                        className="btn"
                        href="https://a.co/d/9xMgNB2"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/iDsJ2qc"
                        target="_blank"
                      >
                        <img
                          src={Manfrotto190X}
                          loading="lazy"
                          style={{
                            width: "103px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Manfrotto 190X </p>
                      <a
                        className="btn"
                        href="https://a.co/d/iDsJ2qc"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/f0COZfU"
                        target="_blank"
                      >
                        <img
                          src={SuptigUnderwaterLights}
                          loading="lazy"
                          style={{
                            width: "152px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Suptig Underwater Lights </p>
                      <a
                        className="btn"
                        href="https://a.co/d/f0COZfU"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/3Jg21eY"
                        target="_blank"
                      >
                        <img
                          src={LightAdapters}
                          loading="lazy"
                          style={{
                            width: "150px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Light Adapters </p>
                      <a
                        className="btn"
                        href="https://a.co/d/3Jg21eY"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/gux2lTE"
                        target="_blank"
                      >
                        <img
                          src={SkeletonClampDesmondDACX1}
                          loading="lazy"
                          style={{
                            width: "234px",
                            height: "131px",
                          }}
                        />
                      </a>
                      <p
                        className="name"
                        style={{ marginTop: "68px" }}
                      >
                        Skeleton Clamp Desmond DAC-X1
                      </p>
                      <a
                        className="btn"
                        href="https://a.co/d/gux2lTE"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/22TPYip"
                        target="_blank"
                      >
                        <img
                          src={AppleiPadAir}
                          loading="lazy"
                          style={{
                            width: "149px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Apple iPad Air </p>
                      <a
                        className="btn"
                        href="https://a.co/d/22TPYip"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/hwfosX0"
                        target="_blank"
                      >
                        <img
                          src={DoorStoppers}
                          loading="lazy"
                          style={{
                            width: "162px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Door Stoppers </p>
                      <a
                        className="btn"
                        href="https://a.co/d/hwfosX0"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/8QAEVLl"
                        target="_blank"
                      >
                        <img
                          src={BinderClips}
                          loading="lazy"
                          style={{
                            width: "164px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Binder Clips </p>
                      <a
                        className="btn"
                        href="https://a.co/d/8QAEVLl"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/0SPs5Q5"
                        target="_blank"
                      >
                        <img
                          src={ScotchPaintersTape}
                          loading="lazy"
                          style={{
                            width: "114px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Scotch Painter's Tape </p>
                      <a
                        className="btn"
                        href="https://a.co/d/0SPs5Q5"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/ctB3U2K"
                        target="_blank"
                      >
                        <img
                          src={AnkerPortableCharger}
                          loading="lazy"
                          style={{
                            width: "144px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Anker Portable Charger </p>
                      <a
                        className="btn"
                        href="https://a.co/d/ctB3U2K"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                </div>
                <h5 className="sub-heading mt-5 mb-3">
                  ACTIONABLE 360 KIT
                </h5>
                <h4 className="detail">
                  Our Actionable 360 Kit is comprised of the accessories you’ll need to operate your Matteport compatible 360 camera in the property insurance industry.
                </h4>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://www.insta360.com/sal/virtual_tour_kit?insrc=INR9JGU"
                        target="_blank"
                      >
                        <img
                          src={Insta360OneX2}
                          loading="lazy"
                          style={{
                            width: "169px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Insta360 One X2 </p>
                      <a
                        className="btn"
                        href="https://www.insta360.com/sal/virtual_tour_kit?insrc=INR9JGU"
                        target="_blank"
                      >
                        Buy from Insta360
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/22TPYip"
                        target="_blank"
                      >
                        <img
                          src={AppleiPadAir}
                          loading="lazy"
                          style={{
                            width: "149px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Apple iPad Air </p>
                      <a
                        className="btn"
                        href="https://a.co/d/22TPYip"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/hwfosX0"
                        target="_blank"
                      >
                        <img
                          src={DoorStoppers}
                          loading="lazy"
                          style={{
                            width: "162px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Door Stoppers </p>
                      <a
                        className="btn"
                        href="https://a.co/d/hwfosX0"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/8QAEVLl"
                        target="_blank"
                      >
                        <img
                          src={BinderClips}
                          loading="lazy"
                          style={{
                            width: "164px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Binder Clips </p>
                      <a
                        className="btn"
                        href="https://a.co/d/8QAEVLl"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/0SPs5Q5"
                        target="_blank"
                      >
                        <img
                          src={ScotchPaintersTape}
                          loading="lazy"
                          style={{
                            width: "114px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Scotch Painter's Tape </p>
                      <a
                        className="btn"
                        href="https://a.co/d/0SPs5Q5"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mt-4">
                    <div className="ACTIONABLE_KIT">
                      <a
                        href="https://a.co/d/ctB3U2K"
                        target="_blank"
                      >
                        <img
                          src={AnkerPortableCharger}
                          loading="lazy"
                          style={{
                            width: "144px",
                            height: "169px",
                          }}
                        />
                      </a>
                      <p className="name"> Anker Portable Charger </p>
                      <a
                        className="btn"
                        href="https://a.co/d/ctB3U2K"
                        target="_blank"
                      >
                        Buy on Amazon
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <ScanTerminology />
              <div className="Matterport_Color_Standards">
                <h3 className="heading">
                  Matterport Mattertag Standards
                </h3>
                <h4 className="detail">
                  Actionable Insights has worked with Matterport to develop a standard for the use of Mattertags when working with restoration scans. Mattertags are very useful tools that can allow a user to point out, with a colorful icon, things of importance to a 3rd party viewer.
                </h4>
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16095906/Matterport-Color-Standards_Mar2020.png"
                  alt="Matterport-Color-Standards"
                  loading="lazy"
                />
              </div>
              <div className="Content">
                <h3 className="heading">
                  Schematic FloorPlan by Matterport
                </h3>
                <h4 className="detail">
                  Matterport allows its users to purchase a black-and-white floor plan that can be used in Xactimate as a layout to develop your sketch, with accurate measurements of a property. This reduces your work and risk tremendously; you may now have an Estimator/Technician safely at the office measuring each corner of a property instead of walking through yourself with a tape measure.
                </h4>
                <h5 className="sub-heading mt-5 mb-3">
                  Place your Order
                </h5>
                <h4 className="detail">
                  The Dollhouse Button must be turned on for your Space, and the Space must be set as Public or Unlisted to complete the Schematic Floor Plan.
                  Matterport will not share your link beyond what is necessary to create your Schematic Floor Plan.
                  Open your Space in Matterport Cloud and click on <b>SCHEMATIC FLOOR PLAN</b> under the <b>ADD-ONS</b> tab.
                  You must have <b>EDITOR ACCESS</b> to this Space to place your order.
                </h4>
              </div>
              <div className="Floor_Plan_One">
                <div className="Shadow">
                  <img
                    src={PreMitAddon}
                    alt="PreMitAddon"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="Content">
                <h4 className="detail">
                  Click <b>GET</b>. Choose imperial, metric, or both and confirm the order by clicking the <b>PLACE ORDER</b> button.
                </h4>
              </div>
              <div className="Floor_Plan_Two">
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16213459/Configure-and-Confirm.png"
                  alt="Configure-and-Confirm"
                  loading="lazy"
                />
              </div>
              <div className="Content">
                <h4 className="detail">
                  Matterport can only deliver floor plans for Matterport Spaces that are <b style={{ color: "#38ADA2" }}>25,000 square feet or less</b>.
                  Please contact Matterport if you have concerns about a specific space
                </h4>
              </div>
              <div className="Content">
                <h3 className="heading">
                  Matterport TruePlan™ for Xactimate
                </h3>
                <h4 className="detail">
                  Matterport <b>TruePlan™</b> is an additional deliverable that you can purchase after you’ve scanned a property and uploaded it to your Matterport Cloud account.
                  <br />
                  <br />
                  TruePlans are SKX files that you can easily import into Xactimate™. With these files, you no longer have to measure and manually sketch losses. This saves you valuable time so you can process insurance claims faster and more accurately.
                </h4>
              </div>
              <div className="Matterport_TrueSketch">
                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className="TrueSketch">
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16213609/TS-Plus-Back1.png"
                        alt="TS-Plus-Back"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="TrueSketch">
                      <img
                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16213543/Graph.png"
                        alt="Graph"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="Content">
                <h3 className="heading">
                  How to order a TruePlan™ from my.matterport.com:
                </h3>
                <h4 className="detail">
                  If the feature has been enabled on the account, anyone with Edit access to a model within the account can click on ‘TruePlan for Xactimate’ under the <b>ADD-ONS</b> tab.
                </h4>
              </div>
              <div className="Floor_Plan_One">
                <div className="Shadow">
                  <img
                    src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16213853/True-Plan-for-Xactimate.png"
                    alt="True-Plan-for-Xactimate"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="Content">
                <h4 className="detail">
                  If you do not see the option, it may not yet be enabled for your account. Matterport is working on being able to support everyone with access to TruePlan soon.
                </h4>
              </div>
              <div className="Floor_Plan_Two">
                <img
                  src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/16213732/Addon-True-Plan-for-Xactimate.png"
                  alt="Addon-True-Plan-for-Xactimate"
                  loading="lazy"
                />
              </div>
              <div className="Content">
                <h4 className="detail">
                  You can then click on <b>GET</b>. Orders typically take up to 48 hours to be delivered. CAT events can affect service levels and processing times. You will receive an email when it is ready. You’ll be able access the file from the <b>DOWNLOADS</b> tab.
                </h4>
              </div>
              <div className="Content">
                <h3 className="heading">
                  3D Property Scanning: Case Study & Results
                </h3>
                <h4 className="detail">
                  ATI Restoration has crunched the numbers and released a case
                  study, “
                  <a
                    href="https://atirestoration.com/wp-content/uploads/2021/03/3D-Property-Scanning_Final.pdf"
                    target="_blank"
                  >
                    3D Property Scanning: Case Study & Results
                  </a>
                  ,” showing how much quicker and more efficiently you can
                  settle a claim using Matterport’s technology.
                  <br />
                  <br />
                  “With 3D Scanning using Matterport’s TruePlan service, a hard
                  cost savings of (or around) $123,191.41 ($110,000.70 +
                  $13,190.71) per individual and a soft cost savings of 163 days
                  of sketching time can be achieved.”
                  <br />
                  <br />
                  You can read more here:&nbsp;
                  <a
                    href="https://atirestoration.com/wp-content/uploads/2021/03/3D-Property-Scanning_Final.pdf"
                    target="_blank"
                  >
                    3D Property Scanning: Case Study & Results
                  </a>
                </h4>
              </div>
              <div className="Content">
                <h3 className="heading">
                  Matterport Supported Cameras
                </h3>
              </div>
              <div className="Matterport_Cameras">
                <div className="Shadow">
                  <img
                    src={MatterportInfographic}
                    alt="MatterportInfographic"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="Content">
                <h3 className="heading">
                  Matterport iOS Supported Devices
                </h3>
                <h4 className="detail">
                  The iPhone or iPad is how you connect to the camera and
                  control the scanning process. Generally we recommend you use
                  the <strong>best iPhone or iPad you have available</strong>{" "}
                  (i.e most powerful and most free space).
                  <br />
                  Not sure which one you have?&nbsp;
                  <a
                    href="https://support.apple.com/en-us/HT208200"
                    target="_blank"
                  >
                    Find the model number
                  </a>
                  &nbsp;of your device, then identify your&nbsp;
                  <a
                    href="https://support.apple.com/en-us/HT201296"
                    target="_blank"
                  >
                    identify your iPhone
                  </a>
                  &nbsp;model or&nbsp;
                  <a
                    href="https://support.apple.com/en-us/HT201471"
                    target="_blank"
                  >
                    identify your iPad
                  </a>
                  &nbsp;model.
                </h4>
              </div>
              <div className="Matterport_iOS_Supported_Devices">
                <table>
                  <tbody>
                    <tr style={{ background: "#e8e8e8" }}>
                      <td className="heading"> Recommended </td>
                      <td className="heading"> Minimum </td>
                      <td className="heading"> Not Supported </td>
                    </tr>
                    <tr>
                      <td className="new" width="30%">
                        <ul>
                          <li> iPhone (6S or newer) </li>
                          <li> iPad Pro* (1st, 2nd, or 3rd generation) </li>
                          <li> iPad (6th generation) </li>
                          <li> iPad Air (2nd generation) </li>
                        </ul>
                      </td>
                      <td className="new" width="35%">
                        <ul>
                          <li> iPad (5th generation) </li>
                          <li> iPad Air** (1st generation) </li>
                          <li>
                            {" "}
                            iPad mini Retina 2, 3, 4** <br /> (NOT the original
                            iPad Mini){" "}
                          </li>
                        </ul>
                      </td>
                      <td className="new" width="45%">
                        <ul>
                          <li> iPad mini 1 </li>
                          <li> iPad 4 or earlier models </li>
                          <li>
                            {" "}
                            Using an unsupported iPad can <br /> cause the
                            Capture app to crash.{" "}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="Content">
                <h3 className="heading">
                  Matterport Capture on Android
                </h3>
                <h4 className="detail">
                  Matterport has officially released the Capture app on Google Play. With this app now generally available, anyone can Matterport their space using a Pro Series Camera or their favorite 360 camera.{" "}
                  <a
                    href="https://support.matterport.com/hc/en-us/articles/360045232233-Try-Matterport-Capture-on-Android-Beta-#before-you-begin-0-0"
                    target="_blank"
                  >
                    Read the full article here
                  </a>
                  {" "}to learn more about the requirements needed to run Capture on Android.
                </h4>
                <h3 className="heading">
                  Matterport Ninjas Facebook Page
                </h3>
                <h4 className="detail">
                  Actionable Insights prides itself with providing knowledge to anyone willing to inquire. Therefore, with Matterports support, we created a Facebook page to provide support, inspiration, and general tips for our fellow Matterport users. Members are strongly encouraged to give more than they take, but we don’t mind helping new users getting started!
                </h4>
                <h4 className="fun">
                  Click below and join in the fun!
                </h4>
              </div>
              <div className="Matterport_Ninjas">
                <a
                  href="https://www.facebook.com/groups/MatterportNinjas/"
                  target="_blank"
                >
                  <img
                    src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/12/28154240/MatterportNinjas_v2.jpg"
                    alt="MatterportNinjas"
                    loading="lazy"
                  />
                </a>
              </div>
              <div className="Content">
                <h3 className="heading">
                  Matter Hacks YouTube Series
                </h3>
                <h4 className="detail">
                  Matterport’s technology is rapidly changing the way property insurance claims are settled. Click below to join Actionable Insights as we explore the impact of incorporating 3D technology into the claims settlement process.
                </h4>
              </div>
              <div className="youtube_video">
                <div className="video_border">
                  <div className="fluid-width-video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/YTpfdXKz25E"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                      name="example"
                    />
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

export default withRouter(MatterportStandards);