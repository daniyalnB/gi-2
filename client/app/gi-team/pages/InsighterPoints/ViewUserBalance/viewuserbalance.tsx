import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import Search from "../../../components/Search";
import AdminTable from "../../../components/Table";
import vision from "assets/visibility.svg";
import back from "assets/arrowleft.svg";
import NumberFormat from "react-number-format";
import { CSVLink } from "react-csv";
import { Helmet } from "react-helmet";
import { getAllCustomerInfo } from "../../../../../utils/api-routes/api-routes.util";

const ViewUserBalance = (props) => {

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [CSVData, setCSVData] = useState([]);
	
	const [headers, setHeaders] = useState([
		{
			Header: "First Name",
			accessor: "ownerinfo.firstname",
		},
		{
			Header: "Last Name",
			accessor: "ownerinfo.lastname",
		},
		{
			Header: "Email",
			accessor: "ownerinfo.emailaddress",
		},
		{
			Header: "Total Points",
			accessor: "nooninsighterpoint",
		},
		{
			Header: "Action",
			accessor: false,
		},
	]);

	const [search, setSearch] = useState("");

	useEffect(() => {
		getAllCustomerInfo().subscribe((response) => {
			if (response.response.Requested_Action) {
				setData(response.response.data);
				const x = response.response.data;
				const e = x.map((val) => ({
					firstname: val.ownerinfo.firstname ? val.ownerinfo.firstname : "N/A",
					lastname: val.ownerinfo.lastname ? val.ownerinfo.lastname : "N/A",
					emailaddress: val.ownerinfo.emailaddress ? val.ownerinfo.emailaddress : "N/A",
					nooninsighterpoint: val.nooninsighterpoint ? val.nooninsighterpoint : "N/A",
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
			label: "First Name",
			key: "firstname",
		},
		{
			label: "Last Name",
			key: "lastname",
		},
		{
			label: "Email",
			key: "emailaddress",
		},
		{
			label: "Total Points",
			key: "nooninsighterpoint",
		},
	];

	const CSV = {
    headers: CSVheaders,
    data: CSVData,
    filename: `View User Balance`
  };

	return (
		<>
			<Helmet>
        <title> 
					View User Balance - Actionable Insights Admin
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
											View User Balance
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
																	{rowData.original.ownerinfo.firstname == null
																		? "N/A"
																		: rowData.original.ownerinfo.firstname}
																</td>
																<td>
																	{rowData.original.ownerinfo.lastname == null
																		? "N/A"
																		: rowData.original.ownerinfo.lastname}
																</td>
																<td>{rowData.original.ownerinfo.emailaddress}</td>
																<td>
																	{rowData.original.nooninsighterpoint == null 
																		? "N/A"
																		:
																		<NumberFormat
																			value={rowData.original.nooninsighterpoint}
																			displayType={"text"}
																			thousandSeparator={true}
																		/> 
																	}
																</td>
																<td>
																	<div className="view_icon_users">
																		<Link
																			to={`/gi-team/insighter-points/balance-details/${rowData.original.id}`}
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

export default withRouter(ViewUserBalance);