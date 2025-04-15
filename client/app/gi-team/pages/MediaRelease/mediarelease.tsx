import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import mediareleasered from "assets/MediaReleaseRed.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import { Helmet } from "react-helmet";
import { GetAllMediaRelease } from "../../../../utils/api-routes/api-routes.util";

const MediaReleaseAdmin = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [headers, setHeaders] = useState([
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    GetAllMediaRelease().subscribe((response) => {
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
          Media Release - Actionable Insights Admin
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
                      <img src={mediareleasered} />
                    </div>
                    <h3 className="heading">
                      Media Release
                    </h3>
                  </div>
                  {localStorage.getItem("role") == "Analyst" ? (
                    ""
                  ) : (
                    <div className="col-3 text-right">
                      <Link
                        className="btn"
                        to="/gi-team/create-media-release"
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
                              <td>{rowData.original.description.substring(0, 200)}</td>
                              <td>   
                                <div className="view_icon_users">
                                  <Link
                                    to={`/gi-team/update-media-release/${rowData.original.id}`}
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

export default withRouter(MediaReleaseAdmin);