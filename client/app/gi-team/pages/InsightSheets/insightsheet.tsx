import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
import insightsheetsred from "assets/InsightSheetsRed.svg";
import vision from "assets/visibility.svg";
import create from "assets/create.png";
// import Rating from "@material-ui/lab/Rating";
import moment from "moment";
import { Helmet } from "react-helmet";
// import { withStyles } from "@material-ui/core/styles";
import { GetAllInsightSheets } from "../../../../utils/api-routes/api-routes.util";

const InsightSheetAdmin = (props) => {

	const [loading, setLoading] = useState(true);

	const StyledRating = withStyles({
		iconFilled: {
			color: "#f00",
		},
	})(Rating);

	const [activeTab, setActiveTab] = useState({
		All: true,
		Draft: false,
		Published: false,
		Trash: false
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
			Header: "Last Update",
			accessor: "lastupdate:",
		},
		{
			Header: "Ratings",
			accessor: "averagerating",
		},
		{
			Header: "Status",
			accessor: "status",
		},
		{
			Header: "Action",
			accessor: false,
		},
	]);

	const [search, setSearch] = useState("");

	const [all, setAll] = useState([]);
	const [draft, setDraft] = useState([]);
	const [published, setPublished] = useState([]);
	const [trash, setTrash] = useState([]);

	useEffect(() => {
		GetAllInsightSheets().subscribe((res) => {
			setAll(res.response.data);
			setDraft(res.response.data.filter((status) => status.draft == true));
			setPublished(res.response.data.filter((status) => status.draft == false));
			setTrash([]);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<Helmet>
				<title> 
					Insight Sheets - Actionable Insights Admin
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
											<img src={insightsheetsred} />
										</div>
										<h3 className="heading">
											Insight Sheets
										</h3>
									</div>
									{localStorage.getItem("role") == "Analyst" ? (
										""
									) : (
										<div className="col-3 text-right">
											<Link
												className="btn"
												to="/gi-team/create-insight-sheet"
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
															Published: false,
															Trash: false
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
															Published: false,
															Trash: false
														})
													}
												>
													Draft ({draft.length})
												</li>
												<li
													className={activeTab.Published == true ? "active" : ""}
													onClick={() =>
														setActiveTab({
															All: false,
															Draft: false,
															Published: true,
															Trash: false
														})
													}
												>
													Published ({published.length})
												</li>
												<li
													className={activeTab.Trash == true ? "active" : ""}
													onClick={() =>
														setActiveTab({
															All: false,
															Draft: false,
															Published: false,
															Trash: true
														})
													}
												>
													Trash ({trash.length})
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
																		{rowData.original.title == "" ? "N/A" : rowData.original.title}
																	</td>
																	<td>
																		{rowData.original.catagory == "" ? "N/A" : rowData.original.catagory}
																	</td>
																	<td>{moment(rowData.original.lastupdate).format("MM/DD/YYYY")}</td>
																	<td>
																		<StyledRating
																			size="small"
																			name={rowData.original.id}
																			value={rowData.original.averagerating}
																			precision={0.5}
																			readOnly
																		/>
																	</td>
																	<td>
																		<div className="status_tb">
																			<span
																				className={
																					rowData.original.draft == true
																					? "status_draft"
																					: "status_published"
																				}
																			>
																				{
																					rowData.original.draft == true 
																					? "Draft" 
																					: "Published" 
																				}
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="view_icon_users">
																			<Link
																				to={`/gi-team/update-insight-sheet/${rowData.original.id}`}
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
																		{rowData.original.title == "" ? "N/A" : rowData.original.title}
																	</td>
																	<td>
																		{rowData.original.catagory == "" ? "N/A" : rowData.original.catagory}
																	</td>
																	<td>{moment(rowData.original.lastupdate).format("MM/DD/YYYY")}</td>
																	<td>
																		<StyledRating
																			size="small"
																			name={rowData.original.id}
																			value={rowData.original.averagerating}
																			precision={0.5}
																			readOnly
																		/>
																	</td>
																	<td>
																		<div className="status_tb">
																			<span
																				className={
																					rowData.original.draft == true
																					? "status_draft"
																					: "status_published"
																				}
																			>
																				{
																					rowData.original.draft == true 
																					? "Draft" 
																					: "Published" 
																				}
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="view_icon_users">
																			<Link
																				to={`/gi-team/update-insight-sheet/${rowData.original.id}`}
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
										{activeTab.Published && (
											<div className="table-section">
												<div className="row">
													<AdminTable
														tableClesses={"table-stripes bktables"}
														headers={headers}
														showHeaders={true}
														data={published}
														search={search}
														setSearch={setSearch}
														Row={({ index, rowData }) => {
															return (
																<tr key={index}>
																	<td>
																		{rowData.original.title == "" ? "N/A" : rowData.original.title}
																	</td>
																	<td>
																		{rowData.original.catagory == "" ? "N/A" : rowData.original.catagory}
																	</td>
																	<td>{moment(rowData.original.lastupdate).format("MM/DD/YYYY")}</td>
																	<td>
																		<StyledRating
																			size="small"
																			name={rowData.original.id}
																			value={rowData.original.averagerating}
																			precision={0.5}
																			readOnly
																		/>
																	</td>
																	<td>
																		<div className="status_tb">
																			<span
																				className={
																					rowData.original.draft == true
																					? "status_draft"
																					: "status_published"
																				}
																			>
																				{
																					rowData.original.draft == true 
																					? "Draft" 
																					: "Published" 
																				}
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="view_icon_users">
																			<Link
																				to={`/gi-team/update-insight-sheet/${rowData.original.id}`}
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
										{activeTab.Trash && (
											<div className="table-section">
												<div className="row">
													<AdminTable
														tableClesses={"table-stripes bktables"}
														headers={headers}
														showHeaders={true}
														data={trash}
														search={search}
														setSearch={setSearch}
														Row={({ index, rowData }) => {
															return (
																<tr key={index}>
																	<td>
																		{rowData.original.title == "" ? "N/A" : rowData.original.title}
																	</td>
																	<td>
																		{rowData.original.catagory == "" ? "N/A" : rowData.original.catagory}
																	</td>
																	<td>{moment(rowData.original.lastupdate).format("MM/DD/YYYY")}</td>
																	<td>
																		<StyledRating
																			size="small"
																			name={rowData.original.id}
																			value={rowData.original.averagerating}
																			precision={0.5}
																			readOnly
																		/>
																	</td>
																	<td>
																		<div className="status_tb">
																			<span
																				className={
																					rowData.original.draft == true
																					? "status_draft"
																					: "status_published"
																				}
																			>
																				{
																					rowData.original.draft == true 
																					? "Draft" 
																					: "Published" 
																				}
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="view_icon_users">
																			<Link
																				to={`/gi-team/update-insight-sheet/${rowData.original.id}`}
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

export default withRouter(InsightSheetAdmin);