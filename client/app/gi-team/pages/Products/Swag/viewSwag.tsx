import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import queryString from "query-string";
import history from "../../../../../utils/history";
import NumberFormat from "react-number-format";
import { Helmet } from "react-helmet";
import { 
  GetAllSwagProducts,
  addOrUpdateSwagProduct,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import edit from "assets/Edit-Manual.svg";
import bedroom from "assets/bedroom.png";
import radio1 from "assets/Radio1.svg";
import radio2 from "assets/Radio2.svg";

const ViewSwag = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);
  const [unpublish, setUnpublish] = useState(false);

  const [error, setError] = useState(false);

  const [obj, setObj] = useState("");

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    GetAllSwagProducts().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (swag) => swag.id === props.match.params.id
        )[0];
        setData(x);
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const handleSubmit = (index) => {
    setLoading(true);
    setTimeout(() => {
      const payload = {
        id: data.id,
        isdraft: data.draft,
        permalink: data.permalink,
        multiplesize: data.multiplesize,
        title: data.title,
        tabtitle: data.tabtitle,
        price: data.priceincents,
        category: data.category,
        sizes: data.sizes,
        quantities: data.quantity,
        defaultfeatureimageindex: index,
        sku: data.sku,
      };

      const formData = new FormData();
      formData.append("featuredimages", data.featuredimages);
      formData.append("facebookogimage", data.facebookogimage);
      formData.append("sizeguideimage", data.sizeguideimage);
      formData.append("description", data.description);

      const stringified = queryString.stringify(payload);

      addOrUpdateSwagProduct(stringified, formData).subscribe((response) => {
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
    GetAllSwagProducts().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (swag) => swag.id === props.match.params.id
        )[0];
        setData(x);
      } else {
        alert("error");
      }
    });
  }

  const handleSubmitUnpublish = () => {
    setUnpublish(true);
    setTimeout(() => {
      const payload = {
        id: data.id,
        isdraft: true,
        permalink: data.permalink,
        multiplesize: data.multiplesize,
        title: data.title,
        tabtitle: data.tabtitle,
        price: data.priceincents,
        category: data.category,
        sizes: data.sizes,
        quantities: data.quantity,
        defaultfeatureimageindex: data.defaultfeatureimageindex,
        sku: data.sku,
      };

      const formData = new FormData();
      formData.append("featuredimages", data.featuredimages);
      formData.append("facebookogimage", data.facebookogimage);
      formData.append("sizeguideimage", data.sizeguideimage);
      formData.append("description", data.description);

      const stringified = queryString.stringify(payload);

      addOrUpdateSwagProduct(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setUnpublish(false);
          setError(false);
          history.push("/gi-team/products/swag");
        } else {
          setUnpublish(false);
          setError(response.response.Message);
        }
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title> 
          Swag Product Detail - Actionable Insights Admin
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
                      to="/gi-team/products/swag"
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
                          <div className="col-12">
                            <h4 className="images"> General Information </h4>
                          </div>
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
                              <div className="description"> 
                                <div 
                                  dangerouslySetInnerHTML={{
                                    __html: `${
                                      data.description
                                        ? data.description
                                          .replace(/(<p><\/p>)/g, `<br>`)
                                        : ""
                                    }`,
                                  }}
                                >
                                </div> 
                              </div>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "25px" }}>
                            <div className="col-12">
                              <h4 className="images"> Images </h4>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Featured Image </h3>
                              {data.featuredimages && data.featuredimages.length == 0 ? (
                                <div className="row images-inner">
                                  <div className="col-2 image-1">
                                    <img src={data.facebookogimage} />
                                  </div>
                                  <div className="col-9 name">
                                    <h5> "N/A" </h5>
                                  </div>
                                </div>
                              ) : (
                                <>
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
                                </>
                              )}
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
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                              <h3 className="heading"> Size Guide Image </h3>
                              <div className="row images-inner">
                                <div className="col-2 image-1">
                                  <img src={data.sizeguideimage} />
                                </div>
                                <div className="col-9 name">
                                  <h5> {data.sizeguideimage ? parse(data.sizeguideimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")) : "N/A"} </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-12">
                              <h4 className="images"> Sizes </h4>
                              <div className="sizes-view">
                                <div className="row sizes">
                                  <div className="col-6 sizes-heading">
                                    <div className="val"> Sizes </div>
                                  </div>
                                  <div className="col-6 sizes-heading">
                                    <div className="val"> Quantity </div>
                                  </div>
                                  <div className="col-6 size">
                                    {data.sizes && data.sizes.length == 0 ? (
                                      <div className="val-inner"> No size for this Product </div>
                                    ) : (
                                      <>
                                        {data.sizes && data.sizes.map((val, index) => {
                                          return ( 
                                            <div className="val-inner"> {val} </div>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>
                                  <div className="col-6 size">
                                    {data.quantity && data.quantity.map((val, index) => {
                                      return ( 
                                        <div className="val-inner"> {val} </div>
                                      );
                                    })}
                                  </div>
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
                              to={`/gi-team/products/update-swag/${data.id}`}
                            >
                              <img src={edit} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    {localStorage.getItem("role") == "Analyst" ? (
                      ""
                    ) : (
                      <>
                        {data.draft === false ? (
                          <>
                            <hr />
                            <div className="Buttons">
                              <div className="row">
                                {!unpublish && (
                                  <button
                                    className="btn draft"
                                    style={{ margin: "0px" }}
                                    onClick={() => handleSubmitUnpublish()}
                                  >
                                    Unpublish
                                  </button>
                                )}
                                {unpublish && (
                                  <button 
                                    className="btn draft" 
                                    style={{ margin: "0px" }}
                                    disabled
                                  > 
                                    <i className="fas fa-spinner fa-spin"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        {error ? (
                          <div
                            style={{
                              padding: "0px 20px 20px 20px",
                              textAlign: "center",
                            }}
                          >
                            <div 
                              className="form-group alert alert-danger"
                              style={{ margin: "0px" }}
                            >
                              {error}
                            </div>
                          </div> 
                        ) : (
                          ""
                        )}
                      </>
                    )}
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

export default withRouter(ViewSwag);