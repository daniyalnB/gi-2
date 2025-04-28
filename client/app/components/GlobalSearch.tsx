import React, { Suspense, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../components/LottieLoader";
import Breadcrumbs from "../components/Breadcrumbs";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
const Navbar = React.lazy(() => import("../components/Navbar"));
const Footer = React.lazy(() => import("../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../components/WrongBrowserDisclaimer"));
import { SearchSiteDatabase } from "../../utils/api-routes/api-routes.util";
import queryString from "query-string";
import search2 from "assets/search2.png";
import icon_insightsheet from "assets/gs_insightsheet.svg";
import icon_macro from "assets/gs_macro.svg";
import icon_event from "assets/gs_event.svg";
import icon_pricelist from "assets/gs_pricelist.svg";
import icon_insighterreport from "assets/gs_insighterreport.svg";
import icon_videogallery from "assets/gs_videogallery.svg";
import icon_lineitems from "assets/icon_lineitems.svg";
import icon_swag from "assets/gs_swag.svg";
import icon_certification from "assets/gs_certifiction.svg";
import icon_sketchgallery from "assets/gs_sketchgallery.svg";

const GlobalSearch = () => {

  const focusSearch = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (focusSearch.current) {
        focusSearch.current.focus();
      }
    }, 1000);
  }, [focusSearch.current]);

  const [loading, setLoading] = useState(true);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const [searchfield, setSearchField] = useState("");

  const [result, setResult] = useState(false);
  const [resultVal, setResultVal] = useState("");

  const [data, setData] = useState([]);

  const [insightsheets, setInsightSheets] = useState([]);
  const [macros, setMacros] = useState([]);
  const [events, setEvents] = useState([]);
  const [pricelist, setPriceList] = useState([]);
  const [insighterreports, setInsighterReports] = useState([]);
  const [videogallery, setVideoGallery] = useState([]);
  const [commonlyoverlookedlineitems, setCommonlyOverlookedLineItems] = useState([]);
  const [swag, setSwag] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [sketchgallery, setSketchGallery] = useState([]);

  const SearchKeyword = (e) => {
    setLoadingSearch(true);

    const payload = {
      keywords: e,
    };

    const stringified = queryString.stringify(payload);

    SearchSiteDatabase(stringified).subscribe((response) => {
      if (response.response.Requested_Action) {
        setData(response.response.data);
        const insightsheet = response.response.data.filter(
          (insightsheet) => insightsheet.catagory === "InsightSheets"
        );
        setInsightSheets(insightsheet);
        const macro = response.response.data.filter(
          (macro) => macro.catagory === "Macro"
        );
        setMacros(macro);
        const event = response.response.data.filter(
          (event) => event.catagory === "Event"
        );
        setEvents(event);
        const pricelist = response.response.data.filter(
          (pricelist) => pricelist.catagory === "PriceUpdateSummary"
        );
        setPriceList(pricelist);
        const insighterreport = response.response.data.filter(
          (insighterreport) => insighterreport.catagory === "InsighterReport"
        );
        setInsighterReports(insighterreport);
        const videogallery = response.response.data.filter(
          (videogallery) => videogallery.catagory === "VideoGallary"
        );
        setVideoGallery(videogallery);
        const lineitems = response.response.data.filter(
          (lineitems) => lineitems.catagory === "CommonlyOverlookedLineItems"
        );
        setCommonlyOverlookedLineItems(lineitems);
        const sketchgallery = response.response.data.filter(
          (sketchgallery) => sketchgallery.catagory === "XactimateSketch"
        );
        setSketchGallery(sketchgallery);
        setLoadingSearch(false);
      } else {
        setLoadingSearch(false);
      }
    });
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      if (searchfield == "") {
      } else {
        // setSearchField("");
        setLoading(false);
        setResult(true);
      }
    }
  };

  return (
    <>
      <SEO
        title="Global Search - Actionable Insights"
        description="Search across all Actionable Insights resources to find results from Insight Sheets, Insighter Reports, Price List Update Summary videos/articles, and more!"
        link="search"
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
        <div className="main-container" style={{ minHeight: "100vh" }}>
          <div className="GlobalSearch">
            <div className="">
              <div className="holder">
                <div className="search_text">
                  <p>
                    {" "}
                    Search across all Actionable Insights resources to find
                    results from Insight Sheets, Insighter Reports, Price List
                    Update Summary videos/articles, and more!{" "}
                  </p>
                </div>
                <div className="form-group nogroup">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      ref={focusSearch}
                      required
                      value={searchfield}
                      onChange={(e) => {
                        setSearchField(e.target.value);
                        SearchKeyword(e.target.value);
                        setResultVal(e.target.value);
                        setLoading(true);
                        setResult(false);
                      }}
                      onKeyPress={(e) => handleKeypress(e)}
                    />
                    {/* {searchfield !== "" && (                        
                      <img 
                        style={{ width: "20px", height: "20px", marginTop: "15px" }}
                        className="input_icon" 
                        src={cancel}
                        alt="cancel"
                        loading="lazy"
                        onClick={() => setSearchField("")}
                      />
                    )} */}
                    {loadingSearch && (
                      <div style={{ fontSize: "35px", color: "#DB422D" }}>
                        <i className="fas fa-circle-notch fa-spin"></i>
                      </div>
                    )}
                    <img
                      className="input_icon"
                      src={search2}
                      alt="search2"
                      loading="lazy"
                      onClick={() => {
                        // setSearchField("");
                        setLoading(false);
                        setResult(true);
                      }}
                    />
                  </div>
                </div>
                {result && (
                  <div className="relevant-search">
                    Showing the most relevant results for: "
                    <span>{resultVal}</span>"
                  </div>
                )}
                {!result && (
                  <>
                    {searchfield !== "" && loadingSearch == false && (
                      <>
                        <div className="col-12" style={{ padding: "0px" }}>
                          <div className="active_search">
                            {!loadingSearch && (
                              <>
                                {data.length <= 0 ? (
                                  <div className="no-result">
                                    <h3> No results! </h3>
                                  </div>
                                ) : (
                                  <div className="Items">
                                    {data.map((val) => {
                                      return (
                                        <div key={val.id}>
                                          <Link
                                            to={{
                                              pathname: `${
                                                val.catagory == "InsightSheets"
                                                ? `/insight-sheets/${val.permalink}`
                                                : val.catagory == "Macro"
                                                ? `/shop/macros/${val.permalink}`
                                                : val.catagory == "Event"
                                                ? `/event/${val.permalink}`
                                                : val.catagory == "PriceUpdateSummary"
                                                ? `/resources/price-list-update-summary/${val.permalink}`
                                                : val.catagory == "InsighterReport"
                                                ? `/resources/insighter-report/${val.permalink}`
                                                : val.catagory == "VideoGallary"
                                                ? `/video-gallery/${val.permalink}`
                                                : val.catagory == "XactimateSketch"
                                                ? `/online-sketch-gallery`
                                                : `/commonly-overlooked-line-items`
                                              }`,
                                              state: {
                                                search: searchfield,
                                              },
                                            }}
                                            target={val.catagory == "XactimateSketch" ? "_self" : "_blank"}
                                          >
                                            <div className="row">
                                              <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 icon">
                                                <img
                                                  src={
                                                    val.catagory == "InsightSheets"
                                                    ? icon_insightsheet
                                                    : val.catagory == "Macro"
                                                    ? icon_macro
                                                    : val.catagory == "Event"
                                                    ? icon_event
                                                    : val.catagory == "PriceUpdateSummary"
                                                    ? icon_pricelist
                                                    : val.catagory == "InsighterReport"
                                                    ? icon_insighterreport
                                                    : val.catagory == "VideoGallary"
                                                    ? icon_videogallery
                                                    : val.catagory == "XactimateSketch"
                                                    ? icon_sketchgallery
                                                    : icon_lineitems
                                                  }
                                                  alt="catagory"
                                                  loading="lazy"
                                                />
                                              </div>
                                              <div className="col-xl-11 col-lg-11 col-md-9 col-sm-9">
                                                <h3 className="search_h3">
                                                  {val.title}
                                                </h3>
                                                <p className="search_p">
                                                  {val.catagory == "InsightSheets"
                                                    ? "Insight Sheets"
                                                    : val.catagory == "PriceUpdateSummary"
                                                    ? "Price List Update Summary"
                                                    : val.catagory == "InsighterReport"
                                                    ? "Insighter Reports"
                                                    : val.catagory == "VideoGallary"
                                                    ? "Video Gallery"
                                                    : val.catagory == "CommonlyOverlookedLineItems"
                                                    ? "Commonly Overlooked Line Items"
                                                    : val.catagory == "XactimateSketch"
                                                    ? "Sketch Gallery"
                                                    : val.catagory
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </Link>
                                          <hr />
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                <hr />
              </div>
              {!loading && (
                <>
                  {data.length <= 0 ? (
                    <div className="no-results">
                      <h2>Nothing Found</h2>
                      <div className="page-content">
                        <p>
                          Sorry, but nothing matched your search terms. Please
                          try again with some different keywords.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {insightsheets.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Insight Sheets </h2>
                            {insightsheets.map((val) => {
                              return (
                                <Link
                                  to={`/insight-sheets/${val.permalink}`}
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_insightsheet}
                                      alt="icon_insightsheet"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {macros.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Macros </h2>
                            {macros.map((val) => {
                              return (
                                <Link
                                  to={`/shop/macros/${val.permalink}`}
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_macro}
                                      alt="icon_macro"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {events.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Events </h2>
                            {events.map((val) => {
                              return (
                                <Link
                                  to={`/event/${val.permalink}`}
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_event}
                                      alt="icon_event"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {pricelist.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Price List Update Summary </h2>
                            {pricelist.map((val) => {
                              return (
                                <Link
                                  to={`/resources/price-list-update-summary/${val.permalink}`}
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_pricelist}
                                      alt="icon_pricelist"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {insighterreports.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Insighter Reports </h2>
                            {insighterreports.map((val) => {
                              return (
                                <Link
                                  to={`/resources/insighter-report/${val.permalink}`}
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_insighterreport}
                                      alt="icon_insighterreport"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {videogallery.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Video Gallery </h2>
                            {videogallery.map((val) => {
                              return (
                                <Link
                                  to={`/video-gallery/${val.permalink}`}
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_videogallery}
                                      alt="icon_videogallery"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {commonlyoverlookedlineitems.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Commonly Overlooked Line Items </h2>
                            {commonlyoverlookedlineitems.map((val) => {
                              return (
                                <Link
                                  to="/commonly-overlooked-line-items"
                                  target="_blank"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_lineitems}
                                      alt="icon_lineitems"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      {sketchgallery.length !== 0 && (
                        <div className="Search_Items">
                          <div className="categories">
                            <h2> Sketch Gallery </h2>
                            {sketchgallery.map((val) => {
                              return (
                                <Link
                                  to={{
                                    pathname: "/online-sketch-gallery",
                                    state: {
                                      search: searchfield,
                                    },
                                  }}
                                  target="_self"
                                >
                                  <div className="detail">
                                    <img
                                      src={icon_sketchgallery}
                                      alt="icon_sketchgallery"
                                      loading="lazy"
                                    />
                                    <h3> {val.title} </h3>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
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

export default GlobalSearch;