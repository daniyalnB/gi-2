import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { AppContext } from "../../contexts/appContext";
import NumberFormat from "react-number-format";
import { Helmet } from "react-helmet";
import moment from "moment";
import history from "../../utils/history";
import person from "assets/receipt_person.svg";
import envelope from "assets/receipt_envelope.svg";
import phone from "assets/receipt_phone.svg";
import location from "assets/receipt_location.svg";
import companyname from "assets/receipt_companyname.svg";
import download from "assets/Download.svg";

const Receipt = (props) => {

	const { getCustomerInfo, myInfo, getMyEncryptedDataFunction, encryptedData } = useContext(AppContext);

	useEffect(() => {
    getCustomerInfo();
    getMyEncryptedDataFunction();
  }, []);

	const [customerInfo, setCustomerInfo] = useState(false);

	const [EncryptedData, setEncryptedData] = useState(false);

	const [subscriptionInfo, setSubscriptionInfo] = useState(false);

	useEffect(() => {
		if (myInfo) {
			setCustomerInfo(myInfo.ownerinfo);
			setEncryptedData(encryptedData);
			setSubscriptionInfo(myInfo.subscriptioninfo);
		}
  }, [myInfo]);
	
	const [data, setData] = useState([]);
	const [propsData, setPropsData] = useState([]);
	const [couponData, setCouponData] = useState([]);

	useEffect(() => {
    if (props.location.state === undefined) {
      history.push("/");
    } else {
      setData(props.location.state.data);
			setPropsData(props.location.state.propsData);
			setCouponData(props.location.state.couponData);
    }
  }, []);

	useEffect(() => {
		return () => {
			if (history.action === "POP") {
				history.replace(`${propsData.path}`);
			}
		}
	}, [propsData]);

	const ssoauth = () => {
    const host =  window.location.host;
    const LMS_KEY = "mXu8EfYLQVgh8n3iEH6zFl97UPfNwwUf";
    const LMS_SECRET = "PRVfWX16FziQkMcdsAKHfeX9WyZJhW49";
		const url = `${host === "localhost:8000" || host === "reactdev.getinsights.org" ? "http://dev.actionableacademy.org" : "https://actionableacademy.org"}`
    const endpoint = `${url}/sso?secret=${LMS_SECRET}&key=${LMS_KEY}&identifier=${customerInfo.emailaddress}&data=${EncryptedData}`;
    window.open(endpoint, "_blank");
  }

	// console.log(data, "data");

	return (
		<>
			<Helmet>
				<title> 
					Receipt - Actionable Insights
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
				<div className="main-container">
					<div className="Receipt">
						<div className="">
							<div className="holder">
								<h2> Receipt </h2>
								{propsData.type == "macro" ? (
									<h3> Thank you for buying a {data.producttitle}. You can view it in  
										<Link
											to="/my-account/downloads"
											className="downloads"
										> 
											My Downloads 
										</Link>
										.
									</h3>
								) : propsData.type == "event" ? (
									<h3> 
										Thank you, your event registration details have been received.
									</h3>
								) : propsData.type == "points" || propsData.type == "certification" ? (
									<h3> 
										Thank you, your order details have been received.
									</h3>
								) : propsData.type == "users" || propsData.type == "invite_users" ? (
									<h3> 
										Thank you, your order details have been received.
									</h3>
								) : (
									<h3> 
										Thank you for buying a {data.producttitle}. Your details have been received.
									</h3>
								)}
							</div>
							{propsData.type == "users" || propsData.type == "invite_users" ? (
								<div className="add-additional-sub-users">
									<Link to="/users"> 
										Add additional Sub-Users 
									</Link>
								</div>
							) : (
								""
							)}
							{propsData.type == "users" || propsData.type == "invite_users" ? (
								<div className="order_data">
									<div className="menu">
										<ul>
											<li style={{ display: "flex" }}>
												<h4 style={{ margin: "0px" }}> Date: </h4>
												<h5 style={{ margin: "0px 0px 0px 5px" }}> {moment(data.orderplacedon).format("MMM DD, YYYY")} </h5>
											</li>
											{/* <li>
												<h4> Date: </h4>
												<h5> {moment(data.orderplacedon).format("MMM DD, YYYY")} </h5>
											</li>
											<li className="order-receipt">
												<img
													src={download}
													alt="download"
													loading="lazy"
												/>
												<a target="_blank" href={data.inviteUserOrderReceipt}>
													Download Receipt
												</a>
											</li> */}
										</ul>              
									</div>
								</div>
							) : (
								<div className="order_data">
									<div className="menu">
										<ul>
											<li>
												<h4> Order Number: </h4>
												<h5> {data.ordernumber} </h5>
											</li>
											<li>
												<h4> Date: </h4>
												<h5> {moment(data.orderplacedon).format("MMM DD, YYYY")} </h5>
											</li>
											<li>
												<h4> Email: </h4>
												<h5> {data.customerowneremail} </h5>
											</li>
											{data.orderRceiptUrl && (
												<li className="order-receipt">
													<img
														src={download}
														alt="download"
														loading="lazy"
													/>
													<a target="_blank" href={data.orderRceiptUrl}>
														Download Receipt
													</a>
												</li>
											)}
										</ul>                      
									</div>
								</div>
							)}
							{propsData.type == "certification" ? (
								<div className="certification_extra_info">
									<h3>
										You have successfully registered for {data.producttitle}.
										<br />
										Please&nbsp;
										<span onClick={ssoauth}>click here</span>
										&nbsp;to go to Actionable Academy.
									</h3>
								</div>
							) : (
								""
							)}
							<div className="order-info">
								<div className="order">
									<div className="row">
										<div className="col">
											<h3 className="text-left">
												{propsData.type == "users" || propsData.type == "invite_users" ? "Product" : "Order Details"}
											</h3>
										</div>
										<div className="col">
											<h3 className="text-right"> Total </h3>
										</div>
									</div>
								</div>
								<div className="product_event">
									<div className="row">
										<div className="col">
											<h3 className="text-left">
												{propsData.type == "users" || propsData.type == "invite_users" ? (
													<>
														{subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlan" ? "Pro Plan (Monthly)" : subscriptionInfo && subscriptionInfo.planname === "ProfessionalPlanAnnual" ? "Pro Plan (Annual)" : subscriptionInfo && subscriptionInfo.planname === "EnterprisePlan" ? "Enterprise Plan (Monthly)" : "Enterprise Plan (Annual)"} - Sub {data.length == 1 ? "User" : "Users"} ({data.length})
													</>
												) : propsData.type == "points" ? (
													<>
														{data.producttitle}{" "}(
															<NumberFormat
																value={data.numberofinsigherpointsbought}
																displayType={"text"}
																thousandSeparator={true}
															/>
														)
													</>
												) : propsData.type == "event" ? (
													<>
														{data.producttitle} x {propsData.attendees.length}
													</>
												) : propsData.type == "solidifai" || propsData.type == "certification" ? (
													<>
														{data.producttitle}
													</>
												) : (
													<>
														{data.producttitle} x {propsData.quantity}
													</>
												)} 
											</h3>
										</div>
										<div className="col">
											<h3 className="text-right">
												{couponData.length !== 0 ? (
													<>
														<NumberFormat
															value={(couponData.orignalprice / 100).toFixed(2)}
															displayType={"text"}
															thousandSeparator={true}
															prefix={"$"}
														/>
													</>
												) : (
													<>
														{propsData.type == "users" || propsData.type == "invite_users" ? (
															<NumberFormat
																value={(props.location.state.ChildPaymentPreviewData.amounttochargeincents / 100).toFixed(2)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={"$"}
															/>
														) : (
															<NumberFormat
																value={(data.pricepaidincents / 100).toFixed(2)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={"$"}
															/>
														)}
													</>
												)}
											</h3>
										</div>
									</div>
								</div>
								{(propsData.type == "users" || propsData.type == "invite_users") && (propsData.planName === "PP" || propsData.planName === "EP") && (
									<>
										<hr className="hr-two" />
										<div className="product_event">
											<div className="row">
												<div className="col">
													<h3 className="text-left" style={{ opacity: 1 }}> 
														{propsData.planName === "EP" ? "EP" : "Pro"} Swag Bundle x {data.length} - Per user
													</h3>
												</div>
												<div className="col">
													<h3 className="text-right" style={{ opacity: 1 }}>
														$0.00
													</h3>
												</div>
											</div>
										</div>
									</>
								)}
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									""
								) : (
									<>
										<hr className="hr-two" />
										<div className="details">
											<div className="row">
												<div className="col">
													<h3 className="text-left"> Subtotal </h3>
												</div>
												<div className="col">
													<h3 className="text-right"> 
														{couponData.length !== 0 ? (
															<>
																<NumberFormat
																	value={(couponData.orignalprice / 100).toFixed(2)}
																	displayType={"text"}
																	thousandSeparator={true}
																	prefix={"$"}
																/>
															</>
														) : (
															<>
																{propsData.type == "users" || propsData.type == "invite_users" ? (
																	<NumberFormat
																		value={(props.location.state.ChildPaymentPreviewData.amounttochargeincents / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																) : (
																	<NumberFormat
																		value={(data.pricepaidincents / 100).toFixed(2)}
																		displayType={"text"}
																		thousandSeparator={true}
																		prefix={"$"}
																	/>
																)}
															</>
														)}
													</h3>
												</div>
											</div>
										</div>
									</>
								)}
								<hr className="hr-two" />
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									<div className="row">
										<div className="col" style={{ margin: "10px", textAlign: "center" }}>
											<span className="coupon_success">
												{props.location.state.ChildPaymentPreviewData.couponcode && (
													<>
														Subscription Coupon Applied: <b>{props.location.state.ChildPaymentPreviewData.couponcode}</b>
														<br />
													</>
												)}
												Next Billing Date: <b>{moment(props.location.state.ChildPaymentPreviewData.nextbillingdate).format("LL")}</b>
												<br />
												Last Billing Date: <b>{moment(props.location.state.ChildPaymentPreviewData.lastbillingdate).format("LL")}</b>
												<br />
												Days Remaining on Current Billing Cycle: <b>{props.location.state.ChildPaymentPreviewData.remainingdaysuntilnextpaymenttocharge}</b>
											</span>
										</div>
									</div>
								) : (
									<div className="details">
										<div className="row">
											<div className="col">
												<h3 className="text-left"> Coupon Applied {couponData.code ? `(${couponData.code})` : ""} </h3>
											</div>
											<div className="col">
												<h3 className="text-right"> 
													{couponData.length !== 0 ? (
														<>
															-
															<NumberFormat
																value={(couponData.amountreducned / 100).toFixed(2)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={"$"}
															/>
														</>
													) : (
														<>
															$0.00
														</>
													)}
												</h3>
											</div>
										</div>
									</div>
								)}
								{propsData.type == "points" || propsData.type == "giftcard" || propsData.type == "users" || propsData.type == "invite_users" ? (
									""
								) : (
									<>
										<hr className="hr-two" />
										<div className="details">
											<div className="row">
												<div className="col">
													<h3 className="text-left">
														{couponData.insighterpointsactuallyapplied ? (
															<>
																Insighter Points Applied{" "}(
																	<NumberFormat
																		value={couponData.insighterpointsactuallyapplied}
																		displayType={"text"}
																		thousandSeparator={true}
																	/>
																)
															</>
														) : (
															<>
																Insighter Points Applied{" "}
																<NumberFormat
																	value={couponData.insighterpointsactuallyapplied}
																	displayType={"text"}
																	thousandSeparator={true}
																/>
															</>
														)}
													</h3>
												</div>
												<div className="col">
													<h3 className="text-right">
														{couponData.length !== 0 ? (
															<>
																-
																<NumberFormat
																	value={(couponData.amountreducedduetoinsighterpoints / 100).toFixed(2)}
																	displayType={"text"}
																	thousandSeparator={true}
																	prefix={"$"}
																/>
															</>
														) : (
															<>
																$0.00
															</>
														)}
													</h3>
												</div>
											</div>
										</div>
									</>
								)}
								<hr className="hr-two" />
								<div className="total">
									<div className="row">
										<div className="col">
											<h3 className="text-left"> TOTAL </h3>
										</div>
										<div className="col">
											<h3 className="text-right"> 
												{couponData.length !== 0 ? (
													<>
														<NumberFormat
															value={(couponData.newprice / 100).toFixed(2)}
															displayType={"text"}
															thousandSeparator={true}
															prefix={"$"}
														/>
													</>
												) : (
													<>
														{propsData.type == "users" || propsData.type == "invite_users" ? (
															<NumberFormat
																value={(props.location.state.ChildPaymentPreviewData.amounttochargeincents / 100).toFixed(2)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={"$"}
															/>
														) : (
															<NumberFormat
																value={(data.pricepaidincents / 100).toFixed(2)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={"$"}
															/>
														)}
													</>
												)}
											</h3>
										</div>
									</div>
								</div>
							</div>
							{(propsData.type == "users" || propsData.type == "invite_users") && (propsData.planName === "PP") ? (
								<div className="order-info">
									<div className="order">
										<div className="row">
											<div className="col">
												<h3 className="text-left"> Email </h3>
											</div>
											<div className="col">
												<h3 className="text-right"> Status </h3>
											</div>
										</div>
									</div>
									{data && data.map((val) => {
										return (
											<>
												<div className="product_event">
													<div className="row">
														<div className="col">
															<h3 className="text-left">
																{val.freeswagproductforthecustomer ? (
																	<>
																		{val.freeswagproductforthecustomer.customerowneremail} - {`Order ${val.freeswagproductforthecustomer.ordernumber}`}
																	</>
																) : (
																	<>
																		{val}
																	</>
																)}
															</h3>
														</div>
														<div className="col">
															{val.freeswagproductforthecustomer ? (
																<h3 className="text-right" style={{ color: "#38ADA2" }}>
																	{val.freeswagproductforthecustomer.status == "PAID" ? "Paid" : val.freeswagproductforthecustomer.status}
																</h3>
															) : (
																<h3 className="text-right" style={{ color: "#DB422D" }}>
																	Fail - {val}
																</h3>
															)}
														</div>
													</div>
												</div>
												<hr className="hr-two invite-users" />
											</>
										);
									})}
								</div>
							) : (
								""
							)}
							<div className="order-info">
								<div className="order">
									<div className="row">
										<div className="col">
											<h3 className="text-left"> Billing Information </h3>
										</div>
									</div>
								</div>
								<div className="billing_info">
									<div className="row">
										<div className="col">
											<img
												src={person}
												alt="person"
												loading="lazy"
											/>
											<h5> {customerInfo.firstname} {customerInfo.lastname} </h5>
										</div>
									</div>
								</div>
								<div className="billing_info">
									<div className="row">
										<div className="col">
											<img
												src={envelope}
												alt="envelope"
												loading="lazy"
											/>
											<h5> {propsData.type == "users" || propsData.type == "invite_users" ? customerInfo.emailaddress : data.customerowneremail} </h5>
										</div>
									</div>
								</div>
								{/* <div className="billing_info">
									<div className="row">
										<div className="col">
											<img
												src={phone}
												alt="phone"
												loading="lazy"
											/>
											<h5> {propsData.type == "users" ? customerInfo.phonenumber : data.customerownerphone} </h5>
										</div>
									</div>
								</div> */}
								<div className="billing_info">
									<div className="row">
										<div className="col">
											<img
												src={companyname}
												alt="location"
												loading="lazy"
											/>
											<h5> {propsData.type == "users" || propsData.type == "invite_users" ? props.location.state.billingDetails.companyname : data && data.contactinformationfororder ? data.contactinformationfororder.companyname : "N/A"} </h5>
										</div>
									</div>
								</div>
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									props.location.state.billingDetails.streetaddress ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {props.location.state.billingDetails.streetaddress} </h5>
											</div>
										</div>
									</div> : ""
								) : data && data.contactinformationfororder ? (
									data.contactinformationfororder.streetaddress ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {data.contactinformationfororder.streetaddress} </h5>
											</div>
										</div>
									</div> : ""
								) : (
									""
								)}
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									props.location.state.billingDetails.streetaddress ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {props.location.state.billingDetails.streetaddress} </h5>
											</div>
										</div>
									</div> : ""
								) : data && data.contactinformationfororder ? (
									data.contactinformationfororder.streetaddress ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {data.contactinformationfororder.streetaddress} </h5>
											</div>
										</div>
									</div> : ""
								) : (
									""
								)}
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									props.location.state.billingDetails.aptorunitorsuite ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {props.location.state.billingDetails.aptorunitorsuite} </h5>
											</div>
										</div>
									</div> : ""
								) : data && data.contactinformationfororder ? (
									data.contactinformationfororder.aptorunitorsuite ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {data.contactinformationfororder.aptorunitorsuite} </h5>
											</div>
										</div>
									</div> : ""
								) : (
									""
								)}
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									props.location.state.billingDetails.city ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {props.location.state.billingDetails.city} </h5>
											</div>
										</div>
									</div> : ""
								) : data && data.contactinformationfororder ? (
									data.contactinformationfororder.city ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {data.contactinformationfororder.city} </h5>
											</div>
										</div>
									</div> : ""
								) : (
									""
								)}
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									props.location.state.billingDetails.state ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {props.location.state.billingDetails.state} </h5>
											</div>
										</div>
									</div> : "N/A"
								) : data && data.contactinformationfororder ? (
									data.contactinformationfororder.state ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {data.contactinformationfororder.state} </h5>
											</div>
										</div>
									</div> : ""
								) : (
									""
								)}
								{propsData.type == "users" || propsData.type == "invite_users" ? (
									props.location.state.billingDetails.zipcode ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {props.location.state.billingDetails.zipcode} </h5>
											</div>
										</div>
									</div> : ""
								) : data && data.contactinformationfororder ? (
									data.contactinformationfororder.zipcode ?
									<div className="billing_info">
										<div className="row">
											<div className="col">
												<img
													src={location}
													alt="location"
													loading="lazy"
												/>
												<h5> {data.contactinformationfororder.zipcode} </h5>
											</div>
										</div>
									</div> : ""
								) : (
									""
								)}
							</div>
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

export default withRouter(Receipt);