import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import moment from "moment";
import { Helmet } from "react-helmet";
import { GetAllEvents } from "../../../../utils/api-routes/api-routes.util";
import eventsred from "assets/EventsRed.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
import event from "assets/event-details.svg";

const EventsAdmin = (props) => {

	const [loading, setLoading] = useState(true);

	const [activeTab, setActiveTab] = useState({
		All: true,
		Draft: false,
	});

	const [search, setSearch] = useState("");

	const [headers, setHeaders] = useState([
		{
			Header: "Title",
			accessor: "title",
		},
		{
			Header: "Location",
			accessor: "location",
		},
		{
			Header: "Start Date",
			accessor: "startdatetime",
		},
		{
			Header: "End Date",
			accessor: "enddatetime",
		},
		{
			Header: "Action",
			accessor: false,
		},
	]);

	const [all, setAll] = useState([]);
	const [draft, setDraft] = useState([]);

	useEffect(() => {
		GetAllEvents().subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data.map((val) => ({
					createdAt: val.createdAt,
					description: val.description,
					draft: val.draft,
					enddatetime: moment(val.enddatetime).format("YYYY/MM/DD HH:mm:ss") ,
					facebookogimage: val.facebookogimage,
					featureddescription: val.featureddescription,
					featuredimage: val.featuredimage,
					id: val.id,
					location: val.location,
					noofseats: val.noofseats,
					permalink: val.permalink,
					priceincents: val.priceincents,
					startdatetime: moment(val.startdatetime).format("YYYY/MM/DD HH:mm:ss") ,
					tabtitle: val.tabtitle,
					title: val.title,
					type: val.type,
					updatedAt: val.updatedAt,
				}));
				setAll(x);
				const y = response.response.data.filter((status) => status.draft == true);
				const obj = y.map((val) => ({
					createdAt: val.createdAt,
					description: val.description,
					draft: val.draft,
					enddatetime: moment(val.enddatetime).format("YYYY/MM/DD HH:mm:ss") ,
					facebookogimage: val.facebookogimage,
					featureddescription: val.featureddescription,
					featuredimage: val.featuredimage,
					id: val.id,
					location: val.location,
					noofseats: val.noofseats,
					permalink: val.permalink,
					priceincents: val.priceincents,
					startdatetime: moment(val.startdatetime).format("YYYY/MM/DD HH:mm:ss") ,
					tabtitle: val.tabtitle,
					title: val.title,
					type: val.type,
					updatedAt: val.updatedAt,
				}));
				setDraft(obj);
				setLoading(false);
			}
		});
	}, []);

	return (
		<>
			<Helmet>
				<title> 
					Events - Actionable Insights Admin
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
											<img src={eventsred} />
										</div>
										<h3 className="heading">
											Events
										</h3>
									</div>
									{localStorage.getItem("role") == "Analyst" ? (
										""
									) : (
										<div className="col-3 text-right">
											<Link
												className="btn"
												to="/gi-team/create-event"
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
																	<td>
																		{rowData.original.title ? rowData.original.title : "N/A"}
																	</td>
																	<td>
																		{rowData.original.location ? rowData.original.location : "N/A"}
																	</td>
																	<td>{moment(rowData.original.startdatetime).format("MM/DD/YYYY")}</td>
																	<td>{moment(rowData.original.enddatetime).format("MM/DD/YYYY")}</td>
																	<td>
																		<div className="view_icon_users">
																			<Link
																				to={{
																					pathname: `/gi-team/event-attendees/${rowData.original.id}`,
																					state: {
																						eventName: rowData.original.title,
																					},
																				}}
																				style={{ marginRight: "10px" }}
																			>
																				<img src={event} />
																			</Link>
																			<Link
																				to={`/gi-team/update-event/${rowData.original.id}`}
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
																	<td>
																		{rowData.original.title ? rowData.original.title : "N/A"}
																	</td>
																	<td>
																		{rowData.original.location ? rowData.original.location : "N/A"}
																	</td>
																	<td>{moment(rowData.original.startdatetime).format("MM/DD/YYYY")}</td>
																	<td>{moment(rowData.original.enddatetime).format("MM/DD/YYYY")}</td>
																	<td>
																		<div className="view_icon_users">
																			<Link
																				to={{
																					pathname: `/gi-team/event-attendees/${rowData.original.id}`,
																					state: {
																						eventName: rowData.original.title,
																					},
																				}}
																				style={{ marginRight: "10px" }}
																			>
																				<img src={event} />
																			</Link>
																			<Link
																				to={`/gi-team/update-event/${rowData.original.id}`}
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

export default withRouter(EventsAdmin);