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
import { GetAllSwagProductsCustomer } from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import Lightbox from "react-image-lightbox";
import { Carousel } from "react-responsive-carousel";
import { NumericFormat } from "react-number-format";
import down from "assets/down-arrow-user.svg";

const ProductSwag = (props) => {

	const navigate = useNavigate();
	const { permalink } = useParams();

	const [show, setShow] = useState(true);

	const [loading, setLoading] = useState(true);

	const [path, setPath] = useState(location.pathname);

	// const { getCustomerInfo, myInfo } = useContext(AppContext);

	// useEffect(() => {
	// 	getCustomerInfo();
  // }, []);

  const [size, setSize] = useState(false);

  const [data, setData] = useState(false);

	const [featuredimages, setFeaturedImages] = useState([]);

	useEffect(() => {
		// GetAllSwagProductsCustomer().subscribe((response) => {
		// 	if (response.response.Requested_Action) {
		// 		const x = response.response.data.filter(
		// 			(swag) => swag.permalink === permalink
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
		navigate("/swag");
	}, []);

	function swap (arr, a) {    
		var temp = arr[a];  
		arr[a] = arr[0];  
		arr[0] = temp;
		setFeaturedImages(arr);
 	}  

	const [photoIndex, setPhotoIndex] = useState(0)
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {setIsOpen(true)}

  const [isOpenSizeGuideImage, setIsOpenSizeGuideImage] = useState(false);
  const handleOpenSizeGuideImage = () => {setIsOpenSizeGuideImage(true)}

	const [swagData, setSwagData] = useState({
		quantity: "1",
		size: "",
	});

	const [check, setCheck] = useState(1);

	const MultisizeQuantity = (val) => {
		if (val == "Size 0 (XS)") {
			setCheck(data.quantity[0]);
		} else if (val == "Size 2 (S)") {
			setCheck(data.quantity[1]);
		} else if (val == "Size 3 (M)") {
			setCheck(data.quantity[2]);
		} else if (val == "Size 4 (ML)") {
			setCheck(data.quantity[3]);
		} else if (val == "Size 5 (L)") {
			setCheck(data.quantity[4]);
		} else if (val == "Size 6 (XL)") {
			setCheck(data.quantity[5]);
		} else {
			setCheck(data.quantity[6]);
		}
	};

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
	// 			branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
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
				swag: data,
				quantity: parseInt(swagData.quantity),
				type: "swag",
				size: swagData.size,
				path: path,
			}
		});
	};

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
						link={`shop/swag/${data.permalink}`}
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
						<Breadcrumbs
							data={data}
						/>
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
												{isOpen && featuredimages.length > 1 && ( 
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
												)}
												{isOpen && featuredimages.length == 1 && (
													<Lightbox
														mainSrc={featuredimages[photoIndex]}
														onCloseRequest={() => setIsOpen(false)}
													/>
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
																<div
																	dangerouslySetInnerHTML={{
																		__html: `${
																			data.description
																				? data.description
																					.replace(/(<p><\/p>)/g, `<br>`)
																				: ""
																		}`,
																	}}
																>
																</div>  
															</div>
															<form onSubmit={handleSubmit}>
																{data.multiplesize && (
																	<>
																		<div className="size">
																			<h3 className="text-left"> Choose Your Size: </h3>
																			<div className="form-group">
																				<div className="input-group" onClick={() => setSize(!size)}>
																					<input 
																						type="text"
																						name="size"
																						className="form-control" 
																						placeholder="Choose"
																						required
																						value={swagData.size}
																					/>
																					<img 
																						className="input_icon" 
																						src={down}
																						onClick={() => setSize(!size)}
																					/>
																				</div>
																				<div className={size ? "active" : "dropdown-content"}>
																					{data.sizes && data.sizes.map((val,key) => {
																						return (
																							<div key={key}>
																								<h2
																									onClick={(e) => {
																										setSize(!size);
																										setSwagData({
																											...swagData,
																											size: e.currentTarget.innerHTML,
																										});
																										MultisizeQuantity(e.currentTarget.innerHTML);
																									}}
																								> 
																									{val}
																								</h2>
																							</div>
																						);
																					})}
																				</div>
																			</div>
																		</div>
																		<div className="Size-Guide">
																			{data.title == "Actionable Insights Shirt" ? (
																				<Link
																					to="/fit-guide"
																					target="_blank"
																				>
																					Size Guide 
																				</Link>
																			) : (
																				<h5 
																					className="text-left"
																					onClick={() => handleOpenSizeGuideImage()}
																				> 
																					Size Guide 
																				</h5>
																			)}
																		</div>
																		{isOpenSizeGuideImage ? ( 
																			<Lightbox
																				mainSrc={data.sizeguideimage}
																				onCloseRequest={() => setIsOpenSizeGuideImage(false)}
																			/>
																		) : (
																			""
																		)}
																	</>
																)}
																<div className="quantity">
																	<h3 className="text-left"> Quantity: </h3>
																	{data.multiplesize ? (
																		<input
																			defaultValue="1"
																			type="number"
																			required
																			min="1"
																			max={
																				swagData.size == "Size 0 (XS)" ? data.quantity[0] :
																				swagData.size == "Size 2 (S)" ? data.quantity[1] :
																				swagData.size == "Size 3 (M)" ? data.quantity[2] :
																				swagData.size == "Size 4 (ML)" ? data.quantity[3] :
																				swagData.size == "Size 5 (L)" ? data.quantity[4] :
																				swagData.size == "Size 6 (XL)" ? data.quantity[5] : 
																				data.quantity[6]
																			}
																			name="quantity"
																			className="form-control"
																			value={swagData.quantity}
																			onChange={(e) =>
																				setSwagData({
																					...swagData,
																					quantity: e.currentTarget.value,
																				})
																			}	
																		/>
																	) : (
																		<input
																			defaultValue="1"
																			type="number"
																			required
																			min="1"
																			max={data.quantity[0]}
																			name="quantity"
																			className="form-control"
																			value={swagData.quantity}
																			onChange={(e) =>
																				setSwagData({
																					...swagData,
																					quantity: e.currentTarget.value,
																				})
																			}	
																		/>
																	)}
																</div>
																{data.multiplesize ? (
																	<>
																		<div className="BUY">
																			<button	
																				type="submit"
																				className="btn"
																				disabled={data.draft ? true : check == 0 ? true : false}
																			>
																				Buy
																			</button>
																		</div>
																		{check == 0 && (
																			<div
																				style={{ 
																					fontSize: "18px",
																					fontWeight: "bold",
																					color: "#DB422D",
																					padding: "20px 0px",
																				}}
																			>
																				{data.title} in this size is OUT OF STOCK
																			</div>
																		)}
																	</>
																) : (
																	<>
																		<div className="BUY">
																			<button	
																				type="submit"
																				className="btn"
																				disabled={data.draft ? true : data.quantity[0] == 0 ? true : false}
																			>
																				Buy
																			</button>
																		</div>
																		{data.quantity[0] == 0 && (
																			<div
																				style={{ 
																					fontSize: "18px",
																					fontWeight: "bold",
																					color: "#DB422D",
																					padding: "20px 0px",
																				}}
																			>
																				{data.title} is OUT OF STOCK
																			</div>
																		)}
																	</>
																)}
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

export default ProductSwag;