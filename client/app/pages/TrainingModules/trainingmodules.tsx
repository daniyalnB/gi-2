import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const trainingmodules = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="Training_Modules">
                    <div className="container">
                        <div className="holder">
                            <h2> Explore Our 3D Training Modules </h2>
                            <h3> Actionable Insights has taken Xactimate estimating training to the next level. We train off of real-life losses captured by Matterport’s technology. Our students leverage these 3D tours as they compete against one another to write the most accurate mitigation and repair scopes. </h3>
                            <h3 className="below"> Below you can explore the 3D tours in anticipation of our next Xactimate Estimating Training class! </h3>
                        </div>
                        <hr />
                        <div className="Xactimate_Estimating_Training">
                            <h2> Xactimate Estimating Training </h2>
                        </div>
                        <div className="Mitigation">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12">
                                    <h3> Pre-Mitigation </h3>
                                    <div className="mitigation_border">
                                        <iframe 
                                            src="https://my.matterport.com/show/?m=eCsvANPp7Dn&brand=0" 
                                            frameBorder="0" 
                                            allowFullScreen 
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12">
                                    <h3> Post-Mitigation </h3>
                                    <div className="mitigation_border">
                                        <iframe 
                                            src="https://my.matterport.com/show/?m=S9X5VbMx8CU&brand=0" 
                                            frameBorder="0" 
                                            allowFullScreen 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="uc">
                            <Link
                                to="/events"
                                className="btn"
                            >
                                See Upcoming Classes
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default trainingmodules;