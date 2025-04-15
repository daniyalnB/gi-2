import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import history from "../../../../../utils/history";
import moment from "moment";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import {
  getAllInsighterPointsCoupons,
  getInsighterPointCouponUsage,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import date from "assets/date.svg";
import vision from "assets/visibility.svg";

const ViewCode = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllInsighterPointsCoupons().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (insighterpointscode) => insighterpointscode.id === parseInt(props.match.params.id)
        )[0];
        setData(x);
        getInsighterPointCouponUsage(x.id).subscribe((response) => {
          if (response.response.Requested_Action) {
            const y = response.response.data;
            setUsers(y);
            setLoading(false);
          }
        });
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> 
					View Code - Actionable Insights Admin
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
                      {data.ipcode}
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/insighter-points/view-codes"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <div className="info-data">
                    <div className="view-data">
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={date} />
                            <h5> Coupon Active From </h5>
                            <h4> {moment(data.activefrom, "DD.MM.YYYY").format("MM/DD/YYYY")} </h4>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div className="coupon-date">
                            <img src={date} />
                            <h5> Coupon Expiration Date </h5>
                            <h4> {moment(data.expiry, "DD.MM.YYYY").format("MM/DD/YYYY")} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> IP Code </h3>
                          <h2 className="value"> {data.ipcode} </h2>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <h3 className="heading"> Description </h3>
                          <h2 className="value"> {data.description} </h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <h3 className="heading"> No. of Points </h3>
                          <h2 className="value"> 
                            <NumberFormat
                              value={data.numberofpoints}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                         </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Usage Limit/Customer </h3>
                          <h2 className="value"> 1 </h2>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6">
                          <h3 className="heading"> No. of Customers </h3>
                          <h2 className="value"> {data.usagelimitpercustomer} </h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "50px" }}>
                        <div className="col-12">
                          <h4 className="images"> Code Application History </h4>
                          <div className="sizes-view">
                            <div className="row sizes">
                              <div className="col-12 sizes-heading">
                                <div className="val"> Customer Email </div>
                              </div>
                              <div className="col-9 size">
                                {users && users.length == 0 ? (
                                  <div className="val-inner"> No data available </div>
                                ) : (
                                  <>
                                    {users && users.map((val, index) => {
                                      return ( 
                                        <div className="val-inner" style={{ wordBreak: "break-all" }}> {val.email} </div>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                              <div className="col-3 size">
                                {users && users.length == 0 ? (
                                  <div className="val-inner"> </div>
                                ) : (
                                  <>
                                    {users && users.map((val, index) => {
                                      return ( 
                                        <div className="val-inner text-center"> 
                                          <Link
                                            to={`/gi-team/user-details/${val.id}`}
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

export default withRouter(ViewCode);