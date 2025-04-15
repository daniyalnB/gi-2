import React, { Suspense, useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllEventsCustomer } from "../../../utils/api-routes/api-routes.util";
import moment from "moment";
import AIMC_Event from "assets/AIMC_Event.webp";
import cal from "assets/CAL.svg";
import locations from "assets/Location.svg";
import down from "assets/down-arrow-user.svg";

export const useDetectOutsideClick = (el, initialState) => {

  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);
  return [isActive, setIsActive];
};

const Events = (props) => {

  const dropdownRef1 = useRef(null);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef1, false);
  const onClickRef1 = () => setIsActive1(!isActive1);
  
  const [path, setPath] = useState(location.pathname);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllEventsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const publisheddata = data.filter((val) => val.draft === false);

  const sortedActivities = publisheddata.sort((a, b) => moment(a.startdatetime).format("YYYYMMDD") - moment(b.startdatetime).format("YYYYMMDD"));

  const updatedData = sortedActivities.filter(
    (x) => moment(x.enddatetime).add(7, "d").format("yyyy-MM-DD") >= date
  );

  const MatterportEvents = updatedData.filter((val) => val.title.includes("Matterport") || val.title.includes("matterport"));
  const XactimateEvents = updatedData.filter((val) => val.title.includes("Xactimate") || val.title.includes("xactimate"));
  const ActionableProfileEvents = updatedData.filter((val) => val.title.includes("Actionable Profile") ||  val.title.includes("actionable profile"));
  const MatterportXactimateEvents = updatedData.filter((val) => val.title.includes("Matterport") || val.title.includes("matterport") || val.title.includes("Xactimate") || val.title.includes("xactimate"));
  const MatterportActionableProfileEvents = updatedData.filter((val) => val.title.includes("Matterport") || val.title.includes("matterport") || val.title.includes("Actionable Profile") ||  val.title.includes("actionable profile"));
  const XactimateActionableProfileEvents = updatedData.filter((val) => val.title.includes("Xactimate") || val.title.includes("xactimate") || val.title.includes("Actionable Profile") ||  val.title.includes("actionable profile"));

  const months = updatedData.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonths = [...new Set(months)];
  const monthsMatterportEvents = MatterportEvents.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonthsMatterportEvents = [...new Set(monthsMatterportEvents)];
  const monthsXactimateEvents = XactimateEvents.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonthsXactimateEvents = [...new Set(monthsXactimateEvents)];
  const monthsActionableProfileEvents = ActionableProfileEvents.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonthsActionableProfileEvents = [...new Set(monthsActionableProfileEvents)];
  const monthsMatterportXactimateEvents = MatterportXactimateEvents.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonthsMatterportXactimateEvents = [...new Set(monthsMatterportXactimateEvents)];
  const monthsMatterportActionableProfileEvents = MatterportActionableProfileEvents.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonthsMatterportActionableProfileEvents = [...new Set(monthsMatterportActionableProfileEvents)];
  const monthsXactimateActionableProfileEvents = XactimateActionableProfileEvents.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonthsXactimateActionableProfileEvents = [...new Set(monthsXactimateActionableProfileEvents)];

  const [Matterport, setMatterport] = useState(true);
  const [Xactimate, setXactimate] = useState(true);
  const [ActionableProfile, setActionableProfile] = useState(true);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  console.log(isSmallScreen, "isSmallScreen")

  useEffect(() => {
    const checkFullScreen = () => {
      const width = window.innerWidth;
      if (width < 1921) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    checkFullScreen();
    window.addEventListener("resize", checkFullScreen);

    return () => window.removeEventListener("resize", checkFullScreen);
  }, []);
  
  return (
    <>
      <SEO
        title="Actionable Insights Events | Matterport and Xactimate Training"
        description="Regular events revolving around Matterport training and learning Xactimate for pros of all levels. Check our our demand and live events."
        link="events"
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
          <div className="events_page">
            <div className="">
              <div className="holder">
                <h2> Upcoming Events </h2>
                <div className="row Filter">
                  <div className="col-12">
                    <div className="row">
                      <div className="filter_tab">
                        <div className="form-group">
                          <input
                            type="text"
                            name="Filter"
                            className="form-control"
                            placeholder="Filter"
                            onClick={() => onClickRef1()}
                          />
                          <label className="file_input_label">
                            <img
                              className="select size"
                              src={down}
                              onClick={() => onClickRef1()}
                            />
                          </label>
                          <div
                            className={isActive1 ? "active" : "dropdown-content"}
                            ref={dropdownRef1}
                          >
                            <div className="filter">
                              <input type="checkbox" id="s1" checked={Matterport} />
                              <label htmlFor="s1" onClick={() => setMatterport(!Matterport)}>
                                Matterport
                              </label>
                            </div>
                            <hr />
                            <div className="filter">
                              <input type="checkbox" id="s2" checked={Xactimate} />
                              <label htmlFor="s2" onClick={() => setXactimate(!Xactimate)}>
                                Xactimate
                              </label>
                            </div>
                            <hr />
                            <div className="filter">
                              <input type="checkbox" id="s2" checked={ActionableProfile} />
                              <label htmlFor="s2" onClick={() => setActionableProfile(!ActionableProfile)}>
                                Actionable Profile
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!loading && (
                  <>
                    <div className="separator">
                      <span className="On-Demand"> On-Demand </span>
                    </div>
                    <div className="upcoming-events">
                      <div className="">
                        <div className="row events">
                          <div className="col-xl-4 image-section">
                            <Link to="/aimc">
                              <img
                                src={AIMC_Event}
                                alt="AIMC_Event"
                                loading="lazy"
                              />
                            </Link>
                          </div>
                          <div className="col-xl-8 data-section">
                            <div className="row">
                              <div className="col-7">
                                <h4>
                                  <Link to="/aimc">
                                    AI Matterport Certified Courses
                                  </Link>
                                </h4>
                                <div className="data">
                                  <img
                                    src={cal}
                                    alt="cal"
                                    loading="lazy"
                                  />
                                  <span className="value">
                                    Anytime
                                  </span>
                                </div>
                                  <div className="data">
                                    <img
                                      src={locations}
                                      alt="locations"
                                      loading="lazy"
                                    />
                                    <span className="value">
                                      Anywhere
                                    </span>
                                  </div>
                              </div>
                              <div className="col-5 text-right">
                                <Link
                                  to="/aimc"
                                  className="btn"
                                >
                                  Register Now
                                </Link>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="data">
                                  <span className="heading">
                                    {" "}
                                    Description:{" "}
                                  </span>{" "}
                                  <br />
                                  <span className="value">
                                    Matterport’s technology is changing the property insurance ecosystem, instilling efficiency and transparency into the claims settlement process. Actionable Insights wants people to love their jobs, and Matterport has made it easier for contractors and claims professionals to enjoy their work. The Actionable Insights Matterport Certification course will ensure you know how to use this game-changing technology, help you scale the training and implementation across your company, and prepare you to leverage all aspects of this technology as it relates to sales, operations, business development, risk management, client retention, and more.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {Matterport && !Xactimate && !ActionableProfile && (
                      <>
                        {MatterportEvents.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonthsMatterportEvents.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {MatterportEvents.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {!Matterport && Xactimate && !ActionableProfile && (
                      <>
                        {XactimateEvents.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonthsXactimateEvents.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {XactimateEvents.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {!Matterport && !Xactimate && ActionableProfile && (
                      <>
                        {ActionableProfileEvents.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonthsActionableProfileEvents.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {ActionableProfileEvents.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {Matterport && Xactimate && !ActionableProfile && (
                      <>
                        {MatterportXactimateEvents.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonthsMatterportXactimateEvents.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {MatterportXactimateEvents.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {Matterport && !Xactimate && ActionableProfile && (
                      <>
                        {MatterportActionableProfileEvents.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonthsMatterportActionableProfileEvents.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {MatterportActionableProfileEvents.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {!Matterport && Xactimate && ActionableProfile && (
                      <>
                        {XactimateActionableProfileEvents.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonthsXactimateActionableProfileEvents.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {XactimateActionableProfileEvents.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {Matterport && Xactimate && ActionableProfile && (
                      <>
                        {updatedData.length == 0 ? (
                          <div className="no-result">
                            <h2> no result found </h2>
                          </div>
                        ) : (
                          <>
                            {uniqueMonths.map((x) => {
                              return (
                                <>
                                  <div className="separator">
                                    <span> {x} </span>
                                  </div>
                                  {updatedData.filter((val) => moment(val.startdatetime).format("MMMM YYYY") == x).map((val) => {
                                    return (
                                      <div className="upcoming-events">
                                        <div className="">
                                          <div className="row events">
                                            <div className="col-xl-4 image-section">
                                              <Link to={`/event/${val.permalink}`}>
                                                <img
                                                  src={val.featuredimage}
                                                  alt={val.title}
                                                  loading="lazy"
                                                />
                                              </Link>
                                            </div>
                                            <div className="col-xl-8 data-section">
                                              <div className="row">
                                                <div className="col-7">
                                                  <h4>
                                                    <Link to={`/event/${val.permalink}`}>
                                                      {val.title}
                                                    </Link>
                                                  </h4>
                                                  <div className="data">
                                                    <img
                                                      src={cal}
                                                      alt="cal"
                                                      loading="lazy"
                                                    />
                                                    <span className="value">
                                                      {
                                                        `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                                                      ? 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                                                        </>  
                                                      : 
                                                        <>
                                                          {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                                                        </>
                                                      }
                                                    </span>
                                                  </div>
                                                  {val.type !== "Private" && (
                                                    <div className="data">
                                                      <img
                                                        src={locations}
                                                        alt="locations"
                                                        loading="lazy"
                                                      />
                                                      <span className="value">
                                                        {/* <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                          , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                          <span style={{ color: "#38ADA2" }}> Google Map </span> */}
                                                        {val.location ? val.location : "N/A"}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                {val.type !== "Private" && (
                                                  <div className="col-5 text-right">
                                                    {`${moment(val.enddatetime).format("yyyy-MM-DD")}` >= date ? (
                                                      <>
                                                        {localStorage.getItem(
                                                          "tokenCustomer"
                                                        ) == null ? (
                                                          <Link
                                                            to={{
                                                              pathname: "/my-account",
                                                              state: {
                                                                path: path,
                                                              },
                                                            }}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            to={`/event/${val.permalink}`}
                                                            className="btn"
                                                          >
                                                            Register Now
                                                          </Link>
                                                        )}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <div className="data">
                                                    <span className="heading">
                                                      {" "}
                                                      Description:{" "}
                                                    </span>{" "}
                                                    <br />
                                                    {isSmallScreen ? (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 250)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    ) : (
                                                      <span className="value">
                                                        {val.featureddescription.substring(0, 2500)}
                                                        ...{" "}
                                                        <Link to={`/event/${val.permalink}`}>
                                                          Find Out More
                                                        </Link>
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </>
                        )}
                      </>
                    )}
                    {!Matterport && !Xactimate && !ActionableProfile && (
                      <div className="no-result">
                        <h2> no result found </h2>
                      </div>
                    )}
                  </>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
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

export default withRouter(Events);