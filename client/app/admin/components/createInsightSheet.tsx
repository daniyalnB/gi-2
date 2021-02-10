import React from 'react';
import SideMenu from "../../admin/components/SideMenu";
import UserTab from "../../admin/components/UserTab";

export default function CreateInsightSheet (props) {

    return (
        <>
            <div className="insightsheet">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <SideMenu />
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <UserTab />
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};