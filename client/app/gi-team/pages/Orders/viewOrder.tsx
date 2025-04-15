import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import AdminTable from "../../components/TableExtra";
import history from "../../../../utils/history";
import queryString from "query-string";
import moment from "moment";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import { 
  GetAllOrders,
  UpdateOrder,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import date from "assets/date.svg";
import money from "assets/money.svg";
import user from "assets/user.svg";
import phone from "assets/phone.svg";
import edit from "assets/Edit_Role.svg";
import save from "assets/Save_Role.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

const ViewOrder = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllOrders().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (order) => order.ordernumber === parseInt(props.match.params.ordernumber)
        )[0];
        if (x == undefined) {
          history.push("/gi-team/orders");
        }
        setData(x);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  function update () {
    GetAllOrders().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (order) => order.ordernumber === parseInt(props.match.params.ordernumber)
        )[0];
        setData(x);
      }
    });
  };

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  };

  const [headers, setHeaders] = useState([
    {
      Header: "First Name",
      accessor: false,
    },
    {
      Header: "Last Name",
      accessor: false,
    },
    {
      Header: "Email",
      accessor: false,
    },
    {
      Header: "Attendance",
      accessor: false,
    },
  ]);

  const [editStatus, setEditStatus] = useState(false);
  const [statusTable, setStatusTable] = useState(false);
  const [status, setStatus] = useState("");

  const [orderStatus, setOrderStatus] = useState({
    orderid: "",
    physicalorderstatus: "",
  });

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const payload = {
      orderid: orderStatus.orderid,
      physicalorderstatus: orderStatus.physicalorderstatus,
    };

    const stringified = queryString.stringify(payload);

    UpdateOrder(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setOrderStatus({
          orderid: "",
          physicalorderstatus: "",
        });
        setEditStatus(false);
        update();
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> 
          View Order - Actionable Insights Admin
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
                    {!loading && (
                      <>
                        <h3 className="heading">
                          #{data.ordernumber}
                        </h3>
                        {editStatus ? (
                          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6 edit-order-status">
                            <div className="form-holder nogroup">
                              <input
                                onClick={(e) => setStatusTable(!statusTable)}
                                value={status == "Payment_Received" ? "Payment Received" : status}
                                type="text"
                                name="Catagory"
                                required
                                id="inputField3"
                                className="input-area"
                              />
                              <label className="file_input_label">
                                {statusTable ? (
                                  <img
                                    className="select size"
                                    src={up}
                                    onClick={() => setStatusTable(!statusTable)}
                                  />
                                ) : (
                                  <img
                                    className="select size"
                                    src={down}
                                    onClick={() => setStatusTable(!statusTable)}
                                  />
                                )}
                              </label>
                              <div className={statusTable ? "active" : "dropdown-content"}>
                                <div>
                                  <h3
                                    onClick={(e) => {
                                      setStatus(e.currentTarget.innerHTML);
                                      setStatusTable(!statusTable);
                                      setOrderStatus({
                                        ...orderStatus,
                                        orderid: data.ordernumber,
                                        physicalorderstatus: "Payment_Received",
                                      });
                                    }}
                                  >
                                    Payment Received
                                  </h3>
                                  <h3
                                    onClick={(e) => {
                                      setStatus(e.currentTarget.innerHTML);
                                      setStatusTable(!statusTable);
                                      setOrderStatus({
                                        ...orderStatus,
                                        orderid: data.ordernumber,
                                        physicalorderstatus: "Shipped",
                                      });
                                    }}
                                  >
                                    Shipped
                                  </h3>
                                  <h3
                                    onClick={(e) => {
                                      setStatus(e.currentTarget.innerHTML);
                                      setStatusTable(!statusTable);
                                      setOrderStatus({
                                        ...orderStatus,
                                        orderid: data.ordernumber,
                                        physicalorderstatus: "Delivered",
                                      });
                                    }}
                                  >
                                    Delivered
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="status_published">
                            <span> {data.physicalorderstatus == null ? "Payment Received" : data.physicalorderstatus == "Payment_Received" ? "Payment Received" : data.physicalorderstatus} </span>
                          </div>
                        )}
                        {localStorage.getItem("role") == "Analyst" ? (
                          ""
                        ) : (
                          <>
                            {editStatus ? (
                              <img
                                className="save-icon"
                                src={save}
                                onClick={(e) => handleSubmitEdit(e)}
                              />
                            ) : (
                              <>
                                {data.catagory == "Swag" || data.catagory == "Gift Cards" || data.catagory == "Umpire's Manual" ? (
                                  <img
                                    className="edit-icon"
                                    src={edit}
                                    onClick={() => {
                                      setEditStatus(true);
                                      setStatus(data.physicalorderstatus);
                                      setOrderStatus({
                                        ...orderStatus,
                                        orderid: data.ordernumber,
                                        physicalorderstatus: data.physicalorderstatus,
                                      });
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/orders"
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
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date orders_coupon_insighterpoints">
                            <img src={money} /> 
                            <p className="price"> Price </p>
                            <div style={{ margin: "10px 0px" }}>
                              <h1 className="price-value">
                                <NumberFormat
                                  value={(data.pricepaidincents / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </h1>
                              {data.orignalprice == data.pricepaidincents ? (
                                ""
                              ) : (
                                <h2 className="price-discount"> 
                                  <del> 
                                    <NumberFormat
                                      value={(data.orignalprice / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </del> 
                                </h2>
                              )}
                            </div>
                            {data.couponcodeapplied && !data.insighterpointsused ? (
                              <h3 className="discount-detail">
                                -
                                <NumberFormat
                                  value={(data.amountreduced / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                                &nbsp;discount from coupon({data.couponcodeapplied})
                              </h3>
                            ) : (
                              ""
                            )}
                            {data.insighterpointsused && !data.couponcodeapplied ? (
                              <h3 className="discount-detail">
                                Insighter Points: {data.insighterpointsused}
                              </h3>
                            ) : (
                              ""
                            )}
                            {data.insighterpointsused && data.couponcodeapplied ? (
                              <>
                                <h3 className="discount-detail">
                                  -
                                  <NumberFormat
                                    value={(data.amountreduced / 100).toFixed(2)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                  &nbsp;discount from
                                  <br />
                                  Coupon: {data.couponcodeapplied}
                                </h3>
                                <h3 className="discount-detail" style={{ marginTop: "5px" }}>
                                  Insighter Points: {data.insighterpointsused}
                                </h3>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date orders_coupon_insighterpoints">
                            <img src={user} />
                            <h5> User Name </h5>
                            <h4> {data.customerownername ? data.customerownername : "N/A"} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date orders_coupon_insighterpoints">
                            <img src={date} />
                            <h5> Date </h5>
                            <h4> {moment(data.orderplacedon).format("MM/DD/YYYY")} </h4>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <div className="coupon-date orders_coupon_insighterpoints">
                            <img src={phone} />
                            <h5> Phone Number </h5>
                            <h4> {data.customerownerphone ? data.customerownerphone : "N/A"} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Product Title </h3>
                          <h2 className="value"> {data.producttitle ? data.producttitle : "N/A"} </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Order Number </h3>
                          <h2 className="value"> #{data.ordernumber} </h2>
                        </div>
                        {data.catagory == "Event" || data.catagory == "Insighter Points" || data.catagory == "Soldidfai Analysis" || data.catagory == "Macro" || data.catagory == "Certification" ? (
                          ""
                        ) : (
                          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <h3 className="heading"> Quantity </h3>
                            <h2 className="value"> {data.quantity ? data.quantity : "N/A"} </h2>
                          </div>
                        )}
                        {data.catagory == "Event" || data.catagory == "Insighter Points" || data.catagory == "Soldidfai Analysis" || data.catagory == "Macro" || data.catagory == "Certification" ? (
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6">
                            <h3 className="heading"> Email </h3>
                            <h2 className="value" style={{ wordBreak: "break-all" }}> {data.customerowneremail} </h2>
                          </div>
                        ) : (
                          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <h3 className="heading"> Email </h3>
                            <h2 className="value" style={{ wordBreak: "break-all" }}> {data.customerowneremail} </h2>
                          </div>
                        )}
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Category </h3>
                          <h2 className="value"> {data.catagory ? data.catagory : "N/A"} </h2>
                        </div>
                        {data.catagory == "Swag" && (
                          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <h3 className="heading"> Size </h3>
                            <h2 className="value"> {data.swagproductsize ? data.swagproductsize : "N/A"} </h2>
                          </div>
                        )}
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Company Name </h3>
                          <h2 className="value">
                            {data.contactinformationfororder ? data.contactinformationfororder.companyname ? data.contactinformationfororder.companyname : "N/A" : "N/A"}
                          </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Street Address </h3>
                          <h2 className="value">
                            {data.contactinformationfororder ? data.contactinformationfororder.streetaddress ? data.contactinformationfororder.streetaddress : "N/A" : "N/A"}
                          </h2>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Apt., Unit, or Suite # </h3>
                          <h2 className="value">
                            {data.contactinformationfororder ? data.contactinformationfororder.aptorunitorsuite ? data.contactinformationfororder.aptorunitorsuite : "N/A" : "N/A"}
                          </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> City </h3>
                          <h2 className="value">
                            {data.contactinformationfororder ? data.contactinformationfororder.city ? data.contactinformationfororder.city : "N/A" : "N/A"}
                          </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> State </h3>
                          <h2 className="value">
                            {data.contactinformationfororder ? data.contactinformationfororder.state ? data.contactinformationfororder.state : "N/A" : "N/A"}
                          </h2>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                          <h3 className="heading"> Zip Code </h3>
                          <h2 className="value">
                            {data.contactinformationfororder ? data.contactinformationfororder.zipcode ? data.contactinformationfororder.zipcode : "N/A" : "N/A"}
                          </h2>
                        </div>
                      </div>
                      {data.catagory == "Event" && (
                        <div className="row" style={{ marginTop: "50px" }}>
                          <div className="col-12">
                            <h4 className="images"> Attendees Detail </h4>
                            <div className="sizes-view">
                              <AdminTable
                                tableClesses={"event-attendees-table"}
                                headers={headers}
                                showHeaders={true}
                                data={data.attendees}
                                Row={({ index, rowData }) => {
                                  return (
                                    <tr key={index}>
                                      <td> {rowData.original.attendeefirstname ? rowData.original.attendeefirstname : "N/A"} </td>
                                      <td> {rowData.original.attendeelastname ? rowData.original.attendeelastname : "N/A"} </td>
                                      <td> {rowData.original.attendeeemail ? rowData.original.attendeeemail : "N/A"} </td>
                                      <td> {rowData.original.attendance ? rowData.original.attendance : "N/A"} </td>
                                    </tr>
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {data.catagory == "Gift Cards" && (
                        <>
                          <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-9">
                              <h4 className="images"> Extras </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                              <h3 className="heading"> Subscription Plan </h3>
                              <h2 className="value"> {data.giftcardplanname ? data.giftcardplanname.replace("Plan", " Plan") : "N/A"} </h2>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                              <h3 className="heading"> Duration </h3>
                              <h2 className="value"> {data.giftcarddurationinmonths ? `${data.giftcarddurationinmonths} Months` : "N/A"} </h2>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                              <h3 className="heading"> Logo </h3>
                              <div className="row images-inner">
                                <div className="col-2 image-1">
                                  <img src={data.giftcardlogo} />
                                </div>
                                <div className="col-9 name">
                                  <h5> {data.giftcardlogo ? parse(data.giftcardlogo.replace("https://getinsights2-data.s3.amazonaws.com/", "")) : "N/A"} </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                              <h3 className="heading"> Memo </h3>
                              <h2 className="value"> {data.giftcardmemo} </h2>
                            </div>
                          </div>
                        </>
                      )}
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

export default withRouter(ViewOrder);