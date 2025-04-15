import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "assets/Logo.svg";
import dashboard from "assets/Dashboard.svg";
import dashboardac from "assets/DashboardActive.svg";
import insightsheets from "assets/InsightSheets.svg";
import insightsheetsac from "assets/InsightSheetsActive.svg";
import products from "assets/Products.svg";
import productsac from "assets/ProductsActive.svg";
import users from "assets/Users.svg";
import usersac from "assets/UsersActive.svg";
import events from "assets/Events.svg";
import eventsac from "assets/EventsActive.svg";
import subscriptions from "assets/Subscriptions.svg";
import subscriptionsac from "assets/SubscriptionsActive.svg";
import orders from "assets/Orders.svg";
import ordersac from "assets/OrdersActive.svg";
import manageroles from "assets/ManageRoles.svg";
import managerolesac from "assets/ManageRolesActive.svg";
import insighterpoints from "assets/InsighterPoints.svg";
import insighterpointsac from "assets/InsighterPointsActive.svg";
import videogallery from "assets/VideoGallery.svg";
import videogalleryac from "assets/VideoGalleryActive.svg";
import pricelist from "assets/PriceList.svg";
import pricelistac from "assets/PriceListActive.svg";
import insighterreport from "assets/InsighterReport.svg";
import insighterreportac from "assets/InsighterReportActive.svg";
import viewallcomments from "assets/ViewAllComments.svg";
import viewallcommentsac from "assets/ViewAllCommentsActive.svg";
import coupons from "assets/Coupons.svg";
import couponsac from "assets/CouponsActive.svg";
import subscriptioncoupons from "assets/SubscriptionCoupons.svg";
import subscriptioncouponsac from "assets/SubscriptionCouponsActive.svg";
import commonlyusedlineitems from "assets/CommonlyUsedLineItems.svg";
import commonlyusedlineitemsac from "assets/CommonlyUsedLineItemsActive.svg";
import reporting from "assets/Reporting.svg";
import reportingac from "assets/ReportingActive.svg";
import mediarelease from "assets/MediaRelease.svg";
import mediareleaseac from "assets/MediaReleaseActive.svg";
import xactimatesketchgallery from "assets/XactimateSketchGallery.svg";
import xactimatesketchgalleryac from "assets/XactimateSketchGalleryActive.svg";
import livestreamzone from "assets/LiveStreamZone.svg";
import livestreamzoneac from "assets/LiveStreamZoneActive.svg";
import aiprofilelogos from "assets/AiProfileLogos.svg";
import aiprofilelogosac from "assets/AiProfileLogosActive.svg";
import blog from "assets/Blog.svg";
import blogac from "assets/BlogActive.svg";

