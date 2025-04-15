import React, { useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import queryString from "query-string";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { AppContext } from "../../../../contexts/appContext";
import { 
  removeChildAccount,
  updateInvitedUser,
  sendInvitesCompleteEmail,
  RemoveCustomerAcountAliasCustomer,
} from "utils/api-routes/api-routes.util";
import image from "assets/user-eyes.svg";
import trash from "assets/del.svg";
import edit from "assets/edit-role-customer.svg";
import save from "assets/save-role-customer.svg";
import alert from "assets/Alert.svg";
import modalclose from "assets/modal-close.svg";
import search2 from "assets/search2.png";

const FormElementCollaborator = (props) => {

  const { getMyInvitedUser, getMyCoAdmin } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const checkHubspot = () => {
    const htmlButton = document.querySelector(`input[type="submit"][value="Remove"]`);
    if (htmlButton) {
      htmlButton.click();
    }
    console.log(htmlButton, "htmlButton")
  };

  const deleteCollaborator = () => {
    setLoading(true);

    const payload = {
			toRemove: props.toRemove,
		};

    const stringified = queryString.stringify(payload);

    removeChildAccount(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        getMyInvitedUser();
        getMyCoAdmin();
        props.handlecardclose1();
      }
      else {
        setErr(response.response.Message);
        setLoading(false);
      }
    });
  };

	useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org") {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "99e4b6a2-deb4-4e82-8ef9-662fa57f0ff3",
            target: "#hubspotForm",
            onFormReady: function($form){
              $('input[id="email-99e4b6a2-deb4-4e82-8ef9-662fa57f0ff3"]').val(`${props.owner.emailaddress}`).change();
            },
            onFormSubmit: function($form) {
              deleteCollaborator();
            },
          });
        }
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "9e4422d1-ec47-409e-a47a-3b8a79148065",
            target: "#hubspotForm",
            onFormReady: function($form){
              $('input[id="email-9e4422d1-ec47-409e-a47a-3b8a79148065"]').val(`${props.owner.emailaddress}`).change();
            },
            onFormSubmit: function($form) {
              deleteCollaborator();
            },
          });
        }
      });
    }
  }, []);

  return (
    <>
      <div className="body-sec">
        <div className="row text-left">
          <div className="col-12">
            <div id="hubspotForm"></div>
          </div>
          <div className="col-12">
            <p>
              <strong>Disclaimer:</strong> This is a voluntary, recurring payment for the Actionable Insights {props.subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : props.subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : props.subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"}.
              If the ‘parent’ user chooses to cancel the subscription, there are no refunds.
              Your subscription will automatically continue unless you change it.
            </p>
          </div>
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
          className="btn-outline mr-3"
          onClick={() => props.handlecardclose1()}
        >
          <span> Cancel </span>
        </button>
        {!loading && ( 
          <button 
            className="btn"
            onClick={checkHubspot}
          >
            <span> Remove </span>
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
    </>
  );
};

const FormElementCoAdmin = (props) => {

  const { getMyInvitedUser, getMyCoAdmin } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const checkHubspot = () => {
    const htmlButton = document.querySelector(`input[type="submit"][value="Remove"]`);
    if (htmlButton) {
      htmlButton.click();
    }
    console.log(htmlButton, "htmlButton")
  };

  const deleteCoAdmin = () => {
    setLoading(true);

    const payload = {
			emailaddress: props.emailaddress,
		};

    const stringified = queryString.stringify(payload);

    RemoveCustomerAcountAliasCustomer(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        getMyInvitedUser();
        getMyCoAdmin();
        props.handlecardclose2();
      }
      else {
        setErr(response.response.Message);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (window.location.hostname === "localhost" || window.location.hostname === "reactdev.getinsights.org") {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "99e4b6a2-deb4-4e82-8ef9-662fa57f0ff3",
            target: "#hubspotForm",
            onFormReady: function($form){
              $('input[id="email-99e4b6a2-deb4-4e82-8ef9-662fa57f0ff3"]').val(`${props.owner.emailaddress}`).change();
            },
            onFormSubmit: function($form) {
              deleteCoAdmin();
            },
          });
        }
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      
      script.addEventListener("load", () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
            portalId: "3936526",
            formId: "9e4422d1-ec47-409e-a47a-3b8a79148065",
            target: "#hubspotForm",
            onFormReady: function($form){
              $('input[id="email-9e4422d1-ec47-409e-a47a-3b8a79148065"]').val(`${props.owner.emailaddress}`).change();
            },
            onFormSubmit: function($form) {
              deleteCoAdmin();
            },
          });
        }
      });
    }
  }, []);

  return (
    <>
      <div className="body-sec">
        <div className="row text-left">
          <div className="col-12">
            <div id="hubspotForm"></div>
          </div>
          <div className="col-12">
            <p>
              <strong>Disclaimer:</strong> Deleting a Co-Admin from your account will remove their ability to manage your company account.
              If you have additional questions or would like to add an alternate Co-Admin, please reach out to your Account Manager.
            </p>
          </div>
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
          className="btn-outline mr-3"
          onClick={() => props.handlecardclose2()}
        >
          <span> Cancel </span>
        </button>
        {!loading && ( 
          <button 
            className="btn"
            onClick={checkHubspot}
          >
            <span> Remove </span>
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
    </>
  );
};

const ActiveUsers = (props) => {

  const { getCustomerInfo, myInfo, getMyInvitedUser, invitedUsers, getMyCoAdmin, coAdmins } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
    getMyInvitedUser();
    getMyCoAdmin();
  }, []);

  const [toRemove, setEmail] = useState("");

  const [cardpopupshow1, setcardpopupshow1] = useState(false);
  const handlecardclose1 = () => setcardpopupshow1(false);
  const handlecardshow1 = () => setcardpopupshow1(true);

  const [emailaddress, setEmailaddress] = useState("");

  const [cardpopupshow2, setcardpopupshow2] = useState(false);
  const handlecardclose2 = () => setcardpopupshow2(false);
  const handlecardshow2 = () => setcardpopupshow2(true);

  const [id, setId] = useState("");
  const [editRole, setEditRole] = useState(false);

  const [formDetails, setFormDetails] = useState({
    alreadyinvited: "",
    useparentspaymentmethod: false,
    branch: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

		const payload = {
			alreadyinvited: formDetails.alreadyinvited,
      useparentspaymentmethod: formDetails.useparentspaymentmethod,
      branch: formDetails.branch,
		};

		const stringified = queryString.stringify(payload);

    updateInvitedUser(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setFormDetails({
          alreadyinvited: "",
          useparentspaymentmethod: false,
          branch: "",
        });
        getMyInvitedUser();
        setSearchField("");
      }
    });
  };

  const [owner, setOwner] = useState(false);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    xactProfileCompanyEmailAddress: "",
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  useEffect(() => {
    if (myInfo) {
      setOwner(myInfo.ownerinfo);
      setSubscriptionInfo(myInfo.subscriptioninfo);
      setActionableXactimateProfile({
        xactProfileCompanyEmailAddress: myInfo.ownerinfo.emailaddress,
        xactProfileveriskid: myInfo.xactProfileveriskid,
        xactProfileStatus: myInfo.xactProfileStatus,
      });
    }
  }, [myInfo]);

  const [childs, setChilds] = useState([]);

  const validation = childs.some(child => child.xactProfileStatus === "Active" || child.xactProfileStatus === "Pending");

  const [mergeChilds, setMergeChilds] = useState([]);

  const [searchField, setSearchField] = useState("");
  const [searchResults, setSearchResults]= useState([]);

  useEffect(() => {
    if (invitedUsers && coAdmins) {
      const x = coAdmins.map((val) => ({
        emailaddress: val,
        role: "ProfessionalPlanCoAdmin",
      }));
      const y = invitedUsers.map((val) => ({
        childuserid: val.childuserid,
        role: val.role,
        useparentspaymentmethod: val.useparentspaymentmethod,
        branch: val.user.branch,
        emailaddress: val.user.emailaddress,
        firstname: val.user.firstname,
        lastname: val.user.lastname,
        xactProfileStatus: val.xactProfileStatus,
        xactProfileveriskid: val.xactProfileveriskid,
      }));
      setChilds(y);
      const z = [...y, ...x]; 
      setSearchResults(z);
      setMergeChilds(z);
    }
  }, [invitedUsers, coAdmins]);

  const searchHandler = (value) => {
    setSearchField(value);
    const filterdData = mergeChilds.filter(val =>
      val.emailaddress.toLowerCase().includes(value.replace(/ /g,"").toLowerCase())
    )
    setSearchResults(filterdData);
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [InviteMessage, setInviteMessage] = useState(false);
  const [InviteMessageLoading, setInviteMessageLoading] = useState(false);

  const handleActionableXactimateProfile = (e) => {
    e.preventDefault();
    handleShow1();
  };

  const submitData1 = () => {
    setInviteMessageLoading(true);
    sendInvitesCompleteEmail().subscribe((response) => {
      if (response.response.Requested_Action) {
        handleClose1();
        setInviteMessage(response.response.Message);
        setInviteMessageLoading(false);
        localStorage.removeItem("stepThree");
      } else {
        handleClose1();
        setInviteMessage(response.response.Message);
        setInviteMessageLoading(false);
      }
    });
  };

  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      <Modal 
        show={cardpopupshow1} 
        onHide={handlecardclose1}
        backdrop="static" 
        keyboard={false}
        className="Remove_Sub_User_Modal"
      >
        <Modal.Header>
          <div className="remove_sub_user_title modal-title h4"> 
            Remove Sub-User
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose1}
          >
            <img src={modalclose} />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementCollaborator
            handlecardclose1={handlecardclose1}
            toRemove={toRemove}
            subscriptionInfo={subscriptionInfo}
            owner={owner}
          ></FormElementCollaborator>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow2} 
        onHide={handlecardclose2}
        backdrop="static" 
        keyboard={false}
        className="Remove_Sub_User_Modal"
      >
        <Modal.Header>
          <div className="remove_sub_user_title modal-title h4"> 
            Remove Sub-User
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose2}
          >
            <img src={modalclose} />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementCoAdmin
            handlecardclose2={handlecardclose2}
            emailaddress={emailaddress}
            owner={owner}
          ></FormElementCoAdmin>
        </Modal.Body>
      </Modal>
      <Modal 
        show={show1} 
        onHide={handleClose1}
        backdrop="static" 
        keyboard={false}
        className="Actionable_Xactimate_Profile_Modal"
      >
        <Modal.Header>
          <div className="actionable_xactimate_profile_title modal-title h4"> 
            Confirmation
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
          Each Xactimate license at your company needs to be added to your {subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} subscription.
          Add as many people to your {subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} as Xactimate licenses you have.
          Once all Xactimate licenses are entered, we will verify that information and then enable Actionable Profile access.
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn" 
            onClick={handleClose1}
          >
            I need to add more licenses
          </button>
          {!InviteMessageLoading && (
            <button
              className="btn"
              onClick={submitData1}
            >
              All licenses have been added
            </button>
          )}
          {InviteMessageLoading && (
            <button
              className="btn"
              disabled
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="col-xl-8 col-lg-8 col-md 12">
        <div className="main-search mt-3">
          <div className="form-group nogroup">
            <div className="input-group">
              <input
                type="text" 
                className="form-control" 
                placeholder="Search"
                value={searchField}
                onChange={(e) => searchHandler(e.target.value)}
              />
              <img
                className="input_icon"
                src={search2}
                alt="search2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {InviteMessage ? (
            <div className="text-left col-xl-8 col-lg-8 col-md-6 col-sm-12">
              <div className="Invite-Message">
                <h5> {InviteMessage} </h5>
              </div>
            </div>
          ) : (
            <div className="text-left col-xl-8 col-lg-8 col-md-6 col-sm-12">
              {subscriptionInfo.subscriptionstatus === "PendingCancellation" ? (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 900 }}
                  overlay={
                    <Tooltip id="xactimate-tooltip-Actionable-Profile-Activation-PendingCancellation">
                      Oops! It looks like your {subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} is pending cancelation.
                      You must have an active {subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} to use the Actionable Profile.
                      Renew your {subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} to request company-wide Actionable Profile activation.
                    </Tooltip>
                  }
                >
                  <div
                    className="Actionable_Profile_Activation_PendingCancellation"
                  >
                    Request Company Wide Actionable Profile Activation
                  </div>
                </OverlayTrigger>
              ) : (
                <>
                  {(props.location.state && props.location.state.step === "three" &&
                    <div
                      style={showPopup ? { display: "block" } : { display: "none" }}
                      className="step-3-tooltip"
                    >
                      <p>
                        Click on this button to
                        <br />
                        Request Company Wide
                        <br />
                        Actionable Profile Activation
                      </p>
                      <div
                        className="cross_icon"
                        onClick={() => setShowPopup(!showPopup)}
                      >
                        &times;
                      </div>
                    </div>
                  )}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 900 }}
                    overlay={(
                      <Tooltip id="xactimate-tooltip-Actionable-Profile-Activation">
                        Request company-wide activation after you have successfully added your team members to your account.
                        After clicking this button, your Actionable Insights Account Manager will work with Verisk to activate the Actionable Profile for your instance.
                      </Tooltip>
                    )}
                  >
                    <button 
                      className="btn Actionable_Profile_Activation"
                      type="submit"
                      disabled={
                        ActionableXactimateProfile.xactProfileveriskid && ((ActionableXactimateProfile.xactProfileStatus === "Active" || ActionableXactimateProfile.xactProfileStatus === "Pending") || validation)
                        ? false
                        : true
                      }
                      onClick={handleActionableXactimateProfile}
                    >
                      Request Company Wide Actionable Profile Activation
                    </button>
                  </OverlayTrigger>
                </>
              )}
            </div>
          )}
        </div>
        <div className="sec-1">
          <div className="users">
            <div className="user">
              <div className="row align-items-center pb-2 pt-2">
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 align-items-center" style={{ paddingRight: "0px" }}>
                  <div className="row" style={{ flexWrap: "inherit" }}>
                    <div className="user-image-sec">
                      <div className="user-image">
                        <img
                          src={image}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="user-data-sec">
                      <div className="user-data">
                        <h4 className="name"> 
                          {owner.firstname + " " + owner.lastname} 
                        </h4>
                        <h4 className="email"> 
                          {owner.emailaddress}  
                        </h4>
                        <h4 className="role"> 
                          Owner
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            {searchField == "" ? (
              mergeChilds.map((user) => (
                <div className="user">
                  <div className="row align-items-center pb-2 pt-2">
                    <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 align-items-center" style={{ paddingRight: "0px" }}>
                      <div className="row" style={{ flexWrap: "inherit" }}>
                        <div className="user-image-sec">
                          <div className="user-image">
                            <img
                              src={image}
                              alt="image"
                            />
                          </div>
                        </div>
                        <div className="user-data-sec">
                          <div className="user-data">
                            {user.role == "ProfessionalPlanChild" && (
                              <h4 className="name">
                                {user.firstname + " " + user.lastname} 
                              </h4>
                            )}
                            <h4 className="email"> 
                              {user.emailaddress} 
                            </h4>
                            {editRole && user.emailaddress == id ? (
                              <>
                                <div className="row">
                                  <div className="child-role">
                                    <select
                                      className="form-control"
                                      onChange={(e) =>
                                        setFormDetails({
                                          ...formDetails,
                                          role: e.currentTarget.value,
                                        })
                                      }
                                    >
                                      {/* <option
                                        selected={user.role === "ProfessionalPlanCoAdmin"}
                                      >
                                        Co-Admin
                                      </option> */}
                                      <option
                                        selected={user.role === "ProfessionalPlanChild"}
                                      >
                                        Collaborator
                                      </option>
                                    </select>
                                  </div>
                                  <div className="useparentspaymentmethod-checkbox">
                                    <ul>
                                      <li>
                                        <label htmlFor="c1">
                                          <input
                                            id="c1"
                                            type="checkbox"
                                            checked={formDetails.useparentspaymentmethod}
                                          />
                                          <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={(
                                              <Tooltip id="checkbox-tooltip">
                                                Check this box if you would like this Collaborator to have the ability to use the Administrator card on file for additional tools, resources, and courses.
                                                <br /><br />
                                                Leave this box unchecked if you would not like this Collaborator to have access to the Administrator card on file.
                                                All additional purchases would require the Collaborator to add their own card on file.
                                              </Tooltip>
                                            )}
                                          >
                                            <span
                                              onClick={() => 
                                                setFormDetails({
                                                  ...formDetails,
                                                  useparentspaymentmethod: !formDetails.useparentspaymentmethod,
                                                })
                                              }
                                            >
                                            </span>
                                          </OverlayTrigger>
                                          <span
                                            onClick={() => 
                                              setFormDetails({
                                                ...formDetails,
                                                useparentspaymentmethod: !formDetails.useparentspaymentmethod,
                                              })
                                            }
                                          >
                                            Use Admin card on file for their purchases
                                          </span>
                                        </label>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="branch-location">
                                    <div className="form-group">
                                      <label> Branch/Location: </label>
                                      <input
                                        type="text"
                                        name="branch"
                                        className="form-control"
                                        placeholder=""
                                        value={formDetails.branch}
                                        onChange={(e) =>
                                          setFormDetails({
                                            ...formDetails,
                                            branch: e.currentTarget.value,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                  
                                </div>
                              </>
                            ) : (
                              <>
                                <h4 className="role"> 
                                  Role: {user.role == "ProfessionalPlanCoAdmin" ? "Co-Admin" : user.role === "ProfessionalPlanChild" ? "Collaborator" : "Owner"}
                                </h4>
                                {user.role == "ProfessionalPlanChild" && (
                                  <h4 className="card_on_file"> 
                                    Use Admin card on file for their purchases: {user.useparentspaymentmethod ? "Enabled" : "Disabled"}
                                  </h4>
                                )}
                                {user.role == "ProfessionalPlanChild" && (
                                  <h4 className="card_on_file"> 
                                    Branch/Location: {user.branch ? user.branch : "N/A"}
                                  </h4>
                                )}
                                {user.role === "Owner" || user.emailaddress === localStorage.getItem("loggedInCustomerEmail") ? (
                                  ""
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                            {user.role == "ProfessionalPlanChild" && (
                              <Link
                                style={editRole && user.emailaddress == id ? { marginTop: "5px" } : { margin: "0px" }}
                                to={`/users/actionable-xactimate-profile/${user.childuserid}`}
                              >
                                Actionable Xactimate Profile
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 text-right">
                      {user.role == "ProfessionalPlanChild" && (
                        <>
                          {editRole && user.emailaddress == id ? (
                            <div className="del-edit-save-image">
                              <img
                                className="save-image"
                                src={save}
                                onClick={(e) => {
                                  handleSubmit(e);
                                  setEditRole(false);
                                }}
                              />
                            </div>
                          ) : (
                            <div className="del-edit-save-image">
                              <img 
                                className="edit-image"
                                src={edit}
                                onClick={() => {
                                  setEditRole(true);
                                  setId(user.emailaddress);
                                  setFormDetails({
                                    ...formDetails,
                                    alreadyinvited: user.emailaddress,
                                    useparentspaymentmethod: user.useparentspaymentmethod,
                                    branch: user.branch,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </>
                      )}
                      {user.role === "Owner" || user.emailaddress === localStorage.getItem("loggedInCustomerEmail") ? (
                        ""
                      ) : (
                        <>
                          {user.role == "ProfessionalPlanChild" && (
                            <div className="del-edit-save-image">
                              <img
                                className={editRole && user.emailaddress == id ? "del-image-save" : "del-image"}
                                src={trash}
                                onClick={() => {
                                  handlecardshow1();
                                  setEmail(user.emailaddress);
                                }}
                              />
                            </div>
                          )}
                          {user.role == "ProfessionalPlanCoAdmin" && (
                            <div className="del-edit-save-image">
                              <img
                                className={editRole && user.emailaddress == id ? "del-image-save" : "del-image"}
                                src={trash}
                                onClick={() => {
                                  handlecardshow2();
                                  setEmailaddress(user.emailaddress);
                                }}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <>
                {searchResults.length > 0 ? (
                  searchResults.map((user) => (
                    <div className="user">
                      <div className="row align-items-center pb-2 pt-2">
                        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9 align-items-center" style={{ paddingRight: "0px" }}>
                          <div className="row" style={{ flexWrap: "inherit" }}>
                            <div className="user-image-sec">
                              <div className="user-image">
                                <img
                                  src={image}
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="user-data-sec">
                              <div className="user-data">
                                {user.role == "ProfessionalPlanChild" && (
                                  <h4 className="name">
                                    {user.firstname + " " + user.lastname} 
                                  </h4>
                                )}
                                <h4 className="email"> 
                                  {user.emailaddress} 
                                </h4>
                                {editRole && user.emailaddress == id ? (
                                  <>
                                    <div className="row">
                                      <div className="child-role">
                                        <select
                                          className="form-control"
                                          onChange={(e) =>
                                            setFormDetails({
                                              ...formDetails,
                                              role: e.currentTarget.value,
                                            })
                                          }
                                        >
                                          {/* <option
                                            selected={user.role === "ProfessionalPlanCoAdmin"}
                                          >
                                            Co-Admin
                                          </option> */}
                                          <option
                                            selected={user.role === "ProfessionalPlanChild"}
                                          >
                                            Collaborator
                                          </option>
                                        </select>
                                      </div>
                                      <div className="useparentspaymentmethod-checkbox">
                                        <ul>
                                          <li>
                                            <label htmlFor="c1">
                                              <input
                                                id="c1"
                                                type="checkbox"
                                                checked={formDetails.useparentspaymentmethod}
                                              />
                                              <OverlayTrigger
                                                placement="bottom"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={(
                                                  <Tooltip id="checkbox-tooltip">
                                                    Check this box if you would like this Collaborator to have the ability to use the Administrator card on file for additional tools, resources, and courses.
                                                    <br /><br />
                                                    Leave this box unchecked if you would not like this Collaborator to have access to the Administrator card on file.
                                                    All additional purchases would require the Collaborator to add their own card on file.
                                                  </Tooltip>
                                                )}
                                              >
                                                <span
                                                  onClick={() => 
                                                    setFormDetails({
                                                      ...formDetails,
                                                      useparentspaymentmethod: !formDetails.useparentspaymentmethod,
                                                    })
                                                  }
                                                >
                                                </span>
                                              </OverlayTrigger>
                                              <span
                                                onClick={() => 
                                                  setFormDetails({
                                                    ...formDetails,
                                                    useparentspaymentmethod: !formDetails.useparentspaymentmethod,
                                                  })
                                                }
                                              >
                                                Use Admin card on file for their purchases
                                              </span>
                                            </label>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <h4 className="role"> 
                                      Role: {user.role == "ProfessionalPlanCoAdmin" ? "Co-Admin" : user.role === "ProfessionalPlanChild" ? "Collaborator" : "Owner"}
                                    </h4>
                                    {user.role == "ProfessionalPlanChild" && (
                                      <h4 className="card_on_file"> 
                                        Use Admin card on file for their purchases: {user.useparentspaymentmethod ? "Enabled" : "Disabled"}
                                      </h4>
                                    )}
                                    {user.role === "Owner" || user.emailaddress === localStorage.getItem("loggedInCustomerEmail") ? (
                                      ""
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                                {user.role == "ProfessionalPlanChild" && (
                                  <Link
                                    style={editRole && user.emailaddress == id ? { marginTop: "5px" } : { margin: "0px" }}
                                    to={`/users/actionable-xactimate-profile/${user.childuserid}`}
                                  >
                                    Actionable Xactimate Profile
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 text-right">
                          {user.role == "ProfessionalPlanChild" && (
                            <>
                              {editRole && user.emailaddress == id ? (
                                <div className="del-edit-save-image">
                                  <img
                                    className="save-image"
                                    src={save}
                                    onClick={(e) => {
                                      handleSubmit(e);
                                      setEditRole(false);
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="del-edit-save-image">
                                  <img 
                                    className="edit-image"
                                    src={edit}
                                    onClick={() => {
                                      setEditRole(true);
                                      setId(user.emailaddress);
                                      setFormDetails({
                                        ...formDetails,
                                        alreadyinvited: user.emailaddress,
                                        useparentspaymentmethod: user.useparentspaymentmethod,
                                      });
                                    }}
                                  />
                                </div>
                              )}
                            </>
                          )}
                          {user.role === "Owner" || user.emailaddress === localStorage.getItem("loggedInCustomerEmail") ? (
                            ""
                          ) : (
                            <>
                              {user.role == "ProfessionalPlanChild" && (
                                <div className="del-edit-save-image">
                                  <img
                                    className={editRole && user.emailaddress == id ? "del-image-save" : "del-image"}
                                    src={trash}
                                    onClick={() => {
                                      handlecardshow1();
                                      setEmail(user.emailaddress);
                                    }}
                                  />
                                </div>
                              )}
                              {user.role == "ProfessionalPlanCoAdmin" && (
                                <div className="del-edit-save-image">
                                  <img
                                    className={editRole && user.emailaddress == id ? "del-image-save" : "del-image"}
                                    src={trash}
                                    onClick={() => {
                                      handlecardshow2();
                                      setEmailaddress(user.emailaddress);
                                    }}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      textAlign: "center",
                      margin: "20px auto",
                    }}
                  >
                    No matching records found
                  </h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ActiveUsers);