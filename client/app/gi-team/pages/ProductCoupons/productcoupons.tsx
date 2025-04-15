import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import couponsred from "assets/CouponsRed.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import moment from "moment";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import { getAllProductCoupon } from "../../../../utils/api-routes/api-routes.util";

const ProductCoupons = (props) => {

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
      Header: "Expiration Date",
      accessor: "expirydate",
    },
    {
      Header: "Usage/Limit",
      accessor: "maxusagecount",
    },
    {
      Header: "Discount Percentage",
      accessor: "offpercentage",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllProductCoupon().subscribe((response) => {
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
          Product Coupons - Actionable Insights Admin
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
                      <img src={couponsred} />
                    </div>
                    <h3 className="heading">
                      Product Coupons
                    </h3>
                  </div>
                  {localStorage.getItem("role") == "Analyst" ? (
                    ""
                  ) : (
                    <div className="col-3 text-right">
                      <Link
                        className="btn"
                        to="/gi-team/create-product-coupon"
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
                                  {rowData.original.description}
                                </td>
                                <td>{moment(rowData.original.expiry).format("MM/DD/YYYY")}</td>
                                <td>{rowData.original.nooftimesused ? rowData.original.nooftimesused : 0}/{rowData.original.maxusagecount}</td>
                                <td>
                                  {rowData.original.offpercentage 
                                    ? 
                                    `${rowData.original.offpercentage}%`
                                    : 
                                    <NumberFormat
                                      value={(rowData.original.subtractfixedamount / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  }
                                </td>
                                <td>
                                  <div className="view_icon_users">
                                    <Link
                                      to={`/gi-team/view-product-coupon/${rowData.original.id}`}
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

export default withRouter(ProductCoupons);