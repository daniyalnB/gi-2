import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const Comments = React.lazy(() => import("../../../components/Comments"));
import { AppContext } from "../../../../contexts/appContext";
import moment from "moment";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import down from "assets/down-arrow-user.svg";

const EventAttendance = ({ data }) => {

  const navigate = useNavigate();
  
  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
      setNumberOfSeats(data.noofseats + data.virtualSeats);
    }
  }, []);

  const [NumberOfSeats, setNumberOfSeats] = useState(0);

	const [subscriptionInfo, setSubscriptionInfo] = useState(false);

  const [path, setPath] = useState(location.pathname);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [attendees, setAttendees] = useState("1");

  const [key, setKey] = useState(0);

  const [check, setCheck] = useState(false);

  const handleOnChange = (value) => {

    if (value > NumberOfSeats) {
      setCheck(true);
    } else {
      setCheck(false);
    }

    const obj = { 
      attendeeemail: "",
      attendeefirstname: "",
      attendeelastname: "",
      attendance: data.attendance == null ? "In Person" : data.attendance === "Both" ? "" : data.attendance,
    };

    const num = value - attendees;

    setAttendees(value);

    if (num > 0) {
      for (let x = 0; x < num; x++) {
        setFields((prevFields) => [...prevFields, obj]);
      }
    } else {
      fields.length = fields.length + num;
      setFields(fields);
    }
  };

  const [fields, setFields] = useState([
    { 
      attendeeemail: "",
      attendeefirstname: "",
      attendeelastname: "",
      attendance: "",
    },
  ]);

  useEffect(() => {
    if (myInfo) {
		  setSubscriptionInfo(myInfo.ownerinfo);
      if (subscriptionInfo) {
        setFields([
          { 
            attendeeemail: subscriptionInfo.emailaddress,
            attendeefirstname: subscriptionInfo.firstname,
            attendeelastname: subscriptionInfo.lastname,
            attendance: data.attendance == null ? "In Person" : data.attendance === "Both" ? "" : data.attendance,
          }
        ]);
      }
    }
  }, [myInfo]);

  const validation = fields.every(person => person.attendeeemail && person.attendeefirstname && person.attendeelastname && person.attendance);

  const onChange = (e, index) => {
    const indexed = index + 1;
    let target = e.currentTarget;

    setFields((prevFields) =>
      prevFields.map((pF, i) =>
        i + 1 === indexed ? { ...pF, [target.name]: target.value } : pF
      )
    );
  };

  const [InPersonCheck, setInPersonCheck] = useState(0);
  const [VirtualCheck, setVirtualCheck] = useState(0);

  useEffect(() => {
    statusCounter();
  }, [fields]);

  function statusCounter() {
    const str1 = "In Person";
    const count1 = fields.filter((obj) => obj.attendance === str1).length;

    const str2 = "Virtual";
    const count2 = fields.filter((obj) => obj.attendance === str2).length;
    
    setInPersonCheck(count1);
    setVirtualCheck(count2);
  };

  const [role, setRole] = useState(false);

  const renderInputs = (value) => {

    const inputs = [];
    for (let i = 0; i < value; i++) {

      inputs.push(
        <Tab eventKey={i} title={i + 1}>
          <div className="attendee_info">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> First Name </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="attendeefirstname"
                    required
                    defaultValue={i == 0 ? fields[0].attendeefirstname : ""}
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> Last Name </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="attendeelastname"
                    required
                    defaultValue={i == 0 ? fields[0].attendeelastname : ""}
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label> Email </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="email"
                    name="attendeeemail"
                    required
                    defaultValue={i == 0 ? fields[0].attendeeemail : ""}
                    className="form-control"
                    placeholder="Enter"
                    onChange={(e) => {
                      onChange(e, i);
                    }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 invite_select">
                <div className="form-group">
                  <label> Attendance </label>
                  <b style={{ color: "red", fontSize: "25px" }}>*</b>
                  <input
                    type="text"
                    name="attendance"
                    required
                    className="form-control"
                    placeholder="Enter"
                    value={fields[i].attendance == "" ? "" : fields[i].attendance}
                    onClick={() => setRole(!role)}
                  />
                  {data.attendance === "Both" ? (
                    <>
                      <label className="file_input_label">
                        <img
                          className="select size"
                          src={down}
                          onClick={() => setRole(!role)}
                        />
                      </label>
                      <div className={role ? "active-dropdown" : "dropdown-content"}>
                        {InPersonCheck === data.noofseats ? (
                          ""
                        ) : (
                          <input
                            className="role"
                            type="text"
                            name="attendance"
                            value="In Person"
                            onClick={(e) => {
                              onChange(e, i);
                              setRole(!role);
                            }}
                          />
                        )}
                        {VirtualCheck === data.virtualSeats ? (
                          ""
                        ) : (
                          <input
                            className="role"
                            type="text"
                            name="attendance"
                            value="Virtual"
                            onClick={(e) => {
                              onChange(e, i);
                              setRole(!role);
                            }}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </Tab>
      );
    }
    return inputs;
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
    const event_data = {
      event: data,
      attendees: fields,
      type: "event",
      path: path,
      quantity: parseInt(attendees),
    }
    localStorage.setItem("event_data", JSON.stringify(event_data));
    localStorage.setItem("objContactInformationForOrderDTO", JSON.stringify(objContactInformationForOrderDTO));
    navigate("/buy-event");
  };

  return (
    <>
      {`${moment(data.enddatetime).format("yyyy-MM-DD")}` >= date ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className={localStorage.getItem("tokenCustomer") == null ? "event_attendance_none" : "event_attendance"}>
              <div className="attendance">
                {NumberOfSeats == 0 ? (
                  <h3 style={{ fontSize: "20px", padding: "20px"}}>
                    Seats not Available
                  </h3> 
                ) : (
                  <>
                    <div className="noattendees" id="noattendees">
                      <h3 className="text-left"> Number of Attendees: </h3>
                      <input
                        type="number"
                        defaultValue={attendees}
                        required
                        autoComplete="new-password"
                        id="search-attendees"
                        min="1"
                        max={NumberOfSeats}
                        name="search-attendees"
                        onKeyDown={(e) =>
                          (e.keyCode === 69 ||
                            e.keyCode === 190 ||
                            e.keyCode === 189 ||
                            e.keyCode === 187) &&
                          e.preventDefault()
                        }
                        step="1"
                        className="form-control"
                        onBlur={(value) => handleOnChange(value.currentTarget.value)}
                        onKeyPress={(e) => {e.key === "Enter" && e.preventDefault()}}
                      />
                    </div>
                    {check ? (
                      <div
                        style={{ 
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#DB422D",
                          padding: "20px",
                        }}
                      > 
                        Number of Attendees must be less than or equal to {NumberOfSeats} 
                      </div>
                    ) : ( 
                      <div className="inner_attendance">
                        <div className="row">
                          <div className="col">
                            <div className="subs_filters">                  
                              <Tabs
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                transition={false}
                                id="noanim-tab-example"
                              >
                                {renderInputs(attendees)}
                              </Tabs>
                            </div>
                          </div>
                        </div>
                      </div>
                    )} 
                  </>
                )}
              </div>
              {NumberOfSeats == 0 || check ?
                ""
              :
                <div className="checkout">
                  <button 
                    className="btn" 
                    type="submit"
                    disabled={validation ? false : true}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              }
            </div>
          </form>
          <Comments eventid={data.id} page="event" />
        </>
      ) : ( 
        ""
      )}
    </>
  );
};

export default EventAttendance;