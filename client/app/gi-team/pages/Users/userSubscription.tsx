import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Helmet } from "react-helmet";
import moment from "moment";
import NumberFormat from "react-number-format";
import history from "../../../../utils/history";
import {
  getCustomerInfoById,
  getCustomerSubscriptionHistory,
  changeSubscriptionPlanStatusToPendingCancellationAdmin,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import download from "assets/Download.svg";
import visa from "assets/visa.png";
import mastercard from "assets/mastercard.png";
import AmericanExpress from "assets/americanexpress.png";
import JCB from "assets/jcb.svg";
import discover from "assets/discover.png";
import isDefaultIcon from "assets/is-default.svg";

const UserSubcription = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [checkDefaultCard, setCheckDefaultCard] = useState([]);

  const [subscriptionHistoryData, setSubscriptionHistoryData] = useState([]);

  const [couponInfo, setCouponInfo] = useState([]);

  useEffect(() => {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        if (x == undefined) {
          history.push("/gi-team/users");
        }
        setCouponInfo(x.subscriptioninfo.subscriptioncoupon);
        setCheckDefaultCard(x.stripeCustomerCard.filter((card) => card.isDefault === true));
        getCustomerSubscriptionHistory(x.id).subscribe((response) => {
          if (response.response.Requested_Action) {
            const y = response.response.data;
            setSubscriptionHistoryData(y);
          }
        });
        setLoading(false);
      } else {
        history.push("/gi-team/users");
      }
    });
  }, []);

  const pmicons = {
    mastercard: mastercard,
    jcb: JCB,
    visa: visa,
    discover: discover,
    amex: AmericanExpress,
  };

  const [loadingCancel, setLoadingCancel] = useState(false);

  const cancelSubscription = (customerId) => {
    setLoadingCancel(true);
    changeSubscriptionPlanStatusToPendingCancellationAdmin({
      customerId: customerId,
    }).subscribe((res) => {
      update();
    });
  };

  function update () {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setLoadingCancel(false);
      }
    });
  }

  return (
    <>
      <Helmet>
        <title> 
          User Subcription - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="createInsightSheet">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <ScrollToTop />
              <SideMenu />
            </div>
            <div className="col-9">
              <div className="row">
                <UserTab />
              </div>
              <div className="createInsightSheet-section">
                <div className="row header">
                  <div className="col-9">
                    <h3 className="heading">
                      Subscription
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/user-details/${data.id}`}
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <div className="info-data">
                    <div className="subscription-and-billing">
                      <div className="plan-description">
                        <div className="row">
                          <div className="col-lg-7 col-xs-12 plan">
                            <span className="h3">
                              {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled") ? (
                                "No Active Plan"
                              ) : (
                                <>
                                  {data.subscriptioninfo.planname ? (
                                    data.subscriptioninfo.planname.replace("Plan", " Plan")
                                  ) : (
                                    "N/A"
                                  )}
                                </>
                              )}
                            </span>
                            {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled") ? (
                              ""
                            ) : (
                              <>
                                <span className={`status_${data.subscriptioninfo.subscriptionstatus} status`}>
                                  <p>
                                    {data.subscriptioninfo.subscriptionstatus === "PausedDueToPaymentFailure" ? "Paused" :
                                    data.subscriptioninfo.subscriptionstatus === "PendingCancellation" ? "Pending Cancellation" : data.subscriptioninfo.subscriptionstatus}
                                  </p>
                                </span>
                              </>
                            )}
                          </div>
                          {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled") ? (
                            ""
                          ) : (
                            <>
                              {data.subscriptioninfo.subscriptionstatus === "Trial" ? (
                                <div className="col-lg-5 col-xs-12 days">
                                  <h1> {data.subscriptioninfo.trialdaysremaining} day(s) left</h1>
                                </div>
                              ) : (
                                <div className="col-lg-5 col-xs-12 price">
                                  <h1> 
                                    <NumberFormat 
                                      value={(data.subscriptioninfo.nextchargeamount / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </h1>
                                  {couponInfo && couponInfo.length != 0 ? (
                                    <span className="discount-code">
                                      {couponInfo.couponcode} | {couponInfo.discountpercentage}% off the subscription fee for {couponInfo.duration} Month(s)
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        <div className="row">
                          {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled") ? (
                            ""
                          ) : (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 date">
                              <div className="row">
                                <div className="col">
                                  <h4> Subscription Date </h4>
                                  {data.subscriptioninfo.startsubdate ? (
                                    <h3> {moment(data.subscriptioninfo.startsubdate).format("LL")} </h3>
                                  ) : (
                                    "N/A"
                                  )}
                                </div>
                                <div className="col">
                                  <h4> Next Billing Date </h4>
                                  {data.subscriptioninfo.nextsubdate ? (
                                    <h3> {data.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(data.subscriptioninfo.nextsubdate).format("LL")} </h3> 
                                  ) : (
                                    "N/A"
                                  )}    
                                </div>
                              </div>
                            </div>
                          )}
                          {(data.subscriptioninfo.subscriptionstatus === "Cancelled" || data.subscriptioninfo.subscriptionstatus === "TrialCancelled") || data.subscriptioninfo.subscriptionstatus === "PendingCancellation" ? (
                            ""
                          ) : (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 subscription-btns">
                              {!loadingCancel && 
                                <button 
                                  className="btn"
                                  disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                                  onClick={() => cancelSubscription(data.id)}
                                >
                                  Cancel Subscription
                               </button>
                              }
                              {loadingCancel && (
                                <button className="btn" disabled> 
                                  <i className="fas fa-spinner fa-spin"></i>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 col-lg-5 col-md-12">
                          <div className="payment-section">
                            <div className="payment_section_header">
                              <div className="row">
                                <div className="col text-left">
                                  <div className="payment_header_title">
                                    Subscription Transaction History
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="payment_section_body transaction_history">
                              {subscriptionHistoryData.length != 0 ? (
                                <>
                                  {subscriptionHistoryData.map((history) => {
                                    return (
                                      <div className="row">
                                        <div className="col-6 date">
                                          <h4> {moment(history.createdAt).format("MMM DD - YYYY")} </h4>
                                        </div>
                                        <div className="col-4 price">
                                          <h5> ${(history.chargedamountincents / 100).toFixed(2)} </h5>
                                        </div>
                                        <div className="col-2 download">
                                          {history.recipturl != null && (
                                            <a target="_blank" href={history.recipturl}>
                                              <img src={download} />
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}      
                                </>
                              ) : (
                                <div 
                                  className="text-center col"
                                  style={{ margin: "35px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                                >
                                  <span> No transaction history found! </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-7 col-md-12">
                          <div className="payment-section">
                            <div className="payment_section_header">
                              <div className="row">
                                <div className="col text-left">
                                  <div className="payment_header_title">
                                    Payment Method
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cards">
                              {checkDefaultCard.length === 0 ? (
                                <div 
                                  className="text-center col"
                                  style={{ margin: "100px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                                >
                                  <span> No Default Payment method found! </span>
                                </div>
                              ) : (
                                checkDefaultCard.map((card) => {
                                  return (
                                    <div className="card_item card_is_default_true">
                                      <div className="row">
                                        <div className="col text-left">
                                          <img src={pmicons[card.brand]} className="brand_icon" alt="" />
                                        </div>
                                        <div className="col text-right card_status">
                                          <img src={isDefaultIcon} alt="" />
                                          <span className="default"> Default </span>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col text-left">
                                          <div className="card_number">
                                            **** **** **** {card.last4}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col text-left">
                                          <label> Name </label>
                                          <div className="info_text text-left">
                                            {card.billingDetailName}
                                          </div>
                                        </div>
                                        <div className="col text-right">
                                          <label >Valid Until </label>
                                          <div className="info_text">
                                            {card.exp_month}/{card.exp_year}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      </div>
    </>
  );
};

export default withRouter(UserSubcription);