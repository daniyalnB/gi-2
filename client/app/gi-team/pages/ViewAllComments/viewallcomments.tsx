import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import viewallcommentsred from "assets/ViewAllCommentsRed.svg";
import Events from "assets/EventsComments.svg";
import PLUS from "assets/PLUSComments.svg";
import InsightSheet from "assets/InsightSheetComments.svg";
import COLID from "assets/COLIDComments.svg";
import right from "assets/productright.png";
import { Helmet } from "react-helmet";
import { getCommentsTypeAndCount } from "../../../../utils/api-routes/api-routes.util";

const ViewAllComments = (props) => {

	const [loading, setLoading] = useState(true);

	const [EventsComments, setEventsComments] = useState([]);
	const [PLUSComments, setPLUSComments] = useState([]);
	const [InsightSheetComments, setInsightSheetComments] = useState([]);
	const [COLIDComments, setCOLIDComments] = useState([]);

	useEffect(() => {
		getCommentsTypeAndCount().subscribe((response) => {
      if (response.response.Requested_Action) {
				const x = response.response.data;
				const e = x.filter((comment) => comment.type === "Events")[0];
        setEventsComments(e);
				const p = x.filter((comment) => comment.type === "PLUS")[0];
        setPLUSComments(p);
				const is = x.filter((comment) => comment.type === "Insight Sheet")[0];
        setInsightSheetComments(is);
				const c = x.filter((comment) => comment.type === "COLID")[0];
        setCOLIDComments(c);
				setLoading(false);
			}
    });
  }, []);

	return (
		<>
			<Helmet>
        <title> 
					View All Comments - Actionable Insights Admin
        </title>
      </Helmet>
			<div className="products">
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
							<div className="row products-section">
								<div className="row header">
									<div className="col-12">
										<div className="page_icon">
											<img src={viewallcommentsred} />
										</div>
										<h3 className="heading">
											Comments
										</h3>
									</div>
								</div>
								<hr />
								<div className="inner_sub_area">
									<>
										{!loading && (
											<div className="row products-data">
												<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
													<div className="data">
														<div className="row">
															<div className="data-image-one col-3">
																<img src={Events} />
															</div>
															<div className="data-text col-7">
																<h3> {EventsComments.type} </h3>
																<h4> {EventsComments.count} Comments </h4>
															</div>
															<div className="data-image-two col-2">
																<Link
																	to={`/gi-team/view-all-comments/${EventsComments.type}`}
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
																<img src={PLUS} />
															</div>
															<div className="data-text col-7">
																<h3> {PLUSComments.type} </h3>
																<h4> {PLUSComments.count} Comments </h4>
															</div>
															<div className="data-image-two col-2">
																<Link
																	to={`/gi-team/view-all-comments/${PLUSComments.type}`}
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
																<img src={InsightSheet} />
															</div>
															<div className="data-text col-7">
																<h3> {InsightSheetComments.type} </h3>
																<h4> {InsightSheetComments.count} Comments </h4>
															</div>
															<div className="data-image-two col-2">
																<Link
																	to={`/gi-team/view-all-comments/${InsightSheetComments.type}`}
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
																<img src={COLID} />
															</div>
															<div className="data-text col-7">
																<h3> {COLIDComments.type} </h3>
																<h4> {COLIDComments.count} Comments </h4>
															</div>
															<div className="data-image-two col-2">
																<Link
																	to={`/gi-team/view-all-comments/${COLIDComments.type}`}
																>
																	<img src={right} />
																</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										)}
										{loading && (
											<div className="loader-inner">
												<LottieLoader />
											</div>
										)}
									</>
								</div>
							</div>
						</div> 
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(ViewAllComments);