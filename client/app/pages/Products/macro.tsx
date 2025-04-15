import React, { Suspense, useState, useEffect, useContext} from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import {
	getMacroByPermalink,
	BuyMacro,
} from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import history from "../../../utils/history";
import queryString from "query-string";
import Lightbox from "react-image-lightbox";
import NumberFormat from "react-number-format";

const product_macro = (props) => {

	const [show, setShow] = useState(true);

	const [loading, setLoading] = useState(true);

	const [path, setPath] = useState(location.pathname);

	const { getCustomerInfo, myInfo } = useContext(AppContext);

	useEffect(() => {
		getCustomerInfo();
  }, []);

	const [subscriptionInfo, setSubscriptionInfo] = useState(false);
	const [ischilduser, setIsChildUser] = useState(false);

	useEffect(() => {
		if (myInfo) {
			setSubscriptionInfo(myInfo.subscriptioninfo);
			setIsChildUser(myInfo.ischilduser);
			if (myInfo.parentinfo) {
				if (myInfo.parentinfo.useparentspaymentmethod) {
					const p = myInfo.parentinfo.parentsdefaultpaymentmenthodid;
					setPaymentMethodId(p);	
				} else {
					const p = myInfo.stripeCustomerCard.filter((card) => card.isDefault === true)[0];
					setPaymentMethodId(p.paymentMethodId);
				}
			} else {
				const p = myInfo.stripeCustomerCard.filter((card) => card.isDefault === true)[0];
				setPaymentMethodId(p.paymentMethodId);
			}
		}
  }, [myInfo]);

	const [data, setData] = useState(false);

	const [previews, setPreviews] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {setIsOpen(true)}

	useEffect(() => {
		getMacroByPermalink(props.match.params.permalink).subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data;
				if (x == undefined) {
					setShow(false);
        } else {
					setData(x);
					var element = document.getElementsByClassName("imagepreview");
					if (element) {
						var images = [];
						for (var i = 0; i < element.length; i++) {
							images.push(element[i].src);
							if (images.length > 1) {
								setPreviews(images); 
								console.log(previews, "previews");
							} else { 
								setPreviews(images);
								console.log(previews, "previews");
							}
							element[i].addEventListener("click", function () {
								handleOpen();
							});
						}
					}
				}
			} else {
				setLoading(false);
				setShow(false);
			}
		});
	}, []);

	const [checkBuyMacro, setCheckBuyMacro] = useState(false);

	useEffect(() => {
		if (myInfo && data) {
			if (((myInfo.subscriptioninfo.planname === "ProfessionalPlan" || myInfo.subscriptioninfo.planname === "ProfessionalPlanAnnual" || myInfo.subscriptioninfo.planname === "EnterprisePlan" || myInfo.subscriptioninfo.planname === "EnterprisePlanAnnual") && (myInfo.subscriptioninfo.subscriptionstatus === "Active") || myInfo.ischilduser) && (data.alreadyboughtthisversion === false)) {
				setCheckBuyMacro(true);
			} else {
				setCheckBuyMacro(false);
				setLoading(false);
			}
		}
	}, [data, myInfo]);

	const [paymentMethodId, setPaymentMethodId] = useState(false);

	useEffect(() => {
		if (checkBuyMacro) {
			handleSubmitMacro();
			console.log("checkout");
		} else {
			console.log("no checkout");
		}
	}, [checkBuyMacro]);

	const handleSubmitMacro = () => {
    setTimeout(() => {
      const payload = {
        macroId: data.id,
				paymentMethodId: paymentMethodId,
      };
  
			const stringified = queryString.stringify(payload);
  
      BuyMacro(stringified, objContactInformationForOrderDTO).subscribe((response) => {
        if (response.response.Requested_Action) {  
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }, 1000);
  };

	const [objContactInformationForOrderDTO, setObjContactInformationForOrderDTO] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    companyname: "",
		branch: "",
		fullAddress: "",
    streetaddress: "",
    aptorunitorsuite: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    profilepicture: "",
  });

  useEffect(() => {
    if (myInfo) {
      setObjContactInformationForOrderDTO({
        ...objContactInformationForOrderDTO,
        firstname: myInfo.ownerinfo.firstname,
        lastname: myInfo.ownerinfo.lastname,
        phonenumber: myInfo.ownerinfo.phonenumber,
        companyname: myInfo.ownerinfo.companyname ? myInfo.ownerinfo.companyname : "",
        branch: myInfo.ownerinfo.branch ? myInfo.ownerinfo.branch : "",
				fullAddress: myInfo.ownerinfo.fullAddress ? myInfo.ownerinfo.fullAddress : "",
        streetaddress: myInfo.ownerinfo.streetaddress ? myInfo.ownerinfo.streetaddress : "",
        aptorunitorsuite: myInfo.ownerinfo.aptorunitorsuite ? myInfo.ownerinfo.aptorunitorsuite : "",
				country: myInfo.ownerinfo.country ? myInfo.ownerinfo.country : "",
        city: myInfo.ownerinfo.city ? myInfo.ownerinfo.city : "",
        state: myInfo.ownerinfo.state ? myInfo.ownerinfo.state : "",
        zipcode: myInfo.ownerinfo.zipcode ? myInfo.ownerinfo.zipcode : "",
        profilepicture: myInfo.ownerinfo.profilepicture,
      });
    }
  }, [myInfo]);

	const handleSubmit = () => {
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
		history.push({
			pathname: "/checkout",
			state: {
				macro: data,
				quantity: 1,
				type: "macro",
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
						link={`shop/macros/${data.permalink}`}
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
												<div className="image-section">
													<img
														src={data.featuredimage}
														alt={data.title}
														loading="lazy"
													/>
												</div>      
											</div>
											<div className="col-xl-7 col-lg-7 col-md-12">
												<div className="data-section">
													<div className="row">
														<div className="col-xl-8 col-lg-8 col-md-12">
															<h2 className="name"> {data.title} </h2>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-12">
															<div style={{ textAlign: "right" }}>
																{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																	<h2 className="prevprice">
																		<del> ${(data.priceincents / 100).toFixed(2)} </del>
																	</h2>
																) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																	<h2 className="prevprice">
																		<del> ${(data.priceincents / 100).toFixed(2)} </del>
																	</h2>
																) : ( 
																	"" 
																)}
																{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																	<NumberFormat 
																		className="price"
																		value={"0"}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																	<NumberFormat 
																		className="price"
																		value={((data.priceincents / 100) - ((data.priceincents / 100) * 0.25)).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (
																	<NumberFormat 
																		className="price"
																		value={(data.priceincents / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																)}
															</div>
															<h3 className="points">
																or&nbsp;
																{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																	<NumberFormat
																		value={"0"}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																	<NumberFormat
																		value={Math.floor((data.priceincents / 10) - (data.priceincents / 10) * 0.25)}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																) : (
																	<NumberFormat
																		value={Math.floor(data.priceincents / 10)}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																)}
																&nbsp;Insighter Points
															</h3>
															{subscriptionInfo && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") || ischilduser ? (
																<div style={{ textAlign: "right" }}>
																	<div className="discount">
																		<span> Membership Discount </span>
																	</div>
																</div>
															) : (subscriptionInfo && (subscriptionInfo.planname === "StandardPlan" ||  subscriptionInfo.planname === "StandardPlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual")) ? (
																<div style={{ textAlign: "right" }}>
																	<div className="discount">
																		<span> Membership Discount </span>
																	</div>
																</div>
															) : (
																""
															)}
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
																					.replace(/<img/g, `<img class='imagepreview'`)
																				: ""
																		}`,
																	}}
																></div>
															</div>
															<div>
																{isOpen && previews.length > 1 && (
																	<Lightbox
																		mainSrc={previews[photoIndex]}
																		nextSrc={previews[(photoIndex + 1) % previews.length]}
																		prevSrc={previews[(photoIndex + previews.length - 1) % previews.length]}
																		onCloseRequest={() => setIsOpen(false)}
																		onMovePrevRequest={() =>
																			setPhotoIndex((photoIndex + previews.length - 1) % previews.length)
																		}
																		onMoveNextRequest={() =>
																			setPhotoIndex((photoIndex + 1) % previews.length)
																		}
																	/>
																)}
																{isOpen && previews.length == 1 && (
																	<Lightbox
																		mainSrc={previews[photoIndex]}
																		onCloseRequest={() => setIsOpen(false)}
																	/>
																)}
															</div>
															<div className="BUY">
																{checkBuyMacro ? (
																	<a
																		className="btn"
																		href={data.latestversionedfile}
																		target="_blank"
																	>
																		Download
																	</a>
																) : (
																	<>
																		{data.alreadyboughtthisversion ? (
																			<div 
																				className="form-group alert alert-danger"
																				style={{ width: "270px" }}
																			>
																				You have already Bought this Macro Product
																			</div>
																			) : (
																			<button 
																				className="btn" 
																				onClick={handleSubmit}
																			>
																				Buy
																			</button>
																		)}
																	</>
																)}
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
			) : (
				<NotFound />
			)}
		</>
	);
}

export default withRouter(product_macro);