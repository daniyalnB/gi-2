import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import umpiremanualred from "assets/umpiremanualred.svg";
import right from "assets/productright.png";
import back from "assets/arrowleft.svg";
import { Helmet } from "react-helmet";
import NumberFormat from "react-number-format";
import { GetAllUmpiresManuals } from "../../../../../utils/api-routes/api-routes.util";

const UmpiresManualAdmin = (props) => {

  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState([]);

  const [activeTab, setActiveTab] = useState({
    Published: true,
    Unpublished: false,
  });

  useEffect(() => {
    GetAllUmpiresManuals().subscribe((response) => {
      if (response.response.Requested_Action) {
        setLoading(false);
        setData(response.response.data);
      } else {
        alert("error");
      }
    });
  }, []);

  console.log(data);

  const [published, setPublished] = useState([]);
  const [unpublished, setUnpublished] = useState([]);

  useEffect(() => {
    GetAllUmpiresManuals().subscribe((res) => {
      setPublished(res.response.data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> 
          Umpire's Manual - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="insightsheet">
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
              <div className="insightsheet-section">
                <div className="row header">
                  <div className="col-6">
                    <div className="page_icon">
                      <img src={umpiremanualred} />
                    </div>
                    <h3 className="heading"> Umpire's Manual </h3>
                  </div>
                  <div className="col-6 text-right">
                    <div className="back">
                      <Link className="bk" to="/gi-team/products">
                        <img src={back} className="" />
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="inner_sub_area" style={{ paddingRight: "0px" }}>
                  <div className="row">
                    <div className="col-12 umpiresmanual">
                      <ul className="subs_filters">
                        <li
                          className={
                            activeTab.Published == true ? "active" : ""
                          }
                          onClick={() =>
                            setActiveTab({
                              Published: true,
                              Unpublished: false,
                            })
                          }
                        >
                          Published ({published.length})
                        </li>
                        {/* <li
                          className={
                            activeTab.Unpublished == true ? "active" : ""
                          }
                          onClick={() =>
                            setActiveTab({
                              Published: false,
                              Unpublished: true,
                            })
                          }
                        >
                          Unpublished ({unpublished.length})
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
                {!loading && (
                  <div className="products">
                    <div className="row">
                      {activeTab.Published && (
                        <>
                          {published.map((val) => {
                            return (
                              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                                <div className="umpiresmanual-data">
                                  <div className="row">
                                    <div className="data-text col-9">
                                      <h3> {val.title} </h3>
                                      <h4>
                                        Price:&nbsp;
                                        <NumberFormat
                                          value={(val.priceincents / 100).toFixed(2)}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"$"}
                                        />
                                      </h4>
                                    </div>
                                    <div className="data-image col-3">
                                      <Link
                                        to={`/gi-team/products/view-umpires-manual/${val.id}`}
                                      >
                                        <img src={right} />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                      {/* {activeTab.Unpublished && (
                        <>
                          {unpublished.map((val) => {
                            return (
                              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                                <div className="umpiresmanual-data">
                                  <div className="row">
                                    <div className="data-text col-9">
                                      <h3> {val.title} </h3>
                                      <h4>
                                        Price:&nbsp;
                                        <NumberFormat
                                          value={(val.priceincents / 100).toFixed(2)}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"$"}
                                        />
                                      </h4>
                                    </div>
                                    <div className="data-image col-3">
                                      <img src={right} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )} */}
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

export default withRouter(UmpiresManualAdmin);