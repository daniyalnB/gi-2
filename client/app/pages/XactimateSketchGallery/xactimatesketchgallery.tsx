import React, { Suspense, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LottieLoader from "../../components/LottieLoader";
import Breadcrumbs from "../../components/Breadcrumbs";
import ScrollToTop from "../../components/ScrollToTop";
import SEO from "../../components/SEO";
const Navbar = React.lazy(() => import("../../components/Navbar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const CookieConsentGI2 = React.lazy(() => import("../../components/CookieConsent"));
const WrongBrowserDisclaimer = React.lazy(() => import("../../components/WrongBrowserDisclaimer"));
import { GetAllXactimateSketchCustomer } from "../../../utils/api-routes/api-routes.util";
import ReactPaginate from "react-paginate";
import down from "assets/down-arrow-user.svg";
import search2 from "assets/search2.png";

const XactimateSketchGallery = (props) => {

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

  const [path, setPath] = useState(location.pathname);

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [AZData, setAZData] = useState([]);
  const [ZAData, setZAData] = useState([]);

  useEffect(() => {
    GetAllXactimateSketchCustomer().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data;
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
      val.title.toLowerCase().includes(value.replace(/ /g,"").toLowerCase()) ||
      val.keywords.toLowerCase().includes(value.replace(/ /g,"").toLowerCase())
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

  return (
    <>
      <SEO
        title="Sketch Gallery by Actionable Insights | Free Xactimate Sketches"
        description="Over 100 free Xactimate sketches including staircases, hallways, roofs, rooms, & more. Download a template from the Xactimate Online Sketch Gallery."
        link="online-sketch-gallery"
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
                <h2> Xactimate Sketch Gallery </h2>
                <div className="separator">
                  <div className="row" style={{ marginBottom: "-31px" }}>
                    <div className="col-md-6 col-sm-12">
                      <h5> Search Xactimate Sketch Gallery </h5>
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
                          placeholder="Search by keywords"
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
                                            className="featureimage-xactimatesketchgallery"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                              {/* <div className="data">
                                                <span className="heading">
                                                  {" "}
                                                  Version:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.version}
                                                </span>
                                              </div> */}
                                              <div className="data">
                                                <span className="heading">
                                                  Submitted By:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.submittedby}{" "}
                                                </span>
                                              </div>
                                              <div className="data">
                                                <span className="heading"> Tags: </span>
                                                <span className="value">
                                                  {val.tags.split(',').map((tag) => {
                                                    return (
                                                      <>
                                                        {tag.trim()}
                                                        <span className="comma">,</span>{" "}
                                                      </>
                                                    );
                                                  })}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <button
                                                    className="btn link"
                                                    disabled
                                                  >
                                                    Download
                                                  </button>
                                                ) : (
                                                  <a
                                                    className="link"
                                                    href={val.skxfile}
                                                    target="_blank"
                                                  >
                                                    Download
                                                  </a>
                                                )}
                                                <br/>
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <div className="not-signed-in">
                                                    <Link
                                                      to="/my-account"
                                                      state={{ path: path }}
                                                    >
                                                      Sign In
                                                    </Link>
                                                    {" "} to Download For Free.
                                                  </div>
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
                                                  Comments:{" "}
                                                </span>
                                                <br />
                                                <div className="value" style={{ textAlign: "justify" }}>
                                                  {val.comments.substring(0, 250)}
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
                                            className="featureimage-xactimatesketchgallery"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                              {/* <div className="data">
                                                <span className="heading">
                                                  {" "}
                                                  Version:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.version}
                                                </span>
                                              </div> */}
                                              <div className="data">
                                                <span className="heading">
                                                  Submitted By:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.submittedby}{" "}
                                                </span>
                                              </div>
                                              <div className="data">
                                                <span className="heading"> Tags: </span>
                                                <span className="value">
                                                  {val.tags.split(',').map((tag) => {
                                                    return (
                                                      <>
                                                        {tag.trim()}
                                                        <span className="comma">,</span>{" "}
                                                      </>
                                                    );
                                                  })}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <button
                                                    className="btn link"
                                                    disabled
                                                  >
                                                    Download
                                                  </button>
                                                ) : (
                                                  <a
                                                    className="link"
                                                    href={val.skxfile}
                                                    target="_blank"
                                                  >
                                                    Download
                                                  </a>
                                                )}
                                                <br/>
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <div className="not-signed-in"> 
                                                    <Link
                                                      to="/my-account"
                                                      state={{ path: path }}
                                                    >
                                                      Sign In
                                                    </Link>
                                                    {" "} to Download For Free.
                                                  </div>
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
                                                  Comments:{" "}
                                                </span>
                                                <br />
                                                <div className="value" style={{ textAlign: "justify" }}>
                                                  {val.comments.substring(0, 250)}
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
                                            className="featureimage-xactimatesketchgallery"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                              {/* <div className="data">
                                                <span className="heading">
                                                  {" "}
                                                  Version:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.version}
                                                </span>
                                              </div> */}
                                              <div className="data">
                                                <span className="heading">
                                                  Submitted By:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.submittedby}{" "}
                                                </span>
                                              </div>
                                              <div className="data">
                                                <span className="heading"> Tags: </span>
                                                <span className="value">
                                                  {val.tags.split(',').map((tag) => {
                                                    return (
                                                      <>
                                                        {tag.trim()}
                                                        <span className="comma">,</span>{" "}
                                                      </>
                                                    );
                                                  })}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <button
                                                    className="btn link"
                                                    disabled
                                                  >
                                                    Download
                                                  </button>
                                                ) : (
                                                  <a
                                                    className="link"
                                                    href={val.skxfile}
                                                    target="_blank"
                                                  >
                                                    Download
                                                  </a>
                                                )}
                                                <br/>
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <div className="not-signed-in"> 
                                                    <Link
                                                      to="/my-account"
                                                      state={{ path: path }}
                                                    >
                                                      Sign In
                                                    </Link>
                                                    {" "} to Download For Free.
                                                  </div>
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
                                                  Comments:{" "}
                                                </span>
                                                <br />
                                                <div className="value" style={{ textAlign: "justify" }}>
                                                  {val.comments.substring(0, 250)}
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
                                            className="featureimage-xactimatesketchgallery"
                                            src={val.featuredimage}
                                            alt={val.title}
                                            loading="lazy"
                                          />
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 data-section">
                                          <div className="row">
                                            <div className="col-7">
                                              <h4> {val.title} </h4>
                                              {/* <div className="data">
                                                <span className="heading">
                                                  {" "}
                                                  Version:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.version}
                                                </span>
                                              </div> */}
                                              <div className="data">
                                                <span className="heading">
                                                  Submitted By:{" "}
                                                </span>
                                                <span className="value">
                                                  {val.submittedby}{" "}
                                                </span>
                                              </div>
                                              <div className="data">
                                                <span className="heading"> Tags: </span>
                                                <span className="value">
                                                  {val.tags.split(',').map((tag) => {
                                                    return (
                                                      <>
                                                        {tag.trim()}
                                                        <span className="comma">,</span>{" "}
                                                      </>
                                                    );
                                                  })}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="col-5">
                                              <div className="download">
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <button
                                                    className="btn link"
                                                    disabled
                                                  >
                                                    Download
                                                  </button>
                                                ) : (
                                                  <a
                                                    className="link"
                                                    href={val.skxfile}
                                                    target="_blank"
                                                  >
                                                    Download
                                                  </a>
                                                )}
                                                <br/>
                                                {localStorage.getItem("tokenCustomer") == null ? (
                                                  <div className="not-signed-in"> 
                                                    <Link
                                                      to="/my-account"
                                                      state={{ path: path }}
                                                    >
                                                      Sign In
                                                    </Link>
                                                    {" "} to Download For Free.
                                                  </div>
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
                                                  Comments:{" "}
                                                </span>
                                                <br />
                                                <div className="value" style={{ textAlign: "justify" }}>
                                                  {val.comments.substring(0, 250)}
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

export default XactimateSketchGallery;