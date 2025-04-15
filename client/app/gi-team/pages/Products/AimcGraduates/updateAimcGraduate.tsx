import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import queryString from "query-string";
import moment from "moment";
import { Helmet } from "react-helmet";
import history from "../../../../../utils/history";
import {
  updateAIMCGraduatesData,
  getAIMCGraduatesData,
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const UpdateAimcGraduate = (props) => {

  const [loadingData, setLoadingData] = useState(true);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  var someDate = new Date();
  someDate.setDate(someDate.getDate() + 0);
  var date = someDate.toISOString().substr(0, 10);

  const [graduate, setGraduate] = useState({
    customerCertificationRecordId: "",
    firstName: "",
    lastName: "",
    email: "",
    certCode: "",
    passingScore: date,
    aimc: "",
    datePassed: date,
    dateOfExpiration: date,
    iircCertified: false,
    iicrcNumber: "",
    iicrcDateOfBirth: "",
    caAdjusterLicenseCE: false,
    californiaNumber: "",
    californiaFullNameSign: "",
    flAdjusterLicenseCE: false,
    floridaFullName: "",
    floridaNumber: "",
    idAdjusterLicenseCE: false,
    idahoNumber: "",
    gaAdjusterLicenseCE: false,
    georgiaNumber: "",
  });

  useEffect(() => {
    getAIMCGraduatesData().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (graduate) => graduate.id === parseInt(props.match.params.id)
        )[0];
        // console.log(x);
        setGraduate({
          ...graduate,
          customerCertificationRecordId: x.id,
          firstName: x.firstName ? x.firstName : "N/A",
          lastName: x.lastName ? x.lastName : "N/A",
          email: x.email ? x.email : "N/A",
          certCode: x.certCode ? x.certCode : "N/A",
          passingScore: x.passingScore ? `${x.passingScore}%` : "N/A",
          aimc: x.aimc ? x.aimc : "N/A",
          datePassed: x.datePassed ? `${moment(x.datePassed).format("MM/DD/YYYY")}` : "N/A",
          dateOfExpiration: x.dateOfExpiration ? `${moment(x.dateOfExpiration).format("MM/DD/YYYY")}` : "N/A",
          iircCertified: x.iircCertified ? x.iircCertified : false,
          iicrcNumber: x.iicrcNumber ? x.iicrcNumber : "",
          iicrcDateOfBirth: x.iicrcDateOfBirth ? `${moment(x.iicrcDateOfBirth).format("YYYY-MM-DD")}` : date,
          caAdjusterLicenseCE: x.caAdjusterLicenseCE ? x.caAdjusterLicenseCE : false,
          californiaNumber: x.californiaNumber ? x.californiaNumber : "",
          californiaFullNameSign: x.californiaFullNameSign ? x.californiaFullNameSign : "",
          flAdjusterLicenseCE: x.flAdjusterLicenseCE ? x.flAdjusterLicenseCE : false,
          floridaFullName: x.floridaFullName ? x.floridaFullName : "",
          floridaNumber: x.floridaNumber ? x.floridaNumber : "",
          idAdjusterLicenseCE: x.idAdjusterLicenseCE ? x.idAdjusterLicenseCE : false,
          idahoNumber: x.idahoNumber ? x.idahoNumber : "",
          gaAdjusterLicenseCE: x.gaAdjusterLicenseCE ? x.gaAdjusterLicenseCE : false,
          georgiaNumber: x.georgiaNumber ? x.georgiaNumber : "",
        });
        setLoadingData(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      const payload = {
        customerCertificationRecordId: graduate.customerCertificationRecordId,
        iircCertified: graduate.iircCertified,
        iicrcNumber: graduate.iicrcNumber,
        iicrcDateOfBirth: graduate.iicrcDateOfBirth,
        caAdjusterLicenseCE: graduate.caAdjusterLicenseCE,
        californiaNumber: graduate.californiaNumber,
        californiaFullNameSign: graduate.californiaFullNameSign,
        flAdjusterLicenseCE: graduate.flAdjusterLicenseCE,
        floridaFullName: graduate.floridaFullName,
        floridaNumber: graduate.floridaNumber,
        idAdjusterLicenseCE: graduate.idAdjusterLicenseCE,
        idahoNumber: graduate.idahoNumber,
        gaAdjusterLicenseCE: graduate.gaAdjusterLicenseCE,
        georgiaNumber: graduate.georgiaNumber,
      };
  
      const stringified = queryString.stringify(payload);
  
      updateAIMCGraduatesData(stringified).subscribe((response) => {
        if (response.response.Requested_Action) {
          setLoading(false);
          setError(false);
          history.push("/gi-team/products/graduates");
        } else {
          setLoading(false);
          setError(response.response.Message);
        }
      });
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title> 
          Update AIMC Graduate - Actionable Insights Admin
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
                      AIMC Graduate
                    </h3>
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to="/gi-team/products/graduates"
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loadingData && (
                  <>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="firstName" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.firstName}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                First Name
                              </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="lastName" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.lastName}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                Last Name
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="email" 
                                name="email" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.email}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                Email
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row info">
                      <h3 style={{ color: "#DB422D" }}> Certificate Details </h3>
                    </div>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="certCode" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.certCode}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                Cert Code
                              </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="passingScore" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.passingScore}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                Passing Score
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="aimc" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.aimc}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                AIMC
                              </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="datePassed" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.datePassed}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                Passed On
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="upInputs form-group nogroup">
                              <input 
                                type="text" 
                                name="dateOfExpiration" 
                                placeholder=" "
                                required
                                readOnly
                                value={graduate.dateOfExpiration}
                                style={{
                                  border: "1px solid #B8B8B8",
                                  background: "#F2F2F2",
                                }}
                              />
                              <label
                                className="upLabel"
                                style={{ color: "#B8B8B8" }}
                              >
                                Date of Expiration
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row info">
                      <h3 style={{ color: "#DB422D" }}> Licenses </h3>
                    </div>
                    <form onSubmit={handleSubmit} id="form">
                      <div className="info-data">
                        <div className="form-holder">
                          <div className="extras">
                            <div className="row">
                              <div className="col">
                                <div className="tree">
                                  <div className="for-checkbox mb-2">
                                    <label htmlFor="IICRC">
                                      <input
                                        id="IICRC"
                                        type="checkbox"
                                        checked={graduate.iircCertified}
                                      />
                                      <span 
                                        onClick={() =>
                                          setGraduate({
                                            ...graduate,
                                            iircCertified: !graduate.iircCertified,
                                          })
                                        }
                                      >
                                        IICRC Certified
                                      </span>
                                    </label>
                                  </div>
                                  <div style={{ display: graduate.iircCertified ? "block" : "none" }}>
                                    <div className="row">
                                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 pl-0">
                                        <div className="form-group nogroup">
                                          <input
                                            type="text"
                                            name="iicrcNumber"
                                            required={graduate.iircCertified ? true : false}
                                            id="inputField9"
                                            className="input-area"
                                            value={graduate.iicrcNumber}
                                            onChange={(e) =>
                                              setGraduate({
                                                ...graduate,
                                                iicrcNumber: e.currentTarget.value,
                                              })
                                            }
                                          />  
                                          <label htmlFor="inputField9" className="floating_label" style={{ left: "10px" }}> IICRC# </label>
                                        </div>
                                      </div>
                                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 pr-0">
                                        <div className="form-group nogroup">
                                          <input
                                            type="date"
                                            name="iicrcDateOfBirth"
                                            required={graduate.iircCertified ? true : false}
                                            id="inputField10"
                                            className="input-area"
                                            value={graduate.iicrcDateOfBirth}
                                            onChange={(e) =>
                                              setGraduate({
                                                ...graduate,
                                                iicrcDateOfBirth: e.currentTarget.value,
                                              })
                                            }
                                          />  
                                          <label htmlFor="inputField10" className="floating_label"> DOB </label>
                                        </div>
                                      </div>
                                    </div>  
                                  </div>
                                </div>
                                <div className="tree">
                                  <ul className="mb-2">
                                    <li> 
                                      <div className="for-checkbox">
                                        <label htmlFor="California">
                                          <input
                                            id="California"
                                            type="checkbox"
                                            checked={graduate.caAdjusterLicenseCE}
                                          />
                                          <span 
                                            onClick={() =>
                                              setGraduate({
                                                ...graduate,
                                                caAdjusterLicenseCE: !graduate.caAdjusterLicenseCE,
                                              })
                                            }
                                          >
                                            CA Adjuster License CE
                                          </span>
                                        </label>
                                      </div> 
                                      <ul style={{ display: graduate.caAdjusterLicenseCE ? "block" : "none" }}>
                                        <li>
                                          <div className="row" style={{ padding: "7px 0px 0px 35px" }}>
                                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                              <div className="form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="californiaNumber"
                                                  required={graduate.caAdjusterLicenseCE ? true : false}
                                                  id="inputField11"
                                                  className="input-area"
                                                  value={graduate.californiaNumber}
                                                  onChange={(e) =>
                                                    setGraduate({
                                                      ...graduate,
                                                      californiaNumber: e.currentTarget.value,
                                                    })
                                                  }
                                                />  
                                                <label htmlFor="inputField11" className="floating_label"> CA License # (Input Field) </label>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="row" style={{ padding: "7px 0px 0px 35px" }}>
                                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                              <div className="form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="californiaFullNameSign"
                                                  required={graduate.caAdjusterLicenseCE ? true : false}
                                                  id="inputField12"
                                                  className="input-area"
                                                  value={graduate.californiaFullNameSign}
                                                  onChange={(e) =>
                                                    setGraduate({
                                                      ...graduate,
                                                      californiaFullNameSign: e.currentTarget.value,
                                                    })
                                                  }
                                                />  
                                                <label htmlFor="inputField12" className="floating_label"> Electronically Sign Your Full Name </label>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                                <div className="tree">
                                  <ul className="mb-2">
                                    <li> 
                                      <div className="for-checkbox">
                                        <label htmlFor="Florida">
                                          <input
                                            id="Florida"
                                            type="checkbox"
                                            checked={graduate.flAdjusterLicenseCE}
                                          />
                                          <span 
                                            onClick={() =>
                                              setGraduate({
                                                ...graduate,
                                                flAdjusterLicenseCE: !graduate.flAdjusterLicenseCE,
                                              })
                                            }
                                          >
                                            FL Adjuster License CE
                                          </span>
                                        </label>
                                      </div> 
                                      <ul style={{ display: graduate.flAdjusterLicenseCE ? "block" : "none" }}>
                                        <li>
                                          <div className="row" style={{ padding: "7px 0px 0px 35px" }}>
                                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                              <div className="form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="floridaFullName"
                                                  required={graduate.flAdjusterLicenseCE ? true : false}
                                                  id="inputField13"
                                                  className="input-area"
                                                  value={graduate.floridaFullName}
                                                  onChange={(e) =>
                                                    setGraduate({
                                                      ...graduate,
                                                      floridaFullName: e.currentTarget.value,
                                                    })
                                                  }
                                                />  
                                                <label htmlFor="inputField13" className="floating_label"> Enter Your Full Name (Input Field) </label>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="row" style={{ padding: "7px 0px 0px 35px" }}>
                                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                              <div className="form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="floridaNumber"
                                                  required={graduate.flAdjusterLicenseCE ? true : false}
                                                  id="inputField14"
                                                  className="input-area"
                                                  value={graduate.floridaNumber}
                                                  onChange={(e) =>
                                                    setGraduate({
                                                      ...graduate,
                                                      floridaNumber: e.currentTarget.value,
                                                    })
                                                  }
                                                />  
                                                <label htmlFor="inputField14" className="floating_label"> FL License # (Input Field) </label>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                                <div className="tree">
                                  <ul className="mb-2">
                                    <li> 
                                      <div className="for-checkbox">
                                        <label htmlFor="Idaho">
                                          <input
                                            id="Idaho"
                                            type="checkbox"
                                            checked={graduate.idAdjusterLicenseCE}
                                          />
                                          <span 
                                            onClick={() =>
                                              setGraduate({
                                                ...graduate,
                                                idAdjusterLicenseCE: !graduate.idAdjusterLicenseCE,
                                              })
                                            }
                                          >
                                            ID Adjuster License CE
                                          </span>
                                        </label>
                                      </div> 
                                      <ul style={{ display: graduate.idAdjusterLicenseCE ? "block" : "none" }}>
                                        <li>
                                          <div className="row" style={{ padding: "7px 0px 0px 35px" }}>
                                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                              <div className="form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="idahoNumber"
                                                  required={graduate.idAdjusterLicenseCE ? true : false}
                                                  id="inputField15"
                                                  className="input-area"
                                                  value={graduate.idahoNumber}
                                                  onChange={(e) =>
                                                    setGraduate({
                                                      ...graduate,
                                                      idahoNumber: e.currentTarget.value,
                                                    })
                                                  }
                                                />  
                                                <label htmlFor="inputField15" className="floating_label"> Idaho License # (Input Field) </label>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                                <div className="tree">
                                  <ul className="mb-2">
                                    <li> 
                                      <div className="for-checkbox">
                                        <label htmlFor="Georgia">
                                          <input
                                            id="Georgia"
                                            type="checkbox"
                                            checked={graduate.gaAdjusterLicenseCE}
                                          />
                                          <span 
                                            onClick={() =>
                                              setGraduate({
                                                ...graduate,
                                                gaAdjusterLicenseCE: !graduate.gaAdjusterLicenseCE,
                                              })
                                            }
                                          >
                                            GA Adjuster License CE
                                          </span>
                                        </label>
                                      </div> 
                                      <ul style={{ display: graduate.gaAdjusterLicenseCE ? "block" : "none" }}>
                                        <li>
                                          <div className="row" style={{ padding: "7px 0px 0px 35px" }}>
                                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                              <div className="form-group nogroup">
                                                <input
                                                  type="text"
                                                  name="georgiaNumber"
                                                  required={graduate.gaAdjusterLicenseCE ? true : false}
                                                  id="inputField16"
                                                  className="input-area"
                                                  value={graduate.georgiaNumber}
                                                  onChange={(e) =>
                                                    setGraduate({
                                                      ...graduate,
                                                      georgiaNumber: e.currentTarget.value,
                                                    })
                                                  }
                                                />  
                                                <label htmlFor="inputField16" className="floating_label"> Georgia License # (Input Field) </label>
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
                  </>
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

export default withRouter(UpdateAimcGraduate);