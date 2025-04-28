import React, { Suspense, useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllMacrosCustomer } from "../../../utils/api-routes/api-routes.util";
import { AppContext } from "../../../contexts/appContext";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
import down from "assets/down-arrow-user.svg";
import search2 from "assets/search2.png";
import modalclose from "assets/modal-close.svg";

const FormElement = (props) => {

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/shop/macros/${props.permalink}`);
  };

  const handleUpgrade = () => {
    navigate("/plan-matrix");
  };

  return (
    <>
      <div>
        You can get this Macro for free by upgrading to the Pro Plan. Would you like to upgrade now?
      </div>
      <div className="modal-footer" style={{ margin: "15px -15px -15px -15px" }}>
        <button
          className="btn"
          onClick={handleContinue}
        >
          Continue anyways
        </button>
        <button 
          className="btn" 
          onClick={handleUpgrade}
        >
          Upgrade now
        </button>
      </div>
    </>
  );
};

const InsightSheetMacros = () => {

  const dropdownRef1 = useRef<HTMLDivElement | null>(null);
  const [activeMenue, setActiveMenue] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setActiveMenue(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef1]);

  const toggleActive = (event) => {
    event.stopPropagation();
    setActiveMenue(!activeMenue);
  };

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

  const [path, setPath] = useState(location.pathname);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [AZData, setAZData] = useState([]);
  const [ZAData, setZAData] = useState([]);

  useEffect(() => {
    GetAllMacrosCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        // const x = response.response.data;
        const x = response.response.data.filter(
          (macro) => macro.permalink !== "all-actionable-insights-macros-bundle"
        );
        const publisheddata = x.filter((val) => val.draft === false);
        shuffleArray(publisheddata);
        const sortdataAZ = x.filter((val) => val.draft === false);
        const AZ = sortdataAZ.sort(function(a, b) {
          return a.title.localeCompare(b.title);
        });
        setAZData(AZ);
        const sortdataZA = x.filter((val) => val.draft === false);
        const ZA = sortdataZA.sort(function(a, b) {
          return b.title.localeCompare(a.title);
        });
        setZAData(ZA);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return setData(array);
  }

  const [AZ, setAZ] = useState(false);
  const [ZA, setZA] = useState(false);

  const [searchField, setSearchField] = useState("");
  const [searchResults, setSearchResults]= useState([]);

  const searchHandler = (value) => {
    setSearchField(value);
    const filterdData = data.filter(val => 
      val.title.toLowerCase().includes(value.toLowerCase()) ||
      val.description.toLowerCase().includes(value.toLowerCase())
    )
    setSearchResults(filterdData);
  };

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(data.length / usersPerPage);
  const pageCountSearch = Math.ceil(searchResults.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [permalink, setpermalink] = useState(""); 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (permalink) => {
    setpermalink(permalink);
    setShow(true);
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static" 
        keyboard={false}
        className="Cancel_Subscription_Modal"
      >
        <Modal.Header>
          <div className="cancel_subscription_title modal-title h4"> 
            Buy
          </div>
          <button 
            type="button" 
            className="close" 
            data-dismiss="modal" 
            onClick={handleClose}
          >
            <img src={modalclose}/>
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormElement
            permalink={permalink}
          ></FormElement> 
        </Modal.Body>
      </Modal>
      <SEO
        title="Xactimate Macros to Boost Your Productivity | Actionable Insights"
        description="Access over 100 Xactimate Macros supplemented by detailed F9 notes. Increase your productivity with Actionable Insights Macros. Explore now."
        link="macros"
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
          <div className="IS_page">
            <div className="">
              <div className="holder">
                <h2> Insight Sheet Macros </h2>
                <div className="separator">
                  <div className="row" style={{ marginBottom: "-31px" }}>
                    <div className="col-md-6 col-sm-12">
                      <h5> Search Insight Sheets Macros </h5>
                    </div>
                    <div className="col-md-6 col-sm-12 Filter_SortBy">
                      <div className="row">
                        <div className="sort_tab">
                          <div className="form-group">
                            <input
                              type="text"
                              name="SortBy"
                              className="form-control"
                              placeholder="Sort by"
                              onClick={toggleActive}
                            />
                            <label className="file_input_label">
                              <img
                                className="select size"
                                src={down}
                                onClick={toggleActive}
                              />
                            </label>
                            <div
                              className={activeMenue ? "active active_sketch_gallery" : "dropdown-content"}
                              ref={dropdownRef1}
                            >
                              <label htmlFor="AZ">
                                A-Z
                              </label>
                              <input
                                type="radio"
                                id="AZ"
                                checked={AZ}
                                onClick={() => {
                                  setAZ(!AZ);
                                  setZA(false);
                                }}
                              />
                              <br/>
                              <label htmlFor="ZA">
                                Z-A
                              </label>
                              <input
                                type="radio"
                                id="ZA"
                                checked={ZA}
                                onClick={() => {
                                  setZA(!ZA);
                                  setAZ(false);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main-search mt-3">
                    <div className="form-group nogroup">
                      <div className="input-group">
                        <input
                          type="text" 
                          className="form-control" 
                          placeholder="Search"
                          readOnly={data.length == 0 ? true : false}
                          value={searchField}
                          onChange={(e) => searchHandler(e.target.value)}
                        />
                        <img
                          className="input_icon"
                          style={{ cursor: "default" }}
                          src={search2}
                          alt="search2"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  {!loading && (
                    <>
                      {localStorage.getItem("tokenCustomer") == null ? (
                        ""
                      ) : ischilduser ? (
                        <div className="tutorial">
                          <span>
                            {" "}
                            Looking to buy all Macros at once?
                            &nbsp;
                            <Link to="/shop/macros/all-actionable-insights-macros-bundle">Click Here</Link>
                            .
                          </span>
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
                            ""
                          ) : (
                            <div className="tutorial">
                              <span>
                                {" "}
                                Looking to buy all Macros at once?
                                &nbsp;
                                <Link to="/shop/macros/all-actionable-insights-macros-bundle">Click Here</Link>
                                .
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  <div className="insight">
                    <div className="">
                      {!loading && (
                        <>
                          {searchField == "" ? (
                            <>
                              {AZ ? (
                                <>
                                  {AZData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                    return (
                                      <div className="row sheet">
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                          <img
                                            className="featureimage"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <Link
                                                    className="btn link"
                                                    to="/my-account"
                                                    state={{ path: path }}
                                                  >
                                                    Sign In
                                                  </Link>
                                                ) : ischilduser ? (
                                                  <Link
                                                    className="btn link"
                                                    to={`/shop/macros/${val.permalink}`}
                                                  >
                                                    Buy
                                                  </Link>
                                                ) : subscriptionInfo ? (
                                                  <>
                                                    {subscriptionInfo.subscriptionstatus == "Cancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                                                    subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                                                    subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                                                    subscriptionInfo.subscriptionstatus == "Paused" ||
                                                    subscriptionInfo.subscriptionstatus == "Trial" ? (
                                                      <Link
                                                        className="btn link"
                                                        to="/plan-matrix"
                                                      >
                                                        Upgrade Plan
                                                      </Link>
                                                    ) : ((subscriptionInfo.planname == "StandardPlan" || subscriptionInfo.planname == "StandardPlanAnnual" || subscriptionInfo.planname == "PlusPlan" || subscriptionInfo.planname == "PlusPlanAnnual") && (subscriptionInfo.subscriptionstatus == "Active")) ? (
                                                      <button
                                                        className="btn link"
                                                        onClick={() => handleShow(val.permalink)}
                                                      >
                                                        Buy
                                                      </button>
                                                    ) : (
                                                      <Link
                                                        className="btn link"
                                                        to={`/shop/macros/${val.permalink}`}
                                                      >
                                                        Buy
                                                      </Link>
                                                    )}
                                                  </>
                                                ) : (
                                                  <Link
                                                    className="btn link"
                                                    to="/plan-matrix"
                                                  >
                                                    Upgrade Plan
                                                  </Link>
                                                )}
                                                <br/>
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
                                          <div className="row">
                                            <div className="col">
                                              <div className="data">
                                                <span className="heading">
                                                  Description:{" "}
                                                </span>
                                                <br />
                                                <div
                                                  className="value"
                                                  style={{
                                                    textAlign: "justify",
                                                    marginTop: "20px",
                                                  }}
                                                >
                                                  <div 
                                                    dangerouslySetInnerHTML={{
                                                      __html: `${
                                                        val.description
                                                          ? val.description
                                                            .replace(/(<p><\/p>)/g, `<br>`)
                                                            .replace(/<img/g, `<img class='imagepreview'`)
                                                          : ""
                                                      }`,
                                                    }}
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                  />
                                </>
                              ) : ZA ? (
                                <>
                                  {ZAData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                    return (
                                      <div className="row sheet">
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                          <img
                                            className="featureimage"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <Link
                                                    className="btn link"
                                                    to="/my-account"
                                                    state={{ path: path }}
                                                  >
                                                    Sign In
                                                  </Link>
                                                ) : ischilduser ? (
                                                  <Link
                                                    className="btn link"
                                                    to={`/shop/macros/${val.permalink}`}
                                                  >
                                                    Buy
                                                  </Link>
                                                ) : subscriptionInfo ? (
                                                  <>
                                                    {subscriptionInfo.subscriptionstatus == "Cancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                                                    subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                                                    subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                                                    subscriptionInfo.subscriptionstatus == "Paused" ||
                                                    subscriptionInfo.subscriptionstatus == "Trial" ? (
                                                      <Link
                                                        className="btn link"
                                                        to="/plan-matrix"
                                                      >
                                                        Upgrade Plan
                                                      </Link>
                                                    ) : ((subscriptionInfo.planname == "StandardPlan" || subscriptionInfo.planname == "StandardPlanAnnual" || subscriptionInfo.planname == "PlusPlan" || subscriptionInfo.planname == "PlusPlanAnnual") && (subscriptionInfo.subscriptionstatus == "Active")) ? (
                                                      <button
                                                        className="btn link"
                                                        onClick={() => handleShow(val.permalink)}
                                                      >
                                                        Buy
                                                      </button>
                                                    ) : (
                                                      <Link
                                                        className="btn link"
                                                        to={`/shop/macros/${val.permalink}`}
                                                      >
                                                        Buy
                                                      </Link>
                                                    )}
                                                  </>
                                                ) : (
                                                  <Link
                                                    className="btn link"
                                                    to="/plan-matrix"
                                                  >
                                                    Upgrade Plan
                                                  </Link>
                                                )}
                                                <br/>
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
                                          <div className="row">
                                            <div className="col">
                                              <div className="data">
                                                <span className="heading">
                                                  Description:{" "}
                                                </span>
                                                <br />
                                                <div
                                                  className="value"
                                                  style={{
                                                    textAlign: "justify",
                                                    marginTop: "20px",
                                                  }}
                                                >
                                                  <div 
                                                    dangerouslySetInnerHTML={{
                                                      __html: `${
                                                        val.description
                                                          ? val.description
                                                            .replace(/(<p><\/p>)/g, `<br>`)
                                                            .replace(/<img/g, `<img class='imagepreview'`)
                                                          : ""
                                                      }`,
                                                    }}
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                  />
                                </>
                              ) : (
                                <>
                                  {data.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                    return (
                                      <div className="row sheet">
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                          <img
                                            className="featureimage"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <Link
                                                    className="btn link"
                                                    to="/my-account"
                                                    state={{ path: path }}
                                                  >
                                                    Sign In
                                                  </Link>
                                                ) : ischilduser ? (
                                                  <Link
                                                    className="btn link"
                                                    to={`/shop/macros/${val.permalink}`}
                                                  >
                                                    Buy
                                                  </Link>
                                                ) : subscriptionInfo ? (
                                                  <>
                                                    {subscriptionInfo.subscriptionstatus == "Cancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                                                    subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                                                    subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                                                    subscriptionInfo.subscriptionstatus == "Paused" ||
                                                    subscriptionInfo.subscriptionstatus == "Trial" ? (
                                                      <Link
                                                        className="btn link"
                                                        to="/plan-matrix"
                                                      >
                                                        Upgrade Plan
                                                      </Link>
                                                    ) : ((subscriptionInfo.planname == "StandardPlan" || subscriptionInfo.planname == "StandardPlanAnnual" || subscriptionInfo.planname == "PlusPlan" || subscriptionInfo.planname == "PlusPlanAnnual") && (subscriptionInfo.subscriptionstatus == "Active")) ? (
                                                      <button
                                                        className="btn link"
                                                        onClick={() => handleShow(val.permalink)}
                                                      >
                                                        Buy
                                                      </button>
                                                    ) : (
                                                      <Link
                                                        className="btn link"
                                                        to={`/shop/macros/${val.permalink}`}
                                                      >
                                                        Buy
                                                      </Link>
                                                    )}
                                                  </>
                                                ) : (
                                                  <Link
                                                    className="btn link"
                                                    to="/plan-matrix"
                                                  >
                                                    Upgrade Plan
                                                  </Link>
                                                )}
                                                <br/>
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
                                          <div className="row">
                                            <div className="col">
                                              <div className="data">
                                                <span className="heading">
                                                  Description:{" "}
                                                </span>
                                                <br />
                                                <div
                                                  className="value"
                                                  style={{
                                                    textAlign: "justify",
                                                    marginTop: "20px",
                                                  }}
                                                >
                                                  <div 
                                                    dangerouslySetInnerHTML={{
                                                      __html: `${
                                                        val.description
                                                          ? val.description
                                                            .replace(/(<p><\/p>)/g, `<br>`)
                                                            .replace(/<img/g, `<img class='imagepreview'`)
                                                          : ""
                                                      }`,
                                                    }}
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {searchResults.length > 0 ? (
                                <>
                                  {searchResults.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                    return (
                                      <div className="row sheet">
                                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                          <img
                                            className="featureimage"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <Link
                                                    className="btn link"
                                                    to="/my-account"
                                                    state={{ path: path }}
                                                  >
                                                    Sign In
                                                  </Link>
                                                ) : ischilduser ? (
                                                  <Link
                                                    className="btn link"
                                                    to={`/shop/macros/${val.permalink}`}
                                                  >
                                                    Buy
                                                  </Link>
                                                ) : subscriptionInfo ? (
                                                  <>
                                                    {subscriptionInfo.subscriptionstatus == "Cancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "TrialCancelled" ||
                                                    subscriptionInfo.subscriptionstatus == "NoActivePlan" ||
                                                    subscriptionInfo.subscriptionstatus == "CancellationPending" ||
                                                    subscriptionInfo.subscriptionstatus == "PausedDueToPaymentFailure" ||
                                                    subscriptionInfo.subscriptionstatus == "Paused" ||
                                                    subscriptionInfo.subscriptionstatus == "Trial" ? (
                                                      <Link
                                                        className="btn link"
                                                        to="/plan-matrix"
                                                      >
                                                        Upgrade Plan
                                                      </Link>
                                                    ) : ((subscriptionInfo.planname == "StandardPlan" || subscriptionInfo.planname == "StandardPlanAnnual" || subscriptionInfo.planname == "PlusPlan" || subscriptionInfo.planname == "PlusPlanAnnual") && (subscriptionInfo.subscriptionstatus == "Active")) ? (
                                                      <button
                                                        className="btn link"
                                                        onClick={() => handleShow(val.permalink)}
                                                      >
                                                        Buy
                                                      </button>
                                                    ) : (
                                                      <Link
                                                        className="btn link"
                                                        to={`/shop/macros/${val.permalink}`}
                                                      >
                                                        Buy
                                                      </Link>
                                                    )}
                                                  </>
                                                ) : (
                                                  <Link
                                                    className="btn link"
                                                    to="/plan-matrix"
                                                  >
                                                    Upgrade Plan
                                                  </Link>
                                                )}
                                                <br/>
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
                                          <div className="row">
                                            <div className="col">
                                              <div className="data">
                                                <span className="heading">
                                                  Description:{" "}
                                                </span>
                                                <br />
                                                <div
                                                  className="value"
                                                  style={{
                                                    textAlign: "justify",
                                                    marginTop: "20px",
                                                  }}
                                                >
                                                  <div 
                                                    dangerouslySetInnerHTML={{
                                                      __html: `${
                                                        val.description
                                                          ? val.description
                                                            .replace(/(<p><\/p>)/g, `<br>`)
                                                            .replace(/<img/g, `<img class='imagepreview'`)
                                                          : ""
                                                      }`,
                                                    }}
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCountSearch}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                  />
                                </>
                              ) : (
                                <div className="no-result">
                                  <h3> No results! </h3>
                                </div>
                              )}
                            </>
                          )}
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
          </div>
        </div>
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default InsightSheetMacros;