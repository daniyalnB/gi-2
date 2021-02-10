import React from 'react';
import SideMenu from "../../components/SideMenu";
import UserTab from "../../components/UserTab";

export default function dashboard (props) {

    return (
        <>
            <div className="dashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <SideMenu />
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <UserTab />
                            </div>
                            <div className="row dashboard-section">
                                <h2> Dashboard </h2>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};
