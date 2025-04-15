import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import subscriptioncouponsred from "assets/SubscriptionCouponsRed.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import moment from "moment";
import { Helmet } from "react-helmet";
import { getAllSubscriptionCoupon } from "../../../../utils/api-routes/api-routes.util";

const SubscriptionCoupons = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [headers, setHeaders] = useState([
    {
      Header: "Coupon Code",
      accessor: "couponcode",
    },
    {
      Header: "Description",
      accessor: false,
    },
    {
      Header: "Coupon For",
      accessor: "usedfor",
    },
    {
      Header: "Expiration Date",
      accessor: "expirydate",
    },
    {
      Header: "Usage/Limit",
      accessor: "noofcustomers",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllSubscriptionCoupon().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setData(response.response.data);
      } else {
        alert("error");
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> 
          Subscription Coupons - Actionable Insights Admin
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
                  <div className="col-9">
                    <div className="page_icon">
                      <img src={subscriptioncouponsred} />
                    </div>
                    <h3 className="heading">
                      Subscription Coupons
                    </h3>
                  </div>
                  {localStorage.getItem("role") == "Analyst" ? (
                    ""
                  ) : (
                    <div className="col-3 text-right">
                      <Link
                        className="btn"
                        to="/gi-team/create-subscription-coupon"
                      >
                        <img src={create} />
                        Create New
                      </Link>
                    </div>
                  )}
                </div>
                <hr />
                <div className="inner_sub_area">
                  <div className="row">
                    <div className="col-8"
                      style={{ border: "none" }}
                    >
                    </div>
                    <div className="col-4">
                      <Search search={search} setSearch={setSearch} />
                    </div>
                  </div>
                </div>
                {!loading && (
                  <>
                    <div className="table-section">
                      <div className="row">
                        <AdminTable
                          tableClesses={"table-stripes bktables"}
                          headers={headers}
                          showHeaders={true}
                          data={data}
                          search={search}
                          setSearch={setSearch}
                          Row={({ index, rowData }) => {
                            return (
                              <tr key={index}>
                                <td style={{ width: "auto"}}>
                                  {rowData.original.couponcode}
                                </td>
                                <td style={{ wordBreak: "break-all" }}>
                                  {rowData.original.description ? rowData.original.description : "N/A"}
                                </td>
                                <td>
                                  {
                                    rowData.original.usedfor === "StandardPlan" ? "Standard (Monthly)" :
                                    rowData.original.usedfor === "PlusPlan" ? "Plus Plan (Monthly)" :
                                    rowData.original.usedfor === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                    rowData.original.usedfor === "StandardPlanAnnual" ? "Standard (Annual)" :
                                    rowData.original.usedfor === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                    rowData.original.usedfor === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                    rowData.original.usedfor === "DevTestPlan" ? "Dev Test Plan" : ""
                                  }
                                </td>
                                <td>{moment(rowData.original.expirydate).format("MM/DD/YYYY")}</td>
                                <td>{rowData.original.nooftimesused ? rowData.original.nooftimesused : 0}/{rowData.original.noofcustomers}</td>
                                <td>
                                  <div className="view_icon_users">
                                    <Link
                                      to={`/gi-team/view-subscription-coupon/${rowData.original.id}`}
                                    >
                                      <img src={vision} />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          }}
                        />
                      </div>
                    </div>
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

export default withRouter(SubscriptionCoupons);