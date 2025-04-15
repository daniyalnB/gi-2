import React, { Suspense, useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
import NotFound from "../../components/NotFound";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const Search = React.lazy(() => import("../../components/Search"));
const Comments = React.lazy(() => import("../../components/Comments"));
import {
  GetAllInsightSheetsCustomer,
  GetInsightSheetByPermalink,
  UpdateInsightSheetRating,
} from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import history from "../../../utils/history";
import moment from "moment";
import queryString from "query-string";
import Rating from "@material-ui/lab/Rating";
import Lightbox from "react-image-lightbox";

const InsightSheetDetail = (props) => {

  const [show, setShow] = useState(true);
  
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
    if (myInfo) {
      setSubscriptionInfo(myInfo.subscriptioninfo);
      setIsChildUser(myInfo.ischilduser);
    }
  }, [myInfo]);

  const [data, setData] = useState(false);
  const id = data.id;

  const [allInsightSheets, setAllInsightSheets] = useState([]);

  const [previews, setPreviews] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    GetInsightSheetByPermalink(props.match.params.permalink).subscribe(
      (response) => {
        if (response.response.Requested_Action) {
          const x = response.response.data;
          if (x == undefined) {
            setShow(false);
          }
          GetAllInsightSheetsCustomer().subscribe((response) => {
            if (response.response.Requested_Action) {
              const y = response.response.data;
              const publisheddata = y.filter((val) => val.draft === false);
              setAllInsightSheets(publisheddata);
            }
          });
          setData(x);
          setLoading(false);
          var element = document.getElementsByClassName("imagepreview");
          if (element) {
            var images = [];
            for (var i = 0; i < element.length; i++) {
              images.push(element[i].src);
              if (images.length > 1) {
                setPreviews(images);
                console.log(previews, "previews");
              } else {
                setPreviews(images);
                console.log(previews, "previews");
              }
              element[i].addEventListener("click", function () {
                handleOpen();
              });
            }
          }
        } else {
          setShow(false);
        }
      }
    );
  }, []);

  const [rating, setRating] = useState({
    insightsheetid: "",
    rating: "",
  });

  const handleSubmit = (id, rating) => {
    const payload = {
      insightsheetid: id,
      rating: rating,
    };

    const stringified = queryString.stringify(payload);

    UpdateInsightSheetRating(stringified).subscribe((response) => {
      if (response) {
        setRating({
          insightsheetid: "",
          rating: "",
        });
        refresh_rating();
      }
    });
  };

  function refresh_rating() {
    GetInsightSheetByPermalink(props.match.params.permalink).subscribe(
      (response) => {
        if (response.response.Requested_Action) {
          const x = response.response.data;
          setData(x);
        }
      }
    );
  }

  return (
    <>
      {show ? (
        <>
          <SEO
            title={
              data
                ? data.metatitle || data.metatitle !== null
                  ? `${data.metatitle}`
                  : `${data.title}`
                : "Actionable Insights"
            }
            description={
              data.metadescription || data.metadescription !== null
                ? `${data.metadescription}`
                : `${data.featureddescription.substring(0, 160)}`
            }
            link={`insight-sheets/${data.permalink}`}
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
            <Breadcrumbs data={data} />
            <div className="main-container">
              <div className="ISDetail_page">
                <div className="">
                  <div className="holder">
                    <h2> Insight Sheets </h2>
                    <div className="separator">
                      <h5> Search Insight Sheet Database </h5>
                      <Search data={allInsightSheets} />
                      {!loading && (
                        <>
                          <div className="detail">
                            <h2> {data.title} </h2>
                            <div
                              className="row"
                              style={
                                localStorage.getItem("tokenCustomer") == null
                                  ? { margin: "0px" }
                                  : (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Active") ||
                                    subscriptionInfo.subscriptionstatus == "PendingCancellation" ||
                                    subscriptionInfo.subscriptionstatus == "Trial" ||
                                    ischilduser
                                  ? {}
                                  : { margin: "0px" }
                              }
                            >
                              {localStorage.getItem("tokenCustomer") == null ? (
                                <div className="image-section">
                                  <div className="insight_sheets_image_div">
                                    <div className="mask_insight_sheet">
                                      <div className="row insight_sheet_row_mask">
                                        <Link
                                          className="btn btns_mask"
                                          to={{
                                            pathname: "/my-account",
                                            state: {
                                              path: path,
                                            },
                                          }}
                                        >
                                          Sign In
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="image-hide">
                                      <img
                                        src={data.featureimage}
                                        alt={data.title}
                                        loading="lazy"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {(subscriptionInfo && subscriptionInfo.subscriptionstatus == "Active") ||
                                    subscriptionInfo.subscriptionstatus == "PendingCancellation" ||
                                    subscriptionInfo.subscriptionstatus == "Trial" ||
                                    ischilduser ? (
                                    <div className="insight_sheets_page_thumb col-lg-6">
                                      <div className="insight_sheets_iframe_div">
                                        <div className="iframe-slides">
                                          <iframe
                                            src={data.iframeurl}
                                            frameBorder="0"
                                            allowFullScreen
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="image-section">
                                      <div className="insight_sheets_image_div">
                                        <div className="mask_insight_sheet">
                                          <div className="row insight_sheet_row_mask">
                                            <Link
                                              className="btn btns_mask"
                                              to="/plan-matrix"
                                            >
                                              Update Plan
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="image-hide">
                                          <img
                                            src={data.featureimage}
                                            alt={data.title}
                                            loading="lazy"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                              <div
                                className={
                                  localStorage.getItem("tokenCustomer") == null
                                    ? "data-section"
                                    : (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Active") ||
                                      subscriptionInfo.subscriptionstatus == "PendingCancellation" ||
                                      subscriptionInfo.subscriptionstatus == "Trial" ||
                                      ischilduser
                                    ? "data-section data-section-active"
                                    : "data-section"
                                }
                              >
                                <div className="data">
                                  <span className="heading"> Category: </span>
                                  <span className="value"> {data.catagory} </span>
                                </div>
                                <div className="data">
                                  <span className="heading">
                                    {" "}
                                    Principal Author(s):{" "}
                                  </span>
                                  <span className="value">
                                    {" "}
                                    {data.principleauthor}{" "}
                                  </span>
                                </div>
                                <div className="data">
                                  <span className="heading">
                                    {" "}
                                    AI Board Approval:{" "}
                                  </span>
                                  <span className="value">
                                    {moment(data.alboardapproval).format(
                                      "MM/DD/YYYY"
                                    )}
                                  </span>
                                </div>
                                <div className="data">
                                  <span className="heading"> Last Update: </span>
                                  <span className="value">
                                    {moment(data.lastupdate).format("MM/DD/YYYY")}
                                  </span>
                                </div>
                                <div className="data">
                                  <span className="heading"> Tags: </span>
                                  <span className="value"> {data.tags} </span>
                                </div>
                                <div className="rating">
                                  <Rating
                                    size="large"
                                    name={data.id}
                                    value={data.averagerating || 0}
                                    precision={0.5}
                                    readOnly={
                                      localStorage.getItem("tokenCustomer") == null
                                        ? true
                                        : false
                                    }
                                    onChange={(event, newValue) => {
                                      [
                                        (setRating({
                                          ...rating,
                                          insightsheetid: data.id,
                                          rating: newValue,
                                        }),
                                        handleSubmit(data.id, newValue)),
                                      ];
                                    }}
                                  />
                                  <div className="rating_1">
                                    <span className="span-rating-1">
                                      (
                                      <span className="span-1">
                                        {data.totalratingcount == null
                                          ? "0"
                                          : data.totalratingcount}
                                      </span>
                                      <span className="span-2">
                                        &nbsp;votes, average:&nbsp;
                                      </span>
                                      <span className="span-3">
                                        {data.averagerating == undefined
                                          ? "0"
                                          : data.averagerating.toFixed(2)}
                                      </span>
                                      <span className="span-4">
                                        &nbsp;out of&nbsp;
                                      </span>
                                      <span className="span-5">5</span>)
                                    </span>
                                    <br />
                                    {localStorage.getItem("tokenCustomer") ==
                                    null ? (
                                      <span className="span-rating-2">
                                        You need to be a registered member to rate
                                        this.
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="MACRO">
                                  {localStorage.getItem("tokenCustomer") == null ? (
                                    <Link
                                      to={{
                                        pathname: "/my-account",
                                        state: {
                                          path: path,
                                        },
                                      }}
                                      className="btn"
                                    >
                                      Purchase MACRO*
                                    </Link>
                                  ) : ischilduser ? (
                                    <Link
                                      to={
                                        data.macro
                                          ? `/shop/macros/${data.macro.permalink}`
                                          : ""
                                      }
                                      className="btn"
                                    >
                                      Purchase MACRO*
                                    </Link>
                                  ) : (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Cancelled") ||
                                    subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                                    subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                                    subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                                    subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                                    subscriptionInfo.subscriptionstatus == "Paused" ||
                                    subscriptionInfo.subscriptionstatus == "Trial" ? (
                                    <button
                                      className="btn"
                                      disabled
                                    >
                                      Purchase MACRO*
                                    </button>
                                  ) : (
                                    <Link
                                      to={
                                        data.macro
                                          ? `/shop/macros/${data.macro.permalink}`
                                          : ""
                                      }
                                      className="btn"
                                    >
                                      Purchase MACRO*
                                    </Link>
                                  )}
                                  <br />
                                  {localStorage.getItem("tokenCustomer") == null ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Cancelled") ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "TrialCancelled") ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "NoActivePlan") ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "CancellationPending") ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure") ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Paused") ||
                                  (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Trial") ? (
                                    <>
                                      {myInfo && myInfo.ischilduser ? (
                                        ""
                                      ) : (
                                        <div className="Subscription">
                                          <span>
                                            *Purchasing Requires
                                          </span>
                                          <Link to="/plan-matrix">
                                            Plus Plan Subscription
                                          </Link>
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="description">
                            <h2> Description </h2>
                            <div className="row">
                              <div className="col word">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `${
                                      data.description
                                        ? data.description
                                            .replace(/(<p><\/p>)/g, `<br>`)
                                            .replace(
                                              /<img/g,
                                              `<img class='imagepreview'`
                                            )
                                        : ""
                                    }`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {isOpen && previews.length > 1 && (
                              <Lightbox
                                mainSrc={previews[photoIndex]}
                                nextSrc={
                                  previews[(photoIndex + 1) % previews.length]
                                }
                                prevSrc={
                                  previews[
                                    (photoIndex + previews.length - 1) %
                                      previews.length
                                  ]
                                }
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() =>
                                  setPhotoIndex(
                                    (photoIndex + previews.length - 1) %
                                      previews.length
                                  )
                                }
                                onMoveNextRequest={() =>
                                  setPhotoIndex((photoIndex + 1) % previews.length)
                                }
                              />
                            )}
                            {isOpen && previews.length == 1 && (
                              <Lightbox
                                mainSrc={previews[photoIndex]}
                                onCloseRequest={() => setIsOpen(false)}
                              />
                            )}
                          </div>
                          <div className="xact">
                            <h2> As Seen In Xact </h2>
                            <div className="row xact-image-section">
                              {localStorage.getItem("tokenCustomer") == null ? (
                                <div className="col">
                                  <div className="image-bg">
                                    <div style={{ backgroundColor: "#000" }}>
                                      <img
                                        src={data.xactiframeimage}
                                        alt={data.title}
                                        loading="lazy"
                                      />
                                      <Link
                                        to={{
                                          pathname: "/my-account",
                                          state: {
                                            path: path,
                                          },
                                        }}
                                      >
                                        <button className="btn"> Sign In </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {ischilduser ? (
                                    <div className="line_items_iframe_div">
                                      <div className="embed-responsive">
                                        <div className="iframe-main-view">
                                          <iframe
                                            src={data.xactiframeurl}
                                            frameBorder="0"
                                            allowFullScreen
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (subscriptionInfo && subscriptionInfo.subscriptionstatus == "Cancelled") ||
                                    subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                                    subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                                    subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                                    subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                                    subscriptionInfo.subscriptionstatus == "Paused" ||
                                    subscriptionInfo.subscriptionstatus == "Trial" ? (
                                    <div className="col">
                                      <div className="image-bg">
                                        <div style={{ backgroundColor: "#000" }}>
                                          <img
                                            src={data.xactiframeimage}
                                            alt={data.title}
                                            loading="lazy"
                                          />
                                          <Link to="/plan-matrix">
                                            <button className="btn">
                                              {" "}
                                              Update Plan{" "}
                                            </button>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="line_items_iframe_div">
                                      <div className="embed-responsive">
                                        <div className="iframe-main-view">
                                          <iframe
                                            src={data.xactiframeurl}
                                            frameBorder="0"
                                            allowFullScreen
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <Comments insightsheetid={id} page="insightsheet" />
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
              </div>
            </div>
            <WrongBrowserDisclaimer />
            <CookieConsentGI2 />
            <Footer />
          </Suspense>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default withRouter(InsightSheetDetail);