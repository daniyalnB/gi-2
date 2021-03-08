import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const solidifai = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="Solidifai_Zora">
                    <div className="container">
                        <div className="holder">
                            <h2> Solidifai (Estimate Edit Engine) </h2>
                            <h3> 
                                Click&nbsp; 
                                <Link
                                    to=""
                                    className="here"
                                > 
                                    here 
                                </Link>
                                &nbsp;to review an example Solidifai analysis.
                            </h3>
                         </div>
                        <div className="analysis">
                            <div className="row analysis-image-section">
                                <div className="col">
                                    <div className="image-bg">
                                        <div style={{ backgroundColor: "#000" }}>
                                            <img src="https://www.getinsights.org/wp-content/themes/onepress-child/assets/images/updated_solidifaimask.png" />
                                            <Link to="/login">
                                                <button className="btn"> Update Plan </button>
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

export default solidifai;
    ;