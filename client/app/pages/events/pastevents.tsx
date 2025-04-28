import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import moment from "moment";
import { GetAllEventsCustomer } from "../../../utils/api-routes/api-routes.util";
import cal from "assets/CAL.svg";
import locations from "assets/Location.svg";
import AIMC_Event from "assets/AIMC_Event.webp";

const PastEvents = (props) => {

  const [path, setPath] = useState(location.pathname);

  const [loading, setLoading] = useState(true);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    GetAllEventsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setEvents(response.response.data);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const publisheddata = events.filter((val) => val.draft === false);

  const sortedActivities = publisheddata.sort((a, b) => moment(a.startdatetime).format("YYYYMMDD") - moment(b.startdatetime).format("YYYYMMDD"));

  const updatedData = sortedActivities.filter(
    (x) => moment(x.enddatetime).add(7, "d").format("yyyy-MM-DD") >= date
  );

  const months = updatedData.map(x => moment(x.startdatetime).format("MMMM YYYY"));
  const uniqueMonths = [...new Set(months)];

  return (
    <>
      <SEO
        title="Events Database - Actionable Insights"
        description="Look out for these Actionable Insights Events. Bring it all together and attend our highly produced, invaluable events, and leave with 'Actionable' information - (Xactimate Estimating & Digital Assets Class (San Diego, CA)$750Register Now. May 3rd, 2022 - May 5th, 2022. This course will stream live online! Tickets for the online course are the same ticket class/price as attending in person. GAME CHANGER: We did it again!)"
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
          <div className="ED_page">
            {!loading && (
              <>
                <div className="event-notice">
                  <h1> This event is over. </h1>
                  <span> But there is more training just like it! Check out our various upcoming events and training opportunities below. </span>
                </div>
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
                                  <Link to={`/event/${val.permalink}`} target="_blank">
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
                                        <Link to={`/event/${val.permalink}`} target="_blank">
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
                                                to="/my-account"
                                                state={{ path: path }}
                                                className="btn"
                                              >
                                                Register Now
                                              </Link>
                                            ) : (
                                              <Link
                                                to={`/event/${val.permalink}`}
                                                target="_blank"
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
                                        <span className="value">
                                          {val.featureddescription.substring(0, 250)}
                                          ...{" "}
                                          <Link to={`/event/${val.permalink}`} target="_blank">
                                            Find Out More
                                          </Link>
                                        </span>
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
            {loading && (
              <div className="loader-inner">
                <LottieLoader />
              </div>
            )}
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default PastEvents;