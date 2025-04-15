import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
const ScrollToTop = React.lazy(
  () => import("../../../../components/ScrollToTop")
);

const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import queryString from "query-string";
import moment from "moment";
import { Helmet } from "react-helmet";
import history from "../../../../../utils/history";
import { addInsighterPointsCoupon } from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const CreateCode = (props) => {
  const [error, setError] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [loading, setLoading] = useState(false);

  const [insighterpointscoupon, setInsighterPointsCoupon] = useState({
    activefrom: date,
    description: "",
    expiry: date,
    ipcode: "",
    isactive: true,
    noofcustomers: "",
    numberofpoints: "",
    usagelimitpercustomer: "",
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      activefrom: moment(insighterpointscoupon.activefrom).format("DD.MM.yyyy"),
      description: insighterpointscoupon.description,
      expiry: moment(insighterpointscoupon.expiry).format("DD.MM.yyyy"),
      ipcode: insighterpointscoupon.ipcode,
      isactive: insighterpointscoupon.isactive,
      noofcustomers: insighterpointscoupon.noofcustomers,
      numberofpoints: insighterpointscoupon.numberofpoints,
      usagelimitpercustomer: insighterpointscoupon.usagelimitpercustomer,
    };

    // const stringified = queryString.stringify(payload);

    addInsighterPointsCoupon(payload).subscribe((response) => {
      if (response.response.Requested_Action) {
        setInsighterPointsCoupon({
          activefrom: date,
          description: "",
          expiry: date,
          ipcode: "",
          isactive: true,
          noofcustomers: "",
          numberofpoints: "",
          usagelimitpercustomer: "",
        });
        setLoading(false);
        setError(false);
        history.push("/gi-team/insighter-points/view-codes");
        document.getElementById("form").reset();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };

  console.log(insighterpointscoupon);

  return (
    <>
      <Helmet>
        <title>Create Code - Actionable Insights Admin</title>
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
                    <h3 className="heading">Create Code</h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/insighter-points/view-codes"
                    >
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
                              name="ipcode"
                              required
                              id="inputField1"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  ipcode: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField1"
                              className="floating_label"
                            >
                              {" "}
                              IP Code{" "}
                            </label>
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
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  description: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="textField1"
                              className="floating_label"
                            >
                              {" "}
                              Description{" "}
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
                              id="inputField2"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  activefrom: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField2"
                              className="floating_label"
                            >
                              {" "}
                              Coupon Active From{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              defaultValue={date}
                              min={insighterpointscoupon.activefrom}
                              type="date"
                              name="expirydate"
                              required
                              id="inputField3"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  expiry: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField3"
                              className="floating_label"
                            >
                              {" "}
                              Coupon Expiration Date{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="form-group nogroup">
                            <input
                              type="number"
                              min="0"
                              name="numberofpoints"
                              required
                              id="inputField4"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  numberofpoints: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField4"
                              className="floating_label"
                            >
                              {" "}
                              No. of Points{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="form-group nogroup">
                            <input
                              type="number"
                              min="0"
                              name="noofcustomers"
                              required
                              id="inputField7"
                              className="input-area"
                              onChange={(e) =>
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  noofcustomers: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField7"
                              className="floating_label"
                            >
                              {" "}
                              No. of Customers{" "}
                            </label>
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
                              className="input-area"
                              onChange={(e) =>
                                setInsighterPointsCoupon({
                                  ...insighterpointscoupon,
                                  usagelimitpercustomer: e.currentTarget.value,
                                })
                              }
                            />
                            <label
                              htmlFor="inputField8"
                              className="floating_label"
                            >
                              {" "}
                              Usage Limit/Customer{" "}
                            </label>
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
                          disabled={
                            localStorage.getItem("role") == "Analyst"
                              ? true
                              : false
                          }
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
                        You need to be an Admin or Editor to Save
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

export default withRouter(CreateCode);
