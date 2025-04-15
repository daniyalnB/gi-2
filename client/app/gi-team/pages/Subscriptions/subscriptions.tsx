import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import subscriptionsred from "assets/SubscriptionsRed.svg";
import vision from "assets/visibility.svg";
import edit from "assets/Edit_Role.svg";
import save from "assets/Save_Role.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import moment from "moment";
import { Helmet } from "react-helmet";
import { getAllSubscriptions } from "../../../../utils/api-routes/api-routes.util";

const Subscriptions = (props) => {

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState({
    All: true,
    Standard_Plan: false,
    Plus_Plan: false,
    Professional_Plan: false,
    Enterprise_Plan: false,
  });

  const [headers, setHeaders] = useState([
    {
      Header: "Email",
      accessor: "ownerinfo.emailaddress",
    },
    {
      Header: "Sub. Type",
      accessor: "subscriptioninfo.planname",
    },
    {
      Header: "Next Payment",
      accessor: "subscriptioninfo.nextsubdate",
    },
    {
      Header: "Sub. Status",
      accessor: "subscriptioninfo.subscriptionstatus",
    },
    {
      Header: "AP Status",
      accessor: "xactProfileStatus",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [headersSPAndPP, setHeadersSPAndPP] = useState([
    {
      Header: "Email",
      accessor: "ownerinfo.emailaddress",
    },
    {
      Header: "Sub. Type",
      accessor: "subscriptioninfo.planname",
    },
    {
      Header: "Next Payment",
      accessor: "subscriptioninfo.nextsubdate",
    },
    {
      Header: "Sub. Status",
      accessor: "subscriptioninfo.subscriptionstatus",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  const [all, setAll] = useState([]);
  const [allActive, setAllActive] = useState([]);
  const [allPaused, setAllPaused] = useState([]);
  const [allPendingCancellation, setAllPendingCancellation] = useState([]);
  const [allActiveAndPaused, setAllActiveAndPaused] = useState([]);
  const [allActiveAndPendingCancellation, setAllActiveAndPendingCancellation] = useState([]);
  const [allPausedAndPendingCancellation, setAllPausedAndPendingCancellation] = useState([]);

  const [standardPlan, setStandardPlan] = useState([]);
  const [standardPlanActive, setStandardPlanActive] = useState([]);
  const [standardPlanPaused, setStandardPlanPaused] = useState([]);
  const [standardPlanPendingCancellation, setStandardPlanPendingCancellation] = useState([]);
  const [standardPlanActiveAndPaused, setStandardPlanActiveAndPaused] = useState([]);
  const [standardPlanActiveAndPendingCancellation, setStandardPlanActiveAndPendingCancellation] = useState([]);
  const [standardPlanPausedAndPendingCancellation, setStandardPlanPausedAndPendingCancellation] = useState([]);

  const [plusPlan, setPlusPlan] = useState([]);
  const [plusPlanActive, setPlusPlanActive] = useState([]);
  const [plusPlanPaused, setPlusPlanPaused] = useState([]);
  const [plusPlanPendingCancellation, setPlusPlanPendingCancellation] = useState([]);
  const [plusPlanActiveAndPaused, setPlusPlanActiveAndPaused] = useState([]);
  const [plusPlanActiveAndPendingCancellation, setPlusPlanActiveAndPendingCancellation] = useState([]);
  const [plusPlanPausedAndPendingCancellation, setPlusPlanPausedAndPendingCancellation] = useState([]);

  const [professionalPlan, setProfessionalPlan] = useState([]);
  const [professionalPlanActive, setProfessionalPlanActive] = useState([]);
  const [professionalPlanPaused, setProfessionalPlanPaused] = useState([]);
  const [professionalPlanPendingCancellation, setProfessionalPlanPendingCancellation] = useState([]);
  const [professionalPlanActiveAndPaused, setProfessionalPlanActiveAndPaused] = useState([]);
  const [professionalPlanActiveAndPendingCancellation, setProfessionalPlanActiveAndPendingCancellation] = useState([]);
  const [professionalPlanPausedAndPendingCancellation, setProfessionalPlanPausedAndPendingCancellation] = useState([]);

  const [enterprisePlan, setEnterprisePlan] = useState([]);
  const [enterprisePlanActive, setEnterprisePlanActive] = useState([]);
  const [enterprisePlanPaused, setEnterprisePlanPaused] = useState([]);
  const [enterprisePlanPendingCancellation, setEnterprisePlanPendingCancellation] = useState([]);
  const [enterprisePlanActiveAndPaused, setEnterprisePlanActiveAndPaused] = useState([]);
  const [enterprisePlanActiveAndPendingCancellation, setEnterprisePlanActiveAndPendingCancellation] = useState([]);
  const [enterprisePlanPausedAndPendingCancellation, setEnterprisePlanPausedAndPendingCancellation] = useState([]);

  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pendingCancellation, setPendingCancellation] = useState(false);

  useEffect(() => {
    getAllSubscriptions().subscribe((response) => {
      if (response.response.Requested_Action) {
        const w = response.response.data.filter(
          (status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"
        );
        setAll(w);
        setAllActive(w.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active"));
        setAllPaused(w.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setAllPendingCancellation(w.filter((status) => status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setAllActiveAndPaused(w.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setAllActiveAndPendingCancellation(w.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setAllPausedAndPendingCancellation(w.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        const x = w.filter((plan) => plan.subscriptioninfo.planname == "StandardPlan" || plan.subscriptioninfo.planname == "StandardPlanAnnual");
        setStandardPlan(x);
        setStandardPlanActive(x.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active"));
        setStandardPlanPaused(x.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setStandardPlanPendingCancellation(x.filter((status) => status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setStandardPlanActiveAndPaused(x.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setStandardPlanActiveAndPendingCancellation(x.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setStandardPlanPausedAndPendingCancellation(x.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        const y = w.filter((plan) => plan.subscriptioninfo.planname == "PlusPlan" || plan.subscriptioninfo.planname == "PlusPlanAnnual");
        setPlusPlan(y);
        setPlusPlanActive(y.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active"));
        setPlusPlanPaused(y.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setPlusPlanPendingCancellation(y.filter((status) => status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setPlusPlanActiveAndPaused(y.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setPlusPlanActiveAndPendingCancellation(y.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setPlusPlanPausedAndPendingCancellation(y.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        const z = w.filter((plan) => plan.subscriptioninfo.planname == "ProfessionalPlan" || plan.subscriptioninfo.planname == "ProfessionalPlanAnnual");
        setProfessionalPlan(z);
        setProfessionalPlanActive(z.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active"));
        setProfessionalPlanPaused(z.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setProfessionalPlanPendingCancellation(z.filter((status) => status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setProfessionalPlanActiveAndPaused(z.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setProfessionalPlanActiveAndPendingCancellation(z.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setProfessionalPlanPausedAndPendingCancellation(z.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        const e = w.filter((plan) => plan.subscriptioninfo.planname == "EnterprisePlan" || plan.subscriptioninfo.planname == "EnterprisePlanAnnual");
        setEnterprisePlan(e);
        setEnterprisePlanActive(e.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active"));
        setEnterprisePlanPaused(e.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setEnterprisePlanPendingCancellation(e.filter((status) => status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setEnterprisePlanActiveAndPaused(e.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure"));
        setEnterprisePlanActiveAndPendingCancellation(e.filter((status) => status.subscriptioninfo.subscriptionstatus == "Active" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
        setEnterprisePlanPausedAndPendingCancellation(e.filter((status) => status.subscriptioninfo.subscriptionstatus == "Paused" || status.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" || status.subscriptioninfo.subscriptionstatus == "PendingCancellation"));
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
          Subscriptions - Actionable Insights Admin
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
                  <div className="col-7">
                    <div className="page_icon">
                      <img src={subscriptionsred} />
                    </div>
                    <h3 className="heading">
                      Subscriptions
                    </h3>
                  </div>
                  <div className="col-5">
                    <Search search={search} setSearch={setSearch} />
                  </div>
                </div>
                <hr />
                <div className="inner_sub_area">
                  <div className="row">
                    <div className="col-12" style={{ borderBottom: "1px solid #0000001a" }}>
                      <ul className="subs_filters">
                        <li
                          className={activeTab.All == true ? "active" : ""}
                          onClick={() => {
                            setActiveTab({
                              All: true,
                              Standard_Plan: false,
                              Plus_Plan: false,
                              Professional_Plan: false,
                              Enterprise_Plan: false,
                            });
                            setActive(false);
                            setPaused(false);
                            setPendingCancellation(false);
                          }}
                        >
                          All ({all.length})
                        </li>
                        <li
                          className={activeTab.Standard_Plan == true ? "active" : ""}
                          onClick={() => {
                            setActiveTab({
                              All: false,
                              Standard_Plan: true,
                              Plus_Plan: false,
                              Professional_Plan: false,
                              Enterprise_Plan: false,
                            });
                            setActive(false);
                            setPaused(false);
                            setPendingCancellation(false);
                          }}
                        >
                          Standard Plan ({standardPlan.length})
                        </li>
                        <li
                          className={activeTab.Plus_Plan == true ? "active" : ""}
                          onClick={() => {
                            setActiveTab({
                              All: false,
                              Standard_Plan: false,
                              Plus_Plan: true,
                              Professional_Plan: false,
                              Enterprise_Plan: false,
                            });
                            setActive(false);
                            setPaused(false);
                            setPendingCancellation(false);
                          }}
                        >
                          Plus Plan ({plusPlan.length})
                        </li>
                        <li
                          className={activeTab.Professional_Plan == true ? "active" : ""}
                          onClick={() => {
                            setActiveTab({
                              All: false,
                              Standard_Plan: false,
                              Plus_Plan: false,
                              Professional_Plan: true,
                              Enterprise_Plan: false,
                            });
                            setActive(false);
                            setPaused(false);
                            setPendingCancellation(false);
                          }}
                        >
                          Pro Plan ({professionalPlan.length})
                        </li>
                        <li
                          className={activeTab.Enterprise_Plan == true ? "active" : ""}
                          onClick={() => {
                            setActiveTab({
                              All: false,
                              Standard_Plan: false,
                              Plus_Plan: false,
                              Professional_Plan: false,
                              Enterprise_Plan: true,
                            });
                            setActive(false);
                            setPaused(false);
                            setPendingCancellation(false);
                          }}
                        >
                          Enterprise Plan ({enterprisePlan.length})
                        </li>
                      </ul>
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
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="allActive"
                                checked={active}
                              />
                              <label
                                htmlFor="allActive"
                                onClick={() => setActive(!active)}
                              >
                                Active ({allActive.length})
                              </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="allPaused"
                                checked={paused}
                              />
                              <label
                                htmlFor="allPaused"
                                onClick={() => setPaused(!paused)}
                              >
                                Paused ({allPaused.length})
                              </label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4" style={{ padding: "0px" }}>
                              <input
                                type="checkbox"
                                id="allPendingCancellation"
                                checked={pendingCancellation}
                              />
                              <label
                                htmlFor="allPendingCancellation"
                                onClick={() => setPendingCancellation(!pendingCancellation)}
                              >
                                Pending Cancellation ({allPendingCancellation.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-1 col-sm-1 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setActive(false);
                                    setPaused(false);
                                    setPendingCancellation(false);
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
                                active && paused && pendingCancellation ? all : active && !paused && !pendingCancellation ? allActive :
                                !active && paused && !pendingCancellation ? allPaused : !active && !paused && pendingCancellation ? allPendingCancellation :
                                active && paused && !pendingCancellation ? allActiveAndPaused : active && !paused && pendingCancellation ? allActiveAndPendingCancellation :
                                !active && paused && pendingCancellation ? allPausedAndPendingCancellation : all
                              }
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td className="order-email">
                                      {rowData.original.ownerinfo.emailaddress}
                                    </td>
                                    <td>
                                      {
                                        rowData.original.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "DevTestPlan" ? "Dev Test Plan" : ""
                                      }
                                    </td>
                                    <td>{rowData.original.subscriptioninfo.nextsubdate ? rowData.original.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(rowData.original.subscriptioninfo.nextsubdate).format("MM/DD/YYYY") : "N/A"}</td>
                                    <td>
                                      <div className="status_tb">
                                        <span
                                          className={
                                            rowData.original.subscriptioninfo.subscriptionstatus == "Active" ? "status_published" :
                                            rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "status_pendingCancellation" : "status_draft"
                                          }
                                        >
                                          {rowData.original.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" ? "Paused" : rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "Pending Cancellation" : rowData.original.subscriptioninfo.subscriptionstatus}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="status_tb">
                                        {rowData.original.xactProfileStatus ? (
                                         <>
                                          {rowData.original.subscriptioninfo.planname === "ProfessionalPlan" || rowData.original.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? (
                                            <span
                                              className={
                                                rowData.original.xactProfileStatus == "Active" ? "status_published" :
                                                rowData.original.xactProfileStatus == "Pending" ? "status_pendingCancellation" : "status_outofstock"
                                              }
                                            >
                                              {rowData.original.xactProfileStatus}
                                            </span>
                                          ) : (
                                            "N/A"
                                          )}
                                         </>
                                        ) : (
                                          "N/A"
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="view_icon_users">
                                        <Link
                                          to={{
                                            pathname: `/gi-team/view-subscription/${rowData.original.id}`,
                                            state: {
                                              path: "subscription",
                                            },
                                          }}
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
                    {activeTab.Standard_Plan && (
                      <>
                        <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="standardPlanActive"
                                checked={active}
                              />
                              <label
                                htmlFor="standardPlanActive"
                                onClick={() => setActive(!active)}
                              >
                                Active ({standardPlanActive.length})
                              </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="standardPlanPaused"
                                checked={paused}
                              />
                              <label
                                htmlFor="standardPlanPaused"
                                onClick={() => setPaused(!paused)}
                              >
                                Paused ({standardPlanPaused.length})
                              </label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4" style={{ padding: "0px" }}>
                              <input
                                type="checkbox"
                                id="standardPlanPendingCancellation"
                                checked={pendingCancellation}
                              />
                              <label
                                htmlFor="standardPlanPendingCancellation"
                                onClick={() => setPendingCancellation(!pendingCancellation)}
                              >
                                Pending Cancellation ({standardPlanPendingCancellation.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-1 col-sm-1 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setActive(false);
                                    setPaused(false);
                                    setPendingCancellation(false);
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
                              headers={headersSPAndPP}
                              showHeaders={true}
                              data={
                                active && paused && pendingCancellation ? standardPlan : active && !paused && !pendingCancellation ? standardPlanActive :
                                !active && paused && !pendingCancellation ? standardPlanPaused : !active && !paused && pendingCancellation ? standardPlanPendingCancellation :
                                active && paused && !pendingCancellation ? standardPlanActiveAndPaused : active && !paused && pendingCancellation ? standardPlanActiveAndPendingCancellation :
                                !active && paused && pendingCancellation ? standardPlanPausedAndPendingCancellation : standardPlan
                              }
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td className="order-email">
                                      {rowData.original.ownerinfo.emailaddress}
                                    </td>
                                    <td>
                                      {
                                        rowData.original.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "DevTestPlan" ? "Dev Test Plan" : ""
                                      }
                                    </td>
                                    <td>{rowData.original.subscriptioninfo.nextsubdate ? rowData.original.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(rowData.original.subscriptioninfo.nextsubdate).format("MM/DD/YYYY") : "N/A"}</td>
                                    <td>
                                      <div className="status_tb">
                                        <span
                                          className={
                                            rowData.original.subscriptioninfo.subscriptionstatus == "Active" ? "status_published" :
                                            rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "status_pendingCancellation" : "status_draft"
                                          }
                                        >
                                          {rowData.original.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" ? "Paused" : rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "Pending Cancellation" : rowData.original.subscriptioninfo.subscriptionstatus}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="view_icon_users">
                                        <Link
                                          to={{
                                            pathname: `/gi-team/view-subscription/${rowData.original.id}`,
                                            state: {
                                              path: "subscription",
                                            },
                                          }}
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
                    {activeTab.Plus_Plan && (
                      <>
                        <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="plusPlanActive"
                                checked={active}
                              />
                              <label
                                htmlFor="plusPlanActive"
                                onClick={() => setActive(!active)}
                              >
                                Active ({plusPlanActive.length})
                              </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="plusPlanPaused"
                                checked={paused}
                              />
                              <label
                                htmlFor="plusPlanPaused"
                                onClick={() => setPaused(!paused)}
                              >
                                Paused ({plusPlanPaused.length})
                              </label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4" style={{ padding: "0px" }}>
                              <input
                                type="checkbox"
                                id="plusPlanPendingCancellation"
                                checked={pendingCancellation}
                              />
                              <label
                                htmlFor="plusPlanPendingCancellation"
                                onClick={() => setPendingCancellation(!pendingCancellation)}
                              >
                                Pending Cancellation ({plusPlanPendingCancellation.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-1 col-sm-1 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setActive(false);
                                    setPaused(false);
                                    setPendingCancellation(false);
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
                              headers={headersSPAndPP}
                              showHeaders={true}
                              data={
                                active && paused && pendingCancellation ? plusPlan : active && !paused && !pendingCancellation ? plusPlanActive :
                                !active && paused && !pendingCancellation ? plusPlanPaused : !active && !paused && pendingCancellation ? plusPlanPendingCancellation :
                                active && paused && !pendingCancellation ? plusPlanActiveAndPaused : active && !paused && pendingCancellation ? plusPlanActiveAndPendingCancellation :
                                !active && paused && pendingCancellation ? plusPlanPausedAndPendingCancellation : plusPlan
                              }
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td className="order-email">
                                      {rowData.original.ownerinfo.emailaddress}
                                    </td>
                                    <td>
                                      {
                                        rowData.original.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "DevTestPlan" ? "Dev Test Plan" : ""
                                      }
                                    </td>
                                    <td>{rowData.original.subscriptioninfo.nextsubdate ? rowData.original.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(rowData.original.subscriptioninfo.nextsubdate).format("MM/DD/YYYY") : "N/A"}</td>
                                    <td>
                                      <div className="status_tb">
                                        <span
                                          className={
                                            rowData.original.subscriptioninfo.subscriptionstatus == "Active" ? "status_published" :
                                            rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "status_pendingCancellation" : "status_draft"
                                          }
                                        >
                                          {rowData.original.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" ? "Paused" : rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "Pending Cancellation" : rowData.original.subscriptioninfo.subscriptionstatus}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="view_icon_users">
                                        <Link
                                          to={{
                                            pathname: `/gi-team/view-subscription/${rowData.original.id}`,
                                            state: {
                                              path: "subscription",
                                            },
                                          }}
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
                    {activeTab.Professional_Plan && (
                      <>
                        <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="professionalPlanActive"
                                checked={active}
                              />
                              <label
                                htmlFor="professionalPlanActive"
                                onClick={() => setActive(!active)}
                              >
                                Active ({professionalPlanActive.length})
                              </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="professionalPlanPaused"
                                checked={paused}
                              />
                              <label
                                htmlFor="professionalPlanPaused"
                                onClick={() => setPaused(!paused)}
                              >
                                Paused ({professionalPlanPaused.length})
                              </label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4" style={{ padding: "0px" }}>
                              <input
                                type="checkbox"
                                id="professionalPlanPendingCancellation"
                                checked={pendingCancellation}
                              />
                              <label
                                htmlFor="professionalPlanPendingCancellation"
                                onClick={() => setPendingCancellation(!pendingCancellation)}
                              >
                                Pending Cancellation ({professionalPlanPendingCancellation.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-1 col-sm-1 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setActive(false);
                                    setPaused(false);
                                    setPendingCancellation(false);
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
                                active && paused && pendingCancellation ? professionalPlan : active && !paused && !pendingCancellation ? professionalPlanActive :
                                !active && paused && !pendingCancellation ? professionalPlanPaused : !active && !paused && pendingCancellation ? professionalPlanPendingCancellation :
                                active && paused && !pendingCancellation ? professionalPlanActiveAndPaused : active && !paused && pendingCancellation ? professionalPlanActiveAndPendingCancellation :
                                !active && paused && pendingCancellation ? professionalPlanPausedAndPendingCancellation : professionalPlan
                              }
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td className="order-email">
                                      {rowData.original.ownerinfo.emailaddress}
                                    </td>
                                    <td>
                                      {
                                        rowData.original.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "DevTestPlan" ? "Dev Test Plan" : ""
                                      }
                                    </td>
                                    <td>{rowData.original.subscriptioninfo.nextsubdate ? rowData.original.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(rowData.original.subscriptioninfo.nextsubdate).format("MM/DD/YYYY") : "N/A"}</td>
                                    <td>
                                      <div className="status_tb">
                                        <span
                                          className={
                                            rowData.original.subscriptioninfo.subscriptionstatus == "Active" ? "status_published" :
                                            rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "status_pendingCancellation" : "status_draft"
                                          }
                                        >
                                          {rowData.original.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" ? "Paused" : rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "Pending Cancellation" : rowData.original.subscriptioninfo.subscriptionstatus}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="status_tb">
                                        {rowData.original.xactProfileStatus ? (
                                          <span
                                            className={
                                              rowData.original.xactProfileStatus == "Active" ? "status_published" :
                                              rowData.original.xactProfileStatus == "Pending" ? "status_pendingCancellation" : "status_outofstock"
                                            }
                                          >
                                            {rowData.original.xactProfileStatus}
                                          </span>
                                        ) : (
                                          "N/A"
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="view_icon_users">
                                        <Link
                                          to={{
                                            pathname: `/gi-team/view-subscription/${rowData.original.id}`,
                                            state: {
                                              path: "subscription",
                                            },
                                          }}
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
                    {activeTab.Enterprise_Plan && (
                      <>
                        <div className="Status_Orders">
                          <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1">
                              <h5> Status: </h5>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="enterprisePlanActive"
                                checked={active}
                              />
                              <label
                                htmlFor="enterprisePlanActive"
                                onClick={() => setActive(!active)}
                              >
                                Active ({enterprisePlanActive.length})
                              </label>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3" style={{ padding: "0px 10px" }}>
                              <input
                                type="checkbox"
                                id="enterprisePlanPaused"
                                checked={paused}
                              />
                              <label
                                htmlFor="enterprisePlanPaused"
                                onClick={() => setPaused(!paused)}
                              >
                                Paused ({enterprisePlanPaused.length})
                              </label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4" style={{ padding: "0px" }}>
                              <input
                                type="checkbox"
                                id="enterprisePlanPendingCancellation"
                                checked={pendingCancellation}
                              />
                              <label
                                htmlFor="enterprisePlanPendingCancellation"
                                onClick={() => setPendingCancellation(!pendingCancellation)}
                              >
                                Pending Cancellation ({enterprisePlanPendingCancellation.length})
                              </label>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-1 col-sm-1 text-right">
                              <p>
                                <span
                                  onClick={() => {
                                    setActive(false);
                                    setPaused(false);
                                    setPendingCancellation(false);
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
                                active && paused && pendingCancellation ? enterprisePlan : active && !paused && !pendingCancellation ? enterprisePlanActive :
                                !active && paused && !pendingCancellation ? enterprisePlanPaused : !active && !paused && pendingCancellation ? enterprisePlanPendingCancellation :
                                active && paused && !pendingCancellation ? enterprisePlanActiveAndPaused : active && !paused && pendingCancellation ? enterprisePlanActiveAndPendingCancellation :
                                !active && paused && pendingCancellation ? enterprisePlanPausedAndPendingCancellation : enterprisePlan
                              }
                              search={search}
                              setSearch={setSearch}
                              Row={({ index, rowData }) => {
                                return (
                                  <tr key={index}>
                                    <td className="order-email">
                                      {rowData.original.ownerinfo.emailaddress}
                                    </td>
                                    <td>
                                      {
                                        rowData.original.subscriptioninfo.planname === "StandardPlan" ? "Standard Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlan" ? "Plus Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" :
                                        rowData.original.subscriptioninfo.planname === "StandardPlanAnnual" ? "Standard Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "PlusPlanAnnual" ? "Plus Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "EnterprisePlanAnnual" ? "Enterprise Plan (Annual)" :
                                        rowData.original.subscriptioninfo.planname === "DevTestPlan" ? "Dev Test Plan" : ""
                                      }
                                    </td>
                                    <td>{rowData.original.subscriptioninfo.nextsubdate ? rowData.original.subscriptioninfo.nextsubdate == "Manually Marked" ? "Manually Marked" : moment(rowData.original.subscriptioninfo.nextsubdate).format("MM/DD/YYYY") : "N/A"}</td>
                                    <td>
                                      <div className="status_tb">
                                        <span
                                          className={
                                            rowData.original.subscriptioninfo.subscriptionstatus == "Active" ? "status_published" :
                                            rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "status_pendingCancellation" : "status_draft"
                                          }
                                        >
                                          {rowData.original.subscriptioninfo.subscriptionstatus == "PausedDueToPaymentFailure" ? "Paused" : rowData.original.subscriptioninfo.subscriptionstatus == "PendingCancellation" ? "Pending Cancellation" : rowData.original.subscriptioninfo.subscriptionstatus}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="status_tb">
                                        {rowData.original.xactProfileStatus ? (
                                          <span
                                            className={
                                              rowData.original.xactProfileStatus == "Active" ? "status_published" :
                                              rowData.original.xactProfileStatus == "Pending" ? "status_pendingCancellation" : "status_outofstock"
                                            }
                                          >
                                            {rowData.original.xactProfileStatus}
                                          </span>
                                        ) : (
                                          "N/A"
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="view_icon_users">
                                        <Link
                                          to={{
                                            pathname: `/gi-team/view-subscription/${rowData.original.id}`,
                                            state: {
                                              path: "subscription",
                                            },
                                          }}
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
    </>
  );
};

export default withRouter(Subscriptions);