import React, { Suspense, useState, useEffect, useContext, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const PlanAndCertification = React.lazy(() => import("./myaccount/plan-and-certification"));
const SubscriptionAndBilling = React.lazy(() => import("./myaccount/subscription-and-billing"));
const ActionableXactimateProfile = React.lazy(() => import("./myaccount/actionable-xactimate-profile"));
const MyEvents = React.lazy(() => import("./myaccount/my-events"));
const ManagePaymentMethod = React.lazy(() => import("./myaccount/manage-payment-method"));
const Collaborator = React.lazy(() => import("./myaccount/collaborator/Collaborator"));
import { Modal } from "react-bootstrap";
import InputMask from "react-input-mask";
import queryString from "query-string";
import ReactCrop from "react-image-crop";
import moment from "moment";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDropzone } from "react-dropzone";
import history from "../../../utils/history";
import { AuthContext } from "../../../contexts/authContext";
import { AppContext } from "../../../contexts/appContext";
import {
  updateLoggedInUser,
  getLoggedInUserInfo,
  resendVerificationEmail,
  getCustomerEventDetails,
} from "../../../utils/api-routes/api-routes.util";
import user from "assets/user-eyes.svg";
import edit from "assets/Edit.svg";
import down from "assets/down-arrow.svg";
import change_password from "assets/change_password.svg";
import email from "assets/envelope.svg";
import password from "assets/passwordnew.png";
import showpassword from "assets/show_password.svg";
import hidepassword from "assets/hide_password.svg";
import Tick from "assets/Tick.svg";
import modalclose from "assets/modal-close.svg";

