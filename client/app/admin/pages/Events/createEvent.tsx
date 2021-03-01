import React from 'react';
import { Link } from 'react-router-dom';
import SideMenu from "../../components/SideMenu";
import UserTab from "../../components/UserTab";
import Text_Editor from "../../components/Editor";
import browse from "assets/upload.png";
import back from "assets/arrowleft.svg";

export default function CreateEvent (props) {
    return (
        <>
            <div className="createInsightSheet">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
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
                                        {/* <div className="status">
                                            <span> Draft </span>
                                        </div> */}
                                    </div>
                                    <div className="col-3 text-right back">
                                        <Link
                                            className="bk"
                                            to="/admin/events"
                                        >
                                            <img src={back} className=""/>
                                            Back
                                        </Link>
                                    </div>
                                </div>
                                <hr />
                                <div className="info-data">
                                    <div className="form-holder">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Title" 
                                                        required 
                                                        id="inputField1" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField1" className="floating_label"> Title </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Price" 
                                                        required 
                                                        id="inputField2" 
                                                        className="input-area"
                                                        placeholder="$"
                                                    />
                                                    <label htmlFor="inputField2" className="floating_label"> Price </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Seats" 
                                                        required 
                                                        id="inputField3" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField3" className="floating_label"> Number of Seats </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Start" 
                                                        required 
                                                        id="inputField4" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField4" className="floating_label"> Start date and time </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="End" 
                                                        required 
                                                        id="inputField5" 
                                                        className="input-area"
                                                    />
                                                    <label htmlFor="inputField5" className="floating_label"> End date and time </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="text" 
                                                        name="Location" 
                                                        required 
                                                        id="inputField6" 
                                                        className="input-area"
                                                        placeholder="$"
                                                    />
                                                    <label htmlFor="inputField6" className="floating_label"> Location </label>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="button" 
                                                        name="fimage" 
                                                        required 
                                                        id="inputField7" 
                                                        className="input-area"
                                                        style={{marginBottom: "0px"}}
                                                    />
                                                    <label htmlFor="inputField7" className="floating_label"> Featured image </label>
                                                    <label className="file_input_label">
                                                        <input
                                                            type="file" 
                                                            style={{ display: "none"}}
                                                        />
                                                        <img 
                                                            className="facebook"
                                                            src={browse} 
                                                        />
                                                    </label>
                                                    <div className="resolution"> Image size XXX x XXX </div>
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
                                                <Text_Editor />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="info-data">
                                    <div className="form-holder">
                                        <div className="row">
                                            <div className="col-4 newcol">
                                                <div className="form-group nogroup">
                                                    <input 
                                                        type="button" 
                                                        name="fimage" 
                                                        required 
                                                        id="inputField14" 
                                                        className="input-area"
                                                        style={{marginBottom: "0px"}}
                                                    />
                                                    <label htmlFor="inputField14" className="floating_label"> Facebook OG Image </label>
                                                    <label className="file_input_label">
                                                        <input
                                                            type="file" 
                                                            style={{ display: "none"}}
                                                        />
                                                        <img 
                                                            className="facebook"
                                                            src={browse} 
                                                        />
                                                    </label>
                                                    <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="second-hr" />
                                <div className="Buttons">
                                    <div className="row">
                                        <button className="btn"> 
                                            <span> Save </span>
                                        </button>
                                        <button className="btn draft"> 
                                            <span> Save as Draft </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};