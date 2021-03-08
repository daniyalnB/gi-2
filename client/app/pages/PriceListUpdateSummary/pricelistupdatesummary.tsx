import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const pricelistupdatesummary = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="PLUS">
                    <div className="container">
                        <div className="holder">
                            <h2> Price List Update Summary </h2>
                            <h3> Do you know what line items were added to the Price List last month? </h3>
                            <h3> Do you know why they were adopted? </h3>
                            <h3 className="nyd"> Now you do… </h3>
                            <h3> Have you identified a need for a new line item? Submit your request&nbsp;
                                <Link
                                    to=""
                                    className="here"
                                > 
                                    here 
                                </Link>
                                .
                            </h3>
                        </div>
                        <div className="summary">
                            <div className="summary_inner">
                                <div className="heading">
                                    <h3> Price List Update Summary – 2020 </h3>
                                </div>
                                <div className="summary_months">
                                    <div className="row months">
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                January
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                February
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12 ">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                March
                                            </Link>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row months">
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                April
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                May
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                June
                                            </Link>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row months">
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                July
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                August
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                September
                                            </Link>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row months">
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                October
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                November
                                            </Link>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <Link
                                                to="/pricelistupdatesummaryofmonth"
                                            >
                                                December
                                            </Link>
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

export default pricelistupdatesummary;