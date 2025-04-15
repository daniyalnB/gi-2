import React, { Suspense, useState, useEffect, useContext, useRef } from "react";
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
	BuyMacro,
	BuyUmpiresManual,
	BuySwagProduct,
	buyGiftCard,
	buyInsighterPoints,
	buySolidifiAnalysis,
	BuyCertificationAPI,
	applyCouponsProduct,
  getSetupIntent,
	ChildPaymentPreview,
	inviteUsers,
	uploadFileAndGetURL,
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
  Elements,
  useStripe,
  useElements, 
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Airtable from "airtable";
import queryString from "query-string";
import history from "../../../utils/history";
import moment from "moment";
import Typed from "react-typed";
import visa from "assets/visa.png";
import mastercard from "assets/mastercard.png";
import AmericanExpress from "assets/americanexpress.png";
import JCB from "assets/jcb.svg";
import discover from "assets/discover.png";
import modalclose from "assets/modal-close.svg";
import AddCard from "assets/AddCard.svg";
import down from "assets/down-arrow-user.svg";
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

const BuyProduct = (props) => {

	var base = new Airtable({apiKey: "keyQKyOQpHMEU4Xvg"}).base("appR9Ychu3rmKMY5h");

	const table = base("Work Flow");

	const [airtableData, setAirtableData] = useState(false);

	const [uploadESX, setUploadESX] = useState([]);
	const [uploadODA, setUploadODA] = useState([]);
	
	const [certificationExtras, setCertificationExtras] = useState(false);

	const createRecord = async (fields) => {
		const createRecord = await table.create(fields);
		console.log(createRecord);
	}

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

	const handleFileUpload = (data) => {
		
		const formData = new FormData();
		formData.append("fileToUpload", data.uploadESX);

		uploadFileAndGetURL(formData).subscribe((response) => {
			if (response.response.Requested_Action) {
				setUploadESX(
					[
						{	
							"url": `${response.response.Message}`,
						}
					]
				);
				handleFileUploadODA(data.uploadODA);
			}
		});
	};

	const handleFileUploadODA = (val) => {
		
		const formData = new FormData();
		formData.append("fileToUpload", val);

		uploadFileAndGetURL(formData).subscribe((response) => {
			if (response.response.Requested_Action) {
				setUploadODA(
					[
						{	
							"url": `${response.response.Message}`,
						}
					]
				);
			}
		});
	};

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

	const [ChildPaymentPreviewData, setChildPaymentPreviewData] = useState(false);

	const [alreadySentMessage, setAlreadySentMessage] = useState(false);

	const [someUnknownIssueMessage, setSomeUnknownIssueMessage] = useState(false);

	const [ChildPaymentPreviewAPIError, setChildPaymentPreviewAPIError] = useState("");
	
	const [insighterpointstouse, setInsighterpointstouse] = useState("");

	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
    if (props.location.state === undefined) {
      history.push("/");
    } else if (props.location.state.macro) {
			setProductData(props.location.state.macro);
			setPropsData({
				...propsData,
				quantity: props.location.state.quantity,
				type: props.location.state.type,
				path: props.location.state.path,
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
		} else if (props.location.state.manual) {
			setProductData(props.location.state.manual);
			setPropsData({
				...propsData,
				quantity: props.location.state.quantity,
				type: props.location.state.type,
				path: props.location.state.path,
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
		} else if (props.location.state.swag) {
			setProductData(props.location.state.swag);
			setPropsData({
				...propsData,
				quantity: props.location.state.quantity,
				type: props.location.state.type,
				size: props.location.state.size,
				path: props.location.state.path,
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
		 } else if (props.location.state.points) {
			setProductData(props.location.state.points);
			setPropsData({
				...propsData,
				type: props.location.state.type,
				path: props.location.state.path,
				quantity: props.location.state.quantity,
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
		} else if (props.location.state.giftcard) {
			setProductData(props.location.state.giftcard);
			setPropsData({
				...propsData,
				type: props.location.state.type,
				path: props.location.state.path,
				quantity: props.location.state.quantity,
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
		} else if (props.location.state.solidifai) {
			setProductData(props.location.state.solidifai);
			setAirtableData(props.location.state.airtableData);
			setPropsData({
				...propsData,
				type: props.location.state.type,
				path: props.location.state.path,
				quantity: props.location.state.quantity,
			});
			handleFileUpload(props.location.state.airtableData);
		} else if (props.location.state.users) {
			setProductData([
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
			]);
			setPropsData({
				...propsData,
				type: props.location.state.type,
				path: props.location.state.path,
				planName: props.location.state.planName,
				users: [
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
				],
			});
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
		
				ChildPaymentPreview(toInvites).subscribe((response) => {
					if (response.response.Requested_Action) {
						if (response.response.data.alreadySentMessage) {
							findEmailAddresses1(response.response.data.alreadySentMessage);
							setAlreadySentMessage(response.response.data.alreadySentMessage);
						}
						if (response.response.data.someUnknownIssueMessage) {
							findEmailAddresses2(response.response.data.someUnknownIssueMessage);
							setSomeUnknownIssueMessage(response.response.data.someUnknownIssueMessage);
						}
						if (response.response.data.lastbillingdate || response.response.data.nextbillingdate) {	
							setChildPaymentPreviewData(response.response.data);
						}
					} else {
						setChildPaymentPreviewAPIError(response.response.Message);
					}
				});
			}, 1000);
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
		} else if (props.location.state.invite_users) { 
			setProductData(props.location.state.invite_users);
			setPropsData({
				...propsData,
				type: props.location.state.type,
				path: props.location.state.path,
				users: props.location.state.invite_users,
				planName: props.location.state.planName,
			});
			setTimeout(() => {

				const UsersIDs = props.location.state.invite_users.map(x => x.toInvite);
				const toInvites = UsersIDs;
		
				ChildPaymentPreview(toInvites).subscribe((response) => {
					if (response.response.Requested_Action) {
						if (response.response.data.alreadySentMessage) {
							findEmailAddresses1(response.response.data.alreadySentMessage);
							setAlreadySentMessage(response.response.data.alreadySentMessage);
						}
						if (response.response.data.someUnknownIssueMessage) {
							findEmailAddresses2(response.response.data.someUnknownIssueMessage);
							setSomeUnknownIssueMessage(response.response.data.someUnknownIssueMessage);
						}
						if (response.response.data.lastbillingdate || response.response.data.nextbillingdate) {	
							setChildPaymentPreviewData(response.response.data);
						}
					} else {
						setChildPaymentPreviewAPIError(response.response.Message);
					}
				});
			}, 1000);
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
		} else if (props.location.state.certification) {
			setProductData(props.location.state.certification);
			setCertificationExtras(props.location.state.certificationExtras);
			setPropsData({
				...propsData,
				type: props.location.state.type,
				path: props.location.state.path,
				quantity: props.location.state.quantity,
				certificationStatus: props.location.state.certificationStatus,
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

	const [emailList1, setEmailList1] = useState([]);

	function findEmailAddresses1(str) {
		let list = str.match(/[\w]+@[\w\-]+\.[\w]{2,}/g);
		setEmailList1(list);
	};

	const [emailList2, setEmailList2] = useState([]);

	function findEmailAddresses2(str) {
		let list = str.match(/[\w]+@[\w\-]+\.[\w]{2,}/g);
		const newList = list.filter(email => email !== "support@getinsight.org");
		setEmailList2(newList);
	};

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

	// console.log(objContactInformationForOrderDTO, "objContactInformationForOrderDTO")

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

  const handleSubmitMacro = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
        macroId: productData.id,
				insighterpointstouse: insighterpointstouse,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
      };

			const payloadWithCoupon = {
        macroId: productData.id,
				insighterpointstouse: insighterpointstouse,
        paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
        couponCode: couponData.code,
      };
  
			const stringified1 = queryString.stringify(payload);
			const stringified2 = queryString.stringify(payloadWithCoupon);
  
      BuyMacro(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setLoading(false);
					const x = response.response.data;
					handleSubmitUpdateUser();
					localStorage.removeItem("objContactInformationForOrderDTO");
					history.push({
						pathname: "/receipt",
						state: {
							propsData: propsData,
							data: x,
							couponData: couponData,
						}
					});
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

	const handleSubmitManual = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
        manualid: productData.id,
				insighterpointstouse: insighterpointstouse,
				quantity: propsData.quantity,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
      };

			const payloadWithCoupon = {
        manualid: productData.id,
				insighterpointstouse: insighterpointstouse,
				quantity: propsData.quantity,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
        couponCode: couponData.code,
      };
  
      const stringified1 = queryString.stringify(payload);
			const stringified2 = queryString.stringify(payloadWithCoupon);
  
      BuyUmpiresManual(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setLoading(false);
					const x = response.response.data;
					handleSubmitUpdateUser();
					localStorage.removeItem("objContactInformationForOrderDTO");
					history.push({
						pathname: "/receipt",
						state: {
							propsData: propsData,
							data: x,
							couponData: couponData,
						}
					});
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

	const handleSubmitSwag = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
        swagproductid: productData.id,
				swagproductsize: propsData.size,
				insighterpointstouse: insighterpointstouse,
				quantity: propsData.quantity,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
      };

			const payloadWithCoupon = {
        swagproductid: productData.id,
				swagproductsize: propsData.size,
				insighterpointstouse: insighterpointstouse,
				quantity: propsData.quantity,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
        couponCode: couponData.code,
      };
  
      const stringified1 = queryString.stringify(payload);
			const stringified2 = queryString.stringify(payloadWithCoupon);
  
      BuySwagProduct(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setLoading(false);
					const x = response.response.data;
					handleSubmitUpdateUser();
					localStorage.removeItem("objContactInformationForOrderDTO");
					history.push({
						pathname: "/receipt",
						state: {
							propsData: propsData,
							data: x,
							couponData: couponData,
						}
					});
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

	const handleSubmitSolidifai = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
        priceincents: productData.priceincents,
				insighterpointstouse: insighterpointstouse,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				ReplaceWithProjectName: airtableData.projectname,
				ReplaceWithCauseofLoss: airtableData.causeofloss,
				ReplaceWithCategory: airtableData.category,
				ReplaceWithMitigationRepairorContents: airtableData.mrc,
				ReplaceWithClass: airtableData.class,
				ReplaceWithPreMitigationURL: airtableData.premitigation,
				ReplaceWithPostMitigationURL: airtableData.postmitigation,
				ReplaceWithLossSnapshot: airtableData.losssnapshot,
				ReplaceWithLineItemCount: airtableData.lineitemcount,
				ReplaceWithGrandTotal: parseInt(airtableData.grandtotal * 100),
				ReplaceWithAugmentwithZORAAnalysis: props.location.state.AugmentwithZORAAnalysis,
				firstname: objContactInformationForOrderDTO.firstname,
				lastname: objContactInformationForOrderDTO.lastname,
				companyname: objContactInformationForOrderDTO.companyname,
				streetaddress: objContactInformationForOrderDTO.streetaddress,
				aptorunitorsuite: objContactInformationForOrderDTO.aptorunitorsuite,
				city: objContactInformationForOrderDTO.city,
				state: objContactInformationForOrderDTO.state,
				zipcode: objContactInformationForOrderDTO.zipcode,
      };
  
      const payloadWithCoupon = {
				priceincents: productData.priceincents,
				insighterpointstouse: insighterpointstouse,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
        couponCode: couponData.code,
				ReplaceWithProjectName: airtableData.projectname,
				ReplaceWithCauseofLoss: airtableData.causeofloss,
				ReplaceWithCategory: airtableData.category,
				ReplaceWithMitigationRepairorContents: airtableData.mrc,
				ReplaceWithClass: airtableData.class,
				ReplaceWithPreMitigationURL: airtableData.premitigation,
				ReplaceWithPostMitigationURL: airtableData.postmitigation,
				ReplaceWithLossSnapshot: airtableData.losssnapshot,
				ReplaceWithLineItemCount: airtableData.lineitemcount,
				ReplaceWithGrandTotal: parseInt(airtableData.grandtotal * 100),
				ReplaceWithAugmentwithZORAAnalysis: props.location.state.AugmentwithZORAAnalysis,
				firstname: objContactInformationForOrderDTO.firstname,
				lastname: objContactInformationForOrderDTO.lastname,
				companyname: objContactInformationForOrderDTO.companyname,
				streetaddress: objContactInformationForOrderDTO.streetaddress,
				aptorunitorsuite: objContactInformationForOrderDTO.aptorunitorsuite,
				city: objContactInformationForOrderDTO.city,
				state: objContactInformationForOrderDTO.state,
				zipcode: objContactInformationForOrderDTO.zipcode,
      };
  
      const stringified1 = queryString.stringify(payload);
			const stringified2 = queryString.stringify(payloadWithCoupon);

			const formData = new FormData();
			formData.append("ReplaceWithUploadESX", airtableData.uploadESX);
			formData.append("ReplaceWithUploadOtherDigitalAssets", airtableData.uploadODA);
  
      buySolidifiAnalysis(coupon == "" ? stringified1 : stringified2, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
					createRecord ({
						"Project Name": airtableData.projectname,
						"Cause of Loss": airtableData.causeofloss,
						"Mitigation, Repair or Contents": airtableData.mrc,
						"Category": airtableData.category,
						"Class": airtableData.class,
						"Line Items Count ($13/Line Item)": airtableData.lineitemcount,
						"Submitted RCV $": airtableData.grandtotal,
						"Pre Mitigation/Reconstruction Model URL": airtableData.premitigation,
						"Post Mitigation/Reconstruction Model URL": airtableData.postmitigation,
						"Email For Delivery of Results": airtableData.emailaddress,
						"Project Details": airtableData.losssnapshot,
						"Upload Other Digital Assets": uploadODA,
						"Upload ESX": uploadESX,
					});
					const x = response.response.data;
					handleSubmitUpdateUser();
					history.push({
						pathname: "/receipt",
						state: {
							propsData: propsData,
							data: x,
							couponData: couponData,
						}
					});
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

	const handleSubmitPoints = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
				insighterproductid: productData.id,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				couponCode: couponData.code,
      };
  
      const stringified = queryString.stringify(payload);
  
      buyInsighterPoints(stringified, objContactInformationForOrderDTO).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setLoading(false);
					const x = response.response.data;
					handleSubmitUpdateUser();
					localStorage.removeItem("objContactInformationForOrderDTO");
					history.push({
						pathname: "/receipt",
						state: {
							propsData: propsData,
							data: x,
							couponData: couponData,
						}
					});
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

	const handleSubmitGiftCard = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const payload = {
				giftcardid: productData.id,
				quantity: propsData.quantity,
				paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				memo: productData.memo,
				couponCode: couponData.code,
				firstname: objContactInformationForOrderDTO.firstname,
				lastname: objContactInformationForOrderDTO.lastname,
				companyname: objContactInformationForOrderDTO.companyname,
				branch: objContactInformationForOrderDTO.branch,
				streetaddress: objContactInformationForOrderDTO.streetaddress,
				aptorunitorsuite: objContactInformationForOrderDTO.aptorunitorsuite,
				city: objContactInformationForOrderDTO.city,
				state: objContactInformationForOrderDTO.state,
				zipcode: objContactInformationForOrderDTO.zipcode,
      };

			const formData = new FormData();
			formData.append("logo", productData.logo);

      const stringified = queryString.stringify(payload);
  
      buyGiftCard(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
					const x = response.response.data;
					handleSubmitUpdateUser();
					localStorage.removeItem("objContactInformationForOrderDTO");
					history.push({
						pathname: "/receipt",
						state: {
							propsData: propsData,
							data: x,
							couponData: couponData,
						}
					});
        } else {
          setLoading(false);
          setErrorMsg(response.response.Message);
        }
      });
    }, 1000);
  };

	const handleSubmitCertification = (e) => {
    e.preventDefault();
    setLoading(true);
    
		if (productData.courseTag === "aimc-2021") {
			setTimeout(() => {
				const payload = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					iicrc: certificationExtras.iicrc,
					iicrc_number: certificationExtras.iicrc_number,
					iicrc_date_of_birth: certificationExtras.iicrc_date_of_birth,
					california: certificationExtras.california,
					california_license_number: certificationExtras.california_license_number,
					florida: certificationExtras.florida,
					florida_user_full_name: certificationExtras.florida_user_full_name,
					florida_license_number: certificationExtras.florida_license_number,
					idaho: certificationExtras.idaho,
					idaho_license_number: certificationExtras.idaho_license_number,
					added_proctoring_add_on_: certificationExtras.proctoring,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				};
	
				const payloadWithCoupon = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					iicrc: certificationExtras.iicrc,
					iicrc_number: certificationExtras.iicrc_number,
					iicrc_date_of_birth: certificationExtras.iicrc_date_of_birth,
					california: certificationExtras.california,
					california_license_number: certificationExtras.california_license_number,
					florida: certificationExtras.florida,
					florida_user_full_name: certificationExtras.florida_user_full_name,
					florida_license_number: certificationExtras.florida_license_number,
					idaho: certificationExtras.idaho,
					idaho_license_number: certificationExtras.idaho_license_number,
					added_proctoring_add_on_: certificationExtras.proctoring,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
					couponCode: couponData.code,
				};
		
				const stringified1 = queryString.stringify(payload);
				const stringified2 = queryString.stringify(payloadWithCoupon);
		
				BuyCertificationAPI(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
					if (response.response.Requested_Action) {  
						setLoading(false);
						const x = response.response.data;
						if (response.response.Message == "Payment Succeded.") {
							handleSubmitUpdateUser();
							localStorage.removeItem("objContactInformationForOrderDTO");
							history.push({
								pathname: "/receipt",
								state: {
									propsData: propsData,
									data: x,
									couponData: couponData,
								}
							});
						} else {
							setErrorMsg(response.response.Message);	
						}
					} else {
						setLoading(false);
						setErrorMsg(response.response.Message);
					}
				});
			}, 1000);
		} else if (productData.courseTag === "aimc-ce-2021") {
			setTimeout(() => {
				const payload = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					are_you_iicrc_certified__aimc_ce__: certificationExtras.iicrc,
					iicrc__: certificationExtras.iicrc_number,
					iicrc_aimc_ce_date_of_birth: certificationExtras.iicrc_date_of_birth,
					added_proctoring_add_on__aimc_ce_: certificationExtras.proctoring,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				};
	
				const payloadWithCoupon = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					are_you_iicrc_certified__aimc_ce__: certificationExtras.iicrc,
					iicrc__: certificationExtras.iicrc_number,
					iicrc_aimc_ce_date_of_birth: certificationExtras.iicrc_date_of_birth,
					added_proctoring_add_on__aimc_ce_: certificationExtras.proctoring,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
					couponCode: couponData.code,
				};
		
				const stringified1 = queryString.stringify(payload);
				const stringified2 = queryString.stringify(payloadWithCoupon);
		
				BuyCertificationAPI(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
					if (response.response.Requested_Action) {  
						setLoading(false);
						const x = response.response.data;
						if (response.response.Message == "Payment Succeded.") {
							handleSubmitUpdateUser();
							localStorage.removeItem("objContactInformationForOrderDTO");
							history.push({
								pathname: "/receipt",
								state: {
									propsData: propsData,
									data: x,
									couponData: couponData,
								}
							});
						} else {
							setErrorMsg(response.response.Message);	
						}
					} else {
						setLoading(false);
						setErrorMsg(response.response.Message);
					}
				});
			}, 1000);
		} else if (productData.courseTag === "aimc-2022") {
			setTimeout(() => {
				const payload = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					iicrc_certified__yes_no__aimc_2022: certificationExtras.iicrc,
					iicrc_number_aimc_2022: certificationExtras.iicrc_number,
					iicrc_date_of_birth_aimc_2022: certificationExtras.iicrc_date_of_birth,
					do_you_hold_california_insurance_license__aimc_2022__yes_no_: certificationExtras.california,
					ca_license___aimc_2022: certificationExtras.california_license_number,
					florida_state_license_aimc_2022__yes_no_: certificationExtras.florida,
					florida_state_insurance_acknowledgement_aimc_2022: certificationExtras.florida_user_full_name,
					florida_state_license___aimc_2022: certificationExtras.florida_license_number,
					do_you_hold_idaho_state_insurance_license__aimc_2022__yes_no_: certificationExtras.idaho,
					enter_your_idaho_license___aimc_2022: certificationExtras.idaho_license_number,
					georgia: certificationExtras.georgia,
					georgia_license_number: certificationExtras.georgia_license_number,
					nevada_state_license_aimc_2022__yes_no_: certificationExtras.nevada,
					nevada_state_license___aimc_2022: certificationExtras.nevada_license_number,
					added_proctoring_add_on__aimc_2022_: certificationExtras.proctoring,
					electronicallysignyourfullname: certificationExtras.electronicallysignyourfullname,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				};
	
				const payloadWithCoupon = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					iicrc_certified__yes_no__aimc_2022: certificationExtras.iicrc,
					iicrc_number_aimc_2022: certificationExtras.iicrc_number,
					iicrc_date_of_birth_aimc_2022: certificationExtras.iicrc_date_of_birth,
					do_you_hold_california_insurance_license__aimc_2022__yes_no_: certificationExtras.california,
					ca_license___aimc_2022: certificationExtras.california_license_number,
					florida_state_license_aimc_2022__yes_no_: certificationExtras.florida,
					florida_state_insurance_acknowledgement_aimc_2022: certificationExtras.florida_user_full_name,
					florida_state_license___aimc_2022: certificationExtras.florida_license_number,
					do_you_hold_idaho_state_insurance_license__aimc_2022__yes_no_: certificationExtras.idaho,
					enter_your_idaho_license___aimc_2022: certificationExtras.idaho_license_number,
					georgia: certificationExtras.georgia,
					georgia_license_number: certificationExtras.georgia_license_number,
					nevada_state_license_aimc_2022__yes_no_: certificationExtras.nevada,
					nevada_state_license___aimc_2022: certificationExtras.nevada_license_number,
					added_proctoring_add_on__aimc_2022_: certificationExtras.proctoring,
					electronicallysignyourfullname: certificationExtras.electronicallysignyourfullname,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
					couponCode: couponData.code,
				};
		
				const stringified1 = queryString.stringify(payload);
				const stringified2 = queryString.stringify(payloadWithCoupon);
		
				BuyCertificationAPI(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
					if (response.response.Requested_Action) {  
						setLoading(false);
						const x = response.response.data;
						if (response.response.Message == "Payment Succeded.") {
							handleSubmitUpdateUser();
							localStorage.removeItem("objContactInformationForOrderDTO");
							history.push({
								pathname: "/receipt",
								state: {
									propsData: propsData,
									data: x,
									couponData: couponData,
								}
							});
						} else {
							setErrorMsg(response.response.Message);	
						}
					} else {
						setLoading(false);
						setErrorMsg(response.response.Message);
					}
				});
			}, 1000);
		} else if (productData.courseTag === "aimc-ce22") {
			setTimeout(() => {
				const payload = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					are_you_iicrc_certified__aimc_ce_2022__: certificationExtras.iicrc,
					iicrc___aimc_ce_2022: certificationExtras.iicrc_number,
					iicrc_date_of_birth_aimc_ce_2022: certificationExtras.iicrc_date_of_birth,
					added_proctoring_add_on__aimc_ce_2022__: certificationExtras.proctoring,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				};
	
				const payloadWithCoupon = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					are_you_iicrc_certified__aimc_ce_2022__: certificationExtras.iicrc,
					iicrc___aimc_ce_2022: certificationExtras.iicrc_number,
					iicrc_date_of_birth_aimc_ce_2022: certificationExtras.iicrc_date_of_birth,
					added_proctoring_add_on__aimc_ce_2022__: certificationExtras.proctoring,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
					couponCode: couponData.code,
				};
		
				const stringified1 = queryString.stringify(payload);
				const stringified2 = queryString.stringify(payloadWithCoupon);
		
				BuyCertificationAPI(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
					if (response.response.Requested_Action) {  
						setLoading(false);
						const x = response.response.data;
						if (response.response.Message == "Payment Succeded.") {
							handleSubmitUpdateUser();
							localStorage.removeItem("objContactInformationForOrderDTO");
							history.push({
								pathname: "/receipt",
								state: {
									propsData: propsData,
									data: x,
									couponData: couponData,
								}
							});
						} else {
							setErrorMsg(response.response.Message);	
						}
					} else {
						setLoading(false);
						setErrorMsg(response.response.Message);
					}
				});
			}, 1000);
		} else {
			setTimeout(() => {
				const payload = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
				};
	
				const payloadWithCoupon = {
					certificationid: productData.id,
					iicrc_certified: certificationExtras.iicrc,
					insighterpointstouse: insighterpointstouse,
					paymentMethodId: pc ? (parentDefaultCard ? parentInfo.parentsdefaultpaymentmenthodid : parentInfo.parentsBackupPaymentMethodId) : selectedCard.paymentMethodId,
					couponCode: couponData.code,
				};
		
				const stringified1 = queryString.stringify(payload);
				const stringified2 = queryString.stringify(payloadWithCoupon);
		
				BuyCertificationAPI(coupon == "" ? stringified1 : stringified2, objContactInformationForOrderDTO).subscribe((response) => {
					if (response.response.Requested_Action) {  
						setLoading(false);
						const x = response.response.data;
						if (response.response.Message == "Payment Succeded.") {
							handleSubmitUpdateUser();
							localStorage.removeItem("objContactInformationForOrderDTO");
							history.push({
								pathname: "/receipt",
								state: {
									propsData: propsData,
									data: x,
									couponData: couponData,
								}
							});
						} else {
							setErrorMsg(response.response.Message);	
						}
					} else {
						setLoading(false);
						setErrorMsg(response.response.Message);
					}
				});
			}, 1000);
		}
  };

	let dumyArr = [];

	let NoOfUsers = 0;

	const [inviteUsersLoading, setinviteUsersLoading] = useState(false);

	const [validInviteUsers, setValidInviteUsers] = useState(false);

	useEffect(() => {
		if (productData) {
			const filterUsers1 = productData.filter(email => !emailList1.includes(email.toInvite));
			const filterUsers2 = filterUsers1.filter(email => !emailList2.includes(email.toInvite));
			setValidInviteUsers(filterUsers2);
		}
  }, [emailList1, emailList2]);

	const handleSubmitSubUser = () => {
		setLoading(true);
		setinviteUsersLoading(true);

		if (validInviteUsers) {
			if (NoOfUsers === validInviteUsers.length) {
				setLoading(true);
				setinviteUsersLoading(false);
				handleSubmitUpdateUser();
				localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
				history.push({
					pathname: "/receipt",
					state: {
						propsData: propsData,
						data: dumyArr,
						ChildPaymentPreviewData: ChildPaymentPreviewData,
						couponData: couponData,
						billingDetails: objContactInformationForOrderDTO,
					}
				});
			} else {
				invite(NoOfUsers);
			}
		} else {
			if (NoOfUsers === productData.length) {
				setLoading(true);
				setinviteUsersLoading(false);
				handleSubmitUpdateUser();
				localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
				history.push({
					pathname: "/receipt",
					state: {
						propsData: propsData,
						data: dumyArr,
						ChildPaymentPreviewData: ChildPaymentPreviewData,
						couponData: couponData,
						billingDetails: objContactInformationForOrderDTO,
					}
				});
			} else {
				invite(NoOfUsers);
			}
		}
  };

	const invite = (i) => {
		setTimeout(() => {
			const payload = {
				toInvite: validInviteUsers ? validInviteUsers[i].toInvite : productData[i].toInvite,
				firstname: validInviteUsers ? validInviteUsers[i].firstname : productData[i].firstname,
				lastname: validInviteUsers ? validInviteUsers[i].lastname : productData[i].lastname,
				branch: validInviteUsers ? validInviteUsers[i].branch : productData[i].branch,
				role: validInviteUsers ? validInviteUsers[i].role : productData[i].role, 
				inviteMessage: validInviteUsers ? validInviteUsers[i].inviteMessage : productData[i].inviteMessage,
				XactProfileveriskid: validInviteUsers ? validInviteUsers[i].XactProfileveriskid : productData[i].XactProfileveriskid,
				useparentspaymentmethod: validInviteUsers ? validInviteUsers[i].useparentspaymentmethod : productData[i].useparentspaymentmethod,
			};

			const stringified = queryString.stringify(payload);

			inviteUsers(stringified, objContactInformationForOrderDTO).subscribe((response) => {
				if (response.response.Requested_Action) {
					const x = response.response.data;
					dumyArr.push(x);
					NoOfUsers++;
					handleSubmitSubUser();
				} else {
					const x = response.response.Message;
					dumyArr.push(x);
					NoOfUsers++;
					handleSubmitSubUser();
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
      productid: propsData.type == "solidifai" ? "SolidifaiAnalysis" : productData.id,
      couponcode: coupon.trim(),
			quantity: propsData.type == "solidifai" ? productData.priceincents : propsData.quantity,
    };

		const payloadWithPoints = {
			productid: propsData.type == "solidifai" ? "SolidifaiAnalysis" : productData.id,
      couponcode: coupon.trim(),
			quantity: propsData.type == "solidifai" ? productData.priceincents : propsData.quantity,
			insighterpointstouse: insighterpointstouse,
		}

    const stringified1 = queryString.stringify(payload);
		const stringified2 = queryString.stringify(payloadWithPoints);

    applyCouponsProduct(insighterpointstouse == 0 ? stringified1 : stringified2).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCouponData(response.response.data);
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

	const handleSubmitCouponForCertification = (e) => {
    e.preventDefault();
    setCouponLoading(true);

    const payload = {
      productid: productData.id,
      couponcode: coupon.trim(),
			quantity: propsData.quantity,
			proctoring: certificationExtras.proctoring,
    };

		const payloadWithPoints = {
			productid: productData.id,
      couponcode: coupon.trim(),
			quantity: propsData.quantity,
			insighterpointstouse: insighterpointstouse,
			proctoring: certificationExtras.proctoring,
		}

    const stringified1 = queryString.stringify(payload);
		const stringified2 = queryString.stringify(payloadWithPoints);

    applyCouponsProduct(insighterpointstouse == 0 ? stringified1 : stringified2).subscribe((response) => {
      if (response.response.Requested_Action) {
        setCouponData(response.response.data);
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
      productid: propsData.type == "solidifai" ? "SolidifaiAnalysis" : productData.id,
			quantity: propsData.type == "solidifai" ? productData.priceincents : propsData.quantity,
			insighterpointstouse: insighterpointstouse,
    };

		const payloadWithCoupon = {
			productid: propsData.type == "solidifai" ? "SolidifaiAnalysis" : productData.id,
			couponcode: coupon.trim(),
			quantity: propsData.type == "solidifai" ? productData.priceincents : propsData.quantity,
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

	const handleInsighterPointsForCertification = (e) => {
    e.preventDefault();
		setIPLoading(true);

    const payload = {
      productid: productData.id,
			quantity: propsData.quantity,
			insighterpointstouse: insighterpointstouse,
			proctoring: certificationExtras.proctoring,
    };

		const payloadWithCoupon = {
			productid: productData.id,
			couponcode: coupon.trim(),
			quantity: propsData.quantity,
			insighterpointstouse: insighterpointstouse,
			proctoring: certificationExtras.proctoring,
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
			<SEO
        title="Checkout - Actionable Insights"
        description="Checkout - Actionable Insights. Trying to check out after you've found what you were looking for at getinsights.org? Here is how you can proceed to payment. - (support@actionable-insights.ai; Skip to content. Home. Home One; Home Two; Home Three; User Analysis; Business Intelligence; Predictive Analysis; Sentiment Analysis; User Behaviour Analysis ; Data Scientist Profile; Data Visualization service; Analytics in Marketing; Analytics in Banking & Finance; Analytics in Manufacturing; Analytics in Security; Data Center Analytics; Analytics in Education ...)"
				link="checkout"
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
				<ScrollToTop />
				<Navbar />
        <Breadcrumbs />
				<div className="main-container">
					<div className="BuyProduct_page">
						<div className="">
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
									<h2> Payment Information </h2>
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
																		if (!cardValidation)  { 
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
																			<img src={pmicons[card.brand]} className="brand_icon" alt="" />
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
																<img 
																	src={AddCard}
																/>
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
												<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
													<div className="Add-Card" onClick={handlecardshow}>
														<img src={AddCard} />
													</div>
												</div>
											) : (
												""
											)}
										</div>
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
														{propsData.type == "users" || propsData.type == "invite_users" ? (
															<>
																{validInviteUsers ? (
																	<>
																		{subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} - Sub {validInviteUsers.length == 1 ? "User" : "Users"} ({validInviteUsers.length})
																	</>
																) : (
																	<>
																		{subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} - Sub {productData.length == 1 ? "User" : "Users"} ({productData.length})
																	</>
																)}
															</>
														) : propsData.type == "points" ? (
															<>
																{productData.title}{" "}(
																	<NumberFormat
																		value={productData.numberofinsigherpointsbought}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																)
															</>
														) : propsData.type == "solidifai" || propsData.type == "certification" ? (
															<>
																{productData.title}
															</>
														) : (
															<>
																{productData.title} x {propsData.quantity}
															</>
														)}
													</h3>
												</div>
												<div className="col">
													<h3 className="text-right">
														{propsData.type == "users" || propsData.type == "invite_users" ? (
															<>
																<NumberFormat
																	value={(ChildPaymentPreviewData.amounttochargeincents / 100).toFixed(2)}
																	displayType={"text"}
																	thousandSeparator={true}
																	prefix={"$"}
																/>
															</>
														) : propsData.type == "points" ? (
															<>
																<NumberFormat
																	value={(productData.priceincents / 100).toFixed(2)}
																	displayType={"text"}
																	thousandSeparator={true}
																	prefix={"$"}
																/>
															</>
														) : propsData.type == "macro" ? (
															<>
																{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																	<NumberFormat
																		value={"0"}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																	<NumberFormat
																		value={((productData.priceincents / 100) - ((productData.priceincents / 100) * 0.25)).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (
																	<NumberFormat
																		value={(productData.priceincents / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																)}
															</>
														) : propsData.type == "certification" ? (
															<>
																{productData.courseTag === "aitc" && (subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || subscriptionInfo && subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual" || ischilduser) ? (
																	<NumberFormat 
																		value={(0).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (
																	<>
																		{propsData.certificationStatus == 2 ? (
																			<>
																				{certificationExtras.proctoring ? (
																					<NumberFormat
																						value={((productData.failedpriceincents + 5000 * propsData.quantity) / 100).toFixed(2)}
																						displayType={"text"}
																						thousandSeparator={true}
																						prefix={"$"}
																					/>
																				) : (
																					<NumberFormat
																						value={((productData.failedpriceincents * propsData.quantity) / 100).toFixed(2)}
																						displayType={"text"}
																						thousandSeparator={true}
																						prefix={"$"}
																					/>
																				)}
																			</>
																		) : (
																			<>
																				{certificationExtras.proctoring ? (
																					<NumberFormat
																						value={((productData.priceincents + 10000 * propsData.quantity) / 100).toFixed(2)}
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
																	</>
																)}
															</>
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
										{propsData.type == "users" || propsData.type == "invite_users" ? (
											""
										) : (
											<>
												<hr className="hr-two" />
												<div className="subtotal">
													<div className="row">
														<div className="col">
															<h3 className="text-left"> Subtotal </h3>
														</div>
														<div className="col">
															<h3 className="text-right">
																{propsData.type == "users" || propsData.type == "invite_users" ? (
																	<>
																		<NumberFormat
																			value={(ChildPaymentPreviewData.amounttochargeincents / 100).toFixed(2)}
																			displayType={"text"}
																			thousandSeparator={true}
																			prefix={"$"}
																		/>
																	</>
																) : propsData.type == "points" ? (
																	<>
																		<NumberFormat
																			value={(productData.priceincents / 100).toFixed(2)}
																			displayType={"text"}
																			thousandSeparator={true}
																			prefix={"$"}
																		/>
																	</>
																) : propsData.type == "macro" ? (
																	<>
																		{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																			<NumberFormat
																				value={"0"}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																			<NumberFormat
																				value={((productData.priceincents / 100) - ((productData.priceincents / 100) * 0.25)).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (
																			<NumberFormat
																				value={(productData.priceincents / 100).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		)}
																	</>
																) : propsData.type == "certification" ? (
																	<>
																		{productData.courseTag === "aitc" && (subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" || subscriptionInfo && subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual" || ischilduser) ? (
																			<NumberFormat 
																				value={(0).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (
																			<>
																				{propsData.certificationStatus == 2 ? (
																					<>
																						{certificationExtras.proctoring ? (
																							<NumberFormat
																								value={((productData.failedpriceincents + 5000 * propsData.quantity) / 100).toFixed(2)}
																								displayType={"text"}
																								thousandSeparator={true}
																								prefix={"$"}
																							/>
																						) : (
																							<NumberFormat
																								value={((productData.failedpriceincents * propsData.quantity) / 100).toFixed(2)}
																								displayType={"text"}
																								thousandSeparator={true}
																								prefix={"$"}
																							/>
																						)}
																					</>
																				) : (
																					<>
																						{certificationExtras.proctoring ? (
																							<NumberFormat
																								value={((productData.priceincents + 10000 * propsData.quantity) / 100).toFixed(2)}
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
																			</>
																		)}
																	</>
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
											</>
										)}
										{propsData.type == "users" || propsData.type == "invite_users" ? (
											<>
												<hr className="hr-two" />
												<div className="row invite-users-section">
													<div className="col-md-6 sec-left">
														{alreadySentMessage && (
															<div className="mb-3">
																<span className="coupon_success sub_user_error">
																	<p> {alreadySentMessage} </p>
																</span>
															</div>
														)}
														{someUnknownIssueMessage && (
															<div className="mb-3">
																<span className="coupon_success sub_user_error">
																	<p> {someUnknownIssueMessage} </p>
																</span>
															</div>
														)}
														{validInviteUsers.length !== 0 && (
															<span className="coupon_success sub_user_error">
																{ChildPaymentPreviewData.couponcode && (
																	<>
																		Subscription Coupon Applied: <b>{ChildPaymentPreviewData.couponcode}</b>
																		<br />
																	</>
																)}
																Next Billing Date: <b>{moment(ChildPaymentPreviewData.nextbillingdate).format("LL")}</b>
																<br />
																Last Billing Date: <b>{moment(ChildPaymentPreviewData.lastbillingdate).format("LL")}</b>
																<br />
																Days Remaining on Current Billing Cycle: <b>{ChildPaymentPreviewData.remainingdaysuntilnextpaymenttocharge}</b>
															</span>
														)}
													</div>
													<div className="col-md-6 sec-right">
														<div className="sub_user_info">
															<span>
																If you are adding a new Co-Administrator or Collaborator to your {subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} account, you will be charged at a prorated rate based on the number of days remaining in your current billing cycle.
															</span>
														</div>
													</div>
												</div>
											</>
										) : (
											<>
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
																	onClick={propsData.type == "certification" ? handleSubmitCouponForCertification : handleSubmitCoupon}
																>
																	Apply Coupon
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
											</>
										)}
										{propsData.type == "points" || propsData.type == "giftcard" || propsData.type == "users" || propsData.type == "invite_users" ? (
											""
										) : (
											<>
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
																				value={(couponData.newprice / 10)}
																				displayType={"text"}
																				thousandSeparator={true}
																			/>
																			*
																		</>
																	) : (
																		<>
																			{propsData.type == "certification" ? (
																				<>
																					{productData.courseTag === "aitc" && (subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" || subscriptionInfo && subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual" || ischilduser) ? (
																						<>
																							<NumberFormat
																								value={(0)}
																								displayType={"text"}
																								thousandSeparator={true}
																							/>
																							*
																						</>
																					) : (
																						<>
																							{propsData.certificationStatus == 2 ? (
																								<>
																									{certificationExtras.proctoring ? (
																										<>
																											<NumberFormat
																												value={((productData.failedpriceincents + 5000 * propsData.quantity) / 10)}
																												displayType={"text"}
																												thousandSeparator={true}
																											/>
																											*
																										</>
																									) : (
																										<>
																											<NumberFormat
																												value={((productData.failedpriceincents * propsData.quantity) / 10)}
																												displayType={"text"}
																												thousandSeparator={true}
																											/>
																											*
																										</>
																									)}
																								</>
																							) : (
																								<>
																									{certificationExtras.proctoring ? (
																										<>
																											<NumberFormat
																												value={((productData.priceincents + 10000 * propsData.quantity) / 10)}
																												displayType={"text"}
																												thousandSeparator={true}
																											/>
																											*
																										</>
																									) : (
																										<>
																											<NumberFormat
																												value={((productData.priceincents * propsData.quantity) / 10)}
																												displayType={"text"}
																												thousandSeparator={true}
																											/>
																											*
																										</>
																									)}
																								</>
																							)}
																						</>
																					)}
																				</>
																			) : propsData.type == "macro" ? (
																				<>
																					{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																						<>
																							<NumberFormat
																								value={"0"}
																								displayType={"text"}
																								thousandSeparator={true}
																							/>
																							*
																						</>
																					) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																						<>
																							<NumberFormat
																								value={((productData.priceincents / 10) - (productData.priceincents / 10) * 0.25)}
																								displayType={"text"}
																								thousandSeparator={true}
																							/>
																							*
																						</>
																					) : (
																						<>
																							<NumberFormat
																								value={(productData.priceincents / 10)}
																								displayType={"text"}
																								thousandSeparator={true}
																							/>
																							*
																						</>
																					)}
																				</>
																			) : (
																				<>
																					<NumberFormat
																						value={((productData.priceincents * propsData.quantity) / 10)}
																						displayType={"text"}
																						thousandSeparator={true}
																					/>
																					*
																				</>
																			)}
																		</>
																	)}
																</span>
															</div>
															<div className="points-data">
																<span> *Coupon code discount not withstanding </span>
															</div>
														</div>
														<form onSubmit={propsData.type == "certification" ? handleInsighterPointsForCertification : handleInsighterPoints} style={{ display: "contents" }}>
															<div className="col-6">
																<input
																	type="number"
																	min="1"
																	name="points"
																	className="form-control"
																	placeholder="# of Points"
																	onChange={(e) => setInsighterpointstouse(e.currentTarget.value)}
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
																	<button
																		disabled
																		className="btn"
																	>
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
											</>
										)} 
										<hr className="hr-two" />
										<div className="total">
											<div className="row">
												<div className="col">
													<h3 className="text-left"> TOTAL </h3>
												</div>
												<div className="col">
													<h3 className="text-right"> 
														{couponData.length !==0 ? (
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
																{propsData.type == "users" || propsData.type == "invite_users" ? (
																	<>
																		<NumberFormat
																			value={(ChildPaymentPreviewData.amounttochargeincents / 100).toFixed(2)}
																			displayType={"text"}
																			thousandSeparator={true}
																			prefix={"$"}
																		/>
																	</>
																) : propsData.type == "points" ? (
																	<>
																		<NumberFormat
																			value={(productData.priceincents / 100).toFixed(2)}
																			displayType={"text"}
																			thousandSeparator={true}
																			prefix={"$"}
																		/>
																	</>
																) : propsData.type == "macro" ? (
																	<>
																		{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																			<NumberFormat
																				value={"0"}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																			<NumberFormat
																				value={((productData.priceincents / 100) - ((productData.priceincents / 100) * 0.25)).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (
																			<NumberFormat
																				value={(productData.priceincents / 100).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		)}
																	</>
																) : propsData.type == "certification" ? (
																	<>
																		{productData.courseTag === "aitc" && (subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" || subscriptionInfo && subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual" || ischilduser) ? (
																			<NumberFormat 
																				value={(0).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (
																			<>
																				{propsData.certificationStatus == 2 ? (
																					<>
																						{certificationExtras.proctoring ? (
																							<NumberFormat
																								value={((productData.failedpriceincents + 5000 * propsData.quantity) / 100).toFixed(2)}
																								displayType={"text"}
																								thousandSeparator={true}
																								prefix={"$"}
																							/>
																						) : (
																							<NumberFormat
																								value={((productData.failedpriceincents * propsData.quantity) / 100).toFixed(2)}
																								displayType={"text"}
																								thousandSeparator={true}
																								prefix={"$"}
																							/>
																						)}
																					</>
																				) : (
																					<>
																						{certificationExtras.proctoring ? (
																							<NumberFormat
																								value={((productData.priceincents + 10000 * propsData.quantity) / 100).toFixed(2)}
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
																			</>
																		)}
																	</>
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
											<b 
												className="red"
											>
												&nbsp;*
											</b>
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
												onClick={
													propsData.type == "manual" ? handleSubmitManual :
													propsData.type == "macro" ? handleSubmitMacro :
													propsData.type == "swag" ? handleSubmitSwag :
													propsData.type == "points" ? handleSubmitPoints :
													propsData.type == "solidifai" ? handleSubmitSolidifai :
													propsData.type == "users" ? handleSubmitSubUser :
													propsData.type == "invite_users" ? handleSubmitSubUser : handleSubmitGiftCard
												}
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
													!cardValidation ||
													!termsandconditions ||
													alreadySentMessage ||
													validInviteUsers.length == 0 
														? true
														: false
												}
											>
												Checkout
											</button>
										)}
										{loading && (
											<>
												<button 
													disabled
													className="btn"
												>
													<i className="fas fa-spinner fa-spin"></i>
												</button>
											</>
										)}
									</div>
									{inviteUsersLoading && (
										<div className="animated-typing">
											<Typed
												strings={[
													"Connecting the internet tubes... JooOOHNNN? WHERE DID YOU PUT THE INTERNET TUBES?! We've got someone on the line that needs 'em!!!",
													"Someone told me a story once. I can't remember it, but it was pretty good. If your internet isn't great, I might have just enough time to recall it...",
													"Our developers asked us for a funny loading phrase. We asked them for better code.",
												]}
												typeSpeed={100}
												backSpeed={0}
												loop
												shuffle
												fadeOut
											/>
										</div>
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
											<h2> Please fill in all required fields to complete checkout. </h2>
										</div>
									) : (
										""
									)}
									{(cardInfo && cardInfo.stripeCustomerCard.length > 0) || (parentInfo && parentInfo.useparentspaymentmethod) ? (
										""
									) : (
										<div className="error-msg">
											<h2> Please add a credit card to proceed with the checkout. </h2>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
}

export default withRouter(BuyProduct);