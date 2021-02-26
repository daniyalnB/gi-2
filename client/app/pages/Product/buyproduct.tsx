import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import visa from 'assets/visa.png';
import mastercard from 'assets/mastercard.png';

const buyproduct = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="BuyProduct_page">
                    <div className="container">
                        <div className="holder">
                            <h2> Checkout </h2>
                            <div className="separator">
                                <h2> Contact Information </h2>
                                <div className="contact-info">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label> First Name </label> 
                                                    <b 
                                                        style={{ color: "red", fontSize: "25px"}}
                                                    >
                                                        *
                                                    </b>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    className="form-control"
                                                    placeholder="Enter"
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label> Last Name </label> 
                                                    <b 
                                                        style={{ color: "red", fontSize: "25px"}}
                                                    >
                                                        *
                                                    </b>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    className="form-control"
                                                    placeholder="Enter"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label> Billing Address </label> 
                                                    <b 
                                                        style={{ color: "red", fontSize: "25px"}}
                                                    >
                                                        *
                                                    </b>
                                                <input
                                                    type="text"
                                                    name="billingaddress"
                                                    className="form-control"
                                                    placeholder="Enter"
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label> Postal/ZIP </label> 
                                                    <b 
                                                        style={{ color: "red", fontSize: "25px"}}
                                                    >
                                                        *
                                                    </b>
                                                <input
                                                    type="text"
                                                    name="postalzip"
                                                    className="form-control"
                                                    placeholder="Enter"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="hr-one" />
                                <h2> Payment Information </h2>
                                <div className="payment-info">
                                    <div className="payment_card_list">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div className="col-1 text-center">
                                                        <input
                                                            type="radio"
                                                            id="one"
                                                            name="fruit-1"
                                                            defaultChecked={true}
                                                        />
                                                        <label
                                                            htmlFor="one"
                                                        ></label>
                                                    </div>
                                                    <div className="col-11">
                                                        <div className="selectable_card">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <img
                                                                        src={visa}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            <div className="col text-right card_text">
                                                                **** **** **** {"1234"}
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div className="col-1 text-center">
                                                        <input
                                                            type="radio"
                                                            id="two"
                                                            name="fruit-1"
                                                            defaultChecked={false}
                                                        />
                                                        <label
                                                            htmlFor="two"
                                                        ></label>
                                                    </div>
                                                    <div className="col-11">
                                                        <div className="selectable_card">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <img
                                                                        src={mastercard}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            <div className="col text-right card_text">
                                                                **** **** **** {"1234"}
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="Add_Card">
                                        <h3> Add Card </h3>
                                    </div>
                                </div>
                                <hr className="hr-one" />
                                <h2> Your Order </h2>
                                <div className="order-info">
                                    <div className="product">
                                    <div className="row">
                                        <div className="col">
                                                <h3 className="text-left"> Product </h3>
                                        </div>
                                        <div className="col">
                                                <h3 className="text-right"> Total </h3>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="assessment">
                                        <div className="row">
                                        <div className="col">
                                                <h3 className="text-left"> ZORA Mitigation Assessment x 1 </h3>
                                        </div>
                                        <div className="col">
                                                <h3 className="text-right"> $14.00 </h3>
                                        </div>
                                    </div>
                                    </div>
                                    <hr className="hr-two" />
                                    <div className="subtotal">
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
                                    <div className="coupon">
                                        <div className="row">
                                        <div className="col-4">
                                                <h3 className="text-left"> Coupon </h3>
                                        </div>
                                        <div className="col-6">
                                                <input
                                                    type="text"
                                                    name="coupon"
                                                    className="form-control"
                                                    placeholder="Coupon Code"
                                                />
                                                <button 
                                                    className="btn"
                                                >
                                                    Apply Coupon
                                                </button>
                                        </div>
                                        <div className="col-2">
                                                <h3 className="text-right"> -$1.00 </h3>
                                        </div>
                                    </div>
                                    </div>
                                    <hr className="hr-two" />
                                    <div className="insighter-points">
                                        <div className="row">
                                        <div className="col-4">
                                                <h3 className="text-left"> Insighter Points </h3>
                                                <div className="points-data">
                                                    <span> Current Insighter Points Balance </span> <span style={{ color: "#26A59A" }}> 330210 </span>
                                                </div>
                                                <div className="points-data">
                                                    <span> Insighter Points Needed For This Transaction </span> <span style={{ color: "#26A59A" }}> 150* </span>
                                                </div>
                                                <div className="points-data">
                                                    <span> *Coupon code discount notwithstanding </span>
                                                </div>
                                        </div>
                                        <div className="col-6">
                                                <input
                                                    type="number"
                                                    name="points"
                                                    className="form-control"
                                                    placeholder="# of Points"
                                                />
                                                <button 
                                                    className="btn"
                                                >
                                                    Apply
                                                </button>
                                        </div>
                                        <div className="col-2">
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
                                                <h3 className="text-right"> $5.00 </h3>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="tc">
                                    <input type="checkbox" id="c1" />
                                    <label htmlFor="c1">
                                        I've read and accept 
                                        <span style={{ color: "#26A59A" }}> the Terms & Conditions </span>
                                        <b 
                                            className="red"
                                        >
                                            *
                                        </b>
                                    </label>
                                </div>
                                <div className="checkout">
                                    <Link
                                        to=""
                                        className="btn"
                                    >
                                        Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default buyproduct;