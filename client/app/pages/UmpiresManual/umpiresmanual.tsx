import React, { Suspense, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllUmpiresManualsCustomer } from "../../../utils/api-routes/api-routes.util";

const UmpiresManual = () => {

	const [path, setPath] = useState(location.pathname);

	const [loading, setLoading] = useState(true);

  const [mitigation, setMitigation] = useState([]);
	const [repair, setRepair] = useState([]);

	useEffect(() => {
    GetAllUmpiresManualsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
				const x = response.response.data[0];
        setMitigation(x);
				const y = response.response.data[1];
				setRepair(y);
      } else {
        alert("error");
      }
    });
  }, []);

	return (
		<>
			<SEO
        title="Actionable Insights Mitigation & Repair Manuals - Actionable Insights"
        description="Explore Actionable Insights analog database. Aside from digital resouces, we convert the Insight Sheet Database to a print format annually.
				- (Annually, Actionable Insights converts the Insight Sheet Database to a print format. These spiral bound books are enormous. Both the Umpire's Mitigation ...)"
				link="actionable-insights-mitigation-and-repair-manual"
			/>
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
				<ScrollToTop />
				<Navbar />
        <Breadcrumbs />
				<div className="main-container">
					<div className="Umpires_Manual">
						<div className="">
							<div className="holder">
								<h2> Some folks dig the analog experience. </h2>
								<h4> Write your notes in the margins, highlight and add post-its notes 'till your heart's content. </h4>
								<h3> The Umpire's Manuals, the precursor to the Insight Sheet Database, has evolved significantly from its origins, transitioning from physical spiral-bound books to a comprehensive digital database. This evolution represents a shift in how property insurance claims, particularly within the realm of property insurance and Xactimate, are estimated and processed. </h3>
								<h3> Originally, the enormous spiral bound books were collections of detailed breakdowns for various property loss scenarios. These books provided estimators with a standardized method to build scopes in Xactimate, ensuring consistency and accuracy across estimates. Adjusters and contractors could refer to these books to find detailed, itemized breakdowns of line items associated with specific property loss scenarios. </h3>
								<h3> Now the Umpire's Mitigation and Repair Manuals have transitioned into digital format known as the{" "}
									<Link to="/insight-sheets">
										Insight Sheet Database
									</Link>
								.</h3>
								<h3> The original physical spiral bound books are on display at the Actionable Insights headquarters. </h3>
							</div>
							{!loading && (
								<div className="Manual_Section">
									<div className="row">
										<div className="col-xl-6 col-lg-6 col-md-12">
											<h3> {mitigation.title} </h3>
											<div className="manual_border">
												<img 
													src={mitigation.bannerimage}
													alt={mitigation.title}
													loading="lazy"
												/>
												<div className="row values">
													<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
														<h5 className="isbn"> ISBN: 9781513645926 </h5>
														<h5 className="isbn"> Spiral Bound - Full Color </h5>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-12">
											<h3> {repair.title} </h3>
											<div className="manual_border">
												<img 
													src={repair.bannerimage} 
													alt={repair.title}
													loading="lazy"
												/>
												<div className="row values">
													<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
														<h5 className="isbn"> ISBN: 9781513645896 </h5>
														<h5 className="isbn"> Spiral Bound - Full Color </h5>
													</div>
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
						</div>
					</div>
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(UmpiresManual);