import React, { Suspense, useEffect, useState } from "react";
import LottieLoader from "../../../components/LottieLoader";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ScrollToTop from "../../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const Footer = React.lazy(() => import("../../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../../components/WrongBrowserDisclaimer"));
import AdminTable from "../.././../gi-team/components/TableExtra";
import { Helmet } from "react-helmet";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { getReviewActivity } from "utils/api-routes/api-routes.util";
import up from "assets/up-arrow-admin.svg";
import down from "assets/down-arrow-admin.svg";

const ReviewActivity = () => {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    getReviewActivity().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setData(response.response.data);
      } else {
        alert("error");
      }
    });
  }, []);

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  const [headers, setHeaders] = useState([
    {
      Header: "Date",
      accessor: false,
    },
    {
      Header: "Points",
      accessor: false,
    },
    {
      Header: "Details",
      accessor: false,
    },
  ]);

  const [notAvailable, setNotAvailable] = useState([
    {
      date: "N/A",
      points: "N/A",
      details: "N/A",
    },
  ]);

	return (
		<>
			<Helmet>
				<title> 
          Review Activity - Actionable Insights
				</title>
			</Helmet>
			<Suspense
				fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
			>
        <ScrollToTop />
				<Navbar />
        <Breadcrumbs />
				<div className="main-container">
					<div className="Review_Activity">
						<div className="">
							<div className="holder">
								<h2>
                  Review Activity
								</h2>
                <div className="current-pts">
                  <h3> Current Balance:&nbsp;</h3>
                  <h4 className="pts"> 
                    <NumericFormat
                      value={data.currentbalance ? data.currentbalance : 0}
                      displayType={"text"}
                      thousandSeparator={true}
                    /> 
                    &nbsp;<sup>PTS</sup>
                  </h4>
                </div>
							</div>
              {!loading && (
                <div className="points-tabs">
                  <div 
                    className={one == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => setOne(!one)}
                  >
                    <h3> Referral Points </h3>
                    <img src={one ? up : down} />
                  </div>
                  {one && (
                    <div className="Dropdown">
                      <AdminTable
                        tableClesses={`${data.referalpoints.length == 0 ? "review-activity-table-none" : "review-activity-table"}`}
                        headers={headers}
                        showHeaders={true}
                        data={data.referalpoints.length == 0 ? notAvailable : data.referalpoints}
                        Row={({ index, rowData }) => {
                          return (
                            <tr key={index}>
                              {rowData.original.date == "N/A" ? (
                                <td> {rowData.original.date} </td>
                              ) : (
                                <td> {moment(rowData.original.date).format("MMMM Do, YYYY H:mm a")} </td>
                              )}
                              {rowData.original.points == "N/A" ? (
                                <td> {rowData.original.points} </td>
                              ) : (
                                <>
                                  {rowData.original.points > 0 ? (
                                    <td>
                                      +
                                      <NumericFormat
                                        value={rowData.original.points}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </td>
                                  ) : (
                                    <td style={{ color: "#DB422D" }}>
                                      <NumericFormat
                                        value={rowData.original.points}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </td>
                                  )}
                                </>
                              )}
                              <td> {rowData.original.details} </td>
                            </tr>
                          );
                        }}
                      />
                    </div>
                  )}
                  <div 
                    className={two == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => setTwo(!two)}
                  >
                    <h3> Earned Points </h3>
                    <img src={two ? up : down} />
                  </div>
                  {two && (
                    <div className="Dropdown">
                     <AdminTable
                        tableClesses={`${data.earnedpoints.length == 0 ? "review-activity-table-none" : "review-activity-table"}`}
                        headers={headers}
                        showHeaders={true}
                        data={data.earnedpoints.length == 0 ? notAvailable : data.earnedpoints}
                        Row={({ index, rowData }) => {
                          return (
                            <tr key={index}>
                              {rowData.original.date == "N/A" ? (
                                <td> {rowData.original.date} </td>
                              ) : (
                                <td> {moment(rowData.original.date).format("MMMM Do, YYYY H:mm a")} </td>
                              )}
                              {rowData.original.points == "N/A" ? (
                                <td> {rowData.original.points} </td>
                              ) : (
                                <>
                                  {rowData.original.points > 0 ? (
                                    <td>
                                      +
                                      <NumericFormat
                                        value={rowData.original.points}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </td>
                                  ) : (
                                    <td style={{ color: "#DB422D" }}>
                                      <NumericFormat
                                        value={rowData.original.points}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </td>
                                  )}
                                </>
                              )}
                              <td> {rowData.original.details} </td>
                            </tr>
                          );
                        }}
                      />
                    </div>
                  )}
                  <div 
                    className={three == true ? "Tabs active_new" : "Tabs"}
                    onClick={() => setThree(!three)}
                  >
                    <h3> Redeemed Points </h3>
                    <img src={three ? up : down} />
                  </div>
                  {three && (
                    <div className="Dropdown">
                      <AdminTable
                        tableClesses={`${data.redeemedpoints.length == 0 ? "review-activity-table-none" : "review-activity-table"}`}
                        headers={headers}
                        showHeaders={true}
                        data={data.redeemedpoints.length == 0 ? notAvailable : data.redeemedpoints}
                        Row={({ index, rowData }) => {
                          return (
                            <tr key={index}>
                              {rowData.original.date == "N/A" ? (
                                <td> {rowData.original.date} </td>
                              ) : (
                                <td> {moment(rowData.original.date).format("MMMM Do, YYYY H:mm a")} </td>
                              )}
                              {rowData.original.points == "N/A" ? (
                                <td> {rowData.original.points} </td>
                              ) : (
                                <>
                                  {rowData.original.points > 0 ? (
                                    <td>
                                      +
                                      <NumericFormat
                                        value={rowData.original.points}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </td>
                                  ) : (
                                    <td style={{ color: "#DB422D" }}>
                                      <NumericFormat
                                        value={rowData.original.points}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                      />
                                    </td>
                                  )}
                                </>
                              )}
                              <td> {rowData.original.details} </td>
                            </tr>
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              {loading && (
                <div className="loader-inner">
                  <LottieLoader />
                </div>
              )}
						</div>
					</div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default ReviewActivity;