const FormElement = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [oldpassword, setOldPassword] = useState("");

  const [newpassword, setNewPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  let str1 = newpassword;
  let str2 = confirmpassword;

  const handleChangePassword = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      oldpassword: oldpassword,
      newpassword: newpassword,
    };

    const stringified = queryString.stringify(payload);

    updateLoggedInUser(stringified, props.data.profilePicture).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        props.handleEditProfile(false);
        props.handlecardclose();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleChangePassword}>
        <div className="row mt-3">
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="password"
                name="oldpassword"
                required 
                id="inputField1" 
                className="input-area"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.currentTarget.value)}
              />
              <label htmlFor="inputField1" className="floating_label"> Old Password </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="password"
                name="newpassword" 
                required 
                id="inputField2" 
                className="input-area"
                value={newpassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
              />
              <label htmlFor="inputField2" className="floating_label"> New Password </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="password"
                name="confirmpassword" 
                required 
                id="inputField3" 
                className="input-area"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
              <label htmlFor="inputField3" className="floating_label"> Confirm New Password </label>
            </div>
          </div>
        </div>
        {newpassword !== "" &&
          confirmpassword !== "" &&
          (str1 === str2) == true ? (
            // <div className="password-height">
            //   <span className="password-strength strong">
            //     Password Matched
            //   </span>
            // </div>
            ""
          ) : newpassword !== "" &&
            confirmpassword !== "" &&
            (str1 === str2) == false ? (
            <div className="password-height">
              <span className="password-strength">
                Password Mismatch
              </span>
            </div>
          ) : newpassword == "" &&
            confirmpassword == "" &&
            (str1 === str2) == true ? (
            ""
          ) : (
            ""
          )}
        <div className="modal-save">
          {!loading &&
            <button 
              type="submit" 
              className="btn"
              disabled={
                oldpassword == "" ||
                newpassword == "" ||
                confirmpassword == "" ||
                str1 !== str2
                  ? true
                  : false
              }
            >
              <span> Update </span>
            </button>
          }
          {loading &&
            <button className="btn" disabled> 
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          }
        </div>
        {error ? (
          <div style={{ margin: "20px auto 0px", textAlign: "center" }}>
            <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
              {error}
            </span>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

const MyAccount = (props) => {

  const [loadingPage, setLoadingPage] = useState(true);

  const { switchData } = useContext(AuthContext);
  
  const { getCustomerInfo, myInfo, getMyInsighterPoints, getMyEncryptedDataFunction, getNavbarData } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

  const switchRole = (role) => {
    if (role === "CoAdmin") {
      return "(Co-Admin)"
    } else if (role === "ReadOnly") {
      return "(Collaborator)"
    } else {
      return "(Owner)"
    }
  };

  const onSwitch = (owneremail, token, role) => {
    localStorage.setItem("emailCustomer", owneremail);
    localStorage.setItem("tokenCustomer", token);
    localStorage.setItem("roleCustomer", role);
    getCustomerInfo();
    getMyInsighterPoints();
    getMyEncryptedDataFunction();
  };

  const [loading, setLoading] = useState(false);

  const [edituser, setEditUser] = useState({
    firstName: "",
    lastName: "",
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
    alternatebillingemailid: "",
  });

  const [data, setData] = useState("");

  const [certificationsInfo, setCertificationsInfo] = useState([]);

  const [childs, setChilds] = useState([]);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const [xactProfileStatus, setXactProfileStatus] = useState("");

  const [xactProfileveriskid, setXactProfileveriskid] = useState("");

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getLoggedInUserInfo().subscribe((response) => {
        if (response.response.Requested_Action) {
          const x = response.response.data
          setData(x);
          setEditUser({
            ...edituser,
            firstName: x.firstname,
            lastName: x.lastname,
            phonenumber: x.phonenumber,
            companyname: x.companyname,
            branch: x.branch,
            fullAddress: x.fullAddress,
            streetaddress: x.streetaddress,
            aptorunitorsuite: x.aptorunitorsuite,
            country: x.country,
            city: x.city,
            state: x.state,
            zipcode: x.zipcode,
            alternatebillingemailid: x.alternatebillingemailid,
          });
          setAddress(x.fullAddress);
          if (myInfo) {
            setChilds(myInfo.childs);
            setSubscriptionInfo(myInfo.subscriptioninfo);
            setXactProfileStatus(myInfo.xactProfileStatus);
            setXactProfileveriskid(myInfo.xactProfileveriskid ? myInfo.xactProfileveriskid : "");
            setCertificationsInfo(myInfo.customercertficationinfo);
            setLoadingPage(false);
          }
        } else {
          alert("error");
        }
      });
    }
  }, [myInfo]);

  function update_user () {
    getLoggedInUserInfo().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
      }
    });
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerEventDetails().subscribe((response) => {
        if (response.response.Requested_Action) {
          const x = response.response.data;
          setEvents(x);
        } else {
          setEvents([]);
        }
      });
    }
  }, []);

  const [ProgressBar, setProgressBar] = useState(false);

  useEffect(() => {
    if ((xactProfileStatus === "Active" || validation) && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && (myInfo && myInfo.emailinvitessent)) {
      setProgressBar(false);
    } else {
      setProgressBar(true);
    }
  }, [myInfo]);

  const setStepThree = () => {
    localStorage.setItem("stepThree", "true");
  };

  const validation = childs.some((child) => child.xactProfileStatus === "Active");

  const [profileImage, setProfileImage] = useState<any>({
    profilepicture: false,
    profileImage: false,
  });

  const [profileImageError, setProfileImageError] = useState<string | boolean>(
    false
  );

  const [croppedImageUrl, setCroppedImageUrl] = useState<any>("");

  const [crop, setCrop] = useState<any>({
    unit: "px",
    width: 150,
    height: 150,
    x: 50,
    y: 50,
  });

  const [imageSrc, setImageSrc] = useState<any>(null);

  const [imageEl, setImageEl] = useState<HTMLImageElement>();

  const onDrop = useCallback((acceptedFiles) => {
    const sFileName = acceptedFiles[0].name;
    const sFileExtension = sFileName
      .split(".")
      [sFileName.split(".").length - 1].toLowerCase();
    const iFileSize = acceptedFiles[0].size;

    if (
      !(
        sFileExtension === "jpg" ||
        sFileExtension === "jpeg" ||
        sFileExtension === "png"
      )
    ) {
      setImageSrc(0);
      setProfileImageError("ext");
    } else if (iFileSize > 5485760) {
      setProfileImageError("size");
      setImageSrc(null);
    } else {
      setProfileImageError(false);
      setProfileImage({
        profilepicture: acceptedFiles[0],
        profileImage: URL.createObjectURL(acceptedFiles[0]),
      });
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
    });
    console.log(acceptedFiles[0]);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const handleSubmitUpdateUser = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: edituser.firstName,
      lastName: edituser.lastName,
      phonenumber: edituser.phonenumber,
      companyname: edituser.companyname,
      branch: edituser.branch,
      fullAddress: edituser.fullAddress,
      streetaddress: edituser.streetaddress,
      aptorunitorsuite: edituser.aptorunitorsuite,
      country: edituser.country,
      city: edituser.city,
      state: edituser.state,
      zipcode: edituser.zipcode,
      alternatebillingemailid: edituser.alternatebillingemailid,
    };

    const profilepicture = profileImage.profileImage;
    const stringified = queryString.stringify(payload);

    updateLoggedInUser(stringified, profilepicture).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setProfileImage({
          profilepicture: false,
          profileImage: false,
        });
        setEditProfile(false);
        update_user();
        getNavbarData();
        getCustomerInfo();
        scroll();
      } else {
        setLoading(false);
      }
    });
  };

  const onImageLoaded = (image) => {
    setImageEl(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageEl && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageEl,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
      setProfileImage({ ...profileImage, profileImage: croppedImageUrl });
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    canvas
      .getContext("2d")
      ?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

    return canvas.toDataURL("image/jpeg");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [switchAccount, setSwitchAccount] = useState(false);

  const [active, setActive] = useState({
    plan: true,
    subscription: false,
    xactimate: false,
    events: false,
  });

  useEffect(() => {
    if (props.location.hash === "#billing") {
      setActive({
        plan: false,
        subscription: true,
        xactimate: false,
        events: false,
      });
    } else if (props.location.state === undefined) {
      setActive({
        plan: true,
        subscription: false,
        xactimate: false,
        events: false,
      });
    } else if (props.location.state.subscription === true) {
      setActive({
        plan: false,
        subscription: true,
        xactimate: false,
        events: false,
      });
    }
  }, []);

  const [editprofile, setEditProfile] = useState(false);

  function handleEditProfile(newValue) {
    setEditProfile(newValue);
  };

  const [managepayment, setManagePayment] = useState(false);

  function handleManagePayment(newValue) {
    localStorage.setItem("managepayment", true);
    setManagePayment(newValue);
  };

  function handleXactimate(val) {
    if (val === true) {
      setActive({
        plan: false,
        subscription: false,
        xactimate: true,
        events: false,
      });
    }
  };

  function fn(text, count) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  };

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);

  const handlecardshow = () => {
    setcardpopupshow(true);
  };

  const [loadingLogin, setLoadingLogin] = useState(false);

  const [path, setPath] = useState("");
  
  useEffect(() => {
    if (props.location.state === undefined) {
    } else {
      setPath(props.location.state.path)
    }
  }, []);

  const {
    loginError,
    status,
    dispatchLoginCustomer,
    emailOnChange,
    passwordOnChange,
    logoutCustomer,
    isAuthenticatedCustomer,
  } = useContext(AuthContext);
  //const [loginStatus, setLoginStatus] = useState(loginError);
  const handleEmailChange = (e: any) => emailOnChange(e.target.value);
  const handlePasswordChange = (e: any) => passwordOnChange(e.target.value);
  const handleSubmitForm = (e: any) => {
    setLoadingLogin(true);
    e.preventDefault();
    setTimeout(() => {
      dispatchLoginCustomer(path);
      setLoadingLogin(false);
    }, 1000);
  };

  const handleLogout = () => {
    // e.preventDefault();
    setTimeout(() => {
      logoutCustomer(path, true);
    }, 1000);
  };

  useEffect(() => {
    if (status === "error") {
      if (loginError == "You have exceeded the available active sessions associated with your current plan.") {
        handleLogout();
      }
    }
  }, [status, loginError]);

  const [emailaddress, setEmailAddress] = useState("");
  const [pass, setPass] = useState("");

  const resendEmail = () => {
    setTimeout(() => {
      const payload = {
        emailaddress: emailaddress,
      };

      const stringified = queryString.stringify(payload);

      resendVerificationEmail(stringified).subscribe((response) => {
        if (response) {
          window.location.reload();
        } else {
          alert("error");
        }
      });
    }, 500);
  };

  const [showPopup, setShowPopup] = useState(false);

  function handleActionableXactimatePopup (val) {
		setShowPopup(val);
	};

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => setPasswordShown(!passwordShown);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const [showStop, setShowStop] = useState(true);

  useEffect(() => {
    if (myInfo) {
      const obj = myInfo.stripeCustomerCard.filter((card) => card.isDefault === true);
      if (obj.length === 0) {
      } else {
        const value = obj[0];

        const daysInMonth = moment(`01-${value.exp_month}-${value.exp_year}}`, "DD-MM-YYYY").daysInMonth();

        const date = new Date().toLocaleString();
        const currDate = `${moment(date).format("DD-MM-YYYY")}`;

        var start = moment(`${currDate}`, "DD-MM-YYYY");
        var end = moment(`${daysInMonth}-${value.exp_month}-${value.exp_year}`, "DD-MM-YYYY");
        var check = end.diff(start, "days");
        // console.log(check, "check")

        if (check === 90 || check === 60 || check === 30  || check === 7) {
          setTimeout(() => {
            handleShow();
          }, 1500);
        } else {
        }
      }
    }
  }, [myInfo]);

  const scroll = () => {
    const section = document.querySelector("#my-account");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      setEditUser((prevState) => ({
        ...prevState,
        fullAddress: fullAddressWithoutCountry,
        streetaddress: streetAddress,
        city: place.city || "",
        state: place.state || "",
        zipcode: place.postal_code || "",
        country: place.country || "",
      }));
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  return (
    <>
      {localStorage.getItem("tokenCustomer") ? (
        <>
          <SEO
            title="My Account - Actionable Insights"
            description="Discover how to get your own Membership Account on Actionable Insights. Here's what becoming an Insighter entails."
            link="my-account"
          />
          <Suspense
            fallback={
              <div className="loader">
                <LottieLoader />
              </div>
            }
          >
            <Modal 
              show={cardpopupshow} 
              onHide={handlecardclose} 
              className="Change_Password_Modal"
            >
              <Modal.Header>
                <img src={change_password} />
                <h5> Change Password </h5>
              </Modal.Header>
              <Modal.Body className="support_body">
                <FormElement
                  handlecardclose={handlecardclose}
                  data={data}
                  handleEditProfile={handleEditProfile}
                ></FormElement>
              </Modal.Body>
            </Modal>
            <Modal 
              show={show && showStop} 
              onHide={handleClose}
              backdrop="static" 
              keyboard={false}
              className="Cancel_Subscription_Modal"
            >
              <Modal.Header>
                <div className="cancel_subscription_title modal-title h4"> 
                  Save the (Expiration) Date
                </div>
                <button 
                  type="button" 
                  className="close" 
                  data-dismiss="modal" 
                  onClick={() => {
                    handleClose();
                    setShowStop(false);
                  }}
                >
                  <img src={modalclose} />
                </button>
              </Modal.Header>
              <Modal.Body>
                <p style={{ margin: "0px" }}>
                  It looks like your credit card expiration is coming up, or your card is already expired.
                  Please update your payment information to avoid any interruptions in your service.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn_exp"
                  onClick={() => {
                    handleClose();
                    setShowStop(false);
                    setManagePayment(true);
                  }}
                >
                  Update
                </button>
              </Modal.Footer>
            </Modal>
            <ScrollToTop />
            <Navbar
              handleManagePayment={handleManagePayment}
            />
            <Breadcrumbs />
            <div className="main-container">
              <div className="my-account" id="my-account">
                <div className="">
                  <div className="holder">
                    <h2> My Account </h2>
                  </div> 
                  {!loadingPage && (
                    <>
                      {(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") ? (
                        <>
                          {!myInfo.ischilduser && (
                            <div className="Progress-Bar-Action">
                              <div
                                className="bar"
                                onClick={() => setProgressBar(!ProgressBar)}
                              >
                                {ProgressBar ? (
                                  <>
                                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                                    <span>Hide progress bar</span>
                                  </>
                                ) : (
                                  <>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    <span>Show progress bar</span>
                                    <div className="mb-4"></div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") ? (
                        <>
                          {!myInfo.ischilduser && (
                            <>
                              {ProgressBar && (
                                <div className="Profile-Completion-Steps">
                                  <div className="stepper-wrapper">
                                    <div
                                      className={`stepper-item ${(subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus !== "Active") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? "active" : "completed"}`} 
                                    >
                                      <div className="step-counter">
                                        {(subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus !== "Active") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? (
                                          "1"
                                        ) : (
                                          <img
                                            src={Tick}
                                            alt="Ch"
                                            style={{ width: "19px", height: "19px" }}
                                          />
                                        )}
                                      </div>
                                      <div className="step-name">
                                        {(subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus !== "Active") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? (
                                          <Link to="/plan-matrix">
                                            Sign up for a
                                            <br />
                                            Membership Plan
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`stepper-item ${(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") ? "" : ((xactProfileveriskid !== "")) && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "completed" : xactProfileveriskid === "" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "active" : ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "active" : ""}`}
                                    >
                                      <div className="step-counter">
                                        {(xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          <img
                                            src={Tick}
                                            alt="Ch"
                                            style={{ width: "19px", height: "19px" }}
                                          />
                                        ) : (
                                          "2"
                                        )}
                                      </div>
                                      <div className="step-name">
                                         {(xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          ""
                                        ) : (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? (
                                          ""
                                        ) : (
                                          <>
                                            {xactProfileveriskid === "" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                              <span
                                                className="span-u"
                                                onClick={() =>
                                                  setActive({
                                                    plan: false,
                                                    subscription: false,
                                                    xactimate: true,
                                                    events: false,
                                                  })
                                                }
                                              >
                                                Add your
                                                <br />
                                                Xactware/Verisk ID
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`stepper-item ${(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") ? "" : (myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "completed" : (xactProfileveriskid === "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "" : localStorage.getItem("stepThree") === "true" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "stepThree" : ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "active" : ""}`}
                                    >
                                      <div className="step-counter">
                                        {(myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          <img
                                            src={Tick}
                                            alt="Ch"
                                            style={{ width: "19px", height: "19px" }}
                                          />
                                        ) : (
                                          "3"
                                        )}
                                      </div>
                                      <div className="step-name">
                                        {(myInfo && myInfo.emailinvitessent) && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          ""
                                        ) : (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? (
                                          ""
                                        ) : (
                                          <>
                                            {localStorage.getItem("stepThree") === "true" || xactProfileveriskid === "" || ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus !== "Active") ? (
                                              ""
                                            ) : (
                                              <Link
                                                to={{
                                                  pathname: "/users",
                                                  state: {
                                                    step: "two",
                                                  },
                                                }}
                                                onClick={setStepThree}
                                              >
                                                Add your team to
                                                <br />
                                                your {subscriptionInfo.planname.includes("EnterprisePlan") ? "Enterprise Account" : "Pro Account"}
                                              </Link>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`stepper-item ${(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") ? "" : (myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "completed" : localStorage.getItem("stepThree") === "true" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? "active" : ""}`}
                                    >
                                      <div className="step-counter">
                                        {(myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          <img
                                            src={Tick}
                                            alt="Ch"
                                            style={{ width: "19px", height: "19px" }}
                                          />
                                        ) : (
                                          "4"
                                        )}
                                      </div>
                                      <div className="step-name">
                                        {(myInfo && myInfo.emailinvitessent) && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          ""
                                        ) : (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? (
                                          ""
                                        ) : (
                                          <>
                                            {(localStorage.getItem("stepThree") === "true" && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") &&
                                              <Link
                                                to={{
                                                  pathname: "/users",
                                                  state: {
                                                    step: "three",
                                                  },
                                                }}
                                              >
                                                Click here to request activation
                                                <br />
                                                of Xactimate Profile
                                              </Link>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`stepper-item ${(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus !== "Active") ? "" : (xactProfileStatus === "Active" || validation) && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && (myInfo && myInfo.emailinvitessent) ? "completed" : (xactProfileStatus === "Active" || validation) ? "" : (myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") ? "active" : ""}`}
                                    >
                                      <div className="step-counter">
                                        {(subscriptionInfo.subscriptionstatus === "TrialCancelled") || (subscriptionInfo.subscriptionstatus === "Cancelled") || ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus !== "Active") ? (
                                          "5"
                                        ) : (xactProfileStatus === "Active" || validation) && (myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") ? (
                                          <img
                                            src={Tick}
                                            alt="Ch"
                                            style={{ width: "19px", height: "19px" }}
                                          />
                                        ) : (
                                          "5"
                                        )}
                                      </div>
                                      <div className="step-name">
                                        {(xactProfileStatus === "Active" || validation) && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") ? (
                                          ""
                                        ) : (subscriptionInfo.planname === "StandardPlan" && subscriptionInfo.subscriptionstatus === "Trial") || (subscriptionInfo.subscriptionstatus === "Cancelled") || (subscriptionInfo.subscriptionstatus === "TrialCancelled") ? (
                                          ""
                                        ) : (myInfo && myInfo.emailinvitessent) && (xactProfileveriskid !== "") && ((subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") && subscriptionInfo.subscriptionstatus === "Active") ? (
                                          <span className="span-nu">
                                            Actionable Profile incoming shortly
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {/* <div className="switch-account">
                        <h3> Switch Account </h3>
                        <div className="row">
                          <div className="col-xl-4 col-lg-3 col-md-12">
                            <div className="form-holder nogroup">
                              <input
                                onClick={() => setSwitchAccount(!switchAccount)}
                                value={`${localStorage.getItem("emailCustomer")} ${switchRole(localStorage.getItem("roleCustomer"))}`}
                                type="text"
                                name="Switch"
                                required
                                id="inputField3"
                                className="input-area"
                              />
                              <label className="file_input_label">
                                <img
                                  className="select size"
                                  src={down}
                                  onClick={() => setSwitchAccount(!switchAccount)}
                                />
                              </label>
                              <div className={switchAccount ? "active" : "dropdown-content"}>
                                {switchData.map((data, index) => {
                                  return (
                                    <h3
                                      key={index}
                                      onClick={(e) => {
                                        setSwitchAccount(!switchAccount);
                                        onSwitch(
                                          data.owneremail,
                                          data.token,
                                          data.role,
                                        );
                                      }}
                                    >
                                      {data.owneremail} ({data.role === "CoAdmin"
                                          ? "Co-Admin"
                                          : data.role === "ReadOnly"
                                          ? "Collaborator"
                                          : "Owner"})
                                    </h3> 
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="my-account-inner">
                        <div className="row">
                          <div className="col-xl-4 col-lg-3 col-md-12">
                            {editprofile ? (
                              <div className="edit-profile-section">
                                <form onSubmit={handleSubmitUpdateUser}>
                                  <div className="section-1">
                                    <div>
                                      {profileImage.profileImage ? (
                                        <>
                                          <div className="profile_image_preview">
                                            <div
                                              className="cross_icon"
                                              onClick={() => {
                                                setProfileImage({
                                                  profilepicture: false,
                                                  profileImage: false,
                                                });
                                                setImageSrc(null);
                                              }}
                                            >
                                              &times;
                                            </div>
                                            <img
                                              src={profileImage.profileImage}
                                              alt="profile_image"
                                              loading="lazy"
                                            />
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            {...getRootProps()}
                                            className="upload_profile_picture"
                                          >
                                            <input
                                              {...getInputProps()}
                                              accept="image/jpeg"
                                            />
                                            {isDragActive ? (
                                              <label className="file_input_label">
                                                <p> Click here to upload </p>
                                                <p> account image </p>
                                              </label>
                                            ) : (
                                              <label className="file_input_label">
                                                <p> Click here to upload </p>
                                                <p> account image </p>
                                              </label>
                                            )}
                                          </div>
                                          {profileImageError == "size" ? (
                                            <p className="profile_upload_image_info">
                                              Uploaded file exceeds size limit, please upload
                                              image lower than 5MB
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                          {profileImageError == "ext" ? (
                                            <p className="profile_upload_image_info">
                                              Invalid file extention.
                                            </p>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {imageSrc && (
                                      <>
                                        <ReactCrop
                                          src={profileImageError ? "" : imageSrc}
                                          crop={crop}
                                          onImageLoaded={onImageLoaded}
                                          onComplete={onCropComplete}
                                          onChange={onCropChange}
                                          // locked={true}
                                        />
                                        {croppedImageUrl && (
                                          <div className="image-crop-action-container">
                                            <button
                                              className="btn image-crop-action-btn"
                                              type="button"
                                              onClick={() => {
                                                setProfileImage({
                                                  profilepicture: false,
                                                  profileImage: false,
                                                });
                                                setCroppedImageUrl();
                                                setImageSrc(null);
                                              }}
                                            >
                                              {" "}
                                              Cancel{" "}
                                            </button>
                                            <button
                                              className="btn image-crop-action-btn"
                                              type="button"
                                              onClick={() => {
                                                setProfileImage({
                                                  profilepicture: croppedImageUrl,
                                                  profileImage: croppedImageUrl,
                                                });
                                                setImageSrc(null);
                                              }}
                                            >
                                              {" "}
                                              OK{" "}
                                            </button>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    <hr />
                                  </div>
                                  <div className="section-2">
                                    <div className="user-data">
                                      <div className="form-holder">
                                        <div className="row">
                                          <div className="col">
                                            <div className="upInputs form-group nogroup">
                                              <input
                                                type="text"
                                                name="fname"
                                                placeholder=" "
                                                required
                                                minLength={2}
                                                maxLength={20}
                                                value={edituser.firstName}
                                                onChange={(e) =>
                                                  setEditUser({
                                                    ...edituser,
                                                    firstName: e.currentTarget.value,
                                                  })
                                                }
                                              />
                                              <label className="upLabel">
                                                {" "}
                                                First Name{" "}
                                              </label>
                                            </div>
                                            <div className="upInputs form-group nogroup">
                                              <input
                                                type="text"
                                                name="lname"
                                                placeholder=" "
                                                required
                                                maxLength={20}
                                                value={edituser.lastName}
                                                onChange={(e) =>
                                                  setEditUser({
                                                    ...edituser,
                                                    lastName: e.currentTarget.value,
                                                  })
                                                }
                                              />
                                              <label className="upLabel">
                                                {" "}
                                                Last Name{" "}
                                              </label>
                                            </div>
                                            <div className="upInputs form-group nogroup">
                                              <InputMask
                                                mask="999-999-9999"
                                                value={edituser.phonenumber}
                                                onChange={(e) =>
                                                  setEditUser({
                                                    ...edituser,
                                                    phonenumber: e.currentTarget.value,
                                                  })
                                                }
                                              >
                                                {(inputProps) => (
                                                  <input
                                                    type="text"
                                                    name="phonenumber"
                                                    placeholder=" "
                                                    required
                                                    {...inputProps}
                                                  />
                                                )}
                                              </InputMask>
                                              <label className="upLabel">
                                                {" "}
                                                Phone No.{" "}
                                              </label>
                                            </div>
                                            <div className="upInputs form-group nogroup">
                                              <input
                                                type="text"
                                                name="companyname"
                                                placeholder=" "
                                                value={edituser.companyname}
                                                onChange={(e) =>
                                                  setEditUser({
                                                    ...edituser,
                                                    companyname: e.currentTarget.value,
                                                  })
                                                }
                                              />
                                              <label className="upLabel">
                                                {" "}
                                                Company Name{" "}
                                              </label>
                                            </div>
                                            {subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" || myInfo.ischilduser ? (
                                              <div className="upInputs form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="branch"
                                                  placeholder=" "
                                                  value={edituser.branch}
                                                  onChange={(e) =>
                                                    setEditUser({
                                                      ...edituser,
                                                      branch: e.currentTarget.value,
                                                    })
                                                  }
                                                />
                                                <label className="upLabel">
                                                  {" "}
                                                  Branch/Location{" "}
                                                </label>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                            {enterAddressManually ? (
                                              <>
                                                <div className="upInputs form-group nogroup">
                                                  <input
                                                    type="text"
                                                    name="streetaddress"
                                                    placeholder=" "
                                                    value={edituser.streetaddress}
                                                    onChange={(e) =>
                                                      setEditUser({
                                                        ...edituser,
                                                        streetaddress: e.currentTarget.value,
                                                      })
                                                    }
                                                  />
                                                  <label className="upLabel">
                                                    {" "}
                                                    Street Address{" "}
                                                  </label>
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
                                                <div className="upInputs form-group nogroup">
                                                  <input
                                                    type="text"
                                                    name="aptorunitorsuite"
                                                    placeholder=" "
                                                    value={edituser.aptorunitorsuite}
                                                    onChange={(e) =>
                                                      setEditUser({
                                                        ...edituser,
                                                        aptorunitorsuite: e.currentTarget.value,
                                                      })
                                                    }
                                                  />
                                                  <label className="upLabel">
                                                    {" "}
                                                    Apt., Unit, or Suite #{" "}
                                                  </label>
                                                </div>
                                                <div className="upInputs form-group nogroup">
                                                  <input
                                                    type="text"
                                                    name="city"
                                                    placeholder=" "
                                                    value={edituser.city}
                                                    onChange={(e) =>
                                                      setEditUser({
                                                        ...edituser,
                                                        city: e.currentTarget.value,
                                                      })
                                                    }
                                                  />
                                                  <label className="upLabel">
                                                    {" "}
                                                    City{" "}
                                                  </label>
                                                </div>
                                                <div className="upInputs form-group nogroup">
                                                  <input
                                                    type="text"
                                                    name="state"
                                                    placeholder=" "
                                                    value={edituser.state}
                                                    onChange={(e) =>
                                                      setEditUser({
                                                        ...edituser,
                                                        state: e.currentTarget.value,
                                                      })
                                                    }
                                                  />
                                                  <label className="upLabel">
                                                    {" "}
                                                    State{" "}
                                                  </label>
                                                </div>
                                                <div className="upInputs form-group nogroup">
                                                  <input
                                                    type="text"
                                                    name="zipcode"
                                                    placeholder=" "
                                                    value={edituser.zipcode}
                                                    onChange={(e) =>
                                                      setEditUser({
                                                        ...edituser,
                                                        zipcode: e.currentTarget.value,
                                                      })
                                                    }
                                                  />
                                                  <label className="upLabel">
                                                    {" "}
                                                    Zip Code{" "}
                                                  </label>
                                                </div>
                                                <div className="upInputs form-group nogroup">
                                                  <input
                                                    type="text"
                                                    name="country"
                                                    placeholder=" "
                                                    value={edituser.country}
                                                    onChange={(e) =>
                                                      setEditUser({
                                                        ...edituser,
                                                        country: e.currentTarget.value,
                                                      })
                                                    }
                                                  />
                                                  <label className="upLabel">
                                                    {" "}
                                                    Country{" "}
                                                  </label>
                                                </div>
                                              </>
                                            ) : (
                                              <PlacesAutocomplete
                                                value={address}
                                                onChange={(value) => {
                                                  setAddress(value);
                                                  if (!value) {
                                                    edituser((prevState) => ({
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
                                                  <div className="upInputs form-group nogroup">  
                                                    <input
                                                      {...getInputProps({
                                                        name: "address",
                                                        placeholder: " ",
                                                        readOnly: enterAddressManually,
                                                      })}
                                                    />
                                                    <label className="upLabel">
                                                      {" "}
                                                      Address{" "}
                                                    </label>
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
                                                )}
                                              </PlacesAutocomplete>
                                            )}
                                            <div className="upInputs form-group nogroup">
                                              <input
                                                type="email"
                                                name="alternatebillingemailid"
                                                placeholder=" "
                                                value={edituser.alternatebillingemailid}
                                                onChange={(e) =>
                                                  setEditUser({
                                                    ...edituser,
                                                    alternatebillingemailid: e.currentTarget.value,
                                                  })
                                                }
                                              />
                                              <label className="upLabel">
                                                {" "}
                                                Alternate Billing Email ID{" "}
                                              </label>
                                            </div>
                                            <div className="change-password">
                                              <span onClick={handlecardshow}> Change Password </span>
                                            </div>
                                            <div className="update-cancel">
                                              {!loading && (
                                                <button 
                                                  type="submit" 
                                                  className="btn"
                                                >
                                                  <span> Update </span>
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
                                              <button
                                                className="btn cancel"
                                                onClick={() => {
                                                  setEditProfile(false);
                                                  scroll();
                                                }}
                                              >
                                                <span> Cancel </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            ) : (
                              <div className="profile-section">
                                <div className="section-1">
                                  <div className="edit-profile">
                                    <img
                                      src={edit}
                                      onClick={() => setEditProfile(true)}
                                    />
                                  </div>
                                  <div className="image-section">
                                    <img 
                                      src={
                                        data.profilePicture ? data.profilePicture : user
                                      }
                                      alt="user"
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="user-name-email">
                                    <h3> {data.firstname} {data.lastname} </h3>
                                    <h4> {data.emailaddress.length > 20 ? `${data.emailaddress.substring(0,20)}...` : data.emailaddress} </h4>
                                  </div>
                                  <hr />
                                </div>
                                <div className="section-2">
                                  <div className="user-data">
                                    <div className="row data">
                                      <div className="col">
                                        <h5 className="headig"> First Name </h5>
                                      </div>
                                      <div className="col">
                                        <h5 className="value"> {data.firstname} </h5>
                                      </div>
                                    </div>
                                    <div className="row data">
                                      <div className="col">
                                        <h5 className="headig"> Last Name </h5>
                                      </div>
                                      <div className="col">
                                        <h5 className="value"> {data.lastname} </h5>
                                      </div>
                                    </div>
                                    <div className="row data">
                                      <div className="col">
                                        <h5 className="headig"> Email </h5>
                                      </div>
                                      <div className="col">
                                        <h5 className="value email"> {fn(data.emailaddress, 15)} </h5>
                                      </div>
                                    </div>
                                    <div className="row data">
                                      <div className="col">
                                        <h5 className="headig"> Phone No. </h5>
                                      </div>
                                      <div className="col">
                                        <h5 className="value"> {data.phonenumber} </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {myInfo.ischilduser ? (
                            <Collaborator
                              certificationsInfo={certificationsInfo}
                            />
                          ) : (
                            <div className="col-xl-8 col-lg-9 col-md-12">
                              {managepayment ? (
                                <ManagePaymentMethod 
                                  handleManagePayment={handleManagePayment}
                                />
                              ) : (
                                <div className="plan-and-subscription-section">
                                  <div className="tabs">
                                    <div
                                      className={active.plan ? "active" : "tab"}
                                      onClick={() => {
                                        setActive({
                                          plan: true,
                                          subscription: false,
                                          xactimate: false,
                                          events: false,
                                        });
                                        history.push({
                                          pathname: "/my-account",
                                          state: {
                                            subscription: false,
                                          }
                                        });
                                      }}
                                    >
                                      Plan & Certification
                                    </div>
                                    <div
                                      className={active.subscription ? "active" : "tab"}
                                      onClick={() =>
                                        setActive({
                                          plan: false,
                                          subscription: true,
                                          xactimate: false,
                                          events: false,
                                        })
                                      }
                                    >
                                      Subscription & Billing
                                    </div>
                                    {myInfo && myInfo.subscriptioninfo.planname == "ProfessionalPlan" || myInfo.subscriptioninfo.planname == "ProfessionalPlanAnnual" || myInfo.subscriptioninfo.planname == "EnterprisePlan" || myInfo.subscriptioninfo.planname == "EnterprisePlanAnnual" ? (
                                      <>
                                        <div
                                          style={showPopup ? { display: "block" } : { display: "none" }}
                                          className="setup-ai-xact-profile-tooltip"
                                        >
                                          <p> This is your Actionable Xactimate Profile tab where you can manage your Xactware/Verisk ID. </p>
                                          <div
                                            className="cross_icon"
                                            onClick={() => setShowPopup(!showPopup)}
                                          >
                                            &times;
                                          </div>
                                        </div>
                                        <div
                                          className={active.xactimate ? "active" : "tab"}
                                          onClick={() =>
                                            setActive({
                                              plan: false,
                                              subscription: false,
                                              xactimate: true,
                                              events: false,
                                            })
                                          }
                                        >
                                          Actionable Xactimate Profile
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    <div
                                      className={active.events ? "active" : "tab"}
                                      onClick={() =>
                                        setActive({
                                          plan: false,
                                          subscription: false,
                                          xactimate: false,
                                          events: true,
                                        })
                                      }
                                    >
                                      My Events
                                    </div>
                                  </div>
                                  {active.plan && 
                                    <PlanAndCertification 
                                      certificationsInfo={certificationsInfo}
                                    />
                                  }
                                  {active.subscription && 
                                    <SubscriptionAndBilling                           
                                      handleManagePayment={handleManagePayment}
                                      handleActionableXactimatePopup={handleActionableXactimatePopup}
                                      handleXactimate={handleXactimate}
                                    />
                                  }
                                  {active.xactimate && 
                                    <ActionableXactimateProfile />
                                  }
                                  {active.events && 
                                    <MyEvents
                                      events={events}
                                    />
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
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
            <WrongBrowserDisclaimer />
            <CookieConsentGI2 />
            <Footer />
          </Suspense>
        </>
      ) : (
        <>
          <SEO
            title="Sign in to Actionable Insights | Xactimate & Matterport Resources"
            description="Create an Insighter account with Actionable Insights to access free Xactimate and Matterport Resources, Insighter points, and more. Sign up now."
            link="my-account"
          />
          <Suspense
            fallback={
              <div className="loader">
                <LottieLoader />
              </div>
            }
          >
            <ScrollToTop />
            <Navbar />
            <Breadcrumbs />
              <div className="login_page"> 
                <div className="container-fluid">
                  <span className="title"> 
                    Sign In with your insighter account
                  </span>
                  <div className="login_inner_Container">
                    <div className="form-holder">
                      <form onSubmit={handleSubmitForm}>
                        <div className="row">
                          <div className="col">
                            <div className="upInputs form-group nogroup">
                              <img 
                                className="input_icon" 
                                src={email}
                              />
                              <input 
                                type="email"
                                name="Email"
                                placeholder=" "
                                required 
                                onChange={(e) => {
                                  handleEmailChange(e);
                                  setEmailAddress(e.currentTarget.value);
                                }}
                              />
                              <label className="upLabel"> Email </label>
                            </div>
                            <div className="form-group nogroup">
                              <img 
                                className="input_icon" 
                                src={password}
                              />
                              <input
                                type={passwordShown ? "text" : "password"}
                                name="Password"
                                required
                                id="inputField2"
                                className="input-area"
                                onChange={(e) => {
                                  handlePasswordChange(e);
                                  setPass(e.currentTarget.value);
                                }}
                              />
                              <label htmlFor="inputField2" className="floating_label">
                                Password
                              </label>
                              <img 
                                className="input_icon"
                                style={{
                                  right: "0",
                                  cursor: "pointer",
                                }}
                                src={passwordShown ? showpassword : hidepassword}
                                onClick={togglePassword}
                              />
                            </div>
                            <div className="forgotP_container">
                              <Link to="/my-account/lost-password"> Forgot Password? </Link>
                            </div>
                            {status === "error" ? (
                              <>
                                {loginError == "Email not verified." ? (
                                  <div className="form-group alert alert-danger" style={{ width: "257px" }}>
                                    <div>
                                      Please follow the link sent to your email to complete your account activation. 
                                      Click{" "}
                                      <span className="email-not-verified" onClick={resendEmail}>here</span>
                                      {" "}to resend the activation email.
                                    </div>
                                  </div>
                                ) : loginError == "ERROR: The username or password you entered is incorrect. Lost your password?" ? (
                                  <div className="form-group alert alert-danger" style={{ width: "257px" }}>
                                    <div>
                                      ERROR: The username or password you entered is incorrect.{" "}
                                      <Link
                                        to="/my-account/lost-password"
                                        style={{ 
                                          color: "#721c24",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        Lost your password?
                                      </Link>  
                                    </div>
                                  </div>
                                ) : loginError == "You have exceeded the available active sessions associated with your current plan." ? (
                                  ""
                                ) : (
                                  <div className="form-group alert alert-danger" style={{ width: "257px" }}>
                                    {loginError}
                                  </div>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                            {!loadingLogin && (
                              <button 
                                className="btn"
                                type="submit"
                                disabled={emailaddress == "" || pass == "" ? true : false}
                              > 
                                <span> Sign In </span>
                              </button>
                            )}
                            {loadingLogin && (
                              <button 
                                className="btn"
                                disabled
                              > 
                                <i className="fas fa-spinner fa-spin"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="login_devider">
                      <span>New to getinsights.org?</span>
                    </div>
                    <div>
                      <Link
                        to="/get-started" 
                        className="btn create_account" 
                      > 
                        Create Account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            <WrongBrowserDisclaimer />
            <CookieConsentGI2 />
            <Footer />
          </Suspense>
        </>
      )}      
    </>
  );
};

export default withRouter(MyAccount);