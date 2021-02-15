import React from 'react';
import SideMenu from "../../components/SideMenu";
import UserTab from "../../components/UserTab";
import productsac from "assets/ProductsActive.png";
import file from "assets/file.png";
import left from "assets/left_arrow.png";

export default function products (props) {

    return (
        <>
            <div className="products">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <SideMenu />
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <UserTab />
                            </div>
                            <div className="row products-section">
                                <div className="row header">
                                    <div className="col-12">
                                        <div className="page_icon">
                                            <img src={productsac} />
                                        </div>
                                        <h3 className="heading">
                                            Products
                                        </h3>
                                    </div>
                                </div>
                                <hr />
                                <div className="inner_sub_area">
                                    <div className="row products-data">
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Swag </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Gift Cards </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Macro </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-margin"></div>
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Umpire's Manual </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Certifications </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Estimate Engines </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-margin"></div>
                                        <div className="data">
                                            <div className="row">
                                                <div className="data-image-one">
                                                    <img src={file} />
                                                </div>
                                                <div className="data-text">
                                                    <h3> Insighter Points Buckets </h3>
                                                    
                                                    <h4> 23 Products </h4>
                                                </div>
                                                <div className="data-image-two">
                                                    <img src={left} />
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
