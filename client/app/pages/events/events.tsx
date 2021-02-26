import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import cal from 'assets/CAL.svg';
import location from 'assets/Location.svg';

const events = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="events_page">
                    <div className="container">
                        <div className="holder">
                            <h2> Upcoming Events </h2>
                            <div className="separator">
                                <span> January 2021 </span>
                            </div>
                            <div className="upcoming-events">
                                <div className="container">
                                    <div className="row events">
                                        <div className="col-4 image-section">          
                                            <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/05/30164234/new-xact-and-digital-assets-class_v2.png" />
                                        </div>
                                        <div className="col-8 data-section">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h4>
                                                        Door Jamb Retrofit
                                                    </h4>
                                                    <div className="data">
                                                        <img src={cal} />
                                                        <span className="value"> October 6th, 2020 - October 8th, 2020 </span>
                                                    </div>
                                                    <div className="data">
                                                        <img src={location} />
                                                        <span className="value"> 
                                                            <span style={{ color: "#38ADA2" }}> Corporate Alliance</span>
                                                            , 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States + 
                                                            <span style={{ color: "#38ADA2" }}> Google Map </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-5 text-right">
                                                    <Link
                                                        to="/eventsdetail"
                                                        className="btn"
                                                    >
                                                        Register Now
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="row"> 
                                                <div className="col">
                                                    <div className="data">
                                                        <span className="heading"> Description: </span> <br />
                                                        <span className="value">  
                                                            This course will stream live online! Tickets for the online course are the same ticket class/price as attending in person. 
                                                            GAME CHANGER: We did it again! Actionable Insights has created. Find out More
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default events;