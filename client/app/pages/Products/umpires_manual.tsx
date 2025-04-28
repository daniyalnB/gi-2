import React, { Suspense, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllUmpiresManualsCustomer } from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import Lightbox from "react-image-lightbox";
import { Carousel } from "react-responsive-carousel";
import { NumericFormat } from "react-number-format";

const ProductUmpiresManual = (props) => {

	const navigate = useNavigate();
	const { permalink } = useParams();

	const [show, setShow] = useState(true);

	const [loading, setLoading] = useState(true);

	const [path, setPath] = useState(location.pathname);

	// const { getCustomerInfo, myInfo } = useContext(AppContext);

	// useEffect(() => {
	// 	getCustomerInfo();
  // }, []);
	
	const [data, setData] = useState(false);

	const [featuredimages, setFeaturedImages] = useState([]);

	useEffect(() => {
		// GetAllUmpiresManualsCustomer().subscribe((response) => {
		// 	if (response.response.Requested_Action) {
		// 		const x = response.response.data.filter(
		// 			(manual) => manual.permalink === permalink
		// 		)[0];
		// 		if (x == undefined) {
		// 			setShow(false);
    //     }
		// 		setData(x);
		// 		swap(x.featuredimages,x.defaultfeatureimageindex);
		// 		setLoading(false);
		// 	} else {
		// 		setShow(false);
		// 	}
		// });
		navigate("/actionable-insights-mitigation-and-repair-manual");
	}, []);

	function swap (arr, a){    
		var temp = arr[a];  
		arr[a] = arr[0];  
		arr[0] = temp;
		setFeaturedImages(arr);
 	}

	const [photoIndex, setPhotoIndex] = useState(0)
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {setIsOpen(true)}

	const [quantity, setQuantity] = useState("1");

	const [objContactInformationForOrderDTO, setObjContactInformationForOrderDTO] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    companyname: "",
		branch: "",
    streetaddress: "",
    aptorunitorsuite: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    profilepicture: "",
  });

  // useEffect(() => {
  //   if (myInfo) {
  //     setObjContactInformationForOrderDTO({
  //       ...objContactInformationForOrderDTO,
  //       firstname: myInfo.ownerinfo.firstname,
  //       lastname: myInfo.ownerinfo.lastname,
  //       phonenumber: myInfo.ownerinfo.phonenumber,
  //       companyname: myInfo.ownerinfo.companyname ? myInfo.ownerinfo.companyname : "",
  //       branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
  //       streetaddress: myInfo.ownerinfo.streetaddress ? myInfo.ownerinfo.streetaddress : "",
  //       aptorunitorsuite: myInfo.ownerinfo.aptorunitorsuite ? myInfo.ownerinfo.aptorunitorsuite : "",
  //       city: myInfo.ownerinfo.city ? myInfo.ownerinfo.city : "",
  //       state: myInfo.ownerinfo.state ? myInfo.ownerinfo.state : "",
  //       zipcode: myInfo.ownerinfo.zipcode ? myInfo.ownerinfo.zipcode : "",
  //       profilepicture: myInfo.ownerinfo.profilepicture,
  //     });
  //   }
  // }, [myInfo]);

	const handleSubmit = () => {
		localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
		navigate("/checkout", {
			state: {
				manual: data,
				quantity: parseInt(quantity),
				type: "manual",
				path: path,
			}
		});
	}

	return (
		<>
			{show ? (
        <>
					<SEO
						title={
							data
								? data.metatitle || data.metatitle !== null
									? `${data.metatitle}`
									: `${data.tabtitle}`
								: "Actionable Insights"
						}
						description={data.metadescription ? `${data.metadescription}` : ""}
						link={`shop/uncategorized/${data.permalink}`}
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
							<div className="product_page">
								<div className="">
									{!loading && (
										<div className="row product">
											<div className="col-xl-5 col-lg-5 col-md-12">    
												<div className="coursel-featured-images">
													<Carousel 
														showArrows={false} 
														showIndicators={false} 
														showStatus={false} 
														useKeyboardArrows={true}
													>
														{featuredimages.map((val, index) => {
															return (
																<div 
																	style={{ cursor: "pointer" }}
																	onClick={() => handleOpen()}
																>
																	<img
																		src={val}
																		loading="lazy"
																	/>
																</div>
															);
														})}
													</Carousel>
												</div>  
												{isOpen ? (
													<Lightbox
														mainSrc={featuredimages[photoIndex]}
														nextSrc={featuredimages[(photoIndex + 1) % featuredimages.length]}
														prevSrc={featuredimages[(photoIndex + featuredimages.length - 1) % featuredimages.length]}
														onCloseRequest={() => setIsOpen(false)}
														onMovePrevRequest={() =>
															setPhotoIndex((photoIndex + featuredimages.length - 1) % featuredimages.length)
														}
														onMoveNextRequest={() =>
															setPhotoIndex((photoIndex + 1) % featuredimages.length)
														}
													/>
												) : (
													""
												)}  
											</div>
											<div className="col-xl-7 col-lg-7 col-md-12">
												<div className="data-section">
													<div className="row">
														<div className="col-xl-8 col-lg-8 col-md-12">
															<h2 className="name"> {data.title} </h2>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-12">
															<div style={{ textAlign: "right" }}>
																{/* <h2 className="prevprice"> <del> ${data.priceincents * 100} </del> </h2> */}
																<NumericFormat 
																	className="price"
																	value={(data.priceincents / 100).toFixed(2)}
																	displayType={"text"}
																	thousandSeparator={true}
																	prefix={"$"}
																/>
															</div>
															<h3 className="points">
																or&nbsp; 
																<NumericFormat
																	value={Math.floor(data.priceincents / 10)}
																	displayType={"text"}
																	thousandSeparator={true}
																/>
																&nbsp;Insighter Points
															</h3>
															{/* <div style={{ textAlign: "right" }}>
																<div className="discount">
																	<span> Membership Discount </span>
																</div>
															</div> */}
														</div>
													</div>
													<div className="row">
														<div className="col">
															<div className="description">
																<p> {data.description} </p>
															</div>
															<form onSubmit={handleSubmit}>
																<div className="quantity">
																	<h3 className="text-left"> Quantity: </h3>
																	<input
																		type="number"
																		required
																		min="1"
																		name="quantity"
																		className="form-control"
																		value={quantity}
																		onChange={(e) => setQuantity(e.currentTarget.value)}
																	/>
																</div>
																<div className="BUY">
																	<button	
																		type="submit"
																		className="btn"
																	>
																		Buy
																	</button>
																</div>
															</form>
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
      ) : (
        <NotFound />
      )}
		</>
	);
}

export default withRouter(ProductUmpiresManual);