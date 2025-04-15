import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import CurrencyInput from "react-currency-input";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { Helmet } from "react-helmet";
import { Multiselect } from "multiselect-react-dropdown";
import {
  addProductCoupon,
  getAllProductsForProductCoupons,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import info from "assets/coupon-info.svg";

const CreateProductCoupon = (props) => {

  const [CouponType, setCouponType] = useState("Percentage");
  const [CouponTypeSelect, setCouponTypeSelect] = useState(false);
  
  const [error, setError] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([
    {
      category: "Macro",
      id: 1,
    },
    {
      category: "Swag",
      id: 2,
    },
    {
      category: "UmpiresManual",
      id: 3,
    },
    {
      category: "Event",
      id: 4,
    },
    {
      category: "InsighterPoints",
      id: 5,
    },
    {
      category: "GiftCards",
      id: 6,
    },
    {
      category: "SolidifaiAnalysis",
      id: 7
    },
    {
      category: "Certifications",
      id: 8
    },
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const SelectedCategories = (e) => {
    setSelectedCategories(Array.isArray(e) ? e.map((x) => x.category) : []);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsForProductCoupons().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.map((val) => ({
          title: val.eventstartdatetime ? val.title + " | " + val.catagory + " | " + moment(val.eventstartdatetime).format("MMMM Do, YYYY") :  val.title + " | " + val.catagory,
          id: val.id,
        }));
        setProducts(x);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const SelectedProducts = (e) => {
    setSelectedProducts(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

  const [productcoupon, setProductCoupon] = useState({
    activefrom: date,
    couponcode: "",
    description: "",
    expiry: date,
    isactive: true,
    maxusagecount: Number,
    maxusagecountperuser: Number,
    offpercentage: Number,
    subtractfixedamount: Number,
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      activefrom: moment(productcoupon.activefrom).format("DD.MM.yyyy"),
      catagories: selectedCategories,
      couponcode: productcoupon.couponcode,
      description: productcoupon.description,
      expiry: moment(productcoupon.expiry).format("DD.MM.yyyy"),
      isactive: productcoupon.isactive,
      maxusagecount: productcoupon.maxusagecount,
      maxusagecountperuser: productcoupon.maxusagecountperuser,
      offpercentage: productcoupon.offpercentage,
      subtractfixedamount: productcoupon.subtractfixedamount,
      productids: selectedProducts,
    };

    addProductCoupon(payload).subscribe((response) => {
      if (response.response.Requested_Action) {
        setProductCoupon({
          activefrom: moment(date).format("DD.MM.yyyy"),
          couponcode: "",
          description: "",
          expiry: moment(date).format("DD.MM.yyyy"),
          isactive: true,
          maxusagecount: Number,
          maxusagecountperuser: Number,
          offpercentage: Number,
          subtractfixedamount: Number,
        });
        setLoading(false);
        setError(false);
        history.push("/gi-team/product-coupons");
        document.getElementById("form").reset();
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
          Create Product Coupon - Actionable Insights Admin
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
                    <h3 className="heading"> Create Product Coupon </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link className="bk" to="/gi-team/product-coupons">
                      <img src={back} className="" />
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit} id="form">
                  <div className="info-data">
                    <div className="form-holder">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input
                              type="text"
                              name="couponcode"
                              required
                              id="inputField1"
                              className="input-area"
                              onChange={(e) =>
                                setProductCoupon({
                                  ...productcoupon,
                                  couponcode: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField1"
                              className="floating_label"
                            >
                              Coupon Code
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <Multiselect
                            options={categories}
                            displayValue="category"
                            placeholder="Category For"
                            emptyRecordMsg="No Data Found"
                            onSelect={SelectedCategories}
                            onRemove={SelectedCategories}
                          />
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <Multiselect
                            required
                            options={products}
                            displayValue="title"
                            placeholder="Product For"
                            emptyRecordMsg="No Data Found"
                            onSelect={SelectedProducts}
                            onRemove={SelectedProducts}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <textarea
                              name="description"
                              maxLength={150}
                              required
                              id="textField1"
                              className="input-area"
                              onChange={(e) =>
                                setProductCoupon({
                                  ...productcoupon,
                                  description: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="textField1"
                              className="floating_label"
                            >
                              Description
                            </label>
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
                              id="inputField4"
                              className="input-area"
                              onChange={(e) =>
                                setProductCoupon({
                                  ...productcoupon,
                                  activefrom: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField4"
                              className="floating_label"
                            >
                              Coupon Active From
                            </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              defaultValue={date}
                              min={productcoupon.activefrom}
                              type="date"
                              name="expiry"
                              required
                              id="inputField5"
                              className="input-area"
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
                                  setProductCoupon({
                                    ...productcoupon,
                                    subtractfixedamount: Number,
                                  })
                                }}
                              > 
                                Percentage 
                              </h3>
                              <h3 
                                onClick={(e) => {
                                  setCouponType(e.currentTarget.innerHTML);
                                  setCouponTypeSelect(!CouponTypeSelect);
                                  setProductCoupon({
                                    ...productcoupon,
                                    offpercentage: Number,
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
                                name="offpercentage"
                                required
                                id="inputField6"
                                className="input-area"
                                min="0"
                                max="100"
                                step="0.10"
                                onChange={(e) =>
                                  setProductCoupon({
                                    ...productcoupon,
                                    offpercentage: parseFloat(e.currentTarget.value),
                                  })
                                }
                              />
                              <label
                                htmlFor="inputField6"
                                className="floating_label"
                              >
                                Discount Percentage
                              </label>
                            </div>
                          </div>
                        )}
                        {CouponType == "Fixed" && (
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <CurrencyInput
                                thousandSeparator=","
                                value={productcoupon.subtractfixedamount / 100}
                                name="subtractfixedamount"
                                id="inputField9"
                                className="input-area"
                                onChange={(e, maskedvalue) => {
                                  setProductCoupon({
                                    ...productcoupon,
                                    subtractfixedamount: parseInt((maskedvalue * 100)),
                                  });
                                }}
                              />
                              <label htmlFor="inputField9" className="floating_label"> Fixed Amount </label>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              type="number"
                              min="0"
                              name="maxusagecount"
                              required
                              id="inputField7"
                              className="input-area coupon-info"
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
                          <span> Save </span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateProductCoupon);