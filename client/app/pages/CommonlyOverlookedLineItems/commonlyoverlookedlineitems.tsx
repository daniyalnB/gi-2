import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const Comments = React.lazy(() => import("../../components/Comments"));
import { GetAllCommonlyOverlookedLineItemsCustomer } from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";

const CommonlyOverlookedLineItems = (props) => {
  
  const [loading, setLoading] = useState(true);

  const [path, setPath] = useState(location.pathname);

  const { getCustomerInfo, myInfo } = useContext(AppContext);

  useEffect(() => {
    if (localStorage.getItem("tokenCustomer") == null) {
    } else {
      getCustomerInfo();
    }
  }, []);

  const [subscriptionInfo, setSubscriptionInfo] = useState(false);
  const [ischilduser, setIsChildUser] = useState(false);

  useEffect(() => {
    setSubscriptionInfo(myInfo.subscriptioninfo);
    setIsChildUser(myInfo.ischilduser);
  }, [myInfo]);

  const [data, setData] = useState([]);
  const id = data.id;

  useEffect(() => {
    GetAllCommonlyOverlookedLineItemsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (lineitem) => lineitem.id === "424bf3ae-657d-499e-a275-d2873e1529e1"
        )[0];
        setData(x);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  return (
    <>
      <SEO
        title={
          data.tabtitle
            ? `${data.tabtitle}`
            : "Commonly Overlooked Line Items in Xactimate - Actionable Insights"
        }
        description="Database of Xactimate line items that are frequently warranted but consistently overlooked in estimates so you never miss them again. Explore now."
        link="commonly-overlooked-line-items"
      />
      <Suspense
        fallback={
          <div className="loader">
            <LottieLoader />
          </div>
        }
      >
        <ScrollToTop />
        <Navbar />
        <Breadcrumbs />
        <div className="main-container">
          <div className="COLI">
            <div className="">
              <div className="holder">
                <h2> Commonly Overlooked Line Items </h2>
                <h3>
                  Derived from an extensive analysis of{" "}
                  <Link to="/insight-sheets" target="_blank">
                    20,000+ Xactimate estimates
                  </Link>
                  {" "}in the Actionable Profile, we've discovered a variety of line items that are frequently warranted but consistently overlooked in invoices and estimates.
                  Exclusively for our Plus and Pro Plan members, we are thrilled to offer the Commonly Overlooked Line Items database.
                  This invaluable resource, derived from vast real-world data, ensures you are capturing what is warranted on each loss!
                </h3>
                <h3 className="mt-4">
                  Want to get reminders to include these line items when its appropriate to add them? Check out the{" "}
                  <Link to="/actionable-xactimate-profile" target="_blank">
                    Actionable Profile
                  </Link>
                  , our newest estimating tool that provides dynamic estimating guidance as you write your scope.
                </h3>
                <h3 className="mt-4">
                  Check out the{" "}
                  <Link to="/plan-matrix" target="_blank">
                    Pro Plan
                  </Link>
                  {" "}to make sure you never miss another Commonly Overlooked Line Item!
                </h3>
              </div>
              {!loading && (
                <>
                  <div className="overlook">
                    {localStorage.getItem("tokenCustomer") == null ? (
                      <div className="overlook-image-section">
                        <div className="col">
                          <div className="image-bg">
                            <div style={{ backgroundColor: "#000" }}>
                              <img
                                src={data.coverimage}
                                alt="Commonly Overlooked Line Items"
                                loading="lazy"
                              />
                              <Link
                                to="/my-account"
                                state={{ path: path }}
                              >
                                <button className="btn"> Sign In </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : ischilduser ? (
                      <div className="line_items_iframe_div">
                        <div className="embed-responsive">
                          <div className="iframe-main-view">
                            <iframe
                              src={data.iframeURL}
                              frameBorder="0"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    ) : subscriptionInfo ? (
                      <>
                        {subscriptionInfo.subscriptionstatus == "Cancelled" ||
                        subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                        subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                        subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                        subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                        subscriptionInfo.subscriptionstatus == "Paused" ||
                        subscriptionInfo.subscriptionstatus == "Trial" ? (
                          <div className="overlook-image-section">
                            <div className="col">
                              <div className="image-bg">
                                <div style={{ backgroundColor: "#000" }}>
                                  <img
                                    src={data.coverimage}
                                    alt="Commonly Overlooked Line Items"
                                    loading="lazy"
                                  />
                                  <Link to="/plan-matrix">
                                    <button className="btn">
                                      Update Plan
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="line_items_iframe_div">
                            <div className="embed-responsive">
                              <div className="iframe-main-view">
                                <iframe
                                  src={data.iframeURL}
                                  frameBorder="0"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="overlook-image-section">
                        <div className="col">
                          <div className="image-bg">
                            <div style={{ backgroundColor: "#000" }}>
                              <img
                                src={data.coverimage}
                                alt="Commonly Overlooked Line Items"
                                loading="lazy"
                              />
                              <Link to="/plan-matrix">
                                <button className="btn">
                                  Update Plan
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="question">
                    <h3>
                      {" "}
                      Did we miss anything? What line item(s) do you feel are
                      commonly overlooked?{" "}
                    </h3>
                  </div>
                  <Comments itemid={id} page="lineitems" />
                </>
              )}
              {loading && (
                <div className="loader-inner">
                  <LottieLoader />
                </div>
              )}
            </div>
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default CommonlyOverlookedLineItems;