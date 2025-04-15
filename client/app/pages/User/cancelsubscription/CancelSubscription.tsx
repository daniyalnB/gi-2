import React, { Suspense, useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import {
  GetLimitedTimeOffer,
  ClaimCancellationDiscountOffer,
  cancelSubscriptionPlan,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "../../../../contexts/appContext";
import history from "../../../../utils/history";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import Arrow from "assets/ArrowRightGrey.svg";
import Ten_Percent from "assets/10%.png";
import TwentyFive_Percent from "assets/25%.png";
import Fifty_Percent from "assets/50%.png";
import alert from "assets/tick2.svg";
import modalclose from "assets/modal-close.svg";

const FormElementSubscription = (props) => {

  const closeModal = () => {
    history.push("/my-account");
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p style={{ marginBottom: "5px" }}>
            The discount has been applied to your next payment.
          </p>
          <p>
            Thank you.
          </p>
        </div>
      </div>
      <div className="modal-save">
        <button 
          className="btn discount"
          style={{ width: "150px" }}
          onClick={closeModal}
        >
          <span> Close </span>
        </button>
      </div>
    </>
  );
};

const CancelSubscription = (props) => {

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [offer, setOffer] = useState([]);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  useEffect(() => {
    if (myInfo) {
      GetLimitedTimeOffer(myInfo.id).subscribe((response) => {
        if (response.response.Requested_Action) {
          setOffer(response.response.data);
          setSubscriptionInfo(myInfo.subscriptioninfo);
          setError("");
          setLoading(false);
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }
  }, [myInfo]);

  const [showOffer, setShowOffer] = useState(false);

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = () => {
    setCheckoutLoading(true);
    
    setTimeout(() => {
      const payload = {
        customerId: myInfo.id,
        cancellationDiscountType: offer.cancellationDiscountType,
      };
  
      const stringified = queryString.stringify(payload);
  
      ClaimCancellationDiscountOffer(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setCheckoutLoading(false);
          setErrorMsg("");
          handlesubcardshow();
        } else {
          setCheckoutLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

  const [cancelPlanLoading, setCancelPlanLoading] = useState(false);

  const [cancelPlanError, setCancelPlanError] = useState("");

  const cancelPlan = () => {
    history.push("/my-account/cancel-subscription-form");
  };

  const [subcardpopupshow, setsubcardpopupshow] = useState(false);
  const handlesubcardclose = () => setsubcardpopupshow(false);
  const handlesubcardshow = () => setsubcardpopupshow(true);

  return (
    <>
      <Helmet>
        <title>
          Cancel Subscription - Actionable Insights
        </title>
      </Helmet>
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
        <Modal 
          show={subcardpopupshow} 
          onHide={handlesubcardclose}
          backdrop="static"
          keyboard={false}
          className="Invite_Sub-User_Modal"
        >
          <Modal.Header>
            <div className="modal-title h4"> 
              <img src={alert} />
            </div>
          </Modal.Header>
          <Modal.Body className="support_body">
            <FormElementSubscription
              handlecardclose={handlesubcardclose}
            ></FormElementSubscription>
          </Modal.Body>
        </Modal>
        <ScrollToTop />
        <Navbar />
        <Breadcrumbs />
        <div className="main-container">
          <div className="Cancel_Subscription">
            <div className="">
              <div className="holder">
                <h2> {showOffer ? `Stay A Minute, Save For ${offer.duration === "month" ? "3 Months" : "1 Year"}?` : "Cancel Or Change Your Membership"} </h2>
              </div>
              {!loading && (
                <div className="container">
                  <div className="row m-0 p-0 pb-5 min-vh-90 align-items-center justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12 d-grid align-items-center justify-content-center">
                      {showOffer ? (
                        <>
                          <div className="Offer text-center mt-3">
                            <p className="offer-heading">
                              Limited Time Offer!
                            </p>
                            <img   
                              src={offer.cancellationDiscountType === "Fifty" ? Fifty_Percent : offer.cancellationDiscountType === "TwentyFive" ? TwentyFive_Percent : Ten_Percent}
                              alt="offer"
                              className="my-4"
                            />
                            <br />
                            <del className="current-plan-price">$ {(offer.originalAmount).toFixed(2)}</del>
                            <p className="discounted-plan-price mt-3"> 
                              <span className="amount">$ {(offer.discountedAmount).toFixed(2)}</span> 
                              <span className="month">/{offer.duration}</span>
                              <span className="star">*</span>
                            </p>
                            {!checkoutLoading && (
                              <button
                                className="btns mt-4"
                                onClick={() => handleSubmit()}
                              >
                                Claim Offer
                              </button>
                            )}
                            {checkoutLoading && (
                              <button 
                                disabled
                                className="btns mt-4"
                              >
                                <i className="fas fa-spinner fa-spin"></i>
                              </button>
                            )}
                            {errorMsg !== "" ? (
                              <div className="error-msg">
                                <h2> {errorMsg} </h2>
                              </div>
                            ) : (
                              ""
                            )}
                            <p className="discount-period mt-3">
                              *This discount will be applied for a {offer.duration === "month" ? "3-month" : "1-year"} period only.
                            </p>
                          </div>
                          <div className="text-center mt-3">
                            {cancelPlanLoading ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <>
                                {cancelPlanError !== "" ? (
                                  <div className="error-msg">
                                    <h2> {cancelPlanError} </h2>
                                  </div>
                                ) : (
                                  <span
                                    className="continue-cancellation"
                                    onClick={cancelPlan}
                                  >
                                    Thank you but no thank you - continue cancellation
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {error !== "" ? (
                            <div className="Membership text-center mt-3">
                              <div className="error-msg">
                                <h2> {error} </h2>
                              </div>
                            </div>
                          ) : (
                            <div className="Membership text-center mt-3">
                              <button
                                className="btn"
                                onClick={() => setShowOffer(true)}
                              >
                                Continue Cancellation
                              </button>
                              <br />
                              <p className="info-text mt-4">
                                The loss of all your profile data is irreversible, and there is no possibility of recovering it later.
                              </p>
                              <hr />
                              <button
                                className="btns"
                                onClick={() => history.push("/plan-matrix")}
                              >
                                Change Plan
                              </button>
                              <br />
                              <p className="info-text mt-4">
                                Before canceling, consider adjusting your plan to better suit your resource needs and continue supporting our work in the property insurance industry.
                              </p>
                              {subscriptionInfo.planname === "ProfessionalPlan" ? (
                                <>
                                  <p className="downgrade mt-4">
                                    Downgrade to Plus Plan
                                  </p>
                                  <div className="plan-price mt-3">
                                    <p className="current-plan-price"> $ 162.00 </p>
                                    <img   
                                      src={Arrow}
                                      alt="arrow"
                                      className="dropdown-icon"
                                    />
                                    <p className="downgrade-plan-price"> 
                                      <span className="amount">$ 44.00</span>
                                      <span className="month">/month</span>
                                    </p>
                                  </div>
                                </>
                              ) : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? (
                                <>
                                  <p className="downgrade mt-4">
                                    Downgrade to Plus Plan Annual
                                  </p>
                                  <div className="plan-price mt-3">
                                    <p className="current-plan-price"> $ 1620.00 </p>
                                    <img   
                                      src={Arrow}
                                      alt="arrow"
                                      className="dropdown-icon"
                                    />
                                    <p className="downgrade-plan-price"> 
                                      <span className="amount">$ 440.00</span>
                                      <span className="month">/year</span>
                                    </p>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </>
                      )}
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
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(CancelSubscription);