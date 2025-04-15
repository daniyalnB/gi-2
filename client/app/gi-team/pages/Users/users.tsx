import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import usersred from "assets/UsersRed.svg";
import vision from "assets/visibility.svg";
import moment from "moment";
import { Helmet } from "react-helmet";
import { getAllCustomerInfo } from "../../../../utils/api-routes/api-routes.util";

const users = (props) => {

	const [loading, setLoading] = useState(true);

	const [data, setData] = useState([]);

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
			Header: "Last Login",
			accessor: "lastlogin",
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
				setLoading(false);
				setData(response.response.data);
			} else {
				alert("error");
			}
		});
	}, []);

	return (
		<>
			<Helmet>
				<title> 
					Users - Actionable Insights Admin
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
											<img src={usersred} />
										</div>
										<h3 className="heading">
											Users
										</h3>
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
																	{rowData.original.ownerinfo.firstname ? rowData.original.ownerinfo.firstname : "N/A"}
																</td>
																<td>
																	{rowData.original.ownerinfo.lastname ? rowData.original.ownerinfo.lastname : "N/A"}
																</td>
																<td className="order-email">
																	{rowData.original.ownerinfo.emailaddress}
																</td>
																<td>
																	{rowData.original.lastlogin == null
																		? "N/A"
																		: moment.utc(new Date(`${rowData.original.lastlogin} UTC`)).local().format("MM/DD/YYYY, h:mm a")}	
																</td>
																<td>
																	<div className="view_icon_users">
																		<Link
																			to={`/gi-team/user-details/${rowData.original.id}`}
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

export default withRouter(users);