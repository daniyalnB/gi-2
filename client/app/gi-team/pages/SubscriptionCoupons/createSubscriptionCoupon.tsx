import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import { Helmet } from "react-helmet";
import CurrencyInput from "react-currency-input";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { addSubscriptionCoupon } from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import info from "assets/coupon-info.svg";

const CreateSubscriptionCoupon = (props) => {

  const [error, setError] = useState(false);

  const [CouponType, setCouponType] = useState("Percentage");
  const [CouponTypeSelect, setCouponTypeSelect] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [couponFor, setCouponFor] = useState(false);

  const [loading, setLoading] = useState(false);

  const [subscriptioncoupon, setSubscriptionCoupon] = useState({
    activefrom: date,
    couponcode: "",
    description: "",
    discountpercentage: Number,
    duration: "",
    expirydate: date,
    isactive: true,
    noofcustomers: Number,
    subtractfixedamountincents: Number,
    usagelimitpercustomer: Number,
    usedfor: "",
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      activefrom: subscriptioncoupon.activefrom,
      couponcode: subscriptioncoupon.couponcode,
      description: subscriptioncoupon.description,
      discountpercentage: subscriptioncoupon.discountpercentage,
      duration: subscriptioncoupon.duration,
      expirydate: subscriptioncoupon.expirydate,
      isactive: subscriptioncoupon.isactive,
      noofcustomers: subscriptioncoupon.noofcustomers,
      subtractfixedamountincents: subscriptioncoupon.subtractfixedamountincents,
      usagelimitpercustomer: subscriptioncoupon.usagelimitpercustomer,
      usedfor: subscriptioncoupon.usedfor,
    };

    addSubscriptionCoupon(payload).subscribe((response) => {
      if (response.response.Requested_Action) {
        setSubscriptionCoupon({
          activefrom: date,
          couponcode: "",
          description: "",
          discountpercentage: Number,
          duration: "",
          expirydate: date,
          isactive: true,
          noofcustomers: Number,
          subtractfixedamountincents: Number,
          usagelimitpercustomer: Number,
          usedfor: "",
        });
        setLoading(false);
        setError(false);
        history.push("/gi-team/subscription-coupons");
        document.getElementById("form").reset()
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          Create Subscription Coupon - Actionable Insights Admin
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
                  <div className="col-9">
                    <h3 className="heading">
                      Create Subscription Coupon
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
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
                <form onSubmit={handleSubmit} id="form">
                  <div className="info-data">
                    <div className="form-holder">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="text" 
                              name="couponcode" 
                              required 
                              id="inputField1" 
                              className="input-area"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  couponcode: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField1" className="floating_label"> Coupon Code </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              onClick={(e) => setCouponFor(!couponFor)} 
                              value={
                                subscriptioncoupon.usedfor === "StandardPlan" ? "Standard Plan (Monthly)" :
                                subscriptioncoupon.usedfor === "PlusPlan" ? "Plus Plan (Monthly)" :
                                subscriptioncoupon.usedfor === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                subscriptioncoupon.usedfor === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                subscriptioncoupon.usedfor === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                subscriptioncoupon.usedfor === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : ""
                              }
                              type="text" 
                              name="usedfor" 
                              required 
                              id="inputField2" 
                              className="input-area"
                              style={{ 
                                color: "transparent",
                                textShadow: "0 0 0 #000",
                                cursor: "pointer",
                              }}
                            />
                            <label htmlFor="inputField2" className="floating_label"> Coupon For </label>
                            <label className="file_input_label">
                              {couponFor ?
                                <img 
                                  className="select size"
                                  src={up} 
                                  onClick={() => setCouponFor(!couponFor)}
                                />
                              :
                                <img 
                                  className="select size"
                                  src={down} 
                                  onClick={() => setCouponFor(!couponFor)}
                                />
                              }
                            </label>
                            <div className={couponFor ? "active" : "dropdown-content" }>
                              <h3 
                                onClick={(e) => {
                                  setCouponFor(!couponFor);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    usedfor: "StandardPlan",
                                  });
                                }}
                              > 
                                Standard Plan (Monthly)
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponFor(!couponFor);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    usedfor: "PlusPlan",
                                  });
                                }}
                              > 
                                Plus Plan (Monthly)
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponFor(!couponFor);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    usedfor: "ProfessionalPlan",
                                  });
                                }}
                              > 
                                Pro Plan (Monthly)
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponFor(!couponFor);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    usedfor: "StandardPlanAnnual",
                                  });
                                }}
                              > 
                                Standard Plan (Annual)
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponFor(!couponFor);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    usedfor: "PlusPlanAnnual",
                                  });
                                }}
                              > 
                                Plus Plan (Annual)
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponFor(!couponFor);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    usedfor: "ProfessionalPlanAnnual",
                                  });
                                }}
                              > 
                                Pro Plan (Annual)
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <textarea
                              name="description"
                              required
                              id="textField1"
                              className="input-area"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  description: e.currentTarget.value,
                                })
                              }
                            />  
                            <label htmlFor="textField1" className="floating_label"> Description </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              defaultValue={date}
                              type="date" 
                              name="activefrom" 
                              required 
                              id="inputField3" 
                              className="input-area"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  activefrom: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField3" className="floating_label"> Coupon Active From </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              defaultValue={date}
                              min={subscriptioncoupon.activefrom}
                              type="date" 
                              name="expirydate" 
                              required 
                              id="inputField4" 
                              className="input-area"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  expirydate: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField4" className="floating_label"> Coupon Expiration Date </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              onClick={(e) => setCouponTypeSelect(!CouponTypeSelect)} 
                              value={CouponType} 
                              type="text" 
                              name="Catagory" 
                              required 
                              id="inputField10" 
                              className="input-area"
                              style={{ 
                                color: "transparent",
                                textShadow: "0 0 0 #000",
                                cursor: "pointer",
                              }}
                            />
                            <label htmlFor="inputField10" className="floating_label"> Coupon Type (Fixed or Percentage) </label>
                            <label className="file_input_label">
                              {CouponTypeSelect ?
                                <img 
                                  className="select size"
                                  src={up} 
                                  onClick={() => setCouponTypeSelect(!CouponTypeSelect)}
                                />
                              :
                                <img 
                                  className="select size"
                                  src={down} 
                                  onClick={() => setCouponTypeSelect(!CouponTypeSelect)}
                                />
                              }
                            </label>
                            <div className={CouponTypeSelect ? "active" : "dropdown-content" }>
                              <h3 
                                onClick={(e) => {
                                  setCouponType(e.currentTarget.innerHTML);
                                  setCouponTypeSelect(!CouponTypeSelect);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    subtractfixedamountincents: Number,
                                  })
                                }}
                              > 
                                Percentage 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponType(e.currentTarget.innerHTML);
                                  setCouponTypeSelect(!CouponTypeSelect);
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    discountpercentage: Number,
                                  })
                                }}
                              > 
                                Fixed 
                              </h3> 
                            </div>
                          </div>
                        </div>
                        {CouponType == "Percentage" && ( 
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="number"
                                name="discountpercentage" 
                                required 
                                id="inputField5" 
                                className="input-area"
                                min="0"
                                max="100"
                                step="0.10"
                                onChange={(e) =>
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    discountpercentage: parseFloat(e.currentTarget.value),
                                  })
                                }
                              />
                              <label htmlFor="inputField5" className="floating_label"> Discount Percentage </label>
                            </div>
                          </div>
                        )}
                        {CouponType == "Fixed" && (
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <CurrencyInput
                                thousandSeparator=","
                                value={subscriptioncoupon.subtractfixedamountincents / 100}
                                name="subtractfixedamountincents"
                                id="inputField9"
                                className="input-area"
                                onChange={(e, maskedvalue) => {
                                  setSubscriptionCoupon({
                                    ...subscriptioncoupon,
                                    subtractfixedamountincents: parseInt((maskedvalue * 100)),
                                  });
                                }}
                              />
                              <label htmlFor="inputField9" className="floating_label"> Fixed Amount </label>
                            </div>
                          </div>
                        )}
                        {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="number"
                              name="discountpercentage" 
                              required 
                              id="inputField5" 
                              className="input-area"
                              min="0"
                              max="100"
                              step="0.10"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  discountpercentage: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField5" className="floating_label"> Discount Percentage </label>
                          </div>
                        </div> */}
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="number"
                              min="0"
                              name="duration" 
                              required 
                              id="inputField6" 
                              className="input-area"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  duration: e.currentTarget.value,
                                })
                              }
                            />
                            <label htmlFor="inputField6" className="floating_label">
                              Duration ({subscriptioncoupon.usedfor.includes("Annual") ? "Years" : "Months"})
                            </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="number"
                              min="0"
                              name="noofcustomers" 
                              required 
                              id="inputField7" 
                              className="input-area coupon-info"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  noofcustomers: parseInt(e.currentTarget.value),
                                })
                              }
                            />
                            <label htmlFor="inputField7" className="floating_label"> No. of Customers </label>
                            <OverlayTrigger
                              placement="bottom"
                              delay={{ show: 250, hide: 900 }}
                              overlay={(
                                <Tooltip
                                  id="xactimate-tooltip-Coupon"
                                >
                                  How many times this coupon can be applied?
                                  <br />
                                  If the usage/limit is more than 1, keep no. of customers count double. e.g.
                                  <br />
                                  If 40 users were to use it and each user can apply twice.
                                  Enter 80 for No. of customers field and 2 in Usage Limit/Customer.
                                </Tooltip>
                              )}
                            >
                              <label className="coupon_info_label">
                                <img 
                                  className="info_coupon"
                                  src={info}
                                />
                              </label>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input 
                              type="number" 
                              min="0"
                              name="usagelimitpercustomer" 
                              required 
                              id="inputField8" 
                              className="input-area coupon-info"
                              onChange={(e) =>
                                setSubscriptionCoupon({
                                  ...subscriptioncoupon,
                                  usagelimitpercustomer: parseInt(e.currentTarget.value),
                                })
                              }
                            />
                            <label htmlFor="inputField8" className="floating_label"> Usage Limit/Customer </label>
                            <OverlayTrigger
                              placement="bottom"
                              delay={{ show: 250, hide: 900 }}
                              overlay={(
                                <Tooltip
                                  id="xactimate-tooltip-Coupon"
                                >
                                  How many times each user can use the coupon?
                                  <br />
                                  If the usage/limit is more than 1, keep no. of customers count double. e.g.
                                  <br />
                                  If 40 users were to use it and each user can apply twice.
                                  Enter 80 for No. of customers field and 2 in Usage Limit/Customer.
                                </Tooltip>
                              )}
                            >
                              <label className="coupon_info_label">
                                <img 
                                  className="info_coupon"
                                  src={info}
                                />
                              </label>
                            </OverlayTrigger>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="second-hr" />
                  <div className="Buttons">
                    <div className="row">
                      {!loading && 
                        <button 
                          className="btn"
                          type="submit"
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                        > 
                          <span> Save </span>
                        </button>
                      }
                      {loading && (
                        <button className="btn" disabled> 
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  {localStorage.getItem("role") == "Analyst" && (
                    <div
                      style={{
                        padding: "0px 20px 20px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div 
                        className="form-group alert alert-danger"
                        style={{ 
                          margin: "0px",
                          width: "270px",
                        }}
                      >
                        You need to be an Admin or Editor to Create
                      </div>
                    </div> 
                  )}
                  {error ? (
                    <div
                      style={{
                        padding: "0px 20px 20px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div 
                        className="form-group alert alert-danger"
                        style={{ margin: "0px" }}
                      >
                        {error}
                      </div>
                    </div> 
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateSubscriptionCoupon);