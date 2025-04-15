import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import history from "../../../../utils/history";
import queryString from "query-string";
import moment from "moment";
import { Helmet } from "react-helmet";
import { 
	AddOrUpdateCommonlyOverlookedLineItems,
	GetAllCommonlyOverlookedLineItems
} from "../../../../utils/api-routes/api-routes.util";
import browse from "assets/upload.svg";
import back from "assets/arrowleft.svg";
import date from "assets/date.png";

const UpdateCommonlyUsedLineItems = (props) => {

	const [loadingData, setLoadingData] = useState(true);
	
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);

	function parse (val) {
		const name = queryString.parse(`name=${val}`).name;
		return name;
	}

	const [lineitems, setLineItems] = useState({
		id: "",
		tabtitle: "",
		iframeURL: "",
		keywords: "",
		coverimage: "",
		facebookogimage: "",
		updatedAt: "",

	});

	useEffect(() => {
		GetAllCommonlyOverlookedLineItems().subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data.filter(
					(lineitem) => lineitem.id === "424bf3ae-657d-499e-a275-d2873e1529e1"
				)[0];
				setLineItems({
					...lineitems,
					id: x.id,
					tabtitle: x.tabtitle,
					iframeURL: x.iframeURL,
					keywords: x.keywords,
					coverimage: x.coverimage,
					facebookogimage: x.facebookogimage,
					updatedAt: x.updatedAt,
				});
				setLoadingData(false);
			} else {
				alert("error");
			}
		});
	}, []);

	const onSelect = (e) =>
	setLineItems({ ...lineitems, [e.target.name]: e.target.files[0] });

	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		const payload = {
			id: lineitems.id,
			tabtitle: lineitems.tabtitle,
			iframeURL: lineitems.iframeURL,
		};
		const formData = new FormData();
		formData.append("coverimage", lineitems.coverimage);
		formData.append("facebookogimage", lineitems.facebookogimage);
		formData.append("keywords", lineitems.keywords);

		const stringified = queryString.stringify(payload);

		AddOrUpdateCommonlyOverlookedLineItems(stringified, formData).subscribe((response) => {
			if (response.response.Requested_Action) {
				setLoading(false);
				setError(false);
				update();
				document.getElementById("form").reset();
			} else {
				setError(response.response.Message);
			}
		});
	};
    
	function update () {
		GetAllCommonlyOverlookedLineItems().subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data.filter(
					(lineitem) => lineitem.id === "424bf3ae-657d-499e-a275-d2873e1529e1"
				)[0];
				setLineItems({
					...lineitems,
					id: x.id,
					tabtitle: x.tabtitle,
					iframeURL: x.iframeURL,
					keywords: x.keywords,
					coverimage: x.coverimage,
					facebookogimage: x.facebookogimage,
					updatedAt: x.updatedAt,
				});
			}
		});
	}

	return (
		<>
			<Helmet>
				<title> 
					Commonly Used Line Items - Actionable Insights Admin
				</title>
			</Helmet>
			<div className="createInsightSheet">
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
							<div className="createInsightSheet-section">
								<div className="row header">
									<div className="col-9">
										<h3 className="heading">
											Commonly Used Line Items
										</h3>
									</div>
								</div>
								<hr />
								{!loadingData && (
									<form onSubmit={handleSubmit} id="form">
										<div className="info-data" style={{ minHeight: "50vh"}}>
											<div className="form-holder">
												<div className="row">
													<div className="col-9" style={{ padding: "0px" }}>
														<div className="row">
															<div className="col-12">
																<div className="form-group nogroup">
																	<input 
																		type="text" 
																		name="url" 
																		required 
																		id="inputField1" 
																		className="input-area"
																		value={lineitems.iframeURL}
																		onChange={(e) =>
																			setLineItems({
																				...lineitems,
																				iframeURL: e.currentTarget.value,
																			})
																		}
																	/>
																	<label htmlFor="inputField1" className="floating_label"> iframe URL </label>
																</div>
															</div>
														</div>
														<div className="row">
															<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
																<div className="form-group nogroup">
																	<label className="file">
																		<input
																			type="file"
																			name="coverimage"
																			accept="image/png, image/jpg, image/jpeg, image/webp"
																			onChange={onSelect}
																			onClick={(e) => (e.target.value = null)}
																		/>
																		<span className="file-custom">  Cover Image  </span>
																	</label>
																	<div className="resolution"> Upload blurred image for non authorized user. </div>
																	{lineitems.coverimage ? (
																		<div className="facebook-image-name">
																			<a href={lineitems.coverimage} target="_blank">
																				{lineitems.coverimage.name ? (
																					`${"   " + lineitems.coverimage.name}`
																				) : (
																					parse(`${lineitems.coverimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
																				)}
																			</a>
																		</div>
																	) : (
																		<div className="facebook-image-name">
																			Not Available
																		</div>
																	)}
																</div>
															</div>
															<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
																<div className="form-group nogroup">
																	<label className="file">
																		<input
																			type="file"
																			name="facebookogimage"
																			accept="image/png, image/jpg, image/jpeg, image/webp"
																			onChange={onSelect}
																			onClick={(e) => (e.target.value = null)}
																		/>
																		<span className="file-custom">  Facebook OG Image  </span>
																	</label>
																	<div className="resolution"> Image resolution 1200 x 630 pixels </div>
																	{lineitems.facebookogimage ? (
																		<div className="facebook-image-name">
																			<a href={lineitems.facebookogimage} target="_blank">
																				{lineitems.facebookogimage.name ? (
																					`${"   " + lineitems.facebookogimage.name}`
																				) : (
																					parse(`${lineitems.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
																				)}
																			</a>
																		</div>
																	) : (
																		<div className="facebook-image-name">
																			Not Available
																		</div>
																	)}
																</div>
															</div>
														</div>
														<div className="mt-4"></div>
														<div className="row">
															<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
																<div className="form-group nogroup">
																	<textarea
																		name="tabtitle"
																		required
																		id="textField1"
																		className="input-area"
																		value={lineitems.tabtitle}
																		onChange={(e) =>
																			setLineItems({
																				...lineitems,
																				tabtitle: e.currentTarget.value,
																			})
																		}
																	/>  
																	<label htmlFor="textField1" className="floating_label"> Tab Title </label>
																</div>
															</div>
															<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
																<div className="form-group nogroup">
																	<textarea
																		name="keywords"
																		required
																		id="textField2"
																		className="input-area"
																		value={lineitems.keywords}
																		onChange={(e) =>
																			setLineItems({
																				...lineitems,
																				keywords: e.currentTarget.value,
																			})
																		}
																	/>  
																	<label htmlFor="textField2" className="floating_label"> Keywords </label>
																</div>
															</div>
														</div>
													</div>
													<div className="col-3 text-left">
														<div className="last_updated_on">
															<h3> Last updated on: </h3>
															<div id="status">
																<img src={date} />
																<h5> {moment(lineitems.updatedAt).format("MM/DD/YYYY h:mm a")} </h5>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<hr className="second-hr" />
										<div className="Buttons">
											<div className="row">
												{!loading && 
													<button 
														className="btn"
														type="submit"
														disabled={localStorage.getItem("role") == "Analyst" ? true : false}
													> 
														<span> Update </span>
													</button>
												}
												{loading && (
													<button className="btn" disabled> 
														<i className="fas fa-spinner fa-spin"></i>
													</button>
												)}
											</div>
										</div>
										{localStorage.getItem("role") == "Analyst" && (
											<div
												style={{
													padding: "0px 20px 20px 20px",
													textAlign: "center",
												}}
											>
												<div 
													className="form-group alert alert-danger"
													style={{ 
														margin: "0px",
														width: "270px",
													}}
												>
													You need to be an Admin or Editor to Update
												</div>
											</div> 
										)}
										{error ? (
											<div
												style={{
													padding: "0px 20px 20px 20px",
													textAlign: "center",
												}}
											>
												<div 
													className="form-group alert alert-danger"
													style={{ margin: "0px" }}
												>
													{error}
												</div>
											</div> 
										) : (
											""
										)}
									</form>
								)}
								{loadingData && (
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

export default withRouter(UpdateCommonlyUsedLineItems);