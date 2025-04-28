import React, { Suspense, useEffect, useContext, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../contexts/appContext";
import ActiveUsers from "./users/ActiveUsers";
import PendingUsers from "./users/PendingUsers";
import { Helmet } from "react-helmet";
import { CSVLink } from "react-csv";
import Modal from "react-bootstrap/Modal";
import down from "assets/down-arrow-user.svg";
import modalclose from "assets/modal-close.svg";
import usertab1 from "assets/user-tab-1.svg";
import usertab2 from "assets/user-tab-2.svg";

const FormElement = (props) => {
  return (
    <>
      <div className="body-sec">
        <div className="row text-left">
          <div className="col-12">
            <p> Following details are missing, Please fill these and try again. </p>
          </div>
          <div className="col-12">
            <div className="empty-data">
              {props.emptyData.map(({ userIndex, emptyFields }) => (
                <div key={userIndex} className="mt-3">
                  <h5>User {userIndex + 1}</h5>
                  {emptyFields.map((field, index) => (
                    <p
                      key={index}>
                        {index + 1}.{" "}
                        {
                          field == "toInvite" ? "Company Email Address" :
                          field == "invalid email format" ? "Invalid Email Format for Company Email Address" :
                          field == "XactProfileveriskid" ? "Xactware/Verisk ID" :
                          field == "branch" ? "Branch/Location" :
                          field == "firstname" ? "First Name" :
                          field == "lastname" ? "Last Name" :
                          field == "role" ? "Role" :
                          field == "inviteMessage" ? "Invitation Message" : field 
                        }
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-save">
        <button 
          className="btn"
          onClick={() => props.handlecardclose()}
        >
          <span> Got it! </span>
        </button>
      </div>
    </>
  );
};

const Users = (props) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState(location.pathname);

  const { getCustomerInfo, myInfo, getMyInvitedUser, invitedUsers, getMyCoAdmin, coAdmins } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
    getMyInvitedUser();
    getMyCoAdmin();
  }, []);

  const [role, setRole] = useState(false);

  const [active, setActive] = useState({
    active: true,
    pending: false,
    deleted: false,
  });

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  useEffect(() => {
    setSubscriptionInfo(myInfo.subscriptioninfo);
  }, [myInfo]);

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

  useEffect(() => {
    if (myInfo) {
      setObjContactInformationForOrderDTO({
        ...objContactInformationForOrderDTO,
        firstname: myInfo.ownerinfo.firstname,
        lastname: myInfo.ownerinfo.lastname,
        phonenumber: myInfo.ownerinfo.phonenumber,
        companyname: myInfo.ownerinfo.companyname ? myInfo.ownerinfo.companyname : "",
        branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
				fullAddress: myInfo.ownerinfo.fullAddress ? myInfo.ownerinfo.fullAddress : "",
        streetaddress: myInfo.ownerinfo.streetaddress ? myInfo.ownerinfo.streetaddress : "",
        aptorunitorsuite: myInfo.ownerinfo.aptorunitorsuite ? myInfo.ownerinfo.aptorunitorsuite : "",
				country: myInfo.ownerinfo.country ? myInfo.ownerinfo.country : "",
        city: myInfo.ownerinfo.city ? myInfo.ownerinfo.city : "",
        state: myInfo.ownerinfo.state ? myInfo.ownerinfo.state : "",
        zipcode: myInfo.ownerinfo.zipcode ? myInfo.ownerinfo.zipcode : "",
        profilepicture: myInfo.ownerinfo.profilepicture,
      });
    }
  }, [myInfo]);

  const [showPopup, setShowPopup] = useState(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    if (location.state?.finalize) {
      setTimeout(() => {
        handleShow1();
        navigate(location.pathname, { 
          state: { ...location.state, finalize: undefined },
          replace: true 
        });
      }, 500);
    }
  }, [location.state, navigate, handleShow1]);

  const CSVheaders = [
		{
			label: "Email",
			key: "user.emailaddress",
		},
    {
			label: "Xactware/Verisk ID",
			key: "xactProfileveriskid",
		},
		{
			label: "Branch/Location",
			key: "user.branch",
		},
		{
			label: "First Name",
			key: "user.firstname",
		},
    {
			label: "Last Name",
			key: "user.lastname",
		},
  ];

	const SubUsersCSV = {
    headers: CSVheaders,
    data: invitedUsers,
    filename: "Sub-Users"
  };

  const [numUsers, setNumUsers] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);

  // Scroll the tabs container left or right
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 100; // Adjust as needed for scroll speed
      tabsRef.current.scrollLeft += direction === "right" ? scrollAmount : -scrollAmount;
    }
  };

  const [userData, setUserData] = useState([createEmptyUserData()]);
  // console.log(userData, "userData")
  const [showInviteButton, setShowInviteButton] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [emptyData, setEmptyData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [inviteMessage, setInviteMessage] = useState("");

  function createEmptyUserData(message = "") {
    return {
      toInvite: "",
      firstname: "",
      lastname: "",
      branch: "",
      role: "",
      inviteMessage: message,
      XactProfileveriskid: "",
      useparentspaymentmethod: true,
    };
  }

  useEffect(() => {
    const message = `It's me, the account administrator of your new Actionable ${
      subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan"
        ? "Pro Plan Monthly"
        : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual"
        ? "Pro Plan Annual"
        : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan"
        ? "Enterprise Plan Monthly"
        : "Enterprise Plan Annual"
    }! Please follow the instructions in this email to finish setting up your account and gain access to the Actionable Xactimate Profile.`;

    setInviteMessage(message);

    // Update existing userData with new invite message
    setUserData((prevUserData) =>
      prevUserData.map((user) => ({
        ...user,
        inviteMessage: message,
      }))
    );
  }, [myInfo]);

  // Handle number of users change dynamically, with limit between 1 and 100
  const handleNumUsersChange = (e) => {
    let value = parseInt(e.target.value) || 1;

    // Enforce min and max limits
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    setNumUsers(value);
    setShowInviteButton(false); // Reset invite button display

    // Adjust userData array to match numUsers
    setUserData((prevUserData) => {
      const newUserData = [...prevUserData];
      if (value > newUserData.length) {
        // Add new user objects if numUsers increased
        for (let i = newUserData.length; i < value; i++) {
          newUserData.push(createEmptyUserData(inviteMessage));
        }
      } else if (value < newUserData.length) {
        // Remove extra users if numUsers decreased
        newUserData.splice(value);
      }
      return newUserData;
    });

    // Ensure active tab is within bounds
    if (activeTab >= value) {
      setActiveTab(value - 1);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...userData];
    updatedData[index][field] = value;
    setUserData(updatedData);
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], [field]: false }, // Remove error as user types
    }));
  };

  const isLastTab = () => activeTab === numUsers - 1;

  // Validate fields including email format check
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const incompleteFields = userData.map((user, idx) => {
      const emptyFields = Object.keys(user).filter((field) => !user[field]);
          
      // Check if email field is in a valid format if it has been filled
      if (user.toInvite && !emailRegex.test(user.toInvite)) {
        emptyFields.push("invalid email format");
      }

      return { userIndex: idx, emptyFields };
    }).filter(user => user.emptyFields.length > 0);
    setEmptyData(incompleteFields);
    return incompleteFields;
  };

  const handleNext = () => {
    if (isLastTab()) {
      const missingFields = validateFields();
      if (missingFields.length > 0) {
        setFieldErrors(
          missingFields.reduce((acc, { userIndex, emptyFields }) => {
            acc[userIndex] = emptyFields.reduce((fieldAcc, field) => {
              fieldAcc[field] = true;
              return fieldAcc;
            }, {});
            return acc;
          }, {})
        );
        handleShow(); // Show modal if there are missing fields
      } else {
        setShowInviteButton(true); // Show Invite button if all fields are complete
      }
    } else {
      setActiveTab(activeTab + 1);
    }
  };

  const handleInvite = () => {
    // console.log("Inviting users with data:", userData);
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
    navigate("/checkout", {
			state: {
        invite_users: userData,
        type: "invite_users",
        planName: (myInfo.subscriptioninfo.planname === "EnterprisePlan" || myInfo.subscriptioninfo.planname === "EnterprisePlanAnnual") ? "EP" : "PP",
        path: path,
      },
		});
  };

  return (
    <>
      <Helmet>
        <title>Users - Actionable Insights</title>
      </Helmet>
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
        {subscriptionInfo ? (
          <>
            {(subscriptionInfo.subscriptionstatus === "Cancelled" && (invitedUsers.length !== 0 || coAdmins.length == 0)) || (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") ? (
              <>
                <Modal 
                  show={show1} 
                  onHide={handleClose1}
                  backdrop="static" 
                  // keyboard={false}
                  className="Actionable_Xactimate_Profile_Modal"
                >
                  <Modal.Header>
                    <div className="actionable_xactimate_profile_title modal-title h4"> 
                      Finalize Account Details
                    </div>
                    <button 
                      type="button" 
                      className="close" 
                      data-dismiss="modal" 
                      onClick={handleClose1}
                    >
                      <img src={modalclose} />
                    </button>
                  </Modal.Header>
                  <Modal.Body>
                    This is where you can add additional sub-users to your account.
                    If you are a single license user, simply skip this step and click <span style={{ color: "#38ADA2"}}>Request Company Wide Actionable Profile Activation</span>.
                    If you need to add sub-users, please add them using the tool on the right.
                    When you are done, click <span style={{ color: "#38ADA2"}}>Request Company Wide Actionable Profile Activation</span>.
                  </Modal.Body>
                  <Modal.Footer>
                    <button 
                      className="btn" 
                      style={{ width: "117px" }}
                      onClick={handleClose1}
                    >
                      Continue
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal 
                  show={showModal} 
                  onHide={handleClose}
                  backdrop="static" 
                  keyboard={false}
                  className="Invite_Multiple_Users_Modal"
                >
                  <Modal.Header>
                    <div className="invite_multiple_users_title modal-title h4"> 
                      <span>Error:</span> Incomplete details
                    </div>
                    <button 
                      type="button" 
                      className="close" 
                      data-dismiss="modal" 
                      onClick={handleClose}
                    >
                      <img src={modalclose} />
                    </button>
                  </Modal.Header>
                  <Modal.Body className="support_body">
                    <FormElement
                      handlecardclose={handleClose}
                      emptyData={emptyData}
                    ></FormElement>
                  </Modal.Body>
                </Modal>
                <ScrollToTop />
                <Navbar />
                <Breadcrumbs />
                <div className="main-container">
                  <div className="Users">
                    <div className="">
                      <div className="holder">
                        <h2> User Management </h2>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12">
                          <div className="tabs">
                            <div
                              className={active.active ? "active" : "tab"}
                              style={{ padding: "0px", cursor: "initial" }}
                              onClick={() =>
                                setActive({
                                  active: true,
                                  pending: false,
                                  deleted: false,
                                })
                              }
                            >
                              <h3>
																Active{" "}
																({invitedUsers.length == 0 && coAdmins.length == 0 ? 1 : invitedUsers.length + 1 + coAdmins.length})
															</h3>
                            </div>
                            {/* <div 
															className={active.pending ? "active" : "tab"}
															onClick={() => setActive({
																active: false,
																pending: true,
																deleted: false,
															})}
														>
															<h3> Pending </h3>
														</div> */}
                            {/* <div 
															className={active.deleted ? "active" : "tab"}
															style={{ padding: "0px" }}
															onClick={() => setActive({
																active: false,
																pending: false,
																deleted: true,
															})}
														>
															<h3> Deleted </h3>
														</div> */}
                          </div>
                          <div className="back-to-my-account">
                            {invitedUsers.length == 0 ? (
                              <a style={{ opacity: 0.5, cursor: "not-allowed" }}>
                                <span> Download CSV </span>
                              </a>
                            ) : (
                              <CSVLink {...SubUsersCSV}>
                                <span> Download CSV </span>
                              </CSVLink>
                            )}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12">
                          {(location.state && location.state.step === "two" &&
                            <div
                              style={showPopup ? { display: "block" } : { display: "none" }}
                              className="step-2-tooltip"
                            >
                              <p>
                                Enter team member info
                                <br />
                                below and click on
                                <br />
                                the Invite button.
                              </p>
                              <div
                                className="cross_icon"
                                onClick={() => setShowPopup(!showPopup)}
                              >
                                &times;
                              </div>
                            </div>
                          )}
                          {/* <div className="invite-more-than-one-user">
                            <Link to="/users/invite-users">
                              Looking to invite multiple people at once?
                            </Link>
                          </div> */}
                        </div>
                      </div>
                      <div className="row">
												{active.active && (
													<ActiveUsers />
												)}
												{active.pending && (
													<PendingUsers />
												)}
												{active.deleted && (
													""
												)}
                        <div className="col-xl-4 col-lg-4 col-md-12">
                          {(location.state && location.state.step === "two" &&
                            <div
                              style={showPopup ? { display: "block" } : { display: "none" }}
                              className="step-2-tooltip-responsive"
                            >
                              <p>
                                Enter team member info
                                <br />
                                below and click on
                                <br />
                                the Invite button.
                              </p>
                              <div
                                className="cross_icon"
                                onClick={() => setShowPopup(!showPopup)}
                              >
                                &times;
                              </div>
                            </div>
                          )}
                          {/* <div className="invite-more-than-one-user-responsive">
                            <Link to="/users/invite-users">
                              Looking to invite more than one user?
                            </Link>
                          </div> */}
                          <div className="sec-2">
                            <div className="invite-users">
                              <div className="heading">
                                <h5> Invite Users </h5>
                              </div>
                              <div className="Input">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group noofusers">
                                      <label> Number of Users: </label>
                                      <input
                                        className="form-control"
                                        type="number"
                                        autoComplete="off"
                                        value={numUsers} 
                                        onChange={handleNumUsersChange} 
                                        min="1" 
                                        max="100"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tabs-container">
                                <button className="scroll-button left" onClick={() => scrollTabs("left")}>
                                  &lt;
                                </button>
                                <div className="user-tabs" ref={tabsRef}>
                                  {[...Array(numUsers)].map((_, idx) => (
                                    <button 
                                        key={idx} 
                                        className={`tab-button ${idx === activeTab ? "active" : ""}`}
                                        onClick={() => setActiveTab(idx)}
                                    >
                                      <img
                                        src={idx === activeTab ? usertab1 : usertab2}
                                        loading="lazy"
                                      />
                                      <span>{idx + 1}</span>
                                    </button>
                                  ))}
                                </div>
                                <button className="scroll-button right" onClick={() => scrollTabs("right")}>
                                  &gt;
                                </button>
                              </div>
                              <div className="user-form">
                                <div className="Input">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label
                                          className={fieldErrors[activeTab]?.toInvite? "error-label" : ""}
                                        >
                                          Company Email Address
                                        </label>
                                        <b
                                          style={{
                                            color: "red",
                                            fontSize: "25px",
                                          }}
                                        >
                                          *
                                        </b>
                                        <input
                                          type="email"
                                          name="toInvite"
                                          placeholder="Enter Company Email Address"
                                          value={userData[activeTab].toInvite}
                                          onChange={(e) => handleInputChange(activeTab, "toInvite", e.target.value)}
                                          className={fieldErrors[activeTab]?.toInvite ? "form-control error" : "form-control"}
                                          readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="Input">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label
                                          className={fieldErrors[activeTab]?.XactProfileveriskid? "error-label" : ""}
                                        >
                                          Xactware/Verisk ID 
                                        </label>
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
                                          name="XactProfileveriskid"
                                          placeholder="Enter Xactware/Verisk ID"
                                          value={userData[activeTab].XactProfileveriskid}
                                          onChange={(e) => handleInputChange(activeTab, "XactProfileveriskid", e.target.value)}
                                          className={fieldErrors[activeTab]?.XactProfileveriskid ? "form-control error" : "form-control"}
                                          readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                        />
                                        <label
                                          style={{
                                            fontSize: "12px",
                                            color: "#B8B8B8",
                                            margin: "5px 0px 0px 0px",
                                          }}
                                        >
                                          Ex. The email address they use to log in to Xactimate
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="Input">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label
                                          className={fieldErrors[activeTab]?.branch? "error-label" : ""}
                                        >
                                          Branch/Location
                                        </label>
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
                                          name="fname"
                                          placeholder="Enter Branch/Location"
                                          value={userData[activeTab].branch}
                                          onChange={(e) => handleInputChange(activeTab, "branch", e.target.value)}
                                          className={fieldErrors[activeTab]?.branch ? "form-control error" : "form-control"}
                                          readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="Input">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label
                                          className={fieldErrors[activeTab]?.firstname? "error-label" : ""}
                                        >
                                          First Name
                                        </label>
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
                                          placeholder="Enter First Name"
                                          value={userData[activeTab].firstname}
                                          onChange={(e) => handleInputChange(activeTab, "firstname", e.target.value)}
                                          className={fieldErrors[activeTab]?.firstname ? "form-control error" : "form-control"}
                                          readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="Input">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label
                                          className={fieldErrors[activeTab]?.lastname? "error-label" : ""}
                                        >
                                          Last Name 
                                        </label>
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
                                          placeholder="Enter Last Name"
                                          value={userData[activeTab].lastname}
                                          onChange={(e) => handleInputChange(activeTab, "lastname", e.target.value)}
                                          className={fieldErrors[activeTab]?.lastname ? "form-control error" : "form-control"}
                                          readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="Input invite_select">
                                  <div className="row">
                                    <div className="col">
                                      {subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? (
                                        <div className="form-group">
                                          <label
                                            className={fieldErrors[activeTab]?.lastname? "error-label" : ""}
                                          >
                                            Role 
                                          </label>
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
                                            name="role"
                                            placeholder="Select Role"
                                            value={userData[activeTab].role == "" ? ""  : userData[activeTab].role == "ProfessionalPlanCoAdmin" ? "Co-Admin" : "Collaborator"}
                                            className={fieldErrors[activeTab]?.role ? "form-control error" : "form-control"}
                                            readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                          />
                                          <label className="file_input_label">
                                            <img
                                              className="select size"
                                              src={down}
                                              onClick={() => setRole(!role)}
                                            />
                                          </label>
                                        </div>
                                      ) : (
                                        <div className="form-group">
                                          <label
                                            className={fieldErrors[activeTab]?.role? "error-label" : ""}
                                          >
                                            Role
                                          </label>
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
                                            name="role"
                                            placeholder="Select Role"
                                            value={userData[activeTab].role == "" ? ""  : userData[activeTab].role == "ProfessionalPlanCoAdmin" ? "Co-Admin" : "Collaborator"}
                                            onClick={() => setRole(!role)}
                                            className={fieldErrors[activeTab]?.role ? "form-control error" : "form-control"}
                                            autoComplete="off"
                                          />
                                          <label className="file_input_label">
                                            <img
                                              className="select size"
                                              src={down}
                                              onClick={() => setRole(!role)}
                                            />
                                          </label>
                                          <div className={role ? "active" : "dropdown-content"}>
                                            {/* <h3
                                              onClick={(e) => {
                                                setRole(!role);
                                                handleInputChange(activeTab, "role", "ProfessionalPlanCoAdmin");
                                              }}
                                            >
                                              Co-Admin
                                            </h3> */}
                                            <h3
                                              onClick={(e) => {
                                                setRole(!role);
                                                handleInputChange(activeTab, "role", "ProfessionalPlanChild");
                                              }}
                                            >
                                              Collaborator
                                            </h3>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="message">
                                  <div className="row">
                                    <div className="col">
                                      <label
                                        className={fieldErrors[activeTab]?.inviteMessage ? "error-label" : ""}
                                      >
                                        Invitation Message
                                      </label>
                                      <b
                                        style={{
                                          color: "red",
                                          fontSize: "25px",
                                        }}
                                      >
                                        *
                                      </b>
                                      <div className="add_msg_body">
                                        <textarea
                                          placeholder={`It"s me, the account administrator of your new Actionable ${subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan Monthly" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan Annual" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan Monthly" : "Enterprise Plan Annual"}! Please follow the instructions in this email to finish setting up your account and gain access to the Actionable Xactimate Profile.`}
                                          value={userData[activeTab].inviteMessage}
                                          onChange={(e) => handleInputChange(activeTab, "inviteMessage", e.target.value)}
                                          className={fieldErrors[activeTab]?.inviteMessage ? "form-control bd error" : "form-control bd"}
                                          readOnly={subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ? true : false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="invite">
                                {!showInviteButton && (
                                  <>
                                    <button
                                      className="btn-outline"
                                      onClick={() => setActiveTab(activeTab - 1)} 
                                      disabled={activeTab === 0}
                                    >
                                      Back
                                    </button>
                                    <button
                                      className="btn btn-next"
                                      onClick={handleNext}
                                      disabled={
                                        subscriptionInfo.subscriptionstatus === "Cancelled" || subscriptionInfo.subscriptionstatus == "Paused" || subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure"
                                          ? true
                                          : false
                                      }
                                    >
                                      {isLastTab() ? "Next" : "Next"}
                                    </button>
                                  </>
                                )}
                                {showInviteButton && (
                                  <button
                                    className="btn"
                                    onClick={handleInvite}
                                    disabled={
                                      subscriptionInfo.subscriptionstatus === "Cancelled"
                                        ? true
                                        : false
                                    }
                                  >
                                    Invite
                                  </button>
                                )}
                             </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <WrongBrowserDisclaimer />
                <CookieConsentGI2 />
                <Footer />
              </>
            ) : (
              navigate(`/my-account`)
            )}
          </>
        ) : (
          <>
            <ScrollToTop />
            <Navbar />
            <Breadcrumbs />
            <div className="main-container">
              <div className="Users">
                <div className="">
                  <div className="holder">
                    <h2> User Management </h2>
                  </div>
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                </div>
              </div>
            </div>
            <WrongBrowserDisclaimer />
            <CookieConsentGI2 />
            <Footer />
          </>
        )}
      </Suspense>
    </>
  );
};

export default Users;