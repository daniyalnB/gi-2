import React, { useState, useEffect, useMemo } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
import Search from "../../components/Search";
import AdminTable from "../../components/Table";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import NumberFormat from "react-number-format";
import Modal from "react-bootstrap/Modal";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import { CSVLink } from "react-csv";
import history from "../../../../utils/history";
import {
	GetEventDetails,
	DeleteEventAttendee,
} from "../../../../utils/api-routes/api-routes.util";
import vision from "assets/visibility.svg";
import back from "assets/arrowleft.svg";
import trash from "assets/Del_Role.svg";
import alert from "assets/Alert.svg";

const FormElement = (props) => {

  const [loading, setLoading] = useState(false);

  const [Err, setErr] = useState("");

  const removeEventAttendee = () => {
    setLoading(true);

		const payload = {
			attendeeId: props.eventAttendee.attendeeId,
      orderId: props.eventAttendee.orderId,
		};

    const stringified = queryString.stringify(payload);

    DeleteEventAttendee(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        props.updateData();
				close();
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
          <p> Are you sure you want to remove this user from the event? </p>
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
          className="btn event" 
          onClick={close}
        >
          <span> No </span>
        </button>
        {!loading && ( 
          <button 
            className="btn"
            style={{ marginLeft: "15px" }}
            onClick={removeEventAttendee}
          >
            <span> Yes </span>
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

const EventAttendees = (props) => {

	const [loading, setLoading] = useState(true);

	const [activeTab, setActiveTab] = useState({
		All: true,
		Physical: false,
    Virtual: false,
	});

	const [search, setSearch] = useState("");

	const [headers, setHeaders] = useState([
		{
			Header: "Attendance",
			accessor: "attendance",
		},
		{
			Header: "First Name",
			accessor: "firstName",
		},
		{
			Header: "Last Name",
			accessor: "lastName",
		},
		{
			Header: "Email",
			accessor: "email",
		},
    {
			Header: "Company",
			accessor: "company",
		},
    {
			Header: "Paid",
			accessor: "price",
		},
    {
			Header: "Socks",
			accessor: "socks",
		},
		{
			Header: "Action",
			accessor: false,
		},
	]);

  const [eventName, setEventName]= useState("");

	const [all, setAll] = useState([]);
  const [physical, setPhysical] = useState([]);
	const [virtual, setVirtual] = useState([]);
	const [CSVData, setCSVData] = useState([]);

  useEffect(() => {
    GetEventDetails(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        if (x == undefined) {
          history.push("/gi-team/events");
        } else {
					if (x.length === 0) {
						setAll([]);
						setPhysical([]);
						setVirtual([]);
						setCSVData([]);
						setLoading(false);
					} else {
						setAll(x);
						const e = x.map((val) => ({
							orderId: val.orderId,
							attendance: val.attendance,
							firstName: val.firstName,
							lastName: val.lastName,
							email: val.email,
							company: val.company,
							price: `$${(val.price / 100).toFixed(2)}`,
							socks: val.socks,
							providedAp: val.providedAp ? "Yes" : "No",
							welcomeEmail: val.welcomeEmail ? "Yes" : "No",
							dayOne: val.dayOne ? "Yes" : "No",
							dayTwo: val.dayTwo ? "Yes" : "No",
							notes: val.notes,
							phone: val.phone,
							address: val.address,
						}));
						setCSVData(e);
						setEventName(x[0].eventName);
						const y = response.response.data.filter((event) => event.attendance === "In Person");
						setPhysical(y);
						const z = response.response.data.filter((event) => event.attendance === "Virtual");
						setVirtual(z);
						setLoading(false);
					}
				} 
      } else {
				setCSVData([]);
				setLoading(false);
      }
    });
  }, []);

	const CSVheaders = [
		{
			label: "Order Id",
			key: "orderId",
		},
    {
			label: "Attendance",
			key: "attendance",
		},
		{
			label: "First Name",
			key: "firstName",
		},
		{
			label: "Last Name",
			key: "lastName",
		},
		{
			label: "Email",
			key: "email",
		},
    {
			label: "Company",
			key: "company",
		},
    {
			label: "Paid",
			key: "price",
		},
    {
			label: "Socks",
			key: "socks",
		},
		{
			label: "Provided AP",
			key: "providedAp",
		},
		{
			label: "Welcome Email",
			key: "welcomeEmail",
		},
		{
			label: "Day One",
			key: "dayOne",
		},
		{
			label: "Day Two",
			key: "dayTwo",
		},
		{
			label: "Notes",
			key: "notes",
		},
		{
			label: "Phone",
			key: "phone",
		},
		{
			label: "Address",
			key: "address",
		},
  ];

	const EventsCSV = {
    headers: CSVheaders,
    data: CSVData,
    filename: `${eventName}`
  };

	const [eventAttendee, setEventAttendee] = useState({
		attendeeId: "",
		orderId: "",
	});

  const [cardpopupshow, setcardpopupshow] = useState(false);
  const handlecardclose = () => setcardpopupshow(false);
  const handlecardshow = () => setcardpopupshow(true);

	function updateData () {
		GetEventDetails(props.match.params.id).subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        if (x == undefined) {
          history.push("/gi-team/events");
        } else {
					if (x.length === 0) {
						setAll([]);
						setPhysical([]);
						setVirtual([]);
						setCSVData([]);
						setLoading(false);
					} else {
						setAll(x);
						const e = x.map((val) => ({
							orderId: val.orderId,
							attendance: val.attendance,
							firstName: val.firstName,
							lastName: val.lastName,
							email: val.email,
							company: val.company,
							price: `$${(val.price / 100).toFixed(2)}`,
							socks: val.socks,
							providedAp: val.providedAp ? "Yes" : "No",
							welcomeEmail: val.welcomeEmail ? "Yes" : "No",
							dayOne: val.dayOne ? "Yes" : "No",
							dayTwo: val.dayTwo ? "Yes" : "No",
							notes: val.notes,
							phone: val.phone,
							address: val.address,
						}));
						setCSVData(e);
						setEventName(x[0].eventName);
						const y = response.response.data.filter((event) => event.attendance === "In Person");
						setPhysical(y);
						const z = response.response.data.filter((event) => event.attendance === "Virtual");
						setVirtual(z);
						setLoading(false);
					}
				} 
      } else {
				setCSVData([]);
				setLoading(false);
      }
    });
  };

	return (
		<>
			<Helmet>
				<title> 
					Event Attendees - Actionable Insights Admin
				</title>
			</Helmet>
			<Modal 
        show={cardpopupshow} 
        onHide={handlecardclose} 
        className="Invite_Sub-User_Modal"
      >
        <Modal.Header>
          <img src={alert} />
        </Modal.Header>
        <Modal.Body className="support_body">
          <FormElement
            handlecardclose={handlecardclose}
            eventAttendee={eventAttendee}
            updateData={updateData}
          ></FormElement>
        </Modal.Body>
      </Modal>
			<div className="insightsheet">
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
							<div className="insightsheet-section">
								<div className="row header">
									<div className="col-7">
										<h3 className="heading">
											{eventName ? eventName : props.location.state ? props.location.state.eventName : "Event Attendees"}
										</h3>
									</div>
                  <div className="col-5 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/events"
                    >
                      <img src={back} />
                      Back
                    </Link>
                    {!loading && (
											<>
												{CSVData.length !== 0 && (
													<CSVLink {...EventsCSV}>
														<button className="btn csv">
															<span> Export CSV </span>
														</button>
													</CSVLink>
												)}
											</>
                    )}
                  </div>
								</div>
								<hr />
								<div className="inner_sub_area">
									<div className="row">
										<div className="col-8">
											<ul className="subs_filters">
												<li
													className={activeTab.All == true ? "active" : ""}
													onClick={() =>
														setActiveTab({
															All: true,
                              Physical: false,
															Virtual: false,
														})
													}
												>
													All ({all.length})
												</li>
												<li
													className={activeTab.Physical == true ? "active" : ""}
													onClick={() =>
														setActiveTab({
															All: false,
                              Physical: true,
															Virtual: false,
														})
													}
												>
													Physical ({physical.length})
												</li>
                        <li
													className={activeTab.Virtual == true ? "active" : ""}
													onClick={() =>
														setActiveTab({
															All: false,
															Physical: false,
                              Virtual: true,
														})
													}
												>
													Virual ({virtual.length})
												</li>
											</ul>
										</div>
										<div className="col-4">
											<Search search={search} setSearch={setSearch} />
										</div>
									</div>
								</div>
								{!loading && (
									<>
										{CSVData.length == 0 ? (
											<div style={{ height: "70vh", margin: "20px" }}>
												<div className="no-result-found">
													<h5> No participants found for this event. Please check back later. </h5>
												</div>
											</div>
										) : (
											<>
												{activeTab.All && (
													<div className="table-section">
														<div className="row">
															<AdminTable
																tableClesses={"table-stripes bktables"}
																headers={headers}
																showHeaders={true}
																data={all}
																search={search}
																setSearch={setSearch}
																Row={({ index, rowData }) => {
																	return (
																		<tr key={index}>
																			<td style={{ width: "auto" }}>
																				{rowData.original.attendance ? rowData.original.attendance : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "120px" }}>
																				{rowData.original.firstName ? rowData.original.firstName : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "120px" }}>
																				{rowData.original.lastName ? rowData.original.lastName : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "200px" }}>
																				{rowData.original.email ? rowData.original.email : "N/A"}
																			</td>
																			<td>{rowData.original.company ? rowData.original.company : "N/A"}</td>
																			<td>
																				<NumberFormat
																					value={(rowData.original.price / 100).toFixed(2)}
																					displayType={"text"}
																					thousandSeparator={true}
																					prefix={"$"}
																				/>
																			</td>
																			<td>{rowData.original.socks ? rowData.original.socks : "N/A"}</td>
																			<td>
																				<div className="view_icon_users">
																					{localStorage.getItem("role") == "Analyst" ? (
																						""
																					) : (
																						<img
																							style={{
																								cursor: "pointer",
																								marginRight: "10px",
																							}}
																							src={trash}
																							onClick={() => {
																								handlecardshow();
																								setEventAttendee({
																									...eventAttendee,
																									attendeeId: rowData.original.id,
																									orderId: rowData.original.orderId,
																								});
																							}}
																						/>
																					)}
																					<Link
																						to={{
																							pathname: `/gi-team/update-event-attendee/${rowData.original.id}`,
																							state: {
																								eventId: props.match.params.id,
																							},
																						}}
																					>
																						<img src={vision} />
																					</Link>
																				</div>
																			</td>
																		</tr>
																	);
																}}
															/>
														</div>
													</div>
												)}
												{activeTab.Physical && (
													<div className="table-section">
														<div className="row">
															<AdminTable
																tableClesses={"table-stripes bktables"}
																headers={headers}
																showHeaders={true}
																data={physical}
																search={search}
																setSearch={setSearch}
																Row={({ index, rowData }) => {
																	return (
																		<tr key={index}>
																			<td style={{ width: "auto" }}>
																				{rowData.original.attendance ? rowData.original.attendance : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "120px" }}>
																				{rowData.original.firstName ? rowData.original.firstName : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "120px" }}>
																				{rowData.original.lastName ? rowData.original.lastName : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "200px" }}>
																				{rowData.original.email ? rowData.original.email : "N/A"}
																			</td>
																			<td>{rowData.original.company ? rowData.original.company : "N/A"}</td>
																			<td>
																				<NumberFormat
																					value={(rowData.original.price / 100).toFixed(2)}
																					displayType={"text"}
																					thousandSeparator={true}
																					prefix={"$"}
																				/>
																			</td>
																			<td>{rowData.original.socks ? rowData.original.socks : "N/A"}</td>
																			<td>
																				<div className="view_icon_users">
																					{localStorage.getItem("role") == "Analyst" ? (
																						""
																					) : (
																						<img
																							style={{
																								cursor: "pointer",
																								marginRight: "10px",
																							}}
																							src={trash}
																							onClick={() => {
																								handlecardshow();
																								setEventAttendee({
																									...eventAttendee,
																									attendeeId: rowData.original.id,
																									orderId: rowData.original.orderId,
																								});
																							}}
																						/>
																					)}
																					<Link
																						to={`/gi-team/update-event-attendee/${rowData.original.id}`}
																					>
																						<img src={vision} />
																					</Link>
																				</div>
																			</td>
																		</tr>
																	);
																}}
															/>
														</div>
													</div>
												)}
												{activeTab.Virtual && (
													<div className="table-section">
														<div className="row">
															<AdminTable
																tableClesses={"table-stripes bktables"}
																headers={headers}
																showHeaders={true}
																data={virtual}
																search={search}
																setSearch={setSearch}
																Row={({ index, rowData }) => {
																	return (
																		<tr key={index}>
																			<td style={{ width: "auto" }}>
																				{rowData.original.attendance ? rowData.original.attendance : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "120px" }}>
																				{rowData.original.firstName ? rowData.original.firstName : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "120px" }}>
																				{rowData.original.lastName ? rowData.original.lastName : "N/A"}
																			</td>
																			<td style={{ wordBreak: "break-all", width: "200px" }}>
																				{rowData.original.email ? rowData.original.email : "N/A"}
																			</td>
																			<td>{rowData.original.company ? rowData.original.company : "N/A"}</td>
																			<td>
																				<NumberFormat
																					value={(rowData.original.price / 100).toFixed(2)}
																					displayType={"text"}
																					thousandSeparator={true}
																					prefix={"$"}
																				/>
																			</td>
																			<td>{rowData.original.socks ? rowData.original.socks : "N/A"}</td>
																			<td>
																				<div className="view_icon_users">
																					{localStorage.getItem("role") == "Analyst" ? (
																						""
																					) : (
																						<img
																							style={{
																								cursor: "pointer",
																								marginRight: "10px",
																							}}
																							src={trash}
																							onClick={() => {
																								handlecardshow();
																								setEventAttendee({
																									...eventAttendee,
																									attendeeId: rowData.original.id,
																									orderId: rowData.original.orderId,
																								});
																							}}
																						/>
																					)}
																					<Link
																						to={`/gi-team/update-event-attendee/${rowData.original.id}`}
																					>
																						<img src={vision} />
																					</Link>
																				</div>
																			</td>
																		</tr>
																	);
																}}
															/>
														</div>
													</div>
												)}
											</>
										)}
									</>
								)}
								{loading && (
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

export default withRouter(EventAttendees);