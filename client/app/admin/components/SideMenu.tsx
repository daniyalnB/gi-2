import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "assets/Logo.svg";
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

export default function SideMenu(props) {
  console.log("Props", location.pathname);
  
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="admin-home">
        <div className="container-fluid">
          <div className="row" style={{ marginRight: "-5px" }}>
            <div className="col">
              <div className="side-menu">
                <div className="image-section">
                  <img src={logo} />
                </div>

                <div className="menu-section">
                  <ul>
                    <Link to="/admin/dashboard">
                      <li
                        className={
                          location.pathname === "/admin/dashboard" ? "active" : ""
                        }
                      >
                        {location.pathname === "/admin/dashboard" ? (
                          <img src={dashboardac} />
                        ) : (
                          <img src={dashboard} />
                        )}
                        <span> Dashboard </span>
                      </li>
                    </Link>

                    <Link to="/admin/insightsheet">
                      <li
                        className={
                          location.pathname === "/admin/insightsheet" ? "active" : ""
                        }
                      >
                        {location.pathname === "/admin/insightsheet" ? (
                          <img src={insightsheetsac} />
                        ) : (
                          <img src={insightsheets} />
                        )}
                          <span> Insight Sheets </span>
                      </li>
                    </Link>

                    <Link to="/admin/products">
                      <li
                        className={
                          location.pathname === "/admin/products" ? "active" : ""
                        }
                      >
                        {location.pathname === "/admin/products" ? (
                          <img src={productsac} />
                        ) : (
                          <img src={products} />
                        )}
                        <span> Products </span>
                      </li>
                    </Link>

                    <li className={active.Users ? "active" : ""}>
                      {active.Users ? (
                        <img src={usersac} />
                      ) : (
                        <img src={users} />
                      )}

                      <span> Users </span>
                    </li>
                   
                    <Link to="/admin/events">
                      <li
                        className={
                          location.pathname === "/admin/events" ? "active" : ""
                        }
                      >
                        {location.pathname === "/admin/events" ? (
                          <img src={eventsac} />
                        ) : (
                          <img src={events} />
                        )}
                        <span> Events </span>
                      </li>
                    </Link>

                    <li className={active.Subscriptions ? "active" : ""}>
                      {active.Subscriptions ? (
                        <img src={subscriptionsac} />
                      ) : (
                        <img src={subscriptions} />
                      )}

                      <span> Subscriptions </span>
                    </li>
                    <li className={active.Orders ? "active" : ""}>
                      {active.Orders ? (
                        <img src={ordersac} />
                      ) : (
                        <img src={orders} />
                      )}

                      <span> Orders </span>
                    </li>
                    <li className={active.ManageRoles ? "active" : ""}>
                      {active.ManageRoles ? (
                        <img src={managerolesac} />
                      ) : (
                        <img src={manageroles} />
                      )}

                      <span> Manage Roles </span>
                    </li>
                    <li className={active.InsighterPoints ? "active" : ""}>
                      {active.InsighterPoints ? (
                        <img src={insighterpointsac} />
                      ) : (
                        <img src={insighterpoints} />
                      )}

                      <span> Insighter Points </span>
                    </li>
                    <li className={active.VideoGallery ? "active" : ""}>
                      {active.VideoGallery ? (
                        <img src={videogalleryac} />
                      ) : (
                        <img src={videogallery} />
                      )}

                      <span> Video Gallery </span>
                    </li>
                    <li className={active.PriceList ? "active" : ""}>
                      {active.PriceList ? (
                        <img src={pricelistac} />
                      ) : (
                        <img src={pricelist} />
                      )}

                      <span> Price List Update Summary </span>
                    </li>
                    <li className={active.InsighterReport ? "active" : ""}>
                      {active.InsighterReport ? (
                        <img src={insighterreportac} />
                      ) : (
                        <img src={insighterreport} />
                      )}

                      <span> Insighter Report </span>
                    </li>
                    <li className={active.ViewAllComments ? "active" : ""}>
                      {active.ViewAllComments ? (
                        <img src={viewallcommentsac} />
                      ) : (
                        <img src={viewallcomments} />
                      )}

                      <span> View All Comments </span>
                    </li>
                    <li className={active.Coupons ? "active" : ""}>
                      {active.Coupons ? (
                        <img src={couponsac} />
                      ) : (
                        <img src={coupons} />
                      )}

                      <span> Coupons </span>
                    </li>
                    <li className={active.SubscriptionCoupons ? "active" : ""}>
                      {active.SubscriptionCoupons ? (
                        <img src={subscriptioncouponsac} />
                      ) : (
                        <img src={subscriptioncoupons} />
                      )}

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
}
