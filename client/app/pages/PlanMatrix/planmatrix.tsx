import React, { Suspense, useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { 
	GetAllSubscriptionPlan,
	cancelSubscriptionPlan,
} from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip  from "react-bootstrap/Tooltip";
import history from "../../../utils/history";
import right from "assets/right.svg";
import wrong from "assets/wrong.svg";
import modalclose from "assets/modal-close.svg";
import rr from "assets/rr.png";
import rain from "assets/rain.png";
import ati from "assets/ati.png";

const PlanMatrix = () => {

	const navigate = useNavigate();

	const { getCustomerInfo, myInfo } = useContext(AppContext);

	useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

	const [loading, setLoading] = useState(true);

	const [data, setData] = useState([]);

  useEffect(() => {
    GetAllSubscriptionPlan().subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
				setLoading(false);
			}
    });
  }, []);

	const plans = data.map(plan => plan.name);
  const AllPlans= [...new Set(plans)];
	
	const [customerData, setCustomerData] = useState([]);

	const [ActionableXactimateProfile, setActionableXactimateProfile] = useState({
    xactProfileveriskid: "",
    xactProfileStatus: "",
  });

	useEffect(() => {
    if (myInfo) {
      setCustomerData(myInfo.subscriptioninfo);
			setActionableXactimateProfile({
        xactProfileveriskid: myInfo.xactProfileveriskid ? myInfo.xactProfileveriskid : "",
        xactProfileStatus: myInfo.xactProfileStatus,
      });
    }
  }, [myInfo]);

	const [active, setActive] = useState({
		one: false,
		two: false,
		three: false,
	});

	const [flag, setFlag] = useState(0);

	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const [cancelPlanLoading, setCancelPlanLoading] = useState(false);

	const cancelPlan = () => {
    setCancelPlanLoading(true);
    cancelSubscriptionPlan().subscribe((response) => {
      setCancelPlanLoading(false);
      handleClose();
			navigate("/my-account", {
				state: {
					subscription: true,
					plan: `${AllPlans[flag]}`,
					ActionableXactimateProfile: {ActionableXactimateProfile},
				}
			});
    });
  };

	const BuyNewPlan = (planNumber) => {
		navigate("/my-account", {
			state: {
				subscription: true,
				plan: `${AllPlans[planNumber]}`,
				ActionableXactimateProfile: {ActionableXactimateProfile},
			}
		});
  };

	const [showTooltip1, setShowTooltip1] = useState(false);
	const refTooltip1 = useRef(null);

	const [showTooltip2, setShowTooltip2] = useState(false);
	const refTooltip2 = useRef(null);

	const [showTooltip3, setShowTooltip3] = useState(false);
	const refTooltip3 = useRef(null);

	const [showTooltip4, setShowTooltip4] = useState(false);
	const refTooltip4 = useRef(null);

	const [showTooltip5, setShowTooltip5] = useState(false);
	const refTooltip5 = useRef(null);

	const [showTooltip6, setShowTooltip6] = useState(false);
	const refTooltip6 = useRef(null);

	const [showTooltip7, setShowTooltip7] = useState(false);
	const refTooltip7 = useRef(null);

	const [showTooltip8, setShowTooltip8] = useState(false);
	const refTooltip8 = useRef(null);

	const [showTooltip9, setShowTooltip9] = useState(false);
	const refTooltip9 = useRef(null);

	const [showTooltip10, setShowTooltip10] = useState(false);
	const refTooltip10 = useRef(null);

	const [activePlans, setActivePlans] = useState({
		Monthly: true,
		Annual: false,
	});

	return (
		<>
			<SEO
        title="Plan Matrix - Actionable Insights"
        description="Explore all the plans Actionable Insights has to offer and what perks come with each plan. Figure out which membership plan works for you and your business."
				link="plan-matrix"
			/>
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
				<Modal 
					show={show} 
					onHide={handleClose}
					backdrop="static" 
					keyboard={false}
					className="Cancel_Subscription_Modal"
				>
					<Modal.Header>
						<div 
							className="cancel_subscription_title modal-title h4"
						> 
							Change Plan
						</div>
						<button 
							type="button" 
							className="close" 
							data-dismiss="modal" 
							onClick={handleClose}
						>
							<img 
								src={modalclose}
							/>
						</button>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to change plans?
					</Modal.Body>
					<Modal.Footer>
						<button 
							className="btn btn_pm" 
							onClick={handleClose}
						>
							Back
						</button>
						{!cancelPlanLoading && (
							<button
								className="btn btn_pm"
								onClick={cancelPlan}
							>
								Confirm
							</button>
						)}
						{cancelPlanLoading && (
							<button 
								className="btn btn_pm"
								disabled
							>
								<i className="fas fa-spinner fa-spin"></i>
							</button>
						)}
					</Modal.Footer>
				</Modal>
				<ScrollToTop />
				<Navbar />
        <Breadcrumbs />
				<div className="main-container">
					<div className="Plan_Matrix">
						<div className="">
							<div className="holder">
								<h2> Membership Plans </h2>
							</div>
							{!loading && (
								<>
									<div className="FilterPlans">
										<ul className="subs_filters">
											<li
												className={activePlans.Monthly == true ? "active" : ""}
												onClick={() =>
													setActivePlans({
														Monthly: true,
														Annual: false,
													})
												}
											>
												Monthly
											</li>
											<li
												className={activePlans.Annual == true ? "active" : ""}
												style={{ padding: "10px 0px 0px 0px" }}
												onClick={() =>
													setActivePlans({
														Monthly: false,
														Annual: true,
													})
												}
											>
												Annual
												<span> 2 months free </span>
											</li>
										</ul>
									</div>
									{activePlans.Monthly && (
										<div className="Matrix">
											<div className="row">
												<div className="col-4">
													<div className="h">
														<h4> Features </h4>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip1}
																container={refTooltip1}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-insightsheet"
																		onMouseEnter={() => setShowTooltip1(true)}
																		onMouseLeave={() => setShowTooltip1(false)}
																	>
																		3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																		<Link
																			to="/insight-sheets"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<strong
																	ref={refTooltip1}
																	onMouseEnter={() => setShowTooltip1(true)}
																	onMouseLeave={() => setShowTooltip1(false)}
																>
																	Insight Sheet Database
																</strong>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip2}
																container={refTooltip2}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-coli"
																		onMouseEnter={() => setShowTooltip2(true)}
																		onMouseLeave={() => setShowTooltip2(false)}
																	>
																		Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																		200+ line items that you will never miss again!{" "}
																		<Link
																			to="commonly-overlooked-line-items"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<strong
																	ref={refTooltip2}
																	onMouseEnter={() => setShowTooltip2(true)}
																	onMouseLeave={() => setShowTooltip2(false)}
																>
																	Commonly Overlooked Line Item Database
																</strong>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip3}
																container={refTooltip3}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-macro"
																		onMouseEnter={() => setShowTooltip3(true)}
																		onMouseLeave={() => setShowTooltip3(false)}
																	>
																		100+ Xactimate Macros that help you estimate efficiently.
																		All Macros include relevant line items and F9 notes.{" "}
																		<Link
																			to="/macros"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip3}
																	onMouseEnter={() => setShowTooltip3(true)}
																	onMouseLeave={() => setShowTooltip3(false)}
																>
																	Ability to Purchase <strong> Actionable Macros </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip4}
																container={refTooltip4}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-macro"
																		onMouseEnter={() => setShowTooltip4(true)}
																		onMouseLeave={() => setShowTooltip4(false)}	
																	>
																		Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																		<Link
																			to="/swag"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip4}
																	onMouseEnter={() => setShowTooltip4(true)}
																	onMouseLeave={() => setShowTooltip4(false)}
																>
																	Free <strong> Swag </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip5}
																container={refTooltip5}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-swag"
																		onMouseEnter={() => setShowTooltip5(true)}
																		onMouseLeave={() => setShowTooltip5(false)}
																	>
																		Digital currency that can be used to purchase tools and resources.{" "}
																		<Link
																			to="/my-account/points"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip5}
																	onMouseEnter={() => setShowTooltip5(true)}
																	onMouseLeave={() => setShowTooltip5(false)}
																>
																	Free <strong> Insighter Points </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip6}
																container={refTooltip6}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-training"
																		onMouseEnter={() => setShowTooltip6(true)}
																		onMouseLeave={() => setShowTooltip6(false)}
																	>
																		Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																		<Link
																			to="/events"
																			target="_blank"
																		>
																			Learn More Here
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip6}
																	onMouseEnter={() => setShowTooltip6(true)}
																	onMouseLeave={() => setShowTooltip6(false)}
																>
																	Unlimited <strong> Xactimate Training </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip7}
																container={refTooltip7}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-coli"
																		onMouseEnter={() => setShowTooltip7(true)}
																		onMouseLeave={() => setShowTooltip7(false)}
																	>
																		Elevate your Xactimate profile.
																		Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																		<Link
																			to="/actionable-xactimate-profile"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<strong
																	ref={refTooltip7}
																	onMouseEnter={() => setShowTooltip7(true)}
																	onMouseLeave={() => setShowTooltip7(false)}
																>
																	Actionable Xactimate Profile w/ all Actionable Macros
																</strong>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip8}
																container={refTooltip8}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-swag"
																		onMouseEnter={() => setShowTooltip8(true)}
																		onMouseLeave={() => setShowTooltip8(false)}
																	>
																		Manage your company/co-workers with ease, all under the same account.{" "}
																		<a
																			href="https://value.getinsights.org/enterprise-benefits"
																			target="_blank"
																		>
																			Learn More
																		</a>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip8}
																	onMouseEnter={() => setShowTooltip8(true)}
																	onMouseLeave={() => setShowTooltip8(false)}
																>
																	Enterprise-Level Account Administration
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5 className="ep">
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip9}
																container={refTooltip9}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-aitc"
																		onMouseEnter={() => setShowTooltip9(true)}
																		onMouseLeave={() => setShowTooltip9(false)}
																	>
																		Get the full suite of Actionable Alerts in every estimate, regardless of the Profile you are writing in. Leverage the Actionable Alerts you love in program work, carrier specific profiles, the default carrier and contractor profiles, and other custom profiles.{" "}
																		<Link
																			to="/advance-the-cause/actionable-profile-alert-request"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip9}
																	onMouseEnter={() => setShowTooltip9(true)}
																	onMouseLeave={() => setShowTooltip9(false)}
																>
																	<strong>Actionable Profile Alerts At The Instance Level</strong> - Get
																	<br />
																	Your Alerts Wherever You Estimate!
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip10}
																container={refTooltip10}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-training"
																		onMouseEnter={() => setShowTooltip10(true)}
																		onMouseLeave={() => setShowTooltip10(false)}
																	>
																		Work one-on-one with the an Actionable Insights team member to develop customized alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology.{" "}
																		<Link
																			to="/advance-the-cause/actionable-profile-alert-request"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip10}
																	onMouseEnter={() => setShowTooltip10(true)}
																	onMouseLeave={() => setShowTooltip10(false)}
																>
																	Custom Alerts
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<span>
																Trial Period
															</span>
														</h5>
													</div>
												</div>
												<div className="col-2">
													<div className="h" style={{ textAlign: "center" }}>
														<h4> Plus Plan </h4>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<p> 
															<span className="amount">$28</span> 
															<span className="month">/macro</span> 
														</p>
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<p className="bc_1"> 
															<span className="data"><b>50</b> on every 30 days of active subscription</span>
														</p>
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="dc dk">
														{data.map((plan) => {
															if (plan.name === "PlusPlan") {
																return (
																	<p> 
																		<span className="amount">${plan.price / 100}</span> 
																		<span className="month">/month</span>
																	</p>
																);
															}
														})}
														<div className="buy">
															{localStorage.getItem("tokenCustomer") == null ? (
																<Link
																	to="/get-started"
																	className="btn"
																>
																	Buy
																</Link>
															) : (
																<button
																	className={customerData.planname == "PlusPlan" ? "btn non-hover" : "btn"}
																	onClick={(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
																		() => {
																			BuyNewPlan(1);
																		}
																	) : ( 
																		() => {
																			setFlag(1);
																			handleShow();
																		}
																	)}
																	disabled={(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? true : customerData.subscriptionstatus == "Trial" ? false : (customerData.planname == "PlusPlan") || myInfo.ischilduser ? true : false}
																>
																	{
																		customerData.subscriptionstatus == "Trial" ? "Upgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && myInfo.ischilduser ? "Downgrade" :
																		(customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? "Buy" :
																		customerData.planname == "StandardPlan" ? "Upgrade" :
																		customerData.planname == "ProfessionalPlan" ? "Downgrade" :
																		customerData.planname == "StandardPlanAnnual" ? "Upgrade" :
																		customerData.planname == "PlusPlanAnnual" ? "Downgrade" :
																		customerData.planname == "ProfessionalPlanAnnual" ? "Downgrade" :
																		(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? "Downgrade" : "Current Plan"
																	}
																</button>
															)}
														</div>
													</div>
												</div>
												<div className="col-3">
													<div className="h" style={{ textAlign: "center" }}>
														<h3> Most Popular </h3>
														<h4 style={{ padding: "12px 20px 40px" }}> Pro Plan </h4>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<p className="bc_3"> 
															<span className="data">
																Included in Actionable
																<br />
																Xactimate Profile
															</span>
														</p>
													</div>
													<div className="bc">
														<p> 
															<span className="amount">1 x Socks & Belt</span> 
															<span className="month">/seat</span> 
														</p>
													</div>
													<div className="bc">
														<p className="bc_2"> 
															<span className="data"><b>100/seat</b> on every 30 days of active subscription</span>
														</p>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<p className="bc_4"> 
															<span className="data">
																Get a 99% discount off the first month (automatically applied to all seats at checkout)
															</span>
														</p>
													</div>
													<div className="dc">
														{data.map((plan) => {
															if (plan.name === "ProfessionalPlan") {
																return (
																	<p> 
																		<span className="amount">${plan.price / 100}</span> 
																		<span className="month">/month</span>
																		<span className="month">/seat</span>
																	</p>
																);
															}
														})}
														<div className="buy">
															{localStorage.getItem("tokenCustomer") == null ? (
																<Link
																	to="/get-started"
																	className="btn"
																>
																	Buy
																</Link>
															) : (
																<button
																	className={customerData.planname == "ProfessionalPlan" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Monthly") ? "btn non-hover" : "btn"}
																	onClick={(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
																		() => {
																			BuyNewPlan(2);
																		}
																	) : (
																		() => {
																			setFlag(2);
																			handleShow();
																		}
																	)}
																	disabled={(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? true : customerData.subscriptionstatus == "Trial" ? false : (customerData.planname == "ProfessionalPlan") || myInfo.ischilduser ? true : false}
																>
																	{
																		customerData.subscriptionstatus == "Trial" ? "Upgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Monthly") ? "Current Plan" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Annual") ? "Downgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? "Downgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? "Downgrade" :
																		(customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? "Buy" :
																		customerData.planname == "StandardPlan" ? "Upgrade" :
																		customerData.planname == "PlusPlan" ? "Upgrade" :
																		customerData.planname == "StandardPlanAnnual" ? "Upgrade" :
																		customerData.planname == "PlusPlanAnnual" ? "Upgrade" :
																		customerData.planname == "ProfessionalPlanAnnual" ? "Downgrade" :
																		(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? "Downgrade" : "Current Plan"
																	}
																</button>
															)}
														</div>
														<div className="preferred">
															<span>PREFERRED PLAN OF</span>
														</div>
														<div className="preferred_plan">
															<img src={rr} />
															<img src={rain} />
														</div>
													</div>
												</div>
												<div className="col-3">
													<div className="h" style={{ textAlign: "center" }}>
														<h4> Enterprise Plan </h4>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<p className="bc_3"> 
															<span className="data">
																Included in Actionable
																<br />
																Xactimate Profile
															</span>
														</p>
													</div>
													<div className="bc">
														<p> 
															<span className="amount">1 x Socks & Belt</span> 
															<span className="month">/seat</span> 
														</p>
													</div>
													<div className="bc">
														<p className="bc_2"> 
															<span className="data"><b>100/seat</b> on every 30 days of active subscription</span>
														</p>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="dc">
														<div className="contact-us">
															{customerData.planname == "EnterprisePlan" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? (
																<button
																	className="btn non-hover"
																	disabled
																>
																	Current Plan
																</button>
															) : (
																<Link to="/request-a-quote">
																	<button className="btn">
																		Contact Us
																		<br />
																		For A Quote
																	</button>
																</Link>
															)}
														</div>
														<div className="preferred">
															<span>PREFERRED PLAN OF</span>
														</div>
														<div className="preferred_plan">
															<img src={ati} />
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
									{activePlans.Annual && (
										<div className="Matrix">
											<div className="row">
												<div className="col-4">
													<div className="h">
														<h4> Features </h4>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip1}
																container={refTooltip1}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-insightsheet"
																		onMouseEnter={() => setShowTooltip1(true)}
																		onMouseLeave={() => setShowTooltip1(false)}
																	>
																		3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																		<Link
																			to="/insight-sheets"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<strong
																	ref={refTooltip1}
																	onMouseEnter={() => setShowTooltip1(true)}
																	onMouseLeave={() => setShowTooltip1(false)}
																>
																	Insight Sheet Database
																</strong>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip2}
																container={refTooltip2}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-coli"
																		onMouseEnter={() => setShowTooltip2(true)}
																		onMouseLeave={() => setShowTooltip2(false)}
																	>
																		Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																		200+ line items that you will never miss again!{" "}
																		<Link
																			to="commonly-overlooked-line-items"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<strong
																	ref={refTooltip2}
																	onMouseEnter={() => setShowTooltip2(true)}
																	onMouseLeave={() => setShowTooltip2(false)}
																>
																	Commonly Overlooked Line Item Database
																</strong>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip3}
																container={refTooltip3}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-macro"
																		onMouseEnter={() => setShowTooltip3(true)}
																		onMouseLeave={() => setShowTooltip3(false)}
																	>
																		100+ Xactimate Macros that help you estimate efficiently.
																		All Macros include relevant line items and F9 notes.{" "}
																		<Link
																			to="/macros"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip3}
																	onMouseEnter={() => setShowTooltip3(true)}
																	onMouseLeave={() => setShowTooltip3(false)}
																>
																	Ability to Purchase <strong> Actionable Macros </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip4}
																container={refTooltip4}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-macro"
																		onMouseEnter={() => setShowTooltip4(true)}
																		onMouseLeave={() => setShowTooltip4(false)}	
																	>
																		Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																		<Link
																			to="/swag"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip4}
																	onMouseEnter={() => setShowTooltip4(true)}
																	onMouseLeave={() => setShowTooltip4(false)}
																>
																	Free <strong> Swag </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip5}
																container={refTooltip5}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-swag"
																		onMouseEnter={() => setShowTooltip5(true)}
																		onMouseLeave={() => setShowTooltip5(false)}
																	>
																		Digital currency that can be used to purchase tools and resources.{" "}
																		<Link
																			to="/my-account/points"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip5}
																	onMouseEnter={() => setShowTooltip5(true)}
																	onMouseLeave={() => setShowTooltip5(false)}
																>
																	Free <strong> Insighter Points </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip6}
																container={refTooltip6}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-training"
																		onMouseEnter={() => setShowTooltip6(true)}
																		onMouseLeave={() => setShowTooltip6(false)}
																	>
																		Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																		<Link
																			to="/events"
																			target="_blank"
																		>
																			Learn More Here
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip6}
																	onMouseEnter={() => setShowTooltip6(true)}
																	onMouseLeave={() => setShowTooltip6(false)}
																>
																	Unlimited <strong> Xactimate Training </strong>
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip7}
																container={refTooltip7}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-coli"
																		onMouseEnter={() => setShowTooltip7(true)}
																		onMouseLeave={() => setShowTooltip7(false)}
																	>
																		Elevate your Xactimate profile.
																		Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																		<Link
																			to="/actionable-xactimate-profile"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<strong
																	ref={refTooltip7}
																	onMouseEnter={() => setShowTooltip7(true)}
																	onMouseLeave={() => setShowTooltip7(false)}
																>
																	Actionable Xactimate Profile w/ all Actionable Macros
																</strong>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip8}
																container={refTooltip8}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-swag"
																		onMouseEnter={() => setShowTooltip8(true)}
																		onMouseLeave={() => setShowTooltip8(false)}
																	>
																		Manage your company/co-workers with ease, all under the same account.{" "}
																		<a
																			href="https://value.getinsights.org/enterprise-benefits"
																			target="_blank"
																		>
																			Learn More
																		</a>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip8}
																	onMouseEnter={() => setShowTooltip8(true)}
																	onMouseLeave={() => setShowTooltip8(false)}
																>
																	Enterprise-Level Account Administration
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5 className="ep">
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip9}
																container={refTooltip9}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-aitc"
																		onMouseEnter={() => setShowTooltip9(true)}
																		onMouseLeave={() => setShowTooltip9(false)}
																	>
																		Get the full suite of Actionable Alerts in every estimate, regardless of the Profile you are writing in. Leverage the Actionable Alerts you love in program work, carrier specific profiles, the default carrier and contractor profiles, and other custom profiles.{" "}
																		<Link
																			to="/advance-the-cause/actionable-profile-alert-request"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip9}
																	onMouseEnter={() => setShowTooltip9(true)}
																	onMouseLeave={() => setShowTooltip9(false)}
																>
																	<strong>Actionable Profile Alerts At The Instance Level</strong> - Get
																	<br />
																	Your Alerts Wherever You Estimate!
																</span>
															</OverlayTrigger>
														</h5>
													</div>
													<div className="features">
														<h5>
															<OverlayTrigger
																placement="right"
																// delay={{ show: 250, hide: 1500 }}
																show={showTooltip10}
																container={refTooltip10}
																overlay={(
																	<Tooltip
																		id="planmatrix-tooltip-training"
																		onMouseEnter={() => setShowTooltip10(true)}
																		onMouseLeave={() => setShowTooltip10(false)}
																	>
																		Work one-on-one with the an Actionable Insights team member to develop customized alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology.{" "}
																		<Link
																			to="/advance-the-cause/actionable-profile-alert-request"
																			target="_blank"
																		>
																			Learn More
																		</Link>
																	</Tooltip>
																)}
															>
																<span
																	ref={refTooltip10}
																	onMouseEnter={() => setShowTooltip10(true)}
																	onMouseLeave={() => setShowTooltip10(false)}
																>
																	Custom Alerts
																</span>
															</OverlayTrigger>
														</h5>
													</div>
												</div>
												<div className="col-2">
													<div className="h" style={{ textAlign: "center" }}>
														<h4> Plus Plan </h4>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<p> 
															<span className="amount">$28</span> 
															<span className="month">/macro</span> 
														</p>
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<p className="bc_1"> 
															<span className="data"><b>600</b> for every year of active subscription</span>
														</p>
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="dc dk">
														{data.map((plan) => {
															if (plan.name === "PlusPlanAnnual") {
																return (
																	<p  style={{ padding: "10px 5px"}}>
																		<div className="outer">
																			<span className="inner">${plan.price / 1000}</span>
																		</div>
																		<span className="amount">${((plan.price / 100) / 12).toFixed(2)}</span> 
																		<span className="month">/month</span>
																		<div className="annually">
																			Billed as ${plan.price / 100} annually
																		</div>
																	</p>
																);
															}
														})}
														<div className="buy">
															{localStorage.getItem("tokenCustomer") == null ? (
																<Link
																	to="/get-started"
																	className="btn"
																>
																	Buy
																</Link>
															) : (
																<button
																	className={customerData.planname == "PlusPlanAnnual" ? "btn non-hover" : "btn"}
																	onClick={(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
																		() => {
																			BuyNewPlan(5);
																		}
																	)	: (
																		() => {
																			setFlag(5);
																			handleShow();
																		}
																	)}
																	disabled={(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? true : customerData.subscriptionstatus == "Trial" ? false : (customerData.planname == "PlusPlanAnnual") || myInfo.ischilduser ? true : false}
																>
																	{
																		customerData.subscriptionstatus == "Trial" ? "Upgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && myInfo.ischilduser ? "Downgrade" :
																		(customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? "Buy" :
																		customerData.planname == "StandardPlan" ? "Upgrade" :
																		customerData.planname == "PlusPlan" ? "Upgrade" :
																		customerData.planname == "ProfessionalPlan" ? "Downgrade" :
																		customerData.planname == "StandardPlanAnnual" ? "Upgrade" :
																		customerData.planname == "ProfessionalPlanAnnual" ? "Downgrade" :
																		(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? "Downgrade" : "Current Plan"
																	}
																</button>
															)}
														</div>
													</div>
												</div>
												<div className="col-3">
													<div className="h" style={{ textAlign: "center" }}>
														<h3> Most Popular </h3>
														<h4 style={{ padding: "12px 20px 40px" }}> Pro Plan </h4>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<p className="bc_3"> 
															<span className="data">
																Included in Actionable
																<br />
																Xactimate Profile
															</span>
														</p>
													</div>
													<div className="bc">
														<p> 
															<span className="amount">1 x Socks & Belt</span> 
															<span className="month">/seat</span> 
														</p>
													</div>
													<div className="bc">
														<p className="bc_2"> 
															<span className="data"><b>1200/seat</b> for every year of active subscription</span>
														</p>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="bc">
														<img src={wrong} />
													</div>
													<div className="dc">
														{data.map((plan) => {
															if (plan.name === "ProfessionalPlanAnnual") {
																return (
																	<p  style={{ padding: "10px"}}>
																		<div className="outer">
																			<span className="inner">${plan.price / 1000}</span>
																		</div>
																		<span className="amount">${((plan.price / 100) / 12)}</span> 
																		<span className="month">/month</span>
																		<span className="month">/seat</span>
																		<div className="annually">
																			Billed as ${plan.price / 100} annually
																		</div>
																	</p>
																);
															}
														})}
														<div className="buy">
															{localStorage.getItem("tokenCustomer") == null ? (
																<Link
																	to="/get-started"
																	className="btn"
																>
																	Buy
																</Link>
															) : (
																<button
																	className={customerData.planname == "ProfessionalPlanAnnual" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Annual") ? "btn non-hover" : "btn"}
																	onClick={(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
																		() => {
																			BuyNewPlan(6);
																		}
																	) : (
																		() => {
																			setFlag(6);
																			handleShow();
																		}
																	)}
																	disabled={(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? true : customerData.subscriptionstatus == "Trial" ? false : (customerData.planname == "ProfessionalPlanAnnual") || myInfo.ischilduser ? true : false}
																>
																	{
																		customerData.subscriptionstatus == "Trial" ? "Upgrade" :
																		customerData.subscriptionstatus == "Cancelled" && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Annual") ? "Current Plan" :
																		customerData.subscriptionstatus == "Cancelled" && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Monthly") ? "Upgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? "Downgrade" :
																		(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? "Downgrade" :
																		(customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? "Buy" :
																		customerData.planname == "ProfessionalPlanAnnual" ? "Current Plan" :
																		(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? "Downgrade" : "Upgrade"
																	}
																</button>
															)}
														</div>
														<div className="preferred">
															<span>PREFERRED PLAN OF</span>
														</div>
														<div className="preferred_plan">
															<img src={rr} />
															<img src={rain} />
														</div>
													</div>
												</div>
												<div className="col-3">
													<div className="h" style={{ textAlign: "center" }}>
														<h4> Enterprise Plan </h4>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<p className="bc_3"> 
															<span className="data">
																Included in Actionable
																<br />
																Xactimate Profile
															</span>
														</p>
													</div>
													<div className="bc">
														<p> 
															<span className="amount">1 x Socks & Belt</span> 
															<span className="month">/seat</span> 
														</p>
													</div>
													<div className="bc">
														<p className="bc_2"> 
															<span className="data"><b>1200/seat</b> for every year of active subscription</span>
														</p>
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="bc">
														<img src={right} />
													</div>
													<div className="dc">
														<div className="contact-us">
															{customerData.planname == "EnterprisePlanAnnual" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? (
																<button
																	className="btn non-hover"
																	disabled
																>
																	Current Plan
																</button>
															) : (
																<Link to="/request-a-quote">
																	<button className="btn">
																		Contact Us
																		<br />
																		For A Quote
																	</button>
																</Link>
															)}
														</div>
														<div className="preferred" style={{ paddingTop: "1px" }}>
															<span>PREFERRED PLAN OF</span>
														</div>
														<div className="preferred_plan">
															<img src={ati} />
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
									{activePlans.Monthly && (
										<div className="Matrix_Responsive">
											{localStorage.getItem("tokenCustomer") == null ? (
												<>
													<Link
														to="/get-started"
														onMouseOver={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
													>
														<div className={active.one ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PLUS
																	<br />
																	PLAN	
																</h4>
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des"> 
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>($28/macro)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(50 on every 30 days of active subscription)</span> </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "PlusPlan") {
																		return (
																			<p className="text-center">
																				<span className="amount">${plan.price / 100}</span> 
																				<span className="month">/month</span>
																			</p>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</Link>
													<Link
														to="/get-started"
														onMouseOver={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
													>
														<div className="most-popular-plan-title">
															<h4> MOST POPULAR </h4>
														</div>
														<div className={active.two ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PRO
																	<br />
																	PLAN	
																</h4>
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(100/seat on every 30 days of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																	<br />
																	<span> Trial Period <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Get a 99% discount off the first month (automatically applied to all seats at checkout))</span> </span>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "ProfessionalPlan") {
																		return (
																			<>
																				<p className="text-center">
																					<span className="amount">${plan.price / 100}</span> 
																					<span className="month">/month</span>
																					<span className="month">/seat</span>
																				</p>
																				<div className="preferred">
																					<span>PREFERRED PLAN OF</span>
																				</div>
																				<div className="preferred_plan">
																					<img src={rr} />
																					<img src={rain} />
																				</div>
																			</>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</Link>
													<Link
														to="/get-started"
														onMouseOver={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
													>
														<div className={active.three ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	ENTERPRISE
																	<br />
																	PLAN	
																</h4>
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(100/seat on every 30 days of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive5">
																				Get the full suite of Actionable Alerts in every estimate, regardless of the Profile you are writing in. Leverage the Actionable Alerts you love in program work, carrier specific profiles, the default carrier and contractor profiles, and other custom profiles.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> <b>Actionable Profile Alerts At The Instance Level</b> - Get Your Alerts Wherever You Estimate! </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive6">
																				Work one-on-one with the an Actionable Insights team member to develop customized alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Custom Alerts </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																<div className="contact-us">
																	<Link to="/request-a-quote">
																		<button className="btn">
																			Contact Us
																			<br />
																			For A Quote
																		</button>
																	</Link>
																</div>
																<div className="preferred">
																	<span>PREFERRED PLAN OF</span>
																</div>
																<div className="preferred_plan">
																	<img src={ati} />
																</div>
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</Link>
												</>
											) : (
												<>
													<a
														onClick={customerData.subscriptionstatus == "Trial" ? (
															() => {
																setFlag(1);
																handleShow();
															}
														) :	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") || (customerData.planname == "PlusPlan") || myInfo.ischilduser ? (
															""
														) : (customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
															() => {
																BuyNewPlan(1);
															}
														) : (
															() => {
																setFlag(1);
																handleShow();
															}
														)}
														onMouseOver={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
													>
														<div className={active.one ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PLUS
																	<br />
																	PLAN	
																</h4>
																{
                                  customerData.subscriptionstatus == "Trial" ? <h3 className="current-plan"> Upgrade </h3> :
                                  (customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && myInfo.ischilduser ? <h3 className="current-plan"> Downgrade </h3> :
                                  (customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? <h3 className="current-plan"> Buy </h3> :
                                  customerData.planname == "StandardPlan" ? <h3 className="current-plan"> Upgrade </h3> :
                                  customerData.planname == "ProfessionalPlan" ? <h3 className="current-plan"> Downgrade </h3> :
                                  customerData.planname == "StandardPlanAnnual" ? <h3 className="current-plan"> Upgrade </h3> :
                                  customerData.planname == "PlusPlanAnnual" ? <h3 className="current-plan"> Downgrade </h3> :
                                  customerData.planname == "ProfessionalPlanAnnual" ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? <h3 className="current-plan"> Downgrade </h3> : <h3 className="current-plan"> Current Plan </h3>
                                }
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des"> 
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>($28/macro)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(50 on every 30 days of active subscription)</span> </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "PlusPlan") {
																		return (
																			<p className="text-center">
																				<span className="amount">${plan.price / 100}</span> 
																				<span className="month">/month</span>
																			</p>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</a>
													<a
														onClick={customerData.subscriptionstatus == "Trial" ? (
															() => {
																setFlag(2);
																handleShow();
															}
														) :	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") || (customerData.planname == "ProfessionalPlan") || myInfo.ischilduser ? (
															""
														) : (customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
															() => {
																BuyNewPlan(2);
															}
														) : (
															() => {
																setFlag(2);
																handleShow();
															}
														)}
														onMouseOver={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
													>
														<div className="most-popular-plan-title">
															<h4> MOST POPULAR </h4>
														</div>
														<div className={active.two ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PRO
																	<br />
																	PLAN	
																</h4>
																{
                                  customerData.subscriptionstatus == "Trial" ? <h3 className="current-plan"> Upgrade </h3> :
                                  (customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Monthly") ? <h3 className="current-plan"> Current Plan </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Annual") ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? <h3 className="current-plan"> Downgrade </h3> :
                                  (customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? <h3 className="current-plan"> Buy </h3> :
                                  customerData.planname == "StandardPlan" ? <h3 className="current-plan"> Upgrade </h3> :
                                  customerData.planname == "PlusPlan" ? <h3 className="current-plan"> Upgrade </h3> :
                                  customerData.planname == "StandardPlanAnnual" ? <h3 className="current-plan"> Upgrade </h3> :
                                  customerData.planname == "PlusPlanAnnual" ? <h3 className="current-plan"> Upgrade </h3> :
                                  customerData.planname == "ProfessionalPlanAnnual" ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? <h3 className="current-plan"> Downgrade </h3> : <h3 className="current-plan"> Current Plan </h3>
                                }
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(100/seat on every 30 days of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																	<br />
																	<span> Trial Period <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Get a 99% discount off the first month (automatically applied to all seats at checkout))</span> </span>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "ProfessionalPlan") {
																		return (
																			<>
																				<p className="text-center">
																					<span className="amount">${plan.price / 100}</span> 
																					<span className="month">/month</span>
																					<span className="month">/seat</span>
																				</p>
																				<div className="preferred">
																					<span>PREFERRED PLAN OF</span>
																				</div>
																				<div className="preferred_plan">
																					<img src={rr} />
																					<img src={rain} />
																				</div>
																			</>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</a>
													<a
														onMouseOver={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
													>
														<div className={active.three ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	ENTERPRISE
																	<br />
																	PLAN	
																</h4>
																{customerData.planname == "EnterprisePlan" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? (
																	<h3 className="current-plan"> Current Plan </h3>
																) : (
																	""
																)}
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(100/seat on every 30 days of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive5">
																				Get the full suite of Actionable Alerts in every estimate, regardless of the Profile you are writing in. Leverage the Actionable Alerts you love in program work, carrier specific profiles, the default carrier and contractor profiles, and other custom profiles.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> <b>Actionable Profile Alerts At The Instance Level</b> - Get Your Alerts Wherever You Estimate! </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive6">
																				Work one-on-one with the an Actionable Insights team member to develop customized alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Custom Alerts </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{customerData.planname == "EnterprisePlan" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? (
																	""
																) : (
																	<div className="contact-us">
																		<Link to="/request-a-quote">
																			<button className="btn">
																				Contact Us
																				<br />
																				For A Quote
																			</button>
																		</Link>
																	</div>
																)}
																<div className="preferred">
																	<span>PREFERRED PLAN OF</span>
																</div>
																<div className="preferred_plan">
																	<img src={ati} />
																</div>
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</a>
												</>
											)}
										</div>
									)}
									{activePlans.Annual && (
										<div className="Matrix_Responsive">
											{localStorage.getItem("tokenCustomer") == null ? (
												<>
													<Link
														to="/get-started"
														onMouseOver={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
													>
														<div className={active.one ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PLUS
																	<br />
																	PLAN	
																</h4>
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des"> 
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>($28/macro)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(600 for every year of active subscription)</span> </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "PlusPlanAnnual") {
																		return (
																			<p className="text-center">
																				<div className="outer">
																					<span className="inner">${plan.price / 1000}</span>
																				</div>
																				<span className="amount">${((plan.price / 100) / 12).toFixed(2)}</span> 
																				<span className="month">/month</span>
																				<div className="annually">
																					Billed as ${plan.price / 100} annually
																				</div>
																			</p>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</Link>
													<Link
														to="/get-started"
														onMouseOver={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
													>
														<div className="most-popular-plan-title">
															<h4> MOST POPULAR </h4>
														</div>
														<div className={active.two ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PRO
																	<br />
																	PLAN	
																</h4>
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1200/seat for every year of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "ProfessionalPlanAnnual") {
																		return (
																			<>
																				<p className="text-center">
																					<div className="outer">
																						<span className="inner">${plan.price / 1000}</span>
																					</div>
																					<span className="amount">${((plan.price / 100) / 12).toFixed(2)}</span> 
																					<span className="month">/month</span>
																					<span className="month">/seat</span>
																					<div className="annually">
																						Billed as ${plan.price / 100} annually
																					</div>
																				</p>
																				<div className="preferred">
																					<span>PREFERRED PLAN OF</span>
																				</div>
																				<div className="preferred_plan">
																					<img src={rr} />
																					<img src={rain} />
																				</div>
																			</>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</Link>
													<Link
														to="/get-started"
														onMouseOver={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
													>
														<div className={active.three ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	ENTERPRISE
																	<br />
																	PLAN	
																</h4>
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1200/seat for every year of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive5">
																				Get the full suite of Actionable Alerts in every estimate, regardless of the Profile you are writing in. Leverage the Actionable Alerts you love in program work, carrier specific profiles, the default carrier and contractor profiles, and other custom profiles.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> <b>Actionable Profile Alerts At The Instance Level</b> - Get Your Alerts Wherever You Estimate! </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive6">
																				Work one-on-one with the an Actionable Insights team member to develop customized alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Custom Alerts </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																<div className="contact-us">
																	<Link to="/request-a-quote">
																		<button className="btn">
																			Contact Us
																			<br />
																			For A Quote
																		</button>
																	</Link>
																</div>
																<div className="preferred">
																	<span>PREFERRED PLAN OF</span>
																</div>
																<div className="preferred_plan">
																	<img src={ati} />
																</div>
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</Link>
												</>
											) : (
												<>
													<a
														onClick={customerData.subscriptionstatus == "Trial" ? (
															() => {
																setFlag(5);
																handleShow();
															}
														) :	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") || (customerData.planname == "PlusPlanAnnual") || myInfo.ischilduser ? (
															""
														) : (customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
															() => {
																BuyNewPlan(5);
															}
														) : (
															() => {
																setFlag(5);
																handleShow();
															}
														)}
														onMouseOver={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: true,
															two: false,
															three: false,
														})}
													>
														<div className={active.one ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PLUS
																	<br />
																	PLAN	
																</h4>
																{
																	customerData.subscriptionstatus == "Trial" ? <h3 className="current-plan"> Upgrade </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && myInfo.ischilduser ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? <h3 className="current-plan"> Buy </h3> :
																	customerData.planname == "StandardPlan" ? <h3 className="current-plan"> Upgrade </h3> :
																	customerData.planname == "PlusPlan" ? <h3 className="current-plan"> Upgrade </h3> :
																	customerData.planname == "ProfessionalPlan" ? <h3 className="current-plan"> Downgrade </h3> :
																	customerData.planname == "StandardPlanAnnual" ? <h3 className="current-plan"> Upgrade </h3> :
																	customerData.planname == "ProfessionalPlanAnnual" ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? <h3 className="current-plan"> Downgrade </h3> : <h3 className="current-plan"> Current Plan </h3>
																}
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des"> 
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>($28/macro)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(600 for every year of active subscription)</span> </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "PlusPlanAnnual") {
																		return (
																			<p className="text-center">
																				<div className="outer">
																					<span className="inner">${plan.price / 1000}</span>
																				</div>
																				<span className="amount">${((plan.price / 100) / 12).toFixed(2)}</span> 
																				<span className="month">/month</span>
																				<div className="annually">
																					Billed as ${plan.price / 100} annually
																				</div>
																			</p>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</a>
													<a
														onClick={customerData.subscriptionstatus == "Trial" ? (
															() => {
																setFlag(6);
																handleShow();
															}
														) :	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") || (customerData.planname == "ProfessionalPlanAnnual") || myInfo.ischilduser ? (
															""
														) : (customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "NoActivePlan") ? (
															() => {
																BuyNewPlan(6);
															}
														) : (
															() => {
																setFlag(6);
																handleShow();
															}
														)}
														onMouseOver={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: true,
															three: false,
														})}
													>
														<div className="most-popular-plan-title">
															<h4> MOST POPULAR </h4>
														</div>
														<div className={active.two ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	PRO
																	<br />
																	PLAN	
																</h4>
																{
																	customerData.subscriptionstatus == "Trial" ? <h3 className="current-plan"> Upgrade </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Annual") ? <h3 className="current-plan"> Current Plan </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Pro Plan Monthly") ? <h3 className="current-plan"> Upgrade </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Monthly") ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") && (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? <h3 className="current-plan"> Downgrade </h3> :
																	(customerData.subscriptionstatus == "NoActivePlan" || customerData.subscriptionstatus == "Cancelled" || customerData.subscriptionstatus == "TrialCancelled") ? <h3 className="current-plan"> Buy </h3> :
																	customerData.planname == "ProfessionalPlanAnnual" ? <h3 className="current-plan"> Current Plan </h3> :
																	(customerData.planname == "EnterprisePlan" || customerData.planname == "EnterprisePlanAnnual") ? <h3 className="current-plan"> Downgrade </h3> : <h3 className="current-plan"> Upgrade </h3>
																}
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1200/seat for every year of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{data.map((plan) => {
																	if (plan.name === "ProfessionalPlanAnnual") {
																		return (
																			<>
																				<p className="text-center">
																					<div className="outer">
																						<span className="inner">${plan.price / 1000}</span>
																					</div>
																					<span className="amount">${((plan.price / 100) / 12).toFixed(2)}</span> 
																					<span className="month">/month</span>
																					<span className="month">/seat</span>
																					<div className="annually">
																						Billed as ${plan.price / 100} annually
																					</div>
																				</p>
																				<div className="preferred">
																					<span>PREFERRED PLAN OF</span>
																				</div>
																				<div className="preferred_plan">
																					<img src={rr} />
																					<img src={rain} />
																				</div>
																			</>
																		);
																	}
																})}
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</a>
													<a
														onMouseOver={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
														onMouseOut={() => setActive({
															one: false,
															two: false,
															three: true,
														})}
													>
														<div className={active.three ? "sub-plan wcm_active" : "sub-plan"}>
															<div 
																className="cp_p_col_2"
																style={{
																	backgroundColor: "#d0cece",
																	textAlign: "center",
																	padding: "20px",
																}}
															>
																<h4 className="cp_p_p"> 
																	ENTERPRISE
																	<br />
																	PLAN	
																</h4>
																{customerData.planname == "EnterprisePlanAnnual" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? (
																	<h3 className="current-plan"> Current Plan </h3>
																) : (
																	""
																)}
															</div>
															<div className="cp_p_col_8">
																<p className="cp_p_p plan_matrix_des">
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				3700+ pages of mitigation and repair Xactimate invoicing templates.{" "}
																				<Link
																					to="/insight-sheets"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Insight Sheet Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Commonly Overlooked Line Item Database: Database of often warranted but overlooked line items.
																				200+ line items that you will never miss again!{" "}
																				<Link
																					to="commonly-overlooked-line-items"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Commonly Overlooked Line Item Database</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				100+ Xactimate Macros that help you estimate efficiently.
																				All Macros include relevant line items and F9 notes.{" "}
																				<Link
																					to="/macros"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Ability to Purchase <b>Actionable Macros</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(Included in Actionable Xactimate Profile)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive3">
																				Premium swag designed for use in the toughest claims environments. Only available within the continental United States.{" "}
																				<Link
																					to="/swag"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Swag</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1 x Socks & Belt/seat)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Digital currency that can be used to purchase tools and resources.{" "}
																				<Link
																					to="/my-account/points"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Free <b>Insighter Points</b> <span style={{ color: "#38ADA2", fontWeight: 500 }}>(1200/seat for every year of active subscription)</span> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive4">
																				Utilize your provided monthly Insighter Points to unlock unlimited Actionable Profile and Xact Best Practices Bootcamps for your team. This two-day comprehensive course aims to transform attendees into experts in Xactimate best practices and the Actionable Xactimate Profile.{" "}
																				<Link
																					to="/events"
																					target="_blank"
																				>
																					Learn more HERE
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Unlimited <b>Xactimate Training</b> </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive2">
																				Elevate your Xactimate profile.
																				Industry standard profile settings that help create accurate estimates that can be approved without hesitation.{" "}
																				<Link
																					to="/actionable-xactimate-profile"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<b>Actionable Xactimate Profile w/ all Actionable Macros</b>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive">
																				Manage your company/co-workers with ease, all under the same account.{" "}
																				<a
																					href="https://value.getinsights.org/enterprise-benefits"
																					target="_blank"
																				>
																					Learn More
																				</a>
																			</Tooltip>
																		)}
																	>
																		<span> Enterprise-Level Account Administration </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive5">
																				Get the full suite of Actionable Alerts in every estimate, regardless of the Profile you are writing in. Leverage the Actionable Alerts you love in program work, carrier specific profiles, the default carrier and contractor profiles, and other custom profiles.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> <b>Actionable Profile Alerts At The Instance Level</b> - Get Your Alerts Wherever You Estimate! </span>
																	</OverlayTrigger>
																	<br />
																	<OverlayTrigger
																		placement="bottom"
																		delay={{ show: 250, hide: 1500 }}
																		overlay={(
																			<Tooltip id="planmatrix-tooltip-responsive6">
																				Work one-on-one with the an Actionable Insights team member to develop customized alerts for your company. Build exactly what your team needs to write more accurate and transparent estimates, all while customizing them to your specific workflow and regional building methodology.{" "}
																				<Link
																					to="/advance-the-cause/actionable-profile-alert-request"
																					target="_blank"
																				>
																					Learn More
																				</Link>
																			</Tooltip>
																		)}
																	>
																		<span> Custom Alerts </span>
																	</OverlayTrigger>
																</p>
															</div>
															<div className="cp_p_col_2">
																{customerData.planname == "EnterprisePlanAnnual" || (myInfo.parentinfo && myInfo.parentinfo.planName === "Enterprise Plan Annual") ? (
																	""
																) : (
																	<div className="contact-us">
																		<Link to="/request-a-quote">
																			<button className="btn">
																				Contact Us
																				<br />
																				For A Quote
																			</button>
																		</Link>
																	</div>
																)}
																<div className="preferred">
																	<span>PREFERRED PLAN OF</span>
																</div>
																<div className="preferred_plan">
																	<img src={ati} />
																</div>
															</div>
															<div className="check_icon">
																<i className="fa fa-check"></i>
															</div>
														</div>
													</a>
												</>
											)}
										</div>
									)}
								</>
							)}
							{loading && (
								<div className="loader-inner">
									<LottieLoader />
								</div>
							)}
							<div className="Request-a-call">
								<div className="row">
									<div className="col-xl-9 col-lg-8 col-md-12">
										<h1> Want to learn more about which plan works best for you? Set up a call here: </h1>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-12">
										<Link
											className="btn"
											to="/demo"
										>
											Request A Call
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="Worry-free-sign-up">
					<h1> Worry-free sign up </h1>
					<div className="row">
						<div className="Worry-free-sign-up-seections">
							<h5> Start off strong </h5>
							<p> Leverage every tool and resource to its fullest potential with a personalized rundown on your new subscription with a member of the Actionable Insights team. </p>
						</div>
						<div className="Worry-free-sign-up-seections">
							<h5> No hidden costs </h5>
							<p> We are upfront with every tool/resource and the associated costs. You won’t be receiving any supplements from our team. </p>
						</div>
						<div className="Worry-free-sign-up-seections">
							<h5> Cancel anytime </h5>
							<p> You are in the driver’s seat. You can quickly cancel or switch plans as your team’s needs change. </p>
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

export default PlanMatrix;