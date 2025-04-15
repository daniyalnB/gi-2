import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import validator from "validator";
import {
  updateXactProfile,
  sendInvitesCompleteEmail,
} from "../../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../../contexts/appContext";
import info from "assets/Info.svg";
import modalclose from "assets/modal-close.svg";

const ActionableXactimateProfile = (props) => {

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    xactProfileCompanyEmailAddress: "",
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  const [childs, setChilds] = useState([]);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const validation = childs.some((child) => child.xactProfileStatus === "Active" || child.xactProfileStatus === "Pending");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setChilds(myInfo.childs);
      setSubscriptionInfo(myInfo.subscriptioninfo);
      setActionableXactimateProfile({
        xactProfileCompanyEmailAddress: myInfo.ownerinfo.emailaddress,
        xactProfileveriskid: myInfo.xactProfileveriskid ? myInfo.xactProfileveriskid : "",
        xactProfileStatus: myInfo.xactProfileStatus,
      });
    }
  }, [myInfo]);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const state = {
    button: 1,
  };

  const [InviteMessage, setInviteMessage] = useState(false);
  const [InviteMessageLoading, setInviteMessageLoading] = useState(false);

  const handleActionableXactimateProfile = (e) => {
    e.preventDefault();
    if (state.button === 1) {
      handleShow2();
    }
    if (state.button === 2) {
      handleShow1();
    }
  };

  const submitData1 = () => {
    setLoading(true);

    const payload = {
      XactProfileveriskid: ActionableXactimateProfile.xactProfileveriskid,
    };

    const stringified = queryString.stringify(payload);

    updateXactProfile(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        getCustomerInfo();
        setLoading(false);
        handleClose1();
      } else {
        setLoading(false);
        handleClose1();
      }
    });
  };

  const submitData2 = () => {
    setInviteMessageLoading(true);
    sendInvitesCompleteEmail().subscribe((response) => {
      if (response.response.Requested_Action) {
        handleClose2();
        getCustomerInfo();
        setInviteMessage(response.response.Message);
        setInviteMessageLoading(false);
        localStorage.removeItem("stepThree");
      } else {
        handleClose2();
        setInviteMessage(response.response.Message);
        setInviteMessageLoading(false);
      }
    });
  };

  return (
    <>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        className="Cancel_Subscription_Modal"
      >
        <Modal.Header>
          <div className="cancel_subscription_title modal-title h4">
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
          Thank you for submitting your information. Once all licenses on your
          instance have been signed up for this {subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"}, please indicate you
          are ready to turn on the Actionable Profile by clicking the 'Request
          Company Wide Actionable Profile Activation' button.
        </Modal.Body>
        <Modal.Footer>
          {!loading && (
            <button className="btn btn_pm" onClick={submitData1}>
              Proceed
            </button>
          )}
          {loading && (
            <button className="btn btn_pm" disabled>
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal 
        show={show2} 
        onHide={handleClose2}
        backdrop="static" 
        keyboard={false}
        className="Actionable_Xactimate_Profile_Modal"
      >
        <Modal.Header>
          <div 
            className="actionable_xactimate_profile_title modal-title h4"
          > 
            Confirmation
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handleClose2}
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
            onClick={handleClose2}
          >
            I need to add more licenses
          </button>
          {!InviteMessageLoading && (
            <button
              className="btn"
              onClick={submitData2}
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
      <div className="xactimate-data-set">
        <div>
          {/* <h5 className="beta">
            Closed Beta
          </h5>
          <br /> */}
          <span className="h3">Actionable Xactimate Profile</span>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 900 }}
            overlay={
              <Tooltip
                id={
                  ActionableXactimateProfile.xactProfileStatus === "Inactive" ? "xactimate-tooltip-Inactive"
                  : ActionableXactimateProfile.xactProfileStatus === "Pending" ? "xactimate-tooltip-Pending"
                  : "xactimate-tooltip-Active"
                }
              >
                {ActionableXactimateProfile.xactProfileStatus === "Inactive" && (
                  <>
                    Enter the information below to apply for access to the
                    Actionable Xactimate Profile.
                  </>
                )}
                {ActionableXactimateProfile.xactProfileStatus === "Pending" && (
                  <>
                    Your information has been locked in and received. We will
                    reach out to you shortly to either confirm access or prepare
                    you for the next round of participants.
                  </>
                )}
                {ActionableXactimateProfile.xactProfileStatus === "Active" && (
                  <>
                    Active - You currently have access to the Actionable
                    Xactimate Profile. If you need to sync our profile to your
                    Xactimate login, please see this video:{" "}
                    <a
                      href="https://www.youtube.com/watch?v=vb7HKJVTAmA"
                      target="_blank"
                    >
                      Xact Hacks | Logging In To X1 and Syncing Profiles
                    </a>
                  </>
                )}
              </Tooltip>
            }
          >
            <span className={`status_${ActionableXactimateProfile.xactProfileStatus} status`}>
              <p>{ActionableXactimateProfile.xactProfileStatus}</p>
            </span>
          </OverlayTrigger>
          <p>
            Enter your company email address and Xactware/Verisk ID to apply for
            access to the Actionable Xactimate Profile that converts the Insight
            Sheet Database into real-time estimating guidance. With equal
            credence given to both overages and warranted omissions, you can
            finally estimate within a Xactimate Profile that was conceived
            without bias and designed for swift and noble claims settlement.
          </p>
        </div>
        <div className="form-holder">
          <form onSubmit={handleActionableXactimateProfile}>
            <div className="row">
              <div className="col-12">
                <div className="upInputs form-group nogroup">
                  <input
                    type="email"
                    name="xactProfileCompanyEmailAddress"
                    placeholder=" "
                    required
                    readOnly={true}
                    value={ActionableXactimateProfile.xactProfileCompanyEmailAddress}
                    style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ?
                      {
                        border: "1px solid #B8B8B8",
                        background: "#F2F2F2",
                      } : {}
                    }
                    // onChange={(e) =>
                    //   setActionableXactimateProfile({
                    //     ...ActionableXactimateProfile,
                    //     xactProfileCompanyEmailAddress: e.currentTarget.value,
                    //   })
                    // }
                  />
                  <label
                    className="upLabel"
                    style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ?
                      {
                        color: "#B8B8B8",
                      } : {}
                    }
                  >
                    Company Email Address
                  </label>
                  <div className="info">
                    <img src={info} />
                    <span> Ex. john.doe@yourcompany.com </span>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="upInputs form-group nogroup">
                  <input
                    type="text"
                    name="xactProfileveriskid"
                    placeholder=" "
                    required
                    // readOnly={ActionableXactimateProfile.xactProfileStatus === "Inactive" ? false : true}
                    value={ActionableXactimateProfile.xactProfileveriskid}
                    // style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ?
                    //   {
                    //     border: "1px solid #B8B8B8",
                    //     background: "#F2F2F2",
                    //   } : {}
                    // }
                    onChange={(e) =>
                      setActionableXactimateProfile({
                        ...ActionableXactimateProfile,
                        xactProfileveriskid: e.currentTarget.value,
                      })
                    }
                  />
                  <label
                    className="upLabel"
                    // style={ActionableXactimateProfile.xactProfileStatus == "Pending" || ActionableXactimateProfile.xactProfileStatus == "Active" ?
                    //   {
                    //     color: "#B8B8B8",
                    //   } : {}
                    // }
                  >
                    Xactware/Verisk ID
                  </label>
                  <div className="info">
                    <img src={info} />
                    <span> Ex. The email address they use to log in to Xactimate </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-link">
              Your company email and Xactware/Verisk ID are likely the same. If
              so, please enter the same email address in both fields above.
            </div>
            <div className="row mt-5">
              {myInfo.ischilduser ? (
                ""
              ) : (
                <>
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
                          <div className="Actionable_Profile_Activation_PendingCancellation">
                            Request Company Wide Actionable Profile Activation
                          </div>
                        </OverlayTrigger>
                      ) : (
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 900 }}
                          overlay={
                            <Tooltip id="xactimate-tooltip-Actionable-Profile-Activation">
                              Request company-wide activation after you have successfully added your team members to your account.
                              After clicking this button, your Actionable Insights Account Manager will work with Verisk to activate the Actionable Profile for your instance.
                            </Tooltip>
                          }
                        >
                          <button
                            className="btn Actionable_Profile_Activation"
                            type="submit"
                            disabled={
                              ActionableXactimateProfile.xactProfileveriskid && (ActionableXactimateProfile.xactProfileStatus === "Active" || ActionableXactimateProfile.xactProfileStatus === "Pending" || validation)
                              ? false
                              : true
                            }
                            onClick={() => (state.button = 1)}
                          >
                            Request Company Wide Actionable Profile Activation
                          </button>
                        </OverlayTrigger>
                      )}
                    </div>
                  )}
                </>
              )}
              {/* {ActionableXactimateProfile.xactProfileStatus === "Inactive" && ( */}
                <>
                  {myInfo.ischilduser ? (
                    <div className="text-right col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <button
                        className="btn"
                        type="submit"
                        disabled={ActionableXactimateProfile.xactProfileveriskid == "" ? true : false}
                        onClick={() => (state.button = 2)}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div className="text-right col-xl-4 col-lg-4 col-md-6 col-sm-12">
                      <button
                        className="btn"
                        type="submit"
                        disabled={ActionableXactimateProfile.xactProfileveriskid == "" ? true : false}
                        onClick={() => (state.button = 2)}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </>
              {/* )} */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default withRouter(ActionableXactimateProfile);