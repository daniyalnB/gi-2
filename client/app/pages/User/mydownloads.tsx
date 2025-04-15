import React, { Suspense, useEffect, useState } from "react";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { Helmet } from "react-helmet";
import { getBoughtMacros } from "utils/api-routes/api-routes.util";

const MyDownloads = () => {

	const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    getBoughtMacros().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
				setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

	return (
		<>
			<Helmet>
				<title> 
					My Downloads - Actionable Insights
				</title>
			</Helmet>
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
				<div className="main-container" style={{ minHeight: "150vh" }}>
					<div className="Receipt">
						<div className="">
							<div className="holder">
								<h2 style={{ paddingBottom: "0px" }}>
									My Downloads 
								</h2>
							</div>
							{!loading && (
                <>
                  <div className="order-info" style={{ marginTop: "0px", paddingBottom: "0px" }}>
										<div className="order">
											<div className="row">
												<div className="col">
													<h3 className="text-left"> Resources </h3>
												</div>
											</div>
										</div>
										{data.length == 0 ? (
											<div className="my-download-products">
												<div className="row">
													<div className="col">
														<h3 className="text-left"> No downloads available yet. </h3>
													</div>
												</div>
											</div>
										) : (
											""
										)}
										{data.map((val, key) => {
											return (
												<>
													<div className="my-download-products">
														<div className="row">
															<div className="col-md-6 col-sm-6 col-12">
																<h3 className="text-left"> {val.macro.title} </h3>
															</div>
															<div className="col-md-6 col-sm-6 col-12 text-right">
																<a
																	href={val.snapshotinfo1}
                            			target="_blank"
																>
																	Download
																</a>
															</div>
														</div>
													</div>
												</>
											);
										})}
									</div>
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
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default MyDownloads;