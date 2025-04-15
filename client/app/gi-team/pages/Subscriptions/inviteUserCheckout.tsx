import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
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
  getSetupIntentAdmin,
  updateCustomerInfo,
  ChildPaymentPreviewAdmin,
  inviteUsersAdmin,
} from "../../../../utils/api-routes/api-routes.util";
import PaymentCard from "./PaymentCard";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import AddCard from "assets/AddCard.svg";
import modalclose from "assets/modal-close.svg";
import alert from "assets/tick2.svg";

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
      props.handlecardclose();
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

const FormElementInviteUser = (props) => {

  const closeModal = () => {
    history.push(`/gi-team/view-subscription/${props.id}`);
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p>
            Sub User added
          </p>
        </div>
      </div>
      <div className="modal-save">
        <button 
          className="btn"
          style={{ width: "150px" }}
          onClick={closeModal}
        >
          <span> View Subscription </span>
        </button>
      </div>
    </>
  );
};

const InviteUserCheckout = (props) => {

  const [ChildPaymentPreviewData, setChildPaymentPreviewData] = useState(false);

  const [checkChildPaymentPreviewAPI, setCheckChildPaymentPreviewAPI] = useState(true);

  const [ChildPaymentPreviewAPIError, setChildPaymentPreviewAPIError] = useState("");

  useEffect(() => {
    if (props.location.state === undefined) {
      history.push("/gi-team/subscriptions");
    } else {
      setTimeout(() => {
				const fields = [
					{
						toInvite: props.location.state.users.toInvite,
						firstname: props.location.state.users.firstname,
						lastname: props.location.state.users.lastname,
            branch: props.location.state.users.branch,
						role: props.location.state.users.role,
						inviteMessage: props.location.state.users.inviteMessage,
						XactProfileveriskid: props.location.state.users.XactProfileveriskid,
						useparentspaymentmethod: props.location.state.users.useparentspaymentmethod,
					}
				];

				const UsersIDs = fields.map(x => x.toInvite);
				const toInvites = UsersIDs;
		
				ChildPaymentPreviewAdmin(toInvites, props.location.state.id).subscribe((response) => {
					if (response.response.Requested_Action) {
						setChildPaymentPreviewData(response.response.data);
					} else {
						setChildPaymentPreviewAPIError(response.response.Message);
						setCheckChildPaymentPreviewAPI(false);
					}
				});
			}, 1000);
    }
  }, [props]);

  const [loadingPage, setLoadingPage] = useState(true);

  const [data, setData] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  const [objContactInformationForOrderDTO, setObjContactInformationForOrderDTO] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    companyname: "",
    branch: "",
    streetaddress: "",
    aptorunitorsuite: "",
    city: "",
    state: "",
    zipcode: "",
    profilepicture: "",
	});

  useEffect(() => {
    getCustomerInfoById(props.location.state.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        if (x == undefined) {
          history.push("/gi-team/users");
        }
        setCardInfo(x.stripeCustomerCard);
        setObjContactInformationForOrderDTO({
          ...objContactInformationForOrderDTO,
          firstname: x.ownerinfo.firstname,
          lastname: x.ownerinfo.lastname,
          phonenumber: x.ownerinfo.phonenumber,
          companyname: x.ownerinfo.companyname ? x.ownerinfo.companyname : "",
          branch: x.ownerinfo.branch ? x.ownerinfo.branch : "",
          streetaddress: x.ownerinfo.streetaddress ? x.ownerinfo.streetaddress : "",
          aptorunitorsuite: x.ownerinfo.aptorunitorsuite ? x.ownerinfo.aptorunitorsuite : "",
          city: x.ownerinfo.city ? x.ownerinfo.city : "",
          state: x.ownerinfo.state ? x.ownerinfo.state : "",
          zipcode: x.ownerinfo.zipcode ? x.ownerinfo.zipcode : "",
          profilepicture: x.ownerinfo.profilepicture,
        });
        setLoadingPage(false);
      } else {
        history.push("/gi-team/users");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckoutLoading(true);

		setTimeout(() => {
			const payload = {
        toInvite: props.location.state.users.toInvite,
        firstname: props.location.state.users.firstname,
        lastname: props.location.state.users.lastname,
        branch: props.location.state.users.branch, 
        role: props.location.state.users.role,
        inviteMessage: props.location.state.users.inviteMessage,
        XactProfileveriskid: props.location.state.users.XactProfileveriskid,
        useparentspaymentmethod: props.location.state.users.useparentspaymentmethod,
        customerId: props.location.state.id,
			};

			const stringified = queryString.stringify(payload);

			inviteUsersAdmin(stringified, objContactInformationForOrderDTO).subscribe((response) => {
				if (response.response.Requested_Action) {
					const x = response.response.data;
					handleSubmitEditUser();
          handlesubcardshow();
          setErrorMsg("");
				} else {
					const x = response.response.Message;
          setErrorMsg(x);
					handleSubmitEditUser();
          setCheckoutLoading(false);
				}
			});
		}, 1000);
	}

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

  const [state, setState] = useState(false);
	const [searchState, setSearchState] = useState("");

	const stateList = [
		"Alabama",
		"Alaska",
		"Arizona",
		"Arkansas",
		"California",
		"Colorado",
		"Connecticut",
		"Delaware",
		"Florida",
		"Georgia",
		"Hawaii",
		"Idaho",
		"Illinois",
		"Indiana",
		"Iowa",
		"Kansas",
		"Kentucky",
		"Louisiana",
		"Maine",
		"Maryland",
		"Massachusetts",
		"Michigan",
		"Minnesota",
		"Mississippi",
		"Missouri",
		"Montana",
		"Nebraska",
		"Nevada",
		"New Hampshire",
		"New Jersey",
		"New Mexico",
		"New York",
		"North Carolina",
		"North Dakota",
		"Ohio",
		"Oklahoma",
		"Oregon",
		"Pennsylvania",
		"Rhode Island",
		"South Carolina",
		"South Dakota",
		"Tennessee",
		"Texas",
		"Utah",
		"Vermont",
		"Virginia",
		"Washington",
		"West Virginia",
		"Wisconsin",
		"Wyoming",
		"Alberta",
		"British Columbia",
		"Manitoba",
		"New Brunswick",
		"Newfoundland and Labrador",
		"Northwest Territories",
		"Nova Scotia",
		"Nunavut",
		"Ontario",
		"Prince Edward Island",
		"Quebec",
		"Saskatchewan",
		"Yukon",
		"Other"
	];

  const filterStateList = stateList.filter((val) =>
		val.toLowerCase().includes(searchState.replace(/ /g,"").toLowerCase())
	);

  function handleCardInfo () {
    setLoadingCard(true);
    getCustomerInfoById(props.location.state.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setCardInfo(x.stripeCustomerCard);
        setLoadingCard(false);
      }
    });
  };

  function handlePaymentCard () {
    getCustomerInfoById(props.location.state.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setData(x);
        setCardInfo(x.stripeCustomerCard);
      }
    });
  };

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(false);
  const [cardValidation, setCardValidation] = useState(false);

  useEffect(() => {
    if (cardInfo) {
      setLoadingCard(false);
      cardInfo.map((card, index) => {
        if (card.isDefault) {
          setSelectedCard(card);
          setCardValidation(true);
        }
      });
    }
  }, [cardInfo]);

  const handleSubmitEditUser = () => {
    const payload = {
      customerId: data.id,
      firstName: objContactInformationForOrderDTO.firstname,
      lastName: objContactInformationForOrderDTO.lastname,
      phonenumber: objContactInformationForOrderDTO.phonenumber,
      companyname: objContactInformationForOrderDTO.companyname,
      branch: objContactInformationForOrderDTO.branch,
      streetaddress: objContactInformationForOrderDTO.streetaddress,
      aptorunitorsuite: objContactInformationForOrderDTO.aptorunitorsuite,
      city: objContactInformationForOrderDTO.city,
      state: objContactInformationForOrderDTO.state,
      zipcode: objContactInformationForOrderDTO.zipcode,
    };
    
    const stringified = queryString.stringify(payload);
    
    updateCustomerInfo(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCheckoutLoading(false);
      }
    });
  };

  const [subcardpopupshow, setsubcardpopupshow] = useState(false);
  const handlesubcardclose = () => setsubcardpopupshow(false);
  const handlesubcardshow = () => setsubcardpopupshow(true);

  return (
    <>
      <Helmet>
        <title> 
          Invite User Checkout - Actionable Insights Admin
        </title>
      </Helmet>
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
              handleCardInfo={handleCardInfo}
            ></FormElement>
          </Elements>
        </Modal.Body>
      </Modal>
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
          <FormElementInviteUser
            handlecardclose={handlesubcardclose}
            id={data.id}
          ></FormElementInviteUser>
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
                      Add Sub User
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/view-subscription/${props.location.state.id}`}
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingPage && (
                  <>
                    <div className="row info">
                      <h3> BILLING DETAILS </h3>
                    </div>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="firstName" 
                                required 
                                id="inputField1" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.firstname}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    firstname: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField1" className="floating_label"> First Name </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="lastName" 
                                required 
                                id="inputField2" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.lastname}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    lastname: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField2" className="floating_label"> Last Name </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="companyname" 
                                required 
                                id="inputField3" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.companyname}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    companyname: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField3" className="floating_label"> Company Name </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="branch" 
                                required 
                                id="inputField9" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.branch}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    branch: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField9" className="floating_label"> Branch/Location </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="StreetAddress" 
                                required 
                                id="inputField4" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.streetaddress}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    streetaddress: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField4" className="floating_label"> Street Address </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="aptorunitorsuite" 
                                required 
                                id="inputField5" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.aptorunitorsuite}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    aptorunitorsuite: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField5" className="floating_label"> Apt., Unit, or Suite # </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="city" 
                                required 
                                id="inputField6" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.city}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    city: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField6" className="floating_label"> City </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                onClick={() => setState(!state)} 
                                value={objContactInformationForOrderDTO.state} 
                                type="text" 
                                name="Category" 
                                required 
                                id="inputField7" 
                                className="input-area"
                                style={{ 
                                  color: "transparent",
                                  textShadow: "0 0 0 #000",
                                  cursor: "pointer",
                                }}
                              />
                              <label htmlFor="inputField7" className="floating_label"> State </label>
                              <label className="file_input_label">
                                {state ?
                                  <img 
                                    className="select size"
                                    src={up} 
                                    onClick={() => setState(!state)}
                                  />
                                :
                                  <img 
                                    className="select size"
                                    src={down} 
                                    onClick={() => setState(!state)}
                                  />
                                }
                              </label>
                              <div className={state ? "active_new" : "dropdown-content"}>
                                <div className="form-group nogroup">
                                  <div className="input-group">
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      placeholder="Search"
                                      onChange={(e) => {
                                        setSearchState(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="macro-options">
                                  {filterStateList.length <= 0 ? (
                                    <div className="no-result">
                                      <h3 style={{ cursor: "auto" }}>
                                        No results!
                                      </h3>
                                    </div>
                                  ) : (
                                    <>
                                      {filterStateList.map((val,key) => {
                                        return (
                                          <div key={key}>
                                            <h3
                                              onClick={(e) => {
                                                setState(!state),
                                                setObjContactInformationForOrderDTO({
                                                  ...objContactInformationForOrderDTO,
                                                  state: val,
                                                })  
                                              }}
                                            > 
                                              {val}
                                            </h3>
                                          </div>
                                        );
                                      })}
                                    </>
                                  )}
                                </div>
                                <hr />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="zipcode" 
                                required 
                                id="inputField8" 
                                className="input-area"
                                value={objContactInformationForOrderDTO.zipcode}
                                onChange={(e) =>
                                  setObjContactInformationForOrderDTO({
                                    ...objContactInformationForOrderDTO,
                                    zipcode: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField8" className="floating_label"> Zip Code </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? (
                      <>
                        <div className="row info">
                          <h3> PAYMENT METHOD </h3>
                        </div>
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
                    ) : (
                      ""
                    )}
                    {localStorage.getItem("role") == "Administrator" || localStorage.getItem("role") == "Root" ? (
                      <>
                        <hr className="second-hr" />
                        <div className="Buttons">
                          {errorMsg !== "" ? (
                            <div className="error-msg">
                              <h2> {errorMsg} </h2>
                            </div>
                          ) : (
                            ""
                          )} 
                          {!checkoutLoading && ( 
                            <button 
                              className="btn"
                              onClick={handleSubmit}
                              disabled={
                                objContactInformationForOrderDTO.city == "" ||
                                objContactInformationForOrderDTO.companyname == "" ||
                                objContactInformationForOrderDTO.branch == "" ||
                                objContactInformationForOrderDTO.firstname == "" ||
                                objContactInformationForOrderDTO.lastname == "" ||
                                objContactInformationForOrderDTO.state == "" ||
                                objContactInformationForOrderDTO.streetaddress == "" ||
                                objContactInformationForOrderDTO.zipcode == "" ||
                                !cardValidation ||
                                !checkChildPaymentPreviewAPI 
                                  ? true
                                  : false
                              }
                            >
                              Checkout
                            </button>   
                          )}
                          {checkoutLoading && (
                            <button 
                              disabled
                              className="btn"
                            >
                              <i className="fas fa-spinner fa-spin"></i>
                            </button>
                          )}
                          {ChildPaymentPreviewAPIError && (
                            <>
                              <br />
                              <span className="sub_user_error">
                                <p> {ChildPaymentPreviewAPIError} </p>
                              </span>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          margin: "auto 350px",
                          padding: "30px 0px",
                        }}
                      >
                        <div
                          className="form-group alert alert-danger"
                          style={{ 
                            margin: "0px",
                            width: "auto",
                          }}
                        >
                          You need to be an Admin to Checkout
                        </div>
                      </div> 
                    )}
                  </>
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

export default withRouter(InviteUserCheckout);