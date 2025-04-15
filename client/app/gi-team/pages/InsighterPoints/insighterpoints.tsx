import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Helmet } from "react-helmet";
import insighterpointsred from "assets/InsighterPointsRed.svg";
import audit from "assets/Audit.svg";
import viewcodes from "assets/ViewCodes.svg";
import viewuserbalance from "assets/ViewUserBalance.svg";
import right from "assets/productright.png";

const InsighterPoints = (props) => {
	return (
		<>
			<Helmet>
        <title> 
					Insighter Points - Actionable Insights Admin
        </title>
      </Helmet>
			<div className="pricelist">
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
							<div className="plus-section">
								<div className="row header">
									<div className="col-9">
										<div className="page_icon">
												<img src={insighterpointsred} />
										</div>
										<h3 className="heading">
											Insighter Points
										</h3>
									</div>
								</div>
								<hr />
								<div className="inner_sub_area">
									<div className="row insighter-points-data">
										<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
											<div className="data">
												<div className="row">
													<div className="data-image-one col-3">
														<img src={viewcodes} />
													</div>
													<div className="data-text col-6">
														<h3> View Codes </h3>
													</div>
													<div className="data-image-two col-3">
														<Link
															to="/gi-team/insighter-points/view-codes"
														>
															<img src={right} />
														</Link>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
											<div className="data">
												<div className="row">
													<div className="data-image-one col-3">
														<img src={viewuserbalance} />
													</div>
													<div className="data-text col-6">
														<h3> View User Balance </h3>
													</div>
													<div className="data-image-two col-3">
														<Link
															to="/gi-team/insighter-points/view-user-balance"
														>
															<img src={right} />
														</Link>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
											<div className="data">
												<div className="row">
													<div className="data-image-one col-3">
														<img src={audit} />
													</div>
													<div className="data-text col-6">
														<h3> Audit </h3>
													</div>
													<div className="data-image-two col-3">
														<Link
															to="/gi-team/insighter-points/audit"
														>
															<img src={right} />
														</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div> 
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(InsighterPoints);