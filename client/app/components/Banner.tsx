import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ls from "localstorage-slim";
import { AppContext } from "../../contexts/appContext";

const Banner = (props) => {

  const { getCustomerInfo, myInfo, getOnTrial, onTrial } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

  const [days, setDays] = useState("");

  const [isTrial, setIsTrial] = useState(false);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

  useEffect(() => {
    if (myInfo) {
      setDays(myInfo.subscriptioninfo.trialdaysremaining);
      setIsTrial(myInfo.ischilduser ? false : myInfo.subscriptioninfo.subscriptionstatus === "Trial" ? true : false);
      setSubscriptionInfo(myInfo.subscriptioninfo);
      setActionableXactimateProfile({
        xactProfileveriskid: myInfo.xactProfileveriskid ? myInfo.xactProfileveriskid : "",
        xactProfileStatus: myInfo.xactProfileStatus,
      });
    }
  }, [myInfo]);

  const [hidePaused, setHidePaused] = useState(false);

  const setExpiryForPaused = () => {
    ls.set("subscriptionstatus", "Paused", { ttl: 604800 });
  };

  useEffect(() => {
    if (localStorage.getItem("subscriptionstatus")) {
      setHidePaused(true);
    } else {
      setHidePaused(false);
    }
  }, []);

  const [hideAnnual, setHideAnnual] = useState(false);

  const setExpiryForSwitchToAnnual = () => {
    ls.set("SwitchToAnnual", "True", { ttl: 604800 });
  };

  useEffect(() => {
    if (localStorage.getItem("SwitchToAnnual")) {
      setHideAnnual(true);
    } else {
      setHideAnnual(false);
    }
  }, []);

  useEffect(() => {
    ls.get("subscriptionstatus");
    ls.get("SwitchToAnnual");
  }, []);
  
	return (
		<>
      {/* {isTrial && (
        <>
          {onTrial ? (
            <div className="TrialBanner">
              <div className="left">
                You have {days} days left in your trial period.{" "}
                <Link to="/plan-matrix">Sign Up for a Plan Today</Link>
              </div>
              <div className="right">
                <a
                  href="https://getinsights2-data.s3.amazonaws.com/Ultimate_Guide_to_AI_Resources.pdf"
                  target="_blank"
                >
                  Download The Ultimate Guide To Our Resources Now!
                </a>
                <span onClick={getOnTrial}>x</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )} */}
      {subscriptionInfo.subscriptionstatus === "Paused" || subscriptionInfo.subscriptionstatus === "PausedDueToPaymentFailure" ? (
        <>
          {!hidePaused && (
            <div className="TrialBanner" style={{ flexWrap: "initial" }}>
              <div className="left">
                Your subscription is paused,{" "}
                <Link
                  to={{
                    pathname: "/my-account",
                    state: {
                      subscription: true,
                      plan: `${subscriptionInfo.planname}`,
                      ActionableXactimateProfile: {ActionableXactimateProfile},
                    }
                  }}
                >
                  renew your subscription today
                </Link>.
              </div>
              <div className="right">
                <span
                  onClick={() => {
                    setHidePaused(true);
                    setExpiryForPaused();
                  }}
                >
                  x
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
      {subscriptionInfo.subscriptionstatus === "Active" && (subscriptionInfo.planname === "StandardPlan" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "EnterprisePlan") ? (
        <>
          {!hideAnnual && (
            <div className="TrialBanner" style={{ flexWrap: "initial" }}>
              <div className="left">
                Your subscription is active.{" "}
                <Link to="/plan-matrix">
                  Switch to an Annual plan and save
                </Link>.
              </div>
              <div className="right">
                <span
                  onClick={() => {
                    setHideAnnual(true);
                    setExpiryForSwitchToAnnual();
                  }}
                >
                  x
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
		</>
	);
};

export default Banner;