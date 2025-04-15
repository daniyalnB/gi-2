import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import { Helmet } from "react-helmet";
import queryString from "query-string";
import NumberFormat from "react-number-format";
import { 
  AddOrUpdateUmpiresManual, 
  GetAllUmpiresManuals,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import edit from "assets/Edit-Manual.svg";
import radio1 from "assets/Radio1.svg";
import radio2 from "assets/Radio2.svg";

const ViewUmpiresManual = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [obj, setObj] = useState("");

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllUmpiresManuals().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (manual) => manual.id === props.match.params.id
        )[0];
        setData(x);
        setLoadingData(false)
      } else {
        alert("error");
      }
    });
  }, []);

  console.log(data, "data");

  const handleSubmit = (index) => {
    setLoading(true);
    setTimeout(() => {
      const payload = {
        id: data.id,
        permalink: data.permalink,
        title: data.title,
        priceincents: data.priceincents,
        sku: data.sku,
        tabtitle: data.tabtitle,
        description: data.description,
        defaultfeatureimageindex: index,
      };

      const formData = new FormData();
      formData.append("featuredimages", data.featuredimages);
      formData.append("facebookogimage", data.facebookogimage);

      const stringified = queryString.stringify(payload);

      AddOrUpdateUmpiresManual(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          update();
        } else {
          setLoading(false);
        }
      });
    }, 1000);
  };

  function update () {
    GetAllUmpiresManuals().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (manual) => manual.id === props.match.params.id
        )[0];
        setData(x);
      } else {
        alert("error");
      }
    });
  }

  return (
    <>
       <Helmet>
        <title> 
          Umpire's Manual Product Detail - Actionable Insights Admin
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
                      to="/gi-team/products/umpires-manual"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <div className="info-data">
                    <div className="view-data">
                      <div className="row">
                        <div className="col-9" style={{ padding: "0px" }}>
                          <div className="row">
                            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                              <h3 className="heading"> Product Title </h3>
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
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                              <h3 className="heading"> SKU </h3>
                              <h2 className="value"> {data.sku} </h2>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-12">
                              <h3 className="heading"> Description </h3>
                              <h2 className="description"> {data.description} </h2>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "25px" }}>
                            <div className="col-12">
                              <h4 className="images"> Images </h4>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Featured Image </h3>
                              {data.featuredimages && data.featuredimages.map((val, index) => {
                                return ( 
                                  <>
                                    <div className="row images-inner">
                                      <div className="col-2 image-1">
                                        <img src={val} />
                                      </div>
                                      <div className="col-6 name">
                                        <h5> {parse(val.replace("https://getinsights2-data.s3.amazonaws.com/", ""))} </h5>
                                      </div>
                                      <div className="col-4 image-2">
                                        {data.defaultfeatureimageindex === index ? (
                                          <>
                                            <img src={radio1} />
                                            <div className="default"> Default </div>
                                          </>
                                        ) : (
                                          <>
                                            {loading && obj == index ? (
                                              <div style={{ margin: "10px auto"}}>
                                                <i className="fas fa-spinner fa-spin"></i>
                                              </div>
                                            ) : (
                                              <>
                                                <img src={radio2} />
                                                <div 
                                                  className="not-default"
                                                  onClick={() => { 
                                                    handleSubmit(index);
                                                    setObj(index);
                                                  }}
                                                >
                                                  Set as Default 
                                                </div> 
                                              </>
                                            )}
                                          </>
                                        )}
                                      </div> 
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Facebook OG Image </h3>
                              <div className="row images-inner">
                                <div className="col-2 image-1">
                                  <img src={data.facebookogimage} />
                                </div>
                                <div className="col-9 name">
                                  <h5> 
                                    {data.facebookogimage ? parse(data.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")) : ""} 
                                  </h5>
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
                              to={`/gi-team/products/update-umpires-manual/${data.id}`}
                            >
                              <img src={edit} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <hr />
                    <div className="Buttons">
                      <div className="row">
                        <button
                          type="submit"
                          className="btn draft"
                          style={{ margin: "0px" }}
                        >
                          Unpublish
                        </button>
                      </div>
                    </div> */}
                  </div>
                )}
                {loadingData && (
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

export default withRouter(ViewUmpiresManual);