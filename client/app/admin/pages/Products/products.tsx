import React from 'react';
import SideMenu from "../../components/SideMenu";
import UserTab from "../../components/UserTab";

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
                                <h2> Products </h2>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
};
