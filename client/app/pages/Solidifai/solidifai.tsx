import React, { Suspense, useState, useEffect, useContext, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../../contexts/appContext";
import CurrencyInput from "react-currency-input-field";
import queryString from "query-string";
import { isWebUri } from "valid-url";
import history from "../../../utils/history";
import NumberFormat from "react-number-format";
import down from "assets/down-arrow-user.svg";
import info from "assets/Info.svg";
import Solidifai_Beta_Logo from "assets/Solidifai_Beta_Logo.webp";
import updated_solidifaimask from "assets/updated_solidifaimask.png";

export const useDetectOutsideClick = (el, initialState) => {

  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = e => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);
  return [isActive, setIsActive];
};

const solidifai = () => {

	const dropdownRef1 = useRef(null);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef1, false);
  const onClickRef1 = () => setIsActive1(!isActive1);

  const dropdownRef2 = useRef(null);
  const [isActive2, setIsActive2] = useDetectOutsideClick(dropdownRef2, false);
  const onClickRef2 = () => setIsActive2(!isActive2);

  const dropdownRef3 = useRef(null);
  const [isActive3, setIsActive3] = useDetectOutsideClick(dropdownRef3, false);
  const onClickRef3 = () => setIsActive3(!isActive3);

  const dropdownRef4 = useRef(null);
  const [isActive4, setIsActive4] = useDetectOutsideClick(dropdownRef4, false);
  const onClickRef4 = () => setIsActive4(!isActive4);

	const [path, setPath] = useState(location.pathname);

	const [loading, setLoading] = useState(true);

	const { getCustomerInfo, myInfo, getMyInsighterPoints, insighterPoints } = useContext(AppContext);

  const [points, setPoints] = useState(false);

  useEffect(() => {
    if (insighterPoints) {
      setPoints(insighterPoints.nooninsighterpoint);
    }
  }, [insighterPoints]);

	const [subscriptionInfo, setSubscriptionInfo] = useState(false);
	const [ischilduser, setIsChildUser] = useState(false);
	
  useEffect(() => {
    if (myInfo) {
      setSubscriptionInfo(myInfo.subscriptioninfo);
			setIsChildUser(myInfo.ischilduser);
			setData({
				...data,
				emailaddress: myInfo.ownerinfo.emailaddress,
			})
			setLoading(false);
    }
  }, [myInfo]);

  useEffect(() => {
		getCustomerInfo();
    getMyInsighterPoints();
  }, []);

	const [data, setData] = useState({
		emailaddress: "",
		projectname: "",
		causeofloss: "",
		category: "",
		mrc: "",
		class: "",
		premitigation: "",
		postmitigation: "",
		uploadESX: "",
		uploadODA: "",
		losssnapshot: "",
		lineitemcount: "",
		grandtotal: "",
	});

	const [checkPreURL, setCheckPreURL] = useState(false);
	const [checkPostURL, setCheckPostURL] = useState(false);

	const isPreUrlValid = (url) => {
    if (isWebUri(url)) {
			setCheckPreURL(false)
		} else {
			setCheckPreURL(true);
		}
	}

	const isPostUrlValid = (url) => {
    if (isWebUri(url)) {
			setCheckPostURL(false)
		} else {
			setCheckPostURL(true);
		}
	}

	const validateValue = (value) => {
		if (value) {
			setData({
				...data,
				grandtotal: parseFloat(value),
			});
		} else {
			setData({
				...data,
				grandtotal: "",
			});
		}
  };
	
	const onSelectUploadESX = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.files[0]
		});
	}

	const onSelectUploadODA  = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.files[0]
		});
	}

	function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

	const [ZORAAnalysis, setZORAAnalysis] = useState(false);
	const [termsandconditions, setTermsandConditions] = useState(false);

	const [solidifai, setSolidifai] = useState({
		title: "Solidifai Analysis",
		priceincents: 0,
	});

	const [CategoryValue, setCategoryValue] = useState(0);

	const handleSubmit = () => {
		history.push({
			pathname: "/checkout",
			state: {
				solidifai: solidifai,
				quantity: 1,
				type: "solidifai",
				path: path,
				airtableData: data,
				AugmentwithZORAAnalysis: ZORAAnalysis,
			}
		});
	}

	return (
		<>
			<SEO
        title="Solidifai Analysis - Actionable Insights"
        description="Explore Solidifai, Actionable Insights’ estimate edit engine. As a natural evolution to our ZORA tool, Solidifai edits your estimate to improve it."
				link="shop/form/solidifai"
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
					{!loading && (
						<>
							{subscriptionInfo.subscriptionstatus == "Active" && (subscriptionInfo.planname === "ProfessionalPlan" || subscriptionInfo.planname === "ProfessionalPlanAnnual" || subscriptionInfo.planname === "EnterprisePlan" || subscriptionInfo.planname === "EnterprisePlanAnnual") ? (
								<div className="Solidifai_Zora_Active">
									<div className="">
										<div className="holder">
											<img 
												src={Solidifai_Beta_Logo}
												alt="Solidifai"
												loading="lazy"
											/>
											<h2> Solidifai Analysis </h2>
											<h3> 
												Click&nbsp; 
												<a
													href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/01/14235401/Solidifai_BA.pdf"
													target="_blank"
													className="here"
												> 
													here
												</a>
												&nbsp;to review an example Solidifai analysis.
											</h3>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="zora-solidifai-form">
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input
																type="text" 
																name="ProjectName"
																required
																id="inputField1"
																className="input-area"
																value={data.projectname}
																onChange={(e) =>
																	setData({
																		...data,
																		projectname: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField1" className="floating_label"> Project Name </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="CauseofLoss" 
																required 
																id="inputField2" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.causeofloss}
																onClick={() => onClickRef1()}
															/>
															<label htmlFor="inputField2" className="floating_label"> Cause of Loss </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef1()}
																/>
															</label>
															<div
																className={isActive1 ? "active" : "dropdown-content"}
																ref={dropdownRef1}
															>
																<h2
																	onClick={(e) => {
																		onClickRef1();
																		setData({
																			...data,
																			causeofloss: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Water	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef1();
																		setData({
																			...data,
																			causeofloss: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Fire	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef1();
																		setData({
																			...data,
																			causeofloss: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Other	
																</h2>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="Category" 
																required 
																id="inputField3" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.category}
																onClick={() => onClickRef2()}
															/>
															<label htmlFor="inputField3" className="floating_label"> Category </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef2()}
																/>
															</label>
															<div
																className={isActive2 ? "active" : "dropdown-content"}
																ref={dropdownRef2}
															>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Cat 1
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Cat 2
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Cat 3
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	N/A
																</h2>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="MRC" 
																required 
																id="inputField4" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.mrc}
																onClick={() => onClickRef3()}
															/>
															<label htmlFor="inputField4" className="floating_label"> Mitigation, Repair or Contents </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef3()}
																/>
															</label>
															<div
																className={isActive3 ? "active" : "dropdown-content"}
																ref={dropdownRef3}
															>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.1);
																	}}
																>
																	Mitigation	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.3);
																	}}
																>
																	Repair	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.05);
																	}}
																>
																	Contents	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.5);
																	}}
																>
																	Other
																</h2>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="Class" 
																required 
																id="inputField5" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.class}
																onClick={() => onClickRef4()}
															/>
															<label htmlFor="inputField5" className="floating_label"> Class </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef4()}
																/>
															</label>
															<div
																className={isActive4 ? "active" : "dropdown-content"}
																ref={dropdownRef4}
															>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 1
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 2
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 3
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 4
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	N/A
																</h2>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="upInputs form-group nogroup">
															<input 
																type="url"
																name="Pre-MitigationScanURL"
																className="mitigation"
																placeholder=" "
																required 
																value={data.premitigation}
																onChange={(e) => {
																	setData({
																		...data,
																		premitigation: e.currentTarget.value,
																	})
																	isPreUrlValid(e.currentTarget.value);
																}}
															/>
															<label className="upLabel"> Pre-Mitigation Scan URL (Model Set to Public) </label>
															<div className="info">
																<img src={info} />
																<span> This is the scan executed prior to any content manipulation,demolition or extraction. </span>
															</div>
															{checkPreURL && (
																<p
																	style={{
																		margin: "10px 0px 0px 0px",
																		color: "#DB422D",
																		fontSize: "14px",
																		fontWeight: 600,
																	}}
																>
																	Please Enter a Valid URL
																</p>
															)}
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="upInputs form-group nogroup">
															<input 
																type="url"
																name="Post-MitigationScanURL"
																className="mitigation"
																placeholder=" "
																required 
																value={data.postmitigation}
																onChange={(e) => {
																	setData({
																		...data,
																		postmitigation: e.currentTarget.value,
																	})
																	isPostUrlValid(e.currentTarget.value);
																}}
															/>
															<label className="upLabel"> Post-Mitigation Scan URL (Model Set to Public) </label>
															<div className="info">
																<img src={info} />
																<span> This scan is executed once the mitigation/demo phase is complete - often this is the last day of dry out while the equipment is still deployed. </span>
															</div>
															{checkPostURL && (
																<p
																	style={{
																		margin: "10px 0px 0px 0px",
																		color: "#DB422D",
																		fontSize: "14px",
																		fontWeight: 600,
																	}}
																>
																	Please Enter a Valid URL
																</p>
															)}
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<label className="file">
																<input
																	type="file"
																	name="uploadESX"
																	// accept="application/pdf"
																	onChange={onSelectUploadESX}
																	onClick={(e) => (e.target.value = null)}
																/>
																<span className="file-custom">
																	{data.uploadESX == "" ? (
																		<>
																			Upload ESX
																		</>
																	) : (
																		<>
																			{data.uploadESX.name ? data.uploadESX.name : parse(data.uploadESX[0].url.replace("https://getinsights2-data.s3.amazonaws.com/", ""))}
																		</>
																	)}
																</span>
															</label>
															<div className="info">
																<img style={{ marginRight: "5px" }} src={info} />
																<span>
																	(a) Carrier profile is the only supported profile at this time.
																	<br />
																	(b) Re-sequence your line items prior to submission for optimal results.
																</span>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<label className="file">
																<input
																	type="file"
																	name="uploadODA"
																	onChange={onSelectUploadODA}
																	onClick={(e) => (e.target.value = null)}
																/>
																<span className="file-custom">
																	{data.uploadODA == "" ? (
																		<>
																			Upload Other Digital Assets
																		</>
																	) : (
																		<>
																			{data.uploadODA.name ? data.uploadODA.name : parse(data.uploadODA[0].url.replace("https://getinsights2-data.s3.amazonaws.com/", ""))}
																		</>
																	)}
																</span>
															</label>
															<div className="info">
																<img src={info} />
																<span> Other digital assets may include one off images of the Vaults/Containers used for contents storage, or a picture of the 40 Yard roll-off dumpster with OBX plywood that has been deployed underneath. </span>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<textarea
																name="LossSnapshot"
																required
																id="textField1"
																className="input-area"
																value={data.losssnapshot}
																onChange={(e) => {
																	setData({
																		...data,
																		losssnapshot: e.currentTarget.value,
																	});
																}}
															/>
															<label htmlFor="textField1" className="floating_label"> Loss Snapshot (i.e., tell us the story) </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input
																type="number" 
																name="LineItemCount"
																min={0}
																required
																id="inputField8"
																className="input-area"
																value={data.lineitemcount}
																onChange={(e) => 
																	setData({
																		...data,
																		lineitemcount: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField8" className="floating_label"> Line Item Count </label>
															<div className="info">
																<img src={info} />
																<span> Line item count available via the “Project Tab” -> “# Items” Column. </span>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<CurrencyInput
																id="inputField9"
																className="input-area"
																placeholder="$0.00"
																prefix={'$'}
																onValueChange={validateValue}
																allowDecimals={true}
																decimalsLimit={2}
																step={1}
															/>
															<label htmlFor="inputField9" className="floating_label"> Grand Total (e.g., RCV) </label>
															<div className="info">
																<img src={info} />
																<span> Grand Total (AKA Replacement Cost Value (RCV)) before the deductible is applied. </span>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
														<div className="IP">
															<h5> Insighter Points </h5>
															<h4> Current Insighter Points Balance: </h4>
															<NumberFormat
																value={points}
																displayType={"text"}
																thousandSeparator={true}
															/>
															<span>*</span>
															<p> *Insighter Point(s) will be applied at checkout </p>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="tc1">
															<input 
																type="checkbox" 
																id="tc1"
																checked={ZORAAnalysis}
															/>
															<label 
																htmlFor="tc1"
																onClick={() => setZORAAnalysis(!ZORAAnalysis)}
															>
																Augment Solidifai with a ZORA Analysis
															</label>
															<img
																src={info}
																title="ZORA Analysis is a grphical representation that elegantly illustrates sketch accuracy, Actionable Insights format compliance, RCV delta and likelihood the estimate would be approved by the counter-party without hesitation."
																style={{ cursor: "pointer" }}
															/>
														</div>
														<div className="tc2">
															<input 
																type="checkbox" 
																id="tc2"
																checked={termsandconditions}
															/>
															<label 
																htmlFor="tc2"
																onClick={() => setTermsandConditions(!termsandconditions)}
															>
																I've read and accept the&nbsp;
																<Link 
																	to="/terms-and-conditions-solidifai"
																	target="_blank"
																	style={{ color: "#26A59A" }}
																> 
																	Solidifai Terms & Conditions
																</Link>
																<b 
																	className="red"
																>
																	&nbsp;*
																</b>
															</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="checkout">
															<button 
																className="btn"
																type="submit"
																onClick={() => 
																	setSolidifai({
																		...solidifai,
																		priceincents: parseInt(((((parseInt(data.lineitemcount) * 0.85) + (data.grandtotal * 0.105)) * CategoryValue) * 100).toFixed(2)),
																	})
																}
																disabled={
																	data.projectname == "" ||
																	data.causeofloss == "" ||
																	data.category == "" ||
																	data.mrc == "" ||
																	data.class == "" ||
																	data.premitigation == "" ||
																	checkPreURL ||
																	checkPostURL ||
																	data.postmitigation == "" ||
																	data.uploadESX == "" ||
																	data.losssnapshot == "" ||
																	data.lineitemcount == "" ||
																	!termsandconditions
																		? true
																		: false
																}
															>
																Checkout
															</button>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							) : ischilduser ? (
								<div className="Solidifai_Zora_Active">
									<div className="">
										<div className="holder">
											<img 
												src={Solidifai_Beta_Logo}
												alt="Solidifai"
												loading="lazy"
											/>
											<h2> Solidifai Analysis </h2>
											<h3> 
												Click&nbsp; 
												<a
													href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/01/14235401/Solidifai_BA.pdf"
													target="_blank"
													className="here"
												> 
													here
												</a>
												&nbsp;to review an example Solidifai analysis.
											</h3>
										</div>
										<form onSubmit={handleSubmit}>
											<div className="zora-solidifai-form">
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input
																type="text" 
																name="ProjectName"
																required
																id="inputField1"
																className="input-area"
																value={data.projectname}
																onChange={(e) =>
																	setData({
																		...data,
																		projectname: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField1" className="floating_label"> Project Name </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="CauseofLoss" 
																required 
																id="inputField2" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.causeofloss}
																onClick={() => onClickRef1()}
															/>
															<label htmlFor="inputField2" className="floating_label"> Cause of Loss </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef1()}
																/>
															</label>
															<div
																className={isActive1 ? "active" : "dropdown-content"}
																ref={dropdownRef1}
															>
																<h2
																	onClick={(e) => {
																		onClickRef1();
																		setData({
																			...data,
																			causeofloss: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Water	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef1();
																		setData({
																			...data,
																			causeofloss: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Fire	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef1();
																		setData({
																			...data,
																			causeofloss: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Other	
																</h2>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
													<div className="form-group nogroup">
															<input 
																type="text" 
																name="Category" 
																required 
																id="inputField3" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.category}
																onClick={() => onClickRef2()}
															/>
															<label htmlFor="inputField3" className="floating_label"> Category </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef2()}
																/>
															</label>
															<div
																className={isActive2 ? "active" : "dropdown-content"}
																ref={dropdownRef2}
															>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Cat 1
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Cat 2
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Cat 3
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef2();
																		setData({
																			...data,
																			category: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	N/A
																</h2>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="MRC" 
																required 
																id="inputField4" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.mrc}
																onClick={() => onClickRef3()}
															/>
															<label htmlFor="inputField4" className="floating_label"> Mitigation, Repair or Contents </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef3()}
																/>
															</label>
															<div
																className={isActive3 ? "active" : "dropdown-content"}
																ref={dropdownRef3}
															>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.1);
																	}}
																>
																	Mitigation	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.3);
																	}}
																>
																	Repair	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.05);
																	}}
																>
																	Contents	
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef3();
																		setData({
																			...data,
																			mrc: e.currentTarget.innerHTML,
																		});
																		setCategoryValue(1.5);
																	}}
																>
																	Other
																</h2>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="Class" 
																required 
																id="inputField5" 
																className="input-area"
																style={{ 
																	color: "transparent",
																	textShadow: "0 0 0 #000",
																	cursor: "pointer",
																}}
																value={data.class}
																onClick={() => onClickRef4()}
															/>
															<label htmlFor="inputField5" className="floating_label"> Class </label>
															<label className="file_input_label">
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => onClickRef4()}
																/>
															</label>
															<div
																className={isActive4 ? "active" : "dropdown-content"}
																ref={dropdownRef4}
															>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 1
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 2
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 3
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	Class 4
																</h2>
																<h2
																	onClick={(e) => {
																		onClickRef4();
																		setData({
																			...data,
																			class: e.currentTarget.innerHTML,
																		});
																	}}
																>
																	N/A
																</h2>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="upInputs form-group nogroup">
															<input 
																type="url"
																name="Pre-MitigationScanURL"
																className="mitigation"
																placeholder=" "
																required 
																value={data.premitigation}
																onChange={(e) => {
																	setData({
																		...data,
																		premitigation: e.currentTarget.value,
																	})
																	isPreUrlValid(e.currentTarget.value);
																}}
															/>
															<label className="upLabel"> Pre-Mitigation Scan URL (Model Set to Public) </label>
															<div className="info">
																<img src={info} />
																<span> This is the scan executed prior to any content manipulation,demolition or extraction. </span>
															</div>
															{checkPreURL && (
																<p
																	style={{
																		margin: "10px 0px 0px 0px",
																		color: "#DB422D",
																		fontSize: "14px",
																		fontWeight: 600,
																	}}
																>
																	Please Enter a Valid URL
																</p>
															)}
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="upInputs form-group nogroup">
															<input 
																type="url"
																name="Post-MitigationScanURL"
																className="mitigation"
																placeholder=" "
																required 
																value={data.postmitigation}
																onChange={(e) => {
																	setData({
																		...data,
																		postmitigation: e.currentTarget.value,
																	})
																	isPostUrlValid(e.currentTarget.value);
																}}
															/>
															<label className="upLabel"> Post-Mitigation Scan URL (Model Set to Public) </label>
															<div className="info">
																<img src={info} />
																<span> This scan is executed once the mitigation/demo phase is complete - often this is the last day of dry out while the equipment is still deployed. </span>
															</div>
															{checkPostURL && (
																<p
																	style={{
																		margin: "10px 0px 0px 0px",
																		color: "#DB422D",
																		fontSize: "14px",
																		fontWeight: 600,
																	}}
																>
																	Please Enter a Valid URL
																</p>
															)}
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<label className="file">
																<input
																	type="file"
																	name="uploadESX"
																	// accept="application/pdf"
																	onChange={onSelectUploadESX}
																	onClick={(e) => (e.target.value = null)}
																/>
																<span className="file-custom">
																	{data.uploadESX == "" ? (
																		<>
																			Upload ESX
																		</>
																	) : (
																		<>
																			{data.uploadESX.name ? data.uploadESX.name : parse(data.uploadESX[0].url.replace("https://getinsights2-data.s3.amazonaws.com/", ""))}
																		</>
																	)}
																</span>
															</label>
															<div className="info">
																<img style={{ marginRight: "5px" }} src={info} />
																<span>
																	(a) Carrier profile is the only supported profile at this time.
																	<br />
																	(b) Re-sequence your line items prior to submission for optimal results.
																</span>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<label className="file">
																<input
																	type="file"
																	name="uploadODA"
																	onChange={onSelectUploadODA}
																	onClick={(e) => (e.target.value = null)}
																/>
																<span className="file-custom">
																	{data.uploadODA == "" ? (
																		<>
																			Upload Other Digital Assets
																		</>
																	) : (
																		<>
																			{data.uploadODA.name ? data.uploadODA.name : parse(data.uploadODA[0].url.replace("https://getinsights2-data.s3.amazonaws.com/", ""))}
																		</>
																	)}
																</span>
															</label>
															<div className="info">
																<img src={info} />
																<span> Other digital assets may include one off images of the Vaults/Containers used for contents storage, or a picture of the 40 Yard roll-off dumpster with OBX plywood that has been deployed underneath. </span>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<textarea
																name="LossSnapshot"
																required
																id="textField1"
																className="input-area"
																value={data.losssnapshot}
																onChange={(e) => {
																	setData({
																		...data,
																		losssnapshot: e.currentTarget.value,
																	});
																}}
															/>
															<label htmlFor="textField1" className="floating_label"> Loss Snapshot (i.e., tell us the story) </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<input
																type="number" 
																name="LineItemCount"
																min={0}
																required
																id="inputField8"
																className="input-area"
																value={data.lineitemcount}
																onChange={(e) => 
																	setData({
																		...data,
																		lineitemcount: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField8" className="floating_label"> Line Item Count </label>
															<div className="info">
																<img src={info} />
																<span> Line item count available via the “Project Tab” -> “# Items” Column. </span>
															</div>
														</div>
													</div>
													<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
														<div className="form-group nogroup">
															<CurrencyInput
																id="inputField9"
																className="input-area"
																placeholder="$0.00"
																prefix={'$'}
																onValueChange={validateValue}
																allowDecimals={true}
																decimalsLimit={2}
																step={1}
															/>
															<label htmlFor="inputField9" className="floating_label"> Grand Total (e.g., RCV) </label>
															<div className="info">
																<img src={info} />
																<span> Grand Total (AKA Replacement Cost Value (RCV)) before the deductible is applied. </span>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
														<div className="IP">
															<h5> Insighter Points </h5>
															<h4> Current Insighter Points Balance: </h4>
															<NumberFormat
																value={points}
																displayType={"text"}
																thousandSeparator={true}
															/>
															<span>*</span>
															<p> *Insighter Point(s) will be applied at checkout </p>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="tc1">
															<input 
																type="checkbox" 
																id="tc1"
																checked={ZORAAnalysis}
															/>
															<label 
																htmlFor="tc1"
																onClick={() => setZORAAnalysis(!ZORAAnalysis)}
															>
																Augment Solidifai with a ZORA Analysis
															</label>
															<img
																src={info}
																title="ZORA Analysis is a grphical representation that elegantly illustrates sketch accuracy, Actionable Insights format compliance, RCV delta and likelihood the estimate would be approved by the counter-party without hesitation."
																style={{ cursor: "pointer" }}
															/>
														</div>
														<div className="tc2">
															<input 
																type="checkbox" 
																id="tc2"
																checked={termsandconditions}
															/>
															<label 
																htmlFor="tc2"
																onClick={() => setTermsandConditions(!termsandconditions)}
															>
																I've read and accept the&nbsp;
																<Link 
																	to="/terms-and-conditions-solidifai"
																	target="_blank"
																	style={{ color: "#26A59A" }}
																> 
																	Solidifai Terms & Conditions
																</Link>
																<b 
																	className="red"
																>
																	&nbsp;*
																</b>
															</label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
														<div className="checkout">
															<button 
																className="btn"
																type="submit"
																onClick={() => 
																	setSolidifai({
																		...solidifai,
																		priceincents: parseInt(((((parseInt(data.lineitemcount) * 0.85) + (data.grandtotal * 0.105)) * CategoryValue) * 100).toFixed(2)),
																	})
																}
																disabled={
																	data.projectname == "" ||
																	data.causeofloss == "" ||
																	data.category == "" ||
																	data.mrc == "" ||
																	data.class == "" ||
																	data.premitigation == "" ||
																	checkPreURL ||
																	checkPostURL ||
																	data.postmitigation == "" ||
																	data.uploadESX == "" ||
																	data.losssnapshot == "" ||
																	data.lineitemcount == "" ||
																	!termsandconditions
																		? true
																		: false
																}
															>
																Checkout
															</button>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							) : (
								<div className="Solidifai_Zora">
									<div className="">
										<div className="holder">
											<h2> Solidifai (Estimate Edit Engine) </h2>
											<h3> 
												Click&nbsp; 
												<Link
													to="/solidifai"
													target="_blank"
													className="here"
												> 
													here 
												</Link>
												&nbsp;to review an example Solidifai analysis.
											</h3>
										</div>
										<div className="analysis">
											<div className="row analysis-image-section">
												<div className="col">
													<div className="image-bg">
														<div style={{ backgroundColor: "#000" }}>
															<img 
																src={updated_solidifaimask} 
																loading="lazy"	
															/>
															<Link to="/plan-matrix">
																<button className="btn"> Update Plan </button>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</>
					)}
					{loading && (
						<div className="loader-inner">
							<LottieLoader />
						</div>
					)}
				</div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
				<Footer />
			</Suspense>
		</>
	);
};

export default withRouter(solidifai);