import React from 'react';
import { Link } from 'react-router-dom';
import StarRatingDemo from '../../components/StarRating';
import img1 from 'assets/DriHeatRadial2.png';
import search1 from 'assets/search1.png';
import search2 from 'assets/search2.png';

const ISD = () => {
    return (
        <>
            <div className="ISD_page">
                <div className="container-fluid">
                    <div className="holder">
                        <h2> Inside Sheets </h2>
                        <div className="separator">
                            <div className="form-group nogroup">
                                <div className="input-group">
                                    <img className="input_icon" src={search1}></img>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Search by keywords"
                                        required
                                    />
                                    <img className="input_icon" src={search2}></img>
                                </div>
                            </div>
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
        </>
    );
};

export default ISD;