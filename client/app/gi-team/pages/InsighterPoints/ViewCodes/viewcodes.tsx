import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import Search from "../../../components/Search";
import AdminTable from "../../../components/Table";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import back from "assets/arrowleft.svg";
import moment from "moment";
import NumberFormat from "react-number-format";
import { CSVLink } from "react-csv";
import { Helmet } from "react-helmet";
import { getAllInsighterPointsCoupons } from "../../../../../utils/api-routes/api-routes.util";

const ViewCodes = (props) => {

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [CSVData, setCSVData] = useState([]);

	const [headers, setHeaders] = useState([
		{
			Header: "IP Code",
			accessor: "ipcode",
		},
		{
			Header: "Description",
			accessor: false,
		},
		{
			Header: "Expiry Date",
			accessor: "expiry",
		},
		{
			Header: "Usage/Limit",
			accessor: "usagelimitpercustomer",
		},
		{
			Header: "No. of Points",
			accessor: "numberofpoints",
		},
		{
			Header: "Action",
			accessor: false,
		},
	]);

	const [search, setSearch] = useState("");

	useEffect(() => {
		getAllInsighterPointsCoupons().subscribe((response) => {
			if (response.response.Requested_Action) {
				setData(response.response.data);
				const x = response.response.data;
				const e = x.map((val) => ({
					ipcode: val.ipcode ? val.ipcode : "N/A",
					description: val.description ? val.description : "N/A",
					expiry: val.expiry ? `${moment(val.expiry, "DD.MM.YYYY").format("MM/DD/YYYY")}`: "N/A",
					usagelimitpercustomer: val.usagelimitpercustomer ? val.usagelimitpercustomer : "N/A",
					numberofpoints: val.numberofpoints ? val.numberofpoints : "N/A",
				}));
				setCSVData(e);
				setLoading(false);
			} else {
				alert("error");
			}
		});
	}, []);

	const CSVheaders = [
		{
			label: "IP Code",
			key: "ipcode",
		},
		{
			label: "Description",
			key: "description",
		},
		{
			label: "Expiry Date",
			key: "expiry",
		},
		{
			label: "Usage/Limit",
			key: "usagelimitpercustomer",
		},
		{
			label: "No. of Points",
			key: "numberofpoints",
		},
	];

	const CSV = {
    headers: CSVheaders,
    data: CSVData,
    filename: `View Codes`
  };

	return (
		<>
			<Helmet>
        <title> 
					View Codes - Actionable Insights Admin
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
									<div className="col-4">
										<h3 className="heading">
											View Codes
										</h3>
									</div>
									<div className="col-8 text-right">
                    <div className="back">
                      <Link className="bk" to="/gi-team/insighter-points">
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
                    {localStorage.getItem("role") == "Analyst" ? (
                      ""
                    ) : (
											<Link className="btn" to="/gi-team/insighter-points/create-code">
												<img src={create} />
												Create New
											</Link>
                    )}
										{!loading && (
											<>
												{CSVData.length !== 0 && (
													<CSVLink {...CSV}>
														<button className="export btn">
															<span> Export CSV </span>
														</button>
													</CSVLink>
												)}
											</>
										)}
                  </div>
								</div>
								<hr />
								<div className="inner_sub_area">
									<div className="row">
										<div className="col-8"
											style={{ border: "none" }}
										>
										</div>
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
																<td style={{ width: "auto"}}>
                                  {rowData.original.ipcode}
                                </td>
                                <td>{rowData.original.description}</td>
                                <td>{moment(rowData.original.expiry, "DD.MM.YYYY").format("MM/DD/YYYY")}</td>
                                <td>{rowData.original.usagelimitpercustomer}</td>
																<td>
																	<NumberFormat
																		value={rowData.original.numberofpoints}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																</td>
																<td>
																	<div className="view_icon_users">
																		<Link
																			to={`/gi-team/insighter-points/view-code/${rowData.original.id}`}
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

export default withRouter(ViewCodes);