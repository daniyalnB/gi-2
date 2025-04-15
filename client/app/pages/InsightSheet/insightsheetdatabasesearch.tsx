import React, { Suspense, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const Search = React.lazy(() => import("../../components/Search"));
import {
  GetAllInsightSheetsCustomer,
  SearchInsightSheets,
} from "../../../utils/api-routes/api-routes.util";
import { Helmet } from "react-helmet";
import history from "../../../utils/history";
import queryString from "query-string";
import moment from "moment";
import Rating from "@material-ui/lab/Rating";

const InsightSheetDatabaseSearch = (props) => {

  const [mitigation, setMitigation] = useState(true);
  const [repair, setRepair] = useState(true);

  const [data, setData] = useState([]);
  const [insightSheets, setInsightSheets] = useState([]);
  const [mitiagtionData, setMitiagtionData] = useState([]);
  const [repairData, setRepairData] = useState([]);

  useEffect(() => {
    if (props.location.state == undefined) {
      setMitigation(true);
      setRepair(true);
    } else {
      setMitigation(props.location.state.mitigation);
      setRepair(props.location.state.repair);
    }
  }, [props]);

  const [loading, setLoading] = useState(false);

  // const id = props.location.state.id;

  const name = location.pathname;
  const omittedName = name.replace("/s=", "");
  const def = omittedName.replace(/%20/gi, " ");
  const ghi = def.replace(/%5E/gi, "^");
  const abc = ghi.replace(/%2F/gi, "/");

  useEffect(() => {
    setLoading(true);
    GetAllInsightSheetsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        const publisheddata = x.filter((val) => val.draft === false);
        setData(publisheddata);

        setTimeout(() => {
          const payload = {
            keywords: props.match.params.searchfield,
          };

          const stringified = queryString.stringify(payload);

          SearchInsightSheets(stringified).subscribe((response) => {
            if (response.response.Requested_Action) {
              const x = response.response.data;
              const mergedData = merge(x, publisheddata);
              setInsightSheets(mergedData);
              const y = mergedData.filter(
                (insightsheet) => insightsheet.catagory === "Mitigation"
              );
              setMitiagtionData(y);
              const z = mergedData.filter(
                (insightsheet) => insightsheet.catagory === "Repair"
              );
              setRepairData(z);
            }
          });
        }, 2000);
      } else {
        alert("error");
      }
    });
  }, [props.match.params.searchfield]);

  const merge = (arr1, arr2) => {
    const temp = [];
    arr1.forEach((x) => {
      arr2.forEach((y) => {
        if (x.id === y.id) {
          temp.push({ ...x, ...y });
        }
      });
    });
    setLoading(false);
    return temp;
  };

  return (
    <>
      <Helmet>
        <title>{`You searched for ${abc} - Actionable Insights`}</title>
      </Helmet>
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
                <h3 className="search-is"> Search Insight Sheet Database </h3>
                <div className="separator" style={{ marginTop: "10px" }}>
                  <Search sfield={abc} data={data} />
                  {!loading && (
                    <>
                      {mitigation && repair ? (
                        <>
                          {insightSheets.length <= 0 ? (
                            <div className="insight">
                              <div className="">
                                <div className="no-results">
                                  <h2>Nothing Found</h2>
                                  <div className="page-content">
                                    <p>
                                      Sorry, but nothing matched your search
                                      terms. Please try again with some
                                      different keywords.
                                    </p>
                                    <p>
                                      <strong>
                                        Did we miss something? Is there an
                                        Insight Sheet topic you would like us to
                                        explore? Submit your request&nbsp;
                                        <Link to="/advance-the-cause/insight-sheet-collaboration">
                                          here
                                        </Link>
                                        .
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="relevant-search">
                                <span>
                                  Showing the most relevant results for:&nbsp;"
                                  <Link
                                    to={{
                                      pathname: `/s=${abc}`,
                                      state: {
                                        mitigation: mitigation,
                                        repair: repair,
                                      },
                                    }}
                                  >
                                    {abc}
                                  </Link>
                                  "
                                </span>
                              </div>
                              <div className="insight">
                                <div className="">
                                  {insightSheets.map((val, key) => {
                                    return (
                                      <div key={key}>
                                        <div className="row sheet">
                                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                            <Link
                                              to={`/insight-sheets/${val.permalink}`}
                                            >
                                              <img
                                                className="featureimage"
                                                src={val.featureimage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                            </Link>
                                          </div>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                            <div className="row">
                                              <div className="col-7">
                                                <h4>
                                                  <Link
                                                    to={`/insight-sheets/${val.permalink}`}
                                                  >
                                                    {val.title}
                                                  </Link>
                                                </h4>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Category:{" "}
                                                  </span>
                                                  <span className="value">
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${val.catagory.toLowerCase()}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      {val.catagory}
                                                    </Link>
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Principal Author(s):{" "}
                                                  </span>
                                                  <span className="value">
                                                    {" "}
                                                    {val.principleauthor}{" "}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    AI Board Approval:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {moment(
                                                      val.alboardapproval
                                                    ).format("MM/DD/YYYY")}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Last Update:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {moment(
                                                      val.lastupdate
                                                    ).format("MM/DD/YYYY")}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Tags:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {val.tags
                                                      .split(",")
                                                      .map((tag) => {
                                                        return (
                                                          <>
                                                            <Link
                                                              to={{
                                                                pathname: `/s=${tag
                                                                  .toLowerCase()
                                                                  .trim()
                                                                  .replace(
                                                                    /\//gi,
                                                                    "%2F"
                                                                  )}`,
                                                                state: {
                                                                  mitigation:
                                                                    true,
                                                                  repair: true,
                                                                },
                                                              }}
                                                              style={{
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {tag.trim()}
                                                            </Link>
                                                            <span className="comma">
                                                              ,
                                                            </span>{" "}
                                                          </>
                                                        );
                                                      })}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="col-5">
                                                <div className="rating">
                                                  <Rating
                                                    size="large"
                                                    name={val.id}
                                                    value={val.averagerating}
                                                    precision={0.5}
                                                    readOnly
                                                  />
                                                  <div className="rating_1">
                                                    <span className="span-rating-1">
                                                      (
                                                      <span className="span-1">
                                                        {val.totalratingcount ==
                                                        null
                                                          ? "0"
                                                          : val.totalratingcount}
                                                      </span>
                                                      <span className="span-2">
                                                        &nbsp;votes,
                                                        average:&nbsp;
                                                      </span>
                                                      <span className="span-3">
                                                        {val.averagerating ==
                                                        null
                                                          ? "0"
                                                          : val.averagerating.toFixed(
                                                              2
                                                            )}
                                                      </span>
                                                      <span className="span-4">
                                                        &nbsp;out of&nbsp;
                                                      </span>
                                                      <span className="span-5">
                                                        5
                                                      </span>
                                                      )
                                                    </span>
                                                    <br />
                                                    {localStorage.getItem(
                                                      "tokenCustomer"
                                                    ) == null ? (
                                                      <span className="span-rating-2">
                                                        You need to be a
                                                        registered member to
                                                        rate this.
                                                      </span>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Description:{" "}
                                                  </span>{" "}
                                                  <br />
                                                  <div
                                                    className="value"
                                                    style={{
                                                      textAlign: "justify",
                                                    }}
                                                  >
                                                    {val.featureddescription.substring(
                                                      0,
                                                      250
                                                    )}
                                                    ...{" "}
                                                    <Link
                                                      to={`/insight-sheets/${val.permalink}`}
                                                    >
                                                      Read More
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : mitigation && !repair ? (
                        <>
                          {mitiagtionData.length <= 0 ? (
                            <div className="insight">
                              <div className="">
                                <div className="no-results">
                                  <h2>Nothing Found</h2>
                                  <div className="page-content">
                                    <p>
                                      Sorry, but nothing matched your search
                                      terms. Please try again with some
                                      different keywords.
                                    </p>
                                    <p>
                                      <strong>
                                        Did we miss something? Is there an
                                        Insight Sheet topic you would like us to
                                        explore? Submit your request&nbsp;
                                        <Link to="/advance-the-cause/insight-sheet-collaboration">
                                          here
                                        </Link>
                                        .
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="relevant-search">
                                <span>
                                  Showing the most relevant results for:&nbsp;"
                                  <Link
                                    to={{
                                      pathname: `/s=${abc}`,
                                      state: {
                                        mitigation: mitigation,
                                        repair: repair,
                                      },
                                    }}
                                  >
                                    {abc}
                                  </Link>
                                  "
                                </span>
                              </div>
                              <div className="insight">
                                <div className="">
                                  {mitiagtionData.map((val, key) => {
                                    return (
                                      <div key={key}>
                                        <div className="row sheet">
                                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                            <Link
                                              to={`/insight-sheets/${val.permalink}`}
                                            >
                                              <img
                                                className="featureimage"
                                                src={val.featureimage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                            </Link>
                                          </div>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                            <div className="row">
                                              <div className="col-7">
                                                <h4>
                                                  <Link
                                                    to={`/insight-sheets/${val.permalink}`}
                                                  >
                                                    {val.title}
                                                  </Link>
                                                </h4>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Category:{" "}
                                                  </span>
                                                  <span className="value">
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${val.catagory.toLowerCase()}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      {val.catagory}
                                                    </Link>
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Principal Author(s):{" "}
                                                  </span>
                                                  <span className="value">
                                                    {" "}
                                                    {val.principleauthor}{" "}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    AI Board Approval:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {moment(
                                                      val.alboardapproval
                                                    ).format("MM/DD/YYYY")}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Last Update:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {moment(
                                                      val.lastupdate
                                                    ).format("MM/DD/YYYY")}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Tags:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {val.tags
                                                      .split(",")
                                                      .map((tag) => {
                                                        return (
                                                          <>
                                                            <Link
                                                              to={{
                                                                pathname: `/s=${tag
                                                                  .toLowerCase()
                                                                  .trim()
                                                                  .replace(
                                                                    /\//gi,
                                                                    "%2F"
                                                                  )}`,
                                                                state: {
                                                                  mitigation:
                                                                    true,
                                                                  repair: true,
                                                                },
                                                              }}
                                                              style={{
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {tag.trim()}
                                                            </Link>
                                                            <span className="comma">
                                                              ,
                                                            </span>{" "}
                                                          </>
                                                        );
                                                      })}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="col-5">
                                                <div className="rating">
                                                  <Rating
                                                    size="large"
                                                    name={val.id}
                                                    value={val.averagerating}
                                                    precision={0.5}
                                                    readOnly
                                                  />
                                                  <div className="rating_1">
                                                    <span className="span-rating-1">
                                                      (
                                                      <span className="span-1">
                                                        {val.totalratingcount ==
                                                        null
                                                          ? "0"
                                                          : val.totalratingcount}
                                                      </span>
                                                      <span className="span-2">
                                                        &nbsp;votes,
                                                        average:&nbsp;
                                                      </span>
                                                      <span className="span-3">
                                                        {val.averagerating ==
                                                        null
                                                          ? "0"
                                                          : val.averagerating.toFixed(
                                                              2
                                                            )}
                                                      </span>
                                                      <span className="span-4">
                                                        &nbsp;out of&nbsp;
                                                      </span>
                                                      <span className="span-5">
                                                        5
                                                      </span>
                                                      )
                                                    </span>
                                                    <br />
                                                    {localStorage.getItem(
                                                      "tokenCustomer"
                                                    ) == null ? (
                                                      <span className="span-rating-2">
                                                        You need to be a
                                                        registered member to
                                                        rate this.
                                                      </span>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Description:{" "}
                                                  </span>{" "}
                                                  <br />
                                                  <div
                                                    className="value"
                                                    style={{
                                                      textAlign: "justify",
                                                    }}
                                                  >
                                                    {val.featureddescription.substring(
                                                      0,
                                                      250
                                                    )}
                                                    ...{" "}
                                                    <Link
                                                      to={`/insight-sheets/${val.permalink}`}
                                                    >
                                                      Read More
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : !mitigation && repair ? (
                        <>
                          {repairData.length <= 0 ? (
                            <div className="insight">
                              <div className="">
                                <div className="no-results">
                                  <h2>Nothing Found</h2>
                                  <div className="page-content">
                                    <p>
                                      Sorry, but nothing matched your search
                                      terms. Please try again with some
                                      different keywords.
                                    </p>
                                    <p>
                                      <strong>
                                        Did we miss something? Is there an
                                        Insight Sheet topic you would like us to
                                        explore? Submit your request&nbsp;
                                        <Link to="/advance-the-cause/insight-sheet-collaboration">
                                          here
                                        </Link>
                                        .
                                      </strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="relevant-search">
                                <span>
                                  Showing the most relevant results for:&nbsp;"
                                  <Link
                                    to={{
                                      pathname: `/s=${abc}`,
                                      state: {
                                        mitigation: mitigation,
                                        repair: repair,
                                      },
                                    }}
                                  >
                                    {abc}
                                  </Link>
                                  "
                                </span>
                              </div>
                              <div className="insight">
                                <div className="">
                                  {repairData.map((val, key) => {
                                    return (
                                      <div key={key}>
                                        <div className="row sheet">
                                          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 image-section">
                                            <Link
                                              to={`/insight-sheets/${val.permalink}`}
                                            >
                                              <img
                                                className="featureimage"
                                                src={val.featureimage}
                                                alt={val.title}
                                                loading="lazy"
                                              />
                                            </Link>
                                          </div>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                            <div className="row">
                                              <div className="col-7">
                                                <h4>
                                                  <Link
                                                    to={`/insight-sheets/${val.permalink}`}
                                                  >
                                                    {val.title}
                                                  </Link>
                                                </h4>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Category:{" "}
                                                  </span>
                                                  <span className="value">
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${val.catagory.toLowerCase()}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      {val.catagory}
                                                    </Link>
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Principal Author(s):{" "}
                                                  </span>
                                                  <span className="value">
                                                    {" "}
                                                    {val.principleauthor}{" "}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    AI Board Approval:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {moment(
                                                      val.alboardapproval
                                                    ).format("MM/DD/YYYY")}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Last Update:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {moment(
                                                      val.lastupdate
                                                    ).format("MM/DD/YYYY")}
                                                  </span>
                                                </div>
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Tags:{" "}
                                                  </span>
                                                  <span className="value">
                                                    {val.tags
                                                      .split(",")
                                                      .map((tag) => {
                                                        return (
                                                          <>
                                                            <Link
                                                              to={{
                                                                pathname: `/s=${tag
                                                                  .toLowerCase()
                                                                  .trim()
                                                                  .replace(
                                                                    /\//gi,
                                                                    "%2F"
                                                                  )}`,
                                                                state: {
                                                                  mitigation:
                                                                    true,
                                                                  repair: true,
                                                                },
                                                              }}
                                                              style={{
                                                                fontWeight: 500,
                                                              }}
                                                            >
                                                              {tag.trim()}
                                                            </Link>
                                                            <span className="comma">
                                                              ,
                                                            </span>{" "}
                                                          </>
                                                        );
                                                      })}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="col-5">
                                                <div className="rating">
                                                  <Rating
                                                    size="large"
                                                    name={val.id}
                                                    value={val.averagerating}
                                                    precision={0.5}
                                                    readOnly
                                                  />
                                                  <div className="rating_1">
                                                    <span className="span-rating-1">
                                                      (
                                                      <span className="span-1">
                                                        {val.totalratingcount ==
                                                        null
                                                          ? "0"
                                                          : val.totalratingcount}
                                                      </span>
                                                      <span className="span-2">
                                                        &nbsp;votes,
                                                        average:&nbsp;
                                                      </span>
                                                      <span className="span-3">
                                                        {val.averagerating ==
                                                        null
                                                          ? "0"
                                                          : val.averagerating.toFixed(
                                                              2
                                                            )}
                                                      </span>
                                                      <span className="span-4">
                                                        &nbsp;out of&nbsp;
                                                      </span>
                                                      <span className="span-5">
                                                        5
                                                      </span>
                                                      )
                                                    </span>
                                                    <br />
                                                    {localStorage.getItem(
                                                      "tokenCustomer"
                                                    ) == null ? (
                                                      <span className="span-rating-2">
                                                        You need to be a
                                                        registered member to
                                                        rate this.
                                                      </span>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <div className="data">
                                                  <span className="heading">
                                                    {" "}
                                                    Description:{" "}
                                                  </span>{" "}
                                                  <br />
                                                  <div
                                                    className="value"
                                                    style={{
                                                      textAlign: "justify",
                                                    }}
                                                  >
                                                    {val.featureddescription.substring(
                                                      0,
                                                      250
                                                    )}
                                                    ...{" "}
                                                    <Link
                                                      to={`/insight-sheets/${val.permalink}`}
                                                    >
                                                      Read More
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="insight">
                          <div className="">
                            <div className="no-results">
                              <h2>Nothing Found</h2>
                              <div className="page-content">
                                <p>
                                  Sorry, but nothing matched your search terms.
                                  Please try again with some different keywords.
                                </p>
                                <p>
                                  <strong>
                                    Did we miss something? Is there an Insight
                                    Sheet topic you would like us to explore?
                                    Submit your request&nbsp;
                                    <Link to="/advance-the-cause/insight-sheet-collaboration">
                                      here
                                    </Link>
                                    .
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
        <WrongBrowserDisclaimer />
        <CookieConsentGI2 />
        <Footer />
      </Suspense>
    </>
  );
};

export default withRouter(InsightSheetDatabaseSearch);