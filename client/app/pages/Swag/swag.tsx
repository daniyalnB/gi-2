import React, { Suspense, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllSwagProductsCustomer } from "../../../utils/api-routes/api-routes.util";

const Swag = () => {

	const [path, setPath] = useState(location.pathname);

	const [loading, setLoading] = useState(true);
	
  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllSwagProductsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
				setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

	const publisheddata = data.filter((val) => val.draft === false);

	return (
		<>
			<SEO
        title="SWAG - Actionable Insights Merch | Estimate in style"
        description="Explore all the Swag merch, we have to offer. You can even use Insighter Points to pay for items. Get your hands on more from Actionable Insights."
				link="swag"
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
					<div className="Swag">
						<div className="">
							<div className="holder">
								<h2> Swag </h2>
							</div>
							{!loading && (
								<div className="row">
									{publisheddata.map((val, ke) => {
										return (
											<div className="col-xl-4 col-lg-4 col-md-12">
												<div className="item">
													<h5 className="type"> {val.category} </h5>
													<img
														src={val.featuredimages[val.defaultfeatureimageindex]}
														alt={val.title}
														loading="lazy"
													/>
													<h4 className="name"> {val.title} </h4>
												</div>
											</div>
										);
									})}
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

export default Swag;