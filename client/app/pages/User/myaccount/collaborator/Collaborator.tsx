import React, { useEffect, useContext, useState } from "react";
const ActionableXactimateProfile = React.lazy(() => import("../actionable-xactimate-profile"));
const MyEvents = React.lazy(() => import("../my-events"));
import { Modal } from "react-bootstrap";
import queryString from "query-string";
import { 
  CardElement, 
  Elements,
  useStripe,
  useElements, 
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  getSetupIntent,
  getCustomerEventDetails,
} from "utils/api-routes/api-routes.util";
import { AppContext } from "../../../../../contexts/appContext";
import PaymentCard from "../PaymentCard";
import AddCard from "assets/AddCard.svg";
import modalclose from "assets/modal-close.svg";
import isDefaultIcon from "assets/is-default.svg";

const FormElement = (props) => {

  const { getCustomerInfo } = useContext(AppContext);

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("clientSecret", props.clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const paymentResult = await stripe.confirmCardSetup(props.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
        },
      },
    });

    setLoading(false);
    props.handleLoadingCard(true);

    if (paymentResult.error) {
      setCardError(paymentResult.error.message);
      props.handleLoadingCard(false);
    } else {
      getCustomerInfo(true);
      setCardError(false);
      props.handlecardclose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement className="card_element_form"></CardElement>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Name on card"
          onChange={(e) => setName(e.currentTarget.value)}
        />
        {cardError ? (
          <>
            <br />
            <i 
              style={{ color: "#DB422D", fontSize: "18px"}}>
              <small>
                {cardError}
              </small>
            </i>
          </>
        ) : (
          <> </>
        )}
        {!loading && ( 
          <div className="modal-save">
            <button 
              type="submit" 
              className="btn"
            >
              <span> Save </span>
            </button>
          </div>
        )}
        {loading && (
          <div className="modal-save">
            <button 
              disabled
              className="btn"
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
        </div>
        )}
      </form>
    </>
  );
}

