import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
const Banner = React.lazy(() => import("../components/Banner"));
import { AuthContext } from "../../contexts/authContext";
import { AppContext } from "../../contexts/appContext";
import { GetLiveSessionDetails } from "../../utils/api-routes/api-routes.util";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import logo from "assets/Logo.svg";
import search from "assets/search.svg";
import user from "assets/user-eyes.svg";
import live from "assets/Live.gif";
import MenuIcon from "assets/menu-icon.svg"

const Navbar = (props) => {
  
  const navigate = useNavigate();

  const [activeMenus, setActiveMenus] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    mobile: false,
  });

  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const dropdownRef3 = useRef<HTMLDivElement>(null);
  const dropdownRef4 = useRef<HTMLDivElement>(null);
  const dropdownRef5 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check for each dropdown
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setActiveMenus(prev => ({...prev, menu1: false}));
      }
      
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setActiveMenus(prev => ({...prev, menu2: false}));
      }
      
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setActiveMenus(prev => ({...prev, menu3: false}));
      }

      if (
        dropdownRef4.current &&
        !dropdownRef4.current.contains(event.target)
      ) {
        setActiveMenus(prev => ({...prev, menu4: false}));
      }
      
      if (
        dropdownRef5.current &&
        !dropdownRef5.current.contains(event.target)
      ) {
        setActiveMenus(prev => ({...prev, mobile: false}));
      }
      // Add more conditions for other dropdowns
    };
  
    window.addEventListener("click", handleClickOutside);
  
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleActive = (menuId, event) => {
    event.stopPropagation();
    
    setActiveMenus(prev => {
      // Create new state object with all menus closed
      const newState: typeof prev = { ...prev };
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      
      // Toggle only the clicked menu
      newState[menuId] = !prev[menuId];
      
      return newState;
    });
  };
  
  const { logoutCustomer } = useContext(AuthContext);
  const { getCustomerInfo, myInfo, getMyInsighterPoints, insighterPoints, getMyEncryptedDataFunction, encryptedData, getNavbarData, navbarData, onTrial } = useContext(AppContext);

  const handleLogout = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      logoutCustomer();
    }, 1000);
  };
  
  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
      getMyInsighterPoints();
      getMyEncryptedDataFunction();
      getNavbarData();
    }
  }, []);

  const [isTrial, setIsTrial] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setIsTrial(myInfo.subscriptioninfo.subscriptionstatus === "Trial" ? true : false);
    }
  }, [myInfo]);

  const [navbarInfo, setNavbarInfo] = useState(false);
  const [lastNameCheck, setLastNameCheck] = useState("");

  useEffect(() => {
    if (navbarData) {
      setNavbarInfo(navbarData);
      if (navbarData.lastname.length >= 15) {
        setLastNameCheck("ac-15");
      } else  if (navbarData.lastname.length < 15 && navbarData.lastname.length >= 10) {
        setLastNameCheck("ac-14-10")
      } else  if (navbarData.lastname.length < 10 && navbarData.lastname.length >= 5) {
        setLastNameCheck("ac-9-5")
      } else {
        setLastNameCheck("ac-4-1")
      }
    }
  }, [navbarData]);

  const [planInfo, setPlanInfo] = useState(false);

  const [parentInfo, setParentInfo] = useState(false);

  const [ownerInfo, setOwnerInfo] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setPlanInfo(myInfo.subscriptioninfo);
      setParentInfo(myInfo.parentinfo);
      setOwnerInfo(myInfo.ownerinfo);
    }
  }, [myInfo]);

  const [points, setPoints] = useState(false);

  useEffect(() => {
    if (insighterPoints) {
      setPoints(insighterPoints.nooninsighterpoint);
    }
  }, [insighterPoints]);

  const [EncryptedData, setEncryptedData] = useState(false);

  useEffect(() => {
    if (encryptedData) {
      setEncryptedData(encryptedData);
    }
  }, [encryptedData]);

  const [path, setPath] = useState(location.pathname);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [mobileone, setMobileOne] = useState(false);
  const [mobiletwo, setMobileTwo] = useState(false);
  const [mobilethree, setMobileThree] = useState(false);
  const [mobilefour, setMobileFour] = useState(false);
  const [mobilefive, setMobileFive] = useState(false);

  const ssoauth = () => {
    if (localStorage.getItem("tokenCustomer") == null) {
      navigate("/my-account");
    } else {
      const host =  window.location.host;
      const LMS_KEY = "mXu8EfYLQVgh8n3iEH6zFl97UPfNwwUf";
      const LMS_SECRET = "PRVfWX16FziQkMcdsAKHfeX9WyZJhW49";
      const url = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "http://dev.actionableacademy.org" : "https://actionableacademy.org"}`
      const endpoint = `${url}/sso?secret=${LMS_SECRET}&key=${LMS_KEY}&identifier=${ownerInfo.emailaddress}&data=${EncryptedData}`;
      window.open(endpoint, "_blank");
    }
  };

  function handleManagePayment () {
    if (localStorage.getItem("managepayment") == "true") {
      props.handleManagePayment(false);
      localStorage.removeItem("managepayment");
    }
  };

  const [liveSessionDetails, setLiveSessionDetails] = useState([]);

  useEffect(() => {
    GetLiveSessionDetails().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setLiveSessionDetails(x);
      }
    });
  }, []);

  const currDate = new Date().toLocaleString();
  const currDateMoment = `${moment(currDate).format("YYYY-MM-DDTHH:mm:ss.SSS")}`;

  const currYear = new Date().toLocaleString();
  const currYearMoment = `${moment(currYear).format("YYYY")}`;

  return (
    <>
      <header className="main_header">
        <nav className="navbar">
          <div className="navbar-container" id="container">
            <Link
              to={
                liveSessionDetails ?
                  liveSessionDetails.currentstate ?
                    liveSessionDetails.startdatetime && liveSessionDetails.enddatetime ?
                      moment.utc(new Date(`${liveSessionDetails.startdatetime} UTC`)).local().format("YYYY") == currYearMoment && moment.utc(new Date(`${liveSessionDetails.enddatetime} UTC`)).local().format("YYYY") == currYearMoment ?
                        moment.utc(new Date(`${liveSessionDetails.startdatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") <= currDateMoment && moment.utc(new Date(`${liveSessionDetails.enddatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") >= currDateMoment ? "/live"
                        : "/"
                      : "/"
                    : "/"
                  : "/"
                : "/"
              }
              className="navbar-logo"
            >
              <img
                className="logo_image"
                src={
                  liveSessionDetails ?
                    liveSessionDetails.currentstate ?
                      liveSessionDetails.startdatetime && liveSessionDetails.enddatetime ?
                        moment.utc(new Date(`${liveSessionDetails.startdatetime} UTC`)).local().format("YYYY") == currYearMoment && moment.utc(new Date(`${liveSessionDetails.enddatetime} UTC`)).local().format("YYYY") == currYearMoment ?
                          moment.utc(new Date(`${liveSessionDetails.startdatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") <= currDateMoment && moment.utc(new Date(`${liveSessionDetails.enddatetime} UTC`)).local().format("YYYY-MM-DDTHH:mm:ss.SSS") >= currDateMoment ? live
                          : logo
                        : logo
                      : logo
                    : logo
                  : logo
                }
                alt="logo"
                loading="lazy"
              />
            </Link>
            <Link to="/search" className="search">
              <img
                src={search}
                alt="search"
                loading="lazy"
              />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <img src={MenuIcon} alt="menu" />
            </div>
            <ul className={localStorage.getItem("tokenCustomer") == null ? "nav-menu" : "nav-menu nav-menu-new"}>
               <li className="nav-item">
                <Link to="/actionable-xactimate-profile" className="nav-links">
                  Actionable Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/events" className="nav-links">
                  Events
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={(e) => toggleActive('menu1', e)}
              >
                <span className={activeMenus.menu1 ? "nav-links bor" : "nav-links"}>
                  Free Resources{" "}
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
                <div
                  className={activeMenus.menu1 ? "active active-two" : "dropdown-content"}
                  ref={dropdownRef1}
                >
                  <Link to="/resources/price-list-update-summary">
                    <p className="h3"> Price List Update Summary </p>
                  </Link>
                  <hr />
                  <Link to="/resources/insighter-report">
                    <p className="h3"> Insighter Report </p>
                  </Link>
                  <hr />
                  <Link to="/video-gallery">
                    <p className="h3"> Video Gallery </p>
                  </Link>
                  {/* <hr />
                  <Link to="/resources/3d-training-modules">
                    <p className="h3"> 3D Training Modules </p>
                  </Link> */}
                  <hr />
                  <Link to="/online-sketch-gallery">
                    <p className="h3"> Xactimate Sketch Gallery </p>
                  </Link>
                  <hr />
                  <Link to="/matterport-standards">
                    <p className="h3"> Matterport Standards </p>
                  </Link>
                </div>
              </li>
              <li
                className="nav-item"
                onClick={(e) => toggleActive('menu2', e)}
              >
                <span className={activeMenus.menu2 ? "nav-links bor" : "nav-links"}>
                  Membership Resources{" "}
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
                <div
                  className={activeMenus.menu2 ? "active active-three" : "dropdown-content"}
                  ref={dropdownRef2}
                >
                  <Link to="/plan-matrix">
                    <p className="h3"> Membership Plans </p>
                  </Link>
                  <hr />
                  <Link to="/actionable-xactimate-profile">
                    <p className="h3"> Actionable Profile </p>
                  </Link>
                  <hr />
                  <Link to="/insight-sheets">
                    <p className="h3"> Insight Sheet Database </p>
                  </Link>
                  <hr />
                  <Link to="/commonly-overlooked-line-items">
                    <p className="h3"> Commonly Overlooked Line Items </p>
                  </Link>
                  <hr />
                  <Link to="/macros">
                    <p className="h3"> Macros </p>
                  </Link>
                  {/* <hr />
                  <Link to="/shop/form/solidifai">
                    <p className="h3"> Solidifai (Estimate Edit Engine) </p>
                  </Link> */}
                  {/* <hr />
                  <Link to={`${localStorage.getItem("tokenCustomer") == null ? "/my-account" : "/shop/form/zora"}`}>
                    <p className="h3"> ZORA (Estimate Audit Engine) </p>
                  </Link> */}
                </div>
              </li>
              <li
                className="nav-item"
                onClick={(e) => toggleActive('menu3', e)}
              >
                <span className={activeMenus.menu3 ? "nav-links bor" : "nav-links"}>
                  Actionable Academy{" "}
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
                <div
                  className={activeMenus.menu3 ? "active active-four" : "dropdown-content"}
                  ref={dropdownRef3}
                >
                  <p className="h3" onClick={ssoauth}> Go to Academy </p>
                  <hr />
                  <Link to="/aimc">
                    <p className="h3"> AI Matterport Certification </p>
                  </Link>
                  {/* <hr />
                  <Link to="/aimc-ce">
                    <p className="h3"> AIMC Continuing Education </p>
                  </Link> */}
                  {/* < hr />
                  <Link to="/aitc">
                    <p className="h3"> AI Tools Certification </p>
                  </Link> */}
                  <hr />
                  <Link to="/state-insurance-license-reciprocity">
                    <p className="h3"> State Insurance License Reciprocity </p>
                  </Link>
                  <hr />
                  <Link to="/aimc-graduates-public-registry">
                    <p className="h3"> AIMC Graduates Public Registry </p>
                  </Link>
                  <hr />
                  <Link to="/private-training">
                    <p className="h3"> Private Training </p>
                  </Link>
                  <hr />
                  <Link to="/events">
                    <p className="h3"> Live Training </p>
                  </Link>
                </div>
              </li>
              <li
                className="nav-item"
                onClick={(e) => toggleActive('menu4', e)}
              >
                <span className={activeMenus.menu4 ? "nav-links bor" : "nav-links"}>
                  Advance the Cause{" "}
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </span>
                <div
                  className={activeMenus.menu4 ? "active active-five" : "dropdown-content"}
                  ref={dropdownRef4}
                >
                   <Link to="/advance-the-cause/actionable-profile-alert-request">
                    <p className="h3"> Actionable Profile Alert Request </p>
                  </Link>
                  <hr />
                  <Link to="/advance-the-cause/line-item-request">
                    <p className="h3"> Xactimate Line Item Request </p>
                  </Link>
                  <hr />
                  <Link to="/advance-the-cause/xactimate-feature-request">
                    <p className="h3"> Xactimate Feature Request </p>
                  </Link>
                  <hr />
                  <Link to="/advance-the-cause/matterport-feature-request">
                    <p className="h3"> Matterport Feature Request </p>
                  </Link>
                  <hr />
                  <Link to="/advance-the-cause/insight-sheet-collaboration">
                    <p className="h3"> Insight Sheet Collaboration </p>
                  </Link>
                  <hr />
                  <Link to="/swag">
                    <p className="h3"> Swag </p>
                  </Link>
                </div>
              </li>
              {localStorage.getItem("tokenCustomer") == null ? (
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    to="/my-account"
                    state={{ path: path }}
                  >
                    <button className="btn"> Sign In </button>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-links"
                    onClick={(e) => toggleActive('mobile', e)}
                  >
                    <img
                      className="user-image"
                      src={navbarInfo.profilePicture ? navbarInfo.profilePicture : user}
                      alt="user"
                      loading="lazy"
                    />
                      Hey,&nbsp;
                    <span style={{ textTransform: "uppercase" }}> 
                      {navbarInfo ? navbarInfo.lastname.length > 15 ? `${navbarInfo.lastname.substring(0,15)}...` : navbarInfo.lastname: ""}
                    </span>
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  </a>
                  <div
                    className={activeMenus.mobile ? `active ${lastNameCheck}` : "dropdown-content"}
                    ref={dropdownRef5}
                  >
                    {parentInfo ? (
                      <>
                        <p className="h1"> {parentInfo.planName.includes("Enterprise Plan") ? "Enterprise Plan" : "Pro Plan"} </p>
                        <p className={`h5 ${parentInfo.parentsplanstatus}`}>
                          {parentInfo.parentsplanstatus === "PendingCancellation" ? "Pending Cancellation" : parentInfo.parentsplanstatus}
                        </p>
                      </>
                    ) : (
                      <>
                        {(planInfo.subscriptionstatus === "Cancelled" || planInfo.subscriptionstatus === "TrialCancelled" || planInfo.subscriptionstatus === "NoActivePlan") ? (
                          <p className="h1">
                            No Active Plan
                          </p>
                        ) : (
                          <>
                            <p className="h1">
                              {
                                planInfo.planname === "StandardPlan" ? "Legacy Standard Plan" :
                                planInfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                planInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                planInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                planInfo.planname === "StandardPlanAnnual" ? "Legacy Standard Plan" :
                                planInfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                planInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                planInfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" : ""
                              }
                            </p>
                            <p className={`h5 ${planInfo.subscriptionstatus}`}>
                              {planInfo.subscriptionstatus === "PausedDueToPaymentFailure" ? "Paused" :
                              planInfo.subscriptionstatus === "PendingCancellation" ? "Pending Cancellation" : planInfo.subscriptionstatus}
                            </p>
                          </>
                        )}
                      </>
                    )}
                    <Link to="/my-account">
                      <p className="h3" onClick={handleManagePayment}> My Account </p>
                    </Link>
                    <hr />
                    <Link to="/my-account/downloads">
                      <p className="h3"> My Downloads </p>
                    </Link>
                    <hr />
                    <Link to="/my-account/points">
                      <p className="h3">
                        {" "}
                        Insighter Points -{" "}
                        <span
                          style={
                            points > 0
                              ? { color: "#38ADA2" }
                              : { color: "#DD4124" }
                          }
                        >
                          <NumericFormat
                            value={typeof points === "number" ? points : 0}
                            displayType="text"
                            thousandSeparator
                          />
                        </span>
                      </p>
                    </Link>
                    <hr />
                    <p className="h3" onClick={handleLogout}>Sign Out</p>
                  </div>
                </li>
              )}
            </ul>
            {/* Responsive Navbar Start */}
            <nav className="main-navigation">
              <ul
                className={click ? "onepress-menu-mobile onepress-menu" : "onepress-menu"}
                style={{ overflow: "auto" }}
              >
                {localStorage.getItem("tokenCustomer") == null ? (
                  <div
                    className="other-page-menu visible-mobile"
                    style={{ borderBottom: "1px solid #e9e9e9"}}
                  >
                    <Link
                      style={{ paddingRight: "0px" }}
                      to="/my-account"
                      state={{ path: path }}
                    >
                      <button className="btn"> Sign In </button>
                    </Link>
                  </div>
                ) : (
                  <div className="other-page-menu visible-mobile">
                    <Link to="/my-account">
                      <img
                        className="header_thumbnail"
                        src={navbarInfo.profilePicture ? navbarInfo.profilePicture : user}
                        alt="user"
                        loading="lazy"
                      />
                    </Link>
                    <span className="user_dropdown_link">
                      Hey,&nbsp;
                      <span style={{ fontWeight: "700", textTransform: "uppercase" }}>
                        {navbarInfo.lastname}
                      </span>
                    </span>
                    <div className="user_dropdown">
                      {parentInfo ? (
                        <p>
                          {parentInfo.planName.includes("Enterprise Plan") ? "Enterprise Plan" : "Pro Plan"}
                          <br />
                          <span className={`${parentInfo.parentsplanstatus}`}>
                            {parentInfo.parentsplanstatus === "PendingCancellation" ? "Pending Cancellation" : parentInfo.parentsplanstatus}
                          </span>
                        </p>
                      ) : (
                        <>
                          {(planInfo.subscriptionstatus === "Cancelled" || planInfo.subscriptionstatus === "TrialCancelled" || planInfo.subscriptionstatus === "NoActivePlan") ? (
                            <p>
                              No Active Plan
                            </p>
                          ) : (
                            <p>
                              {
                                planInfo.planname === "StandardPlan" ? "Legacy Standard Plan" :
                                planInfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                planInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                planInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                planInfo.planname === "StandardPlanAnnual" ? "Legacy Standard Plan" :
                                planInfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                planInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                planInfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" : ""
                              }
                              <br />
                              <span className={`${planInfo.subscriptionstatus}`}>
                                {planInfo.subscriptionstatus === "PausedDueToPaymentFailure" ? "Paused" :
                                planInfo.subscriptionstatus === "PendingCancellation" ? "Pending Cancellation" : planInfo.subscriptionstatus}
                              </span>
                            </p>
                          )}
                        </>
                      )}
                      <li onClick={handleManagePayment}>
                        <Link to="/my-account">My Account</Link>
                      </li>
                      <li>
                        <Link to="/my-account/downloads">My Downloads</Link>
                      </li>
                      <li>
                        <Link to="/my-account/points">
                          Insighter Points -{" "}
                          <span
                            style={
                              points > 0
                                ? { color: "#38ADA2" }
                                : { color: "#DD4124" }
                            }
                          >
                            <NumericFormat
                              value={typeof points === "number" ? points : 0}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </span>
                        </Link>
                      </li>
                      <li onClick={handleLogout}>
                        <a> Sign Out </a>
                      </li>
                    </div>
                  </div>
                )}
                <li style={{ paddingBottom: "5px", paddingTop: "5px" }}>
                  <Link to="/actionable-xactimate-profile">
                    Actionable Profile
                  </Link>
                </li>
                <li style={{ paddingBottom: "5px", paddingTop: "5px" }}>
                  <Link to="/events">
                    Events
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setMobileOne(false);
                    setMobileTwo(!mobiletwo);
                    setMobileThree(false);
                    setMobileFour(false);
                    setMobileFive(false);
                  }}
                >
                  <span>
                    Free Resources
                    <i
                      className="fa fa-angle-down"
                      style={{ paddingBottom: "10px", paddingTop: "10px" }}
                    />
                  </span>
                  <ul className={mobiletwo ? "sub-menu" : "no-display"}>
                    <li
                      style={{
                        paddingBottom: "7px",
                        paddingTop: "7px",
                        borderTop: "#dd4124 solid 2px",
                      }}
                    >
                      <Link to="/resources/price-list-update-summary">
                        Price List Update Summary
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/resources/insighter-report">
                        Insighter Report
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/video-gallery">
                        Video Gallery
                      </Link>
                    </li>
                    {/* <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/resources/3d-training-modules">
                        3D Training Modules
                      </Link>
                    </li> */}
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/online-sketch-gallery">
                        Xactimate Sketch Gallery
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/matterport-standards">
                        Matterport Standards
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  onClick={() => {
                    setMobileOne(false);
                    setMobileTwo(false);
                    setMobileThree(!mobilethree);
                    setMobileFour(false);
                    setMobileFive(false);
                  }}
                >
                  <span>
                    Membership Resources
                    <i
                      className="fa fa-angle-down"
                      style={{ paddingBottom: "10px", paddingTop: "10px" }}
                    />
                  </span>
                  <ul className={mobilethree ? "sub-menu" : "no-display"}>
                    <li
                      style={{
                        paddingBottom: "7px",
                        paddingTop: "7px",
                        borderTop: "#dd4124 solid 2px",
                      }}
                    >
                      <Link to="/plan-matrix">
                        Membership Plans
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/actionable-xactimate-profile">
                        Actionable Profile
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/insight-sheets">
                        Insight Sheet Database
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/commonly-overlooked-line-items">
                        Commonly Overlooked Line Items
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/macros">
                        Macros
                      </Link>
                    </li>
                    {/* <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/shop/form/solidifai">
                        Solidifai (Estimate Edit Engine)
                      </Link>
                    </li> */}
                    {/* <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/shop/form/zora">
                        ZORA (Estimate Audit Engine)
                      </Link>
                    </li> */}
                  </ul>
                </li>
                <li
                  onClick={() => {
                    setMobileOne(false);
                    setMobileTwo(false);
                    setMobileThree(false);
                    setMobileFour(!mobilefour);
                    setMobileFive(false);
                  }}
                >
                  <span>
                    Actionable Academy
                    <i
                      className="fa fa-angle-down"
                      style={{ paddingBottom: "10px", paddingTop: "10px" }}
                    />
                  </span>
                  <ul className={mobilefour ? "sub-menu" : "no-display"}>
                    <li
                      style={{
                        paddingBottom: "7px",
                        paddingTop: "7px",
                        borderTop: "#dd4124 solid 2px",
                      }}
                    >
                      <span onClick={ssoauth}> Go to Academy </span>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/aimc">
                        AI Matterport Certification
                      </Link>
                    </li>
                    {/* <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/aimc-ce">
                        AIMC Continuing Education
                      </Link>
                    </li> */}
                    {/* <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/aitc">
                        AI Tools Certification
                      </Link>
                    </li> */}
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/state-insurance-license-reciprocity">
                        State Insurance License Reciprocity
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/aimc-graduates-public-registry">
                        AIMC Graduates Public Registry
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/private-training">
                        Private Training
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/events">
                        Live Training
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  onClick={() => {
                    setMobileOne(false);
                    setMobileTwo(false);
                    setMobileThree(false);
                    setMobileFour(false);
                    setMobileFive(!mobilefive);
                  }}
                >
                  <span>
                    Advance the Cause
                    <i
                      className="fa fa-angle-down"
                      style={{ paddingBottom: "10px", paddingTop: "10px" }}
                    />
                  </span>
                  <ul className={mobilefive ? "sub-menu" : "no-display"}>
                    <li
                      style={{
                        paddingBottom: "7px",
                        paddingTop: "7px",
                        borderTop: "#dd4124 solid 2px",
                      }}
                    >
                      <Link to="/advance-the-cause/actionable-profile-alert-request">
                        Actionable Profile Alert Request
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/advance-the-cause/line-item-request">
                        Xactimate Line Item Request
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/advance-the-cause/xactimate-feature-request">
                        Xactimate Feature Request
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/advance-the-cause/matterport-feature-request">
                        Matterport Feature Request
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/advance-the-cause/insight-sheet-collaboration">
                        Insight Sheet Collaboration
                      </Link>
                    </li>
                    <li style={{ paddingBottom: "7px", paddingTop: "7px" }}>
                      <Link to="/swag">
                        Swag
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* Responsive Navbar End */}
          </div>
        </nav>
      </header>
      {localStorage.getItem("tokenCustomer") == null ? (
        ""
      ) : (
        <Banner />
      )}
    </>
  );
};

export default Navbar;