import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import {
  getSubscriptionHistory,
  getCustomerOrderTransactionsHistory,
  getCustomerRefundHistory,
} from "utils/api-routes/api-routes.util";
import { Helmet } from "react-helmet";
import moment from "moment";
import download from "assets/Download.svg";

const TransactionHistory = (props) => {

  const [loading, setLoading] = useState(true);

  const [active, setActive] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
  });

  const [subscriptionHistoryData, setSubscriptionHistoryData] = useState([]);
  const [macrosHistoryData, setMacrosHistoryData] = useState([]);
  const [subusersHistoryData, setSubusersHistoryData] = useState([]);
  const [eventsHistoryData, setEventsHistoryData] = useState([]);
  const [swagsHistoryData, setSwagsHistoryData] = useState([]);
  const [certificationsHistoryData, setCertificationsHistoryData] = useState([]);
  const [giftsHistoryData, setGiftsHistoryData] = useState([]);
  const [umpireHistoryData, setUmpireHistoryData] = useState([]);
  const [pointsHistoryData, setPointsHistoryData] = useState([]);
  const [refundsHistoryData , setRefundsHistoryData] = useState([]);

  useEffect(() => {
    getSubscriptionHistory().subscribe((response) => {
      if (response.response.Requested_Action) {
        setSubscriptionHistoryData(response.response.data);
        getCustomerOrderTransactionsHistory("Macro").subscribe((response) => {
          if (response.response.Requested_Action) {
            setMacrosHistoryData(response.response.data);
          } else {
            setMacrosHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Event").subscribe((response) => {
          if (response.response.Requested_Action) {
            setEventsHistoryData(response.response.data);
          } else {
            setEventsHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Sub Users").subscribe((response) => {
          if (response.response.Requested_Action) {
            setSubusersHistoryData(response.response.data);
          } else {
            setSubusersHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Swag").subscribe((response) => {
          if (response.response.Requested_Action) {
            setSwagsHistoryData(response.response.data);
          } else {
            setSwagsHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Certification").subscribe((response) => {
          if (response.response.Requested_Action) {
            setCertificationsHistoryData(response.response.data);
          } else {
            setCertificationsHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Gifts").subscribe((response) => {
          if (response.response.Requested_Action) {
            setGiftsHistoryData(response.response.data);
          } else {
            setGiftsHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Umpire").subscribe((response) => {
          if (response.response.Requested_Action) {
            setUmpireHistoryData(response.response.data);
          } else {
            setUmpireHistoryData([]);
          }
        });
        getCustomerOrderTransactionsHistory("Insighter_Points").subscribe((response) => {
          if (response.response.Requested_Action) {
            setPointsHistoryData(response.response.data);
          } else {
            setPointsHistoryData([]);
          }
        });
        getCustomerRefundHistory().subscribe((response) => {
          if (response.response.Requested_Action) {
            setRefundsHistoryData(response.response.data);
          } else {
            setRefundsHistoryData([]);
          }
        });
        setLoading(false);
      } else {
        setSubscriptionHistoryData([]);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Transaction History - Actionable Insights
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
        <div className="main-container">
          <div className="Transaction_History">
            <div className="">
              <div className="holder">
                <h2> Transaction History </h2>
              </div>
              {!loading && (
                <>
                  <div className="row">
                    <div className="col text-right">
                      <div className="back-to-my-account">
                        <Link to="/my-account">
                          Back to My Account
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                      <div className="select_type_section">
                        <span> Select Type </span>
                        <div className="type-tabs">
                          <ul className="tabs">
                            <li
                              className={active.one ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: true,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Subscription
                            </li>
                            <li
                              className={active.two ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: true,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Macros
                            </li>
                            <li
                              className={active.three ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: true,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Sub Users
                            </li>
                            <li
                              className={active.four ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: true,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Events
                            </li>
                            <li
                              className={active.five ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: true,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Swags
                            </li>
                            <li
                              className={active.six ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: true,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Certifications
                            </li> 
                            <li
                              className={active.seven ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: true,
                                  eight: false,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Gifts
                            </li> 
                            <li
                              className={active.eight ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: true,
                                  nine: false,
                                  ten: false,
                                })
                              }
                            >
                              Umpires Manual
                            </li>    
                            {/* <li
                              className={active.nine ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: true,
                                  ten: false,
                                })
                              }
                            >
                              Insighter Points
                            </li>   */}
                            <li
                              className={active.ten ? "item active" : "item"}
                              onClick={() =>
                                setActive({
                                  one: false,
                                  two: false,
                                  three: false,
                                  four: false,
                                  five: false,
                                  six: false,
                                  seven: false,
                                  eight: false,
                                  nine: false,
                                  ten: true,
                                })
                              }
                            >
                              Refunds
                            </li>                
                          </ul>
                        </div>
                      </div>
                    </div>
                    {active.one && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Subscription Transaction History </span>
                          {subscriptionHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {subscriptionHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.createdAt).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${(history.chargedamountincents / 100).toFixed(2)} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.recipturl != null && (
                                          <a target="_blank" href={history.recipturl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.two && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Macros Transaction History </span>
                          {macrosHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {macrosHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.three && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Sub Users Transaction History </span>
                          {subusersHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {subusersHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.four && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Events Transaction History </span>
                          {eventsHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {eventsHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.five && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Swags Transaction History </span>
                          {swagsHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {swagsHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.six && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Certifications Transaction History </span>
                          {certificationsHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {certificationsHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.seven && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Gifts Transaction History </span>
                          {giftsHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {giftsHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {active.eight && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Umpires Manual Transaction History </span>
                          {umpireHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {umpireHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* {active.nine && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Insighter Points Transaction History </span>
                          {pointsHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-5 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-4 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {pointsHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-5 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-4 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )} */}
                    {active.ten && (
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="history_section">
                          <span> Refunds Transaction History </span>
                          {refundsHistoryData.length != 0 ? (
                            <>
                              <div className="payment_section_heading">
                                <div className="row">
                                    <div className="col-3 heading">
                                      <h1> Date </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Price </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Category </h1>
                                    </div>
                                    <div className="col-3 heading">
                                      <h1> Action </h1>
                                    </div>
                                  </div>
                              </div>
                              <div className="payment_section_body transaction_history">
                                {refundsHistoryData.map((history) => {
                                  return (
                                    <div className="row">
                                      <div className="col-3 date">
                                        <h4> {moment(history.date).format("MMM DD - YYYY")} </h4>
                                      </div>
                                      <div className="col-3 price">
                                        <h5> ${history.price} </h5>
                                      </div>
                                      <div className="col-3 price">
                                        <h5> {history.category} </h5>
                                      </div>
                                      <div className="col-3 download">
                                        {history.receiptUrl != null && (
                                          <a target="_blank" href={history.receiptUrl}>
                                            <img src={download} />
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })} 
                              </div>
                            </>
                          ) : (
                            <div 
                              className="text-center col"
                              style={{ margin: "150px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                            >
                              <span> No record found! </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
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
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default TransactionHistory;