const Collaborator = (props) => {

  const { getCustomerInfo, myInfo, cards, getMyEncryptedDataFunction, encryptedData } = useContext(AppContext);

  const [loadingcard, setLoadingCard] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);
  const [addcardpopupshow, setaddcardpopupshow] = useState(false);
  const handlecardclose = () => setaddcardpopupshow(false);

  const handlecardshow = () => {
    getSI();
    setaddcardpopupshow(true);
  };

  const key = `${window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org" ? "pk_test_HlrYtzaNgA6gnxrzsdpIIYZx" : "pk_live_KyMLwFKKSjl7YqpbsEWPfrAY"}`
  
  const stripePromise = loadStripe(key);

  const getSI = () => {

    const payload = {
      customerId: myInfo.id,
    };

    const stringified = queryString.stringify(payload);

    getSetupIntent(stringified).subscribe((response) => {
      console.log(response, "SI Response");
      setClientSecret(response.response.data);
    });
  };

  useEffect(() => {
    getCustomerInfo();
    getMyEncryptedDataFunction();
  }, []);

  useEffect(() => {
    if (cards) {
      setCardInfo(cards);
      setLoadingCard(false);
    }
  }, [cards]);

  const [parentInfo, setParentInfo] = useState(false);

  const [certificationsInfo, setCertificationsInfo] = useState(props.certificationsInfo.cerstatus);

  const [ownerInfo, setOwnerInfo] = useState(false);

  const [EncryptedData, setEncryptedData] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setParentInfo(myInfo.parentinfo);
      setOwnerInfo(myInfo.ownerinfo);
      setEncryptedData(encryptedData);
    }
  }, [myInfo]);

  const [collaboratorTab, setCollaboratorTab] = useState({
    certification: true,
    membership: false,
    xactimate: false,
    events: false,
  });

  function handleLoadingCard (newValue) {
    setLoadingCard(newValue);
  };

  const ssoauth = () => {
    const host =  window.location.host;
    const LMS_KEY = "mXu8EfYLQVgh8n3iEH6zFl97UPfNwwUf";
    const LMS_SECRET = "PRVfWX16FziQkMcdsAKHfeX9WyZJhW49";
    const url = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "http://dev.actionableacademy.org" : "https://actionableacademy.org"}`
    const endpoint = `${url}/sso?secret=${LMS_SECRET}&key=${LMS_KEY}&identifier=${ownerInfo.emailaddress}&data=${EncryptedData}`;
    window.open(endpoint, "_blank");
  };

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCustomerEventDetails().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setEvents(x);
      } else {
        setEvents([]);
      }
    });
  }, []);
  
  return (
    <>
      <Modal 
        show={addcardpopupshow} 
        onHide={handlecardclose} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Card_Modal"
      >
        <Modal.Header>
          <div 
            className="add_card_title modal-title h4"
          > 
            Add Payment Option 
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <Elements stripe={stripePromise}>
            <FormElement
              clientSecret={clientSecret}
              handlecardclose={handlecardclose}
              handleLoadingCard={handleLoadingCard}
            ></FormElement>
          </Elements>
        </Modal.Body>
      </Modal>
      <div className="col-xl-8 col-lg-9 col-md-12">
        <div className="collaborator-section">
          <div className="tabs">
            <div
              className={collaboratorTab.certification ? "active" : "tab"}
              onClick={() =>
                setCollaboratorTab({
                  certification: true,
                  membership: false,
                  xactimate: false,
                  events: false,
                })
              }
            >
              Certification
            </div>
            <div
              className={collaboratorTab.membership ? "active" : "tab"}
              onClick={() =>
                setCollaboratorTab({
                  certification: false,
                  membership: true,
                  xactimate: false,
                  events: false,
                })
              }
            >
              Membership
            </div>
            <div
              className={collaboratorTab.xactimate ? "active" : "tab"}
              onClick={() =>
                setCollaboratorTab({
                  certification: false,
                  membership: false,
                  xactimate: true,
                  events: false,
                })
              }
            >
              Actionable Xactimate Profile
            </div>
            <div
              className={collaboratorTab.events ? "active" : "tab"}
              onClick={() =>
                setCollaboratorTab({
                  certification: false,
                  membership: false,
                  xactimate: false,
                  events: true,
                })
              }
            >
              My Events
            </div>
          </div>
          {collaboratorTab.certification && (
            <div className="certification">
              <div className="row certification-section">
                <div className="col-7">
                  <h3 className="plan"> Actionable Insights Academy </h3>
                </div>
                <div className="col-5 text-right">
                  <button
                    className="review-plans"
                    onClick={ssoauth}
                  > 
                    Go to Academy
                  </button>
                </div>
              </div>
              {certificationsInfo.length != 0 ? (
                <>
                  {certificationsInfo.map((val) => {
                    return (
                      <div className="active-plan">
                        <div className="row">
                          <div className="col-7">
                            <h3 className="plan"> {val.certificationtitle} </h3>
                          </div>
                          <div className="col-5">
                            <h3
                              className={
                                val.status == 0 ? "Active" :
                                val.status == 1 ? "Active" :
                                val.status == 2 ? "Cancelled" :
                                val.status == 3 ? "Active" :
                                val.status == 5 ? "Cancelled" :
                                val.status == 6 ? "Cancelled" :
                                val.status == 7 ? "Cancelled" : "Cancelled"
                              }
                            >
                              {
                                val.status == 0 ? "In Progress" :
                                val.status == 1 ? "Awaiting Exam" :
                                val.status == 2 ? "Failed" :
                                val.status == 3 ? "Active" :
                                val.status == 5 ? "Withdrawn - In Progress" :
                                val.status == 6 ? "Withdrawn - Awaiting Challenge" :
                                val.status == 7 ? "Withdrawn - Failed" : "In Active"
                              }
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })} 
                </>
              ) : (
                <div className="no-certification">
                  <h5> You are not currently registered for any certification courses! </h5>
                </div>
              )}
            </div>
          )}
          {collaboratorTab.membership && (
            <>
              <div className="membership">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                    <h3 className="heading"> Company </h3>
                    <h2 className="value"> {parentInfo.company ? parentInfo.company : "N/A"} </h2>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                    <h3 className="heading"> Company email </h3>
                    <h2 className="value"> {parentInfo.email} </h2>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                    <h3 className="heading"> Subscription Status </h3>
                    <h2 className="value"> {parentInfo.parentsplanstatus === "PendingCancellation" ? "Pending Cancellation" : parentInfo.parentsplanstatus} </h2>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                    <h3 className="heading"> Role </h3>
                    <h2 className="value"> {parentInfo.childrole == "ProfessionalPlanChild" ? "Collaborator" : "N/A"} </h2>
                  </div>
                </div>
              </div>
              <div className="manage-payment-sub-user">
                <h2> Manage Payment Method </h2>
                <div className="row">
                  {loadingcard ? (
                    <div 
                      style={{ margin: "40px auto"}} 
                      className="text-center col-xl-6 col-lg-6 col-md-6 col-sm-12"
                    >
                      <i className="fas fa-spinner fa-spin"></i>
                    </div>
                  ) : (
                    ""
                  )}
                  {parentInfo.useparentspaymentmethod && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="cards">
                        <div className={`card_item card_is_default_true`}>
                          <div className="row">
                            <div className="col text-right card_status">
                              <img src={isDefaultIcon} alt="" />
                              <span className="default"> Default </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-left">
                              <div className="card_number on_file">
                                Credit card on file
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {cardInfo && cardInfo.stripeCustomerCard.length > 0 ? (
                    cardInfo.stripeCustomerCard.map((card, index) => {
                      return (
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div className="cards">
                            <PaymentCard card={card} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      {parentInfo.useparentspaymentmethod ? (
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div 
                            className="Add-Card"
                            onClick={handlecardshow}
                          >
                            <img 
                              src={AddCard}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div 
                            className="text-center col-xl-6 col-lg-6 col-md-6 col-sm-12"
                            style={{ margin: "70px auto", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                          >
                            <span> No Payment method found! </span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div 
                              className="Add-Card"
                              onClick={handlecardshow}
                            >
                              <img 
                                src={AddCard}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                  {cardInfo && cardInfo.stripeCustomerCard.length > 0 ? (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div 
                        className="Add-Card"
                        onClick={handlecardshow}
                      >
                        <img 
                          src={AddCard}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          )}
          {collaboratorTab.xactimate && (
            <ActionableXactimateProfile />
          )}
          {collaboratorTab.events && (
            <MyEvents
              events={events}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Collaborator;