import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import primg from 'assets/DriHeatRadialProduct.png';

const product = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="product_page">
                    <div className="container">
                        <div className="row product">
                            <div className="col-5">    
                                <div className="image-section">
                                    <img src={primg} />
                                </div>      
                            </div>
                            <div className="col-7 ">
                                <div className="data-section">
                                    <div className="row">
                                        <div className="col-8">
                                            <h2 className="name"> Final Cleaning Product </h2>
                                        </div>
                                        <div className="col-4">
                                            <div style={{ textAlign: "right" }}>
                                                <h2 className="prevprice"> <del> $28.00 </del> </h2>
                                                <h2 className="price"> $28.00 </h2>
                                            </div>
                                            <h3 className="points"> or 280 Insighter Points </h3>
                                            <div style={{ textAlign: "right" }}>
                                                <div className="discount">
                                                    <span> Membership Discount </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="discription">
                                                <p>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                                </p>
                                            </div>
                                            <Link
                                                to='/buyproduct' 
                                                className="btn"
                                            >
                                                Buy
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
}

export default product;