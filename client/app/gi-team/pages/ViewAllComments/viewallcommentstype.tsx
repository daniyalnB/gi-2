import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { getCommentsDetailsByType } from "../../../../utils/api-routes/api-routes.util";
import viewallcommentsred from "assets/ViewAllCommentsRed.svg";
import back from "assets/arrowleft.svg";
import vision from "assets/visibility.svg";
import moment from "moment";

const ViewAllCommentsType = (props) => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  const [headers, setHeaders] = useState([
    {
      Header: `${
        props.match.params.type === "Events" ? "Event Name" :
        props.match.params.type === "PLUS" ? "PLUS Name" :
        props.match.params.type === "Insight Sheet" ? "Insight Sheet Name" : "COLID Name"
      }`,
      accessor: "name",
    },
    {
      Header: "Comment Type",
      accessor: "commentType",
    },
    {
      Header: "User Name",
      accessor: "userName",
    },
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Action",
      accessor: false,
    },
  ]);

  const [search, setSearch] = useState("");

  useEffect(() => {
		getCommentsDetailsByType(props.match.params.type).subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data;
				if (x == undefined) {
          history.push("/gi-team/view-all-comments");
        }
        setData(x);
				setLoading(false);
			} else {
				history.push("/gi-team/view-all-comments");
			}
		});
	}, []);

  return (
    <>
      <Helmet>
        <title> 
          View All Comments - Actionable Insights Admin
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
                      <img src={viewallcommentsred} />
                    </div>
                    <h3 className="heading">
                      Comments ({props.match.params.type})
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/view-all-comments"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
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
                                <td>{rowData.original.name}</td>
                                <td>{rowData.original.commentType}</td>
                                <td>{rowData.original.userName}</td>
                                <td>{moment(rowData.original.date).format("MM/DD/YYYY")}</td>
                                <td>   
                                  <div className="view_icon_users">
                                    <a
                                      href={`
                                        ${props.match.params.type === "Events" ? `/event/${rowData.original.permaLink}` :
                                          props.match.params.type === "PLUS" ? `/resources/price-list-update-summary/${rowData.original.permaLink}` :
                                          props.match.params.type === "Insight Sheet" ? `/insight-sheets/${rowData.original.permaLink}` : `/${rowData.original.permaLink}`
                                        }
                                      `}
                                      target="_blank"
                                    >
                                      <img src={vision} />
                                    </a>
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

export default withRouter(ViewAllCommentsType);