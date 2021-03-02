import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const IRDetail = () => {
    return (
        <>
        <Navbar />
        <div className="main-container">
            <div className="IR_page">
                <div className="container">
                    <div className="holder">
                        <h2> Xactimate White Paper Labor Efficiencies Design </h2>
                    </div>
                    <div className="reports">
                        <div className="row">
                            <div className="col">
                                <div className="insighter_report_detail">
                                    <img 
                                        src="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2018/07/31224007/Xactware_White_Paper_Labor_Efficiencies_Design_Thumbnail_01_1024x3471.jpg"
                                    />
                                    <h3 className="name"> White Paper Excerpt: </h3>
                                    <h3 className="heading"> White Paper Excerpt: </h3>
                                    <p className="description">
                                        This document provides an overview of the features related to labor efficiency found in Xactimate version 28. 
                                        The first Labor Efficiencies design was introduced by Xactware beginning with Xactimate version 2002. 
                                        The features were implemented after analyzing the concerns of many customers from both the service provider and insurance carrier markets who desired a more accurate way of addressing economies of scale of labor among jobs.
                                    </p>
                                    <h3 className="heading"> The Goal of the Labor Efficiencies Design </h3>
                                    <p className="description">
                                        <p>
                                            Labor is generally the largest variable in construction-related tasks. 
                                            Factors such as job size and complexity, accessibility, and whether the structure is occupied all have a significant effect on the time needed to complete the work. 
                                            While labor productivity often varies between jobs, it is generally accepted in the industry that jobs can be categorized into one of two groups:
                                        </p>
                                        <p> 
                                            {`1) new construction and 2) restoration or remodeling.`} </p>
                                        <p>
                                            Within an estimate, customers can easily change their productivity default from Restoration/Service/Remodel to New Construction by checking the “New Construction” box.
                                        </p>
                                    </p>
                                    <div className="cr">
                                        <a 
                                            href="https://s3.amazonaws.com/getinsights-live/wp-content/uploads/2020/08/20001341/Labor_Efficiencies_Design.pdf"
                                            target="_blank"    
                                        >
                                            Continue Reading
                                        </a>
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

export default IRDetail;