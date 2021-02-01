import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import academy from 'assets/icon_academy_crest.png';
import colid from 'assets/icon_colid.png';
import insight from 'assets/icon_insight_sheet.png';
import price from 'assets/icon_price_list.png';
import video from 'assets/icon_video_player.png';
import zora from 'assets/zora.png';
import img1 from 'assets/DriHeatRadial2.png';
import img2 from 'assets/TextileRestoration2.png';
import img3 from 'assets/Granite2.png';
import img4 from 'assets/BuiltInOven2.png';
import img5 from 'assets/Siding2.png';

function Main() {
    return(
        <div className='sections'>

            <div className="section-1">
            <div className="container-fluid">
                <div className="discover_section">
                    <div className="row">
                        <div className="col text-left">
                            <span className="one"> Discover What Your Peers Already Have </span>
                            <br />
                            <span className="two"> Stop searching. Start writing. Save time & Money. </span>
                        </div>
                        <div className="col text-right">
                            
                                <Link
                                    to="/signup"
                                    className="btn btn_1"
                                >
                                    Get Started
                                </Link> 
                            <button className="btn btn_2"> Demo </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="section-2">
            <div className="container-fluid">

                <div className="DAES_section">
                    <h2> Digital Assets & Educational Solutions </h2>
                    <h5> Our non-profit 501(c)(6) status ensures that all of Actionable Insights products are delivered at cost. </h5>

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

            <div className="Templates_section">
                <div className="container-fluid">
                    <h2> 3700+ Pages of Xactimate invoicing Templates </h2>
                    <br />
                    <h5> We created this database to clarify what line items should be used in a restoration claims environment. Write your </h5>
                    <h5> Xactimate estimates faster and in a more informed manner – all materially interested parties will thank you. </h5>
                
                    <div className="row sub_section">
                        <div className="row section1">
                            <div className="col-12">
                                <h4> Mitigation Insight Sheets </h4>
                                <hr />
                                <div className="section1_1">
                                    <img src={img1}></img>
                                    <div className="mg"> DriHeat Radial 8 </div>
                                </div>
                            </div>
                            
                            <div className="col-12">
                                <div className="section1_1">
                                    <img src={img2}></img>
                                    <div className="mg"> Textile Restoration </div>
                                </div>
                            </div>
                        </div>
                        <div className="row section2">
                            <div className="col">
                                <h4> Insight Sheet Tutorial </h4>
                                <hr />
                                <div className="section2_2">
                                    <img src={img3}></img>
                                </div>
                            </div>
                        </div>
                        <div className="row section3">
                            <div className="col-12">
                                <h4> Repair Insight Sheets </h4>
                                <hr />
                                <div className="section3_3">
                                    <img src={img4}></img>
                                    <div className="mg"> Oven Detach & Reset </div>
                                </div>
                            </div>
                            
                            <div className="col-12">
                                <div className="section3_3">
                                    <img src={img5}></img>
                                    <div className="mg"> Siding </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>

        </div>
    );
};

export default Main;