const SideMenu = (props) => {

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
                    <Link to="/gi-team/dashboard">
                      <li
                        className={
                          location.pathname === "/gi-team/dashboard"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/dashboard" ? (
                          <img src={dashboardac} />
                        ) : (
                          <img src={dashboard} />
                        )}
                        <span> Dashboard </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/insight-sheets">
                      <li
                        className={
                          location.pathname === "/gi-team/insight-sheets"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/insight-sheets" ? (
                          <img src={insightsheetsac} />
                        ) : (
                          <img src={insightsheets} />
                        )}
                        <span> Insight Sheets </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/products">
                      <li
                        className={
                          location.pathname === "/gi-team/products"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/products" ? (
                          <img src={productsac} />
                        ) : (
                          <img src={products} />
                        )}
                        <span> Products </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/users">
                      <li
                        className={
                          location.pathname === "/gi-team/users" ? "active" : ""
                        }
                      >
                        {location.pathname === "/gi-team/users" ? (
                          <img src={usersac} />
                        ) : (
                          <img src={users} />
                        )}
                        <span> Users </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/events">
                      <li
                        className={
                          location.pathname === "/gi-team/events"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/events" ? (
                          <img src={eventsac} />
                        ) : (
                          <img src={events} />
                        )}
                        <span> Events </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/subscriptions">
                      <li
                        className={
                          location.pathname === "/gi-team/subscriptions"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/subscriptions" ? (
                          <img src={subscriptionsac} />
                        ) : (
                          <img src={subscriptions} />
                        )}
                        <span> Subscriptions </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/orders">
                      <li
                        className={
                          location.pathname === "/gi-team/orders"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/orders" ? (
                          <img src={ordersac} />
                        ) : (
                          <img src={orders} />
                        )}
                        <span> Orders </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/manage-roles">
                      <li
                        className={
                          location.pathname === "/gi-team/manage-roles"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/manage-roles" ? (
                          <img src={managerolesac} />
                        ) : (
                          <img src={manageroles} />
                        )}
                        <span> Manage Roles </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/insighter-points">
                      <li
                        className={
                          location.pathname === "/gi-team/insighter-points"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/insighter-points" ? (
                          <img src={insighterpointsac} />
                        ) : (
                          <img src={insighterpoints} />
                        )}
                        <span> Insighter Points </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/video-gallery">
                      <li
                        className={
                          location.pathname === "/gi-team/video-gallery"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/video-gallery" ? (
                          <img src={videogalleryac} />
                        ) : (
                          <img src={videogallery} />
                        )}
                        <span> Video Gallery </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/price-list-update-summary">
                      <li
                        className={
                          location.pathname ===
                          "/gi-team/price-list-update-summary"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/price-list-update-summary" ? (
                          <img src={pricelistac} />
                        ) : (
                          <img src={pricelist} />
                        )}
                        <span> Price List Update Summary </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/insighter-report">
                      <li
                        className={
                          location.pathname === "/gi-team/insighter-report"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/insighter-report" ? (
                          <img src={insighterreportac} />
                        ) : (
                          <img src={insighterreport} />
                        )}
                        <span> Insighter Report </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/view-all-comments">
                      <li
                        className={
                          location.pathname === "/gi-team/view-all-comments"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/view-all-comments" ? (
                          <img src={viewallcommentsac} />
                        ) : (
                          <img src={viewallcomments} />
                        )}
                        <span> View All Comments </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/product-coupons">
                      <li
                        className={
                          location.pathname === "/gi-team/product-coupons"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/product-coupons" ? (
                          <img src={couponsac} />
                        ) : (
                          <img src={coupons} />
                        )}
                        <span> Product Coupons </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/subscription-coupons">
                      <li
                        className={
                          location.pathname === "/gi-team/subscription-coupons"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/subscription-coupons" ? (
                          <img src={subscriptioncouponsac} />
                        ) : (
                          <img src={subscriptioncoupons} />
                        )}
                        <span> Subscription Coupons </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/commonly-used-line-items">
                      <li
                        className={
                          location.pathname ===
                          "/gi-team/commonly-used-line-items"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/commonly-used-line-items" ? (
                          <img src={commonlyusedlineitemsac} />
                        ) : (
                          <img src={commonlyusedlineitems} />
                        )}
                        <span> Commonly Used Line Items </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/xactimate-sketch-gallery">
                      <li
                        className={
                          location.pathname ===
                          "/gi-team/xactimate-sketch-gallery"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/xactimate-sketch-gallery" ? (
                          <img src={xactimatesketchgalleryac} />
                        ) : (
                          <img src={xactimatesketchgallery} />
                        )}
                        <span> Xactimate Sketch Gallery </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/media-release">
                      <li
                        className={
                          location.pathname === "/gi-team/media-release"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/media-release" ? (
                          <img src={mediareleaseac} />
                        ) : (
                          <img src={mediarelease} />
                        )}
                        <span> Media Release </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/reporting">
                      <li
                        className={
                          location.pathname === "/gi-team/reporting"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname === "/gi-team/reporting" ? (
                          <img src={reportingac} />
                        ) : (
                          <img src={reporting} />
                        )}
                        <span> Reporting </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/actionable-xactimate-profile">
                      <li
                        className={
                          location.pathname ===
                          "/gi-team/actionable-xactimate-profile"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/actionable-xactimate-profile" ? (
                          <img src={aiprofilelogosac} />
                        ) : (
                          <img src={aiprofilelogos} />
                        )}
                        <span> AI Profile Logos </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/live-stream-zone">
                      <li
                        className={
                          location.pathname ===
                          "/gi-team/live-stream-zone"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/live-stream-zone" ? (
                          <img src={livestreamzoneac} />
                        ) : (
                          <img src={livestreamzone} />
                        )}
                        <span> Live Stream Zone </span>
                      </li>
                    </Link>

                    <Link to="/gi-team/blog">
                      <li
                        className={
                          location.pathname ===
                          "/gi-team/blog"
                            ? "active"
                            : ""
                        }
                      >
                        {location.pathname ===
                        "/gi-team/blog" ? (
                          <img src={blogac} />
                        ) : (
                          <img src={blog} />
                        )}
                        <span> Blog </span>
                      </li>
                    </Link>
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

export default SideMenu;