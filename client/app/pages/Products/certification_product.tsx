import React, { Suspense, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
	getAllCertificationsCustomer,
	CanBuyCertification,
} from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import queryString from "query-string";
import { NumericFormat } from "react-number-format";
import { HideOn } from "react-hide-on-scroll";
import down from "assets/add.svg";
import up from "assets/minus.svg";
import scrolldown from "assets/scroll.svg";

const ProductCertification = (props) => {

	const location = useLocation();
	const navigate = useNavigate();
	const { permalink } = useParams();
	
  const [show, setShow] = useState(true);

  const { getCustomerInfo, myInfo, getMyInsighterPoints, insighterPoints, getMyEncryptedDataFunction, encryptedData, } = useContext(AppContext);

	useEffect(() => {
    getCustomerInfo();
		getMyInsighterPoints();
		getMyEncryptedDataFunction();
  }, []);

	const [points, setPoints] = useState(false);

  useEffect(() => {
    if (insighterPoints) {
      setPoints(insighterPoints.nooninsighterpoint);
    }
  }, [insighterPoints]);

	const [EncryptedData, setEncryptedData] = useState(false);

  useEffect(() => {
    if (encryptedData) {
      setEncryptedData(encryptedData);
    }
  }, [encryptedData]);

	useEffect(() => {
		const certificationPaths = [
			"/shop/certification/aitc",
			"/shop/certification/aitc/",
			"/shop/certification/aimc",
			"/shop/certification/aimc/",
			"/shop/certification/aimc-2021",
			"/shop/certification/aimc-2021/",
			"/shop/certification/aimc-ce21",
			"/shop/certification/aimc-ce21/",
			"/shop/certification/aimc-ce22",
			"/shop/certification/aimc-ce22/"
		];
	
		if (certificationPaths.includes(location.pathname)) {
			navigate("/aimc");
		}
	}, [location.pathname, navigate]);

	const [ownerInfo, setOwnerInfo] = useState(false);
	const [subscriptionInfo, setSubscriptionInfo] = useState(false);
	const [ischilduser, setIsChildUser] = useState(false);

	useEffect(() => {
		if (myInfo) {
			setOwnerInfo(myInfo.ownerinfo);
			setSubscriptionInfo(myInfo.subscriptioninfo);
			setIsChildUser(myInfo.ischilduser);
		}
  }, [myInfo]);

	const ssoauth = () => {
    if (localStorage.getItem("tokenCustomer") == null) {
      navigate("/my-account");
    } else {
      const host =  window.location.host;
      const LMS_KEY = "mXu8EfYLQVgh8n3iEH6zFl97UPfNwwUf";
      const LMS_SECRET = "PRVfWX16FziQkMcdsAKHfeX9WyZJhW49";
      const url = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "http://dev.actionableacademy.org" : "https://actionableacademy.org"}`
      const endpoint = `${url}/sso?secret=${LMS_SECRET}&key=${LMS_KEY}&identifier=${ownerInfo.emailaddress}&data=${EncryptedData}`;
      window.open(endpoint, "_blank");
    }
  };

	var someDate = new Date();
	someDate.setDate(someDate.getDate() + 0);
	var date = someDate.toISOString().substr(0, 10);

	const [loading, setLoading] = useState(true);

	const [path, setPath] = useState(location.pathname);

	const [data, setData] = useState(false);

	const [certificationExtras, setCertificationExtras] = useState({
		iicrc: false,
		iicrc_number: "",
		iicrc_date_of_birth: date,
		california: false,
		california_license_number: "",
		florida: false,
		florida_user_full_name: "",
		florida_license_number: "",
		idaho: false,
		idaho_license_number: "",
		georgia: false,
    georgia_license_number: "",
		nevada: false,
		nevada_license_number: "",
		proctoring: false,
		electronicallysignyourfullname: "",
	});

	// console.log(certificationExtras, "certificationExtras");

	const [certificationsInfo, setCertificationsInfo] = useState([]);

	const [UserCanBuyCertification, setUserCanBuyCertification] = useState(false);
	const [UserCanBuyCertificationMsg, setUserCanBuyCertificationMsg] = useState(false);

	useEffect(() => {
		getAllCertificationsCustomer().subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data.filter(
					(certification) => certification.permalink === permalink
				)[0];
				if (x == undefined) {
          setShow(false);
        }
				setData(x);
				const payload = {
					certificationid: x.id,
				};
				const stringified = queryString.stringify(payload);
				CanBuyCertification(stringified).subscribe((response) => {
					if (response.response.Requested_Action) {
						setUserCanBuyCertification(true);
						setUserCanBuyCertificationMsg(false);
						setCertificationsInfo(myInfo.customercertficationinfo.cerstatus.filter(
							(certification) => certification.certificationid === x.id
						)[0]);
						setTimeout(() => {
							setLoading(false);
						}, 1000);
					} else {
						setUserCanBuyCertification(false);
						setUserCanBuyCertificationMsg(response.response.Message);
						setCertificationsInfo(myInfo.customercertficationinfo.cerstatus.filter(
							(certification) => certification.certificationid === x.id
						)[0]);
						setTimeout(() => {
							setLoading(false);
						}, 1000);
					}
				});
			} else {
				setShow(false);
			}
		});
	}, [myInfo]);

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
		const certification_data = {
      certification: data,
			quantity: 1,
			type: "certification",
			path: path,
			certificationExtras: certificationExtras,
			certificationStatus: certificationsInfo ? certificationsInfo.status : 0,
    }
		localStorage.setItem("certification_data", JSON.stringify(certification_data));
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
    navigate("/buy-certification");
	};

	const [showExtra, setShowExtra] = useState(false);

	const scroll = () => {
    const section = document.querySelector("#BUY");
    section.scrollIntoView({ behavior: "smooth", block: "center" });
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
						link={`shop/certification/${data.permalink}`}
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
						{showExtra && (
							<HideOn atDiv divID="EXE">
								<div className="BUY_Scroll" onClick={scroll}>
									<p>
										Click Here
										<br />
										to buy
									</p>
									<div className="box bounce-1">
										<img src={scrolldown} />
									</div>
								</div>
							</HideOn>
						)}
						<div className="main-container">
							<div className="product_page">
								<div className="">
									{!loading && (
										<div className="row product">
											<div className="col-xl-4 col-lg-4 col-md-12">    
												<div className="image-section">
													<img
														src={data.courseimage}
														alt={data.title}
														loading="lazy"
													/>
												</div>      
											</div>
											<div className="col-xl-8 col-lg-8 col-md-12">
												<div className="data-section">
													<div className="row">
														<div className="col-xl-8 col-lg-8 col-md-12">
															<h2 className="name"> {data.title} </h2>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-12">
															<div style={{ textAlign: "right" }}>
																{data.courseTag === "aitc" && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual" || subscriptionInfo.planname === "PlusPlan" || subscriptionInfo.planname === "PlusPlanAnnual" || ischilduser) ? (
																	<NumericFormat 
																		className="price"
																		value={(0).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (
																	<>
																		{certificationsInfo && certificationsInfo.status == 2 ? (
																			<NumericFormat 
																				className="price"
																				value={(data.failedpriceincents / 100).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		) : (
																			<NumericFormat 
																				className="price"
																				value={(data.priceincents / 100).toFixed(2)}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"$"}
																			/>
																		)}
																	</>
																)}
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col">
															<div className="description">
																<p> {data.description ? data.description : "N/A"} </p>
															</div>
															<form onSubmit={handleSubmit}>
																{data.iicrc || data.california || data.florida || data.idaho || data.georgia || data.nevada || data.proctoring && data.extras ? (
																	<div className="Extras">
																		<div className="Tabs">
																			<div className="row" onClick={() => setShowExtra(!showExtra)}>
																				<div className="col-10">
																					<h1> Actionable Insights Matterport Certified Extras: </h1>
																				</div>
																				<div className="col-2 text-right">
																					<img src={showExtra ? up : down} />
																				</div>
																			</div>
																		</div>
																		{showExtra == true && (
																			<>
																				{data.iicrc && (
																					<div className="Extras_Options">
																						<p> {data.iicrctitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="iicrc">
																										<input
																											id="iicrc"
																											type="checkbox"
																											checked={certificationExtras.iicrc}
																										/>
																										<span 
																											onClick={() => setCertificationExtras({
																												...certificationExtras,
																												iicrc: !certificationExtras.iicrc,
																											})}
																										>
																											Yes
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																						{certificationExtras.iicrc && (
																							<div className="row">
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																									<div className="form-group nogroup">
																										<input 
																											type="text" 
																											name="IICRC" 
																											required 
																											id="inputField1" 
																											className="input-area"
																											onChange={(e) =>
																												setCertificationExtras({
																													...certificationExtras,
																													iicrc_number: e.currentTarget.value,
																												})
																											}
																										/>
																										<label htmlFor="inputField1" className="floating_label"> IICRC # </label>
																									</div>
																								</div>
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																									<div className="form-group nogroup">
																										<input
																											defaultValue={date} 
																											type="date"
																											name="DateofBirth" 
																											required 
																											id="inputField2" 
																											className="input-area"
																											onChange={(e) =>
																												setCertificationExtras({
																													...certificationExtras,
																													iicrc_date_of_birth: e.currentTarget.value,
																												})
																											}
																										/>
																										<label htmlFor="inputField2" className="floating_label"> Date of Birth </label>
																									</div>
																								</div>
																							</div>
																						)}
																					</div>
																				)}
																				{data.california && (
																					<div className="Extras_Options">
																						<p> {data.californiaTitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="california">
																										<input
																											id="california"
																											type="checkbox"
																											checked={certificationExtras.california}
																										/>
																										<span 
																											onClick={() => setCertificationExtras({
																												...certificationExtras,
																												california: !certificationExtras.california,
																											})}
																										>
																											Yes
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																						{certificationExtras.california && (
																							<>
																								<div className="extras-description">
																									{data.californiaDescription}
																								</div>
																								<div className="row">
																									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																										<div className="form-group nogroup">
																											<input 
																												type="text" 
																												name="CALicense" 
																												required 
																												id="inputField3" 
																												className="input-area"
																												onChange={(e) =>
																													setCertificationExtras({
																														...certificationExtras,
																														california_license_number: e.currentTarget.value,
																													})
																												}
																											/>
																											<label htmlFor="inputField3" className="floating_label"> CA License # </label>
																										</div>
																									</div>
																								</div>
																								{data.electronicallysignyourfullname && (
																									<div className="row">
																										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																											<div className="form-group nogroup">
																												<input 
																													type="text" 
																													name="electronicallysignyourfullname" 
																													required 
																													id="inputField7" 
																													className="input-area"
																													onChange={(e) =>
																														setCertificationExtras({
																															...certificationExtras,
																															electronicallysignyourfullname: e.currentTarget.value,
																														})
																													}
																												/>
																												<label htmlFor="inputField7" className="floating_label"> Electronically Sign Your Full Name </label>
																											</div>
																										</div>
																									</div>
																								)}
																							</>
																						)}
																					</div>
																				)}
																				{data.florida && (
																					<div className="Extras_Options">
																						<p> {data.floridaTitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="florida">
																										<input
																											id="florida"
																											type="checkbox"
																											checked={certificationExtras.florida}
																										/>
																											<span 
																												onClick={() => setCertificationExtras({
																													...certificationExtras,
																													florida: !certificationExtras.florida,
																												})}
																										>
																											Yes
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																						{certificationExtras.florida && (
																							<>
																								<div className="extras-description">
																									{data.floridaDescription}
																								</div>
																								<div className="row">
																									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																										<div className="form-group nogroup">
																											<input 
																												type="text" 
																												name="EnterYourFullName" 
																												required 
																												id="inputField4" 
																												className="input-area"
																												onChange={(e) =>
																													setCertificationExtras({
																														...certificationExtras,
																														florida_user_full_name: e.currentTarget.value,
																													})
																												}
																											/>
																											<label htmlFor="inputField4" className="floating_label"> Enter Your Full Name </label>
																										</div>
																									</div>
																									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																										<div className="form-group nogroup">
																											<input 
																												type="text" 
																												name="FLLicense" 
																												required 
																												id="inputField5" 
																												className="input-area"
																												onChange={(e) =>
																													setCertificationExtras({
																														...certificationExtras,
																														florida_license_number: e.currentTarget.value,
																													})
																												}
																											/>
																											<label htmlFor="inputField5" className="floating_label"> FL License # </label>
																										</div>
																									</div>
																								</div>
																							</>
																						)}
																					</div>
																				)}
																				{data.idaho && (
																					<div className="Extras_Options">
																						<p> {data.idahoTitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="idaho">
																										<input
																											id="idaho"
																											type="checkbox"
																											checked={certificationExtras.idaho}
																										/>
																										<span 
																											onClick={() => setCertificationExtras({
																												...certificationExtras,
																												idaho: !certificationExtras.idaho,
																											})}
																										>
																											Yes
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																						{certificationExtras.idaho && (
																							<div className="row">
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																									<div className="form-group nogroup">
																										<input 
																											type="text" 
																											name="IdahoLicense" 
																											required 
																											id="inputField6" 
																											className="input-area"
																											onChange={(e) =>
																												setCertificationExtras({
																													...certificationExtras,
																													idaho_license_number: e.currentTarget.value,
																												})
																											}
																										/>
																										<label htmlFor="inputField6" className="floating_label"> Idaho License # </label>
																									</div>
																								</div>
																							</div>
																						)}
																					</div>
																				)}
																				{data.georgia && (
																					<div className="Extras_Options">
																						<p> {data.georgiaTitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="georgia">
																										<input
																											id="georgia"
																											type="checkbox"
																											checked={certificationExtras.georgia}
																										/>
																										<span 
																											onClick={() => setCertificationExtras({
																												...certificationExtras,
																												georgia: !certificationExtras.georgia,
																											})}
																										>
																											Yes
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																						{certificationExtras.georgia && (
																							<div className="row">
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																									<div className="form-group nogroup">
																										<input 
																											type="text" 
																											name="GeorgiaLicense" 
																											required 
																											id="inputField8" 
																											className="input-area"
																											onChange={(e) =>
																												setCertificationExtras({
																													...certificationExtras,
																													georgia_license_number: e.currentTarget.value,
																												})
																											}
																										/>
																										<label htmlFor="inputField8" className="floating_label"> Georgia License # </label>
																									</div>
																								</div>
																							</div>
																						)}
																					</div>
																				)}
																				{data.nevada && (
																					<div className="Extras_Options">
																						<p> {data.nevadaTitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="nevada">
																										<input
																											id="nevada"
																											type="checkbox"
																											checked={certificationExtras.nevada}
																										/>
																										<span 
																											onClick={() => setCertificationExtras({
																												...certificationExtras,
																												nevada: !certificationExtras.nevada,
																											})}
																										>
																											Yes
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																						{certificationExtras.nevada && (
																							<div className="row">
																								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
																									<div className="form-group nogroup">
																										<input 
																											type="text" 
																											name="NevadaLicense" 
																											required 
																											id="inputField9" 
																											className="input-area"
																											onChange={(e) =>
																												setCertificationExtras({
																													...certificationExtras,
																													nevada_license_number: e.currentTarget.value,
																												})
																											}
																										/>
																										<label htmlFor="inputField9" className="floating_label"> NV License # </label>
																									</div>
																								</div>
																							</div>
																						)}
																					</div>
																				)}
																				{data.proctoring && (
																					<div className="Extras_Options">
																						<p> {data.proctoringTitle} </p>
																						<div className="extras-checkbox">
																							<ul>
																								<li>
																									<label htmlFor="proctoring">
																										<input
																											id="proctoring"
																											type="checkbox"
																											checked={certificationExtras.proctoring}
																										/>
																										<span 
																											onClick={() => setCertificationExtras({
																												...certificationExtras,
																												proctoring: !certificationExtras.proctoring,
																											})}
																										>
																											Add On&nbsp;
																											{certificationsInfo && certificationsInfo.status == 2 ? "($50.00)" : "($100.00)"}
																										</span>
																									</label>
																								</li>
																							</ul>
																						</div>
																					</div>
																				)}
																				{certificationExtras.california && !certificationExtras.proctoring || certificationExtras.florida && !certificationExtras.proctoring ? (
																					<div
																						style={{ 
																							color: "#DB422D",
																							marginTop: "-20px",
																							marginBottom: "20px",
																						}}
																					>
																						*This Check box is required for California and Florida state Insurance license credit hours
																					</div>
																				) : (
																					""
																				)}
																				<div className="Compliance_Information">
																					To view our Continuing Education Credit Compliance Information, please{" "}
																					<a
																						href="https://docs.google.com/spreadsheets/d/1-RJQhqy0WDoSNghBT_q4hUg3h13q1a8mH72PtShxYmk/edit?usp=sharing"
																						target="_blank"
																					>
																						click here
																					</a>
																				</div>
																			</>
																		)}
																	</div>
																) : (
																	""
																)}
																<div className="IP">
																	<h5> Insighter Points </h5>
																	<h4> Current Insighter Points Balance: </h4>
																	<NumericFormat
																		value={points}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																	<span>*</span>
																	<p> *Insighter Point(s) will be applied at checkout </p>
																</div>
																{UserCanBuyCertification ? (
																	<>
																		{certificationsInfo && certificationsInfo.status == 0 ? (
																			<div
																				style={{ 
																					color: "#DB422D",
																					fontWeight: 600,
																				}}
																			>
																				Your Course is in Progress
																			</div>
																		) : certificationsInfo && certificationsInfo.status == 1 ? (
																			<div
																				style={{ 
																					color: "#DB422D",
																					fontWeight: 600,
																				}}
																			>
																				Your Course is in Awaiting Challenge
																			</div>
																		) : certificationsInfo && certificationsInfo.status == 2 ? (
																			<>
																				<div
																					id="BUY"
																					className="BUY"
																				>
																					<button	
																						type="submit"
																						className="btn"
																						disabled={
																							certificationExtras.california && !certificationExtras.proctoring ? true : 
																							certificationExtras.florida && !certificationExtras.proctoring ? true : false
																						}
																					>
																						Buy
																					</button>
																				</div>
																				<div
																					id="EXE"
																					className="EXE"
																				></div>
																			</>
																		) : certificationsInfo && certificationsInfo.status == 3 ? (
																			<div
																				style={{ 
																					color: "#DB422D",
																					fontWeight: 600,
																				}}
																			>
																				Congratulation Your have Passed this Course
																			</div>
																		) : certificationsInfo && certificationsInfo.status == 4 ? (
																			<div
																				style={{ 
																					color: "#DB422D",
																					fontWeight: 600,
																				}}
																			>
																				Related to ZORA Exam Result Awaiting
																			</div>
																		) : certificationsInfo && certificationsInfo.status == 5 ? (
																			<>
																				<div
																					id="BUY"
																					className="BUY"
																				>
																					<button	
																						type="submit"
																						className="btn"
																						disabled={
																							certificationExtras.california && !certificationExtras.proctoring ? true : 
																							certificationExtras.florida && !certificationExtras.proctoring ? true : false
																						}
																					>
																						Buy
																					</button>
																				</div>
																				<div
																					id="EXE"
																					className="EXE"
																				></div>
																			</>
																		) : certificationsInfo && certificationsInfo.status == 6 ? (
																			<>
																				<div
																					id="BUY"
																					className="BUY"
																				>
																					<button	
																						type="submit"
																						className="btn"
																						disabled={
																							certificationExtras.california && !certificationExtras.proctoring ? true : 
																							certificationExtras.florida && !certificationExtras.proctoring ? true : false
																						}
																					>
																						Buy
																					</button>
																				</div>
																				<div
																					id="EXE"
																					className="EXE"
																				></div>
																			</>
																		) : (
																			<>
																				<div
																					id="BUY"
																					className="BUY"
																				>
																					<button	
																						type="submit"
																						className="btn"
																						disabled={
																							certificationExtras.california && !certificationExtras.proctoring ? true : 
																							certificationExtras.florida && !certificationExtras.proctoring ? true : false
																						}
																					>
																						Buy
																					</button>
																				</div>
																				<div
																					id="EXE"
																					className="EXE"
																				></div>
																			</>
																		)}
																	</>
																) : (
																	<>
																		{UserCanBuyCertificationMsg === "You already have this course in progress. Let's get you over to your AIMC course!" ? (
																			<>
																				<div
																					id="BUY"
																					className="UserCanBuyCertificationMsgNew"
																				>
																					You already have this course in progress. <span onClick={ssoauth}>Let's get you over to your AIMC course!</span>
																				</div>
																				<div
																					id="EXE"
																					className="EXE"
																				></div>
																			</>
																		) : (
																			<>
																				<div
																					id="BUY"
																					className="UserCanBuyCertificationMsg"
																					dangerouslySetInnerHTML={{
																						__html: `${
																							UserCanBuyCertificationMsg.replace(/<a/g,`<a target="_bank"`)
																						}`,
																					}}
																				>
																				</div>
																				<div
																					id="EXE"
																					className="EXE"
																				></div>
																			</>
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

export default ProductCertification;