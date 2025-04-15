import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
import AdminTable from "../../components/Table";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { Helmet } from "react-helmet";
import {
  getCustomerSubscriptionHistory,
  getCustomerOrderTransactionsHistoryAdmin,
  getCustomerRefundHistoryAdmin,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import download from "assets/DownloadAdmin.svg";
import Refund from "assets/Refund-Red.svg";

const ViewTransactionHistory = (props) => {

  const currDate = new Date().toLocaleString();
  const currDateMoment = `${moment(currDate).format("YYYY-MM-DD")}`;

  const [loading, setLoading] = useState(true);

  const [headers, setHeaders] = useState([
    {
      Header: "Price",
      accessor: "title",
    },
    {
      Header: "Date",
      accessor: "location",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [headersRefund, setHeadersRefund] = useState([
    {
      Header: "Price",
      accessor: "title",
    },
    {
      Header: "Category",
      accessor: false,
    },
    {
      Header: "Date",
      accessor: "location",
    },
    {
      Header: "Notes",
      accessor: false,
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [active, setActive] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
  });

  const [subscriptionHistoryData, setSubscriptionHistoryData] = useState([]);
  const [macrosHistoryData, setMacrosHistoryData] = useState([]);
  const [subusersHistoryData, setSubusersHistoryData] = useState([]);
  const [eventsHistoryData, setEventsHistoryData] = useState([]);
  const [swagsHistoryData, setSwagsHistoryData] = useState([]);
  const [certificationsHistoryData, setCertificationsHistoryData] = useState([]);
  const [giftsHistoryData, setGiftsHistoryData] = useState([]);
  const [umpireHistoryData, setUmpireHistoryData] = useState([]);
  const [pointsHistoryData, setPointsHistoryData] = useState([]);
  const [refundsHistoryData , setRefundsHistoryData] = useState([]);

  useEffect(() => {
    getCustomerSubscriptionHistory(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        setSubscriptionHistoryData(response.response.data);
        const payloadMacro = {
          orderType: "Macro",
          customerId: props.match.params.id,
        };
        const stringifiedMacro = queryString.stringify(payloadMacro);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedMacro).subscribe((response) => {
          if (response.response.Requested_Action) {
            setMacrosHistoryData(response.response.data);
          } else {
            setMacrosHistoryData([]);
          }
        });
        const payloadEvent = {
          orderType: "Event",
          customerId: props.match.params.id,
        };
        const stringifiedEvent = queryString.stringify(payloadEvent);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedEvent).subscribe((response) => {
          if (response.response.Requested_Action) {
            setEventsHistoryData(response.response.data);
          } else {
            setEventsHistoryData([]);
          }
        });
        const payloadSubUsers = {
          orderType: "Sub Users",
          customerId: props.match.params.id,
        };
        const stringifiedSubUsers = queryString.stringify(payloadSubUsers);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedSubUsers).subscribe((response) => {
          if (response.response.Requested_Action) {
            setSubusersHistoryData(response.response.data);
          } else {
            setSubusersHistoryData([]);
          }
        });
        const payloadSwag = {
          orderType: "Swag",
          customerId: props.match.params.id,
        };
        const stringifiedSwag = queryString.stringify(payloadSwag);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedSwag).subscribe((response) => {
          if (response.response.Requested_Action) {
            setSwagsHistoryData(response.response.data);
          } else {
            setSwagsHistoryData([]);
          }
        });
        const payloadCertification = {
          orderType: "Certification",
          customerId: props.match.params.id,
        };
        const stringifiedCertification = queryString.stringify(payloadCertification);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedCertification).subscribe((response) => {
          if (response.response.Requested_Action) {
            setCertificationsHistoryData(response.response.data);
          } else {
            setCertificationsHistoryData([]);
          }
        });
        const payloadGifts = {
          orderType: "Gifts",
          customerId: props.match.params.id,
        };
        const stringifiedGifts = queryString.stringify(payloadGifts);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedGifts).subscribe((response) => {
          if (response.response.Requested_Action) {
            setGiftsHistoryData(response.response.data);
          } else {
            setGiftsHistoryData([]);
          }
        });
        const payloadUmpire = {
          orderType: "Umpire",
          customerId: props.match.params.id,
        };
        const stringifiedUmpire = queryString.stringify(payloadUmpire);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedUmpire).subscribe((response) => {
          if (response.response.Requested_Action) {
            setUmpireHistoryData(response.response.data);
          } else {
            setUmpireHistoryData([]);
          }
        });
        const payloadPoints = {
          orderType: "Insighter_Points",
          customerId: props.match.params.id,
        };
        const stringifiedPoints = queryString.stringify(payloadPoints);
        getCustomerOrderTransactionsHistoryAdmin(stringifiedPoints).subscribe((response) => {
          if (response.response.Requested_Action) {
            setPointsHistoryData(response.response.data);
          } else {
            setPointsHistoryData([]);
          }
        });
        getCustomerRefundHistoryAdmin(props.match.params.id).subscribe((response) => {
          if (response.response.Requested_Action) {
            setRefundsHistoryData(response.response.data);
          } else {
            setRefundsHistoryData([]);
          }
        });
        setLoading(false);
      } else {
        setSubscriptionHistoryData([]);
      }
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> 
          Transaction History - Actionable Insights Admin
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
                    <h3 className="heading">
                      Transaction History
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/view-subscription/${props.match.params.id}`}>
                      <img src={back}/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="inner_sub_area">
                  <div className="row">
                    <div className="col-12" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1019607843)" }}>
                      <ul className="subs_filters">
                        <li
                          className={active.one == true ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: true,
                              two: false,
                              three: false,
                              four: false,
                              five: false,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Subscription
                        </li>
                        <li
                          className={active.two == true ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: true,
                              three: false,
                              four: false,
                              five: false,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Macros
                        </li>
                        <li
                          className={active.three ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: true,
                              four: false,
                              five: false,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Sub Users
                        </li>
                        <li
                          className={active.four ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: true,
                              five: false,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Events
                        </li>
                        <li
                          className={active.five ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: false,
                              five: true,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Swags
                        </li>
                        <li
                          className={active.six ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: false,
                              five: false,
                              six: true,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Certifications
                        </li> 
                        <li
                          className={active.seven ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: false,
                              five: false,
                              six: false,
                              seven: true,
                              eight: false,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Gifts
                        </li>    
                        <li
                          className={active.eight ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: false,
                              five: false,
                              six: false,
                              seven: false,
                              eight: true,
                              nine: false,
                              ten: false,
                            })
                          }
                        >
                          Umpires Manual
                        </li>   
                        {/* <li
                          className={active.nine ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: false,
                              five: false,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: true,
                              ten: false,
                            })
                          }
                        >
                          Insighter Points
                        </li>     */}
                        <li
                          className={active.ten ? "active" : ""}
                          onClick={() =>
                            setActive({
                              one: false,
                              two: false,
                              three: false,
                              four: false,
                              five: false,
                              six: false,
                              seven: false,
                              eight: false,
                              nine: false,
                              ten: true,
                            })
                          }
                        >
                          Refunds
                        </li>    
                      </ul>
                    </div>
                  </div>
                </div>
                {!loading && (
                  <>
                    {active.one && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={subscriptionHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${(rowData.original.chargedamountincents / 100).toFixed(2)} </td>
                                  <td> {moment(rowData.original.createdAt).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.refundCompleted ? (
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip id="refund-tooltip">
                                              Refund successfully completed. No further action required.
                                            </Tooltip>
                                          }
                                          flip
                                          delay={{ show: 100, hide: 0 }}
                                        >
                                          <img
                                            src={Refund}
                                            style={{
                                              opacity: "0.5",
                                              cursor: "initial",
                                              marginRight: "10px",
                                            }}
                                          />
                                        </OverlayTrigger>
                                      ) : rowData.original.paymentintentid ? (
                                        <Link
                                          to={{
                                            pathname: `/gi-team/refund-subscription/${props.match.params.id}`,
                                            state: {
                                              history: rowData.original,
                                            },
                                          }}
                                          style={{ marginRight: "10px" }}
                                        >
                                          <img src={Refund} />
                                        </Link>
                                      ) : (
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip id="refund-tooltip">
                                              Refund unavailable: Payment intent not found.
                                            </Tooltip>
                                          }
                                          flip
                                          delay={{ show: 100, hide: 0 }}
                                        >
                                          <img
                                            src={Refund}
                                            style={{
                                              opacity: "0.5",
                                              cursor: "initial",
                                              marginRight: "10px",
                                            }}
                                          />
                                        </OverlayTrigger>
                                      )}
                                      {rowData.original.recipturl != null && (
                                        <a target="_blank" href={rowData.original.recipturl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.two && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={macrosHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.three && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={subusersHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.four && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={eventsHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.five && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={swagsHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.six && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={certificationsHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.seven && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={giftsHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {active.eight && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={umpireHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {/* {active.nine && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={pointsHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )} */}
                    {active.ten && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headersRefund}
                            showHeaders={true}
                            data={refundsHistoryData}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td> ${rowData.original.price} </td>
                                  <td> {rowData.original.category} </td>
                                  <td> {moment(rowData.original.date).format("MMM DD - YYYY")} </td>
                                  <td> {rowData.original.notes} </td>
                                  <td style={{ paddingLeft: "15px" }}>
                                    <div className="view_icon_users">
                                      {rowData.original.receiptUrl != null && (
                                        <a target="_blank" href={rowData.original.receiptUrl}>
                                          <img
                                            style={{ width: "auto" }}
                                            src={download}
                                          />
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }}
                          />
                        </div>
                      </div>
                    )}
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

export default withRouter(ViewTransactionHistory);