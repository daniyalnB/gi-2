import React from 'react';
import academy from 'assets/icon_academy_crest.png';
import colid from 'assets/icon_colid.png';
import insight from 'assets/icon_insight_sheet.png';
import price from 'assets/icon_price_list.png';
import video from 'assets/icon_video_player.png';
import zora from 'assets/zora.png';

const DAESSection = () => {
    return (
        <>
            <div className="section-2">
                <div className="container">

                    <div className="DAES_section">
                        <h2> Digital Assets & Educational Solutions </h2>
                        <h5> Our non-profit 501(c)(6) status ensures that all of Actionable Insights products are delivered at cost. </h5>
                        
                        <div className="DAED-sub-section">
                            <div className="row section2">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <img src={insight}></img>
                                    <h5> Insight Sheet 
                                        <br />
                                        Database
                                    </h5>
                                    <span> 3700+ pages of Xactimate invoicing templates. </span>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <img src={colid}></img>
                                    <h5> Commonly Overlooked 
                                        <br />
                                        Line Item DATABASE 
                                    </h5>
                                    <span> You don't know what you don't know. </span>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <img src={price}></img>
                                    <h5> Price List Update
                                        <br />
                                        Summary 
                                    </h5>
                                    <span> Summarized list of hot new line items.  </span>
                                </div>
                            </div>

                            <div className="row section2">
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <img src={academy}></img>
                                    <h5> ACTIONABLE ACADEMY </h5>
                                    <span> On Demand Learning and Certifications. </span>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <img src={video}></img>
                                    <h5> VIDEO GALLERY </h5>
                                    <span> Hundreds of Matterport and Xactimate Hacks. </span>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <img src={zora}></img>
                                    <h5> ZORA & SOLIDIFAI </h5>
                                    <span> Estimate Audit Engines. </span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default DAESSection;