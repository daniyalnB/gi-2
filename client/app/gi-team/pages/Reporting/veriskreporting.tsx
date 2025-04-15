import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import reportingRedred from "assets/ReportingRed.svg";
import { Helmet } from "react-helmet";

const VeriskReporting = (props) => {

  const [loading, setLoading] = useState(false);

	return (
		<>
			<Helmet>
        <title> 
          Verisk Reporting - Actionable Insights Admin
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
											<img src={reportingRedred} />
										</div>
										<h3 className="heading">
                      Verisk Reporting
										</h3>
									</div>
								</div>
								<hr />
								<div className="inner_sub_area">
                  {!loading && (
                    <div className="row products-data">
											<iframe
												src="https://app.powerbi.com/reportEmbed?reportId=8b05de9d-4697-435e-9e0d-d8a41fd7df68&autoAuth=true&ctid=217aa19a-ae13-4a21-8be7-7e997b9fe462"
												frameBorder="0"
												allow="autoplay; encrypted-media"
												allowFullScreen
												loading="lazy"
												name="VeriskReporting"
												style={{
													width: "100%",
													height: "100vh",
												}}
											/>
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
			</div>
		</>
	);
};

export default withRouter(VeriskReporting);