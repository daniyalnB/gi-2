import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Commetns from '../../components/Comments';

const commonlyoverlookedlineitems = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="COLI">
                    <div className="container">
                        <div className="holder">
                            <h2> Commonly Overlooked Line Items </h2>
                            <h3> Through our travels and training, Actionable Insights has identified numerous line items that are often warranted but rarely included in invoices/estimates. </h3>
                            <h3> As a value-add to our Plus and Premium Plan Insighters, we have created a database of Commonly Overlooked Line Items to help ensure you are capturing what is warranted on each loss. Enjoy! </h3>
                        </div>
                        <div className="overlook">
                            <div className="row overlook-image-section">
                                <div className="col">
                                    <div className="image-bg">
                                        <div style={{ backgroundColor: "#000" }}>
                                            <img src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2019/09/16031548/line-item-mask.jpg" />
                                            <Link to="/login">
                                                <button className="btn"> Sign In </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Commetns />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default commonlyoverlookedlineitems;
    ;