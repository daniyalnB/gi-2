import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import queryString from "query-string";
import NumberFormat from "react-number-format";
import { Helmet } from "react-helmet";
import { getAllCertifications } from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import edit from "assets/Edit-Manual.svg";

const ViewCertification = (props) => {

  const [loading, setLoading] = useState(true);

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCertifications().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (certification) => certification.id === parseInt(props.match.params.id)
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
      <Helmet>
        <title> 
          Certification Product Detail - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="createInsightSheet">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <ScrollToTop />
              <SideMenu />
            </div>
            <div className="col-9">
              <div className="row">
                <UserTab />
              </div>
              <div className="createInsightSheet-section">
                <div className="row header">
                  <div className="col-9">
                    <h3 className="heading">
                      Product Detail
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/products/certifications"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <div className="info-data">
                    <div className="view-data">
                      <div className="row">
                        <div className="col-9" style={{ padding: "0px" }}>
                          <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Course Title </h3>
                              <h2 className="value"> {data.title} </h2>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                              <h3 className="heading"> Price </h3>
                              <h2 className="value">
                                <NumberFormat
                                  value={(data.priceincents / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </h2>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                              <h3 className="heading"> Failed Price </h3>
                              <h2 className="value">
                                <NumberFormat
                                  value={(data.failedpriceincents / 100).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              </h2>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
                              <h3 className="heading"> Permalink </h3>
                              <h2 className="value" style={{ color: "#26A59A", textDecoration: "underline" }}> 
                                {data.permalink}
                              </h2>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                              <h3 className="heading"> Flow Type </h3>
                              <h2 className="value"> {data.flowtype} </h2>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-12">
                              <h3 className="heading"> Description </h3>
                              <div className="description"> 
                                {data.description ? data.description : "N/A"}
                              </div>
                            </div>
                          </div>
                          {data.iicrc && (
                            <div className="row" style={{ marginTop: "10px" }}>
                              <div className="col-12">
                                <h3 className="heading"> IICRC Title </h3>
                                <div className="description"> 
                                  {data.iicrctitle ? data.iicrctitle : "N/A"}
                                </div>
                              </div>
                            </div>
                          )}
                          {data.california && (
                            <>
                              <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col-12">
                                  <h3 className="heading"> California Title </h3>
                                  <div className="description"> 
                                    {data.californiaTitle ? data.californiaTitle : "N/A"}
                                  </div>
                                </div>
                              </div>
                              <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col-12">
                                  <h3 className="heading"> California Description </h3>
                                  <div className="description"> 
                                    {data.californiaDescription ? data.californiaDescription : "N/A"}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {data.florida && (
                            <>
                              <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col-12">
                                  <h3 className="heading"> Florida Title </h3>
                                  <div className="description"> 
                                    {data.floridaTitle ? data.floridaTitle : "N/A"}
                                  </div>
                                </div>
                              </div>
                              <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col-12">
                                  <h3 className="heading"> Florida Description </h3>
                                  <div className="description"> 
                                    {data.floridaDescription ? data.floridaDescription : "N/A"}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {data.idaho && (
                            <div className="row" style={{ marginTop: "10px" }}>
                              <div className="col-12">
                                <h3 className="heading"> Idaho Title </h3>
                                <div className="description"> 
                                  {data.idahoTitle ? data.idahoTitle : "N/A"}
                                </div>
                              </div>
                            </div>
                          )}
                          {data.georgia && (
                            <div className="row" style={{ marginTop: "10px" }}>
                              <div className="col-12">
                                <h3 className="heading"> Georgia Title </h3>
                                <div className="description"> 
                                  {data.georgiaTitle ? data.georgiaTitle : "N/A"}
                                </div>
                              </div>
                            </div>
                          )}
                          {data.nevada && (
                            <div className="row" style={{ marginTop: "10px" }}>
                              <div className="col-12">
                                <h3 className="heading"> Nevada Title </h3>
                                <div className="description"> 
                                  {data.nevadaTitle ? data.nevadaTitle : "N/A"}
                                </div>
                              </div>
                            </div>
                          )}
                          {data.proctoring && (
                            <div className="row" style={{ marginTop: "10px" }}>
                              <div className="col-12">
                                <h3 className="heading"> Proctoring Title </h3>
                                <div className="description"> 
                                  {data.proctoringTitle ? data.proctoringTitle : "N/A"}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="row" style={{ marginTop: "25px" }}>
                            <div className="col-12">
                              <h4 className="images"> Images </h4>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Course Image </h3>
                              <div className="row images-inner">
                                <div className="col-2 image-1">
                                  <img src={data.courseimage} />
                                </div>
                                <div className="col-9 name">
                                  <h5> {data.courseimage ? parse(data.courseimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")) : "N/A"} </h5>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Facebook OG Image </h3>
                              <div className="row images-inner">
                                <div className="col-2 image-1">
                                  <img src={data.facebookogimage} />
                                </div>
                                <div className="col-9 name">
                                  <h5> {data.facebookogimage ? parse(data.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")) : "N/A"} </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3 text-right" style={{ paddingRight: "25px" }}>
                          {localStorage.getItem("role") == "Analyst" ? (
                            ""
                          ) : (
                            <Link 
                              to={`/gi-team/products/update-certification/${data.id}`}
                            >
                              <img src={edit} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
    </>
  );
};

export default withRouter(ViewCertification);