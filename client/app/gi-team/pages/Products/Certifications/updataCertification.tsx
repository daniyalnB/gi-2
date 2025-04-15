import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import queryString from "query-string";
import CurrencyInput from "react-currency-input";
import { Helmet } from "react-helmet";
import history from "../../../../../utils/history";
import {
  addOrUpdateCertification,
  getAllCertifications,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import up from "assets/arrowup.svg";
import down from "assets/arrowdown.svg";

const UpdateCertification = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [priceerror, setPriceError] = useState(false);
  const [failedpriceerror, setFailedPriceError] = useState(false);

  const [flow, setFlow] = useState(false);
  const [flowType, setFlowType] = useState("");

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [certification, setCertification] = useState({
    id: "",
    title: "",
    permalink: "",
    priceincents: 0,
    failedpriceincents: 0,
    description: "",
    flowtype: "",
    tabtitle: "",
    Extras: false,
    IICRC: false,
    IICRCTitle: "",
    California: false,
    CaliforniaTitle: "",
    CaliforniaDescription: "",
    Florida: false,
    FloridaTitle: "",
    FloridaDescription: "",
    Idaho: false,
    IdahoTitle: "",
    georgia: false,
    georgiaTitle: "",
    nevada: false,
    nevadaTitle: "",
    Proctoring: false,
    metadescription: "",
    metatitle: "",
    electronicallysignyourfullname: false,
    ProctoringTitle: "",
    facebookogimage: "",
    courseimage: "",
  });

  useEffect(() => {
    getAllCertifications().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (certification) => certification.id === parseInt(props.match.params.id)
        )[0];
        setCertification({
          ...certification,
          id: x.id,
          title: x.title,
          permalink: x.permalink,
          priceincents: x.priceincents,
          failedpriceincents: x.failedpriceincents,
          description: x.description,
          flowtype: x.flowtype,
          tabtitle: x.tabtitle,
          Extras: x.extras,
          IICRC: x.iicrc,
          IICRCTitle: x.iicrctitle,
          California: x.california,
          CaliforniaTitle: x.californiaTitle,
          CaliforniaDescription: x.californiaDescription,
          Florida: x.florida,
          FloridaTitle: x.floridaTitle,
          FloridaDescription: x.floridaDescription,
          Idaho: x.idaho,
          IdahoTitle: x.idahoTitle,
          georgia: x.georgia,
          georgiaTitle: x.georgiaTitle,
          nevada: x.nevada,
          nevadaTitle: x.nevadaTitle,
          Proctoring: x.proctoring,
          metadescription: x.metadescription,
          metatitle: x.metatitle,
          electronicallysignyourfullname: x.electronicallysignyourfullname,
          ProctoringTitle: x.proctoringTitle,
          facebookogimage: x.facebookogimage,
          courseimage: x.courseimage,
        });
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const onSelect = (e) =>
  setCertification({ ...certification, [e.target.name]: e.target.files[0] });

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      const payload = {
        id: certification.id,
        title: certification.title,
        permalink: certification.permalink.replace(/\/$/, ""),
        priceincents: certification.priceincents,
        failedpriceincents: certification.failedpriceincents,
        description: certification.description,
        flowtype: certification.flowtype,
        tabtitle: certification.tabtitle,
        Extras: certification.Extras,
        IICRC: certification.Extras ? certification.IICRC : false,
        IICRCTitle: certification.Extras && certification.IICRC ? certification.IICRCTitle : "",
        California: certification.Extras ? certification.California : false,
        CaliforniaTitle: certification.Extras && certification.California ? certification.CaliforniaTitle : "",
        CaliforniaDescription: certification.Extras && certification.California ? certification.CaliforniaDescription : "",
        Florida: certification.Extras ? certification.Florida : false,
        FloridaTitle: certification.Extras && certification.Florida ? certification.FloridaTitle : "",
        FloridaDescription: certification.Extras && certification.Florida ? certification.FloridaDescription : "",
        Idaho: certification.Extras ? certification.Idaho : false,
        IdahoTitle: certification.Extras && certification.Idaho ? certification.IdahoTitle : "",
        georgia: certification.Extras ? certification.georgia : false,
        georgiaTitle: certification.Extras && certification.georgia ? certification.georgiaTitle : "",
        nevada: certification.Extras ? certification.nevada : false,
        nevadaTitle: certification.Extras && certification.nevada ? certification.nevadaTitle : "",
        Proctoring: certification.Extras ? certification.Proctoring : false,
        metadescription: certification.metadescription,
        metatitle: certification.metatitle,
        electronicallysignyourfullname: certification.Extras ? certification.electronicallysignyourfullname : false,
        ProctoringTitle: certification.Extras && certification.Proctoring ? certification.ProctoringTitle : "",
      };
      const formData = new FormData();
      formData.append("courseimage", certification.courseimage);
      formData.append("facebookogimage", certification.facebookogimage);
  
      const stringified = queryString.stringify(payload);
  
      addOrUpdateCertification(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/products/certifications");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }, 1000);
  };

  function checkPrice (val) {
    if (val >= 50) {
      setPriceError(false);
    } else {
      setPriceError(true);
    }
  }

  function checkFailedPrice (val) {
    if (val >= 50) {
      setFailedPriceError(false);
    } else {
      setFailedPriceError(true);
    }
  }

  return (
    <>
      <Helmet>
        <title> 
          Update Certification - Actionable Insights Admin
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
                      Certification
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/products/view-certification/${certification.id}`}
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <form onSubmit={handleSubmit} id="form">
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
                                value={certification.title}
                                onChange={(e) =>
                                  setCertification({
                                    ...certification,
                                    title: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField0" className="floating_label"> Course Title </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <CurrencyInput
                                thousandSeparator=","
                                value={certification.priceincents / 100}
                                name="Price"
                                id="inputField1"
                                className="input-area"
                                onChange={(e, maskedvalue) => {
                                  setCertification({
                                    ...certification,
                                    priceincents: parseInt((maskedvalue * 100)),
                                  });
                                  checkPrice(parseInt((maskedvalue * 100)));
                                }}
                              />
                              <label htmlFor="inputField1" className="floating_label"> Price </label>
                            </div>
                            {priceerror ? (
                              <div
                                style={{
                                  color: "#db422d",
                                  marginBottom: "20px",
                                  marginTop: "-10px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  padding: "0px 4px",
                                }}
                              > 
                                Price must be at least $0.50 usd
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <CurrencyInput
                                thousandSeparator=","
                                value={certification.failedpriceincents / 100}
                                name="FailedPrice"
                                id="inputField2"
                                className="input-area"
                                onChange={(e, maskedvalue) => {
                                  setCertification({
                                    ...certification,
                                    failedpriceincents: parseInt((maskedvalue * 100)),
                                  });
                                  checkFailedPrice(parseInt((maskedvalue * 100)));
                                }}
                              />
                              <label htmlFor="inputField2" className="floating_label"> Failed Price </label>
                            </div>
                            {failedpriceerror ? (
                              <div
                                style={{
                                  color: "#db422d",
                                  marginBottom: "20px",
                                  marginTop: "-10px",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  padding: "0px 4px",
                                }}
                              > 
                                Failed Price must be at least $0.50 usd
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="Permalink" 
                                required 
                                id="inputField3" 
                                className="input-area"
                                value={certification.permalink}
                                onChange={(e) =>
                                  setCertification({
                                    ...certification,
                                    permalink: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField3" className="floating_label"> Permalink </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <label className="file">
                                <input
                                  type="file"
                                  name="facebookogimage"
                                  onChange={onSelect}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom"> Facebook OG Image </span>
                              </label>
                              <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                              {certification.facebookogimage ? (
                                <div className="facebook-image-name">
                                  <a href={certification.facebookogimage} target="_blank">
                                    {certification.facebookogimage.name ? (
                                      `${"   " + certification.facebookogimage.name}`
                                    ) : (
                                      parse(`${certification.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                                  name="courseimage"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={onSelect}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom"> Course Image </span>
                              </label>
                              <div className="resolution"> Image size 949 x 1080 </div>
                              {certification.courseimage ? (
                                <div className="facebook-image-name">
                                  <a href={certification.courseimage} target="_blank">
                                    {certification.courseimage.name ? (
                                      `${"   " + certification.courseimage.name}`
                                    ) : (
                                      parse(`${certification.courseimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
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
                        <div className="row mt-3">
                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="form-group nogroup">
                              <textarea
                                name="featureddescription"
                                required
                                id="textField1"
                                className="input-area"
                                value={certification.description}
                                onChange={(e) =>
                                  setCertification({
                                    ...certification,
                                    description: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField1" className="floating_label"> Description </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                  onClick={(e) => setFlow(!flow)} 
                                  value={certification.flowtype}
                                  type="text" 
                                  name="FlowType" 
                                  required 
                                  id="inputField4" 
                                  className="input-area"
                                  style={{ 
                                    color: "transparent",
                                    textShadow: "0 0 0 #000",
                                    cursor: "pointer",
                                  }}
                              />
                              <label htmlFor="inputField4" className="floating_label"> Flow Type </label>
                              <label className="file_input_label">
                                {flow ?
                                  <img 
                                    className="select size"
                                    src={up} 
                                    onClick={() => setFlow(!flow)}
                                  />
                                :
                                  <img 
                                    className="select size"
                                    src={down} 
                                    onClick={() => setFlow(!flow)}
                                  />
                                }
                              </label>
                              <div className={flow ? "active" : "dropdown-content" }>
                                <h3 
                                  onClick={(e) => {
                                    setFlowType(e.currentTarget.innerHTML);
                                    setFlow(!flow);
                                    setCertification({
                                      ...certification,
                                      flowtype: e.currentTarget.innerHTML,
                                    });
                                  }}
                                > 
                                  Default
                                </h3>
                                <h3 
                                  onClick={(e) => {
                                    setFlowType(e.currentTarget.innerHTML);
                                    setFlow(!flow);
                                    setCertification({
                                      ...certification,
                                      flowtype: e.currentTarget.innerHTML,
                                    });
                                  }}
                                > 
                                  Pro Plan
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="metatitle"
                                required
                                maxLength={160}
                                id="textField2"
                                className="input-area"
                                value={certification.metatitle}
                                onChange={(e) =>
                                  setCertification({
                                    ...certification,
                                    metatitle: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField2" className="floating_label"> Meta Title </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="metadescription"
                                required
                                maxLength={160}
                                id="textField3"
                                className="input-area"
                                value={certification.metadescription}
                                onChange={(e) =>
                                  setCertification({
                                    ...certification,
                                    metadescription: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField3" className="floating_label"> Meta Description </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="tabtitle"
                                required
                                id="textField4"
                                className="input-area"
                                value={certification.tabtitle}
                                onChange={(e) =>
                                  setCertification({
                                    ...certification,
                                    tabtitle: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField4" className="floating_label"> Tab Title </label>
                            </div>
                          </div>
                        </div>
                        <div className="extras">
                          <div className="row">
                            <div className="col">
                              <div className="extras-checkbox">
                                <ul>
                                  <li>
                                    <label htmlFor="Extras">
                                      <input
                                        id="Extras"
                                        type="checkbox"
                                        checked={certification.Extras}
                                      />
                                      <span 
                                        onClick={() =>
                                          setCertification({
                                            ...certification,
                                            Extras: !certification.Extras,
                                          })
                                        }
                                      >
                                        Extras:
                                      </span>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="IICRC">
                                        <input
                                          id="IICRC"
                                          type="checkbox"
                                          checked={certification.IICRC}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              IICRC: !certification.IICRC,
                                            })
                                          }
                                        >
                                          IICRC:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.IICRC ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.IICRC && certification.Extras ? true : false}
                                                id="iicrcTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.IICRCTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    IICRCTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="iicrcTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="IICRCIF">
                                            <input
                                              id="IICRCIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            > 
                                              IICRC # (Input Field)
                                            </span>
                                          </label>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="DateOfBirthCalender">
                                            <input
                                              id="DateOfBirthCalender"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            > 
                                              Date of Birth (Calender)
                                            </span>
                                          </label>
                                        </div> 
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="California">
                                        <input
                                          id="California"
                                          type="checkbox"
                                          checked={certification.California}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              California: !certification.California,
                                            })
                                          }
                                        >
                                          California:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.California ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.California && certification.Extras ? true : false}
                                                id="californiaTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.CaliforniaTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    CaliforniaTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="californiaTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="description"
                                                required={certification.California && certification.Extras ? true : false}
                                                id="calforniaDescription"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.CaliforniaDescription}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    CaliforniaDescription: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="calforniaDescription" className="floating_label"> Description </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="CALicenseIF">
                                            <input
                                              id="CALicenseIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            >
                                              CA License # (Input Field)
                                            </span>
                                          </label>
                                        </div> 
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="CALicenseIF">
                                            <input
                                              id="CALicenseIF"
                                              type="checkbox"
                                              checked={certification.electronicallysignyourfullname}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                              onClick={() =>
                                                setCertification({
                                                  ...certification,
                                                  electronicallysignyourfullname: !certification.electronicallysignyourfullname,
                                                })
                                              }
                                            >
                                              Electronically Sign Your Full Name
                                            </span>
                                          </label>
                                        </div> 
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="Florida">
                                        <input
                                          id="Florida"
                                          type="checkbox"
                                          checked={certification.Florida}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              Florida: !certification.Florida,
                                            })
                                          }
                                        >
                                          Florida:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.Florida ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.Florida && certification.Extras ? true : false}
                                                id="floridaTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.FloridaTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    FloridaTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="floridaTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="description"
                                                required={certification.Florida && certification.Extras ? true : false}
                                                id="floridaDescription"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.FloridaDescription}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    FloridaDescription: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="floridaDescription" className="floating_label"> Description </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="EnterYourFullNameIF">
                                            <input
                                              id="EnterYourFullNameIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            >
                                              Enter Your Full Name (Input Field)
                                            </span>
                                          </label>
                                        </div> 
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="FLLicenseIF">
                                            <input
                                              id="FLLicenseIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            >
                                              FL License # (Input Field)
                                            </span>
                                          </label>
                                        </div> 
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="Idaho">
                                        <input
                                          id="Idaho"
                                          type="checkbox"
                                          checked={certification.Idaho}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              Idaho: !certification.Idaho,
                                            })
                                          }
                                        >
                                          Idaho:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.Idaho ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.Idaho && certification.Extras ? true : false}
                                                id="idahoTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.IdahoTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    IdahoTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="idahoTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="IdahoLicenseIF">
                                            <input
                                              id="IdahoLicenseIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            > 
                                              Idaho License # (Input Field)
                                            </span>
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="georgia">
                                        <input
                                          id="georgia"
                                          type="checkbox"
                                          checked={certification.georgia}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              georgia: !certification.georgia,
                                            })
                                          }
                                        >
                                          Georgia:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.georgia ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.georgia && certification.Extras ? true : false}
                                                id="georgiaTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.georgiaTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    georgiaTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="georgiaTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="GeorgiaLicenseIF">
                                            <input
                                              id="GeorgiaLicenseIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            > 
                                              Georgia License # (Input Field)
                                            </span>
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="nevada">
                                        <input
                                          id="nevada"
                                          type="checkbox"
                                          checked={certification.nevada}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              nevada: !certification.nevada,
                                            })
                                          }
                                        >
                                          Nevada:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.nevada ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.nevada && certification.Extras ? true : false}
                                                id="nevadaTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.nevadaTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    nevadaTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="nevadaTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="for-checkbox" style={{ padding: "19px 0px 0px 50px" }}>
                                          <label htmlFor="NevadaLicenseIF">
                                            <input
                                              id="NevadaLicenseIF"
                                              type="checkbox"
                                              checked={true}
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#7F7F7F",
                                              }}
                                            > 
                                              Nevada License # (Input Field)
                                            </span>
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                              <div className="tree" style={{ display: certification.Extras ? "block" : "none" }}>
                                <ul>
                                  <li> 
                                    <div className="for-checkbox">
                                      <label htmlFor="Proctoring">
                                        <input
                                          id="Proctoring"
                                          type="checkbox"
                                          checked={certification.Proctoring}
                                        />
                                        <span 
                                          onClick={() =>
                                            setCertification({
                                              ...certification,
                                              Proctoring: !certification.Proctoring,
                                            })
                                          }
                                        >
                                          Proctoring:
                                        </span>
                                      </label>
                                    </div> 
                                    <ul style={{ display: certification.Proctoring ? "block" : "none" }}>
                                      <li>
                                        <div className="row" style={{ padding: "3px 0px 0px 35px" }}>
                                          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                            <div className="form-group nogroup">
                                              <textarea
                                                name="title"
                                                required={certification.Proctoring && certification.Extras ? true : false}
                                                id="proctoringTitle"
                                                className="input-area"
                                                style={{ height: "55px", marginBottom: "0px" }}
                                                value={certification.ProctoringTitle}
                                                onChange={(e) =>
                                                  setCertification({
                                                    ...certification,
                                                    ProctoringTitle: e.currentTarget.value,
                                                  })
                                                }
                                              />  
                                              <label htmlFor="proctoringTitle" className="floating_label"> Title </label>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="second-hr" />
                    <div className="Buttons">
                      <div className="row">
                        {!loading && 
                          <button 
                            className="btn"
                            type="submit"
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                          > 
                            <span> Update </span>
                          </button>
                        }
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

export default withRouter(UpdateCertification);