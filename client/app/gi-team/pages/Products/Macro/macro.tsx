import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import Search from "../../../components/Search";
import AdminTable from "../../../components/Table";
import macrored from "assets/macrored.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import back from "assets/arrowleft.svg";
import { Helmet } from "react-helmet";
import moment from "moment";
import NumberFormat from "react-number-format";
import { GetAllMacros } from "../../../../../utils/api-routes/api-routes.util";

const Macro = (props) => {

  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState([]);

  const [activeTab, setActiveTab] = useState({
    All: true,
    Draft: false,
    Published: false,
    OutofStock: false,
  });

  const [headers, setHeaders] = useState([
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Created at",
      accessor: "updatedAt",
    },
    {
      Header: "Purchased Count",
      accessor: "count",
    },
    {
      Header: "Price",
      accessor: "priceincents",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    GetAllMacros().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setData(response.response.data);
      } else {
        alert("error");
      }
    });
  }, []);

  const [all, setAll] = useState([]);
  const [draft, setDraft] = useState([]);
  const [published, setPublished] = useState([]);
  const [outofstock, setOutOfStock] = useState([]);

  useEffect(() => {
    GetAllMacros().subscribe((res) => {
      setAll(res.response.data);
      setDraft(res.response.data.filter((status) => status.outofstock == false && status.draft == true));
      setPublished(res.response.data.filter((status) => status.outofstock == false && status.draft == false));
      setOutOfStock(res.response.data.filter((status) => status.outofstock == true));
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> 
					Macro - Actionable Insights Admin
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
                  <div className="col-6">
                    <div className="page_icon">
                      <img src={macrored} />
                    </div>
                    <h3 className="heading"> Macro </h3>
                  </div>
                  <div className="col-6 text-right">
                    <div className="back">
                      <Link
                        className="bk"
                        to="/gi-team/products"
                      >
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
                    {localStorage.getItem("role") == "Analyst" ? (
                      ""
                    ) : (
                      <Link
                        className="btn"
                        to="/gi-team/products/create-macro"
                      >
                        <img src={create} />
                        Create New
                      </Link>
                    )}
                  </div>
                </div>
                <hr />
                <div className="inner_sub_area">
                  <div className="row">
                    <div className="col-8">
                      <ul className="subs_filters">
                        <li
                          className={activeTab.All == true ? "active" : ""}
                          onClick={() =>
                            setActiveTab({
                              All: true,
                              Draft: false,
                              Published: false,
                              OutofStock: false,
                            })
                          }
                        >
                          All ({all.length})
                        </li>
                        <li
                          className={activeTab.Draft == true ? "active" : ""}
                          onClick={() =>
                            setActiveTab({
                              All: false,
                              Draft: true,
                              Published: false,
                              OutofStock: false,
                            })
                          }
                        >
                          Draft ({draft.length})
                        </li>
                        <li
                          className={
                            activeTab.Published == true ? "active" : ""
                          }
                          onClick={() =>
                            setActiveTab({
                              All: false,
                              Draft: false,
                              Published: true,
                              OutofStock: false,
                            })
                          }
                        >
                          Published ({published.length})
                        </li>
                        <li
                          className={
                            activeTab.OutofStock == true ? "active" : ""
                          }
                          onClick={() =>
                            setActiveTab({
                              All: false,
                              Draft: false,
                              Published: false,
                              OutofStock: true,
                            })
                          }
                        >
                          Out of Stock ({outofstock.length})
                        </li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <Search search={search} setSearch={setSearch}/>
                    </div>
                  </div>
                </div>
                {!loading && (
                  <>
                    {activeTab.All && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={all}
                            search={search}
                            setSearch={setSearch}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    {rowData.original.title == "" ? "N/A" : rowData.original.title}
                                  </td>
                                  <td>{moment(rowData.original.updatedAt).format("MM/DD/YYYY")}</td>
                                  <td>{rowData.original.count}</td>
                                  <td>
                                    <NumberFormat
                                      value={(rowData.original.priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </td>
                                  <td>
                                    <div className="status_tb">
                                      <span
                                        className={
                                          rowData.original.outofstock == true
                                          ? "status_outofstock"
                                          : rowData.original.draft == true
                                          ? "status_draft"
                                          : "status_published"
                                        }
                                      >
                                        {
                                          rowData.original.outofstock == true
                                          ? "Out of Stock"
                                          : rowData.original.draft == true
                                          ? "Draft"
                                          : "Published"
                                        }
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="view_icon_users">
                                      <Link
                                        to={`/gi-team/products/update-macro/${rowData.original.id}`}
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
                    )}
                    {activeTab.Draft && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={draft}
                            search={search}
                            setSearch={setSearch}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    {rowData.original.title == "" ? "N/A" : rowData.original.title}
                                  </td>
                                  <td>{moment(rowData.original.updatedAt).format("MM/DD/YYYY")}</td>
                                  <td>{rowData.original.count}</td>
                                  <td>
                                    <NumberFormat
                                      value={(rowData.original.priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </td>
                                  <td>
                                    <div className="status_tb">
                                      <span
                                        className={
                                          rowData.original.outofstock == true
                                          ? "status_outofstock"
                                          : rowData.original.draft == true
                                          ? "status_draft"
                                          : "status_published"
                                        }
                                      >
                                        {
                                          rowData.original.outofstock == true
                                          ? "Out of Stock"
                                          : rowData.original.draft == true
                                          ? "Draft"
                                          : "Published"
                                        }
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="view_icon_users">
                                      <Link
                                        to={`/gi-team/products/update-macro/${rowData.original.id}`}
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
                    )}
                    {activeTab.Published && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={published}
                            search={search}
                            setSearch={setSearch}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    {rowData.original.title == "" ? "N/A" : rowData.original.title}
                                  </td>
                                  <td>{moment(rowData.original.updatedAt).format("MM/DD/YYYY")}</td>
                                  <td>{rowData.original.count}</td>
                                  <td>
                                    <NumberFormat
                                      value={(rowData.original.priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </td>
                                  <td>
                                    <div className="status_tb">
                                      <span
                                        className={
                                          rowData.original.outofstock == true
                                          ? "status_outofstock"
                                          : rowData.original.draft == true
                                          ? "status_draft"
                                          : "status_published"
                                        }
                                      >
                                        {
                                          rowData.original.outofstock == true
                                          ? "Out of Stock"
                                          : rowData.original.draft == true
                                          ? "Draft"
                                          : "Published"
                                        }
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="view_icon_users">
                                      <Link
                                        to={`/gi-team/products/update-macro/${rowData.original.id}`}
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
                    )}
                    {activeTab.OutofStock && (
                      <div className="table-section">
                        <div className="row">
                          <AdminTable
                            tableClesses={"table-stripes bktables"}
                            headers={headers}
                            showHeaders={true}
                            data={outofstock}
                            search={search}
                            setSearch={setSearch}
                            Row={({ index, rowData }) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    {rowData.original.title == "" ? "N/A" : rowData.original.title}
                                  </td>
                                  <td>{moment(rowData.original.updatedAt).format("MM/DD/YYYY")}</td>
                                  <td>{rowData.original.count}</td>
                                  <td>
                                    <NumberFormat
                                      value={(rowData.original.priceincents / 100).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={"$"}
                                    />
                                  </td>
                                  <td>
                                    <div className="status_tb">
                                      <span
                                        className={
                                          rowData.original.outofstock == true
                                          ? "status_outofstock"
                                          : rowData.original.draft == true
                                          ? "status_draft"
                                          : "status_published"
                                        }
                                      >
                                        {
                                          rowData.original.outofstock == true
                                          ? "Out of Stock"
                                          : rowData.original.draft == true
                                          ? "Draft"
                                          : "Published"
                                        }
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="view_icon_users">
                                      <Link
                                        to={`/gi-team/products/update-macro/${rowData.original.id}`}
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

export default withRouter(Macro);