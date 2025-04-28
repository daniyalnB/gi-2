import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PaymentCard from "./PaymentCard";
import Checkout from "./subscription-and-billing/Checkout";
import Receipt from "./subscription-and-billing/Receipt";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  cancelSubscriptionPlan,
  changeSubscriptionPlanStatusToPendingCancellation,
  getSubscriptionHistory,
  getCustomerInvitationHistory,
  GetLimitedTimeOffer,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "../../../../contexts/appContext";
import download from "assets/Download.svg";
import modalclose from "assets/modal-close.svg";

const SubscriptionAndBilling = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

	const { getCustomerInfo, cards, myInfo, getMyInvitedUser, invitedUsers, getMyCoAdmin, coAdmins } = useContext(AppContext);
  
  const [cardInfo, setCardInfo] = useState(false);

  const checkDefaultCard = cardInfo && cardInfo.stripeCustomerCard.filter((card) => card.isDefault === true);

	useEffect(() => {
    getCustomerInfo();
    getMyInvitedUser();
    getMyCoAdmin();
  }, []);

  useEffect(() => {
    if (cards) {
      setCardInfo(cards);
    }
  }, [cards]);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const [couponInfo, setCouponInfo] = useState(false);

  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (myInfo) {
      setSubscriptionInfo(myInfo.subscriptioninfo);
      setCouponInfo(myInfo.subscriptioninfo.subscriptioncoupon);
      setActionableXactimateProfile({
        xactProfileveriskid: myInfo.xactProfileveriskid ? myInfo.xactProfileveriskid : "",
        xactProfileStatus: myInfo.xactProfileStatus,
      });
      GetLimitedTimeOffer(myInfo.id).subscribe((response) => {
        if (response.response.Requested_Action) {
          setError("");
        } else {
          setError(response.response.Message);
        }
      });
    }
  }, [myInfo]);

 
  const [cancelPlanLoading, setCancelPlanLoading] = useState(false);

  const [cancelPlanError, setCancelPlanError] = useState("");

  // const cancelPlan = () => {
  //   setCancelPlanLoading(true);
  //   cancelSubscriptionPlan().subscribe((response) => {
  //     if (response.response.Requested_Action) {
  //       setCancelPlanLoading(false);
  //       setCancelPlanError("");
  //       navigate("/my-account/cancel-subscription-form");
  //     } else {
  //       setCancelPlanLoading(false);
  //       setCancelPlanError(response.response.Message);
  //     }
  //   });
  // };

  const cancelPlan = () => {
    navigate("/my-account/cancel-subscription-form");
  };

  const [subscriptionHistoryData, setSubscriptionHistoryData] = useState([]);

  const [childReciptData, setChildReciptData] = useState([]);

  const [Active, setActive] = useState({
    parent: true,
    child: false,
  });

  useEffect(() => {
    getSubscriptionHistory().subscribe((response) => {
      if (response.response.Requested_Action) {
        setSubscriptionHistoryData(response.response.data);
      } else {
        setSubscriptionHistoryData([]);
      }
    });
  }, []);

  function updateTransactionHistory () {
    getSubscriptionHistory().subscribe((response) => {
      if (response.response.Requested_Action) {
        setSubscriptionHistoryData(response.response.data);
      }
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  const [membership, setMembership] = useState(true);
  const [checkout, setCheckout] = useState(false);

	useEffect(() => {
    if (!location.state) {
      setMembership(true);
			setCheckout(false);
    } else if (location?.state?.subscription === true) {
      setMembership(false);
			setCheckout(false);
    }
  }, []);

  function handleManagePayment () {
    props.handleManagePayment(true);
  };

	function handleCheckout (val1,val2,val3) {
		setMembership(val1);
		setCheckout(val2);
    props.handleXactimate(val3);
	};

  const [billingDetails, setBillingDetails] = useState([]);

  function BillingDetails (details) {
    setBillingDetails(details);
  };

  const [extraData, setExtraData] = useState([]);

  function ExtraData (data) {
    setExtraData(data);
  };

  function handleActionableXactimatePopup (val) {
    props.handleActionableXactimatePopup(val);
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static" 
        keyboard={false}
        className="Cancel_Subscription_Modal"
      >
        <Modal.Header>
          <div 
            className="cancel_subscription_title modal-title h4"
          > 
            Cancel Subscription
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handleClose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel ?
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn btn_pm" 
            onClick={handleClose}
          >
            Back
          </button>
          {!cancelPlanLoading && (
            <button
              className="btn btn_pm"
              onClick={cancelPlan}
            >
              Confirm
            </button>
          )}
          {cancelPlanLoading && (
            <button 
              className="btn btn_pm"
              disabled
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="subscription-and-billing">
        {membership == true && checkout == false ? (
          <>
            {subscriptionInfo.subscriptionstatus == "Paused" || 
              subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ?
            (
              <div className="planstatus">
                <h5> 
                  The last payment for your plan subscription has failed. 
                  This indicates that there's something wrong with your payment method.
                </h5>
              </div>
          	) : (
              ""
            )}
          	<div className="plan-description">
              <div className="row">
                <div className="col-lg-8 col-xs-12 plan">
                  <span className="h3">
                    {(subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus === "TrialCancelled" || subscriptionInfo.subscriptionstatus === "NoActivePlan") ? (
                      "No Active Plan"
                    ) : (
                      <>
                        {
                          subscriptionInfo.planname === "StandardPlan" ? "Legacy Standard Plan" :
                          subscriptionInfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                          subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                          subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                          subscriptionInfo.planname === "StandardPlanAnnual" ? "Legacy Standard Plan" :
                          subscriptionInfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                          subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                          subscriptionInfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" : ""
                        }
                      </>
                    )}
                  </span>
                  {(subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus === "TrialCancelled" || subscriptionInfo.subscriptionstatus === "NoActivePlan") ? (
                    ""
                  ) : (
                    <>
                      {subscriptionInfo.subscriptionstatus === "PendingCancellation" ? (
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 900 }}
                          overlay={
                            <Tooltip id="xactimate-tooltip-PendingCancellation">
                              Your account will be cancelled at the end of your billing period.
                              You will not be charged again.
                              You will retain access to your membership resources until the end of your billing period.
                            </Tooltip>
                          }
                        >
                          <span className={`status_${subscriptionInfo.subscriptionstatus} status`}>
                            <p>
                              {subscriptionInfo.subscriptionstatus === "PendingCancellation" ? "Pending Cancellation" : subscriptionInfo.subscriptionstatus}
                            </p>
                          </span>
                        </OverlayTrigger>
                      ) : (
                        <span className={`status_${subscriptionInfo.subscriptionstatus} status`}>
                          <p>
                            {subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? "Paused" : subscriptionInfo.subscriptionstatus}
                          </p>
                        </span>
                      )}
                    </>
                  )}
                  {/* {subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? (
                    <div className="pay-now">
                      <span
                        onClick={() => {
                          setMembership(false);
                          setCheckout(false);
                          navigate("/my-account", {
                            state: {
                              subscription: true,
                              plan: `${subscriptionInfo.planname}`,
                              ActionableXactimateProfile: {ActionableXactimateProfile},
                            }
                          });
                        }}
                      >
                        Pay Now
                      </span>
                    </div>
                  ) : (
                    ""
                  )} */}
                </div>
                {subscriptionInfo.subscriptionstatus == "Trial" ? (
                  <div className="col-lg-4 col-xs-12 days">
                    <h1> {subscriptionInfo.trialdaysremaining} day(s) left</h1>
                  </div>
                ) : (
                  <>
                    {(subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus === "TrialCancelled" || subscriptionInfo.subscriptionstatus === "NoActivePlan") ||
                      subscriptionInfo.subscriptionstatus === "PausedDueToPaymentFailure" ||
                      subscriptionInfo.subscriptionstatus === "Paused" ? (
                      <div className="col-lg-4 col-xs-12 price"></div>
                    ) : (
                      <div className="col-lg-4 col-xs-12 price">
                        {subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" ?
                          (subscriptionInfo.subscriptionstatus === "Active" ||
                          subscriptionInfo.subscriptionstatus === "PendingCancellation" ||
                          subscriptionInfo.subscriptionstatus === "Paused" ||
                          subscriptionInfo.subscriptionstatus === "PausedDueToPaymentFailure") &&
                          invitedUsers && (
                          <h5>
                            {invitedUsers.length == 0 && coAdmins.length == 0 ? 1 : invitedUsers.length + 1 + coAdmins.length}{" "}
                            {invitedUsers.length == 0 && coAdmins.length == 0 ? "User" : "Users"}
                          </h5>
                        ) : (
                          ""
                        )}
                        <h1> 
                          <NumericFormat 
                            value={(subscriptionInfo.nextchargeamount / 100).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </h1>
                        {couponInfo ? (
                          <span className="month">
                            {couponInfo.discountpercentage && (
                              <>
                                {couponInfo.couponcode} | {couponInfo.discountpercentage}% off the subscription fee for {couponInfo.duration} {subscriptionInfo.planname.includes("Annual") ? "Year(s)" : "Month(s)"}
                              </>
                            )}
                            {couponInfo.subtractfixedamountincents && (
                              <>
                                {couponInfo.couponcode} |
                                {" "}
                                <NumericFormat
                                  value={(couponInfo.subtractfixedamountincents / 100)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffix={"$"}
                                />
                                {" "}
                                off the subscription fee for {couponInfo.duration} {subscriptionInfo.planname.includes("Annual") ? "Year(s)" : "Month(s)"}
                              </>
                            )}
                          </span>
                        ) : (
                          <span className="month"> {subscriptionInfo && subscriptionInfo.planname.includes("Annual") ? "/year" : "/month"} </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="row">
                {(subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus === "TrialCancelled" || subscriptionInfo.subscriptionstatus === "NoActivePlan") ? (
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 date"></div>
                ) : (
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 date">
                    <div className="row">
                      <div className="col">
                        <h4> Subscription Date </h4>
                        {subscriptionInfo.startsubdate ? (
                          <h3> {moment(subscriptionInfo.startsubdate).format("LL")} </h3>
                        ) : (
                          <h3> N/A </h3>
                        )}
                      </div>
                      <div className="col">
                        <h4> Next Billing Date </h4>
                        {subscriptionInfo.subscriptionstatus === "PendingCancellation" ? (
                          <h3> N/A </h3>
                        ) : (
                          <>
                            {subscriptionInfo.nextsubdate ? (
                              <h3> {subscriptionInfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(subscriptionInfo.nextsubdate).format("LL")} </h3> 
                            ) : (
                              <h3> N/A </h3>
                            )}    
                         </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 subscription-btns start-button">
                  {(subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus === "TrialCancelled" || subscriptionInfo.subscriptionstatus === "NoActivePlan") ? (
                    <Link
                      className="New_Subscription btn"
                      to="/plan-matrix"
                    >
                      Start New Subscription
                    </Link>
                  ) : (
                    <>
                      {subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? (
                        <button 
                          className="btn change"
                          onClick={() => {
                            setMembership(false);
                            setCheckout(false);
                            navigate("/my-account", {
                              state: {
                                subscription: true,
                                plan: `${subscriptionInfo.planname}`,
                                ActionableXactimateProfile: {ActionableXactimateProfile},
                              }
                            });
                          }}
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button 
                          className="btn change"
                          onClick={() => navigate("/plan-matrix")}
                        >
                          {subscriptionInfo.subscriptionstatus === "Trial" ? "Upgrade Plan" : "Change Plan"}
                        </button>
                      )}
                      {subscriptionInfo.subscriptionstatus === "Trial" ? (
                        ""
                      ) : subscriptionInfo.subscriptionstatus === "PendingCancellation" ? (
                        ""
                        // <button 
                        //   className="btn btn-fix"
                        //   onClick={() => error !== "" || subscriptionInfo.planname.includes("Enterprise") ? handleShow() : navigate("/my-account/cancel-subscription")}
                        // >
                        //   Cancel Subscription
                        // </button>
                      ) : (
                        <button 
                          className="btn btn-fix"
                          onClick={() => error !== "" || subscriptionInfo.planname.includes("Enterprise") ? handleShow() : navigate("/my-account/cancel-subscription")}
                        >
                          Cancel Subscription
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-5 col-md-12">
                <div className="payment-section">
                  <div className="payment_section_header">
                    <div className="row">
                      <div className="col-8 text-left">
                        <div className="payment_header_title">
                          Subscription Transaction History
                        </div>
                      </div>
                      <div className="col-4 text-right" style={{ padding: "6px 15px 0px 0px" }}>
                        <div className="view_more">
                          <Link to="/transaction-history">
                            View More
                          </Link>
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
              {/* {(myInfo.subscriptioninfo.planname === "ProfessionalPlan" || myInfo.subscriptioninfo.planname === "ProfessionalPlanAnnual") && myInfo.subscriptioninfo.subscriptionstatus === "Active" ? (
                <div className="col-xl-6 col-lg-5 col-md-12">
                  <div className="payment-section">
                    <div className="subscription_receipt_header">
                      <div className="row">
                        <div className="col" style={{ paddingRight: "0px" }}>
                          <div
                            className={`header_title ${Active.parent ? "selected_title" : ""}`}
                            onClick={() => 
                              setActive({
                                parent: true,
                                child: false,
                              })
                            }
                          >
                            <p> Subscription Transaction History </p>
                          </div>
                        </div>
                        <div className="col" style={{ paddingLeft: "10px" }}>
                          <div
                            className={`header_title ${Active.child ? "selected_title" : ""}`}
                            onClick={() => 
                              setActive({
                                parent: false,
                                child: true,
                              })
                            }
                          >
                            <p> Child Invitation Receipt </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="payment_section_body transaction_history">
                      {Active.parent && (
                        <>
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
                        </>
                      )}
                      {Active.child && (
                        <>
                          {childReciptData.length != 0 ? (
                            <>
                              {childReciptData.map((history) => {
                                return (
                                  <div className="row">
                                    <div className="col-6 date">
                                      <h4> {moment(history.createdAt).format("MMM DD - YYYY")} </h4>
                                    </div>
                                    <div className="col-6 download text-center">
                                      {history.invitationFileUrl != null && (
                                        <a target="_blank" href={history.invitationFileUrl}>
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
                              <span> No child history found! </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
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
              )}  */}
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
                    {cardInfo && cardInfo.stripeCustomerCard.length === 0 ? (
                      <div 
                        className="text-center col"
                        style={{ margin: "50px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                      >
                        <span> No Payment method found! </span>
                      </div>
                    ) : (
                      <>
                        {checkDefaultCard.length === 0 ? (
                          <div 
                            className="text-center col"
                            style={{ margin: "50px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                          >
                            <span> No Default Payment method found! </span>
                          </div>
                        ) : (
                          <>
                            {cardInfo &&
                              cardInfo.stripeCustomerCard.map((card) => {
                                if (card.isDefault) {
                                  return <PaymentCard card={card} />;
                                }
                              })
                            }
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <hr />
                  <div className="manage-payment">
                    <button 
                      className="btn mb-2" 
                      onClick={handleManagePayment}
                    >
                      Manage Payments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : membership == false && checkout == false ? (
          <Checkout
						handleCheckout={handleCheckout}
            BillingDetails={BillingDetails}
            ExtraData={ExtraData}
					/>
        ) : membership == false && checkout == true ? (
         	<Receipt
				 		handleCheckout={handleCheckout}
            handleActionableXactimatePopup={handleActionableXactimatePopup}
            billingDetails={billingDetails}
            extraData={extraData}
            updateTransactionHistory={updateTransactionHistory}
				 	/>
        ) : (
					""
				)}
      </div>
    </>
  );
};
  
export default SubscriptionAndBilling;