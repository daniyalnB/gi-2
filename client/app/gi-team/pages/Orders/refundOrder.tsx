import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import CurrencyInput from "react-currency-input";
import InputMask from "react-input-mask";
import history from "../../../../utils/history";
import { 
	GetAllOrders,
	refundOrderOrSubscriptionAmount,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import alert from "assets/Alert.svg";

const FormElement = (props) => {

  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const refundOrder = () => {
    setLoading(true);

    const payload = {
			orderId: props.refundDetails.orderId,
			subscriptionReceiptId: 0,
			reason: props.refundDetails.notes,
			amount: props.refundDetails.price / 100,
		};

    const stringified = queryString.stringify(payload);

    refundOrderOrSubscriptionAmount(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
				history.push("/gi-team/orders");
      }
      else {
        setErr(response.response.Message);
        setLoading(false);
      }
    });
  };

	const close = () => {
    props.handlecardclose();
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p> Are you sure you want to make this refund of <span style={{ color: "#db422d" }}>${props.refundDetails.price / 100}</span>? </p>
        </div>
      </div>
      {Err ? (
        <>
          <div className="text-center">
            <i 
              style={{
                color: "#DB422D",
                fontSize: "18px"
              }}>
              <small>
                {Err}
              </small>
            </i>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="modal-save">
        <button 
          className="btn" 
          onClick={close}
        >
          <span> Cancel </span>
        </button>
        {!loading && ( 
          <button 
            className="btn"
            style={{ marginLeft: "15px" }}
            onClick={refundOrder}
          >
            <span> Refund </span>
          </button>
        )}
        {loading && (
          <button 
            disabled
            className="btn"
            style={{ marginLeft: "15px" }}
          >
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        )}
      </div>
    </>
  );
};

const RefundOrder = (props) => {

	const [loadingData, setLoadingData] = useState(true);

	const [userInfo, setUserInfo] = useState({
		firstname: "",
		lastname: "",
		email: "",
		address: "",
		phone: "",
		companyname: "",
	});

	const [refundDetails, setRefundDetails]= useState({
		orderId: "",
		purchaseType: "",
		price: 0,
		notes: "",
	});

	useEffect(() => {
		GetAllOrders().subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data.filter(
					(order) => order.ordernumber === parseInt(props.match.params.ordernumber)
				)[0];
				if (x == undefined) {
					history.push("/gi-team/orders");
				}
				let name = x.customerownername.split(" ");
				let firstName = name[0];
				let lastName = name[1];
				const info = ({
          firstname: x.contactinformationfororder.firstname ? x.contactinformationfororder.firstname : firstName,
          lastname: x.contactinformationfororder.lastname ? x.contactinformationfororder.lastname : lastName,
					email: x.customerowneremail,
					address: x.contactinformationfororder.streetaddress,
					phone: x.customerownerphone,
					companyname: x.contactinformationfororder.companyname,
				});
				setUserInfo(info);
				setRefundDetails({
					...refundDetails,
					orderId: x.ordernumber,
					purchaseType: x.catagory,
					price: x.pricepaidincents,
				});
				setPriceLimit(x.pricepaidincents);
				setLoadingData(false);
			} else {
				alert("error");
			}
		});
	}, []);

	const [priceLimit, setPriceLimit]= useState(0);
	const [priceError, setPriceError] = useState(false);

	function checkPrice (p) {
		if (p > priceLimit) {
			setPriceError(true);
		} else {
			setPriceError(false);
		}
	};

	const [priceValueError, setPriceValueError] = useState(false);

	function checkPriceValue (val) {
		if (val >= 100) {
			setPriceValueError(false);
		} else {
			setPriceValueError(true);
		}
	};

	const [isFloat, setIsFloat] = useState();

  const handleChange = (e) => {
		const value = isFloatNumber(e);
    setIsFloat(value);
  };

	const isFloatNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value) && value.toString().includes('.');
  };

	const handleSubmit = (e) => {
    e.preventDefault();
		handlecardshow();
  };

	const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

	return (
		<>
			<Helmet>
				<title> 
					Refund Order - Actionable Insights Admin
				</title>
			</Helmet>
			<Modal 
        show={cardpopupshow} 
        onHide={handlecardclose}
				backdrop="static" 
        keyboard={false}
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <img src={alert} />
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElement
            handlecardclose={handlecardclose}
            refundDetails={refundDetails}
          ></FormElement>
        </Modal.Body>
      </Modal>
			<div className="createInsightSheet">
				<div className="container-fluid">
					<div className="row">
						<div className="col-3">
							<ScrollToTop />
							<SideMenu />
						</div>
						<div className="col-9">
							<div className="row">
								<UserTab />
							</div>
							<div className="createInsightSheet-section">
								<div className="row header">
									<div className="col-9">
										<h3 className="heading">
											Refund
										</h3>
									</div>
									<div className="col-3 text-right back">
										<Link
											className="bk"
											to="/gi-team/orders"
										>
											<img src={back} className=""/>
											Back
										</Link>
									</div>
								</div>
								<hr />
								{!loadingData && (
									<>
										<form onSubmit={handleSubmit} id="form">
											<div className="row info">
												<h3> User Information </h3>
											</div>
											<div className="info-data">
												<div className="form-holder">
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="form-group nogroup">
																<input 
																	type="text" 
																	name="firstname"  
																	id="inputField1" 
																	className="input-area"
																	required
																	value={userInfo.firstname}
																	onChange={(e) =>
																		setUserInfo({
																			...userInfo,
																			firstname: e.currentTarget.value,
																		})
																	}
																/>
																<label htmlFor="inputField1" className="floating_label"> First Name </label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="form-group nogroup">
																<input 
																	type="text" 
																	name="lastname"  
																	id="inputField2" 
																	className="input-area"
																	required
																	value={userInfo.lastname}
																	onChange={(e) =>
																		setUserInfo({
																			...userInfo,
																			lastname: e.currentTarget.value,
																		})
																	}
																/>
																<label htmlFor="inputField2" className="floating_label"> Last Name </label>
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="email"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={userInfo.email}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Email
																</label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="address"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={userInfo.address}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Address
																</label>
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="form-group nogroup">
																<InputMask
																	mask="999-999-9999"
																	value={userInfo.phone}
																	onChange={(e) =>
																		setUserInfo({
																			...userInfo,
																			phone: e.currentTarget.value,
																		})
																	}
																>
																	{(inputProps) => (
																		<input
																			type="text"
																			name="phone"
																			id="inputField3"
																			className="input-area"
																			{...inputProps}
																		/>
																	)}
																</InputMask>
																<label htmlFor="inputField3" className="floating_label"> Phone </label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="companyname"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={userInfo.companyname}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Company
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row info">
												<h3> Refund Details </h3>
											</div>
											<div className="info-data">
												<div className="form-holder">
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="purchaseType"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={refundDetails.purchaseType}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Purchase Type
																</label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="form-group nogroup">
																<CurrencyInput
																	thousandSeparator=","
																	value={refundDetails.price / 100}
																	name="Price"
																	id="inputField4"
																	className="input-area"
																	onChange={(e, maskedvalue) => {
																		setRefundDetails({
																			...refundDetails,
																			price: parseInt((maskedvalue * 100)),
																		});
																		checkPrice(parseInt((maskedvalue * 100)));
																		checkPriceValue(parseInt((maskedvalue * 100)));
																		handleChange(maskedvalue);
																	}}
																/>
																<label htmlFor="inputField4" className="floating_label"> Price </label>
															</div>
															{isFloat ? (
																<div
																	style={{
																		color: "#db422d",
																		marginBottom: "20px",
																		marginTop: "-10px",
																		fontSize: "12px",
																		fontWeight: 600,
																		padding: "0px 4px",
																	}}
																> 
																	Please enter a whole number, decimal values are not accepted
																</div>
															) : (
																<>
																	{priceError && (
																		<div
																			style={{
																				color: "#db422d",
																				marginBottom: "20px",
																				marginTop: "-10px",
																				fontSize: "12px",
																				fontWeight: 600,
																				padding: "0px 4px",
																			}}
																		> 
																			Price must be less than or equal to ${priceLimit / 100} usd
																		</div>
																	)}
																	{priceValueError && (
																		<div
																			style={{
																				color: "#db422d",
																				marginBottom: "20px",
																				marginTop: "-10px",
																				fontSize: "12px",
																				fontWeight: 600,
																				padding: "0px 4px",
																			}}
																		> 
																			The amount must be greater than $1
																		</div>
																	)}
																</>
															)}
														</div>
													</div>
													<div className="row">
														<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
															<div className="form-group nogroup">
																<textarea
																	name="notes"
																	required
																	id="textField1"
																	className="input-area"
																	onChange={(e) =>
																		setRefundDetails({
																			...refundDetails,
																			notes: e.currentTarget.value,
																		})
																	}
																/>  
																<label htmlFor="textField1" className="floating_label"> Notes </label>
															</div>
														</div>
													</div>
												</div>
											</div>
											<hr className="second-hr" />
											<div className="Buttons">
												<div className="row">
													<button 
														className="btn" 
														type="submit"
														disabled={localStorage.getItem("role") == "Analyst" ? true : isFloat ? true : priceError ? true : priceValueError ? true : false}
													> 
														<span> Refund </span>
													</button>																				
												</div>
											</div>
											{localStorage.getItem("role") == "Analyst" && (
												<div
													style={{
														padding: "0px 20px 20px 20px",
														textAlign: "center",
													}}
												>
													<div 
														className="form-group alert alert-danger"
														style={{ 
															margin: "0px",
															width: "270px",
														}}
													>
														You need to be an Admin or Editor to Refund
													</div>
												</div> 
											)}
										</form>
									</>
								)}
								{loadingData && (
									<div className="loader-inner">
										<LottieLoader />
									</div>
								)}
							</div>
						</div> 
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(RefundOrder);