import React, { useState, useEffect, useMemo } from 'react';
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import videogalleryred from "assets/VideoGalleryRed.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import { Helmet } from "react-helmet";
import { GetVideoGallaryItems } from "../../../../utils/api-routes/api-routes.util";

const VideoGalleryAdmin = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [activeTab, setActiveTab] = useState({
    All: true,
    Draft: false,
  });

  const [headers, setHeaders] = useState([
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Category",
      accessor: "catagory",
    },
    {
      Header: "Video Link",
      accessor: "videolink",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    GetVideoGallaryItems().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const [all, setAll] = useState([]);
  const [draft, setDraft] = useState([]);

  useEffect(() => {
    GetVideoGallaryItems().subscribe((res) => {
      setAll(
        res.response.data.filter((status) => status.draft !== null)
      );
      setDraft(
        res.response.data.filter((status) => status.draft == true)
      );
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> 
          Video Gallery - Actionable Insights Admin
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
                      <img src={videogalleryred} />
                    </div>
                    <h3 className="heading">
                      Video Gallery
                    </h3>
                  </div>
                  {localStorage.getItem("role") == "Analyst" ? (
                    ""
                  ) : (
                    <div className="col-3 text-right">
                      <Link
                        className="btn"
                        to="/gi-team/create-video-gallery"
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
                    <div className="col-8">
                      <ul className="subs_filters">
                        <li
                          className={activeTab.All == true ? "active" : ""}
                          onClick={() =>
                            setActiveTab({
                              All: true,
                              Draft: false,
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
                            })
                          }
                        >
                          Draft ({draft.length})
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
                                    <td style={{ width: "auto", wordBreak: "break-all" }}>
                                      {rowData.original.title == "" ? "N/A" : rowData.original.title}
                                    </td>
                                    <td>
                                      {rowData.original.catagory == "" ? "N/A" : rowData.original.catagory}
                                    </td>
                                    <td style={{ wordBreak: "break-all" }}>
                                      {rowData.original.videolink == "" ? "N/A" : rowData.original.videolink}
                                    </td>
                                    <td>
                                      <div className="view_icon_users">
                                        <Link
                                          to={`/gi-team/update-video-gallery/${rowData.original.id}`}
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
                                  <td style={{ width: "auto", wordBreak: "break-all" }}>
                                    {rowData.original.title == "" ? "N/A" : rowData.original.title}
                                  </td>
                                  <td>
                                    {rowData.original.catagory == "" ? "N/A" : rowData.original.catagory}
                                  </td>
                                  <td style={{ wordBreak: "break-all" }}>
                                    {rowData.original.videolink == "" ? "N/A" : rowData.original.videolink}
                                  </td>
                                  <td>
                                    <div className="view_icon_users">
                                      <Link
                                        to={`/gi-team/update-video-gallery/${rowData.original.id}`}
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

export default withRouter(VideoGalleryAdmin);