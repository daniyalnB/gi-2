import React, { useState } from "react";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const pricelistupdatesummaryofmonth = () => {

    const [id, setId] = useState("ZjJYqDjmGkI");

    const opts = {
        height: "390",
        width: "640",
        playerVars: {
          autoplay: 0
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="PLUS_OM">
                    <div className="container">
                       <div className="holder">
                            <h2> Price List Update Summary - January 2020 </h2>
                       </div>
                       <div className="youtube_video">
                            <div className="video">
                                <div className="fluid-width-video-wrapper">
                                    <iframe 
                                        src='https://www.youtube.com/embed/hYfr-B0z7kQ?start=1'
                                        frameBorder='0'
                                        allow='autoplay; encrypted-media'
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="changes">
                            <h2> January 2020 Price List Changes Report </h2>
                            <h3> Major changes and new items added </h3>
                            <div className="change_list">
                                <ul>
                                    <li> ELE (Electrical) – Additional items added for metal clad 110-volt copper wiring. </li>
                                    <li> EXC (Excavation) – Item added for silt fencing. </li>
                                    <li> FEN (Fencing) – Item added for 2 3/8" diameter metal posts for 7′ to 8′ fencing. </li>
                                    <li> HMR (Hazardous Material Remediation) – Items added for plastic glove bags for hazardous material cleanup. </li>
                                    <li> HVC (Heat, Vent & Air Conditioning) – Item added for a recessed clothes dryer vent box. </li>
                                    <li> TCR (Trauma/Crime Scene Remediation) – Items added for plastic glove bags for trauma or crime scene cleanup. </li>
                                    <li> WTR (Water Extraction & Remediation) – Items added for plastic glove bags for hazardous material cleanup. </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default pricelistupdatesummaryofmonth;