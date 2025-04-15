import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../contexts/appContext";
import {
  BuyEvent,
  applyCouponsProduct,
  getSetupIntent,
  updateLoggedInUser,
} from "../../../utils/api-routes/api-routes.util";
import NumberFormat from "react-number-format";
import { Modal } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  CardElement,
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import queryString from "query-string";
import history from "../../../utils/history";
import visa from "assets/visa.png";
import mastercard from "assets/mastercard.png";
import AmericanExpress from "assets/americanexpress.png";
import JCB from "assets/jcb.svg";
import discover from "assets/discover.png";
import modalclose from "assets/modal-close.svg";
import AddCard from "assets/AddCard.svg";
import down from "assets/down-arrow-user.svg";
import afterpay from "assets/afterpay.png";
import alert from "assets/Alert.svg";
import radio1 from "assets/Radio1.svg";
import radio2 from "assets/Radio2.svg";

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
            <i style={{ color: "#DB422D", fontSize: "18px" }}>
              <small>{cardError}</small>
            </i>
          </>
        ) : (
          <> </>
        )}
        {!loading && (
          <div className="modal-save">
            <button type="submit" className="btn">
              <span> Save </span>
            </button>
          </div>
        )}
        {loading && (
          <div className="modal-save">
            <button disabled className="btn">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          </div>
        )}
      </form>
    </>
  );
};

// ---------- After Pay ----------

const FormElementAfterPay = (props) => {

  const { getCustomerInfo } = useContext(AppContext);

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = `${
    window.location.hostname === "localhost"
      ? "http://localhost:8000/buy-event"
      : window.location.hostname === "reactdev.getinsights.org"
      ? "https://reactdev.getinsights.org/buy-event"
      : "https://getinsights.org/buy-event"
  }`;

  const [info, setInfo] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    postalcode: "",
    state: "",
  });

  useEffect(() => {
    const x = props.objContactInformationForOrderDTO;
    setInfo({
      ...info,
      name: `${x.firstName} ${x.lastName}`,
      city: x.city,
      country: `${
        x.country == "Australia"
          ? "AU"
          : x.country == "Canada"
          ? "CA"
          : x.country == "United States"
          ? "US"
          : "Other"
      }`,
      address: x.streetaddress,
      postalcode: x.zipcode,
      state: x.state,
    });
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const paymentResult = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url: url,

        shipping: {
          address: {
            city: info.city,
            country: info.country,
            line1: info.address,
            postal_code: info.postalcode,
            state: info.state,
          },
          name: info.name,
        },
      },
      // redirect: "if_required",
      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: "if_required",
    });

    setLoading(false);

    if (paymentResult.error) {
      if (paymentResult.error.code === "amount_too_large") {
        setCardError("Amount must be no more than $2,000.00 USD");
      } else if (
        paymentResult.error.message ===
        "Country 'Other' is unknown. Try using a 2-character alphanumeric country code instead, such as 'US', 'EG', or 'GB'. A full list of country codes is available at https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements"
      ) {
        setCardError(
          "This option is not supported for your country. Please contact Actionable Insights Support for more details."
        );
      } else {
        setCardError(paymentResult.error.message);
      }
    } else {
      getCustomerInfo(true);
      setCardError(false);
      props.handlecardclose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement></PaymentElement>
        {cardError ? (
          <>
            <br />
            <i style={{ color: "#DB422D", fontSize: "18px" }}>
              <small>{cardError}</small>
            </i>
          </>
        ) : (
          <> </>
        )}
        {!loading && (
          <div className="modal-save">
            <button type="submit" className="btn">
              <span> Proceed </span>
            </button>
          </div>
        )}
        {loading && (
          <div className="modal-save">
            <button disabled className="btn">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          </div>
        )}
      </form>
    </>
  );
};

const FormElementAfterPayDisclaimer = (props) => {

  const afterpay = () => {
    props.handleafterpay();
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p>
            <strong>Disclaimer:</strong> Hey Insighter! You are about to leave
            our website to complete your purchase with Afterpay. To accept our{" "}
            {""}
            <Link
              to="/terms-and-conditions"
              target="_blank"
              style={{ color: "#26A59A" }}
            >
              Terms & Conditions
            </Link>
            {""} and check out, please click below
          </p>
        </div>
      </div>
      <div className="modal-save">
        <button className="btn" style={{ width: "auto" }} onClick={afterpay}>
          <span> Complete Purchase With Afterpay </span>
        </button>
      </div>
    </>
  );
};

