import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import Search from "../../../components/Search";
import AdminTable from "../../../components/Table";
import back from "assets/arrowleft.svg";
import moment from "moment";
import NumberFormat from "react-number-format";
import { CSVLink } from "react-csv";
import { Helmet } from "react-helmet";
import { GetAllOrders } from "../../../../../utils/api-routes/api-routes.util";

const Audit = (props) => {

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [CSVData, setCSVData] = useState([]);

	const [headers, setHeaders] = useState([
		{
			Header: "Against Product",
			accessor: "producttitle",
		},
		{
			Header: "No. of IP's Used",
			accessor: "insighterpointsused",
		},
		{
			Header: "Order Number",
			accessor: "ordernumber",
		},
		{
			Header: "Time Stamp",
			accessor: "orderplacedon",
		},
	]);

	const [search, setSearch] = useState("");

	useEffect(() => {
    GetAllOrders().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data.filter((x) => x.insighterpointsused !== null));
				const y = response.response.data.filter((x) => x.insighterpointsused !== null);
				const e = y.map((val) => ({
					producttitle: val.producttitle ? val.producttitle : "N/A",
					insighterpointsused: val.insighterpointsused ? val.insighterpointsused : "N/A",
					ordernumber: val.ordernumber ? `#${val.ordernumber}` : "N/A",
					orderplacedon: val.orderplacedon ? moment(val.orderplacedon).format("MM/DD/YYYY, h:mm:ss A") : "N/A",
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
			label: "Against Product",
			key: "producttitle",
		},
		{
			label: "No. of IP's Used",
			key: "insighterpointsused",
		},
		{
			label: "Order Number",
			key: "ordernumber",
		},
		{
			label: "Time Stamp",
			key: "orderplacedon",
		},
	];

	const CSV = {
    headers: CSVheaders,
    data: CSVData,
    filename: `Audit`
  };

	return (
		<>
			<Helmet>
        <title> 
					Audit - Actionable Insights Admin
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
											Audit
										</h3>
									</div>
									<div className="col-8 text-right">
                    <div className="back">
                      <Link className="bk" to="/gi-team/insighter-points">
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
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
																	{rowData.original.producttitle ? rowData.original.producttitle : "N/A"}
																</td>
																<td>
																	<NumberFormat
																		value={rowData.original.insighterpointsused}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																</td>
																<td>
																	<Link
                                    to={`/gi-team/view-order/${rowData.original.ordernumber}`}
                                  >
																		#{rowData.original.ordernumber}
																	</Link>
																</td>
																<td>
																	{rowData.original.orderplacedon == null 
																		? "N/A"
																		: moment(rowData.original.orderplacedon).format("MM/DD/YYYY, h:mm:ss A")}
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

export default withRouter(Audit);