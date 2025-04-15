import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import Search from "../../../components/Search";
import AdminTable from "../../../components/Table";
import certificationsred from "assets/certificationsred.svg";
import back from "assets/arrowleft.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import { Helmet } from "react-helmet";
import moment from "moment";
import NumberFormat from "react-number-format";
import { getAllCertifications } from "../../../../../utils/api-routes/api-routes.util";

const Certifications = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [headers, setHeaders] = useState([
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Created at",
      accessor: "createdAt",
    },
    {
      Header: "Price",
      accessor: "priceincents",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCertifications().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
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
          Certifications - Actionable Insights Admin
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
                      <img src={certificationsred} />
                    </div>
                    <h3 className="heading">
                      Certifications
                    </h3>
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
                        to="/gi-team/products/create-certification"
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
                    <div className="col-8" style={{ border: "none" }}></div>
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
                                <td>{rowData.original.title}</td>
                                <td>{moment(rowData.original.createdAt).format("MM/DD/YYYY")}</td>
                                <td>
                                  <NumberFormat
                                    value={(rowData.original.priceincents / 100).toFixed(2)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </td>
                                <td>   
                                  <div className="view_icon_users">
                                    <Link
                                      to={`/gi-team/products/view-certification/${rowData.original.id}`}
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

export default withRouter(Certifications);