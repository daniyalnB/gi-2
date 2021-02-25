import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import StarRatingDemo from '../../components/StarRating';
import img1 from 'assets/DriHeatRadial2.png';

const IS = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="IS_page">
                    <div className="container">
                        <div className="holder">
                            <h2> Insight Sheets </h2>
                            <div className="separator">
                                <Search />
                                <div className="tutorial"> 
                                    <span> Not sure how to read an Insight Sheet? Check out the tutorial 
                                        <a> here. </a> 
                                    </span>
                                </div>
                                <div className="insight">
                                    <div className="row sheet">
                                        <div className="col-4 image-section">          
                                            <img src={img1} />
                                        </div>
                                        <div className="col-8 data-section">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h4>
                                                        <Link 
                                                            to="/insightsheetdetail"
                                                        >
                                                            Door Jamb Retrofit
                                                        </Link>
                                                    </h4>
                                                    <div className="data">
                                                        <span className="heading"> Category: </span>
                                                        <span className="value"> Repair </span>
                                                    </div>
                                                    <div className="data">
                                                        <span className="heading"> Principal Author(s): </span>
                                                        <span className="value"> Mark Whatley, Seth Harrison </span>
                                                    </div>
                                                    <div className="data">
                                                        <span className="heading"> AI Board Approval: </span>
                                                        <span className="value"> 06/14/2017 </span>
                                                    </div>
                                                    <div className="data">
                                                        <span className="heading"> Last Update: </span>
                                                        <span className="value"> 02/02/2020 </span>
                                                    </div>
                                                    <div className="data">
                                                        <span className="heading"> Tags: </span>
                                                        <span className="value"> Angle Stop, Backsplash, Cabinet, Caulk. </span>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <StarRatingDemo />
                                                </div>
                                            </div>
                                            <div className="row"> 
                                                <div className="col">
                                                    <div className="data">
                                                        <span className="heading"> Description: </span> <br />
                                                        <span className="value">  This is a residential (Class 2 | Cat 3) water loss. 
                                                                This loss contemplates a scenario where the door jambs were 
                                                                cut at 2 linear feet (along with the drywall) Read More
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

export default IS;