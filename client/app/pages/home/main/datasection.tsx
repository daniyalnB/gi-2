import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const DataSection = () => {

    const estimate_revision = 81;
    const aging_report = 90;
    const windsheild_time = 79;
    const sketch_accuracy = 88;

    return (
        <>
            <div className="Data_Driven">
                <div className="container">
                    <h2> Data Driven </h2>
                    <h5> After training North America's preeminent Carriers and Restoration to get the most out of Matterport in conjunction </h5>
                    <h5> with Xactimate the results are in: </h5>
                    <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Data">
                                <div className="data-circle">
                                    <div className="circle-size">
                                        <CircularProgressbar value={estimate_revision} text={`${estimate_revision}%`} 
                                            styles={
                                                buildStyles({
                                                    textColor: "#DB422D",
                                                    pathColor: "#DB422D",
                                                    trailColor: "#d8d8d8"
                                                })
                                            }
                                        />;
                                    </div>
                                </div>
                                <div className="data-text">
                                    <h2> Estimate Revisions </h2>
                                </div>
                                <div className="data-value">
                                    <h3> Down from 2.6 to 1.2 </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Data">
                                <div className="data-circle">
                                    <div className="circle-size">
                                        <CircularProgressbar value={aging_report} text={`${aging_report}%`} 
                                            styles={
                                                buildStyles({
                                                    textColor: "#26A59A",
                                                    pathColor: "#26A59A",
                                                    trailColor: "#d8d8d8"
                                                })
                                            }
                                        />;
                                    </div>
                                </div>
                                <div className="data-text">
                                    <h2> Aging Report </h2>
                                </div>
                                <div className="data-value">
                                    <h3> Days from completion to payment in full reduced by 11 days </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Data">
                                <div className="data-circle">
                                    <div className="circle-size">
                                        <CircularProgressbar value={windsheild_time} text={`${windsheild_time}%`} 
                                            styles={
                                                buildStyles({
                                                    textColor: "#A2B0BB",
                                                    pathColor: "#A2B0BB",
                                                    trailColor: "#d8d8d8"
                                                })
                                            }
                                        />;
                                    </div>
                                </div>
                                <div className="data-text">
                                    <h2> Windshield Time </h2>
                                </div>
                                <div className="data-value">
                                    <h3> Time behind the wheel reduced by 7.4hrs a week. </h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Data">
                                <div className="data-circle">
                                    <div className="circle-size">
                                        <CircularProgressbar value={sketch_accuracy} text={`${sketch_accuracy}%`} 
                                            styles={
                                                buildStyles({
                                                    textColor: "#2E4A71",
                                                    pathColor: "#2E4A71",
                                                    trailColor: "#d8d8d8"
                                                })
                                            }
                                        />;
                                    </div>
                                </div>
                                <div className="data-text">
                                    <h2> Sketch Accuracy </h2>
                                </div>
                                <div className="data-value">
                                    <h3> Delta from ground truth depth data reduced by 315% </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataSection;