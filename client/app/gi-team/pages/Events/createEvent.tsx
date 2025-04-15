import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import queryString from "query-string";
import CurrencyInput from "react-currency-input";
import moment from "moment";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { AddOrUpdateEvent } from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import location from "assets/LocationGreen.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

const CreateEvent = (props) => {

	const [save, setSave] = useState(false);
	const [draft, setDraft] = useState(false);

	const [error, setError] = useState(false);
	const [priceerror, setPriceError] = useState(false);

	const [type, setType] = useState(false);
	const [eventType, setEventType] = useState("Normal");

	const [attendance, setAttendance] = useState(false);
	const [attendanceType, setAttendanceType] = useState("In Person");

	var someDate = new Date();
	someDate.setDate(someDate.getDate() + 0);
	var date = someDate.toISOString().substr(0, 10);
	var timee = Date.now();
	var new_time = moment(timee).format("HH:mm");

	const [time, setTime] = useState({
		start: new_time,
		end: new_time,
	});

	const [event, setEvent] = useState({
		permalink: "",
		title: "",
		tabtitle: "",
		priceincents: 0,
		noofseats: "",
		virtualSeats: "",
		startdatetime: date,
		type: "Normal",
		enddatetime: date,
		location: "",
		metadescription: "",
		metatitle: "",
		featuredimage: "",
		description: "",
		featureddescription: "",
		facebookogimage: "",
		isdraft: true,
		attendance: "In Person",
		keywords: "",
	});

	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
  
	const [convertedContent, setConvertedContent] = useState("");

	const handleEditorChange = (state) => {
		setEditorState(state);
		convertContentToHTML();
	};

	const convertContentToHTML = () => {
		let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
		setConvertedContent(currentContentAsHTML);
	};

	const onSelect = (e) =>
	setEvent({ ...event, [e.target.name]: e.target.files[0] });

	const handleSubmit = (e) => {
		if (event.isdraft == false) {
			setSave(true);
			setDraft(false);
		} else {
			setSave(false);
			setDraft(true);
		}
		e.preventDefault();
		const payload = {
			permalink: event.permalink.replace(/\/$/, ""),
			title: event.title,
			tabtitle: event.tabtitle,
			priceincents: event.priceincents,
			noofseats: event.noofseats,
			virtualSeats: event.virtualSeats,
			startdatetime: `${moment(event.startdatetime).format("DD.MM.yyyy.")}${time.start}`,
			type: event.type,
			enddatetime: `${moment(event.enddatetime).format("DD.MM.yyyy.")}${time.end}`,
			location: event.location,
			metadescription: event.metadescription,
			metatitle: event.metatitle,
			isdraft: event.isdraft,
			attendance: event.attendance,
			keywords: event.keywords,
		};
		const formData = new FormData();
		formData.append("featuredimage", event.featuredimage);
		formData.append("facebookogimage", event.facebookogimage);
		formData.append("description", convertedContent);
		formData.append("featureddescription", event.featureddescription);

		const stringified = queryString.stringify(payload);

		AddOrUpdateEvent(stringified, formData).subscribe((response) => {
			if (response.response.Requested_Action) {
				setEvent({
					permalink: "",
					title: "",
					tabtitle: "",
					priceincents: 0,
					noofseats: "",
					virtualSeats: "",
					startdatetime: date,
					type: "",
					enddatetime: date,
					location: "",
					metadescription: "",
					metatitle: "",
					featuredimage: "",
					description: "",
					featureddescription: "",
					facebookogimage: "",
					isdraft: true,
					attendance: "",
					keywords: "",
				});
				setTime({
					start: new_time,
					end: new_time,
				});
				setSave(false);
				setDraft(false);
				setError(false);
				history.push("/gi-team/events");
				document.getElementById("form").reset()
			} else {
				setSave(false);
				setDraft(false);
				setError(response.response.Message);
			}
		});
	};

	function checkPrice (val) {
		if (val >= 50) {
			setPriceError(false);
		} else {
			setPriceError(true);
		}
	};

	const imageUploadCallBack = (file) => new Promise (
    (resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      reader.onload = function (e) {
        img.src = this.result
      };

      img.onload = function () {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        let originWidth = this.width;
        let originHeight = this.height;

        let maxWidth = 1000,
          maxHeight = 1000;
        let targetWidth = originWidth,
          targetHeight = originHeight;
        if(originWidth > maxWidth || originHeight > maxHeight) {
          if(originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context.clearRect(0, 0, targetWidth, targetHeight);
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
           
        let newUrl = canvas.toDataURL('image/jpeg', 0.92);

        resolve({
          data: {
            link: newUrl
          }
        })
      }
    }
  )

	return (
		<>
			<Helmet>
				<title> 
					Create Event - Actionable Insights Admin
				</title>
			</Helmet>
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
											Create Event
										</h3>
										<div className="status_draft">
											<span> Draft </span>
										</div>
									</div>
									<div className="col-3 text-right back">
										<Link
											className="bk"
											to="/gi-team/events"
										>
											<img src={back} className=""/>
											Back
										</Link>
									</div>
								</div>
								<hr />
								<form onSubmit={handleSubmit} id="form" noValidate={event.isdraft ? true : false}>
									<div className="info-data">
										<div className="form-holder">
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															type="text" 
															name="Permalink" 
															required 
															id="inputField0" 
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	permalink: e.currentTarget.value,
																})
															}
														/>
														<label htmlFor="inputField0" className="floating_label"> Permalink </label>
													</div>
												</div>
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															type="text" 
															name="Title" 
															required 
															id="inputField1" 
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	title: e.currentTarget.value,
																})
															}
														/>
														<label htmlFor="inputField1" className="floating_label"> Title </label>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															onClick={(e) => setAttendance(!attendance)} 
															value={attendanceType} 
															type="text" 
															name="attendance" 
															required 
															id="inputField000" 
															className="input-area"
															style={{ 
																color: "transparent",
																textShadow: "0 0 0 #000",
																cursor: "pointer",
															}}
														/>
														<label htmlFor="inputField000" className="floating_label"> Attendance </label>
														<label className="file_input_label">
															{attendance ?
																<img 
																	className="select size"
																	src={up} 
																	onClick={() => setAttendance(!attendance)}
																/>
															:
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => setAttendance(!attendance)}
																/>
															}
														</label>
														<div className={attendance ? "active" : "dropdown-content" }>
															{eventType == "Bootcamp" ? (
																<h3 
																	onClick={(e) => {
																		setAttendanceType(e.currentTarget.innerHTML);
																		setAttendance(!attendance);
																		setEvent({
																			...event,
																			attendance: e.currentTarget.innerHTML,
																			noofseats: "",
																		});
																	}}
																> 
																	Virtual 
																</h3> 
															) : (
																<>
																	<h3 
																		onClick={(e) => {
																			setAttendanceType(e.currentTarget.innerHTML);
																			setAttendance(!attendance);
																			setEvent({
																				...event,
																				attendance: e.currentTarget.innerHTML,
																				virtualSeats: "",
																			});
																		}}
																	> 
																		In Person
																	</h3>
																	<h3 
																		onClick={(e) => {
																			setAttendanceType(e.currentTarget.innerHTML);
																			setAttendance(!attendance);
																			setEvent({
																				...event,
																				attendance: e.currentTarget.innerHTML,
																				noofseats: "",
																			});
																		}}
																	> 
																		Virtual 
																	</h3> 
																	<h3 
																		onClick={(e) => {
																			setAttendanceType(e.currentTarget.innerHTML);
																			setAttendance(!attendance);
																			setEvent({
																				...event,
																				attendance: e.currentTarget.innerHTML,
																			});
																		}}
																	> 
																		Both 
																	</h3>
																</>
															)}
														</div>
													</div>
												</div>
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															onClick={(e) => setType(!type)} 
															value={eventType} 
															type="text" 
															name="Type" 
															required 
															id="inputField00" 
															className="input-area"
															style={{ 
																color: "transparent",
																textShadow: "0 0 0 #000",
																cursor: "pointer",
															}}
														/>
														<label htmlFor="inputField00" className="floating_label"> Type </label>
														<label className="file_input_label">
															{type ?
																<img 
																	className="select size"
																	src={up} 
																	onClick={() => setType(!type)}
																/>
															:
																<img 
																	className="select size"
																	src={down} 
																	onClick={() => setType(!type)}
																/>
															}
														</label>
														<div className={type ? "active" : "dropdown-content" }>
															<h3 
																onClick={(e) => {
																	setEventType(e.currentTarget.innerHTML);
																	setType(!type);
																	setEvent({
																		...event,
																		type: e.currentTarget.innerHTML,
																		priceincents: 0,
																		noofseats: "",
																		virtualSeats: "",
																		location: "",
																	});
																}}
															> 
																Private 
															</h3>
															<h3 
																onClick={(e) => {
																	setEventType(e.currentTarget.innerHTML);
																	setType(!type);
																	setEvent({
																		...event,
																		type: e.currentTarget.innerHTML,
																	});
																}}
															> 
																Normal 
															</h3> 
															<h3 
																onClick={(e) => {
																	setEventType(e.currentTarget.innerHTML);
																	setType(!type);
																	setEvent({
																		...event,
																		type: e.currentTarget.innerHTML,
																		attendance: "Virtual"
																	});
																	setAttendanceType("Virtual");
																}}
															> 
																Bootcamp 
															</h3> 
														</div>
													</div>
												</div>
											</div>
											{eventType !== "Private" && (
												<>
													<div className="row">
														<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
															<div className="form-group nogroup">
																<CurrencyInput
																	thousandSeparator=","
																	value={event.priceincents / 100}
																	name="Price"
																	id="inputField2"
																	className="input-area"
																	onChange={(e, maskedvalue) => {
																		setEvent({
																			...event,
																			priceincents: parseInt((maskedvalue * 100)),
																		});
																		checkPrice(parseInt((maskedvalue * 100)));
																	}}
																/>
																<label htmlFor="inputField2" className="floating_label"> Price </label>
															</div>
															{priceerror ? (
																<div
																	style={{
																		color: "#db422d",
																		marginBottom: "20px",
																		marginTop: "-10px",
																		fontSize: "12px",
																		fontWeight: "600",
																		padding: "0px 4px",
																	}}
																> 
																	Price must be at least $0.50 usd
																</div>
															) : (
																""
															)}
														</div>
														{(attendanceType === "Both" || attendanceType === "In Person") && (
															<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
																<div className="form-group nogroup">
																	<input 
																		type="number"
																		min="0"
																		name="Seats" 
																		required 
																		id="inputField3" 
																		className="input-area"
																		value={event.noofseats}
																		onChange={(e) =>
																			setEvent({
																				...event,
																				noofseats: e.currentTarget.value,
																			})
																		}
																	/>
																	<label htmlFor="inputField3" className="floating_label"> Number of In Person Seats </label>
																</div>
															</div>
														)}
													</div>
													{(attendanceType === "Both" || attendanceType === "Virtual") && (
														<div className="row">
															<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
																<div className="form-group nogroup">
																	<input 
																		type="number"
																		min="0"
																		name="virtualSeats" 
																		required 
																		id="inputField13" 
																		className="input-area"
																		value={event.virtualSeats}
																		onChange={(e) =>
																			setEvent({
																				...event,
																				virtualSeats: e.currentTarget.value,
																			})
																		}
																	/>
																	<label htmlFor="inputField13" className="floating_label"> Number of Virtual Seats </label>
																</div>
															</div>
														</div>
													)}
												</>
											)}
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															defaultValue={date}
															type="date" 
															name="Start" 
															required={eventType !== "Private" ? true : false}
															id="inputField4" 
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	startdatetime: e.currentTarget.value,
																})
															}
														/>
														<label htmlFor="inputField4" className="floating_label"> Start Date </label>
													</div>
												</div>
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															defaultValue={date}
															min={event.startdatetime}
															type="date" 
															name="End" 
															required 
															id="inputField5" 
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	enddatetime: e.currentTarget.value,
																})
															}
														/>
														<label htmlFor="inputField5" className="floating_label"> End Date </label>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															defaultValue={new_time}
															type="time" 
															name="start" 
															required 
															id="inputField10" 
															className="input-area"
															onChange={(e) =>
																setTime({
																	...time,
																	start: e.currentTarget.value,
																})
															}
														/>
														<label htmlFor="inputField10" className="floating_label"> Start Time </label>
													</div>
												</div>
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<input 
															defaultValue={new_time}
															type="time" 
															name="end" 
															required 
															id="inputField11" 
															className="input-area"
															onChange={(e) =>
																setTime({
																	...time,
																	end: e.currentTarget.value,
																})
															}
														/>
														<label htmlFor="inputField11" className="floating_label"> End Time </label>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<textarea
															name="tabtitle"
															required
															id="textField1"
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	tabtitle: e.currentTarget.value,
																})
															}
														/>  
														<label htmlFor="textField1" className="floating_label"> Tab Title </label>
													</div>
												</div>
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<textarea
															name="featureddescription"
															required
															id="textField2"
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	featureddescription: e.currentTarget.value,
																})
															}
														/>  
														<label htmlFor="textField2" className="floating_label"> Featured Description </label>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<textarea
															name="metatitle"
															required
															maxLength={160}
															id="textField3"
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	metatitle: e.currentTarget.value,
																})
															}
														/>  
														<label htmlFor="textField3" className="floating_label"> Meta Title </label>
													</div>
												</div>
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<textarea
															name="metadescription"
															required
															maxLength={160}
															id="textField4"
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	metadescription: e.currentTarget.value,
																})
															}
														/>  
														<label htmlFor="textField4" className="floating_label"> Meta Description </label>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
													<div className="form-group nogroup">
														<textarea
															name="keywords"
															// required
															id="textField5"
															className="input-area"
															onChange={(e) =>
																setEvent({
																	...event,
																	keywords: e.currentTarget.value,
																})
															}
														/>  
														<label htmlFor="textField5" className="floating_label"> Keywords </label>
													</div>
												</div>
											</div>
											<div className="row">
												{eventType !== "Private" && (
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="Location" 
																required={eventType !== "Private" ? true : false} 
																id="inputField6" 
																className="input-area"
																value={event.location}
																onChange={(e) =>
																	setEvent({
																		...event,
																		location: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField6" className="floating_label"> Location </label>
															<label className="file_input_label">
																<img 
																	className="location"
																	src={location}
																/>
															</label>
														</div>
													</div>
												)}
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<label className="file">
															<input
																type="file"
																name="featuredimage"
																accept="image/png, image/jpg, image/jpeg, image/webp"
																onChange={onSelect}
																onClick={(e) => (e.target.value = null)}
															/>
															<span className="file-custom">  Featured Image  </span>
														</label>
														<div className="resolution"> Image size XXX x XXX </div>
														{event.featuredimage ? (
															<div className="facebook-image-name">
																{"   " + event.featuredimage.name}
															</div>
														) : (
															<div></div>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="description">
										<h3> Description </h3>
										<div className="row">
											<div className="col-8 Text_Editor">
												<div className="inside">
													<Editor
														editorState={editorState}
														onEditorStateChange={handleEditorChange}
														wrapperClassName="wrapper-class"
														editorClassName="editor-class"
														toolbarClassName="toolbar-class"
														placeholder="Type something here..."
														toolbar={{
															inline: { inDropdown: false },
															list: { inDropdown: true },
															textAlign: { inDropdown: false },
															link: { inDropdown: true },
															history: { inDropdown: false },
															image: {
																urlEnabled: true,
																uploadEnabled: true,
																alignmentEnabled: true,
																uploadCallback: imageUploadCallBack,
																previewImage: true,
																inputAccept: 'image/*',
																alt: {present: false, mandatory: false}
															}
														}}
													/>{" "}
												</div>
											</div>
										</div>
									</div>
									<div className="info-data">
										<div className="form-holder">
											<div className="row">
												<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
													<div className="form-group nogroup">
														<label className="file">
															<input
																type="file"
																name="facebookogimage"
																accept="image/png, image/jpg, image/jpeg, image/webp"
																onChange={onSelect}
																onClick={(e) => (e.target.value = null)}
															/>
															<span className="file-custom">  Facebook OG Image  </span>
														</label>
														<div className="resolution"> Image resolution 1200 x 630 pixels </div>
														{event.facebookogimage ? (
															<div className="facebook-image-name">
																{"   " + event.facebookogimage.name}
															</div>
														) : (
															<div></div>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
									<hr className="second-hr" />
									<div className="Buttons">
										<div className="row">
											{!save && (
												<button 
													className="btn"
													type="submit"
													disabled={localStorage.getItem("role") == "Analyst" ? true : false}
													onClick={() => setEvent({ ...event, isdraft: false })}
												> 
													<span> Save </span>
												</button>
											)}
											{save && (
												<button className="btn" disabled> 
													<i className="fas fa-spinner fa-spin"></i>
												</button>
											)}
											{!draft && (
												<button 
													className="btn draft"
													type="submit"
													disabled={localStorage.getItem("role") == "Analyst" ? true : false}
													onClick={() => setEvent({ ...event, isdraft: true })}
												> 
													<span> Save as Draft </span>
												</button>   
											)}
											{draft && (
												<button className="btn draft" disabled> 
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
							</div>
						</div> 
					</div>
				</div>
			</div>
		</>
	);
};

export default withRouter(CreateEvent);