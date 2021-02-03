import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from "assets/Logo.png";

export default function login_admin () {

    return (
        <>
            <div className="admin-login">
                <div className="container-fluid">
                    
                    <div className="image-section">
                        <div className="logo">
                            <img src={logo} />
                        </div>
                    </div>
                    
                    <div className="text-section">
                        <h3> Sign In with your Actionalble Insights admin account. </h3>
                    </div>
                    
                    <div className="login_inner_Container">
                        <div className="form-holder">
                            <form>
                                <div className="row">
                                    <div className="col">

                                        <div className="form-group nogroup">
                                            <input type="text" name="Email" required id="inputField1" className="input-area"/>
                                            <label htmlFor="inputField1" className="floating_label"> Email </label>
                                        </div>

                                        <div className="form-group nogroup">
                                            <input type="password" name="Password" required id="inputField2" className="input-area"/>
                                            <label htmlFor="inputField2" className="floating_label"> Password </label>
                                        </div>
                                        
                                        <Link
                                            className="btn"
                                            to="/admin/home"
                                        >
                                            Sign In
                                        </Link>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
