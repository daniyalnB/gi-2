import React from 'react';
import white from  "assets/White_Attendee.svg";
import grey from  "assets/Grey_Attendee.svg";
import green from  "assets/Green_Attendee.svg";

const EventAttendance = () => {
    return (
        <>
            <div className="event_attendance">
                <div className="attendance">
                    <div className="noattendees">
                        <h3 className="text-left"> Number of Attendees: </h3>
                        <input
                            type="number"
                            name="attend"
                            className="form-control"
                        />
                    </div>
                    <div className="inner_attendance">
                        <div className="row">
                            <div className="col">
                                <ul className="subs_filters">
                                    <li
                                        className="active"
                                    >
                                        <img src={white} />
                                        <span> 1 </span>
                                    </li>
                                    <li
                                        className=""
                                    >
                                        <img src={grey} />
                                        <span> 2 </span>
                                    </li>
                                    <li
                                        className=""
                                    >
                                        <img src={grey} />
                                        <span> 3 </span>
                                    </li>
                                    <li
                                        className=""
                                    >
                                        <img src={grey} />
                                        <span> 4 </span>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div className="attendee_info">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label> First Name </label> 
                                        <b 
                                            style={{ color: "red", fontSize: "25px"}}
                                        >
                                            *
                                        </b>
                                    <input
                                        type="text"
                                        name="firstname"
                                        className="form-control"
                                        placeholder="Enter"
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label> Last Name </label> 
                                        <b 
                                            style={{ color: "red", fontSize: "25px"}}
                                        >
                                            *
                                        </b>
                                    <input
                                        type="text"
                                        name="lastname"
                                        className="form-control"
                                        placeholder="Enter"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label> Email </label> 
                                        <b 
                                            style={{ color: "red", fontSize: "25px"}}
                                        >
                                            *
                                        </b>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventAttendance;