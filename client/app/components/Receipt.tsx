import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import env from '../../assets/envelope.png';

const Receipt = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="Receipt">
                    <div className="container">
                        <div className="holder">
                            <h2> Receipt </h2>
                            <h3> Thank you, your event registration details have been received. </h3>
                            {/* <h3> Thank you for buying a macro product. You can view it in  
                                <Link
                                    to=""
                                    className="downloads"
                                > 
                                    My Downloads 
                                </Link>
                                .
                            </h3> */}
                        </div>
                        <div className="order_data">
                            <div className="menu">
                                <ul>
                                    <li>
                                        <h4> Order Numner: </h4>
                                        <h5> 12081 </h5>
                                    </li>
                                    <li>
                                        <h4> Date: </h4>
                                        <h5> Jan 01, 2021 </h5>
                                    </li>
                                    <li>
                                        <h4> Email: </h4>
                                        <h5> example@example.com </h5>
                                    </li>
                                </ul>                      
                            </div>
                        </div>
                        <div className="order-info">
                            <div className="order">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> Order Details </h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-right"> Total </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="product_event">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> Final Cleaning Product × 1 </h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-right"> $14.00 </h3>
                                    </div>
                                </div>
                            </div>
                            <hr className="hr-two" />
                            <div className="details">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> Subtotal </h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-right"> $14.00 </h3>
                                    </div>
                                </div>
                            </div>
                            <hr className="hr-two" />
                            <div className="details">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> Coupon Applied </h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-right"> -$1.00 </h3>
                                    </div>
                                </div>
                            </div>
                            <hr className="hr-two" />
                            <div className="details">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> Insighter Points Applied </h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-right"> -$1.00 </h3>
                                    </div>
                                </div>
                            </div>
                            <hr className="hr-two" />
                            <div className="total">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> TOTAL </h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="text-right"> $12.00 </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-info">
                            <div className="order">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left"> Billing Information </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="billing_info">
                                <div className="row">
                                    <div className="col">
                                        <img src={env} />
                                        <h5> Matt Will </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="billing_info">
                                <div className="row">
                                    <div className="col">
                                        <img src={env} />
                                        <h5> example@example.com </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="billing_info">
                                <div className="row">
                                    <div className="col">
                                        <img src={env} />
                                        <h5> 234-578-2221 </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="billing_info">
                                <div className="row">
                                    <div className="col">
                                        <img src={env} />
                                        <h5> Corporate Alliance, 9540 Towne Centre Drive STE 150 San Diego, CA 92122 United States </h5>
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

export default Receipt;