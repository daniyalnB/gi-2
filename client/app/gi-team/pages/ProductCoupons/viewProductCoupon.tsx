import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import moment from "moment";
import NumberFormat from "react-number-format";
import CurrencyInput from "react-currency-input";
import queryString from "query-string";
import Switch from "react-switch";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import {
  addProductCoupon,
  getAllProductCoupon,
  deleteProductCoupon,
  getAllProductsForProductCoupons,
  activateOrDeactivateProductCoupon,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import date from "assets/date.svg";
import vision from "assets/visibility.svg";
import modalclose from "assets/modal-close.svg";
import edit from "assets/Edit-Manual.svg";

const FormElement = (props) => {

  const [error, seterror] = useState(false);

  const [Error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingData, setLoadingData]= useState(true);

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    getAllProductCoupon().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.map((val) => ({
          couponcode: val.couponcode,
        }));
        setCoupons(x);
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  function checkCoupon (value) {
    for(var i = 0; i < coupons.length; i++) {
      var name = coupons[i].couponcode.toLowerCase();
      if (name == value.toLowerCase()) {
        setError(true);
        break;
      } else {
        setError(false);
      }
    }
  }

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

  const [duplicateCategories, setDuplicateCategories] = useState([]);
  const [duplicateProducts, setDuplicateProducts] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const SelectedCategories = (e) => {
    setSelectedCategories(Array.isArray(e) ? e.map((x) => x.category) : []);
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const SelectedProducts = (e) => {
    setSelectedProducts(Array.isArray(e) ? e.map((x) => x.id) : []);
  };

   useEffect(() => {
    const uniqueYears = [...new Set(props.data.catagories)];
    const x = uniqueYears.map((val) => ({
      category: val,
    }));
    setDuplicateCategories(x);
    setSelectedCategories(uniqueYears);
    const y = props.data.products.map((val) => ({
      title: val.title + " | " + val.catagory,
      id: val.id,
    }));
    setDuplicateProducts(y);
    const z = props.data.products.map((val) => ({
      id: val.id,
    }));
    const p = z.map(({id}) => id)
    setSelectedProducts(p);
  }, []);

  const [productcoupon, setProductCoupon] = useState({
    activefrom: moment(props.data.activefrom).format("yyyy-MM-DD"),
    couponcode: "",
    description: props.data.description,
    expiry: moment(props.data.expiry).format("yyyy-MM-DD"),
    isactive: props.data.isactive,
    maxusagecount: props.data.maxusagecount,
    maxusagecountperuser: props.data.maxusagecountperuser,
    offpercentage: props.data.offpercentage,
    subtractfixedamount: props.data.subtractfixedamount,
  });

  const [couponType, setCouponType] = useState("");

  useEffect(() => { 
    const currentCouponType = props.data.offpercentage == null ? "Fixed" : "Percentage";
    setCouponType(currentCouponType);
  }, []);

  const changeCouponType = (e) => {
    if (e.currentTarget.value == "Fixed") {
      setProductCoupon({
        ...productcoupon,
        offpercentage: null,
      });
    } else {
      setProductCoupon({
        ...productcoupon,
        subtractfixedamount: null,
      });
    }
    setCouponType(e.currentTarget.value);
  };

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
          activefrom: moment(props.data.activefrom).format("yyyy-MM-DD"),
          couponcode: "",
          description: "",
          expiry: moment(props.data.expiry).format("yyyy-MM-DD"),
          isactive: true,
          maxusagecount: Number,
          maxusagecountperuser: Number,
          offpercentage: Number,
          subtractfixedamount: Number,
        });
        setLoading(false);
        seterror(false);
        history.push("/gi-team/product-coupons");
      } else {
        setLoading(false);
        seterror(response.response.Message);
      }
    });
  };

  return (
    <>
      {!loadingData && (
        <form onSubmit={handleSubmit}>
          <div className="form-group nogroup">
            <label> Coupon Code </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Coupon Code"
              onChange={(e) => {
                setProductCoupon({
                  ...productcoupon,
                  couponcode: e.currentTarget.value,
                });
                checkCoupon(e.currentTarget.value);
              }}
            />
            {Error ? (
              <div
                style={{
                  color: "#DB422D",
                  marginTop: "-10px",
                  padding: "0px 4px",
                  fontWeight: 500,
                }}
              >
                {productcoupon.couponcode} is already existed.
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group nogroup">
            <label> Category For </label>
            <Multiselect
              options={categories}
              selectedValues={duplicateCategories}
              displayValue="category"
              placeholder={false}
              emptyRecordMsg="No Data Found"
              onSelect={SelectedCategories}
              onRemove={SelectedCategories}
            />
          </div>
          <div className="form-group nogroup">
            <label> Product For </label>
            <Multiselect
              options={products}
              selectedValues={duplicateProducts}
              displayValue="title"
              placeholder={false}
              emptyRecordMsg="No Data Found"
              onSelect={SelectedProducts}
              onRemove={SelectedProducts}
            />
          </div>
          <div className="form-group nogroup">
            <label> Description </label>
            <textarea
              required
              className="form-control description"
              placeholder="Description"
              value={productcoupon.description}
              onChange={(e) =>
                setProductCoupon({
                  ...productcoupon,
                  description: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-group nogroup">
            <label> Coupon Active From </label>
            <input
              type="date"
              required
              className="form-control"
              placeholder="Coupon Active From"
              value={productcoupon.activefrom}
              onChange={(e) =>
                setProductCoupon({
                  ...productcoupon,
                  activefrom: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-group nogroup">
            <label> Coupon Expiration Date </label>
            <input
              type="date"
              required
              className="form-control"
              placeholder="Coupon Expiration Date"
              value={productcoupon.expiry}
              onChange={(e) =>
                setProductCoupon({
                  ...productcoupon,
                  expiry: e.currentTarget.value,
                })
              }
            />
          </div>
          <div className="form-group nogrou">
            <label> Coupon Type (Fixed or Percentage) </label>
            <select
              placeholder="Coupon Type"
              className="form-control"
              value={couponType}
              onChange={changeCouponType}
            >
              <option> Percentage </option>
              <option> Fixed </option>
            </select>
          </div>
          {couponType == "Percentage" && (
            <div className="form-group nogroup">
              <label> Discount Percentage </label>
              <input
                type="number"
                className="form-control"
                required
                placeholder="Discount Percentage"
                min="0"
                max="100"
                step="0.10"
                value={productcoupon.offpercentage}
                onChange={(e) =>
                  setProductCoupon({
                    ...productcoupon,
                    offpercentage: parseFloat(e.currentTarget.value),
                  })
                }
              />
            </div>
          )}
          {couponType == "Fixed" && (
            <div className="form-group nogroup">
              <label> Fixed Amount </label>
              <CurrencyInput
                thousandSeparator=","
                value={productcoupon.subtractfixedamount  / 100}
                name="subtractfixedamount"
                className="form-control"
                onChange={(e, maskedvalue) => {
                  setProductCoupon({
                    ...productcoupon,
                    subtractfixedamount: parseInt((maskedvalue * 100)),
                  });
                }}
              />
            </div>
          )}
          <div className="form-group nogroup">
            <label> No. of Customers </label>
            <input
              type="number"
              min="0"
              className="form-control"
              required
              placeholder="No. of Customers"
              value={productcoupon.maxusagecount}
              onChange={(e) =>
                setProductCoupon({
                  ...productcoupon,
                  maxusagecount: parseInt(e.currentTarget.value),
                })
              }
            />
          </div>
          <div className="form-group nogroup">
            <label> Usage Limit/Customer </label>
            <input
              type="number"
              min="0"
              className="form-control"
              required
              placeholder="Usage Limit/Customer"
              value={productcoupon.maxusagecountperuser}
              onChange={(e) =>
                setProductCoupon({
                  ...productcoupon,
                  maxusagecountperuser: parseInt(e.currentTarget.value),
                })
              }
            />
          </div>
          {!loading && ( 
            <div className="modal-save">
              <button 
                type="submit" 
                className="btn"
                disabled={Error ? true : false}
              >
                <span> Save </span>
              </button>
            </div>
          )}
          {loading && (
            <div className="modal-save">
              <button 
                disabled
                className="btn"
              >
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            </div>
          )}
          {error ? (
            <div
              style={{
                color: "#DB422D",
                margin: "20px 0px 0px 0px",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Error is Display Here
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
    </>
  );
};

const ViewProductCoupon = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const [catagories, setCatagories] = useState([]);

  useEffect(() => {
    getAllProductCoupon().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (productcoupon) => productcoupon.id === parseInt(props.match.params.id)
        )[0];
        if (x == undefined) {
          history.push("/gi-team/product-coupons");
        }
        setData(x);
        const uniqueYears = [...new Set(x.catagories)];
        setCatagories(uniqueYears);
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const del = () => {
    setLoading(true);
    deleteProductCoupon({
      id: data.id,
    }).subscribe((res) => {
      setLoading(false);
      history.push("/gi-team/product-coupons");
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

    activateOrDeactivateProductCoupon(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        getAllProductCoupon().subscribe((response) => {
          if (response.response.Requested_Action) {
            const x = response.response.data.filter(
              (productcoupon) => productcoupon.id === parseInt(props.match.params.id)
            )[0];
            setData(x);
            const uniqueYears = [...new Set(x.catagories)];
            setCatagories(uniqueYears);
            setActivateOrDeactivateLoading(false);
          }
        });
      }
    });
  };

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  return (
    <>
      <Helmet>
        <title> 
          View Product Coupon - Actionable Insights Admin
        </title>
      </Helmet>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose} 
        backdrop="static" 
        keyboard={false} 
        className="Duplicate_Modal"
      >
        <Modal.Header>
          <div 
            className="duplicate_title modal-title h4"
          > 
            Duplicate Coupon 
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElement
            handlecardclose={handlecardclose}
            data={data}
          ></FormElement>
        </Modal.Body>
      </Modal>
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
                  <div className="col-3">
                    <h3 className="heading">
                      {data.couponcode}
                    </h3>
                  </div>
                  <div 
                    className="col-9 text-right back"
                    style={{ paddingTop: "0px" }}
                  >
                    {!loadingData && (
                      <div className="view-buttons">
                        <button
                          className="btn"
                          onClick={handlecardshow}
                          disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                        >
                          <span> Make Duplicate </span>
                        </button>
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
                      to="/gi-team/product-coupons"
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
                            <h4> {moment(data.expiry).format("MM/DD/YYYY")} </h4>
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
                            to={`/gi-team/update-product-coupon/${data.id}`}
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
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <h3 className="heading"> Catagory For </h3>
                          <div className="multiple-values">
                            {catagories && catagories.length !== 0 ? (
                              <>
                                {catagories && catagories.map((val) => {
                                  return (
                                    <span> {val} </span>
                                  );
                                })}
                              </>
                            ) : (
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                }}
                              > 
                                N/A 
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <h3 className="heading"> Product For </h3>
                          <div className="multiple-values">
                            {data.products && data.products.length !== 0 ? (
                              <>
                                {data.products && data.products.map((val) => {
                                  return (
                                    <span> {val.title} | {val.catagory} </span>
                                  );
                                })}
                              </>
                            ) : (
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                }}
                              > 
                                N/A 
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          {data.offpercentage && (
                            <>
                              <h3 className="heading"> Discount Percentage </h3>
                              <h2 className="value"> {data.offpercentage}% </h2>
                            </>
                          )}
                          {data.subtractfixedamount && (
                            <>
                              <h3 className="heading"> Fixed Amount </h3>
                              <h2 className="value">
                                <NumberFormat
                                  value={(data.subtractfixedamount / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </h2>
                            </>
                          )}
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Usage Limit/Customer </h3>
                          <h2 className="value"> {data.maxusagecountperuser} </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> No. of Customers </h3>
                          <h2 className="value"> {data.maxusagecount} </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Coupon Usage </h3>
                          <h2 className="value"> {data.nooftimesused ? data.nooftimesused : "N/A"} </h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "50px" }}>
                        <div className="col-12">
                          <h4 className="images"> Coupon History </h4>
                          <div className="sizes-view">
                            <div className="row sizes">
                              <div className="col-6 sizes-heading">
                                <div className="val"> Customer Email </div>
                              </div>
                              <div className="col-6 sizes-heading">
                                <div className="val"> Order </div>
                              </div>
                              <div className="col-6 size">
                                {data.ordersUsedIn && data.ordersUsedIn.length == 0 ? (
                                  <div className="val-inner"> No data available </div>
                                ) : (
                                  <>
                                    {data.ordersUsedIn && data.ordersUsedIn.map((val, index) => {
                                      return ( 
                                        <div className="val-inner" style={{ wordBreak: "break-all" }}> {val.customerowneremail} </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-3 size">
                                {data.ordersUsedIn && data.ordersUsedIn.length == 0 ? (
                                  <div className="val-inner"> No data available </div>
                                ) : (
                                  <>
                                    {data.ordersUsedIn && data.ordersUsedIn.map((val, index) => {
                                      return ( 
                                        <div className="val-inner"> {val.ordernumber} </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-3 size">
                                {data.ordersUsedIn && data.ordersUsedIn.length == 0 ? (
                                  <div className="val-inner"> </div>
                                ) : (
                                  <>
                                    {data.ordersUsedIn && data.ordersUsedIn.map((val, index) => {
                                      return ( 
                                        <div className="val-inner text-center"> 
                                          <Link
                                            to={`/gi-team/view-order/${val.ordernumber}`}
                                          >
                                            <img src={vision} />
                                          </Link>
                                        </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
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

export default withRouter(ViewProductCoupon);