import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import { Helmet } from "react-helmet";
import {
  getCustomerInfoById,
  GetAllSubscriptionPlan,
} from "../../../../utils/api-routes/api-routes.util";
import right from "assets/productright.png";
import back from "assets/arrowleft.svg";

const StartSubscription = (props) => {

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState({
    Monthly: true,
    Annual: false,
  });

  const [data, setData] = useState([]);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getCustomerInfoById(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        setUserData(x);
        if (x == undefined) {
          history.push("/gi-team/users");
        }
        setLoading(false);
      } else {
        history.push("/gi-team/users");
      }
    });
    GetAllSubscriptionPlan().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
      }
    });
  }, []);

  const plans = data.map(plan => plan.name);
  const AllPlans= [...new Set(plans)];

  return (
    <>
      <Helmet>
        <title> 
          Start Subscription - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="insightsheet">
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
              <div className="insightsheet-section">
                <div className="row header">
                  <div className="col-6">
                    <h3 className="heading"> Start Subscription </h3>
                  </div>
                  <div className="col-6 text-right">
                    <div className="back">
                      <Link
                        className="bk"
                        to={`/gi-team/view-subscription/${props.match.params.id}`}
                      >
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <>
                    {userData.ischilduser ? (
                      <div className="products">
                        <div className="row">
                          <div className="col">
                            <span
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#DB422D",
                              }}
                            > 
                              This is a sub-user; please detach this sub-user or purchase the subscription under the{" "}
                              <Link
                                to={`/gi-team/view-subscription/${userData.parentinfo.parentid}`}
                                style={{ textDecoration: "underline", color: "#DB422D", }}
                              >
                                admin user
                              </Link>
                              {" "}first.
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="inner_sub_area" style={{ paddingRight: "0px" }}>
                          <div className="row">
                            <div className="col-12 umpiresmanual">
                              <ul className="subs_filters">
                                <li
                                  className={
                                    activeTab.Monthly == true ? "active" : ""
                                  }
                                  onClick={() =>
                                    setActiveTab({
                                      Monthly: true,
                                      Annual: false,
                                    })
                                  }
                                >
                                  Monthly
                                </li>
                                <li
                                  className={
                                    activeTab.Annual == true ? "active" : ""
                                  }
                                  onClick={() =>
                                    setActiveTab({
                                      Monthly: false,
                                      Annual: true,
                                    })
                                  }
                                >
                                  Annual
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="products">
                          <div className="row">
                            {activeTab.Monthly && (
                              <>
                                {data.map((plan) => {
                                  if (plan.name === "PlusPlan") {
                                    return (
                                      <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <div className="swag-data">
                                          <div className="row">
                                            <div className="data-text col-9" style={{ paddingLeft: "15px" }}>
                                              <h3> Plus Plan </h3>
                                              <h4> Price:&nbsp;${plan.price / 100}/month </h4>
                                            </div>
                                            <div className="data-image-two col-3">
                                              <Link
                                                to ={{
                                                  pathname: `/gi-team/subscription-checkout/${props.match.params.id}`, 
                                                  state: {
                                                    plan: `${AllPlans[1]}`,
                                                  }
                                                }}
                                              >
                                                <img src={right} />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                                {data.map((plan) => {
                                  if (plan.name === "ProfessionalPlan") {
                                    return (
                                      <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <div className="swag-data">
                                          <div className="row">
                                            <div className="data-text col-9" style={{ paddingLeft: "15px" }}>
                                              <h3> Pro Plan </h3>
                                              <h4> Price:&nbsp;${plan.price / 100}/month/seat </h4>
                                            </div>
                                            <div className="data-image-two col-3">
                                              <Link
                                                to ={{
                                                  pathname: `/gi-team/subscription-checkout/${props.match.params.id}`, 
                                                  state: {
                                                    plan: `${AllPlans[2]}`,
                                                  }
                                                }}
                                              >
                                                <img src={right} />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                                {data.map((plan) => {
                                  if (plan.name === "EnterprisePlan") {
                                    return (
                                      <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <div className="swag-data">
                                          <div className="row">
                                            <div className="data-text col-9" style={{ paddingLeft: "15px" }}>
                                              <h3> Enterprise Plan </h3>
                                              <h4> Price:&nbsp;${plan.price / 100}/month </h4>
                                            </div>
                                            <div className="data-image-two col-3">
                                              <Link
                                                to ={{
                                                  pathname: `/gi-team/subscription-checkout/${props.match.params.id}`, 
                                                  state: {
                                                    plan: `${AllPlans[3]}`,
                                                  }
                                                }}
                                              >
                                                <img src={right} />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </>
                            )}
                            {activeTab.Annual && (
                              <>
                                {data.map((plan) => {
                                  if (plan.name === "PlusPlanAnnual") {
                                    return (
                                      <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <div className="swag-data">
                                          <div className="row">
                                            <div className="data-text col-9" style={{ paddingLeft: "15px" }}>
                                              <h3> Plus Plan Annual </h3>
                                              <h4> Price:&nbsp;${plan.price / 100}/month </h4>
                                            </div>
                                            <div className="data-image-two col-3">
                                              <Link
                                                to ={{
                                                  pathname: `/gi-team/subscription-checkout/${props.match.params.id}`, 
                                                  state: {
                                                    plan: `${AllPlans[5]}`,
                                                  }
                                                }}
                                              >
                                                <img src={right} />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                                {data.map((plan) => {
                                  if (plan.name === "ProfessionalPlanAnnual") {
                                    return (
                                      <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <div className="swag-data">
                                          <div className="row">
                                            <div className="data-text col-9" style={{ paddingLeft: "15px" }}>
                                              <h3> Pro Plan Annual </h3>
                                              <h4> Price:&nbsp;${plan.price / 100}/month/seat </h4>
                                            </div>
                                            <div className="data-image-two col-3">
                                              <Link
                                                to ={{
                                                  pathname: `/gi-team/subscription-checkout/${props.match.params.id}`, 
                                                  state: {
                                                    plan: `${AllPlans[6]}`,
                                                  }
                                                }}
                                              >
                                                <img src={right} />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                               {data.map((plan) => {
                                  if (plan.name === "EnterprisePlanAnnual") {
                                    return (
                                      <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <div className="swag-data">
                                          <div className="row">
                                            <div className="data-text col-9" style={{ paddingLeft: "15px" }}>
                                              <h3> Enterprise Plan Annual </h3>
                                              <h4> Price:&nbsp;${plan.price / 100}/month </h4>
                                            </div>
                                            <div className="data-image-two col-3">
                                              <Link
                                                to ={{
                                                  pathname: `/gi-team/subscription-checkout/${props.match.params.id}`, 
                                                  state: {
                                                    plan: `${AllPlans[7]}`,
                                                  }
                                                }}
                                              >
                                                <img src={right} />
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </>
                            )} 
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {loading && (
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

export default withRouter(StartSubscription);