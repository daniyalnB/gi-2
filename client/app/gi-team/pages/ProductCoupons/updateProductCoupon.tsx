import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { Helmet } from "react-helmet";
import { 
  getAllProductCoupon,
  editProductCoupon,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import info from "assets/coupon-info.svg";


const UpdateProductCoupon = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [productcoupon, setProductCoupon] = useState({
    id: "",
    expiry: date,
    maxusagecount: Number,
    maxusagecountperuser: Number,
  });

  const [productcouponDuplicate, setProductCouponDuplicate] = useState({
    expiry: date,
    maxusagecount: Number,
    maxusagecountperuser: Number,
  });

  useEffect(() => {
    getAllProductCoupon().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (productcoupon) => productcoupon.id === parseInt(props.match.params.id)
        )[0];
        setProductCoupon({
          id: x.id,
          expiry: x.expiry,
          maxusagecount: x.maxusagecount,
          maxusagecountperuser: x.maxusagecountperuser,
        });
        setProductCouponDuplicate({
          expiry: x.expiry,
          maxusagecount: x.maxusagecount,
          maxusagecountperuser: x.maxusagecountperuser,
        });
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (productcoupon.expiry == productcouponDuplicate.expiry && productcoupon.maxusagecount == productcouponDuplicate.maxusagecount
      && productcoupon.maxusagecountperuser == productcouponDuplicate.maxusagecountperuser) {
      const payload = {
        id: productcoupon.id,
        expiry: moment(productcoupon.expiry).format("DD.MM.yyyy"),
        maxusagecount: productcoupon.maxusagecount,
        maxusagecountperuser: productcoupon.maxusagecountperuser,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else if (productcoupon.expiry == productcouponDuplicate.expiry && productcoupon.maxusagecount == productcouponDuplicate.maxusagecount) {
      const payload = {
        id: productcoupon.id,
        maxusagecountperuser: productcoupon.maxusagecountperuser,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else if (productcoupon.expiry == productcouponDuplicate.expiry && productcoupon.maxusagecountperuser == productcouponDuplicate.maxusagecountperuser) {
      const payload = {
        id: productcoupon.id,
        maxusagecount: productcoupon.maxusagecount,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else if (productcoupon.maxusagecount == productcouponDuplicate.maxusagecount && productcoupon.maxusagecountperuser == productcouponDuplicate.maxusagecountperuser) {
      const payload = {
        id: productcoupon.id,
        expiry: moment(productcoupon.expiry).format("DD.MM.yyyy"),
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else if (productcoupon.maxusagecountperuser == productcouponDuplicate.maxusagecountperuser) {
      const payload = {
        id: productcoupon.id,
        expiry: moment(productcoupon.expiry).format("DD.MM.yyyy"),
        maxusagecount: productcoupon.maxusagecount,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else if (productcoupon.maxusagecount == productcouponDuplicate.maxusagecount) {
      const payload = {
        id: productcoupon.id,
        expiry: moment(productcoupon.expiry).format("DD.MM.yyyy"),
        maxusagecountperuser: productcoupon.maxusagecountperuser,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else if (productcoupon.expiry == productcouponDuplicate.expiry) {
      const payload = {
        id: productcoupon.id,
        maxusagecount: productcoupon.maxusagecount,
        maxusagecountperuser: productcoupon.maxusagecountperuser,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    } else {
      const payload = {
        id: productcoupon.id,
        expiry: moment(productcoupon.expiry).format("DD.MM.yyyy"),
        maxusagecount: productcoupon.maxusagecount,
        maxusagecountperuser: productcoupon.maxusagecountperuser,
      };

      editProductCoupon(payload).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/product-coupons");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title> 
          Update Product Coupon - Actionable Insights Admin
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
                    <h3 className="heading"> Update Product Coupon </h3>
                  </div>
                  <div className="col-3 text-right back">
                    {!loadingData && (
                      <Link
                        className="bk"
                        to={`/gi-team/view-product-coupon/${productcoupon.id}`}
                      >
                        <img src={back} className="" />
                        Back
                      </Link>
                    )}
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <form onSubmit={handleSubmit}>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input
                                defaultValue={date}
                                type="date"
                                name="expiry"
                                required
                                id="inputField5"
                                className="input-area"
                                value={productcoupon.expiry}
                                onChange={(e) =>
                                  setProductCoupon({
                                    ...productcoupon,
                                    expiry: e.currentTarget.value,
                                  })
                                }
                              />
                              <label
                                htmlFor="inputField5"
                                className="floating_label"
                              >
                                Coupon Expiration Date
                              </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input
                                type="number"
                                min="0"
                                name="maxusagecount"
                                required
                                id="inputField7"
                                className="input-area coupon-info"
                                value={productcoupon.maxusagecount}
                                onChange={(e) =>
                                  setProductCoupon({
                                    ...productcoupon,
                                    maxusagecount: parseInt(e.currentTarget.value),
                                  })
                                }
                              />
                              <label
                                htmlFor="inputField7"
                                className="floating_label"
                              >
                                No. of Customers
                              </label>
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
                                value={productcoupon.maxusagecountperuser}
                                onChange={(e) =>
                                  setProductCoupon({
                                    ...productcoupon,
                                    maxusagecountperuser: parseInt(e.currentTarget.value),
                                  })
                                }
                              />
                              <label
                                htmlFor="inputField8"
                                className="floating_label"
                              >
                                Usage Limit/Customer
                              </label>
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
                        {!loading && (
                          <button
                            className="btn"
                            type="submit"
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          >
                            <span> Update </span>
                          </button>
                        )}
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

export default withRouter(UpdateProductCoupon);