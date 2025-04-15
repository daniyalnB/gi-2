import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import Search from "../../../components/Search";
import AdminTable from "../../../components/TableFlex";
import { Helmet } from "react-helmet";
import { CSVLink } from "react-csv";
import moment from "moment";
import { getAIMCGraduatesData } from "../../../../../utils/api-routes/api-routes.util";
import aimcgraduatesred from "assets/aimcgraduatesred.svg";
import back from "assets/arrowleft.svg";
import edit from "assets/Edit_Role.svg";

const AimcGraduates = (props) => {

	const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
	const [CSVData, setCSVData] = useState([]);

	const [headers, setHeaders] = useState([
		{
			Header: "Date Passed",
			accessor: "datePassed",
			minWidth: 100,
		},
		{
			Header: "First Name",
			accessor: "firstName",
			minWidth: 100,
		},
		{
			Header: "Last Name",
			accessor: "lastName",
			minWidth: 100,
		},
		{
			Header: "Email",
			accessor: "email",
			minWidth: 200,
		},
    {
			Header: "Passing Percentage",
			accessor: "passingScore",
			minWidth: 200,
		},
    {
			Header: "Certification Code",
			accessor: "certCode",
			minWidth: 200,
		},
    {
			Header: "AIMC",
			accessor: "aimc",
			minWidth: 100,
		},
		{
			Header: "Date of Expiration",
			accessor: "dateOfExpiration",
			minWidth: 200,
		},
    {
			Header: "IICRC Certified",
			accessor: "iircCertified",
			width: 200,
		},
    {
			Header: "CA Adjuster License CE",
			accessor: "caAdjusterLicenseCE",
			width: 200,
		},
    {
			Header: "FL Adjuster License CE",
			accessor: "flAdjusterLicenseCE",
			width: 200,
		},
		{
			Header: "NE Adjuster License CE",
			accessor: "neAdjusterLicenseCE",
			width: 200,
		},
    {
			Header: "ID Adjuster License CE",
			accessor: "idAdjusterLicenseCE",
			width: 200,
		},
    {
			Header: "GA Adjuster License CE",
			accessor: "gaAdjusterLicenseCE",
			width: 200,
		},
    {
			Header: "AIMC CE 21 Passing Percentage",
			accessor: "aimCe21PassScore",
			width: 300,
		},
    {
			Header: "Date Passed CE 21",
			accessor: "datePassedCE21",
			width: 200,
		},
    {
			Header: "Date Expiry CE 21",
			accessor: "newDateOfExpiry",
			width: 200,
		},
    {
			Header: "AIMC CE 22 Passing Percentage",
			accessor: "aimcCe22PassScore",
			width: 300,
		},
    {
			Header: "Date Passed CE 22",
			accessor: "datePassedCE22",
			width: 200,
		},
    {
			Header: "Date Expiry CE 22",
			accessor: "newDateOfExpiryTwo",
			width: 200,
		},
    {
			Header: "Notes",
			accessor: "notes",
			width: 200,
		},
		{
			Header: "Action",
			accessor: false,
			width: 100,
		},
	]);

	const [search, setSearch] = useState("");

	useEffect(() => {
		getAIMCGraduatesData().subscribe((response) => {
			if (response.response.Requested_Action) {
				setData(response.response.data);
				const x = response.response.data;
				const e = x.map((val) => ({
					datePassed: val.datePassed ? `${moment(val.datePassed).format("MM/DD/YYYY")}` : "N/A",
					firstName: val.firstName,
					lastName: val.lastName,
					email: val.email,
					passingScore: `${val.passingScore}%`,
					certCode: val.certCode ? val.certCode : "N/A",
					aimc: val.aimc ? val.aimc : "N/A",
					dateOfExpiration: val.dateOfExpiration ? `${moment(val.dateOfExpiration).format("MM/DD/YYYY")}` : "N/A",
					iircCertified: val.iircCertified ? "☑" : "",
					caAdjusterLicenseCE: val.caAdjusterLicenseCE ? "☑" : "",
					flAdjusterLicenseCE: val.flAdjusterLicenseCE ? "☑" : "",
					neAdjusterLicenseCE: val.neAdjusterLicenseCE ? "☑" : "",
					idAdjusterLicenseCE: val.idAdjusterLicenseCE ? "☑" : "",
					gaAdjusterLicenseCE: val.gaAdjusterLicenseCE ? "☑" : "",
					aimCe21: val.aimCe21 ? val.aimCe21 : "N/A",
					aimCe21PassScore: `${val.aimCe21PassScore}%`,
					datePassedCE21: val.datePassedCE21 ? `${moment(val.datePassedCE21).format("MM/DD/YYYY")}` : "N/A",
					newDateOfExpiry: val.newDateOfExpiry ? `${moment(val.newDateOfExpiry).format("MM/DD/YYYY")}` : "N/A",
					aimcCe22PassScore: `${val.aimcCe22PassScore}%`,
					datePassedCE22: val.datePassedCE22 ? `${moment(val.datePassedCE22).format("MM/DD/YYYY")}` : "N/A",
					newDateOfExpiryTwo: val.newDateOfExpiryTwo ?  `${moment(val.newDateOfExpiryTwo).format("MM/DD/YYYY")}`: "N/A",
					notes: val.notes ? val.notes : "N/A",
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
			label: "Date Passed",
			key: "datePassed",
		},
		{
			label: "First Name",
			key: "firstName",
		},
		{
			label: "Last Name",
			key: "lastName",
		},
		{
			label: "Email",
			key: "email",
		},
    {
			label: "Passing Percentage",
			key: "passingScore",
		},
    {
			label: "Certification Code",
			key: "certCode",
		},
    {
			label: "AIMC",
			key: "aimc",
		},
		{
			label: "Date of Expiration",
			key: "dateOfExpiration",
		},
    {
			label: "IICRC Certified",
			key: "iircCertified",
		},
    {
			label: "CA Adjuster License CE",
			key: "caAdjusterLicenseCE",
		},
    {
			label: "FL Adjuster License CE",
			key: "flAdjusterLicenseCE",
		},
		{
			label: "NE Adjuster License CE",
			key: "neAdjusterLicenseCE",
		},
    {
			label: "ID Adjuster License CE",
			key: "idAdjusterLicenseCE",
		},
    {
			label: "GA Adjuster License CE",
			key: "gaAdjusterLicenseCE",
		},
    {
			label: "AIMC CE 21 Passing Percentage",
			key: "aimCe21PassScore",
		},
    {
			label: "Date Passed CE 21",
			key: "datePassedCE21",
		},
    {
			label: "Date Expiry CE 21",
			key: "newDateOfExpiry",
		},
    {
			label: "AIMC CE 22 Passing Percentage",
			key: "aimcCe22PassScore",
		},
    {
			label: "Date Passed CE 22",
			key: "datePassedCE22",
		},
    {
			label: "Date Expiry CE 22",
			key: "newDateOfExpiryTwo",
		},
    {
			label: "Notes",
			key: "notes",
		},
  ];

	const CSV = {
    headers: CSVheaders,
    data: CSVData,
    filename: `AIMC Graduates`
  };

	return (
		<>
			<Helmet>
				<title> 
					AIMC Graduates - Actionable Insights Admin
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
									<div className="col-7">
                    <div className="page_icon">
                      <img src={aimcgraduatesred} />
                    </div>
                    <h3 className="heading">
                      AIMC Graduates
                    </h3>
									</div>
                  <div className="col-5 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/products"
                    >
                      <img src={back} />
                      Back
                    </Link>
                    {!loading && (
											<>
												{CSVData.length !== 0 && (
													<CSVLink {...CSV}>
														<button className="btn csv">
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
                    <div className="col-8" style={{ border: "none" }}></div>
                    <div className="col-4">
                      <Search search={search} setSearch={setSearch} />
                    </div>
                  </div>
                </div>
								{!loading && (
									<div className="table-section overflow-hidden">
										<div className="row">
											<AdminTable
												tableClesses={"table-stripes bktables table-aimc-graduates"}
												headers={headers}
												showHeaders={true}
												data={data}
												search={search}
												setSearch={setSearch}
												Row={({ index, rowData }) => {
													return (
														<tr key={index}>
															<td
																style={{
																	width: "150px",
																}}
															>
																{rowData.original.datePassed ? `${moment(rowData.original.datePassed).format("MM/DD/YYYY")}` : "N/A"}
															</td>
															<td
																style={{
																	width: "150px",
																}}
															>
																{rowData.original.firstName ? rowData.original.firstName : "N/A"}
															</td>
															<td
																style={{
																	width: "150px",
																}}
															>
																{rowData.original.lastName ? rowData.original.lastName : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																	wordBreak: "break-all",
																}}
															>
																{rowData.original.email ? rowData.original.email : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.passingScore}%
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.certCode ? rowData.original.certCode : "N/A"}
															</td>
															<td
																style={{
																	width: "150px",
																}}
															>
																{rowData.original.aimc ? rowData.original.aimc : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.dateOfExpiration ? `${moment(rowData.original.dateOfExpiration).format("MM/DD/YYYY")}` : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																<div>
																	<input
																		type="checkbox"
																		id={`iircCertified_${index}`}
																		checked={rowData.original.iircCertified}
																	/>
																	<label htmlFor="allShipped"></label>
																</div>
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																<div>
																	<input
																		type="checkbox"
																		id={`caAdjusterLicenseCE_${index}`}
																		checked={rowData.original.caAdjusterLicenseCE}
																	/>
																	<label htmlFor="allShipped"></label>
																</div>
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																<div>
																	<input
																		type="checkbox"
																		id={`flAdjusterLicenseCE_${index}`}
																		checked={rowData.original.flAdjusterLicenseCE}
																	/>
																	<label htmlFor="allShipped"></label>
																</div>
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																<div>
																	<input
																		type="checkbox"
																		id={`neAdjusterLicenseCE_${index}`}
																		checked={rowData.original.neAdjusterLicenseCE}
																	/>
																	<label htmlFor="allShipped"></label>
																</div>
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																<div>
																	<input
																		type="checkbox"
																		id={`idAdjusterLicenseCE_${index}`}
																		checked={rowData.original.idAdjusterLicenseCE}
																	/>
																	<label htmlFor="allShipped"></label>
																</div>
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																<div>
																	<input
																		type="checkbox"
																		id={`gaAdjusterLicenseCE_${index}`}
																		checked={rowData.original.gaAdjusterLicenseCE}
																	/>
																	<label htmlFor="allShipped"></label>
																</div>
															</td>
															<td
																style={{
																	width: "300px",
																}}
															>
																{rowData.original.aimCe21PassScore}%
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.datePassedCE21 ? `${moment(rowData.original.datePassedCE21).format("MM/DD/YYYY")}` : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.newDateOfExpiry ? `${moment(rowData.original.newDateOfExpiry).format("MM/DD/YYYY")}` : "N/A"}
															</td>
															<td
																style={{
																	width: "300px",
																}}
															>
																{rowData.original.aimcCe22PassScore}%
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.datePassedCE22 ? `${moment(rowData.original.datePassedCE22).format("MM/DD/YYYY")}` : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.newDateOfExpiryTwo ? `${moment(rowData.original.newDateOfExpiryTwo).format("MM/DD/YYYY")}` : "N/A"}
															</td>
															<td
																style={{
																	width: "200px",
																}}
															>
																{rowData.original.notes ? rowData.original.notes : "N/A"}
															</td>
															<td
																style={{
																	width: "100px",
																}}
															>
																<div className="view_icon_users">
																	<Link
																		to={`/gi-team/products/update-aimc-graduate/${rowData.original.id}`}
																	>
																		<img src={edit} />
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

export default withRouter(AimcGraduates);