import React, { useState } from 'react';
import logo from "assets/Logo.png";
import dashboard from "assets/Dashboard.svg";
import insightsheets from "assets/InsightSheets.svg";
import products from "assets/Products.svg";
import users from "assets/Users.svg";
import events from "assets/Events.svg";
import subscriptions from "assets/Subscriptions.svg";
import orders from "assets/Orders.svg";
import manageroles from "assets/ManageRoles.svg";
import insighterpoints from "assets/InsighterPoints.svg";
import videogallery from "assets/VideoGallery.svg";
import pricelist from "assets/PriceList.svg";
import insighterreport from "assets/InsighterReport.svg";
import viewallcomments from "assets/ViewAllComments.svg";
import coupons from "assets/Coupons.svg";
import subscriptioncoupons from "assets/SubscriptionCoupons.svg";


export default function SideMenu () {

    const [active, setActive] = useState({
        Dahboard: false,
        InsightSheets: false,
        Products: false,
        Users: false,
        Events: false,
        Subscriptions: false,
        Orders: false,
        ManageRoles: false,
        InsighterPoints: false,
        VideoGallery: false,
        PriceList: false,
        InsighterReport: false,
        ViewAllComments: false,
        Coupons: false,
        SubscriptionCoupons: false
    });

    return (
        <>
            <div className="admin-home">
                <div className="container-fluid">
                    <div className="row" style={{ marginRight: "-5px"}}>
                        <div className="col">
                            <div className="side-menu">
                                
                                <div className="image-section">
                                    <img src={logo} />
                                </div>

                                <div className="menu-section">
                                    <ul>
                                        <li 
                                            className={active.Dahboard ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: true,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Dahboard ? <img src={dashboard} /> : <img src={dashboard} />}
                                            
                                            <span> Dashboard </span>
                                        </li>
                                        <li 
                                            className={active.InsightSheets ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: true,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.InsightSheets ? <img src={insightsheets} /> : <img src={insightsheets} />}
                                            
                                            <span> Insight Sheets </span>
                                        </li>
                                        <li 
                                            className={active.Products ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: true,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Products ? <img src={products} /> : <img src={products} />}
                                            
                                            <span> Products </span>
                                        </li>
                                        <li 
                                            className={active.Users ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: true,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Users ? <img src={users} /> : <img src={users} />}
                                            
                                            <span> Users </span>
                                        </li>
                                        <li 
                                            className={active.Events ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: true,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Events ? <img src={events} /> : <img src={events} />}
                                            
                                            <span> Events </span>
                                        </li>
                                        <li 
                                            className={active.Subscriptions ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: true,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Subscriptions ? <img src={subscriptions} /> : <img src={subscriptions} />}
                                            
                                            <span> Subscriptions </span>
                                        </li>
                                        <li 
                                            className={active.Orders ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: true,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Orders ? <img src={orders} /> : <img src={orders} />}
                                            
                                            <span> Orders </span>
                                        </li>
                                        <li 
                                            className={active.ManageRoles ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: true,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.ManageRoles ? <img src={manageroles} /> : <img src={manageroles} />}
                                            
                                            <span> Manage Roles </span>
                                        </li>
                                        <li 
                                            className={active.InsighterPoints ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: true,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.InsighterPoints ? <img src={insighterpoints} /> : <img src={insighterpoints} />}
                                            
                                            <span> Insighter Points </span>
                                        </li>
                                        <li 
                                            className={active.VideoGallery ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: true,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.VideoGallery ? <img src={videogallery} /> : <img src={videogallery} />}
                                            
                                            <span> Video Gallery </span>
                                        </li>
                                        <li 
                                            className={active.PriceList ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: true,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.PriceList ? <img src={pricelist} /> : <img src={pricelist} />}
                                            
                                            <span> Price List Update Summary </span>
                                        </li>
                                        <li 
                                            className={active.InsighterReport ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: true,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.InsighterReport ? <img src={insighterreport} /> : <img src={insighterreport} />}
                                            
                                            <span> Insighter Report </span>
                                        </li>
                                        <li 
                                            className={active.ViewAllComments ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: true,
                                                Coupons: false,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.ViewAllComments ? <img src={viewallcomments} /> : <img src={viewallcomments} />}
                                            
                                            <span> View All Comments </span>
                                        </li>
                                        <li 
                                            className={active.Coupons ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: true,
                                                SubscriptionCoupons: false
                                            })}   
                                        >
                                            {active.Coupons ? <img src={coupons} /> : <img src={coupons} />}
                                            
                                            <span> Coupons </span>
                                        </li>
                                        <li 
                                            className={active.SubscriptionCoupons ? "active" : ""}
                                            onClick={() => setActive({
                                                Dahboard: false,
                                                InsightSheets: false,
                                                Products: false,
                                                Users: false,
                                                Events: false,
                                                Subscriptions: false,
                                                Orders: false,
                                                ManageRoles: false,
                                                InsighterPoints: false,
                                                VideoGallery: false,
                                                PriceList: false,
                                                InsighterReport: false,
                                                ViewAllComments: false,
                                                Coupons: false,
                                                SubscriptionCoupons: true
                                            })}   
                                        >
                                            {active.SubscriptionCoupons ? <img src={subscriptioncoupons} /> : <img src={subscriptioncoupons} />}
                                            
                                            <span> Subscription Coupons </span>
                                        </li>
                                    </ul>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </>
     );
};