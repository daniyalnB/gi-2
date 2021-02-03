import React, { useState } from 'react';
import power from "assets/Power.png";

export default function UserTab () {
    return (
        <>
            <div className="admin-home">
                <div className="container-fluid" style={{ padding: "0px" }}>
                    <div className="row">
                        <div className="col">
                            
                            <div className="row user-info">
                                <div className="col-11 text-right">
                                     <h4> Hey, Daniyal </h4>
                                    <br />
                                    <h5> Admin </h5>
                                </div>
                                <div className="col-1">
                                    <img src={power} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};