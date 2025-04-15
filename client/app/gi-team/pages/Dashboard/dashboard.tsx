import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import TotalActiveSubscriptions from "assets/TotalActiveSubscriptions.svg";
import NewSubscriptionsOrdered from "assets/NewSubscriptionsOrdered.svg";
import TotalnumberofEnterpriseSubscriptions from "assets/TotalnumberofEnterpriseSubscriptions.svg";
import TotalnumberofProPlanSubscriptions from "assets/TotalnumberofProPlanSubscriptions.svg";
import SubscriptionsCancelled from "assets/SubscriptionsCancelled.svg";
import SubscriptionsPaused from "assets/SubscriptionsPaused.svg";
import NewSignUps from "assets/NewSignUps.svg";
import UsersLoggedIn from "assets/UsersLoggedIn.svg";
import FailedPayments from "assets/FailedPayments.svg";
import { GetDashboardData } from "../../../../utils/api-routes/api-routes.util";

const Dashboard = (props) => {

	const[data, setData] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("role") == "Analyst") {
			setLoading(false);
		} else {
			GetDashboardData().subscribe((response) => {
				if (response.response.Requested_Action) {
					setData(response.response.data);
					setLoading(false);
				} else {
					alert("error");
				}
			});
		}
	}, []);

	return (
		<>
			<Helmet>
				<title> 
					Dashboard - Actionable Insights Admin
				</title>
      </Helmet>
			<div className="dashboard">
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
							{!loading && (
								<>
									{localStorage.getItem("role") == "Analyst" ? (
										<div className="dashboard-section">
											<h2> Dashboard </h2>
										</div>
									) : (
										<div className="dashboard-section">
											<div className="row">
												<div className="col-12">
													<h3> Subscriptions </h3>
													<div className="row">
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Total Active Subscriptions`]} </h5>
																<br />
																<p className="pt-4"> Total Active Subscriptions </p>
															</div>
															<div className="dashboard-icon bg-active">
																<img
																	src={TotalActiveSubscriptions}
																	alt="TotalActiveSubscriptions"
																	loading="lazy"
																/>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Total Subscriptions Ordered Today`]} </h5>
																{/* <h4 className="price">
																	<NumberFormat
																		value={(8800 / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																</h4> */}
																<br />
																<p className="pt-3">
																	New Subscriptions Ordered
																	<br />
																	(Today)
																</p>
															</div>
															<div className="dashboard-icon bg-active">
																<img
																	src={NewSubscriptionsOrdered}
																	alt="NewSubscriptionsOrdered"
																	loading="lazy"
																/>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Total number of Enterprise Subscriptions`]} </h5>
																<br />
																<p className="pt-3">
																	Total number of Enterprise
																	<br />
																	Subscriptions
																</p>
															</div>
															<div className="dashboard-icon bg-active">
																<img
																	src={TotalnumberofEnterpriseSubscriptions}
																	alt="TotalnumberofEnterpriseSubscriptions"
																	loading="lazy"
																/>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Total number of Pro Plan Subscriptions`]} </h5>
																<br />
																<p className="pt-3">
																	Total number of Pro Plan
																	<br />
																	Subscriptions
																</p>
															</div>
															<div className="dashboard-icon bg-active">
																<img
																	src={TotalnumberofProPlanSubscriptions}
																	alt="TotalnumberofProPlanSubscriptions"
																	loading="lazy"
																/>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Subscriptions Cancelled (Today)`]} </h5>
																{/* <h4 className="price failed">
																	<NumberFormat
																		value={(4400 / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																</h4> */}
																<br />
																<p className="pt-3">
																	Subscriptions Cancelled
																	<br />
																	(Today)
																</p>
															</div>
															<div className="dashboard-icon bg-failed">
																<img
																	src={SubscriptionsCancelled}
																	alt="SubscriptionsCancelled"
																	loading="lazy"
																/>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Subscriptions Paused (Today)`]} </h5>
																<br />
																<p className="pt-4">
																	Subscriptions Paused
																	<br />
																	(Today)
																</p>
															</div>
															<div className="dashboard-icon bg-paused">
																<img
																	src={SubscriptionsPaused}
																	alt="SubscriptionsPaused"
																	loading="lazy"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row mt-5">
												<div className="col-12">
													<h3> Users </h3>
													<div className="row">
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`New Sign Ups (Today)`]} </h5>
																<br />
																<p className="pt-4"> New Sign Ups (Today) </p>
															</div>
															<div className="dashboard-icon bg-active">
																<img
																	src={NewSignUps}
																	alt="NewSignUps"
																	loading="lazy"
																/>
															</div>
														</div>
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> {data[`Users Logged In (Today)`]}  </h5>
																<br />
																<p className="pt-4"> Users Logged In (Today) </p>
															</div>
															<div className="dashboard-icon bg-active">
																<img
																	src={UsersLoggedIn}
																	alt="UsersLoggedIn"
																	loading="lazy"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
											{/* <div className="row mt-5">
												<div className="col-12">
													<h3> Payments </h3>
													<div className="row">
														<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-4">
															<div className="dashboard-data">
																<h5> 6 </h5>
																<h4 className="price failed">
																	<NumberFormat
																		value={(26400 / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																</h4>
																<br />
																<p className="pt-2"> Failed Payments (Today) </p>
															</div>
															<div className="dashboard-icon bg-failed">
																<img
																	src={FailedPayments}
																	alt="FailedPayments"
																	loading="lazy"
																/>
															</div>
														</div>
													</div>
												</div>
											</div> */}
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
		</>
	);
};

export default withRouter(Dashboard);