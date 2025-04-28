import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../contexts/appContext";

const PlanAndCertification = (props) => {
  console.log(props, "p")

  const { getCustomerInfo, myInfo, getMyInvitedUser, invitedUsers, getMyCoAdmin, coAdmins, getMyEncryptedDataFunction, encryptedData } = useContext(AppContext);

  useEffect(() => {
    getCustomerInfo();
    getMyInvitedUser();
    getMyCoAdmin();
    getMyEncryptedDataFunction();
  }, []);

  const [planInfo, setPlanInfo] = useState(false);

  const [certificationsInfo, setCertificationsInfo] = useState(props.certificationsInfo.cerstatus);

  const [ownerInfo, setOwnerInfo] = useState(false);

  const [EncryptedData, setEncryptedData] = useState(false);

  useEffect(() => {
    if (myInfo) {
      setPlanInfo(myInfo.subscriptioninfo);
      setOwnerInfo(myInfo.ownerinfo);
      setEncryptedData(encryptedData);
    }
  }, [myInfo]);

  const ssoauth = () => {
    const host =  window.location.host;
    const LMS_KEY = "mXu8EfYLQVgh8n3iEH6zFl97UPfNwwUf";
    const LMS_SECRET = "PRVfWX16FziQkMcdsAKHfeX9WyZJhW49";
    const url = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "http://dev.actionableacademy.org" : "https://actionableacademy.org"}`
    const endpoint = `${url}/sso?secret=${LMS_SECRET}&key=${LMS_KEY}&identifier=${ownerInfo.emailaddress}&data=${EncryptedData}`;
    window.open(endpoint, "_blank");
  }

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  return (
  	<>
      <div className="plan-and-certification">
        <div className="row plan-actionable-section">
          <div className="col-7">
            <h3 className="plan"> Plan </h3>
          </div>
        	<div className="col-5 text-right">
            <Link
              className="review-plans"
              to="/plan-matrix"
            >
              Review Plans
            </Link>
          </div>
        </div>
        <div className="active-plan">
          <div className="row">
            <div className="col-6">
              <h3 className="plan">
                {(planInfo.subscriptionstatus === "Cancelled" || planInfo.subscriptionstatus === "TrialCancelled" || planInfo.subscriptionstatus === "NoActivePlan") ? (
                  "No Active Plan"
                ) : (
                  <>
                    {
                      planInfo.planname === "StandardPlan" ? "Legacy Standard Plan" :
                      planInfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                      planInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                      planInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                      planInfo.planname === "StandardPlanAnnual" ? "Legacy Standard Plan" :
                      planInfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                      planInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                      planInfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" : ""
                    }{" "}
                  </>
                )}
                {planInfo.planname === "ProfessionalPlan" || planInfo.planname === "ProfessionalPlanAnnual" || planInfo.planname === "EnterprisePlan" || planInfo.planname === "EnterprisePlanAnnual" ?
                  (planInfo.subscriptionstatus === "Active" ||
                  planInfo.subscriptionstatus === "PendingCancellation" ||
                  planInfo.subscriptionstatus === "Paused" ||
                  planInfo.subscriptionstatus === "PausedDueToPaymentFailure") &&
                  invitedUsers && (
                  <>
                    (
                      {invitedUsers.length == 0 && coAdmins.length == 0 ? 1 : invitedUsers.length + 1 + coAdmins.length}{" "}
                      {invitedUsers.length == 0 && coAdmins.length == 0 ? "User" : "Users"}
                    )
                  </>
                ) : (
                  ""
                )}
              </h3>
              {planInfo.subscriptionstatus === "Cancelled" && (invitedUsers.length !== 0 || coAdmins.length == 0) ? (
                <Link
                  className="manage-users"
                  to="/users"
                >
                  Manage Users
                </Link>
              ) : planInfo.planname === "ProfessionalPlan" || planInfo.planname === "ProfessionalPlanAnnual" || planInfo.planname === "EnterprisePlan" || planInfo.planname === "EnterprisePlanAnnual" ? (
                <Link
                  className="manage-users"
                  to="/users"
                >
                  Manage Users
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="col-6" style={{ paddingLeft: "0px" }}>
              <h3 className={`${planInfo.subscriptionstatus}`}>
                {(planInfo.subscriptionstatus === "Cancelled" || planInfo.subscriptionstatus === "TrialCancelled" || planInfo.subscriptionstatus === "NoActivePlan") ? (
                  ""
                ) : (
                  <>
                    {planInfo.subscriptionstatus === "PausedDueToPaymentFailure" ? "Paused" :
                    planInfo.subscriptionstatus === "PendingCancellation" ? "Pending Cancellation" : planInfo.subscriptionstatus}
                  </>
                )}
              </h3>
            </div>
          </div>
        </div>
        <hr />
        <div className="row plan-actionable-section">
          <div className="col-7">
            <h3 className="plan"> Actionable Insights Academy </h3>
          </div>
          <div className="col-5 text-right">
          	<button
              className="review-plans"
              onClick={ssoauth}
            > 
              Go to Academy
            </button>
          </div>
        </div>
        {certificationsInfo.length != 0 ? (
          <>
            {certificationsInfo.map((val) => {
              return (
                <div className="active-plan">
                  <div className="row">
                    <div className="col-6">
                      <h3 className="plan"> {val.certificationtitle} </h3>
                    </div>
                    <div className="col-6 text-right">
                      {val.status == 3 && (
                        <Link
                          className="d-inline-block"
                          to="/download-certificate"
                        >
                          View details
                        </Link>
                      )}
                      <h3
                        className={
                          val.status == 0 ? "Active d-inline-block" :
                          val.status == 1 ? "Active d-inline-block" :
                          val.status == 2 ? "Cancelled d-inline-block" :
                          val.status == 3 ? "Active d-inline-block" :
                          val.status == 5 ? "Cancelled d-inline-block" :
                          val.status == 6 ? "Cancelled d-inline-block" :
                          val.status == 7 ? "Cancelled d-inline-block" : "Cancelled d-inline-block"
                        }
                      >
                        {
                          val.status == 0 ? "In Progress" :
                          val.status == 1 ? "Awaiting Exam" :
                          val.status == 2 ? "Failed" :
                          val.status == 3 ? "Active" :
                          val.status == 5 ? "Withdrawn - In Progress" :
                          val.status == 6 ? "Withdrawn - Awaiting Challenge" :
                          val.status == 7 ? "Withdrawn - Failed" : "In Active"
                        }
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })} 
          </>
        ) : (
          <div className="no-certification">
            <h5> You are not currently registered for any certification courses! </h5>
          </div>
        )}
      </div>
    </>
  );
};
  
export default PlanAndCertification;