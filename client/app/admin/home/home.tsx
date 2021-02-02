import React from 'react';
import logo from "assets/Logo.png";

export default function home_admin () {
    return (
        <>
            <div className="admin-home">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-3">
                            <div className="side-menu">
                                
                                <div className="image-section">
                                    <img src={logo} />
                                </div>

                                <div className="menu-section">
                                    <ul>
                                        <li> Dashboard </li>
                                        <li> InsideSheet </li>
                                    </ul>
                                </div>
                            
                            </div>
                        </div>

                        <div className="col-9">
                            <div className="row user-info">
                                <div className="col">
                                     <h4> Hey, Daniyal </h4>
                                    <br />
                                    <h5> Admin </h5>
                                </div>
                                <div className="col">
                                    <img src={""} />
                                </div>
                            </div>
                        </div>

                    </div>
                 </div>
            </div>
        </>
     );
};