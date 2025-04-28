import React, { Suspense, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { Helmet } from "react-helmet";
import { NumericFormat } from "react-number-format";
import { AppContext } from "../../../contexts/appContext";
import { 
  applyInsighterPointCoupon,
  getInsigherPointsDashboard,
  generateReferralCode,
} from "utils/api-routes/api-routes.util";
import user from "assets/user-eyes.svg";
import Xactimate_Training from "assets/Xactimate_Training_Points.svg";
import Estimating_Resources from "assets/Estimating_Resources_Points.svg";
import Matterport_Training from "assets/Matterport_Training_Points.svg";
import twitter from "assets/twitter_points.svg";
import facebook from "assets/facebook_points.svg";
import instagram from "assets/instagram_points.svg";
import linkedin from "assets/linkedin_points.svg";
import email from "assets/email_points.svg";
import link from "assets/Link.svg";
import copy from "assets/Copy.svg";
import share from "assets/ShareCode.svg";

const Points = (props) => {

  const navigate = useNavigate();

  const [loadingPage, setLoadingPage] = useState(true);

  const { getMyInsighterPoints, insighterPoints, getNavbarData, navbarData } = useContext(AppContext);

  useEffect(() => {
    getMyInsighterPoints();
    getNavbarData();
  }, []);

  const [myPoints, setMyPoints] = useState("");

  useEffect(() => {
    if (insighterPoints) {
      setMyPoints(insighterPoints.nooninsighterpoint);
    }
  }, [insighterPoints]);

  const [ReferralCode, setReferralCode] = useState([]);
  const [InsigherPointsDashboard, setInsigherPointsDashboard] = useState([]);

  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    if (navbarData) {
      setUserInfo(navbarData);
    }
  }, [navbarData]);

  useEffect(() => {
    generateReferralCode().subscribe((response) => {
      if (response.response.Requested_Action) {
        setReferralCode(response.response.data);
      } else {
        alert("error");
      }
    });
    getInsigherPointsDashboard().subscribe((response) => {
      if (response.response.Requested_Action) {
        setInsigherPointsDashboard(response.response.data);
        setLoadingPage(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const [insighterpointscouponcode, setInsighterPointsCouponCode] = useState("");
  const [insighterpointsmsg, setInsighterPointsMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
		setLoading(true);

    applyInsighterPointCoupon(insighterpointscouponcode).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setInsighterPointsCouponCode("");
        setInsighterPointsMsg(response.response.Message);
        getMyInsighterPoints();
      } else {
        setLoading(false);
        setInsighterPointsCouponCode("");
        setInsighterPointsMsg(response.response.Message);
      }
    });
  };

  function pcsh1 () {
    var x = document.getElementById("pc1");
    x.classList.add("show");
    setTimeout(() => {
      x.classList.remove("show");
    }, 1500);
  };

  function pcsh2 () {
    var x = document.getElementById("pc1");
    x.classList.add("visible");
    setTimeout(() => {
      x.classList.remove("visible");
    }, 2500);
  };

	return (
		<>
			<Helmet>
				<title> 
					Insighter Points - Actionable Insights
				</title>
			</Helmet>
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
        <div className="custom-copy-text" id="pc1">
          Copied to Clipboard
        </div>
				<div className="main-container">
					<div className="Insighter_Points">
						<div className="">
							<div className="holder">
								<h2> Insighter Points Dashboard </h2>
                <h3> Insighter Points are rewards that members can redeem for training and resources! </h3>
							</div>
              {!loadingPage && (
                <div className="insighter-points-inner">
                  <div className="col">
                    <div className="row points-sec-2">
                      <div className="col-xl-6 col-lg-6 col-md-12 sec-1 p-0">
                        <h2> Unique Insighter Referral Code: </h2>
                        <div className="container">
                          <div className="image">
                            <img
                              src={share}
                              alt="share"
                              loading="lazy"
                            />
                          </div>
                          <div className="text">
                            <h5> Refer 1 friend </h5>
                            <span> Get 70 Insighter points for every friend you refer to Actionable Insights. </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-12 sec-2 p-0">
                        <p className="custom-refer-message">
                          <div className="row">
                            <div className="col-xl-1 col-md-1 col-2">
                              <img
                                src={link}
                                alt="link"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-xl-7 col-md-7 col-10 text-left">
                              <span> {ReferralCode.url} </span>
                            </div>
                            <div className="col-xl-4 col-md-4 col-12 text-right" style={{ paddingLeft: "0px" }}>
                              <button
                                className="btn"
                                onClick={() => {
                                  navigator.clipboard.writeText(`${ReferralCode.url}`);
                                  pcsh1();
                                  pcsh2();
                                }}
                              >
                                <img
                                  src={copy}
                                  alt="copy"
                                  loading="lazy"
                                  style={{ marginRight: "5px" }}
                                />
                                Copy code
                              </button>
                            </div>
                          </div>
                        </p>
                        <div className="social-links">
                          <a
                            href={`https://www.facebook.com/sharer.php?u=${ReferralCode.url}`}
                            target="_blank"
                          >
                            <img 
                              src={facebook}
                              alt="facebook"
                              loading="lazy"
                            />
                          </a>
                          <a
                            href="https://www.instagram.com/actionable_insights/"
                            target="_blank"
                          >
                            <img
                              src={instagram}
                              alt="instagram"
                              loading="lazy"
                            />
                          </a>
                          <a
                            href={`https://www.linkedin.com/shareArticle?url=${ReferralCode.url}`}
                            target="_blank"
                          >
                            <img
                              src={linkedin}
                              alt="linkedin"
                              loading="lazy"
                            />
                          </a>
                          <a
                            href={`mailto:enteryour@addresshere.com?subject=Click%20on%20this%20link%20&body=Check%20this%20out:%20${ReferralCode.url}`}
                          >
                            <img
                              src={email}
                              alt="email"
                              loading="lazy"
                            />
                          </a>
                          <a
                            href={`https://twitter.com/share?url=${ReferralCode.url}`}
                            target="_blank"
                          >
                            <img
                              src={twitter}
                              alt="twitter"
                              loading="lazy"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-12">
                      <div className="points-sec-1">
                        <h3> Your Insighter Points </h3>
                        <img
                          className="profile-image"
                          src={userInfo.profilePicture ? userInfo.profilePicture : user}
                          alt="user"
                          loading="lazy"
                        />
                        <h4> {userInfo.firstname} {userInfo.lastname} </h4>
                        <h3 
                          style={{ 
                            borderBottom: "none",
                            marginBottom: "0px",
                          }}
                        > 
                          Insighter Points 
                        </h3>
                        <div className="pts"> 
                          <NumericFormat
                            value={myPoints}
                            displayType={"text"}
                            thousandSeparator={true}
                          /> 
                          &nbsp;<sup>PTS</sup>
                        </div> 
                        {/* <button
                          className="btn"
                          onClick={() => navigate("/shop/buy-points/insighter-points")}
                        >
                          Buy Insighter Points
                        </button> */}
                        <h3 
                          style={{ 
                            borderBottom: "none",
                            marginBottom: "0px",
                            borderTop: "1px solid #d1d1d1",
                            lineHeight: "25px",
                          }}
                        > 
                          Apply Insighter 
                          <br />
                          Points Codes 
                        </h3>
                        <h5> Insighter Point Code </h5>
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="code"
                                  className="form-control"
                                  placeholder="Enter"
                                  required
                                  value={insighterpointscouponcode}
                                  onChange={(e) => setInsighterPointsCouponCode(e.currentTarget.value)}
                                />
                              </div>
                            </div>
                          </div>
                          {insighterpointsmsg && (
                            <div className="IP_Deposit_Msg">
                              <span style={insighterpointsmsg.includes("Balance") ? { color: "#26A69A" } : {}}> 
                                {insighterpointsmsg}
                              </span>
                            </div>
                          )}
                          {!loading && (
                            <button 
                              className="btn"
                              type="submit"
                            >
                              Redeem
                            </button>
                          )}
                          {loading && (
                            <button 
                              disabled
                              className="btn"
                            >
                              <i className="fas fa-spinner fa-spin"></i>
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12">
                      <div className="points-sec-1">
                        <h3> Ways To Use Your Points </h3>
                        <div className="custom-content">
                          <div className="row"> 
                            <div className="col-2 content-1">
                              <img
                                src={Xactimate_Training}
                                alt="Xactimate Training"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-10 content-2">
                              <Link
                                to="/events"
                                className="link-1"
                              >
                                Xactimate Training
                              </Link>
                              <p> Master Xactimate price lists and line items with our online training. Refine your estimating skillset, improve formatting & organization, and equip yourself with the tools and perspective to succeed in claims settlement. </p>
                              <Link
                                to="/events"
                                className="link-2"
                              >
                                Redeem for xactimate training
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="custom-content">
                          <div className="row"> 
                            <div className="col-2 content-1">
                              <img
                                src={Matterport_Training}
                                alt="Matterport Training"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-10 content-2">
                              <Link
                                to="/aimc"
                                className="link-1"
                              >
                                Matterport Training
                              </Link>
                              <p> Make the most of your Matterport investment with our Al Matterport Certification Course! Improve your best practices for scanning, documenting, and invoicing for scans and digital assets with this 4.5 hour video course. </p>
                              <Link
                                to="/aimc"
                                className="link-2"
                              >
                                Redeem for matterport training
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="custom-content">
                          <div className="row"> 
                            <div className="col-2 content-1">
                              <img
                                src={Estimating_Resources}
                                alt="Estimating Resources"
                                loading="lazy"
                              />
                            </div>
                            <div className="col-10 content-2">
                              <Link
                                to="/macros"
                                className="link-1"
                              >
                                Estimating Resources
                              </Link>
                              <p> Equip yourself with a toolbox unlike any other in the industry. Add Actionable Xactimate Macros to your invoicing resources via Insighter Points here. </p>
                              <Link
                                to="/macros"
                                className="link-2"
                              >
                                Redeem for estimating resources
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12">
                      <div className="points-sec-1">
                        <h3> Earned Points To Date </h3>
                        <div className="pts"> 
                          <NumericFormat
                            value={InsigherPointsDashboard.totalearned}
                            displayType={"text"}
                            thousandSeparator={true}
                          /> 
                          &nbsp;<sup>PTS</sup>
                        </div> 
                        <div className="example"> 10 points are equal to $1. For example: 2,000 Insighter Points equate to $200 USD. </div>
                        <h3
                          style={{ 
                            borderBottom: "none",
                            marginBottom: "0px",
                          }}
                        > 
                          Trailing 12 Months
                        </h3>
                        <div className="pts"> 
                          <NumericFormat
                            value={InsigherPointsDashboard.totalearnedinlast12months}
                            displayType={"text"}
                            thousandSeparator={true}
                          /> 
                          &nbsp;<sup>PTS</sup>
                        </div>
                        <div className="example"> Insighter Points earned within the last trailing 12 months </div>
                        <Link
                          to="/my-account/view-log"
                          className="review_activity"
                        >
                          Review Activity
                        </Link>
                        <div 
                          className="example"
                          style={{ 
                            borderBottom: "none",
                            marginBottom: "0px",
                          }}
                        > 
                          Review all your earnings and deductions of Insighter Points here.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {loadingPage && (
                <div className="loader-inner">
                  <LottieLoader />
                </div>
              )}
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

export default Points;