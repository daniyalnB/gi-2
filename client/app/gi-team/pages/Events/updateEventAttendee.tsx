import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { Modal } from "react-bootstrap";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import CurrencyInput from "react-currency-input";
import InputMask from "react-input-mask";
import moment from "moment";
import history from "../../../../utils/history";
import {
  GetAllEvents,
	GetEventDetails,
	UpdateEventAttendeeInformation,
  StudentTicketTransfer,
  ShiftEventTicket,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";
import modalclose from "assets/modal-close.svg";
import alert from "assets/tick2.svg";

const FormElementSuccess = (props) => {

  const closeModal = () => {
    history.push("/gi-team/events");
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <p>
            Ticket Transfer Completed
          </p>
        </div>
      </div>
      <div className="modal-save">
        <button 
          className="btn"
          style={{ width: "150px" }}
          onClick={closeModal}
        >
          <span> View Events </span>
        </button>
      </div>
    </>
  );
};

const FormElementSTSTT = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      id: props.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    const stringified = queryString.stringify(payload);

    StudentTicketTransfer(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        props.handlecardclose();
        props.handlecardshowsuccess();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="firstName" 
                required 
                id="inputField1" 
                className="input-area"
                value={data.firstName}
                onChange={(e) =>
                  setData({
                    ...data,
                    firstName: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField1" className="floating_label"> First Name </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group nogroup">
              <input 
                type="text"
                name="lastName" 
                required 
                id="inputField2" 
                className="input-area"
                value={data.lastName}
                onChange={(e) =>
                  setData({
                    ...data,
                    lastName: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField2" className="floating_label"> Last Name </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group nogroup">
              <input 
                type="email"
                name="lastName" 
                required 
                id="inputField3" 
                className="input-area"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="inputField3" className="floating_label"> Email </label>
            </div>
          </div>
        </div>
        <div className="modal-save">
          {!loading &&
            <button 
              type="submit" 
              className="btn"
            >
              <span> Transfer </span>
            </button>
          }
          {loading &&
            <button className="btn" disabled> 
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          }
        </div>
        {error ? (
          <div style={{ margin: "20px auto 0px", textAlign: "center" }}>
            <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
              {error}
            </span>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

const FormElementSTTAE = (props) => {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [event, setEvent] = useState(false);

  const [eventData, setEventData] = useState({
    id: "",
    name: "",
  });
  
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      orderId: props.orderId,
      eventId: eventData.id,
    };

    const stringified = queryString.stringify(payload);

    ShiftEventTicket(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setError(false);
        props.handlecardclose();
        props.handlecardshowsuccess();
      } else {
        setLoading(false);
        setError(response.response.Message);
      }
    });
  };
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row m-0">
          <div className="col-12 p-0">
            <div className="form-group nogroup">
              <input
                onClick={(e) => setEvent(!event)}
                value={eventData.name}
                type="text"
                name="event"
                required
                id="inputField1"
                className="input-area"
                style={{ 
                  color: "transparent",
                  textShadow: "0 0 0 #000",
                  cursor: "pointer",
                  padding: "10px 35px 10px 10px",
                }}
              />
              <label
                htmlFor="inputField1"
                className="floating_label"
                style={{ left: "15px" }}
              >
                Select Event
              </label>
              <label className="file_input_label">
                {event ? (
                  <img
                    className="select size"
                    src={up}
                    onClick={(e) => setEvent(!event)}
                  />
                ) : (
                  <img
                    className="select size"
                    src={down}
                    onClick={(e) => setEvent(!event)}
                  />
                )}
              </label>
              <div className={event ? "active" : "dropdown-content"}>
                {props.events.map((val, key) => {
                  return (
                    <div key={key}>
                      <h3
                        onClick={(e) => {
                          setEvent(!event);
                          setEventData(val);
                          setEventData({
                            ...eventData,
                            id: val.id,
                            name: e.currentTarget.innerHTML,
                          });
                        }}
                      >
                        {val.title} -{" "}
                        {
                          `${moment(val.startdatetime).format("yyyy-MM-DD")}` == `${moment(val.enddatetime).format("yyyy-MM-DD")}`
                        ? 
                          <>
                            {moment(val.startdatetime).format("MMMM Do, YYYY h:mm a")} - {moment(val.enddatetime).format("h:mm a")}
                          </>  
                        : 
                          <>
                            {moment(val.startdatetime).format("MMMM Do, YYYY")} - {moment(val.enddatetime).format("MMMM Do, YYYY")}
                          </>
                        }
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-save">
          {!loading &&
            <button 
              type="submit" 
              className="btn"
              
            >
              <span> Transfer </span>
            </button>
          }
          {loading &&
            <button className="btn" disabled> 
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          }
        </div>
        {error ? (
          <div style={{ margin: "20px auto 0px", textAlign: "center" }}>
            <span style={{ color: "#DB422D", fontWeight: "bold" }}> 
              {error}
            </span>
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

const UpdateEventAttendee = (props) => {

	const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [events, setEvents] = useState([]);

	const [eventAttendeeInformation, setEventAttendeeInformation]= useState({
    address: "",
    attendance: "",
    company: "",
    dayOne: "",
    dayTwO: "",
    email: "",
    eventName: "",
    firstName: "",
    id: "",
    lastName: "",
    notes: "",
    orderId: "",
    phone: "",
    price: "",
    providedAp: "",
    socks: "",
    welcomeEmail: "",
  });

  const [providedAp, setProvidedAp] = useState(false);
  const [welcomeEmail, setWelcomeEmail] = useState(false);
  const [day1, setDay1] = useState(false);
  const [day2, setDay2] = useState(false);

  useEffect(() => {
    if (props.location.state) {
      GetEventDetails(props.location.state.eventId).subscribe((response) => {
        if (response.response.Requested_Action) {
          const x = response.response.data.filter(
            (event) => event.id === parseInt(props.match.params.id)
          )[0];
          if (x == undefined) {
            history.push("/gi-team/events");
          }
          setEventAttendeeInformation({
            ...x,
            dayOne: x.dayOne ? "Yes" : "No",
            dayTwO: x.dayTwo ? "Yes" : "No",
            providedAp: x.providedAp ? "Yes" : "No",
            welcomeEmail: x.welcomeEmail ? "Yes" : "No",
          });
          GetAllEvents().subscribe((response) => {
            if (response.response.Requested_Action) {
              const y = response.response.data;
              setEvents(y);
            }
          });
          setLoadingData(false);
        } else {
          history.push("/gi-team/events");
        }
      });
    } else {
      history.push("/gi-team/events");
    }
  }, []);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const publishedEvents = events.filter((val) => val.draft === false);

  const sortedEvents = publishedEvents.sort((a, b) => moment(a.startdatetime).format("YYYYMMDD") - moment(b.startdatetime).format("YYYYMMDD"));

  const latestEvents = sortedEvents.filter(
    (x) => moment(x.enddatetime).format("yyyy-MM-DD") >= date
  );

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      const payload = {
        id: eventAttendeeInformation.id,
        address: eventAttendeeInformation.address,
        phone: eventAttendeeInformation.phone,
        socks: eventAttendeeInformation.socks,
        providedAp: eventAttendeeInformation.providedAp,
        welcomeEmail: eventAttendeeInformation.welcomeEmail,
        dayOne: eventAttendeeInformation.dayOne,
        dayTwO: eventAttendeeInformation.dayTwO,
        notes: eventAttendeeInformation.notes,
      };

      const stringified = queryString.stringify(payload);

      UpdateEventAttendeeInformation(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push(`/gi-team/event-attendees/${props.location.state.eventId}`);
        } else  {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }, 1000);
  };

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

  const [cardpopupshow1, setcardpopupshow1] = useState(false);
  const handlecardclose1 = () => setcardpopupshow1(false);
  const handlecardshow1 = () => setcardpopupshow1(true);

  const [cardpopupshowsuccess, setcardpopupshowsuccess] = useState(false);
  const handlecardclosesuccess = () => setcardpopupshowsuccess(false);
  const handlecardshowsuccess = () => setcardpopupshowsuccess(true);

	return (
		<>
			<Helmet>
				<title> 
					Update Event Attendee - Actionable Insights Admin
				</title>
			</Helmet>
      <Modal 
        show={cardpopupshowsuccess} 
        onHide={handlecardclosesuccess}
        backdrop="static"
        keyboard={false}
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <div className="modal-title h4"> 
            <img src={alert} />
          </div>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementSuccess
            handlecardclose={handlecardclosesuccess}
          ></FormElementSuccess>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow} 
        onHide={handlecardclose} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div className="add_delete_points modal-title h4"> 
            Student to Student Ticket Transfer
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementSTSTT
            handlecardclose={handlecardclose}
            id={eventAttendeeInformation.id}
            handlecardshowsuccess={handlecardshowsuccess}
          ></FormElementSTSTT>
        </Modal.Body>
      </Modal>
      <Modal 
        show={cardpopupshow1} 
        onHide={handlecardclose1} 
        backdrop="static" 
        keyboard={false} 
        className="Add_Delete_Points_Modal"
      >
        <Modal.Header>
          <div className="add_delete_points modal-title h4"> 
            Shift Ticket to Alternate Event
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handlecardclose1}
          >
            <img 
              src={modalclose}
            />
          </button>
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElementSTTAE
            handlecardclose={handlecardclose1}
            events={latestEvents}
            orderId={eventAttendeeInformation.orderId}
            handlecardshowsuccess={handlecardshowsuccess}
          ></FormElementSTTAE>
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
									<div className="col-3">
										<h3 className="heading">
											Attendee Details
										</h3>
									</div>
									<div className="col-9 text-right back">
										{!loadingData && (
                      <>
                        <Link
                          className="bk"
                          to={`/gi-team/event-attendees/${props.location.state.eventId}`}
                        >
                          <img src={back} className=""/>
                          Back
                        </Link>
                        <div className="user-details-buttons">
                          <button
                            className="btn"
                            onClick={handlecardshow}
                          >
                            <span> Student to Student Ticket Transfer </span>
                          </button>
                          <button
                            className="btn cp"
                            onClick={handlecardshow1}
                          >
                            <span> Shift Ticket to Alternate Event </span>
                          </button>
                        </div>
                      </>
                    )}
									</div>
								</div>
								<hr />
								{!loadingData && (
									<>
										<form onSubmit={handleSubmit} id="form">
											<div className="row info">
												<h3> Personal Information </h3>
											</div>
											<div className="info-data">
												<div className="form-holder">
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="firstName"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={eventAttendeeInformation.firstName}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	First Name
																</label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="lastName"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={eventAttendeeInformation.lastName}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Last Name
																</label>
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
																	value={eventAttendeeInformation.email}
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
																	className="upInputs-notRequired"
																	value={eventAttendeeInformation.address}
                                  style={eventAttendeeInformation.address ? { border: "1px solid #26a59a" } : { border: "1px solid #0000001a" }}
                                  onChange={(e) =>
																		setEventAttendeeInformation({
																			...eventAttendeeInformation,
																			address: e.currentTarget.value,
																		})
																	}
																/>
																<label className="upLabel">
																	Address
																</label>
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<InputMask
																	mask="999-999-9999"
																	value={eventAttendeeInformation.phone}
																	onChange={(e) =>
																		setEventAttendeeInformation({
																			...eventAttendeeInformation,
																			phone: e.currentTarget.value,
																		})
																	}
																>
																	{(inputProps) => (
																		<input
																		  type="text"
                                      name="address"
                                      placeholder=" "
                                      className="upInputs-notRequired"
                                      style={eventAttendeeInformation.phone ? { border: "1px solid #26a59a" } : { border: "1px solid #0000001a" }}
																			{...inputProps}
																		/>
																	)}
																</InputMask>
																<label className="upLabel">
																	Phone
																</label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="company"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={eventAttendeeInformation.company}
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
												<h3> Event Information </h3>
											</div>
											<div className="info-data">
												<div className="form-holder">
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="eventName"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={eventAttendeeInformation.eventName}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Event
																</label>
															</div>
														</div>
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="upInputs form-group nogroup">
                                <CurrencyInput
                                  thousandSeparator=","
                                  prefix="$ "
                                  value={(eventAttendeeInformation.price / 100)}
                                  name="price"
                                  placeholder=" "
																	required
                                  readOnly={true}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
                                />
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Price
																</label>
															</div>
														</div>
													</div>
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="upInputs form-group nogroup">
																<input 
																	type="text"
																	name="attendance"
																	placeholder=" "
																	required
																	readOnly={true}
																	value={eventAttendeeInformation.attendance}
																	style={{
																		color: "#919194",
																		border: "1px solid #0000001a",
																	}}
																/>
																<label
																	className="upLabel"
																	style={{ color: "#919194" }}
																>
																	Attendance
																</label>
															</div>
														</div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-group nogroup">
                                <input 
                                  type="number"
                                  min="0"
                                  name="duration" 
                                  required 
                                  id="inputField3" 
                                  className="input-area"
                                  value={eventAttendeeInformation.socks}
                                  onChange={(e) =>
                                    setEventAttendeeInformation({
                                      ...eventAttendeeInformation,
                                      socks: e.currentTarget.value,
                                    })
                                  }
                                />
                                <label htmlFor="inputField3" className="floating_label"> Socks </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-group nogroup">
                                <input 
                                  onClick={(e) => setProvidedAp(!providedAp)} 
                                  value={eventAttendeeInformation.providedAp} 
                                  type="text" 
                                  name="providedAp" 
                                  required 
                                  id="inputField4" 
                                  className="input-area"
                                  style={{ 
                                    color: "transparent",
                                    textShadow: "0 0 0 #000",
                                    cursor: "pointer",
                                  }}
                                />
                                <label htmlFor="inputField4" className="floating_label"> Provided AP </label>
                                <label className="file_input_label">
                                  {providedAp ?
                                    <img 
                                      className="select size"
                                      src={up} 
                                      onClick={() => setProvidedAp(!providedAp)}
                                    />
                                  :
                                    <img 
                                      className="select size"
                                      src={down} 
                                      onClick={() => setProvidedAp(!providedAp)}
                                    />
                                  }
                                </label>
                                <div className={providedAp ? "active" : "dropdown-content"} style={{ height: "80px" }}>
                                  <h3 
                                    onClick={(e) => {
                                      setProvidedAp(!providedAp);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        providedAp: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    Yes 
                                  </h3>
                                  <h3 
                                    onClick={(e) => {
                                      setProvidedAp(!providedAp);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        providedAp: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    No 
                                  </h3> 
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-group nogroup">
                                <input 
                                  onClick={(e) => setWelcomeEmail(!welcomeEmail)} 
                                  value={eventAttendeeInformation.welcomeEmail} 
                                  type="text" 
                                  name="welcomeEmail" 
                                  required 
                                  id="inputField5" 
                                  className="input-area"
                                  style={{ 
                                    color: "transparent",
                                    textShadow: "0 0 0 #000",
                                    cursor: "pointer",
                                  }}
                                />
                                <label htmlFor="inputField5" className="floating_label"> Welcome Email </label>
                                <label className="file_input_label">
                                  {welcomeEmail ?
                                    <img 
                                      className="select size"
                                      src={up} 
                                      onClick={() => setWelcomeEmail(!welcomeEmail)}
                                    />
                                  :
                                    <img 
                                      className="select size"
                                      src={down} 
                                      onClick={() => setWelcomeEmail(!welcomeEmail)}
                                    />
                                  }
                                </label>
                                <div className={welcomeEmail ? "active" : "dropdown-content"} style={{ height: "80px" }}>
                                  <h3 
                                    onClick={(e) => {
                                      setWelcomeEmail(!welcomeEmail);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        welcomeEmail: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    Yes 
                                  </h3>
                                  <h3 
                                    onClick={(e) => {
                                      setWelcomeEmail(!welcomeEmail);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        welcomeEmail: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    No 
                                  </h3> 
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-group nogroup">
                                <input 
                                  onClick={(e) => setDay1(!day1)} 
                                  value={eventAttendeeInformation.dayOne} 
                                  type="text" 
                                  name="dayOne" 
                                  required 
                                  id="inputField6" 
                                  className="input-area"
                                  style={{ 
                                    color: "transparent",
                                    textShadow: "0 0 0 #000",
                                    cursor: "pointer",
                                  }}
                                />
                                <label htmlFor="inputField6" className="floating_label"> Day 1 </label>
                                <label className="file_input_label">
                                  {day1 ?
                                    <img 
                                      className="select size"
                                      src={up} 
                                      onClick={() => setDay1(!day1)}
                                    />
                                  :
                                    <img 
                                      className="select size"
                                      src={down} 
                                      onClick={() => setDay1(!day1)}
                                    />
                                  }
                                </label>
                                <div className={day1 ? "active" : "dropdown-content"} style={{ height: "80px" }}>
                                  <h3 
                                    onClick={(e) => {
                                      setDay1(!day1);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        dayOne: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    Yes 
                                  </h3>
                                  <h3 
                                    onClick={(e) => {
                                      setDay1(!day1);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        dayOne: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    No 
                                  </h3> 
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-group nogroup">
                                <input 
                                  onClick={(e) => setDay2(!day2)} 
                                  value={eventAttendeeInformation.dayTwO} 
                                  type="text" 
                                  name="dayTwO" 
                                  required 
                                  id="inputField7" 
                                  className="input-area"
                                  style={{ 
                                    color: "transparent",
                                    textShadow: "0 0 0 #000",
                                    cursor: "pointer",
                                  }}
                                />
                                <label htmlFor="inputField7" className="floating_label"> Day 2 </label>
                                <label className="file_input_label">
                                  {day2 ?
                                    <img 
                                      className="select size"
                                      src={up} 
                                      onClick={() => setWelcomeEmail(!day2)}
                                    />
                                  :
                                    <img 
                                      className="select size"
                                      src={down} 
                                      onClick={() => setWelcomeEmail(!day2)}
                                    />
                                  }
                                </label>
                                <div className={day2 ? "active" : "dropdown-content"} style={{ height: "80px" }}>
                                  <h3 
                                    onClick={(e) => {
                                      setDay2(!day2);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        dayTwO: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    Yes 
                                  </h3>
                                  <h3 
                                    onClick={(e) => {
                                      setDay2(!day2);
                                      setEventAttendeeInformation({
                                        ...eventAttendeeInformation,
                                        dayTwO: e.currentTarget.innerHTML,
                                      });
                                    }}
                                  > 
                                    No 
                                  </h3> 
                                </div>
                              </div>
                            </div>
                          </div>
													<div className="row">
														<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                              <div className="upInputs form-group nogroup">
																<textarea
																	name="notes"
																	placeholder=" "
																	className="upInputs-notRequired"
																	value={eventAttendeeInformation.notes}
                                  style={eventAttendeeInformation.notes ?
                                    {
                                      border: "1px solid #26a59a",
                                      height: "100px",
                                    } :
                                    {
                                      border: "1px solid #0000001a",
                                      height: "100px",
                                    }
                                  }
                                  onChange={(e) =>
																		setEventAttendeeInformation({
																			...eventAttendeeInformation,
																			notes: e.currentTarget.value,
																		})
																	}
																/>
																<label className="upLabel">
																	Notes
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
											<hr className="second-hr" />
											<div className="Buttons">
												<div className="row">
                          {!loading && (
                            <button 
                              className="btn" 
                              type="submit"
                              disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                            > 
                              <span> Save </span>
                            </button>		
                          )}
                          {loading && (
                            <button className="btn" disabled>
                              <i className="fas fa-spinner fa-spin"></i>
                            </button>
                          )}															
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
														You need to be an Admin or Editor to Save
													</div>
												</div> 
											)}
                      {error ? (
                        <div
                          style={{
                            padding: "0px 20px 20px 20px",
                            textAlign: "center",
                          }}
                        >
                          <div 
                            className="form-group alert alert-danger"
                            style={{ margin: "0px" }}
                          >
                            {error}
                          </div>
                        </div> 
                      ) : (
                        ""
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

export default withRouter(UpdateEventAttendee);