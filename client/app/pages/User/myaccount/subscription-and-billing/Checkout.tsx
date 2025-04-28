import React, { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { 
  CardElement, 
  Elements,
  useStripe,
  useElements, 
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AppContext } from "../../../../../contexts/appContext";
import {
  getSetupIntent,
  getLoggedInUserInfo,
  GetAllSubscriptionPlan,
  startSubscriptionPlan,
  applyCoupons,
  updateLoggedInUser,
  updateXactProfile,
  getSubscriptionHistory,
} from "../../../../../utils/api-routes/api-routes.util";
import PaymentCard from "../PaymentCard";
import queryString from "query-string";
import { Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import validator from "validator";
import modalclose from "assets/modal-close.svg";
import AddCard from "assets/AddCard.svg";
import down from "assets/down-arrow-user.svg";

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

const Checkout = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { getCustomerInfo, myInfo, cards, getMyInvitedUser, invitedUsers, getNavbarData } = useContext(AppContext);

  const [plandata, setPlanData] = useState([]);

  useEffect(() => {
    GetAllSubscriptionPlan().subscribe((response) => {
      if (response.response.Requested_Action) {
        setPlanData(response.response.data);
        const x = response.response.data.filter(
					(plan) => plan.name === location.state.plan
				)[0];
        setPlanData(x);
        setLoadingPage(false);
      }
    });
  }, []);

  const [subscriptionHistoryData, setSubscriptionHistoryData] = useState(false);

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    getSubscriptionHistory().subscribe((response) => {
      if (response.response.Requested_Action) {
        setSubscriptionHistoryData(response.response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (subscriptionHistoryData) {
      if (subscriptionHistoryData.length == 0) {
        if (plandata.name === "ProfessionalPlan") {
          setLoadingPage(true);
  
          const payload = {
            couponCode: "Vjg5vpE3Av",
            planName: plandata.name,
            customerId: myInfo.id,
          };
  
          const stringified = queryString.stringify(payload);
  
          applyCoupons(stringified).subscribe((response) => {
            if (response.response.Requested_Action) {
              setCouponError(false);
              setCouponData(response.response.data);
              setLoadingPage(false);
            } else {
              setCouponData([]);
              setCouponError(response.response.Message)
              setLoadingPage(false);
            }
          });
        }
      } else {
        const validation = subscriptionHistoryData.some(plan => plan.planname === "ProfessionalPlan");
        if (validation === false && plandata.name === "ProfessionalPlan") {
          setLoadingPage(true);
    
          const payload = {
            couponCode: "Vjg5vpE3Av",
            planName: plandata.name,
            customerId: myInfo.id,
          };
    
          const stringified = queryString.stringify(payload);
    
          applyCoupons(stringified).subscribe((response) => {
            if (response.response.Requested_Action) {
              setCouponError(false);
              setCouponData(response.response.data);
              setLoadingPage(false);
            } else {
              setCouponData([]);
              setCouponError(response.response.Message);
              setLoadingPage(false);
            }
          });
        }
      }
    }
  }, [subscriptionHistoryData, plandata]);

  const [objContactInformationForOrderDTO, setObjContactInformationForOrderDTO] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    companyname: "",
    branch: "",
    fullAddress: "",
    streetaddress: "",
    aptorunitorsuite: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    profilepicture: "",
	});

  // Create a ref to track the previous state
  const initialContactInfoRef = useRef(null);

  useEffect(() => {
    getLoggedInUserInfo().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data
        const updatedData = {
          firstname: x.firstname,
          lastname: x.lastname,
          phonenumber: x.phonenumber,
          companyname: x.companyname || "",
          branch: x.branch || "",
          fullAddress: x.fullAddress || "",
          streetaddress: x.streetaddress || "",
          aptorunitorsuite: x.aptorunitorsuite || "",
          country: x.country || "United States",
          city: x.city || "",
          state: x.state || "",
          zipcode: x.zipcode || "",
          profilepicture: x.profilepicture,
        };
        setObjContactInformationForOrderDTO(updatedData);
        setAddress(x.fullAddress || "");
        // Set the initial values in useRef AFTER setting the state
        if (!initialContactInfoRef.current) {
          initialContactInfoRef.current = updatedData;
        }
      } else {
        alert("error");
      }
    });
  }, []);

  const handleSubmitUpdateUser = () => {
    const payload = {
      firstName: objContactInformationForOrderDTO.firstname,
      lastName: objContactInformationForOrderDTO.lastname,
      phonenumber: objContactInformationForOrderDTO.phonenumber,
      companyname: objContactInformationForOrderDTO.companyname,
      branch: objContactInformationForOrderDTO.branch,
      fullAddress: objContactInformationForOrderDTO.fullAddress,
      streetaddress: objContactInformationForOrderDTO.streetaddress,
      aptorunitorsuite: objContactInformationForOrderDTO.aptorunitorsuite,
      country: objContactInformationForOrderDTO.country,
      city: objContactInformationForOrderDTO.city,
      state: objContactInformationForOrderDTO.state,
      zipcode: objContactInformationForOrderDTO.zipcode,
    };

    const profilepicture = objContactInformationForOrderDTO.profilepicture;
    const stringified = queryString.stringify(payload);

    updateLoggedInUser(stringified, profilepicture).subscribe((response) => {
      if (response.response.Requested_Action) {
        getNavbarData();
        getCustomerInfo();
      }
    });
  };

  const [loadingcard, setLoadingCard] = useState(false);
  const [loading, setLoading] = useState(false);
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
    getMyInvitedUser();
  }, []);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  useEffect(() => {
    setActionableXactimateProfile({
      xactProfileveriskid: location.state.ActionableXactimateProfile.ActionableXactimateProfile.xactProfileveriskid ? location.state.ActionableXactimateProfile.ActionableXactimateProfile.xactProfileveriskid : "",
      xactProfileStatus: location.state.ActionableXactimateProfile.ActionableXactimateProfile.xactProfileStatus,
    });
  }, []);

  useEffect(() => {
    if (myInfo) {
      setSubscriptionInfo(myInfo.subscriptioninfo);
    }
  }, [myInfo]);

  const submitData = () => {
    if (ActionableXactimateProfile.xactProfileStatus === "Inactive" && ActionableXactimateProfile.xactProfileveriskid !== "") {
      const payload = {
        XactProfileveriskid: ActionableXactimateProfile.xactProfileveriskid,
      };
  
      const stringified = queryString.stringify(payload);
  
      updateXactProfile(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {
          console.log(response.response.Message);
        }
      });
    }
  };

  const [selectedCard, setSelectedCard] = useState(false);
  const [cardValidation, setCardValidation] = useState(false);

  useEffect(() => {
    if (cards) {
      setCardInfo(cards);
      setLoadingCard(false);
      cards.stripeCustomerCard.map((card, index) => {
        if (card.isDefault) {
          setSelectedCard(card);
          setCardValidation(true);
        }
      });
    }
  }, [cards]);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
        planName: plandata.name,
        PAYMENTMETHODID: selectedCard.paymentMethodId,
        couponcode: couponData.code,
        customerId: myInfo.id,
      };
  
      const stringified = queryString.stringify(payload);
  
      startSubscriptionPlan(stringified, objContactInformationForOrderDTO).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setLoading(false);
          // Check if any value has changed from the initial state
          const hasChanged = Object.keys(objContactInformationForOrderDTO).some(
            (key) => objContactInformationForOrderDTO[key] !== initialContactInfoRef.current[key]
          );
          if (hasChanged) {
            console.log("Values changed, trigger action");
            handleSubmitUpdateUser();
          } else {
            console.log("No values changed, do nothing");
          }
          if (plandata.name === "ProfessionalPlan" || plandata.name === "ProfessionalPlanAnnual") {
            submitData();
          }
          props.BillingDetails(objContactInformationForOrderDTO);
          props.ExtraData(response.response.data);
          handleCheckout();
          navigate(location.pathname, { replace: true, state: undefined });
          window.scrollTo(0, 0);
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState([]);
  const [couponError, setCouponError] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
 
  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    setCouponLoading(true);

    const payload = {
      couponCode: coupon.trim(),
      planName: plandata.name,
      customerId: myInfo.id,
    };

    const stringified = queryString.stringify(payload);

    applyCoupons(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCouponLoading(false);
        setCoupon("");
        setCouponError(false);
        setCouponData(response.response.data);
      } else {
        setCouponLoading(false);
        setCouponData([]);
        setCouponError(response.response.Message);
      }
    });
  };

  function handleCheckout () {
		props.handleCheckout(false, true, false);
	}

  function handleLoadingCard (newValue) {
    setLoadingCard(newValue);
  }

  const [state, setState] = useState(false);
	const [searchState, setSearchState] = useState("");

	const UnitedStatesStateList = [
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

  const CanadaStateList = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Other"
  ];

  const AustraliaStateList = [
    "New South Wales",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
    "Australian Capital Territory",
    "Northern Territory",
    "Other"
  ];

  const getStateList = (country) => {
    switch (country) {
      case "United States":
        return UnitedStatesStateList;
      case "Canada":
        return CanadaStateList;
      case "Australia":
        return AustraliaStateList;
      default:
        return [];
    }
  };

  const [country, setCountry] = useState(false);

  const countryList = ["Australia", "Canada", "United States", "Other"];

  const [address, setAddress] = useState("");

  const [enterAddressManually, setenterAddressManually] = useState(false);

  const handleSelect = async (selectedAddress) => {
    try {
      // Geocode the selected address
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
  
      // Parse address components
      const addressComponents = results[0].address_components;
      const place = {
        fullAddress: selectedAddress,
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      };
  
      addressComponents.forEach((component) => {
        if (component.types.includes("route")) {
          place.street = component.long_name;
        }
        if (component.types.includes("locality")) {
          place.city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          place.state = component.long_name;
        }
        if (component.types.includes("postal_code")) {
          place.postal_code = component.long_name;
        }
        if (component.types.includes("country")) {
          place.country = component.long_name;
        }
      });
  
      // Step 1: Remove country names (USA, Canada, Australia) from the fullAddress
      let fullAddressWithoutCountry = selectedAddress
        .replace(/,?\s*USA\s*$/i, "") // Remove "USA"
        .replace(/,?\s*Canada\s*$/i, "") // Remove "Canada"
        .replace(/,?\s*Australia\s*$/i, ""); // Remove "Australia"
  
      // Step 2: Extract the part before the first comma for street address
      const streetAddress = fullAddressWithoutCountry.split(',')[0].trim();
  
      // Step 3: Append the postal code (if it exists)
      if (place.postal_code) {
        fullAddressWithoutCountry += `, ${place.postal_code}`;
      }
  
      // Update the address state with the modified address
      setAddress(fullAddressWithoutCountry);
  
      // Update the contact information object
      setObjContactInformationForOrderDTO((prevState) => ({
        ...prevState,
        fullAddress: fullAddressWithoutCountry,
        streetaddress: streetAddress,
        city: place.city || "",
        state: place.state || "",
        zipcode: place.postal_code || "",
        country: place.country || "",
        aptorunitorsuite: "", // Clear the apt field when new address is selected
      }));
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

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
      {!loadingPage && (
        <div className="membership-checkout">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 plan">
              <h1>
                {
                  plandata.name === "StandardPlan" ? "Legacy Standard Plan" :
                  plandata.name === "PlusPlan" ? "Plus Plan (Monthly)" :
                  plandata.name === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                  plandata.name === "StandardPlanAnnual" ? "Legacy Standard Plan" :
                  plandata.name === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                  plandata.name === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : ""
                }
              </h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 price">
              {plandata.price ? (
                <>
                  {couponData.length !== 0 ? (
                    <>
                      <h1> ${(couponData.newprice / 100).toFixed(2)} </h1>
                      <span> {plandata.name.includes("Annual") ? "/year" : "/month"} </span>
                    </>
                  ) : subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual") && (subscriptionInfo.subscriptionstatus === "PausedDueToPaymentFailure" || subscriptionInfo.subscriptionstatus === "Paused") ? (
                    <>
                      {invitedUsers.length == 0 ? (
                        <>
                          <h1> ${(plandata.price / 100).toFixed(2)} </h1>
                          <span> {plandata.name.includes("Annual") ? "/year" : "/month"} </span>
                        </>
                      ) : (
                        <>
                          <h1> ${(plandata.price * (invitedUsers.length + 1) / 100).toFixed(2)} </h1>
                          <span> {plandata.name.includes("Annual") ? "/year" : "/month"} </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <h1> ${(plandata.price / 100).toFixed(2)} </h1>
                      <span> {plandata.name.includes("Annual") ? "/year" : "/month"} </span>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="billing-details">
            <h5> Billing details </h5>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label> First Name </label>
                  <b 
                    style={{
                      color: "red",
                      fontSize: "25px",
                    }}
                  >
                    *
                  </b>                
                  <input
                    type="text"
                    name="firstname"
                    required
                    className={`form-control ${objContactInformationForOrderDTO.firstname === "" ? "pulse" : ""}`}
                    placeholder="Enter"
                    value={objContactInformationForOrderDTO.firstname}
                    onChange={(e) =>
                      setObjContactInformationForOrderDTO({
                        ...objContactInformationForOrderDTO,
                        firstname: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label> Last Name </label>
                  <b 
                    style={{
                      color: "red",
                      fontSize: "25px",
                    }}
                  >
                    *
                  </b>
                  <input
                    type="text"
                    name="lastname"
                    required
                    className={`form-control ${objContactInformationForOrderDTO.lastname === "" ? "pulse" : ""}`}
                    placeholder="Enter"
                    value={objContactInformationForOrderDTO.lastname}
                    onChange={(e) =>
                      setObjContactInformationForOrderDTO({
                        ...objContactInformationForOrderDTO,
                        lastname: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label> Company Name </label>
                  <b 
                    style={{
                      color: "red",
                      fontSize: "25px",
                    }}
                  >
                    *
                  </b>
                  <input
                    type="text"
                    name="companyname"
                    required
                    className={`form-control ${objContactInformationForOrderDTO.companyname === "" ? "pulse" : ""}`}
                    placeholder="Enter"
                    value={objContactInformationForOrderDTO.companyname}
                    onChange={(e) =>
                      setObjContactInformationForOrderDTO({
                        ...objContactInformationForOrderDTO,
                        companyname: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
              {plandata.name === "ProfessionalPlan" || plandata.name === "ProfessionalPlanAnnual" ? (
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Branch/Location </label>
                    <b 
                      style={{
                        color: "red",
                        fontSize: "25px",
                        visibility: "hidden",
                      }}
                    >
                      *
                    </b>
                    <input
                      type="text"
                      name="branch"
                      required
                      className={`form-control ${objContactInformationForOrderDTO.branch === "" ? "pulse" : ""}`}
                      placeholder="Enter"
                      value={objContactInformationForOrderDTO.branch}
                      onChange={(e) =>
                        setObjContactInformationForOrderDTO({
                          ...objContactInformationForOrderDTO,
                          branch: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="row">
              {enterAddressManually ? (
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Street Address </label>
                    <b 
                      style={{
                        color: "red",
                        fontSize: "25px",
                      }}
                    >
                      *
                    </b>                 
                    <input
                      type="text"
                      name="streetaddress"
                      required
                      className={`form-control ${objContactInformationForOrderDTO.streetaddress === "" ? "pulse" : ""}`}
                      placeholder="Enter"
                      value={objContactInformationForOrderDTO.streetaddress}
                      onChange={(e) =>
                        setObjContactInformationForOrderDTO({
                          ...objContactInformationForOrderDTO,
                          streetaddress: e.currentTarget.value,
                        })
                      }
                    />
                    <div className="address-checkbox">
                      <ul>
                        <li>
                          <label htmlFor="c1">
                            <input
                              id="c1"
                              type="checkbox"
                              checked={enterAddressManually}
                            />
                            <span onClick={() => setenterAddressManually(!enterAddressManually)}></span>
                            <span onClick={() => setenterAddressManually(!enterAddressManually)}>
                              Enter address manually
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <PlacesAutocomplete
                  value={address}
                  onChange={(value) => {
                    setAddress(value);
                    if (!value) {
                      setObjContactInformationForOrderDTO((prevState) => ({
                        ...prevState,
                        fullAddress: "",
                        streetaddress: "",
                        city: "",
                        state: "",
                        zipcode: "",
                        country: "",
                      }));
                    }
                  }}
                  onSelect={handleSelect}
                  searchOptions={{
                    componentRestrictions: {
                      country: ["us", "ca", "au"],
                    },
                    country: ["us", "ca", "au"],
                  }}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <div className="form-group position-relative">
                        <label> Address </label>
                        <b 
                          style={{
                            color: "red",
                            fontSize: "25px",
                          }}
                        >
                          *
                        </b>   
                        <input
                          {...getInputProps({
                            required: true,
                            placeholder: "Enter",
                            className: `form-control ${!enterAddressManually && objContactInformationForOrderDTO.fullAddress === "" ? "pulse" : ""}`,
                            readOnly: enterAddressManually,
                          })}
                        />
                        <div className="address-checkbox">
                          <ul>
                            <li>
                              <label htmlFor="c1">
                                <input
                                  id="c1"
                                  type="checkbox"
                                  checked={enterAddressManually}
                                />
                                <span onClick={() => setenterAddressManually(!enterAddressManually)}></span>
                                <span onClick={() => setenterAddressManually(!enterAddressManually)}>
                                  Enter address manually
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                              ? "suggestion-item active"
                              : "suggestion-item";
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#e5e5e5",
                                  cursor: "pointer",
                                }
                              : {
                                  backgroundColor: "#fff",
                                  cursor: "pointer",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                                key={index}>
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              )}
              {enterAddressManually && (
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label> Apt., Unit, or Suite # </label>
                    <b 
                      style={{
                        color: "red",
                        fontSize: "25px",
                        visibility: "hidden",
                      }}
                    >
                      *
                    </b>
                    <input
                      type="text"
                      name="aptorunitorsuite"
                      required
                      className={`form-control ${objContactInformationForOrderDTO.aptorunitorsuite === "" ? "pulse" : ""}`}
                      placeholder="Enter"
                      value={objContactInformationForOrderDTO.aptorunitorsuite}
                      onChange={(e) =>
                        setObjContactInformationForOrderDTO({
                          ...objContactInformationForOrderDTO,
                          aptorunitorsuite: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            {enterAddressManually && (
              <>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label> City </label>
                      <b 
                        style={{
                          color: "red",
                          fontSize: "25px",
                        }}
                      >
                        *
                      </b>                 
                      <input
                        type="text"
                        name="city"
                        required
                        className={`form-control ${objContactInformationForOrderDTO.city === "" ? "pulse" : ""}`}
                        placeholder="Enter"
                        value={objContactInformationForOrderDTO.city}
                        onChange={(e) =>
                          setObjContactInformationForOrderDTO({
                            ...objContactInformationForOrderDTO,
                            city: e.currentTarget.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label> State </label> 
                      <b 
                        style={{
                          color: "red",
                          fontSize: "25px",
                        }}
                      >
                        *
                      </b>
                      <input
                        type="text"
                        name="state"
                        className={`form-control ${objContactInformationForOrderDTO.state === "" ? "pulse" : ""}`}
                        placeholder="Enter"
                        required
                        style={{ 
                          color: "transparent",
                          textShadow: "0 0 0 #495057",
                          cursor: "pointer",
                        }}
                        value={objContactInformationForOrderDTO.state}
                        onClick={() => setState(!state)} 
                      />
                      <label className="file_input_label">
                        <img
                          className="select size"
                          src={down}
                          onClick={() => setState(!state)}
                        />
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
                        <div className="state-options">
                          {getStateList(objContactInformationForOrderDTO.country)
                            .filter((val) =>
                              val.toLowerCase().includes(searchState.replace(/ /g,"").toLowerCase())
                            ).length <= 0 ? (
                            <div className="no-result">
                              <h3 style={{ cursor: "auto" }}>
                                No results!
                              </h3>
                            </div>
                          ) : (
                            <>
                              {getStateList(objContactInformationForOrderDTO.country)
                                .filter((val) =>
                                  val.toLowerCase().includes(searchState.replace(/ /g,"").toLowerCase())
                                )
                                .map((val, key) => {
                                  return (
                                    <div key={key}>
                                      <h3
                                        onClick={(e) => { 
                                          setState(!state),
                                          setObjContactInformationForOrderDTO({
                                            ...objContactInformationForOrderDTO,
                                            state: val,
                                          });
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "-25px" }}>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label> Zip Code </label>
                      <b 
                        style={{
                          color: "red",
                          fontSize: "25px",
                        }}
                      >
                        *
                      </b>                 
                      <input
                        type="text"
                        name="zipcode"
                        required
                        className={`form-control ${objContactInformationForOrderDTO.zipcode === "" ? "pulse" : ""}`}
                        placeholder="Enter"
                        value={objContactInformationForOrderDTO.zipcode}
                        onChange={(e) =>
                          setObjContactInformationForOrderDTO({
                            ...objContactInformationForOrderDTO,
                            zipcode: e.currentTarget.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label> Country </label> 
                      <b 
                        style={{
                          color: "red",
                          fontSize: "25px",
                        }}
                      >
                        *
                      </b>
                      <input
                        type="text"
                        name="country"
                        className={`form-control ${objContactInformationForOrderDTO.country === "" ? "pulse" : ""}`}
                        placeholder="Enter"
                        required
                        style={{ 
                          color: "transparent",
                          textShadow: "0 0 0 #495057",
                          cursor: "pointer",
                        }}
                        value={objContactInformationForOrderDTO.country}
                        onClick={() => setCountry(!country)}
                      />
                      <label className="file_input_label">
                        <img
                          className="select size"
                          src={down}
                          onClick={() => setCountry(!country)}
                        />
                      </label>
                      <div className={country ? "active_new" : "dropdown-content"}>
                        <div
                          className="state-options"
                          style={{ height: "110px" }}
                        >
                          {countryList.map((val, key) => {
                            return (
                              <div key={key}>
                                <h3
                                  onClick={(e) => {
                                    setCountry(!country),
                                    setObjContactInformationForOrderDTO({
                                      ...objContactInformationForOrderDTO,
                                      country: val,
                                    });
                                  }}
                                >
                                  {val}
                                </h3>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {plandata.name === "ProfessionalPlan" || plandata.name === "ProfessionalPlanAnnual" ? (
              <div className="row XactwareVeriskID">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group mt-3">
                    <label> Xactware/Verisk ID </label>               
                    <input
                      type="text"
                      name="xactProfileveriskid"
                      className="form-control"
                      style={{ border: "1px solid #D2D2D2" }}
                      placeholder="Enter"
                      autoComplete="off"
                      readOnly={ActionableXactimateProfile.xactProfileStatus === "Inactive" ? false : true}
                      value={ActionableXactimateProfile.xactProfileveriskid}
                      onChange={(e) =>
                        setActionableXactimateProfile({
                          ...ActionableXactimateProfile,
                          xactProfileveriskid: e.currentTarget.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label> Coupon Code </label>                    
                  <input
                    type="text"
                    name="coupon"
                    className="form-control"
                    placeholder="Enter"
                    value={coupon}
                    onChange={(e) => setCoupon(e.currentTarget.value)}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 apply">
                {!couponLoading && (
                  <button 
                    className="btn"
                    disabled={coupon === "" ? true : false}
                    onClick={handleSubmitCoupon}
                  >
                    Apply
                  </button>
                )}
                {couponLoading && (
                  <button
                    disabled
                    className="btn"
                  >
                    <i className="fas fa-spinner fa-spin"></i>
                  </button>
                )}
              </div>
            </div>
            {couponError ? (
              <div className="row" style={{ margin: "0px 0px 15px 0px" }}>
                <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
                  {couponError} 
                </span>
              </div>
            ) : (
              ""
            )}
            {couponData.length !== 0 ? ( 
              <>
                {couponData.code === "Vjg5vpE3Av" ? (
                  <div className="row coupon_success_99">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 sec-1">
                      <span>
                        {couponData.reducedpercentage ? (
                          <>
                            Percentage OFF: <b>{couponData.reducedpercentage}%</b>
                          </>
                        ) : (
                          <>
                            Amount Reduced:{" "}
                            <b>
                              <NumericFormat
                                value={(couponData.amountreducned / 100).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </b>
                          </>
                        )}
                        <br />
                        Duration: <b>{couponData.duration} Month(s)</b>
                      </span>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-8 sec-2">
                      <span>
                        Try Before You Buy promotion is active.
                        If you would like to override this automatically applied coupon, please enter your new code above.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col">
                      <span className="coupon_success text-left">
                        Coupon Applied: <b>{couponData.code}</b>
                        <br />
                        {couponData.reducedpercentage ? (
                          <>
                            Percentage OFF: <b>{couponData.reducedpercentage}%</b>
                          </>
                        ) : (
                          <>
                            Amount Reduced:{" "}
                            <b>
                              <NumericFormat
                                value={(couponData.amountreducned / 100).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </b>
                          </>
                        )}
                        <br />
                        Duration: <b>{couponData.duration} {plandata.name.includes("Annual") ? "Year(s)" : "Month(s)"}</b>
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
            <div className="payment-info">
              <p> Payment Method </p>
            <div className="manage-payment-card-section">
              <div className="row">
                {loadingcard ? (
                  <div 
                    style={{
                      margin: "70px auto",
                      padding: "0px",
                    }} 
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
                      <div
                        style={{ padding: "0px" }}
                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                      >
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
                <div
                  style={{ padding: "0px" }}
                  className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                >
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
            <hr 
              style={{ margin: "20px -30px"}}
            />
            {errorMsg !== "" ? (
              <div className="error-msg">
                <h2> {errorMsg} </h2>
              </div>
            ) : (
              ""
            )}
            <div className="checkout-btns">
              <button 
                className="btn back"
                onClick={() => navigate("/plan-matrix")}
              >
                Back
              </button>
              {!loading && ( 
                <button 
                  className="btn"
                  onClick={handleSubmit}
                  disabled={
                    objContactInformationForOrderDTO.firstname == "" ||
                    objContactInformationForOrderDTO.lastname == "" ||
                    objContactInformationForOrderDTO.companyname == "" ||
                    (!enterAddressManually && objContactInformationForOrderDTO.fullAddress === "") ||
                    (enterAddressManually && (
                      objContactInformationForOrderDTO.streetaddress === "" ||
                      objContactInformationForOrderDTO.city === "" ||
                      objContactInformationForOrderDTO.state === "" ||
                      objContactInformationForOrderDTO.zipcode === "" ||
                      objContactInformationForOrderDTO.country === ""
                    )) ||
                    !cardValidation
                      ? true
                      : false
                  }
                >
                  Checkout
                </button>
              )}
              {loading && (
                <button 
                  disabled
                  className="btn"
                >
                  <i className="fas fa-spinner fa-spin"></i>
                </button>
              )}
            </div>
            {cardInfo && cardInfo.stripeCustomerCard.length > 0 ? 
              (
                ""
              ) : (
                <div
                  className="error-msg"
                  style={{ marginTop: "30px" }}
                >
                  <h2> Please add a credit card to proceed with the checkout. </h2>
                </div>
              )
            }
          </div>
        </div>
      )}
      {loadingPage && (
        <div style={{ padding: "175px" }}>
          <LottieLoader />
        </div>
      )}
    </>
  );
}

export default Checkout;