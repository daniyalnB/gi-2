import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import productsred from "assets/ProductsRed.svg";
import swag from "assets/swag.png";
import giftcards from "assets/giftcards.png";
import macro from "assets/macro.png";
import umpiremanual from "assets/umpiremanual.png";
import certifications from "assets/certifications.png";
import estimateengines from "assets/estimateengines.png";
import insighterpointsbucket from "assets/insighterpointsbucket.png";
import aimcgraduates from "assets/aimcgraduates .png";
import right from "assets/productright.png";
import { Helmet } from "react-helmet";
import {
	GetAllMacros,
	GetAllSwagProducts,
	GetAllUmpiresManuals,
	getAllCertifications,
	getAIMCGraduatesData,
} from "../../../../utils/api-routes/api-routes.util";

const Products = (props) => {

	const [macroProducts, setMacroProducts] = useState(0);
	const [swagProducts, setSwagProducts] = useState(0);
	const [umpiresmanualProducts, setUmpiresManualProducts] = useState(0);
	const [certificationProducts , setCertificationProducts] = useState(0);
	const [aimcGraduates , setAimcGraduates] = useState(0);

	useEffect(() => {
		GetAllMacros().subscribe((response) => {
      if (response.response.Requested_Action) {
        setMacroProducts(response.response.data.length);
			}
    });
    GetAllSwagProducts().subscribe((response) => {
      if (response.response.Requested_Action) {
        setSwagProducts(response.response.data.length);
			}
    });
		GetAllUmpiresManuals().subscribe((response) => {
      if (response.response.Requested_Action) {
        setUmpiresManualProducts(response.response.data.length);
      }
    });
		getAllCertifications().subscribe((response) => {
      if (response.response.Requested_Action) {
        setCertificationProducts(response.response.data.length);
      }
    });
		getAIMCGraduatesData().subscribe((response) => {
      if (response.response.Requested_Action) {
        setAimcGraduates(response.response.data.length);
      }
    });
  }, []);

	return (
		<>
			<Helmet>
        <title> 
					Products - Actionable Insights Admin
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
											<img src={productsred} />
										</div>
										<h3 className="heading">
											Products
										</h3>
									</div>
								</div>
								<hr />
								<div className="inner_sub_area">
									<div className="row products-data">
										<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
											<div className="data">
												<div className="row">
													<div className="data-image-one col-3">
														<img src={swag} />
													</div>
													<div className="data-text col-7">
														<h3> Swag </h3>
														<h4> {swagProducts} product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/swag"
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
														<img src={giftcards} />
													</div>
													<div className="data-text col-7">
														<h3> Gift Cards </h3>
														<h4> 4 product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/gift-cards"
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
														<img src={macro} />
													</div>
													<div className="data-text col-7">
														<h3> Macro </h3>
														<h4> {macroProducts} product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/macro"
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
														<img src={umpiremanual} />
													</div>
													<div className="data-text col-7">
														<h3> Umpire's Manual </h3>
														<h4> {umpiresmanualProducts} product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/umpires-manual"
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
														<img src={certifications} />
													</div>
													<div className="data-text col-7">
														<h3> Certifications </h3>
														<h4> {certificationProducts} product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/certifications"
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
														<img src={estimateengines} />
													</div>
													<div className="data-text col-7">
														<h3> Estimate Engines </h3>
														<h4> 1 product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/estimate-engines"
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
														<img src={insighterpointsbucket} />
													</div>
													<div className="data-text col-7">
														<h3> Insighter Points Buckets </h3>
														<h4> 4 product(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/insighter-points-buckets"
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
														<img src={aimcgraduates} />
													</div>
													<div className="data-text col-7">
														<h3> AIMC Graduates </h3>
														<h4> {aimcGraduates} graduates(s) </h4>
													</div>
													<div className="data-image-two col-2">
														<Link
															to="/gi-team/products/graduates"
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

export default withRouter(Products);