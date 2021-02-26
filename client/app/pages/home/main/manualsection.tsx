import React from 'react';
import { Link } from 'react-router-dom';
import rmanual from 'assets/repairmanual.png';
import mmanual from 'assets/mitigationmanual.png';

const ManualSection = () => {
    return (
        <>
            <div className="Manual_section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-md-6 col-sm-12">
                            <div className="manual">
                                <h2> ACTIONABLE INSIGHTS </h2>
                                <h2>  CODE OF ETHICS  </h2>
                                <div className="text-1">
                                    <p> 
                                        I care deeply about the property insurance ecosystem
                                    </p>
                                    <p>
                                        I intend to be a good steward of the restoration ecosystem
                                    </p>
                                    <p> 
                                        I intend to give more to the restoration ecosystem than I take away 
                                    </p>
                                    <p>
                                        I intend to strive for mastery, consistently choosing to participate in education and training events 
                                    </p>
                                    <p>
                                        I agree to be polite, be professional and have a plan to thoughtfully justify every position that I take 
                                    </p>
                                    <p>
                                        I agree to champion an environment of reasonable profits and well managed claims
                                    </p> 
                                    <p>
                                        I am here to learn and contribute in a meaningful way, not to carelessly market or poach talent 
                                    </p>
                                </div>
                            </div>
                            <div className="manual Top">
                                <h2> SO YOU WANT IT IN </h2>
                                <h2> YOUR HANDS </h2>
                                <div className="text-1">
                                    <p> 
                                        Purchase a thoughtful compilation of all our Insights Sheets in bound text. 
                                    </p>
                                    <div className="BTN">
                                        <Link
                                            to=""
                                            className="btn btn_1"
                                        >
                                            Umpire’s Mitigation Manual
                                        </Link> 
                                        <Link
                                            to=""
                                            className="btn"
                                        >
                                            Umpire’s Repair Manual
                                        </Link>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 col-sm-12">
                            <div className="manual">
                                <h2> TRANSCENDING THE </h2>
                                <h2> RESTORATION PARADOX </h2>
                                <div className="text-1 text-2">
                                    <p> 
                                        If contractors generate sloppy, overpriced Xactimate sheets, then premiums 
                                        skyrocket and claims processing becomes arduous for all materially interested 
                                        parties. Conversely, if carriers are unwilling to reimburse their policyholders for 
                                        reasonably incurred costs, then financially sound, capable contractors who can 
                                        warranty their work will become scarce. 
                                    </p>
                                </div>
                            </div>
                            <div className="manual-picture">
                                <div id="demo1-manual" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-border">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={rmanual} />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={mmanual} />  
                                            </div>
                                        </div>
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

export default ManualSection;