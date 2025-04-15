import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Helmet } from "react-helmet";
import Modal from "react-bootstrap/Modal";
import queryString from "query-string";
import history from "../../../../utils/history";
import { 
  CardElement, 
  Elements,
  useStripe,
  useElements, 
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  getCustomerInfoById,
  deletePaymentMethod,
  getSetupIntentAdmin,
} from "../../../../utils/api-routes/api-routes.util";
import PaymentCard from "./PaymentCard";
import back from "assets/arrowleft.svg";
import visa from "assets/visa.png";
import mastercard from "assets/mastercard.png";
import AmericanExpress from "assets/americanexpress.png";
import JCB from "assets/jcb.svg";
import discover from "assets/discover.png";
import isDefaultIcon from "assets/is-default.svg";
import alert from "assets/Alert_Circle.svg";
import AddCard from "assets/AddCard.svg";
import removecard from "assets/remove-card.svg";
import modalclose from "assets/modal-close.svg";

const FormElement = (props) => {

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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
      setCardError(false);
      props.handlecardclose1();
      props.handleCardInfo();
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
};

const ManagePayments = (props) => {

  const [loadingPage, setLoadingPage] = useState(true);

  const [data, setData] = useState([]);

  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setCardInfo(x.stripeCustomerCard);
        if (x == undefined) {
          history.push("/gi-team/users");
        }
        setLoadingPage(false);
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

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const [card, setCard] = useState({
    customedId: "",
    pmId: "",
  });

  const deletePM = () => {
    setLoading(true);

    const payload = {
			customedId: card.customedId,
      pmId: card.pmId,
		};

    const stringified = queryString.stringify(payload);

    deletePaymentMethod(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        handlecardclose();
        update();
      } else {
        setErr(response.response.Message);
        setLoading(false);
      }
    });
  };

  function update () {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setCardInfo(x.stripeCustomerCard);
      }
    });
  };

  const [loadingcard, setLoadingCard] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);
  const [addcardpopupshow1, setaddcardpopupshow1] = useState(false);
  const handlecardclose1 = () => setaddcardpopupshow1(false);

  const handlecardshow1 = () => {
    getSI();
    setaddcardpopupshow1(true);
  };

  const key = `${window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org" ? "pk_test_HlrYtzaNgA6gnxrzsdpIIYZx" : "pk_live_KyMLwFKKSjl7YqpbsEWPfrAY"}`

  const stripePromise = loadStripe(key);

  const getSI = () => {

    const payload = {
      customerId: data.id,
    };

    const stringified = queryString.stringify(payload);

    getSetupIntentAdmin(stringified).subscribe((response) => {
      console.log(response, "SI Response");
      setClientSecret(response.response.data);
    });
  };

  function handleLoadingCard (newValue) {
    setLoadingCard(newValue);
  };

  function handleCardInfo () {
    setLoadingCard(true);
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setCardInfo(x.stripeCustomerCard);
        setLoadingCard(false);
      }
    });
  };

  function handlePaymentCard () {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setCardInfo(x.stripeCustomerCard);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          Manage Payments - Actionable Insights Admin
        </title>
      </Helmet>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose}
        backdrop="static" 
        keyboard={false}
        className="Delete_Card_Modal"
      >
        <Modal.Header>
          <img src={alert} />
        </Modal.Header>
        <Modal.Body className="support_body">
          <div className="row text-center">
            <div className="col">
              <p> Are you sure you want to delete this card? </p>
            </div>
          </div>
          {Err ? (
            <>
              <div className="text-center">
                <i 
                  style={{
                    color: "#DB422D",
                    fontSize: "18px"
                  }}>
                  <small>
                    {Err}
                  </small>
                </i>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="modal-save">
            <button 
              className="btn btn_no" 
              onClick={handlecardclose}
            >
              <span> No </span>
            </button>
            {!loading && ( 
              <button 
                className="btn"
                style={{ marginLeft: "15px" }}
                onClick={deletePM}
              >
                <span> Yes </span>
              </button>
            )}
            {loading && (
              <button 
                disabled
                className="btn"
                style={{ marginLeft: "15px" }}
              >
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <Modal 
        show={addcardpopupshow1} 
        onHide={handlecardclose1} 
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
            onClick={handlecardclose1}
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
              handlecardclose1={handlecardclose1}
              handleLoadingCard={handleLoadingCard}
              handleCardInfo={handleCardInfo}
            ></FormElement>
          </Elements>
        </Modal.Body>
      </Modal>
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
                      Manage Payments
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/view-subscription/${props.match.params.id}`}
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingPage && (
                  <div className="info-data">
                    <div className="manage-payment-card-section">
                      <div className="row">
                        {loadingcard ? (
                          <div 
                            style={{ margin: "70px auto" }} 
                            className="text-center col-xl-6 col-lg-6 col-md-6 col-sm-12"
                          >
                            <i className="fas fa-spinner fa-spin"></i>
                          </div>
                        ) : (
                          ""
                        )}
                        {cardInfo && cardInfo.length > 0 ? (
                          cardInfo.map((card, index) => {
                            return (
                              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div className="cards">
                                  <PaymentCard
                                    card={card}
                                    id={data.id}
                                    handlePaymentCard={handlePaymentCard}
                                  />
                                </div>
                              </div>          
                            );
                          })
                        ) : (
                          <div 
                            className="text-center col-xl-6 col-lg-6 col-md-6 col-sm-12"
                            style={{
                              margin: "70px auto",
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#DB422D",
                            }}
                          >
                            <span> No Payment method found! </span>
                          </div>
                        )}
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div 
                            className="Add-Card"
                            onClick={handlecardshow1}
                          >
                            <img 
                              src={AddCard}
                            />
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
        </div>
      </div>
    </>
  );
};

export default withRouter(ManagePayments);