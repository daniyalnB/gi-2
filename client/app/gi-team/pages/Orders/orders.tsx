import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import AdminTableCheckbox from "../../components/TableCheckbox";
import queryString from "query-string";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import {
  GetAllOrders,
  UpdateOrder,
} from "../../../../utils/api-routes/api-routes.util";
import ordersred from "assets/OrdersRed.svg";
import vision from "assets/visibility.svg";
import edit from "assets/Edit_Role.svg";
import save from "assets/Save_Role.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import Refund from "assets/Refund-Red.svg";

const Orders = (props) => {

  const currDate = new Date().toLocaleString();
  const currDateMoment = `${moment(currDate).format("YYYY-MM-DD")}`;

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState({
    All: true,
    Physical_Items: false,
    Virtual_Items: false,
  });

  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("role") == "Analyst") {
      setHeaders([
        {
          Header: "Order Number",
          accessor: "ordernumber",
        },
        {
          Header: "Email",
          accessor: "customerowneremail",
        },
        {
          Header: "Date",
          accessor: "orderplacedon",
        },
        {
          Header: "Category",
          accessor: "catagory",
        },
        {
          Header: "Price",
          accessor: "pricepaidincents",
        },
        {
          Header: "Status",
          accessor: "physicalorderstatus",
        },
        {
          Header: "Action",
          accessor: false,
        },
      ]);
    } else {
      setHeaders([
        {
          Header: "Order Number",
          accessor: "ordernumber",
        },
        {
          Header: "Email",
          accessor: "customerowneremail",
        },
        {
          Header: "Date",
          accessor: "orderplacedon",
        },
        {
          Header: "Category",
          accessor: "catagory",
        },
        {
          Header: "Price",
          accessor: "pricepaidincents",
        },
        {
          Header: "Status",
          accessor: "physicalorderstatus",
        },
        {
          Header: "Edit",
          accessor: false,
        },
        {
          Header: "Action",
          accessor: false,
        },
      ]);
    }
    if (localStorage.getItem("activeTab")) {
      setActiveTab(JSON.parse(localStorage.getItem("activeTab")));
    } else {
      localStorage.setItem(
        "activeTab",
        JSON.stringify({
          All: true,
          Physical_Items: false,
          Virtual_Items: false,
        })
      );
    }
  }, []);

  const columns = [
    {
      Header: "Order Number",
      accessor: "ordernumber",
      Cell: ({ row }) => {
        const data = row.original;
        return <div style={{ width: "auto" }}>#{data.ordernumber}</div>;
      },
    },
    {
      Header: "Email",
      accessor: "customerowneremail",
      Cell: ({ row }) => {
        const data = row.original;
        return <div className="order-email">{data.customerowneremail}</div>;
      },
    },
    {
      Header: "Date",
      accessor: "orderplacedon",
      Cell: ({ row }) => {
        const data = row.original;
        return <div>{moment(data.orderplacedon).format("MM/DD/YYYY")}</div>;
      },
    },
    {
      Header: "Category",
      accessor: "catagory",
      Cell: ({ row }) => {
        const data = row.original;
        return <div>{data.catagory ? data.catagory : "N/A"}</div>;
      },
    },
    {
      Header: "Price",
      accessor: "pricepaidincents",
      Cell: ({ row }) => {
        const data = row.original;
        return (
          <NumberFormat
            value={(data.pricepaidincents / 100).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        );
      },
    },
    {
      Header: "Status",
      accessor: "physicalorderstatus",
      Cell: ({ row }) => {
        const data = row.original;
        return (
          <div key={statusTable}>
            {editStatusPhysical && data.ordernumber == id ? (
              <div key={statusTable}>
                <div className="col-12 edit-role">
                  <div className="form-holder nogroup">
                    <input
                      onClick={(e) => setStatusTable(!statusTable)}
                      value={
                        status == "Payment_Received"
                          ? "Payment Received"
                          : status
                      }
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
                    <div
                      className={statusTable ? "active" : "dropdown-content"}
                    >
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
              </div>
            ) : (
              <div>
                {data.physicalorderstatus == null
                  ? "Payment Received"
                  : data.physicalorderstatus == "Payment_Received"
                  ? "Payment Received"
                  : data.physicalorderstatus}
              </div>
            )}
          </div>
        );
      },
    },
    {
      Header: "Edit",
      accessor: false,
      Cell: ({ row }) => {
        const data = row.original;
        return (
          <>
            {localStorage.getItem("role") == "Analyst" ? (
              ""
            ) : (
              <>
                {editStatusPhysical && data.ordernumber == id ? (
                  <div className="view_icon_users">
                    <img src={save} onClick={(e) => handleSubmitEdit(e)} />
                  </div>
                ) : (
                  <>
                    {data.catagory == "Swag" ||
                    data.catagory == "Gift Cards" ||
                    data.catagory == "Umpire's Manual" ? (
                      <div className="view_icon_users">
                        <img
                          src={edit}
                          onClick={() => {
                            setEditStatusPhysical(true);
                            setId(data.ordernumber);
                            setStatus(data.physicalorderstatus);
                            setOrderStatus({
                              ...orderStatus,
                              orderid: data.ordernumber,
                              physicalorderstatus: data.physicalorderstatus,
                            });
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </>
            )}
          </>
        );
      },
    },
    {
      Header: "Action",
      accessor: false,
      Cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="view_icon_users">
            {data.refundCompleted ? (
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
            ) : data.paymentIntentId ? (
              <Link
                to={`/gi-team/refund-order/${data.ordernumber}`}
                target="_blank"
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
            <Link
              to={`/gi-team/view-order/${data.ordernumber}`}
              target="_blank"
            >
              <img src={vision} />
            </Link>
          </div>
        );
      },
    },
  ];

  const [search, setSearch] = useState("");

  const [all, setAll] = useState([]);
  const [allShipped, setAllShipped] = useState([]);
  const [allPaymentReceived, setAllPaymentReceived] = useState([]);

  const [physicalItems, setPhysicalItems] = useState([]);
  const [physicalItemsShipped, setPhysicalItemsShipped] = useState([]);
  const [physicalItemsPaymentReceived, setPhysicalItemsPaymentReceived] = useState([]);

  const [virtualItems, setVirtualItems] = useState([]);
  const [virtualItemsShipped, setVirtualItemsShipped] = useState([]);
  const [virtualItemsPaymentReceived, setVirtualItemsPaymentReceived] = useState([]);

  const [shipped, setShipped] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(false);

  useEffect(() => {
    GetAllOrders().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.map((val) => ({
          ...val,
          disabled:
            val.physicalorderstatus === "Payment_Received" ? false : true,
        }));
        setAll(x);
        setAllShipped(
          x.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setAllPaymentReceived(
          x.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        const y = x.filter(
          (cat) =>
            cat.catagory == "Swag" ||
            cat.catagory == "Gift Cards" ||
            cat.catagory == "Umpire's Manual"
        );
        setPhysicalItems(y);
        setPhysicalItemsShipped(
          y.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setPhysicalItemsPaymentReceived(
          y.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        const z = x.filter(
          (cat) =>
            cat.catagory == "Insighter Points" ||
            cat.catagory == "Macro" ||
            cat.catagory == "Event" ||
            cat.catagory == "Solidifai Analysis" ||
            cat.catagory == "Certification"
        );
        setVirtualItems(z);
        setVirtualItemsShipped(
          z.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setVirtualItemsPaymentReceived(
          z.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

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
        setEditStatusPhysical(false);
        update();
      }
    });
  };

  function update() {
    GetAllOrders().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.map((val) => ({
          ...val,
          disabled:
            val.physicalorderstatus === "Payment_Received" ? false : true,
        }));
        setAll(x);
        setAllShipped(
          x.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setAllPaymentReceived(
          x.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        const y = x.filter(
          (cat) =>
            cat.catagory == "Swag" ||
            cat.catagory == "Gift Cards" ||
            cat.catagory == "Umpire's Manual"
        );
        setPhysicalItems(y);
        setPhysicalItemsShipped(
          y.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setPhysicalItemsPaymentReceived(
          y.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        const z = x.filter(
          (cat) =>
            cat.catagory == "Insighter Points" ||
            cat.catagory == "Macro" ||
            cat.catagory == "Event" ||
            cat.catagory == "Solidifai Analysis" ||
            cat.catagory == "Certification"
        );
        setVirtualItems(z);
        setVirtualItemsShipped(
          z.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setVirtualItemsPaymentReceived(
          z.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
      }
    });
  }

  const [editStatus, setEditStatus] = useState(false);
  const [editStatusPhysical, setEditStatusPhysical] = useState(false);
  const [statusTable, setStatusTable] = useState(false);
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  const [orderIds, setOrderIds] = useState([]);

  function handleSetOrderIds(newValue) {
    setOrderIds(newValue);
  }

  const [orderMsgs, setOrderMsgs] = useState([]);

  let NoOfOrders = 0;

  const [updateOrdersLoading, setupdateOrdersLoading] = useState(false);

  const handleUpdateOrder = () => {
    setupdateOrdersLoading(true);

    if (NoOfOrders === orderIds.length) {
      setOrderIds([]);
      update_Orders();
    } else {
      updateOrder(NoOfOrders);
    }
  };

  const updateOrder = (i) => {
    setTimeout(() => {
      const payload = {
        orderid: orderIds[i],
        physicalorderstatus: "Shipped",
      };

      const stringified = queryString.stringify(payload);

      UpdateOrder(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {
          const x = response.response.Message;
          setOrderMsgs((orderMsgs) => [...orderMsgs, x]);
          NoOfOrders++;
          handleUpdateOrder();
        } else {
          const x = response.response.Message;
          setOrderMsgs((orderMsgs) => [...orderMsgs, x]);
          NoOfOrders++;
          handleUpdateOrder();
        }
      });
    }, 1000);
  };

  function update_Orders() {
    GetAllOrders().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.map((val) => ({
          ...val,
          disabled:
            val.physicalorderstatus === "Payment_Received" ? false : true,
        }));
        setAll(x);
        setAllShipped(
          x.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setAllPaymentReceived(
          x.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        const y = x.filter(
          (cat) =>
            cat.catagory == "Swag" ||
            cat.catagory == "Gift Cards" ||
            cat.catagory == "Umpire's Manual"
        );
        setPhysicalItems(y);
        setPhysicalItemsShipped(
          y.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setPhysicalItemsPaymentReceived(
          y.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        const z = x.filter(
          (cat) =>
            cat.catagory == "Insighter Points" ||
            cat.catagory == "Macro" ||
            cat.catagory == "Event" ||
            cat.catagory == "Solidifai Analysis" ||
            cat.catagory == "Certification"
        );
        setVirtualItems(z);
        setVirtualItemsShipped(
          z.filter((status) => status.physicalorderstatus == "Shipped")
        );
        setVirtualItemsPaymentReceived(
          z.filter((status) => status.physicalorderstatus == "Payment_Received")
        );
        setupdateOrdersLoading(false);
      }
    });
  };

  return (
    <div key={`${id}` + `${statusTable} + ${editStatusPhysical}`}>
      <Helmet>
        <title>Orders - Actionable Insights Admin</title>
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
                      <img src={ordersred} />
                    </div>
                    <h3 className="heading">Orders</h3>
                  </div>
                </div>
                <hr />
                <div className="inner_sub_area">
                  <div className="row">
                    <div className="col-8">
                      <ul className="subs_filters">
                        <li
                          className={activeTab.All == true ? "active" : ""}
                          onClick={() => {
                            setActiveTab({
                              All: true,
                              Physical_Items: false,
                              Virtual_Items: false,
                            });
                            setShipped(false);
                            setPaymentReceived(false);
                            localStorage.setItem(
                              "activeTab",
                              JSON.stringify({
                                All: true,
                                Physical_Items: false,
                                Virtual_Items: false,
                              })
                            );
                          }}
                        >
                          All ({all.length})
                        </li>
                        <li
                          className={
                            activeTab.Physical_Items == true ? "active" : ""
                          }
                          onClick={() => {
                            setActiveTab({
                              All: false,
                              Physical_Items: true,
                              Virtual_Items: false,
                            });
                            setShipped(false);
                            setPaymentReceived(false);
                            localStorage.setItem(
                              "activeTab",
                              JSON.stringify({
                                All: false,
                                Physical_Items: true,
                                Virtual_Items: false,
                              })
                            );
                          }}
                        >
                          Physical Items ({physicalItems.length})
                        </li>
                        <li
                          className={
                            activeTab.Virtual_Items == true ? "active" : ""
                          }
                          onClick={() => {
                            setActiveTab({
                              All: false,
                              Physical_Items: false,
                              Virtual_Items: true,
                            });
                            setShipped(false);
                            setPaymentReceived(false);
                            localStorage.setItem(
                              "activeTab",
                              JSON.stringify({
                                All: false,
                                Physical_Items: false,
                                Virtual_Items: true,
                              })
                            );
                          }}
                        >
                          Virtual Items ({virtualItems.length})
                        </li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <Search search={search} setSearch={setSearch} />
                    </div>
                  </div>
                </div>
                {!loading && (
                  <>
                    {activeTab.All && (
                      <>
                        <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3">
                              <input
                                type="checkbox"
                                id="allShipped"
                                checked={shipped}
                              />
                              <label
                                htmlFor="allShipped"
                                onClick={() => setShipped(!shipped)}
                              >
                                Shipped ({allShipped.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5">
                              <input
                                type="checkbox"
                                id="allPaymentReceived"
                                checked={paymentReceived}
                              />
                              <label
                                htmlFor="allPaymentReceived"
                                onClick={() =>
                                  setPaymentReceived(!paymentReceived)
                                }
                              >
                                Payment Received ({allPaymentReceived.length})
                              </label>
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-3 col-sm-3 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setShipped(false);
                                    setPaymentReceived(false);
                                  }}
                                >
                                  Clear
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="table-section">
                          <div className="row">
                            <AdminTable
                              tableClesses={"table-stripes bktables"}
                              headers={headers}
                              showHeaders={true}
                              data={
                                shipped && !paymentReceived
                                  ? allShipped
                                  : paymentReceived && !shipped
                                  ? allPaymentReceived
                                  : all
                              }
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td style={{ width: "auto" }}>
                                      #{rowData.original.ordernumber}
                                    </td>
                                    <td className="order-email">
                                      {rowData.original.customerowneremail}
                                    </td>
                                    <td>
                                      {moment(
                                        rowData.original.orderplacedon
                                      ).format("MM/DD/YYYY")}
                                    </td>
                                    <td>
                                      {rowData.original.catagory
                                        ? rowData.original.catagory
                                        : "N/A"}
                                    </td>
                                    <td>
                                      <NumberFormat
                                        value={(
                                          rowData.original.pricepaidincents /
                                          100
                                        ).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                      />
                                    </td>
                                    {editStatus &&
                                    rowData.original.ordernumber == id ? (
                                      <td style={{ padding: "10px 0px" }}>
                                        <div className="col-12 edit-role">
                                          <div className="form-holder nogroup">
                                            <input
                                              onClick={(e) =>
                                                setStatusTable(!statusTable)
                                              }
                                              value={
                                                status == "Payment_Received"
                                                  ? "Payment Received"
                                                  : status
                                              }
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
                                                  onClick={() =>
                                                    setStatusTable(!statusTable)
                                                  }
                                                />
                                              ) : (
                                                <img
                                                  className="select size"
                                                  src={down}
                                                  onClick={() =>
                                                    setStatusTable(!statusTable)
                                                  }
                                                />
                                              )}
                                            </label>
                                            <div
                                              className={
                                                statusTable
                                                  ? "active"
                                                  : "dropdown-content"
                                              }
                                            >
                                              <div>
                                                <h3
                                                  onClick={(e) => {
                                                    setStatus(
                                                      e.currentTarget.innerHTML
                                                    );
                                                    setStatusTable(
                                                      !statusTable
                                                    );
                                                    setOrderStatus({
                                                      ...orderStatus,
                                                      orderid:
                                                        rowData.original
                                                          .ordernumber,
                                                      physicalorderstatus:
                                                        "Payment_Received",
                                                    });
                                                  }}
                                                >
                                                  Payment Received
                                                </h3>
                                                <h3
                                                  onClick={(e) => {
                                                    setStatus(
                                                      e.currentTarget.innerHTML
                                                    );
                                                    setStatusTable(
                                                      !statusTable
                                                    );
                                                    setOrderStatus({
                                                      ...orderStatus,
                                                      orderid:
                                                        rowData.original
                                                          .ordernumber,
                                                      physicalorderstatus:
                                                        "Shipped",
                                                    });
                                                  }}
                                                >
                                                  Shipped
                                                </h3>
                                                <h3
                                                  onClick={(e) => {
                                                    setStatus(
                                                      e.currentTarget.innerHTML
                                                    );
                                                    setStatusTable(
                                                      !statusTable
                                                    );
                                                    setOrderStatus({
                                                      ...orderStatus,
                                                      orderid:
                                                        rowData.original
                                                          .ordernumber,
                                                      physicalorderstatus:
                                                        "Delivered",
                                                    });
                                                  }}
                                                >
                                                  Delivered
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    ) : (
                                      <td>
                                        {rowData.original.physicalorderstatus ==
                                        null
                                          ? "Payment Received"
                                          : rowData.original
                                              .physicalorderstatus ==
                                            "Payment_Received"
                                          ? "Payment Received"
                                          : rowData.original
                                              .physicalorderstatus}
                                      </td>
                                    )}
                                    {localStorage.getItem("role") ==
                                    "Analyst" ? (
                                      ""
                                    ) : (
                                      <>
                                        {editStatus &&
                                        rowData.original.ordernumber == id ? (
                                          <td>
                                            <div className="view_icon_users">
                                              <img
                                                src={save}
                                                onClick={(e) =>
                                                  handleSubmitEdit(e)
                                                }
                                              />
                                            </div>
                                          </td>
                                        ) : (
                                          <>
                                            {rowData.original.catagory ==
                                              "Swag" ||
                                            rowData.original.catagory ==
                                              "Gift Cards" ||
                                            rowData.original.catagory ==
                                              "Umpire's Manual" ? (
                                              <td>
                                                <div className="view_icon_users">
                                                  <img
                                                    src={edit}
                                                    onClick={() => {
                                                      setEditStatus(true);
                                                      setId(
                                                        rowData.original
                                                          .ordernumber
                                                      );
                                                      setStatus(
                                                        rowData.original
                                                          .physicalorderstatus
                                                      );
                                                      setOrderStatus({
                                                        ...orderStatus,
                                                        orderid:
                                                          rowData.original
                                                            .ordernumber,
                                                        physicalorderstatus:
                                                          rowData.original
                                                            .physicalorderstatus,
                                                      });
                                                    }}
                                                  />
                                                </div>
                                              </td>
                                            ) : (
                                              <td></td>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                    <td>
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
                                        ) : rowData.original.paymentIntentId ? (
                                          <Link
                                            to={`/gi-team/refund-order/${rowData.original.ordernumber}`}
                                            target="_blank"
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
                                        <Link
                                          to={`/gi-team/view-order/${rowData.original.ordernumber}`}
                                          target="_blank"
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
                    {activeTab.Physical_Items && (
                      <>
                        <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3">
                              <input
                                type="checkbox"
                                id="physicalItemsShipped"
                                checked={shipped}
                              />
                              <label
                                htmlFor="physicalItemsShipped"
                                onClick={() => setShipped(!shipped)}
                              >
                                Shipped ({physicalItemsShipped.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5">
                              <input
                                type="checkbox"
                                id="physicalItemsPaymentReceived"
                                checked={paymentReceived}
                              />
                              <label
                                htmlFor="physicalItemsPaymentReceived"
                                onClick={() =>
                                  setPaymentReceived(!paymentReceived)
                                }
                              >
                                Payment Received (
                                {physicalItemsPaymentReceived.length})
                              </label>
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-3 col-sm-3 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setShipped(false);
                                    setPaymentReceived(false);
                                  }}
                                >
                                  Clear
                                </span>
                              </p>
                              {!updateOrdersLoading && (
                                <button
                                  className="btn"
                                  disabled={
                                    localStorage.getItem("role") == "Analyst"
                                      ? true
                                      : orderIds.length == 0
                                      ? true
                                      : false
                                  }
                                  onClick={handleUpdateOrder}
                                >
                                  Mark as Shipped
                                </button>
                              )}
                              {updateOrdersLoading && (
                                <button className="btn" disabled>
                                  <i className="fas fa-spinner fa-spin"></i>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="table-section">
                          <div className="row">
                            <AdminTableCheckbox
                              tableClesses={
                                "table-stripes bktables table-physical-order"
                              }
                              handleSetOrderIds={handleSetOrderIds}
                              headers={columns}
                              showHeaders={true}
                              data={
                                shipped && !paymentReceived
                                  ? physicalItemsShipped
                                  : paymentReceived && !shipped
                                  ? physicalItemsPaymentReceived
                                  : physicalItems
                              }
                              search={search}
                              setSearch={setSearch}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {activeTab.Virtual_Items && (
                      <>
                        {/* <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3">
                              <input
                                type="checkbox"
                                id="virtualItemsShipped"
                                checked={shipped}
                              />
                              <label
                                htmlFor="virtualItemsShipped"
                                onClick={() => setShipped(!shipped)}
                              >
                                Shipped({virtualItemsShipped.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5">
                              <input
                                type="checkbox"
                                id="virtualItemsPaymentReceived"
                                checked={paymentReceived}
                              />
                              <label
                                htmlFor="virtualItemsPaymentReceived"
                                onClick={() => setPaymentReceived(!paymentReceived)}
                              >
                                Payment Received({virtualItemsPaymentReceived.length})
                              </label>
                            </div>
                            <div className="col-xl-6 col-lg-4 col-md-3 col-sm-3 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setShipped(false);
                                    setPaymentReceived(false);
                                  }}
                                >
                                  Clear
                                </span>
                              </p>
                            </div>
                          </div>
                        </div> */}
                        <div className="table-section">
                          <div className="row">
                            <AdminTable
                              tableClesses={"table-stripes bktables"}
                              headers={headers}
                              showHeaders={true}
                              data={virtualItems}
                              // data={shipped && !paymentReceived ? virtualItemsShipped : paymentReceived && !shipped ? virtualItemsPaymentReceived : virtualItems}
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td style={{ width: "auto" }}>
                                      #{rowData.original.ordernumber}
                                    </td>
                                    <td className="order-email">
                                      {rowData.original.customerowneremail}
                                    </td>
                                    <td>
                                      {moment(
                                        rowData.original.orderplacedon
                                      ).format("MM/DD/YYYY")}
                                    </td>
                                    <td>
                                      {rowData.original.catagory
                                        ? rowData.original.catagory
                                        : "N/A"}
                                    </td>
                                    <td>
                                      <NumberFormat
                                        value={(
                                          rowData.original.pricepaidincents /
                                          100
                                        ).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                      />
                                    </td>
                                    {editStatus &&
                                    rowData.original.ordernumber == id ? (
                                      <td style={{ padding: "10px 0px" }}>
                                        <div className="col-12 edit-role">
                                          <div className="form-holder nogroup">
                                            <input
                                              onClick={(e) =>
                                                setStatusTable(!statusTable)
                                              }
                                              value={
                                                status == "Payment_Received"
                                                  ? "Payment Received"
                                                  : status
                                              }
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
                                                  onClick={() =>
                                                    setStatusTable(!statusTable)
                                                  }
                                                />
                                              ) : (
                                                <img
                                                  className="select size"
                                                  src={down}
                                                  onClick={() =>
                                                    setStatusTable(!statusTable)
                                                  }
                                                />
                                              )}
                                            </label>
                                            <div
                                              className={
                                                statusTable
                                                  ? "active"
                                                  : "dropdown-content"
                                              }
                                            >
                                              <div>
                                                <h3
                                                  onClick={(e) => {
                                                    setStatus(
                                                      e.currentTarget.innerHTML
                                                    );
                                                    setStatusTable(
                                                      !statusTable
                                                    );
                                                    setOrderStatus({
                                                      ...orderStatus,
                                                      orderid:
                                                        rowData.original
                                                          .ordernumber,
                                                      physicalorderstatus:
                                                        "Payment_Received",
                                                    });
                                                  }}
                                                >
                                                  Payment Received
                                                </h3>
                                                <h3
                                                  onClick={(e) => {
                                                    setStatus(
                                                      e.currentTarget.innerHTML
                                                    );
                                                    setStatusTable(
                                                      !statusTable
                                                    );
                                                    setOrderStatus({
                                                      ...orderStatus,
                                                      orderid:
                                                        rowData.original
                                                          .ordernumber,
                                                      physicalorderstatus:
                                                        "Shipped",
                                                    });
                                                  }}
                                                >
                                                  Shipped
                                                </h3>
                                                <h3
                                                  onClick={(e) => {
                                                    setStatus(
                                                      e.currentTarget.innerHTML
                                                    );
                                                    setStatusTable(
                                                      !statusTable
                                                    );
                                                    setOrderStatus({
                                                      ...orderStatus,
                                                      orderid:
                                                        rowData.original
                                                          .ordernumber,
                                                      physicalorderstatus:
                                                        "Delivered",
                                                    });
                                                  }}
                                                >
                                                  Delivered
                                                </h3>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    ) : (
                                      <td>
                                        {rowData.original.physicalorderstatus ==
                                        null
                                          ? "Payment Received"
                                          : rowData.original
                                              .physicalorderstatus ==
                                            "Payment_Received"
                                          ? "Payment Received"
                                          : rowData.original
                                              .physicalorderstatus}
                                      </td>
                                    )}
                                    {localStorage.getItem("role") ==
                                    "Analyst" ? (
                                      ""
                                    ) : (
                                      <>
                                        {editStatus &&
                                        rowData.original.ordernumber == id ? (
                                          <td>
                                            <div className="view_icon_users">
                                              <img
                                                src={save}
                                                onClick={(e) =>
                                                  handleSubmitEdit(e)
                                                }
                                              />
                                            </div>
                                          </td>
                                        ) : (
                                          <>
                                            {rowData.original.catagory ==
                                              "Swag" ||
                                            rowData.original.catagory ==
                                              "Gift Cards" ||
                                            rowData.original.catagory ==
                                              "Umpire's Manual" ? (
                                              <td>
                                                <div className="view_icon_users">
                                                  <img
                                                    src={edit}
                                                    onClick={() => {
                                                      setEditStatus(true);
                                                      setId(
                                                        rowData.original
                                                          .ordernumber
                                                      );
                                                      setStatus(
                                                        rowData.original
                                                          .physicalorderstatus
                                                      );
                                                      setOrderStatus({
                                                        ...orderStatus,
                                                        orderid:
                                                          rowData.original
                                                            .ordernumber,
                                                        physicalorderstatus:
                                                          rowData.original
                                                            .physicalorderstatus,
                                                      });
                                                    }}
                                                  />
                                                </div>
                                              </td>
                                            ) : (
                                              <td></td>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                    <td>
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
                                        ) : rowData.original.paymentIntentId ? (
                                          <Link
                                            to={`/gi-team/refund-order/${rowData.original.ordernumber}`}
                                            target="_blank"
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
                                        <Link
                                          to={`/gi-team/view-order/${rowData.original.ordernumber}`}
                                          target="_blank"
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
    </div>
  );
};

export default withRouter(Orders);