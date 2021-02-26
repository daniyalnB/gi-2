import React from 'react';
import cal from 'assets/CAL.svg';
import location from 'assets/Location.svg';
import seats from 'assets/Seats.svg';

const Event = () => {
    return (
        <>
         <div className="event row">
            <div className="col-xl-4 col-lg-4 col-md-4 image-section">          
                <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/05/30164234/new-xact-and-digital-assets-class_v2.png" />
            </div>
            <div className="col-xl-8 col-lg-8 col-md-8 data-section">
                <div className="row">
                    <div className="col-xl-7 col-lg-7 col-md-7">
                        <h4>
                            Xactimate Estimating & Digital Assets – Ticket February 2021 (San Diego, CA)
                        </h4>
                        <div className="data">
                            <img src={seats} />
                        <span className="value"> Seats Available: <span style={{ color: "#38ADA2"}}> 33 </span> </span>
                        </div>
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
                    <div className="col-xl-5 col-lg-5 col-md-5 text-right">
                        <div>
                            <h2 className="price"> $750.00 </h2>
                        </div>
                            <h3 className="points"> or 7500 Insighter Points </h3>
                            <div className="RN">
                                <button
                                    className="btn"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;