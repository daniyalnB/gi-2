import React, { useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
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
} from "utils/api-routes/api-routes.util";
import { AppContext } from "../../../../contexts/appContext";
import PaymentCard from "./PaymentCard";
import AddCard from "assets/AddCard.svg";
import modalclose from "assets/modal-close.svg";

const FormElement = (props) => {

  const { getCustomerInfo } = useContext(AppContext);

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
};

const ManagePaymentMethod = (props) => {

  const { getCustomerInfo, myInfo, cards } = useContext(AppContext);

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
  }, [])

  useEffect(() => {
    if (cards) {
      setCardInfo(cards);
      setLoadingCard(false);
    }
  }, [cards]);

  function handleManagePayment () {
    props.handleManagePayment(false);
    localStorage.removeItem("managepayment");
  }

  function handleLoadingCard (newValue) {
    setLoadingCard(newValue);
  }
    
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
      <div className="manage-payment-method-section">
        <div className="row header">
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-6 col-8">
            <h3 className="heading">
              Manage Payment Method
            </h3>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-4 text-right">
            <button 
              className="btn"
              onClick={handleManagePayment}
            >
              Back
            </button>
          </div>
        </div>
        <hr />
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
                onClick={handlecardshow}
              >
                <img 
                  src={AddCard}
                />
              </div>
            </div>
          </div>
        </div>                       
      </div>
    </>
  );
}

export default withRouter(ManagePaymentMethod);