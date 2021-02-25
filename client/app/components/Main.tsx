import React, { useState }from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ModalVideo from 'react-modal-video';
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
import black_hat from 'assets/Black_Hat.png';
import green_hat from 'assets/Green_Hat.png';
import tan_hat from 'assets/Tan_Hat.png';
import allbirds from 'assets/allbirds.png';
import one from 'assets/one.jpg';
import two from 'assets/two.jpg';
import three from 'assets/three.jpg';
import four from 'assets/four.jpg';
import five from 'assets/five.jpg';
import six from 'assets/six.jpg';
import seven from 'assets/seven.jpg';
import rmanual from 'assets/repairmanual.png';
import mmanual from 'assets/mitigationmanual.png';

const Main = () => {
    
    const estimate_revision = 81;
    const aging_report = 90;
    const windsheild_time = 79;
    const sketch_accuracy = 88;

    const [isOpen, setOpen] = useState(false);

    return(
        <>
            <div className="slider-section">
                <div className="container-fluid">
                    <div id="demo" className="carousel slide" data-ride="carousel" data-interval={isOpen == true ? "false" : "3000"}>
                        {/* Indicators */}
                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" className="active"></li>
                            <li data-target="#demo" data-slide-to="1"></li>
                            <li data-target="#demo" data-slide-to="2"></li>
                            <li data-target="#demo" data-slide-to="3"></li>
                            <li data-target="#demo" data-slide-to="4"></li>
                            <li data-target="#demo" data-slide-to="5"></li>
                            <li data-target="#demo" data-slide-to="6"></li>
                        </ul>
                        {/* The slideshow */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={one} />
                                <div className="carousel-caption">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> ACTIONABLE INSIGHTS </h2>
                                            <h1> MATTERPORT CERTIFICATION </h1>
                                            <Link
                                                to=""
                                                className="slider-btn"
                                            >
                                                GET CERTIFIED
                                            </Link> 
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div className="carousel-item">
                                <img src={two} />
                                <div className="carousel-caption">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> REMOTE </h2>
                                            <h1> PRIVATE TRAINING </h1>
                                            <Link
                                                to=""
                                                className="slider-btn"
                                            >
                                                LEARN MORE
                                            </Link> 
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div className="carousel-item">
                                <img src={three} />
                                <div className="carousel-caption">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> 3700+ PAGES OF XACTIMATE INVOICING TEMPLATES </h2>
                                            <h1> INSIGHT SHEET DATABASE </h1>
                                            <p>
                                                <strong>$7/month</strong>
                                                &nbsp;= All the&nbsp;
                                                <strong>warranted</strong>
                                                &nbsp;line items with&nbsp;
                                                <strong>F9 Note</strong>
                                                &nbsp;support
                                            </p>
                                            <Link
                                                to=""
                                                className="slider-btn"
                                            >
                                                INSIGHT SHEETS
                                            </Link> 
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div className="carousel-item">
                                <img src={four} />
                                <div className="carousel-caption">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> AS SEEN IN XACT AND MACROS* </h2>
                                            <h1> PLUS PLAN </h1>
                                            <p>
                                                Take your&nbsp;
                                                <strong>productivity</strong>
                                                &nbsp;to the&nbsp;
                                                <strong>next level.</strong>
                                            </p>
                                            <Link
                                                to=""
                                                className="slider-btn"
                                            >
                                                PLAN MATRIX
                                            </Link> 
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div className="carousel-item">
                                <img src={five} />
                                <div className="carousel-caption">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> ACTIONABLE INSIGHTS </h2>
                                            <h1> TOOLS CERTIFICATION </h1>
                                            <Link
                                                to=""
                                                className="slider-btn"
                                            >
                                                GET CERTIFIED
                                            </Link> 
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div className="carousel-item">
                                <img src={six} />
                                <div className="carousel-caption">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> ESTIMATE AUDIT / EDIT ENGINES </h2>
                                            <h1> ZORA & SOLIDIFAI </h1>
                                            <p>
                                                Ensure&nbsp;
                                                <strong>accuracy</strong>
                                                &nbsp;and get paid without hesitation.
                                            </p>
                                            <Link
                                                to=""
                                                className="slider-btn"
                                            >
                                                LEARN MORE
                                            </Link> 
                                        </div>
                                    </div>
                                </div>   
                            </div>
                            <div className="carousel-item">
                                <img src={seven} />
                                <div className="carousel-caption chng">
                                    <div className="container">
                                        <div className="side-text">
                                            <h2> What is Actionable Insights? </h2>
                                            <div className="none">
                                                <h1> FALL IN LOVE WITH YOUR JOB AGAIN </h1>
                                                <p> Diverse Perspectives – Shared Objectives. </p>
                                                <Link
                                                    to=""
                                                    className="slider-btn"
                                                >
                                                    LEARN MORE
                                                </Link> 
                                            </div>
                                        </div>
                                        <div className="video-link">
                                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />
                                            
                                                <i 
                                                    className="fa fa-play"
                                                    onClick={()=> setOpen(true)}
                                                >
                                                </i>
                                                <img  alt="" draggable="false" />

                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-1">
                <div className="container">
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
                                <button 
                                    className="btn btn_2"
                                > 
                                    Demo 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

            <div className="Templates_section">
                <div className="container">
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

            <div className="Upcoming_Events">
                <div className="container">
                    <h2> Upcoming Events </h2>
                </div>
            </div>

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

                                    {/* The slideshow */}
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

            <div className="Membership_Swag">
                <div className="container">
                    <h2> Membership Swag </h2>
                    <div className="row" style={{ textAlign: "center" }}>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Products">
                                <div className="product-img">
                                    <img src={black_hat} />
                                </div>
                                <div className="product-text">
                                    <h3> Gray/Black Hat </h3>
                                </div>
                                <div className="product-btn">
                                    <Link
                                        to=""
                                        className="btn"
                                    >
                                        Purchase
                                    </Link>
                                </div> 
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Products">
                                <div className="product-img">
                                    <img src={green_hat} />
                                </div>
                                <div className="product-text">
                                    <h3> Green/Tan Hat </h3>
                                </div>
                                <div className="product-btn">
                                    <Link
                                        to=""
                                        className="btn"
                                    >
                                        Purchase
                                    </Link>
                                </div> 
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Products">
                                <div className="product-img">
                                    <img src={tan_hat} />
                                </div>
                                <div className="product-text">
                                    <h3> Gray/Tan Hat </h3>
                                </div>
                                <div className="product-btn">
                                    <Link
                                        to=""
                                        className="btn"
                                    >
                                        Purchase
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="Products">
                                <div className="product-img">
                                    <img src={allbirds} />
                                </div>
                                <div className="product-text">
                                    <h3> Actionable Insights Allbirds </h3>
                                </div>
                                <div className="product-btn">
                                    <Link
                                        to=""
                                        className="btn"
                                    >
                                        Purchase
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="View_More">
                        <Link
                            to=""
                            className="btn"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>

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

export default Main;