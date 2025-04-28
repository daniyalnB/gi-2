import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { googleCalendarEventUrl } from "google-calendar-url";
import ICalendarLink from "react-icalendar-link";
import { NumericFormat } from "react-number-format";
import { AppContext } from "../../../../contexts/appContext";
import cal from "assets/CAL.svg";
import locations from "assets/Location.svg";
import seats from "assets/Seats.svg";
import virtual_seats from "assets/VirtualSeats.svg";

const Event = ({ data }) => {

  const navigate = useNavigate();

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

  const [parentInfo, setParentInfo] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setParentInfo(myInfo.parentinfo);
      setSubscriptionInfo(myInfo.subscriptioninfo);
    }
  }, [myInfo]);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const scroll = () => {
    const section = document.querySelector("#noattendees");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const url = googleCalendarEventUrl({
    start: `${moment(data.startdatetime).format("yyyyMMDD")}`,
    end: `${moment(data.enddatetime).add(1, "d").format("yyyyMMDD")}`,
    title: `${data.title}`,
    details: `${data.description}`,
  });

  const event = {
    title: `${data.title}`,
    description: `${
      data.description
        ? `${data.description.replace(/(<([^>]+)>)/gi, "")}`
        : "Description"
    }`,
    startTime: `${moment(data.startdatetime).format("yyyy-MM-DD")}`,
    endTime: `${moment(data.enddatetime).add(1, "d").format("yyyy-MM-DD")}`,
  };

  const [path, setPath] = useState(location.pathname);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (moment(data.enddatetime).add(7, "d").format("yyyy-MM-DD") >= date) {
      setShow(true);
    } else {
      setShow(false);
      navigate(`/past-events`)
    }
  }, []);

  return (
    <>
      {show ? (
        <>
          <div className="event row">
            <div className="col-xl-4 col-lg-4 col-md-4 image-section">
              <img
                src={data.featuredimage}
                alt={data.title}
                loading="lazy"
              />
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 data-section">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-7">
                  <h4>{data.title}</h4>
                  {data.type !== "Private" && (
                    <>
                      {data.attendance === "Both" ? (
                        <>
                          <div className="data">
                            <img
                              src={seats}
                              alt="seats"
                              loading="lazy"
                            />
                            <span className="value">
                              In Person Seats Available:{" "}
                              <span style={{ color: "#38ADA2" }}>{data.noofseats}</span>
                            </span>
                          </div>
                          <div className="data">
                            <img
                              src={virtual_seats}
                              alt="seats"
                              loading="lazy"
                            />
                            <span className="value">
                              Virtual Seats Available:{" "}
                              <span style={{ color: "#38ADA2" }}>{data.virtualSeats}</span>
                            </span>
                          </div>
                        </>
                      ) : data.attendance === "Virtual" ? (
                        <div className="data">
                          <img
                            src={virtual_seats}
                            alt="seats"
                            loading="lazy"
                          />
                          <span className="value">
                            Virtual Seats Available:{" "}
                            <span style={{ color: "#38ADA2" }}>{data.virtualSeats}</span>
                          </span>
                        </div>
                      ) : (
                        <div className="data">
                          <img
                            src={seats}
                            alt="seats"
                            loading="lazy"
                          />
                          <span className="value">
                            In Person Seats Available:{" "}
                            <span style={{ color: "#38ADA2" }}>{data.noofseats}</span>
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  <div className="data">
                    <img
                      src={cal}
                      alt="cal"
                      loading="lazy"
                    />
                    <span className="value">
                      {
                        `${moment(data.startdatetime).format("yyyy-MM-DD")}` == `${moment(data.enddatetime).format("yyyy-MM-DD")}`
                      ? 
                        <>
                          {moment(data.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(data.enddatetime).format("h:mm a")}
                        </>  
                      : 
                        <>
                          {moment(data.startdatetime).format("MMMM Do, YYYY")} - {moment(data.enddatetime).format("MMMM Do, YYYY")}
                        </>
                      }
                    </span>
                  </div>
                  {data.type !== "Private" && (
                    <div className="data">
                      <img
                        src={locations}
                        alt="locations"
                        loading="lazy"
                      />
                      <span className="value">
                        {data.location}
                        {/* +{" "}
                        <a 
                          href="https://goo.gl/maps/wwj6PiPzFsCs4TSw7" 
                          target="_balnk" 
                          style={{ color: "#38ADA2" }}
                        > 
                          Google Map 
                        </a> */}
                      </span>
                    </div>
                  )}
                </div>
                {`${moment(data.enddatetime).format("yyyy-MM-DD")}` >= date ?
                  <>
                    {data.type === "Bootcamp" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                      <>
                        <div className="col-xl-5 col-lg-5 col-md-5 text-right">
                          <h2 className="prevprice">
                            <del> ${(data.priceincents / 100).toFixed(2)} </del>
                          </h2>
                          <span className="price"> $50.00 </span>
                          <h3 className="points"> or&nbsp;500&nbsp;Insighter Points </h3>
                          <div style={{ textAlign: "right", marginTop: "10px" }}>
                            <div className="discount">
                              <span> Discounted as a part of your {subscriptionInfo.planname.includes("EnterprisePlan") ? "Enterprise Plan" : "Pro Plan"} </span>
                            </div>
                          </div>
                          <div className="RN"> 
                            {localStorage.getItem("tokenCustomer") == null ?
                              <button 
                                className="btn"
                                disabled={(data.noofseats + data.virtualSeats) == 0 ? true : false}
                                onClick={() =>
                                  navigate("/my-account", {
                                    state: {
                                      path: path,
                                    },
                                  })
                                }
                              >
                                Register Now
                              </button>
                            :
                              <button
                                className="btn"
                                disabled={(data.noofseats + data.virtualSeats) == 0 ? true : false}
                                onClick={scroll}
                              >
                                Register Now
                              </button>
                            }
                          </div>
                        </div>
                      </>
                    ) : data.type === "Bootcamp" && parentInfo && parentInfo.parentsplanstatus === "Active" ? (
                      <>
                        <div className="col-xl-5 col-lg-5 col-md-5 text-right">
                          <h2 className="prevprice">
                            <del> ${(data.priceincents / 100).toFixed(2)} </del>
                          </h2>
                          <span className="price"> $50.00 </span>
                          <h3 className="points"> or&nbsp;500&nbsp;Insighter Points </h3>
                          <div style={{ textAlign: "right", marginTop: "10px" }}>
                            <div className="discount">
                              <span> Discounted as a part of your {parentInfo.planName.includes("Enterprise Plan") ? "Enterprise Plan" : "Pro Plan"} </span>
                            </div>
                          </div>
                          <div className="RN"> 
                            {localStorage.getItem("tokenCustomer") == null ?
                              <button 
                                className="btn"
                                disabled={(data.noofseats + data.virtualSeats) == 0 ? true : false}
                                onClick={() => 
                                  navigate("/my-account", {
                                    state: {
                                      path: path,
                                    },
                                  })
                                }
                              >
                                Register Now
                              </button>
                            :
                              <button
                                className="btn"
                                disabled={(data.noofseats + data.virtualSeats) == 0 ? true : false}
                                onClick={scroll}
                              >
                                Register Now
                              </button>
                            }
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {data.type !== "Private" && (
                          <div className="col-xl-5 col-lg-5 col-md-5 text-right">
                            <NumericFormat 
                              className="price"
                              value={(data.priceincents / 100).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                            <h3 className="points">
                              or&nbsp; 
                              <NumericFormat
                              value={Math.floor(data.priceincents / 10)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                              &nbsp;Insighter Points
                            </h3>
                            <div className="RN"> 
                              {localStorage.getItem("tokenCustomer") == null ?
                                <button 
                                  className="btn"
                                  disabled={(data.noofseats + data.virtualSeats) == 0 ? true : false}
                                  onClick={() => 
                                    navigate("/my-account", {
                                      state: {
                                        path: path,
                                      },
                                    })
                                  }
                                >
                                  Register Now
                                </button>
                              :
                                <button
                                  className="btn"
                                  disabled={(data.noofseats + data.virtualSeats) == 0 ? true : false}
                                  onClick={scroll}
                                >
                                  Register Now
                                </button>
                              }
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                :
                  ""  
                }
              </div>
            </div>
          </div>
          <div className="event_description">
            <div className="description">
              <div 
                dangerouslySetInnerHTML={{
                  __html: `${
                    data.description
                      ? data.description
                        .replace(/(<p><\/p>)/g, `<br>`)
                        .replace(/<img/g, `<img class="imagepreview"`)
                      : ""
                  }`,
                }}
              >
              </div> 
            </div>
            {data.title == "Private Training Engagement" ? 
              <div className="private-training">
                <Link
                  to="/private-training"
                >
                  LEARN MORE ABOUT PRIVATE TRAINING
                  </Link>
              </div>
            :
              ""
            }
            <div className="Buttons">
              <a href={url} target="_balnk">
                <button className="btn">EXPORT TO GOOGLE CAL</button>
              </a>
              <ICalendarLink event={event}>
                <button className="btn btnical">EXPORT TO ICAL</button>
              </ICalendarLink>
            </div>
          </div>
        </>
      ) : (
       ""
      )}
    </>
  );
};

export default Event;