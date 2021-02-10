import React, { useState } from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import logo from "assets/Logo.png";
import dashboard from "assets/Dashboard.png";
import dashboardac from "assets/DashboardActive.png";
import insightsheets from "assets/InsightSheets.png";
import insightsheetsac from "assets/InsightSheetsActive.png";
import products from "assets/Products.png";
import productsac from "assets/ProductsActive.png";
import users from "assets/Users.png";
import usersac from "assets/UsersActive.png";
import events from "assets/Events.png";
import eventsac from "assets/EventsActive.png";
import subscriptions from "assets/Subscriptions.png";
import subscriptionsac from "assets/SubscriptionsActive.png";
import orders from "assets/Orders.png";
import ordersac from "assets/OrdersActive.png";
import manageroles from "assets/ManageRoles.png";
import managerolesac from "assets/ManageRolesActive.png";
import insighterpoints from "assets/InsighterPoints.png";
import insighterpointsac from "assets/InsighterPointsActive.png";
import videogallery from "assets/VideoGallery.png";
import videogalleryac from "assets/VideoGalleryActive.png";
import pricelist from "assets/PriceList.png";
import pricelistac from "assets/PriceListActive.png";
import insighterreport from "assets/InsighterReport.png";
import insighterreportac from "assets/InsighterReportActive.png";
import viewallcomments from "assets/ViewAllComments.png";
import viewallcommentsac from "assets/ViewAllCommentsActive.png";
import coupons from "assets/Coupons.png";
import couponsac from "assets/CouponsActive.png";
import subscriptioncoupons from "assets/SubscriptionCoupons.png";
import subscriptioncouponsac from "assets/SubscriptionCouponsActive.png";


export default function SideMenu (props) {

    const [active, setActive] = useState({
        Dashboard: false,
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
                                            className={active.Dashboard ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: true,
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
                                               
                                               <Link
                                                to="/admin/dashboard"
                                            
                                            >
                                            {active.Dashboard ? <img src={dashboardac} /> : <img src={dashboard} />}
                                            
                                            <span> Dashboard </span>
                                            </Link>
                                        </li>
                                        
                                        
                                        <li 
                                            className={active.InsightSheets ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            <Link
                                                to="/admin/insightsheet"
                                                
                                            >
                                            {active.InsightSheets ? <img src={insightsheetsac} /> : <img src={insightsheets} />}
                                            
                                            <span> Insight Sheets </span>
                                            </Link>
                                        </li>
                                       
                                        <li 
                                            className={active.Products ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.Products ? <img src={productsac} /> : <img src={products} />}
                                            
                                            <span> Products </span>
                                        </li>
                                        <li 
                                            className={active.Users ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.Users ? <img src={usersac} /> : <img src={users} />}
                                            
                                            <span> Users </span>
                                        </li>
                                        <li 
                                            className={active.Events ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.Events ? <img src={eventsac} /> : <img src={events} />}
                                            
                                            <span> Events </span>
                                        </li>
                                        <li 
                                            className={active.Subscriptions ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.Subscriptions ? <img src={subscriptionsac} /> : <img src={subscriptions} />}
                                            
                                            <span> Subscriptions </span>
                                        </li>
                                        <li 
                                            className={active.Orders ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.Orders ? <img src={ordersac} /> : <img src={orders} />}
                                            
                                            <span> Orders </span>
                                        </li>
                                        <li 
                                            className={active.ManageRoles ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.ManageRoles ? <img src={managerolesac} /> : <img src={manageroles} />}
                                            
                                            <span> Manage Roles </span>
                                        </li>
                                        <li 
                                            className={active.InsighterPoints ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.InsighterPoints ? <img src={insighterpointsac} /> : <img src={insighterpoints} />}
                                            
                                            <span> Insighter Points </span>
                                        </li>
                                        <li 
                                            className={active.VideoGallery ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.VideoGallery ? <img src={videogalleryac} /> : <img src={videogallery} />}
                                            
                                            <span> Video Gallery </span>
                                        </li>
                                        <li 
                                            className={active.PriceList ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.PriceList ? <img src={pricelistac} /> : <img src={pricelist} />}
                                            
                                            <span> Price List Update Summary </span>
                                        </li>
                                        <li 
                                            className={active.InsighterReport ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.InsighterReport ? <img src={insighterreportac} /> : <img src={insighterreport} />}
                                            
                                            <span> Insighter Report </span>
                                        </li>
                                        <li 
                                            className={active.ViewAllComments ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.ViewAllComments ? <img src={viewallcommentsac} /> : <img src={viewallcomments} />}
                                            
                                            <span> View All Comments </span>
                                        </li>
                                        <li 
                                            className={active.Coupons ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.Coupons ? <img src={couponsac} /> : <img src={coupons} />}
                                            
                                            <span> Coupons </span>
                                        </li>
                                        <li 
                                            className={active.SubscriptionCoupons ? "active" : ""}
                                            onClick={() => setActive({
                                                Dashboard: false,
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
                                            {active.SubscriptionCoupons ? <img src={subscriptioncouponsac} /> : <img src={subscriptioncoupons} />}
                                            
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