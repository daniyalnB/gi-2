import React from 'react';
import { Link } from 'react-router-dom';
import black_hat from 'assets/Black_Hat.png';
import green_hat from 'assets/Green_Hat.png';
import tan_hat from 'assets/Tan_Hat.png';
import allbirds from 'assets/allbirds.png';

const SwagSection = () => {
    return (
        <>
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
        </>
    );
};

export default SwagSection;