const Buy_Event = (props) => {

  const payment = queryString.parse(props.location.search);

  const [paymentIntent, setPaymentIntent] = useState(false);

  useEffect(() => {
    setPaymentIntent(payment.payment_intent);
  }, [payment]);

  // console.log(paymentIntent, "paymentIntent");

  const { getCustomerInfo, cards, myInfo, getMyInsighterPoints, insighterPoints, getNavbarData } = useContext(AppContext);

  const [points, setPoints] = useState(false);

  useEffect(() => {
    if (insighterPoints) {
      setPoints(insighterPoints.nooninsighterpoint);
    }
  }, [insighterPoints]);

  useEffect(() => {
    getMyInsighterPoints();
  }, []);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);
	const [ischilduser, setIsChildUser] = useState(false);

	useEffect(() => {
		setSubscriptionInfo(myInfo.subscriptioninfo);
		setIsChildUser(myInfo.ischilduser);
  }, [myInfo]);

  const [productData, setProductData] = useState(false);

  const [propsData, setPropsData] = useState({
    quantity: 0,
    size: "",
    type: "",
    attendees: [],
    users: [],
    path: "",
    certificationStatus: 0,
  });

  const [insighterpointstouse, setInsighterpointstouse] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

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
  });

  useEffect(() => {
    if (localStorage.getItem("event_data") == null) {
      history.push("/");
    } else {
      const x = JSON.parse(localStorage.getItem("event_data"));
      setProductData(x.event);
      setPropsData({
        ...propsData,
        type: x.type,
        attendees: x.attendees,
        path: x.path,
        quantity: x.quantity,
      });
      const z = JSON.parse(localStorage.getItem("objContactInformationForOrderDTO"));
      setObjContactInformationForOrderDTO({
        ...objContactInformationForOrderDTO,
        firstname: z.firstname,
        lastname: z.lastname,
        phonenumber: z.phonenumber,
        companyname: z.companyname,
        branch: z.branch,
        fullAddress: z.fullAddress,
        streetaddress: z.streetaddress,
        aptorunitorsuite: z.aptorunitorsuite,
        country: z.country ? z.country : "United States",
        city: z.city,
        state: z.state,
        zipcode: z.zipcode,
      });
      setAddress(z.fullAddress);
    }
  }, []);

  const [parentInfo, setParentInfo] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setParentInfo(myInfo.parentinfo);
    }
  }, [myInfo]);

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
        localStorage.removeItem("event_data");
        localStorage.removeItem("objContactInformationForOrderDTO");
        localStorage.removeItem("apiDataForAfterPay");
      }
    });
  };

  const [loadingcard, setLoadingCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);
  const [cardClientSecret, setCardClientSecret] = useState(false);
  const [addcardpopupshow, setaddcardpopupshow] = useState(false);
  const handlecardclose = () => setaddcardpopupshow(false);
  const [addcardpopupshowafterpay, setaddcardpopupshowafterpay] = useState(false);
  const handlecardcloseafterpay = () => setaddcardpopupshowafterpay(false);
  const [afterpaydisclaimer, setafterpaydisclaimer] = useState(false);
  const handlcardcloseafterpaydisclaimer = () => setafterpaydisclaimer(false);
  const handlcardafterpaydisclaimershow = () => setafterpaydisclaimer(true);

  const handlecardshow = () => {
    getSI();
    setaddcardpopupshow(true);
  };

  const handleafterpay = () => {
    setafterpaydisclaimer(false);
    getPaymentIntent();
    setaddcardpopupshowafterpay(true);
  };

  const key = `${window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org" ? "pk_test_HlrYtzaNgA6gnxrzsdpIIYZx" : "pk_live_KyMLwFKKSjl7YqpbsEWPfrAY"}`;

  const stripePromise = loadStripe(key);

  const getSI = () => {

    const payload = {
      customerId: myInfo.id,
    };

    const stringified = queryString.stringify(payload);

    getSetupIntent(stringified).subscribe((response) => {
      console.log(response, "SI Response");
      setCardClientSecret(response.response.data);
    });
  };

  const [apiDataForAfterPay, setApiDataForAfterPay] = useState({
    insighterpointstouse: "",
    couponCode: "",
  });

  const getPaymentIntent = () => {
    setTimeout(() => {
      const payload = {
        eventid: productData.id,
        noofattendees: propsData.quantity,
        insighterpointstouse: insighterpointstouse,
      };

      const payloadWithCoupon = {
        eventid: productData.id,
        noofattendees: propsData.quantity,
        insighterpointstouse: insighterpointstouse,
        couponCode: couponData.code,
      };

      const stringified1 = queryString.stringify(payload);
      const stringified2 = queryString.stringify(payloadWithCoupon);

      const objBuyEventRequest = {
        attendees: propsData.attendees,
        objContactInformationForOrderDTO: objContactInformationForOrderDTO,
      };

      BuyEvent(coupon == "" ? stringified1 : stringified2, objBuyEventRequest).subscribe((response) => {
        if (response.response.Requested_Action) {
          setClientSecret(response.response.data);
          localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
          localStorage.setItem("apiDataForAfterPay", JSON.stringify(apiDataForAfterPay));
        }
      });
    }, 1000);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const [pageLoading, setPageLoading] = useState(false);

  const BuyEventAfterPay = () => {
    setPageLoading(true);

    const x = JSON.parse(localStorage.getItem("apiDataForAfterPay"));

    setTimeout(() => {
      const payload = {
        eventid: productData.id,
        noofattendees: propsData.quantity,
        insighterpointstouse: x.insighterpointstouse,
        paymentIntentId: paymentIntent,
      };

      const payloadWithCoupon = {
        eventid: productData.id,
        noofattendees: propsData.quantity,
        insighterpointstouse: x.insighterpointstouse,
        paymentIntentId: paymentIntent,
        couponCode: x.couponCode,
      };

      const stringified1 = queryString.stringify(payload);
      const stringified2 = queryString.stringify(payloadWithCoupon);

      const objBuyEventRequest = {
        attendees: propsData.attendees,
        objContactInformationForOrderDTO: objContactInformationForOrderDTO,
      };

      BuyEvent(x.couponCode == "" ? stringified1 : stringified2, objBuyEventRequest).subscribe((response) => {
        if (response.response.Requested_Action) {
          setPageLoading(false);
          setErrorMsg("");
          const x = response.response.data;
          handleSubmitUpdateUser();
          history.push({
            pathname: "/receipt",
            state: {
              propsData: propsData,
              data: x,
              couponData: couponData,
            },
          });
        } else {
          setPageLoading(false);
          setErrorMsg(response.response.Message);
          scrollToBottom();
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (paymentIntent) {
      BuyEventAfterPay();
    }
  }, [paymentIntent]);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const [selectedCard, setSelectedCard] = useState(false);
  const [cardValidation, setCardValidation] = useState(false);
  const [parentDefaultCard, setParentDefaultCard] = useState(false);
	const [parentBackupCard, setParentBackupCard] = useState(false);
  const [pc, setPC] = useState(true);

  useEffect(() => {
    if (cards) {
      if (parentInfo && parentInfo.useparentspaymentmethod) {
				setPC(true);
				setCardValidation(true);
				if (parentInfo && parentInfo.useparentspaymentmethod && parentInfo.parentsdefaultpaymentmenthodid) {
					setParentDefaultCard(true);
					setParentBackupCard(false);
				} else if (parentInfo && parentInfo.useparentspaymentmethod && parentInfo.parentsBackupPaymentMethodId) {
					setParentDefaultCard(false);
					setParentBackupCard(true);
				} else {
					setParentDefaultCard(false);
					setParentBackupCard(false);
				}
			} else {
				setPC(false);
			}
      setCardInfo(cards);
      setLoadingCard(false);
      cards.stripeCustomerCard.map((card) => {
        if (card.isDefault) {
          setSelectedCard(card);
          setCardValidation(true);
        }
      });
    }
  }, [cards]);

  const pmicons = {
    mastercard: mastercard,
    jcb: JCB,
    visa: visa,
    discover: discover,
    amex: AmericanExpress,
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const payload = {
        eventid: productData.id,
        noofattendees: propsData.quantity,
        insighterpointstouse: insighterpointstouse,
        paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
      };

      const payloadWithCoupon = {
        eventid: productData.id,
        noofattendees: propsData.quantity,
        insighterpointstouse: insighterpointstouse,
        paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
        couponCode: couponData.code,
      };

      const stringified1 = queryString.stringify(payload);
      const stringified2 = queryString.stringify(payloadWithCoupon);

      const objBuyEventRequest = {
        attendees: propsData.attendees,
        objContactInformationForOrderDTO: objContactInformationForOrderDTO,
      };

      BuyEvent(coupon == "" ? stringified1 : stringified2, objBuyEventRequest).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          const x = response.response.data;
          handleSubmitUpdateUser();
          history.push({
            pathname: "/receipt",
            state: {
              propsData: propsData,
              data: x,
              couponData: couponData,
            },
          });
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
      productid: productData.id,
      couponcode: coupon.trim(),
      quantity: propsData.quantity,
    };

    const payloadWithPoints = {
      productid: productData.id,
      couponcode: coupon.trim(),
      quantity: propsData.quantity,
      insighterpointstouse: insighterpointstouse,
    };

    const stringified1 = queryString.stringify(payload);
    const stringified2 = queryString.stringify(payloadWithPoints);

    applyCouponsProduct(insighterpointstouse == 0 ? stringified1 : stringified2).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCouponData(response.response.data);
        setApiDataForAfterPay({
          ...apiDataForAfterPay,
          couponCode: response.response.data.code,
        });
        setCouponError(false);
        setCouponLoading(false);
      } else {
        setCouponError(response.response.Message);
        setCoupon("");
        setCouponData([]);
        setCouponLoading(false);
      }
    });
  };

  const [IPError, setIPError] = useState(false);
  const [IPLoading, setIPLoading] = useState(false);

  const handleInsighterPoints = (e) => {
    e.preventDefault();
    setIPLoading(true);

    const payload = {
      productid: productData.id,
      quantity: propsData.quantity,
      insighterpointstouse: insighterpointstouse,
    };

    const payloadWithCoupon = {
      productid: productData.id,
      couponcode: coupon.trim(),
      quantity: propsData.quantity,
      insighterpointstouse: insighterpointstouse,
    };

    const stringified1 = queryString.stringify(payload);
    const stringified2 = queryString.stringify(payloadWithCoupon);

    applyCouponsProduct(coupon == "" ? stringified1 : stringified2).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCouponData(response.response.data);
        setCouponError(false);
        setIPError(false);
        setIPLoading(false);
      } else {
        setIPError(response.response.Message);
        setCouponError(false);
        setCouponData([]);
        setIPLoading(false);
      }
    });
  };

  const [termsandconditions, setTermsandConditions] = useState(false);

  function handleLoadingCard(newValue) {
    setLoadingCard(newValue);
  };

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

  const options = {
    clientSecret: clientSecret,
  };

  const handleCheckout = (e) => {
    if (objContactInformationForOrderDTO.firstname == "" ||
      objContactInformationForOrderDTO.lastname == "" ||
      objContactInformationForOrderDTO.companyname == "" ||
      (!enterAddressManually && objContactInformationForOrderDTO.fullAddress === "") ||
      (enterAddressManually && (
        objContactInformationForOrderDTO.streetaddress === "" ||
        objContactInformationForOrderDTO.city === "" ||
        objContactInformationForOrderDTO.state === "" ||
        objContactInformationForOrderDTO.zipcode === "" ||
        objContactInformationForOrderDTO.country === ""
      ))
    ) {
      scrollToTop();
    } else {
      handleSubmitEvent(e);
    }
  };

  return (
    <>
      <SEO
        title="Event Checkout - Actionable Insights"
        description="Checkout - Actionable Insights. Trying to check out after you've found what you were looking for at getinsights.org? Here is how you can proceed to payment. - (support@actionable-insights.ai; Skip to content. Home. Home One; Home Two; Home Three; User Analysis; Business Intelligence; Predictive Analysis; Sentiment Analysis; User Behaviour Analysis ; Data Scientist Profile; Data Visualization service; Analytics in Marketing; Analytics in Banking & Finance; Analytics in Manufacturing; Analytics in Security; Data Center Analytics; Analytics in Education ...)"
        link="buy-event"
      />
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
        <Modal
          show={addcardpopupshow}
          onHide={handlecardclose}
          backdrop="static"
          keyboard={false}
          className="Add_Card_Modal"
        >
          <Modal.Header>
            <div className="add_card_title modal-title h4">
              Add Payment Option
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={handlecardclose}
            >
              <img src={modalclose} />
            </button>
          </Modal.Header>
          <Modal.Body className="support_body">
            <Elements stripe={stripePromise}>
              <FormElement
                clientSecret={cardClientSecret}
                handlecardclose={handlecardclose}
                handleLoadingCard={handleLoadingCard}
              ></FormElement>
            </Elements>
          </Modal.Body>
        </Modal>
        {/* ---------- After Pay Modal ---------- */}
        <Modal
          show={addcardpopupshowafterpay}
          onHide={handlecardcloseafterpay}
          backdrop="static"
          keyboard={false}
          className="Add_Card_Modal"
        >
          <Modal.Header>
            <div className="add_card_title modal-title h4">
              Afterpay Checkout
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={handlecardcloseafterpay}
            >
              <img src={modalclose} />
            </button>
          </Modal.Header>
          <Modal.Body className="support_body">
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <FormElementAfterPay
                  clientSecret={clientSecret}
                  handlecardclose={handlecardcloseafterpay}
                  objContactInformationForOrderDTO={objContactInformationForOrderDTO}
                ></FormElementAfterPay>
              </Elements>
            )}
          </Modal.Body>
        </Modal>
        <Modal
          show={afterpaydisclaimer}
          onHide={handlcardcloseafterpaydisclaimer}
          backdrop="static"
          keyboard={false}
          className="Invite_Sub-User_Modal"
        >
          <Modal.Header>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={handlcardcloseafterpaydisclaimer}
            >
              <img src={modalclose} />
            </button>
            <div className="cancel_subscription_title modal-title h4">
              <img src={alert} />
            </div>
          </Modal.Header>
          <Modal.Body className="support_body">
            <FormElementAfterPayDisclaimer
              handleafterpay={handleafterpay}
            ></FormElementAfterPayDisclaimer>
          </Modal.Body>
        </Modal>
        <ScrollToTop />
        <Navbar />
        <Breadcrumbs />
        <div className="main-container">
          <div className="BuyProduct_page">
            <div className="">
              {!pageLoading && (
                <div className="holder">
                  <h2> Checkout </h2>
                  <div className="separator">
                    <h2> Billing Information </h2>
                    <div className="contact-info">
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12">
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
                              className={`form-control ${objContactInformationForOrderDTO.firstname === "" ? "pulse" : ""}`}
                              placeholder="Enter"
                              required
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
                        <div className="col-xl-6 col-lg-6 col-md-12">
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
                              className={`form-control ${objContactInformationForOrderDTO.lastname === "" ? "pulse" : ""}`}
                              placeholder="Enter"
                              required
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
                        <div className="col-xl-6 col-lg-6 col-md-12">
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
                              className={`form-control ${objContactInformationForOrderDTO.companyname === "" ? "pulse" : ""}`}
                              placeholder="Enter"
                              required
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
                        {subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
                          <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="form-group">
                              <label> Branch/Location </label>
                              <input
                                type="text"
                                name="branch"
                                className={`form-control ${objContactInformationForOrderDTO.branch === "" ? "pulse" : ""}`}
                                placeholder="Enter"
                                required
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
                          <div className="col-xl-6 col-lg-6 col-md-12">
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
                                className={`form-control ${objContactInformationForOrderDTO.streetaddress === "" ? "pulse" : ""}`}
                                placeholder="Enter"
                                required
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
                          <div className="col-xl-6 col-lg-6 col-md-12">
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
                                className="form-control"
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
                            <div className="col-xl-6 col-lg-6 col-md-12">
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
                                  className={`form-control ${objContactInformationForOrderDTO.city === "" ? "pulse" : ""}`}
                                  placeholder="Enter"
                                  required
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
                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div
                                className="form-group"
                                style={{ marginBottom: "0px" }}
                              >
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
                                  placeholder="Select"
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
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
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
                                  className={`form-control ${objContactInformationForOrderDTO.zipcode === "" ? "pulse" : ""}`}
                                  placeholder="Enter"
                                  required
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
                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <div
                                className="form-group"
                                style={{ marginBottom: "0px" }}
                              >
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
                                  placeholder="Select"
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
                    </div>
                    <hr className="hr-one" />
                    <h2> Your Order </h2>
                    <div className="order-info">
                      <div className="product">
                        <div className="row">
                          <div className="col">
                            <h3 className="text-left"> Product </h3>
                          </div>
                          <div className="col">
                            <h3 className="text-right"> Total </h3>
                          </div>
                        </div>
                      </div>
                      <div className="assessment">
                        <div className="row">
                          <div className="col">
                            <h3 className="text-left">
                              {productData.title} x {propsData.attendees.length}
                            </h3>
                          </div>
                          <div className="col">
                            <h3 className="text-right">
                              {productData.type === "Bootcamp" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                <NumberFormat
                                  value={((5000 * propsData.quantity) / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              ) : productData.type === "Bootcamp" && parentInfo && parentInfo.parentsplanstatus === "Active" ? (
                                <NumberFormat
                                  value={((5000 * propsData.quantity) / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              ) : (
                                <NumberFormat
                                  value={((productData.priceincents * propsData.quantity) / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <hr className="hr-two" />
                      <div className="subtotal">
                        <div className="row">
                          <div className="col">
                            <h3 className="text-left"> Subtotal </h3>
                          </div>
                          <div className="col">
                            <h3 className="text-right">
                              {productData.type === "Bootcamp" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                <NumberFormat
                                  value={((5000 * propsData.quantity) / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              ) : productData.type === "Bootcamp" && parentInfo && parentInfo.parentsplanstatus === "Active" ? (
                                <NumberFormat
                                  value={((5000 * propsData.quantity) / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              ) : (
                                <NumberFormat
                                  value={((productData.priceincents * propsData.quantity) / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <hr className="hr-two" />
                      <div className="coupon">
                        <div className="row">
                          <div className="col-4">
                            <h3 className="text-left"> Coupon </h3>
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="coupon"
                              className="form-control"
                              placeholder="Coupon Code"
                              value={coupon}
                              onChange={(e) => setCoupon(e.currentTarget.value)}
                            />
                            {!couponLoading && (
                              <button
                                className="btn"
                                disabled={coupon == "" ? true : false}
                                onClick={handleSubmitCoupon}
                              >
                                Apply Coupon
                              </button>
                            )}
                            {couponLoading && (
                              <button disabled className="btn">
                                <i className="fas fa-spinner fa-spin"></i>
                              </button>
                            )}
                          </div>
                          <div className="col-2">
                            <h3 className="text-right">
                              {couponData.length !== 0 ? (
                                <>
                                  -
                                  <NumberFormat
                                    value={(couponData.amountreducned / 100).toFixed(2)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </>
                              ) : (
                                <>
                                  $0.00
                                </>
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                      {couponError ? (
                        <div style={{ margin: "10px auto 20px", textAlign: "center" }}>
                          <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
                            {couponError}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {couponData.length !== 0 && couponData.code !== null ? ( 
                        <div className="row">
                          <div className="col" style={{ margin: "10px auto 20px", textAlign: "center" }}>
                            <span className="coupon_success">
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
                                    <NumberFormat
                                      value={(couponData.amountreducned / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </b>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <hr className="hr-two" />
                      <div className="insighter-points">
                        <div className="row">
                          <div className="col-4">
                            <h3 className="text-left"> Insighter Points </h3>
                            <div className="points-data">
                              <span> Current Insighter Points Balance </span>
                              <span style={{ color: "#26A59A" }}>
                                <NumberFormat
                                  value={points}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                              </span>
                            </div>
                            <div className="points-data">
                              <span> Insighter Points Needed For This Transaction </span>
                              <span style={{ color: "#26A59A" }}>
                                {couponData.length !== 0 ? (
                                  <>
                                    <NumberFormat
                                      value={couponData.newprice / 10}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                    />
                                    *
                                  </>
                                ) : (
                                  <>
                                    {productData.type === "Bootcamp" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                      <NumberFormat
                                        value={500 * propsData.quantity}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    ) : productData.type === "Bootcamp" && parentInfo && parentInfo.parentsplanstatus === "Active" ? (
                                      <NumberFormat
                                        value={500 * propsData.quantity}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    ) : (
                                      <NumberFormat
                                        value={(productData.priceincents * propsData.quantity) /10}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    )}
                                    *
                                  </>
                                )}
                              </span>
                            </div>
                            <div className="points-data">
                              <span> *Coupon code discount not withstanding </span>
                            </div>
                          </div>
                          <form
                            onSubmit={handleInsighterPoints}
                            style={{ display: "contents" }}
                          >
                            <div className="col-6">
                              <input
                                type="number"
                                min="1"
                                name="points"
                                className="form-control"
                                placeholder="# of Points"
                                onChange={(e) => {
                                  setInsighterpointstouse(e.currentTarget.value);
                                  setApiDataForAfterPay({
                                    ...apiDataForAfterPay,
                                    insighterpointstouse: e.currentTarget.value,
                                  });
                                }}
                              />
                              {!IPLoading && (
                                <button
                                  className="btn"
                                  type="submit"
                                  disabled={insighterpointstouse <= 0 ? true : false}
                                >
                                  Apply
                                </button>
                              )}
                              {IPLoading && (
                                <button disabled className="btn">
                                  <i className="fas fa-spinner fa-spin"></i>
                                </button>
                              )}
                            </div>
                          </form>
                          <div className="col-2">
                            <h3 className="text-right">
                              {couponData.length !== 0 ? (
                                <>
                                  -
                                  <NumberFormat
                                    value={(couponData.amountreducedduetoinsighterpoints / 100).toFixed(2)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </>
                              ) : (
                                <>
                                  $0.00
                                </>
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                      {IPError ? (
                        <div style={{ margin: "10px auto 20px", textAlign: "center" }}>
                          <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
                            {IPError}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      <hr className="hr-two" />
                      <div className="total">
                        <div className="row">
                          <div className="col">
                            <h3 className="text-left"> TOTAL </h3>
                          </div>
                          <div className="col">
                            <h3 className="text-right">
                              {couponData.length !== 0 ? (
                                <>
                                  <NumberFormat
                                    value={(couponData.newprice / 100).toFixed(2)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </>
                              ) : (
                                <>
                                  {productData.type === "Bootcamp" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                    <NumberFormat
                                      value={((5000 * propsData.quantity) / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  ) : productData.type === "Bootcamp" && parentInfo && parentInfo.parentsplanstatus === "Active" ? (
                                    <NumberFormat
                                      value={((5000 * propsData.quantity) / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  ) : (
                                    <NumberFormat
                                      value={((productData.priceincents * propsData.quantity) / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  )}
                                </>
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="hr-one" />
                    <h2> Payment Information </h2>
                    <h5> Debit/Credit Card: </h5>
                    <div className="payment-info">
                      <div className="row">
                        {loadingcard ? (
                          <div
                            style={{ margin: "70px 0px" }}
                            className="text-center col-xl-3 col-lg-4 col-md-6 col-sm-12"
                          >
                            <i className="fas fa-spinner fa-spin"></i>
                          </div>
                        ) : (
                          ""
                        )}
                        {parentInfo && parentInfo.useparentspaymentmethod && parentInfo.parentsdefaultpaymentmenthodid && (
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="cards">
                              <div
                                className={`card_item card_is_default_${pc && parentDefaultCard == true ? "true" : "false"}`}
                                onClick={() => {
                                  setPC(true);
                                  setParentDefaultCard(true);
                                  setParentBackupCard(false);
                                }}
                              >
                                <div className="row">
                                  <div className="col text-left">
                                    <img  src={pc && parentDefaultCard == true ? radio1 : radio2} />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col text-left">
                                    <div className="card_number on_file">
                                      Default card on file
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {parentInfo && parentInfo.useparentspaymentmethod && parentInfo.parentsBackupPaymentMethodId && (
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="cards">
                              <div
                                className={`card_item card_is_default_${pc && parentBackupCard == true ? "true" : "false"}`}
                                onClick={() => {
                                  setPC(true);
                                  setParentDefaultCard(false);
                                  setParentBackupCard(true);
                                }}
                              >
                                <div className="row">
                                  <div className="col text-left">
                                    <img  src={pc && parentBackupCard == true ? radio1 : radio2} />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col text-left">
                                    <div className="card_number on_file">
                                      Backup card on file
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
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                <div className="cards">
                                  <div
                                    className={`card_item ${`card_is_default_${selectedCard.paymentMethodId == card.paymentMethodId && pc == false ? "true" : "false"}`}`}
                                    onClick={() => {
                                      if (!cardValidation) {
                                        setCardValidation(true);
                                      }
                                      setSelectedCard(card);
                                      setPC(false);
                                      setParentDefaultCard(false);
                                      setParentBackupCard(false);
                                    }}
                                  >
                                    <div className="row">
                                      <div className="col text-left">
                                        <img
                                          src={pmicons[card.brand]}
                                          className="brand_icon"
                                          alt=""
                                        />
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
                                        <label>Valid Until </label>
                                        <div className="info_text">
                                          {card.exp_month}/{card.exp_year}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <>
                            {parentInfo && parentInfo.useparentspaymentmethod ? (
                              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                <div
                                  className="Add-Card"
                                  onClick={handlecardshow}
                                >
                                  <img src={AddCard} />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div 
																  className="text-center col-xl-3 col-lg-4 col-md-6 col-sm-12"
																  style={{ margin: "70px 0px", fontSize: "16px", fontWeight: "bold", color: "#DB422D"}}
                                >
                                  <span> No Payment method found! </span>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                  <div
                                    className="Add-Card"
                                    onClick={handlecardshow}
                                  >
                                    <img src={AddCard} />
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                        {cardInfo && cardInfo.stripeCustomerCard.length > 0 ? (
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="Add-Card" onClick={handlecardshow}>
                              <img src={AddCard} />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {couponData && couponData.newprice < 100 ? (
                        ""
                      ) : (
                        <div className="afterpay">
                          <h5> Buy Now Pay Later: </h5>
                          {objContactInformationForOrderDTO.firstname == "" ||
                          objContactInformationForOrderDTO.lastname == "" ||
                          objContactInformationForOrderDTO.companyname == "" ||
                          (!enterAddressManually && objContactInformationForOrderDTO.fullAddress === "") ||
                          (enterAddressManually && (
                            objContactInformationForOrderDTO.streetaddress === "" ||
                            objContactInformationForOrderDTO.city === "" ||
                            objContactInformationForOrderDTO.state === "" ||
                            objContactInformationForOrderDTO.zipcode === "" ||
                            objContactInformationForOrderDTO.country === ""
                          )) ? (
                            <img
                              style={{
                                opacity: "0.5",
                                cursor: "not-allowed",
                              }}
                              src={afterpay}
                            />
                          ) : (
                            <img
                              src={afterpay}
                              onClick={handlcardafterpaydisclaimershow}
                            />
                          )}
                          {objContactInformationForOrderDTO.firstname == "" ||
                          objContactInformationForOrderDTO.lastname == "" ||
                          objContactInformationForOrderDTO.companyname == "" ||
                          (!enterAddressManually && objContactInformationForOrderDTO.fullAddress === "") ||
                          (enterAddressManually && (
                            objContactInformationForOrderDTO.streetaddress === "" ||
                            objContactInformationForOrderDTO.city === "" ||
                            objContactInformationForOrderDTO.state === "" ||
                            objContactInformationForOrderDTO.zipcode === "" ||
                            objContactInformationForOrderDTO.country === ""
                          )) ? (
                            <div className="error-msg">
                              <h2>
                                {" "}
                                Please fill in all required fields to use afterpay.{" "}
                              </h2>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                    <hr className="hr-one" />
                    <div className="tc">
                      <input
                        type="checkbox"
                        id="tc"
                        checked={termsandconditions}
                      />
                      <label
                        htmlFor="tc"
                        onClick={() => setTermsandConditions(!termsandconditions)}
                      >
                        I've read and accept the&nbsp;
                        <Link
                          to="/terms-and-conditions"
                          target="_blank"
                          style={{ color: "#26A59A" }}
                        >
                          Terms & Conditions
                        </Link>
                        <b className="red">&nbsp;*</b>
                      </label>
                    </div>
                    {errorMsg !== "" ? (
                      <div className="error-msg">
                        <h2> {errorMsg} </h2>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="checkout">
                      {!loading && (
                        <button
                          className="btn"
                          onClick={handleCheckout}
                          disabled={
                            !cardValidation ||
                            !termsandconditions
                              ? true
                              : false
                          }
                        >
                          Checkout
                        </button>
                      )}
                      {loading && (
                        <button disabled className="btn">
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}
                    </div>
                    {(cardInfo && cardInfo.stripeCustomerCard.length > 0) || (parentInfo && parentInfo.useparentspaymentmethod) ? (
										  ""
									  )  : (
										  <div className="error-msg">
											  <h2> Please add a credit card to proceed with the checkout. </h2>
										  </div>
								  	)}
                  </div>
                </div>
              )}
              {pageLoading && (
                <div className="loader-event-checkout">
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

export default withRouter(Buy_Event);