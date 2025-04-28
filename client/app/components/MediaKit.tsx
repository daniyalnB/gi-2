import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import ReactReadMoreReadLess from "react-read-more-read-less";
import eye from "assets/logo_eye.svg";
import logo_white from "assets/Logo_Footer.svg";
import logo_red from "assets/Logo.svg";
import ai_white from "assets/APLogoBlack.svg";
import ai_red from "assets/APLogoWhite.svg";
import Whatley from "assets/Whatley.webp";
import Cole from "assets/Cole.webp";
import Seth from "assets/Seth.webp";
import Derek from "assets/Derek.webp";
import Charlie from "assets/Charlie.webp";

const MediaKit = () => {
  return (
    <>
			<SEO
        title="Media Kit - Actionable Insights"
        description="Download our media kit when you need to use our brand assets"
        link="media-kit"
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
					<div className="MediaKit">
						<div className="">
							<div className="holder">
								<div className="sub-holder">
                  <h1> Actionable Insights Media Kit </h1>
                  <p> Download official Actionable Insights logos, colors. </p>
                </div>
                <div className="eye_icon">
                  <img
                    src={eye}
                    alt="eye"
                    loading="lazy"
                  />
                </div>
							</div>
              <div className="row mb-3">
                <div className="col-md-6 col-sm-12 mt-5">
                  <div className="logo-box1 p-5">
                    <img
                      src={logo_white}
                      alt="logo_white"
                      loading="lazy"
                    />
                  </div>
                  <h1 className="mediaTitle">
                    AI Logo on Black
                  </h1>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/AILogoOnBlack_1.zip"
                    className="logo-download"
                    download="AILogoOnBlack.zip"
                  >
                    Download Logo pack
                  </a>
                </div>
                <div className="col-md-6 col-sm-12 mt-5">
                  <div className="logo-box2 p-5">
                    <img
                      src={logo_red}
                      alt="logo_red"
                      loading="lazy"
                    />
                  </div>
                  <h1 className="mediaTitle">
                    AI Logo on White
                  </h1>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/AILogoOnWhite_1.zip"
                    className="logo-download"
                    download="AILogoOnWhite.zip"
                  >
                    Download Logo pack
                  </a>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 col-sm-12 mt-5">
                  <div className="logo-box1 p-5">
                    <img
                      className="ai_logo"
                      src={ai_white}
                      alt="ai_white"
                      loading="lazy"
                    />
                  </div>
                  <h1 className="mediaTitle">
                    AP Logo on Black
                  </h1>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/APLogoOnBlack_2.zip"
                    className="logo-download"
                    download="APLogoOnBlack.zip"
                  >
                    Download Logo pack
                  </a>
                </div>
                <div className="col-md-6 col-sm-12 mt-5">
                  <div className="logo-box2 p-5">
                    <img
                      className="ai_logo"
                      src={ai_red}
                      alt="ai_red"
                      loading="lazy"
                    />
                  </div>
                  <h1 className="mediaTitle">
                    AP Logo on White
                  </h1>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/APLogoOnWhite_2.zip"
                    className="logo-download"
                    download="APLogoOnWhite.zip"
                  >
                    Download Logo pack
                  </a>
                </div>
              </div>
              <div className="row mt-5 mb-3">
                <div className="col-md-3 col-sm-6 col-xs-12 mt-5">
                  <div className="color-info color-box1">
                    Teal
                  </div>
                  <p className="color-info-text mt-3">
                    CMYK: 72, 6, 43, 0
                    <br />
                    RGB: 56, 172, 162
                    <br />
                    HTML: #38ADA2
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 mt-5">
                  <div className="color-info color-box2">
                    Tango
                  </div>
                  <p className="color-info-text mt-3">
                    CMYK: 7, 85, 85, 1
                    <br />
                    RGB: 219, 66, 45
                    <br />
                    HTML: #DB422D
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 mt-5">
                  <div className="color-info color-box3">
                    Black
                  </div>
                  <p className="color-info-text mt-3">
                    CMYK: 91, 79, 62, 97
                    <br />
                    RGB: 0, 0, 0
                    <br />
                    HTML: #000000
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 mt-5">
                  <div className="color-info color-box4">
                    Grey
                  </div>
                  <p className="color-info-text mt-3">
                    CMYK: 31, 23, 24, 4
                    <br />
                    RGB: 184, 184, 184
                    <br />
                    HTML: #B8B8B8
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 mt-5">
                  <div className="color-info color-box5">
                    Light Teal
                  </div>
                  <p className="color-info-text mt-3">
                    CMYK: 16, 0, 8, 0
                    <br />
                    RGB: 212, 237, 234
                    <br />
                    HTML: #d4edea
                  </p>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-md-6 col-sm-6 col-xs-12 mt-5">
                  <div className="owner-profile">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <img
                          className="whatley"
                          src={Whatley}
                          alt="Whatley"
                          loading="lazy"
                        />
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12">
                        <h1> Mark Whatley </h1>
                        <h2> Founder & Chairman </h2>
                        <p>
                          <ReactReadMoreReadLess
                            charLimit={272}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more"
                            readLessClassName="read-less"
                          >
                            Mark Whatley (AKA “Whatley”) is an entrepreneur with over 10 years of restoration industry experience that incorporates all aspects of a loss, from mitigation to repair. As an Xactimate Certified Trainer, a Matterport Certified Trainer, and a licensed general contractor, Whatley’s hands-on expertise in the industry provides context for his drive and problem-solving persona. He currently serves as President of sureti, a third-party fund control payment company. He is also a founder of Actionable Insights, a non-profit that establishes adjusting guidelines that serve as a baseline for noble claims settlement. He is the author of The Umpire’s Mitigation Manual and the Umpire’s Repair Manual, two publications that have formed the foundation of the 3000+ page Insight Sheet Database that has essentially become the Wikipedia of Xactimate invoicing templates.
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/Whatley.png"
                    target="_blank"
                    className="download-headshot"
                    download="Whatley.png"
                  >
                    Download Headshot
                  </a>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 mt-5">
                  <div className="owner-profile">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <img
                          className="seth"
                          src={Seth}
                          alt="Seth"
                          loading="lazy"
                        />
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12">
                        <h1> Seth Harrison </h1>
                        <h2> Executive Director </h2>
                        <p>
                          <ReactReadMoreReadLess
                            charLimit={267}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more"
                            readLessClassName="read-less"
                          >
                            Seth Harrison. After learning the ins and outs of claims settlement as a project manager/program estimator, Harrison joined Actionable Insights in 2017 to co-author a 3000+ page book of Xactimate invoicing templates. As an Xactimate Certified Trainer and Matterport Certified Trainer, Harrison has traveled the country to help estimators and adjusters adopt remote/centralized job processes to improve industry efficiency and reduce claims friction. With our newest and most impactful resource yet, the Actionable Xactimate Profile which provides live estimating guidance while you work, Harrison works to ensure all property insurance professionals have access to the resources and tools that will help them love what they do.
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/Seth.png"
                    target="_blank"
                    className="download-headshot"
                    download="Seth.png"
                  >
                    Download Headshot
                  </a>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 mt-5">
                  <div className="owner-profile">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <img
                          src={Cole}
                          alt="Cole"
                          loading="lazy"
                        />
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12">
                        <h1> Cole Marting </h1>
                        <h2> Associate Director of Membership Services </h2>
                        <p>
                          <ReactReadMoreReadLess
                            charLimit={260}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more"
                            readLessClassName="read-less"
                          >
                            After spending his early career in the nation’s capital influencing politics, Marting joined Actionable Insights with a mission of helping people navigate the politics of the property insurance industry. He now helps the materially interested parties to the claim fall in love with their jobs again, all while bringing their businesses to the next level and enabling noble claims settlement.
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/Cole.png"
                    target="_blank"
                    className="download-headshot"
                    download="Cole.png"
                  >
                    Download Headshot
                  </a>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 mt-5">
                  <div className="owner-profile">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <img
                          style={{ background: "#DB422D" }}
                          src={Derek}
                          alt="Derek"
                          loading="lazy"
                        />
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12">
                        <h1> Derek Stone </h1>
                        <h2> Associate Director of Membership Resources </h2>
                        <p>
                          <ReactReadMoreReadLess
                            charLimit={236}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more"
                            readLessClassName="read-less"
                          >
                            Derek Stone is a twenty-year industry veteran who has worked for private contractors, franchises, and has served as a carrier residential property claims adjuster. He is an Xactimate Certified Trainer, IICRC Triple Master and AMRS designee. He first met the Actionable Insights crew during a training engagement and fell in love with the goals and spirit of the organization, joining the mission promoting noble claims settlements in 2023.
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/Derek_2.png"
                    target="_blank"
                    className="download-headshot"
                    download="Derek.png"
                  >
                    Download Headshot
                  </a>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 mt-5">
                  <div className="owner-profile">
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <img
                          className="charlie"
                          src={Charlie}
                          alt="Charlie"
                          loading="lazy"
                        />
                      </div>
                      <div className="col-lg-8 col-md-12 col-sm-12">
                        <h1> Charlie Fehrman </h1>
                        <h2> Membership Resources Associate </h2>
                        <p>
                          <ReactReadMoreReadLess
                            charLimit={236}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more"
                            readLessClassName="read-less"
                          >
                            Charlie Fehrman has spent time on construction sites from his Grandma’s back porch to nuclear power plants - and everything in between. A firm believer in efficiency and improvement, his move to Actionable Insights is a natural extension of his love for teaching, his experience in the construction field, and his time as the Director of Construction Services for a large restoration company.
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://getinsights2-data.s3.amazonaws.com/Charlie_2.png"
                    target="_blank"
                    className="download-headshot"
                    download="Charlie.png"
                  >
                    Download Headshot
                  </a>
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

export default MediaKit;