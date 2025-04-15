import React, { Suspense, useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
const Search = React.lazy(() => import("../../components/Search"));
import { GetAllInsightSheetsCustomer } from "../../../utils/api-routes/api-routes.util";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Rating from "@material-ui/lab/Rating";
import down from "assets/down-arrow-user.svg";

export const useDetectOutsideClick = (el, initialState) => {

  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);
  return [isActive, setIsActive];
};

const InsightSheet = () => {
  
  const dropdownRef1 = useRef(null);
  const [isActive1, setIsActive1] = useDetectOutsideClick(dropdownRef1, false);
  const onClickRef1 = () => setIsActive1(!isActive1);

  const dropdownRef2 = useRef(null);
  const [isActive2, setIsActive2] = useDetectOutsideClick(dropdownRef2, false);
  const onClickRef2 = () => setIsActive2(!isActive2);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [dataAZ, setDataAZ] = useState([]);
  const [dataZA, setDataZA] = useState([]);
  const [dataLH, setDataLH] = useState([]);
  const [dataHL, setDataHL] = useState([]);
  const [MData, setMData] = useState([]);
  const [MAZData, setMAZData] = useState([]);
  const [MZAData, setMZAData] = useState([]);
  const [MLHData, setMLHData] = useState([]);
  const [MHLData, setMHLData] = useState([]);
  const [RData, setRData] = useState([]);
  const [RAZData, setRAZData] = useState([]);
  const [RZAData, setRZAData] = useState([]);
  const [RLHData, setRLHData] = useState([]);
  const [RHLData, setRHLData] = useState([]);

  useEffect(() => {
    GetAllInsightSheetsCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
        const publisheddata = x.filter((val) => val.draft === false);
        shuffleArray(publisheddata);
        const daz1 = x.filter((val) => val.draft === false);
        const daz2 = daz1.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        setDataAZ(daz2);
        const dza1 = x.filter((val) => val.draft === false);
        const dza2 = dza1.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        setDataZA(dza2);
        const dlh1 = x.filter((val) => val.draft === false);
        const dlh2 = dlh1.sort((a,b) => a.averagerating - b.averagerating);
        setDataLH(dlh2);
        const dhl1 = x.filter((val) => val.draft === false);
        const dhl2 = dhl1.sort((a,b) => b.averagerating - a.averagerating);
        setDataHL(dhl2);
        const y = x.filter((val) => val.draft === false);
        const m = y.filter((val) => val.catagory === "Mitigation");
        setMData(m);
        const maz1 = x.filter((val) => val.draft === false);
        const maz2 = maz1.filter((val) => val.catagory === "Mitigation");
        const maz3 = maz2.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        setMAZData(maz3);
        const mza1 = x.filter((val) => val.draft === false);
        const mza2 = mza1.filter((val) => val.catagory === "Mitigation");
        const mza3 = mza2.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        setMZAData(mza3);
        const mlh1 = x.filter((val) => val.draft === false);
        const mlh2 = mlh1.filter((val) => val.catagory === "Mitigation");
        const mlh3 = mlh2.sort((a,b) => a.averagerating - b.averagerating);
        setMLHData(mlh3);
        const mhl1 = x.filter((val) => val.draft === false);
        const mhl2 = mhl1.filter((val) => val.catagory === "Mitigation");
        const mhl3 = mhl2.sort((a,b) => b.averagerating - a.averagerating);
        setMHLData(mhl3);
        const z = x.filter((val) => val.draft === false);
        const r = z.filter((val) => val.catagory === "Repair");
        setRData(r);
        const raz1 = x.filter((val) => val.draft === false);
        const raz2 = raz1.filter((val) => val.catagory === "Repair");
        const raz3 = raz2.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        setRAZData(raz3);
        const rza1 = x.filter((val) => val.draft === false);
        const rza2 = rza1.filter((val) => val.catagory === "Repair");
        const rza3 = rza2.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        setRZAData(rza3);
        const rlh1 = x.filter((val) => val.draft === false);
        const rlh2 = rlh1.filter((val) => val.catagory === "Repair");
        const rlh3 = rlh2.sort((a,b) => a.averagerating - b.averagerating);
        setRLHData(rlh3);
        const rhl1 = x.filter((val) => val.draft === false);
        const rhl2 = rhl1.filter((val) => val.catagory === "Repair");
        const rhl3 = rhl2.sort((a,b) => b.averagerating - a.averagerating);
        setRHLData(rhl3);
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

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCountData = Math.ceil(data.length / usersPerPage);
  const pageCountMData = Math.ceil(MData.length / usersPerPage);
  const pageCountRData = Math.ceil(RData.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [mitigation, setMitigation] = useState(true);
  const [repair, setRepair] = useState(true);

  const [AZ, setAZ] = useState(false);
  const [ZA, setZA] = useState(false);
  const [LH, setLH] = useState(false);
  const [HL, setHL] = useState(false);

  return (
    <>
      <SEO
        title="Insight Sheet | Xactimate Cheat Sheets by Actionable Insights"
        description="Our insight sheet database has 110+ Xactimate estimate templates for different restoration scenarios. Try now to increase the accuracy of your estimates."
        link="insight-sheet"
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
                <h2> Insight Sheets </h2>
                <div className="separator">
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="col-md-5 col-sm-12">
                      <h5> Search Insight Sheet Database </h5>
                    </div>
                    <div className="col-md-7 col-sm-12 Filter_SortBy" style={{ paddingRight: "0px" }}>
                      <div className="row" style={{ marginRight: "15px" }}>
                        <div className="filter_tab">
                          <div className="form-group">
                            <input
                              type="text"
                              name="Filter"
                              className="form-control"
                              placeholder="Filter"
                              onClick={() => onClickRef1()}
                            />
                            <label className="file_input_label">
                              <img
                                className="select size"
                                src={down}
                                onClick={() => onClickRef1()}
                              />
                            </label>
                            <div
                              className={isActive1 ? "active" : "dropdown-content"}
                              ref={dropdownRef1}
                            >
                              <h5> Filter by Categories </h5>
                              <div className="filter">
                                <input type="checkbox" id="s1" checked={mitigation} />
                                <label htmlFor="s1" onClick={() => setMitigation(!mitigation)}>
                                  Mitigation
                                </label>
                              </div>
                              <hr />
                              <div className="filter">
                                <input type="checkbox" id="s2" checked={repair} />
                                <label htmlFor="s2" onClick={() => setRepair(!repair)}>
                                  Repair
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sort_tab">
                          <div className="form-group">
                            <input
                              type="text"
                              name="SortBy"
                              className="form-control"
                              placeholder="Sort by"
                              onClick={() => onClickRef2()}
                            />
                            <label className="file_input_label">
                              <img
                                className="select size"
                                src={down}
                                onClick={() => onClickRef2()}
                              />
                            </label>
                            <div
                              className={isActive2 ? "active" : "dropdown-content"}
                              ref={dropdownRef2}
                            >
                              <label htmlFor="AZ">A-Z</label>
                              <input
                                type="radio"
                                id="AZ"
                                checked={AZ}
                                onClick={() => {
                                  setAZ(!AZ);
                                  setZA(false);
                                  setLH(false);
                                  setHL(false);
                                }}
                              />
                              <br />
                              <label htmlFor="ZA">Z-A</label>
                              <input
                                type="radio"
                                id="ZA"
                                checked={ZA}
                                onClick={() => {
                                  setAZ(false);
                                  setZA(!ZA);
                                  setLH(false);
                                  setHL(false);
                                }}
                              />
                              <br />
                              <label htmlFor="LH">Rating <span>(Low - High)</span></label>
                              <input
                                type="radio"
                                id="LH"
                                checked={LH}
                                onClick={() => {
                                  setAZ(false);
                                  setZA(false);
                                  setLH(!LH);
                                  setHL(false);
                                }}
                              />
                              <br />
                              <label htmlFor="HL">Rating <span>(High - Low)</span></label>
                              <input
                                type="radio"
                                id="HL"
                                checked={HL}
                                onClick={() => {
                                  setAZ(false);
                                  setZA(false);
                                  setLH(false);
                                  setHL(!HL);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Search data={data} />
                  <div className="tutorial">
                    <span>
                      {" "}
                      Not sure how to read an Insight Sheet? Check out the
                      tutorial{" "}
                      <Link to="/insight-sheet-tutorial">here</Link>.
                    </span>
                  </div>
                  <div className="insight">
                    <div className="">
                      {!loading && (
                        <>
                          {!mitigation && !repair ? (
                            <div className="no-results">
                              <h2>Nothing Found</h2>
                              <div className="page-content">
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
                          ) : mitigation && repair && !AZ && !ZA && !LH && !HL ? (
                            <>
                              {data.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && repair && AZ && !ZA && !LH && !HL ? (
                            <>
                              {dataAZ.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && repair && !AZ && ZA && !LH && !HL ? (
                            <>
                              {dataZA.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && repair && !AZ && !ZA && LH && !HL ? (
                            <>
                              {dataLH.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && repair && !AZ && !ZA && !LH && HL ? (
                            <>
                              {dataHL.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && !repair && !AZ && !ZA && !LH && !HL ? (
                            <>
                              {MData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountMData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && !repair && AZ && !ZA && !LH && !HL ? (
                            <>
                              {MAZData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountMData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && !repair && !AZ && ZA && !LH && !HL ? (
                            <>
                              {MZAData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountMData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && !repair && !AZ && !ZA && LH && !HL ? (
                            <>
                              {MLHData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountMData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : mitigation && !repair && !AZ && !ZA && !LH && HL ? (
                            <>
                              {MHLData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountMData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : !mitigation && repair && !AZ && !ZA && !LH && !HL ? (
                            <>
                              {RData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountRData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : !mitigation && repair && AZ && !ZA && !LH && !HL ? (
                            <>
                              {RAZData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountRData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : !mitigation && repair && !AZ && ZA && !LH && !HL ? (
                            <>
                              {RZAData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountRData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : !mitigation && repair && !AZ && !ZA && LH && !HL ? (
                            <>
                              {RLHData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountRData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : !mitigation && repair && !AZ && !ZA && !LH && HL ? (
                            <>
                              {RHLData.slice(pagesVisited, pagesVisited + usersPerPage).map((val) => {
                                return (
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
                                                style={{ fontWeight: 500 }}
                                              >
                                                {val.catagory}
                                              </Link>
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              Principal Author(s):{" "}
                                            </span>
                                            <span className="value">
                                              {val.principleauthor}{" "}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              AI Board Approval:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.alboardapproval).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Last Update:{" "}
                                            </span>
                                            <span className="value">
                                              {moment(val.lastupdate).format("MM/DD/YYYY")}
                                            </span>
                                          </div>
                                          <div className="data">
                                            <span className="heading">
                                              {" "}
                                              Tags:{" "}
                                            </span>
                                            <span className="value">
                                              {val.tags.split(",").map((tag) => {
                                                return (
                                                  <>
                                                    <Link
                                                      to={{
                                                        pathname: `/s=${tag.toLowerCase().trim().replace(/\//gi, "%2F")}`,
                                                        state: {
                                                          mitigation: true,
                                                          repair: true,
                                                        },
                                                      }}
                                                      style={{ fontWeight: 500 }}
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
                                                    {val.totalratingcount == null ? "0" : val.totalratingcount}
                                                  </span>
                                                  <span className="span-2">
                                                    {" "}votes, average:{" "}
                                                  </span>
                                                  <span className="span-3">
                                                    {val.averagerating == null ? "0" : val.averagerating.toFixed(2)}
                                                  </span>
                                                  <span className="span-4">
                                                    {" "}out of{" "}
                                                  </span>
                                                  <span className="span-5">
                                                    5
                                                  </span>
                                                )
                                              </span>
                                              <br />
                                              {localStorage.getItem("tokenCustomer") == null ? (
                                                <span className="span-rating-2">
                                                  You need to be a registered
                                                  member to rate this.
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
                                              Description:{" "}
                                            </span>
                                            <br />
                                            <div
                                              className="value"
                                              style={{ textAlign: "justify" }}
                                            >
                                              {val.featureddescription.substring(0,250 )}
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
                                );
                              })}
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCountRData}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                              />
                            </>
                          ) : (
                            ""
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

export default withRouter(InsightSheet);