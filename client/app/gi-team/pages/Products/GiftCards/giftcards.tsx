import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import AdminTable from "../../../components/Table";
import giftcardsred from "assets/giftcardsred.svg";
import back from "assets/arrowleft.svg";
import { Helmet } from "react-helmet";

const GiftCardsAdmin = (props) => {

  const [data, setData] = useState([
    {
      title: "Membership Plans",
    },
    {
      title: "AI Matterport Certification",
    },
    {
      title: "Xactimate Training",
    },
    {
      title: "Insighter Points Gift Card",
    },
  ]);

  const [headers, setHeaders] = useState([
    {
      Header: "Title",
      accessor: "title",
    },
  ]);

  return (
    <>
      <Helmet>
        <title> 
          Gift Cards - Actionable Insights Admin
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
                      <img src={giftcardsred} />
                    </div>
                    <h3 className="heading">
                      Gift Cards
                    </h3>
                  </div>
                  <div className="col-3 text-right">
                    <div className="back">
                      <Link
                        className="bk"
                        to="/gi-team/products"
                      >
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="table-section">
                  <div className="row">
                    <AdminTable
                      tableClesses={"table-stripes bktables"}
                      headers={headers}
                      showHeaders={true}
                      data={data}
                      Row={({ index, rowData }) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "auto" }}>
                              {rowData.original.title}
                            </td>
                          </tr>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(GiftCardsAdmin);