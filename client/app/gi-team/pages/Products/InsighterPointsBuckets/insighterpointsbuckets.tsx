import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import AdminTable from "../../../components/Table";
import insighterpointsbucketred from "assets/insighterpointsbucketred.svg";
import back from "assets/arrowleft.svg";
import NumberFormat from "react-number-format";
import { Helmet } from "react-helmet";

const InsighterPointsBuckets = (props) => {

  const [data, setData] = useState([
    {
      title: "INSIGHTER POINTS",
      pricepaidincents: 250000,
      points: 25000,
    },
    {
      title: "INSIGHTER POINTS",
      pricepaidincents: 500000,
      points: 50000,
    },
    {
      title: "INSIGHTER POINTS",
      pricepaidincents: 750000,
      points: 75000,
    },
    {
      title: "INSIGHTER POINTS",
      pricepaidincents: 1000000,
      points: 100000,
    },
  ]);

  const [headers, setHeaders] = useState([
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Price",
      accessor: "pricepaidincents",
    },
    {
      Header: "Points",
      accessor: "points",
    },
  ]);

  return (
    <>
      <Helmet>
        <title> 
          Insighter Points Buckets - Actionable Insights Admin
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
                      <img src={insighterpointsbucketred} />
                    </div>
                    <h3 className="heading">
                      Insighter Points Buckets
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
                            <td>
                              <NumberFormat
                                value={(rowData.original.pricepaidincents / 100).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </td>
                            <td>
                              <NumberFormat
                                value={rowData.original.points}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
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

export default withRouter(InsighterPointsBuckets);