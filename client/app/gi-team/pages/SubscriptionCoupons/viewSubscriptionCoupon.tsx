import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import NumberFormat from "react-number-format";
import moment from "moment";
import queryString from "query-string";
import Switch from "react-switch";
import { Helmet } from "react-helmet";
import { 
  getAllSubscriptionCoupon,
  deleteSubscriptionCoupon,
  activateOrDeactivateSubscriptionCoupon,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import date from "assets/date.svg";
import edit from "assets/Edit-Manual.svg";

const ViewSubscriptionCoupon = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllSubscriptionCoupon().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (subscriptioncoupon) => subscriptioncoupon.id === parseInt(props.match.params.id)
        )[0];
        if (x == undefined) {
          history.push("/gi-team/subscription-coupons");
        }
        setData(x);
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const del = () => {
    setLoading(true);
    deleteSubscriptionCoupon({
      id: data.id,
    }).subscribe((res) => {
      setLoading(false);
      history.push("/gi-team/subscription-coupons");
    });
  };

  const [ActivateOrDeactivateLoading, setActivateOrDeactivateLoading] = useState(false);

  const handleSubmit = (e) => {
    setActivateOrDeactivateLoading(true);
    
    const payload = {
      id: data.id,
      trueifactive: !data.isactive,
    };

    const stringified = queryString.stringify(payload);

    activateOrDeactivateSubscriptionCoupon(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        getAllSubscriptionCoupon().subscribe((response) => {
          if (response.response.Requested_Action) {
            const x = response.response.data.filter(
              (subscriptioncoupon) => subscriptioncoupon.id === parseInt(props.match.params.id)
            )[0];
            setData(x);
            setActivateOrDeactivateLoading(false);
          }
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          View Subscription Coupon - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="createInsightSheet">
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
              <div className="createInsightSheet-section">
                <div className="row header">
                  <div className="col-6">
                    <h3 className="heading">
                      {data.couponcode}
                    </h3>
                  </div>
                  <div 
                    className="col-6 text-right back"
                    style={{ paddingTop: "0px" }}
                  >
                    {!loadingData && (
                      <div className="view-buttons">
                        {!loading && (
                          <button
                            className="btn"
                            onClick={() => del()}
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          >
                            <span> Delete Coupon </span>
                          </button>
                        )}
                        {loading && (
                          <button className="btn" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                    )}
                    <Link
                      className="bk"
                      to="/gi-team/subscription-coupons"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <div className="info-data">
                    <div className="view-data">
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={date} />
                            <h5> Coupon Active From </h5>
                            <h4> {moment(data.activefrom).format("MM/DD/YYYY")} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={date} />
                            <h5> Coupon Expiration Date </h5>
                            <h4> {moment(data.expirydate).format("MM/DD/YYYY")} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="Deactivate-Activate">
                            <h3> Deactivate/Activate </h3>
                            <div
                              id="active"
                              style={{ display: "inline-block"}}
                            >
                              <Switch
                                onChange={handleSubmit}
                                checked={data.isactive}
                                disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#26A59A"
                              />
                            </div>
                            {ActivateOrDeactivateLoading && (
                              <div
                                style={{
                                  display: "inline-block",
                                  verticalAlign: "super",
                                  marginLeft: "10px",
                                }}
                              >
                                <i className="fas fa-spinner fa-spin"></i>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-right">
                          <Link 
                            to={`/gi-team/update-subscription-coupon/${data.id}`}
                          >
                            <img src={edit} />
                          </Link>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> Coupon Code </h3>
                          <h2 className="value"> {data.couponcode} </h2>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <h3 className="heading"> Description </h3>
                          <h2 className="value"> {data.description} </h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> Coupon For </h3>
                          <h2 className="value">
                            {
                              data.usedfor === "StandardPlan" ? "Standard Plan (Monthly)" :
                              data.usedfor === "PlusPlan" ? "Plus Plan (Monthly)" :
                              data.usedfor === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                              data.usedfor === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                              data.usedfor === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                              data.usedfor === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                              data.usedfor === "DevTestPlan" ? "Dev Test Plan" : ""
                            }
                          </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> No. of Customers </h3>
                          <h2 className="value"> {data.noofcustomers} </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading">
                            Duration ({data.usedfor.includes("Annual") ? "Years" : "Months"})
                          </h3>
                          <h2 className="value">
                            {data.duration} {data.usedfor.includes("Annual") ? "Year(s)" : "Month(s)"}
                          </h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          {data.discountpercentage && (
                            <>
                              <h3 className="heading"> Discount Percentage </h3>
                              <h2 className="value"> {data.discountpercentage}% </h2>
                            </>
                          )}
                          {data.subtractfixedamountincents && (
                            <>
                              <h3 className="heading"> Fixed Amount </h3>
                              <h2 className="value">
                                <NumberFormat
                                  value={(data.subtractfixedamountincents / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </h2>
                            </>
                          )}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> Usage Limit/Customer </h3>
                          <h2 className="value"> {data.usagelimitpercustomer} </h2>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> Coupon Usage </h3>
                          <h2 className="value"> {data.nooftimesused ? data.nooftimesused : "N/A"} </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {loadingData && (
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

export default withRouter(ViewSubscriptionCoupon);