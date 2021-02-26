import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
import one from 'assets/one.jpg';
import two from 'assets/two.jpg';
import three from 'assets/three.jpg';
import four from 'assets/four.jpg';
import five from 'assets/five.jpg';
import six from 'assets/six.jpg';
import seven from 'assets/seven.jpg';

const SliderSection = () => {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="container" style={{ zIndex: "99999"}}>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="S-4xzDNQvxo" onClose={() => setOpen(false)} />
            </div>
            
            <div className="slider-section">
                <div className="container-fluid">
                    <div id="demo" className="carousel slide" data-ride="carousel" data-interval="5000">
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
                                            <a>
                                                <i 
                                                    className="fa fa-play"
                                                    onClick={()=> setOpen(true)}
                                                >
                                                </i>
                                                <img src="https://www.getinsights.org/wp-content/themes/onepress-child/assets/images/yt-video-img.jpg" alt="" draggable="false" />
                                            </a>
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
  
  export default SliderSection;