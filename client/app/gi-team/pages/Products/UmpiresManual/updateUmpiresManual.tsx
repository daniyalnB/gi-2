import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import { Helmet } from "react-helmet";
import queryString from "query-string";
import CurrencyInput from "react-currency-input";
import history from "../../../../../utils/history";
import { 
  AddOrUpdateUmpiresManual,
  GetAllUmpiresManuals,
  removeFeaturedImageFromUmpiresManual,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const UpdateSubscriptionCoupons = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [priceerror, setPriceError] = useState(false);

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [data, setData] = useState([]);

  const [umpiresmanual, setUmpiresManual] = useState({
    id: "",
    permalink: "",
    title: "",
    priceincents: 0,
    featuredimages: [],
    description: "",
    metadescription: "",
    metatitle: "",
    facebookogimage: "",
    sku: "",
    tabtitle: "",
    bannerimage: "",
  });

  useEffect(() => {
    GetAllUmpiresManuals().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (manual) => manual.id === props.match.params.id
        )[0];
        setData(x);
        setUmpiresManual({
          ...umpiresmanual,
          id: x.id,
          permalink: x.permalink,
          title: x.title,
          priceincents: x.priceincents,
          featuredimages: x.featuredimages,
          description: x.description,
          metadescription: x.metadescription,
          metatitle: x.metatitle,
          facebookogimage: x.facebookogimage,
          sku: x.sku,
          tabtitle: x.tabtitle,
          bannerimage: x.bannerimage,
        });
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const onSelect = (e) => {
    setUmpiresManual({ ...umpiresmanual, [e.target.name]: e.target.files[0] });
  };

  const handleMultipleImages = (e) => {
    if (e.target.files) {
      setUmpiresManual({ ...umpiresmanual, featuredimages: [...e.target.files] });
    }
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      const payload = {
        id: umpiresmanual.id,
        permalink: umpiresmanual.permalink.replace(/\/$/, ""),
        title: umpiresmanual.title,
        priceincents: umpiresmanual.priceincents,
        sku: umpiresmanual.sku,
        tabtitle: umpiresmanual.tabtitle,
        description: umpiresmanual.description,
        metadescription: umpiresmanual.metadescription,
        metatitle: umpiresmanual.metatitle,
        defaultfeatureimageindex: 0,
      };
      const formData = new FormData();
      for (var i = 1; i <= umpiresmanual.featuredimages.length; i++) {
        formData.append(`featuredimage${i}`, umpiresmanual.featuredimages[i - 1]);
      }
      formData.append("facebookogimage", umpiresmanual.facebookogimage);
      formData.append("bannerimage", umpiresmanual.bannerimage);

      const stringified = queryString.stringify(payload);

      AddOrUpdateUmpiresManual(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/products/umpires-manual");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }, 1000);
  };

  console.log(umpiresmanual);

  function checkPrice (val) {
    if (val >= 50) {
      setPriceError(false);
    } else {
      setPriceError(true);
    }
  }

  const removeFeaturedImage = (id, imageurl) => {
    setTimeout(() => {
      const payload = {
        id: id,
        imageurl: imageurl,
      };

      const stringified = queryString.stringify(payload);

      removeFeaturedImageFromUmpiresManual(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {
          update();
        } else {
          alert("error");
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
        setUmpiresManual({
          ...umpiresmanual,
          id: x.id,
          title: x.title,
          priceincents: x.priceincents,
          featuredimages: x.featuredimages,
          description: x.description,
          metadescription: x.metadescription,
          metatitle: x.metatitle,
          facebookogimage: x.facebookogimage,
          sku: x.sku,
          tabtitle: x.tabtitle,
          bannerimage: x.bannerimage,
        });
      } else {
        alert("error");
      }
    });
  }

  return (
    <>
      <Helmet>
        <title> 
          Edit Umpire's Manual Product - Actionable Insights Admin
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
                      Edit {umpiresmanual.title}
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/products/view-umpires-manual/${umpiresmanual.id}`}
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <form onSubmit={handleSubmit}>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="Permalink" 
                                required 
                                id="inputField0" 
                                className="input-area"
                                value={umpiresmanual.permalink}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    permalink: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField0" className="floating_label"> Permalink </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="title" 
                                required 
                                id="inputField1" 
                                className="input-area"
                                value={umpiresmanual.title}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    title: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField1" className="floating_label"> Title </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <CurrencyInput
                                thousandSeparator=","
                                value={umpiresmanual.priceincents  / 100}
                                name="Price"
                                id="inputField3"
                                className="input-area"
                                onChange={(e, maskedvalue) => {
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    priceincents: parseInt((maskedvalue * 100)),
                                  });
                                  checkPrice(parseInt((maskedvalue * 100)));
                                }}
                              />
                              <label htmlFor="inputField3" className="floating_label"> Price </label>
                            </div>
                            {priceerror ? (
                              <div
                                style={{
                                  color: "#db422d",
                                  marginBottom: "20px",
                                  marginTop: "-10px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  padding: "0px 4px",
                                }}
                              > 
                                Price must be at least $0.50 usd
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="sku" 
                                required 
                                id="inputField2" 
                                className="input-area"
                                value={umpiresmanual.sku}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    sku: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField2" className="floating_label"> SKU </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <label className="file">
                                <input
                                  type="file"
                                  multiple
                                  name="featuredimages"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={handleMultipleImages}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom"> Featured Images </span>
                              </label>
                              <div className="resolution"> Image size XXX x XXX </div>
                              {umpiresmanual.featuredimages.length !== 0 ? (
                                <div className="facebook-image-name">
                                  {umpiresmanual.featuredimages && umpiresmanual.featuredimages.map((val, index) => {
                                    return (
                                      <div style={{ margin: "5px auto" }} key={index}>
                                        <a href={val} target="_blank">
                                          {umpiresmanual.featuredimages[0].name ? (
                                            `${"   " + val.name}`
                                          ) : (
                                            parse(`${val.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                          )}
                                        </a>
                                        <span 
                                          style={{ marginLeft: "15px", cursor: "pointer", fontStyle: "initial" }}
                                          onClick={() => removeFeaturedImage(umpiresmanual.id, val)}
                                        >
                                          {umpiresmanual.featuredimages[0].name ? (
                                            ""
                                          ) : (
                                            "X"
                                          )}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="facebook-image-name">
                                  Not Available
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4"></div>
                        <div className="row">
                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="form-group nogroup">
                              <textarea
                                name="featureddescription"
                                required
                                id="textField2"
                                className="input-area"
                                value={umpiresmanual.description}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    description: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField2" className="floating_label"> Description </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <label className="file">
                                <input
                                  type="file"
                                  name="bannerimage"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={onSelect}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom"> Banner Image </span>
                              </label>
                              <div className="resolution"> Image size XXX x XXX </div>
                              {umpiresmanual.bannerimage ? (
                                <div className="facebook-image-name">
                                  <a href={umpiresmanual.bannerimage} target="_blank">
                                    {umpiresmanual.bannerimage.name ? (
                                      `${"   " + umpiresmanual.bannerimage.name}`
                                    ) : (
                                      parse(`${umpiresmanual.bannerimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                    )}
                                  </a>
                                </div>
                              ) : (
                                <div className="facebook-image-name">
                                  Not Available
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <label className="file">
                                <input
                                  type="file"
                                  name="facebookogimage"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={onSelect}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom"> Facebook OG Image </span>
                              </label>
                              <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                              {umpiresmanual.facebookogimage ? (
                                <div className="facebook-image-name">
                                  <a href={umpiresmanual.facebookogimage} target="_blank">
                                    {umpiresmanual.facebookogimage.name ? (
                                      `${"   " + umpiresmanual.facebookogimage.name}`
                                    ) : (
                                      parse(`${umpiresmanual.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                    )}
                                  </a>
                                </div>
                              ) : (
                                <div className="facebook-image-name">
                                  Not Available
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="metatitle"
                                required
                                maxLength={160}
                                id="textField3"
                                className="input-area"
                                value={umpiresmanual.metatitle}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    metatitle: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField3" className="floating_label"> Meta Title </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="metadescription"
                                required
                                maxLength={160}
                                id="textField4"
                                className="input-area"
                                value={umpiresmanual.metadescription}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    metadescription: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField4" className="floating_label"> Meta Description </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="tabtitle"
                                required
                                id="textField1"
                                className="input-area"
                                value={umpiresmanual.tabtitle}
                                onChange={(e) =>
                                  setUmpiresManual({
                                    ...umpiresmanual,
                                    tabtitle: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField1" className="floating_label"> Tab Title </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="second-hr" />
                    <div className="Buttons">
                      <div className="row">
                        {!loading && (
                          <button 
                            className="btn"
                            type="submit"
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          > 
                            <span> Update </span>
                          </button>
                        )}
                        {loading && (
                          <button className="btn" disabled>
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    {localStorage.getItem("role") == "Analyst" && (
                      <div
                        style={{
                          padding: "0px 20px 20px 20px",
                          textAlign: "center",
                        }}
                      >
                        <div 
                          className="form-group alert alert-danger"
                          style={{ 
                            margin: "0px",
                            width: "270px",
                          }}
                        >
                          You need to be an Admin or Editor to Update
                        </div>
                      </div> 
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
                  </form>
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

export default withRouter(UpdateSubscriptionCoupons);